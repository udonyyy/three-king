const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const HOST = 'localhost';

// 创建服务器
const server = http.createServer((req, res) => {
  // 获取请求的文件路径
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // 根据文件扩展名设置Content-Type
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // 读取文件并响应
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // 文件不存在
        fs.readFile('./404.html', (err, notFoundContent) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(notFoundContent, 'utf-8');
        });
      } else {
        // 服务器错误
        res.writeHead(500);
        res.end(`服务器错误: ${error.code}\n`);
      }
    } else {
      // 成功读取文件
      res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });
      res.end(content, 'utf-8');
    }
  });
});

// 启动服务器
server.listen(PORT, HOST, () => {
  console.log(`服务器运行在 http://${HOST}:${PORT}/`);
});

console.log(`简单HTML服务器启动中...`);