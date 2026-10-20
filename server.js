
const http = require("http");

const PORT = process.env.PORT || 3000;
const VERSION = "2.1.0";

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DevOpsFlow | Version 2.1</title>
<style>
* { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  font-family: 'Segoe UI', Arial, sans-serif;
  color: white;
  background:
    radial-gradient(circle at 15% 20%, #1d4ed8 0%, transparent 35%),
    radial-gradient(circle at 85% 85%, #075985 0%, transparent 35%),
    #080f23;
}
.container { max-width: 1100px; margin: auto; padding: 30px; }
nav { display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 25px; font-weight: 800; }
.logo span { color: #38bdf8; }
.online {
  padding: 10px 16px; border-radius: 30px;
  background: #064e3b; color: #86efac; font-size: 13px;
}
.hero { text-align: center; padding: 105px 0 65px; }
.tag {
  color: #7dd3fc; border: 1px solid #38bdf8;
  padding: 10px 20px; border-radius: 30px;
  font-size: 13px; letter-spacing: 2px;
}
h1 {
  font-size: clamp(42px, 7vw, 76px);
  line-height: 1.12; margin: 35px 0 20px;
}
h1 span { color: #38bdf8; }
.subtitle { color: #bac8e5; font-size: 18px; line-height: 1.8; }
.version {
  display: inline-block; margin-top: 28px;
  background: #172b50; border: 1px solid #33578c;
  padding: 15px 30px; border-radius: 14px;
  color: #7dd3fc; font-weight: bold;
}
.cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.card {
  padding: 30px; background: #ffffff0d;
  border: 1px solid #ffffff26; border-radius: 20px;
}
.card .icon { font-size: 35px; }
.card h3 { font-size: 21px; }
.card p { color: #bac8e5; line-height: 1.7; }
footer {
  text-align: center; margin-top: 70px;
  padding: 25px; border-top: 1px solid #ffffff22;
  color: #94a3b8;
}
@media(max-width:700px) {
  .cards { grid-template-columns: 1fr; }
  .hero { padding-top: 65px; }
}
</style>
</head>
<body>
<div class="container">
  <nav>
    <div class="logo">◆ DevOps<span>Flow</span></div>
    <div class="online">● SYSTEM ONLINE</div>
  </nav>

  <section class="hero">
    <span class="tag">TEST DEPLOYMENT</span>
    <h1>From Code to <span>Cloud.</span><br>One Seamless Flow.</h1>
    <p class="subtitle">
      Automated CI/CD Deployment on Ubuntu<br>
      Powered by GitHub, Jenkins, Docker and Nginx
    </p>
    <div class="version">✓ TEST RELEASE — VERSION 2.1.0</div>
  </section>

  <section class="cards">
    <div class="card">
      <div class="icon">⌘</div>
      <h3>GitHub + Jenkins</h3>
      <p>Source control and automated CI/CD deployment.</p>
    </div>
    <div class="card">
      <div class="icon">⬡</div>
      <h3>Docker + Nginx</h3>
      <p>Containerized web application and reverse proxy.</p>
    </div>
    <div class="card">
      <div class="icon">◉</div>
      <h3>Monitoring</h3>
      <p>Prometheus and Grafana for infrastructure monitoring.</p>
    </div>
  </section>

  <footer>VKU | DevOps CI/CD Project | Test Version 2.1.0</footer>
</div>
</body>
</html>
`;

http.createServer((req, res) => {
  const path = (req.url || "/").split("?")[0];

  if (path === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    });
    return res.end(JSON.stringify({
      status: "healthy",
      application: "DevOps Demo App",
      version: VERSION
    }));
  }

  if (path === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    return res.end(req.method === "HEAD" ? undefined : html);
  }

  res.writeHead(404);
  res.end("Not Found");
}).listen(PORT, "0.0.0.0", () => {
  console.log("DevOps App v" + VERSION + " running on port " + PORT);
});
