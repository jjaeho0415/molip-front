#!/bin/bash

MKCERT_INSTALLED=$(which mkcert)

# install mkcert
if [ -z $MKCERT_INSTALLED ];then 
    brew install mkcert
fi

# Create server.js file
cat <<EOT >> server.js
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};

app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(\`> Ready on https://\${hostname}:\${port}\`);
  });
});
EOT


mkcert -install
mkcert localhost

# mkcert 설치 자동화
# 1. mkcert 설치 여부를 확인하고 설치 안되어 있으면 brew로 mkcert를 설치(MacOS 기준 작성)
# 2. 현재 경로에 server.js 파일을 생성하고 코드 추가
# 3. mkcert -install 실행
# 4. mkvert localhost 실행