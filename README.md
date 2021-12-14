# Webprogramozas-4
###### MACOS-en fejlesztve.

## DATABASE
SQL bármilyen adatbázishoz mellékelve. <br>
Dockeres megoldást használtam ebben a feladatban.<br>
Ha ezt választod akkor, terminálban a főkönyvtár betallózása után...
```shell
docker up db
```
Majd ctrl+c-vel leállítod a folyamatot.

Ez után ha újraindítod a dockert, együtt fog indulni az adatbázis vele, az autostartup miatt.

Ha tudod, hogy mit csinálsz ezt a docker-compose.yml-ben át tudod konfigurálni.


Futtatás terminálban ajánlott következő képpen.
## BACKEND
Mappa tallózás után:
```shell
npm install express
npm install body-parser
npm install multer

npm start
```

## FRONTEND
```
npm install react
npm install body-parser
npm install multer

npm start
```