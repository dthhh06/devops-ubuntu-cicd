const http = require("http");

const PORT = process.env.PORT || 3000;
const VERSION = "3.0.0";

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DevOpsFlow | Final Release 3.0</title>
<style>
* { box-sizing: border-box; }
body {
  margin: 0; min-height: 100vh;
  font-family: 'Segoe UI', Arial, sans-serif;
  background:
    radial-gradient(circle at 15% 15%, #6d28d9 0%, transparent 38%),
    radial-gradient(circle at 85% 80%, #9d174d 0%, transparent 40%),
    #110b24;
  color: white;
}
.container { max-width: 1150px; margin: auto; padding: 30px; }
nav { display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 26px; font-weight: 800; }
.logo span { color: #f0abfc; }
.online {
  padding: 10px 16px; border-radius: 30px;
  background: #064e3b; color: #86efac; font-size: 13px;
}
.hero { text-align: center; padding: 95px 0 60px; }
.tag {
  display: inline-block; padding: 11px 23px;
  border: 1px solid #e879f9; border-radius: 30px;
  color: #f0abfc; letter-spacing: 2px; font-size: 13px;
}
h1 {
  font-size: clamp(42px, 7vw, 78px);
  line-height: 1.13; margin: 32px 0 20px;
}
.gradient {
  background: linear-gradient(90deg,#c084fc,#f9a8d4,#f0abfc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.subtitle { color: #d5c8e8; font-size: 18px; line-height: 1.8; }
.success {
  display: inline-block; margin-top: 28px;
  padding: 17px 32px; border-radius: 15px;
  background: linear-gradient(90deg,#7c3aed,#db2777);
  box-shadow: 0 12px 35px #a21caf55;
  font-weight: bold;
}
.cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.card {
  background: #ffffff0e; border: 1px solid #ffffff30;
  border-radius: 22px; padding: 30px;
}
.card .icon { font-size: 36px; }
.card h3 { font-size: 21px; margin-bottom: 10px; }
.card p { color: #d5c8e8; line-height: 1.7; }
.banner {
  margin-top: 30px; padding: 25px;
  border: 1px solid #c084fc66;
  border-radius: 20px; text-align: center;
  background: #a855f71a;
}
.banner h2 { color: #f0abfc; margin: 0 0 10px; }
.banner p { color: #e9d5ff; margin-bottom: 0; }
footer {
  text-align: center; margin-top: 55px;
  padding: 25px; border-top: 1px solid #ffffff22;
  color: #c4b5d6;
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
    <span class="tag">FINAL PROJECT DEMONSTRATION</span>
    <h1>Build. Deploy.<br><span class="gradient">Automate Everything.</span></h1>
    <p class="subtitle">
      Modern DevOps CI/CD Infrastructure<br>
      Developed on Windows — Deployed on Ubuntu
    </p>
    <div class="success">✓ DEPLOYMENT SUCCESSFUL — VERSION 3.0.0</div>
  </section>

  <section class="cards">
    <div class="card">
      <div class="icon">⌘</div>
      <h3>Continuous Integration</h3>
      <p>GitHub and Jenkins automate the source checkout and build process.</p>
    </div>
    <div class="card">
      <div class="icon">⬡</div>
      <h3>Continuous Deployment</h3>
      <p>Docker and Nginx deliver the latest web application release.</p>
    </div>
    <div class="card">
      <div class="icon">◉</div>
      <h3>Infrastructure Monitoring</h3>
      <p>Prometheus and Grafana provide real-time monitoring dashboards.</p>
    </div>
  </section>

  <section class="banner">
    <h2>🚀 CI/CD PIPELINE COMPLETED</h2>
    <p>Source Code → GitHub → Jenkins → Docker → Ubuntu Server</p>
  </section>

  <footer>VKU | DevOps CI/CD Final Project | Release 3.0.0</footer>
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
