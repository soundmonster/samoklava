```
npm run gen
docker run -w /board -v $(pwd):/board --rm soundmonster/kicad-automation-scripts:latest /usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/export_dsn.py output/pcbs/main.kicad_pcb output/pcbs/main.ds
docker run -w /board -v $(pwd):/board --rm soundmonster/freerouting_cli:v0.1.0 java -jar /opt/freerouting_cli.jar -de output/pcbs/main.dsn -do output/pcbs/main.ses
docker run -w /board -v $(pwd):/board --rm soundmonster/kicad-automation-scripts:latest /usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/import_ses.py output/pcbs/main.kicad_pcb output/pcbs/main.ses --output-file output/pcbs/main-routed.kicad_pcb
docker run -w /board -v $(pwd):/board --rm soundmonster/kicad-automation-scripts:latest /usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/run_drc.py output/pcbs/main-routed.kicad_pcb output/pcbs/drc/
```





Export DSN
```
 docker run -v $(pwd):/foo --rm -it soundmonster/kicad-automation-scripts:latest
/usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/export_dsn.py --record ./pcbs/main.kicad_pcb main.dsn
```

Autoroute
```
docker run -v $(pwd):/foo --rm -it soundmonster/freerouting_cli:v0.1.0 bash
java -jar build/obj/freerouting_cli.jar -de ../../../../../roflkbd/output/pcbs/main.dsn -do ../../../../../roflkbd/output/pcbs/main.ses
```


import SES

```
docker run -v $(pwd):/foo --rm -it soundmonster/kicad-automation-scripts:latest
/usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/import_ses.py /foo/pcbs/main.kicad_pcb /foo/main.ses --output-file /foo/main-routed.kicad_pcb
```
