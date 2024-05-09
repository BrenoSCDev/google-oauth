const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

function renderView(res, viewName, data) {
    fs.readFile(viewName, 'utf8', (err, template) => {
        if (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error rendering view');
            return;
        }
        const rendered = ejs.render(template, data);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(rendered);
    });
}

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/home') {
        renderView(res, 'views/home.ejs');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
