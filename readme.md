# Tilda Loader

Script to download your page

## Getting Started

### Server
If you want ro run self hosted version:

```shell=
docker run --rm -it \
       -e PUBLIC_KEY=xxx \
       -e PRIVATE_KEY=xxx \
       -e PROJECT_ID=xxx \
       -e PAGE_ID=xxx \
       -e WEBHOOK_PATH=wh-secret-path \
       -p 8080:8080 \
       -v $(pwd)/public:/app/public \
       olessavluk/tilda-loader
```
then open http://localhost:8080/ to view your page
(don't forget to trigger webhook manually http://localhost:8080/wh-secret-path)

### Just download assets
```shell=
docker run --rm -it \
       -e PUBLIC_KEY=xxx \
       -e PRIVATE_KEY=xxx \
       -e PROJECT_ID=xxx \
       -e PAGE_ID=xxx \
       -v $(pwd)/public:/app/public \
       olessavluk/tilda-loader \
       sh -c 'node /app/export.js'
```
and your files should appear in `$(pwd)/public` folder
