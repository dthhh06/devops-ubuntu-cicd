const http = require('http');

const PORT = 3000;
const VERSION = '2.0.0';

const server = http.createServer((req, res) => {

    if (req.url === '/health') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        return res.end(JSON.stringify({
            status: 'healthy',
            application: 'DevOps Demo App',
            version: VERSION
        }));
    }

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <title>DevOps Demo App</title>
        <style>
            * { box-sizing: border-box; }
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f1f5f9;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .card {
                background: white;
                padding: 48px;
                border-radius: 18px;
                text-align: center;
                box-shadow: 0 10px 30px #00000015;
                max-width: 650px;
            }
            h1 { color: #16a34a; }
            p { color: #475569; line-height: 1.7; }
            .badge {
                display: inline-block;
                background: #dbeafe;
                color: #1d4ed8;
                padding: 10px 20px;
                border-radius: 20px;
            }
            .services {
                margin-top: 25px;
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
            }
            .service {
                padding: 10px;
                background: #f1f5f9;
                border-radius: 8px;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>DevOps Deployment Successful!</h1>
            <p>Automated CI/CD Deployment on Ubuntu</p>
            <span class="badge">Version ${VERSION}</span>

            <div class="services">
                <span class="service">Jenkins</span>
                <span class="service">Docker</span>
                <span class="service">Nginx</span>
                <span class="service">Prometheus</span>
                <span class="service">Grafana</span>
            </div>

            <p>Built and deployed using Jenkins Pipeline.</p>
        </div>
    </body>
    </html>
    `);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
