#!/bin/sh

# container_cmd=podman
container_cmd=docker
container_args="-w /board -v $(pwd):/board --rm"

rm -rf output
npm run gen
${container_cmd} run ${container_args} soundmonster/kicad-automation-scripts:latest /usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/export_dsn.py output/pcbs/main.kicad_pcb output/pcbs/main.dsn
${container_cmd} run ${container_args} soundmonster/freerouting_cli:v0.1.0 java -jar /opt/freerouting_cli.jar -de output/pcbs/main.dsn -do output/pcbs/main.ses
${container_cmd} run ${container_args} soundmonster/kicad-automation-scripts:latest /usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/import_ses.py output/pcbs/main.kicad_pcb output/pcbs/main.ses --output-file output/pcbs/main-routed.kicad_pcb
${container_cmd} run ${container_args} soundmonster/kicad-automation-scripts:latest /usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/run_drc.py output/pcbs/main-routed.kicad_pcb output/pcbs/drc/
# pcbdraw also supports a style file as JSON
${container_cmd} run ${container_args} yaqwsx/kikit:v0.7 pcbdraw --style builtin:set-white-enig.json output/pcbs/main-routed.kicad_pcb images/left.png
${container_cmd} run ${container_args} yaqwsx/kikit:v0.7 pcbdraw -b --style builtin:set-white-enig.json output/pcbs/main-routed.kicad_pcb images/right.png
${container_cmd} run ${container_args} yaqwsx/kikit:v0.7 kikit fab jlcpcb --no-assembly output/pcbs/main-routed.kicad_pcb production/pcb/main

