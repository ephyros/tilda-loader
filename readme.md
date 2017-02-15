# Tilda Loader

Script to download your page

## Getting Started

### Docker install

```
docker run --rm \
       -v $(pwd):/app/pages \
       -e DEST_DIR=pages \
       -e PUBLIC_KEY=xxx \
       -e PRIVATE_KEY=xxx \
       -e PAGE_ID=xxx \
       olessavluk/tilda-loader
```
