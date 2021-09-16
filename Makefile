.DELETE_ON_ERROR:

container_cmd ?= docker
container_args ?= -w /board -v $(shell pwd):/board --rm

output/pcbs/%.kicad_pcb: yamkbd.yaml
	npm run gen

output/pcbs/%.dsn: output/pcbs/%.kicad_pcb
	${container_cmd} run ${container_args} soundmonster/kicad-automation-scripts:latest /usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/export_dsn.py $< $@
	touch $@

output/routed_pcbs:
	mkdir -p $@

output/routed_pcbs/%.ses: output/pcbs/%.dsn output/routed_pcbs
	${container_cmd} run ${container_args} soundmonster/freerouting_cli:v0.1.0 java -jar /opt/freerouting_cli.jar -de $< -do $@
	touch $@

output/routed_pcbs/%.kicad_pcb: output/routed_pcbs/%.ses output/pcbs/%.kicad_pcb
	${container_cmd} run ${container_args} soundmonster/kicad-automation-scripts:latest /usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/import_ses.py output/pcbs/$*.kicad_pcb $< --output-file $@
	touch $@

output/routed_pcbs/%-drc/: output/routed_pcbs/%.kicad_pcb
	${container_cmd} run ${container_args} soundmonster/kicad-automation-scripts:latest /usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/run_drc.py  $< $@
	touch $@

output/routed_pcbs/%-front.png: output/routed_pcbs/%.kicad_pcb
	${container_cmd} run ${container_args} yaqwsx/kikit:v0.7 pcbdraw --style builtin:set-white-enig.json $< $@
	touch $@

output/routed_pcbs/%-back.png: output/routed_pcbs/%.kicad_pcb
	${container_cmd} run ${container_args} yaqwsx/kikit:v0.7 pcbdraw -b --style builtin:set-white-enig.json $< $@
	touch $@

output/gerbers/%/: output/routed_pcbs/%.kicad_pcb
	mkdir -p $@
	${container_cmd} run ${container_args} yaqwsx/kikit:v0.7 kikit fab jlcpcb --no-assembly $< $@
	touch $@

.PHONY: clean
clean:
	rm -rf output

all: output/routed_pcbs/board-front.png output/routed_pcbs/board-back.png output/routed_pcbs/top_plate/gerbers

