const http = require('http');

const PORT = process.env.PORT || 3000;
const VERSION = '4.0.0';
const RELEASE = 'ENTERPRISE RELEASE';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#07121e">
<title>DevOpsFlow | Enterprise Release ${VERSION}</title>
<style>
:root {
  --bg: #07121e;
  --panel: #101f30;
  --line: #233b50;
  --muted: #9bb2c7;
  --cyan: #57e6f2;
  --mint: #64f3b5;
  --blue: #6e9dff;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-height: 100vh;
  font-family: 'Segoe UI', Inter, Arial, sans-serif;
  color: #edf8ff;
  background:
    radial-gradient(ellipse 650px 430px at 83% 8%,
      #0a65704d, transparent 75%),
    radial-gradient(ellipse 600px 420px at 8% 42%,
      #17478250, transparent 75%),
    var(--bg);
}
body:before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: .15;
  background-image:
    linear-gradient(#3c789f33 1px, transparent 1px),
    linear-gradient(90deg, #3c789f33 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, #000, transparent 85%);
}
.wrap {
  position: relative;
  max-width: 1180px;
  margin: auto;
  padding: 26px 26px 40px;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 12px 0 24px;
  border-bottom: 1px solid #ffffff1b;
}
.brand {
  font-size: 24px;
  font-weight: 850;
  letter-spacing: -1px;
}
.brand .mark { color: var(--cyan); margin-right: 7px; }
.brand span { color: var(--mint); }
.navright {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.chip {
  border: 1px solid #4d9b995c;
  border-radius: 999px;
  padding: 9px 13px;
  color: #b5ffe1;
  background: #10372f80;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .6px;
}
.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 12px var(--mint);
  margin-right: 7px;
}
.navlink {
  color: #bed6e7;
  text-decoration: none;
  font-size: 13px;
}
.hero {
  display: grid;
  grid-template-columns: 1.25fr .75fr;
  gap: 34px;
  align-items: center;
  padding: 75px 0 54px;
}
.eyebrow {
  font-size: 12px;
  letter-spacing: 3px;
  color: var(--cyan);
  font-weight: 800;
}
.hero h1 {
  font-size: clamp(43px, 5.5vw, 75px);
  letter-spacing: -3px;
  line-height: 1.07;
  margin: 21px 0;
}
.hero h1 em {
  font-style: normal;
  background: linear-gradient(
    100deg, var(--cyan), var(--mint), #a4c6ff
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.lead {
  font-size: 17px;
  line-height: 1.85;
  color: #b3c8d8;
  max-width: 650px;
}
.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 29px;
}
.button {
  display: inline-block;
  text-decoration: none;
  padding: 14px 20px;
  border-radius: 11px;
  font-weight: 750;
  font-size: 13px;
  background: linear-gradient(100deg, #48d7e7, #67edb7);
  color: #062333;
  box-shadow: 0 9px 30px #36ddc333;
}
.button.secondary {
  background: #152b3b;
  border: 1px solid #355367;
  color: #d4eaf5;
  box-shadow: none;
}
.orb {
  position: relative;
  aspect-ratio: 1;
  max-width: 340px;
  margin: auto;
  display: grid;
  place-items: center;
}
.orb:before, .orb:after {
  content: '';
  position: absolute;
  border: 1px solid #55e9dc55;
  border-radius: 50%;
  inset: 3%;
  box-shadow: 0 0 80px #25b6d522;
}
.orb:after {
  inset: 15%;
  border-style: dashed;
  animation: spin 32s linear infinite;
}
.orb-inner {
  width: 65%;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle at 32% 25%, #225c68, #0b2338 70%
  );
  border: 1px solid #6cefd17d;
  box-shadow:
    inset 0 0 50px #2ef2d51a,
    0 0 65px #22b8b933;
  text-align: center;
}
.orb-inner .icon {
  font-size: 51px;
  color: var(--mint);
  line-height: 1;
}
.orb-inner strong {
  font-size: 32px;
  margin-top: 10px;
}
.orb-inner small {
  font-size: 11px;
  letter-spacing: 2px;
  color: #a3cbd3;
}
.orbit-tag {
  position: absolute;
  right: -10px;
  bottom: 22%;
  border: 1px solid #2e7880;
  border-radius: 12px;
  padding: 10px 14px;
  background: #10283ae8;
  font-size: 12px;
  color: #b3f8e7;
}
.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin: 16px 0 18px;
}
.section-heading h2 {
  font-size: 26px;
  letter-spacing: -.6px;
  margin: 4px 0;
}
.section-heading p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}
.section-label {
  font-size: 11px;
  color: var(--cyan);
  font-weight: 800;
  letter-spacing: 2px;
}
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.card {
  background: linear-gradient(145deg, #142c3cdd, #0b1b2bd9);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 16px 35px #0002;
}
.card .symbol {
  display: grid;
  place-items: center;
  width: 47px;
  height: 47px;
  border-radius: 13px;
  background: #1d53605c;
  color: var(--cyan);
  font-size: 25px;
}
.card h3 { font-size: 18px; margin: 20px 0 8px; }
.card p {
  color: var(--muted);
  line-height: 1.7;
  font-size: 13px;
  margin: 0;
}
.card .mini {
  margin-top: 20px;
  font-size: 11px;
  letter-spacing: 1px;
  color: var(--mint);
  font-weight: 800;
}
.pipeline {
  margin-top: 44px;
  padding: 28px;
  background: #0b1e2dcf;
  border: 1px solid var(--line);
  border-radius: 20px;
}
.steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 22px;
}
.step {
  flex: 1;
  min-width: 0;
  text-align: center;
  padding: 19px 7px;
  background: #163244;
  border: 1px solid #315467;
  border-radius: 12px;
}
.step .num {
  font-size: 11px;
  color: var(--cyan);
  letter-spacing: 1px;
}
.step strong {
  display: block;
  font-size: 14px;
  margin-top: 7px;
}
.arrow { color: var(--mint); font-size: 20px; }
.pipeline-note {
  margin: 18px 0 0;
  font-size: 12px;
  color: #9db8c8;
}
.bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 22px;
}
.panel {
  background: #101f30d9;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 26px;
}
.panel h3 { margin: 0 0 8px; font-size: 19px; }
.panel > p {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}
.envs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 22px;
}
.env {
  padding: 16px;
  border: 1px solid #355269;
  border-radius: 12px;
  background: #0b2131;
}
.env b { display: block; font-size: 18px; }
.env small {
  display: block;
  color: #a8bed1;
  margin-top: 6px;
}
.blue { color: #8dbaff; }
.green { color: #7bf0b3; }
.notice {
  font-size: 11px;
  color: #9bb2c7;
  margin-top: 14px;
}
.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  margin-top: 22px;
}
.metric {
  border: 1px solid #315267;
  background: #0b2131;
  border-radius: 12px;
  padding: 15px 8px;
  text-align: center;
}
.metric strong {
  display: block;
  color: var(--cyan);
  font-size: 21px;
}
.metric span {
  display: block;
  color: #a8bed1;
  font-size: 11px;
  margin-top: 6px;
}
.release {
  margin-top: 25px;
  padding: 24px;
  border-radius: 18px;
  border: 1px solid #4ee6bc77;
  background: linear-gradient(90deg, #0d51465a, #10384b88);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}
.release strong {
  display: block;
  font-size: 19px;
}
.release p {
  margin: 7px 0 0;
  color: #a7d8d3;
  font-size: 13px;
}
.release .version {
  font-size: 28px;
  color: var(--mint);
  font-weight: 850;
  white-space: nowrap;
}
footer {
  margin-top: 48px;
  padding: 24px 0 5px;
  border-top: 1px solid #ffffff24;
  color: #8fa9bd;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .orb:after { animation: none; }
}
@media (max-width: 850px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 52px;
  }
  .lead { margin: auto; }
  .actions { justify-content: center; }
  .orb { max-width: 260px; }
  .cards { grid-template-columns: 1fr; }
  .bottom { grid-template-columns: 1fr; }
  .steps { flex-wrap: wrap; }
  .step { min-width: 100px; }
  .arrow { display: none; }
}
@media (max-width: 500px) {
  .wrap { padding: 18px; }
  .hero h1 { letter-spacing: -1.5px; }
  .section-heading { display: block; }
  .metrics { grid-template-columns: 1fr 1fr; }
  .release {
    align-items: start;
    flex-direction: column;
  }
  footer { flex-direction: column; }
  .navlink { display: none; }
}
</style>
</head>
<body>
<div class="wrap">

  <nav>
    <div class="brand">
      <span class="mark">◆</span>DevOps<span>Flow</span>
    </div>
    <div class="navright">
      <a class="navlink" href="#pipeline">Pipeline</a>
      <a class="navlink" href="#infrastructure">Infrastructure</a>
      <div class="chip"><span class="dot"></span>SYSTEM ONLINE</div>
    </div>
  </nav>

  <section class="hero">
    <div>
      <div class="eyebrow">VKU · ${RELEASE}</div>
      <h1>Ship faster.<br><em>Deploy smarter.</em></h1>
      <p class="lead">
        A modern DevOps CI/CD demonstration platform.
        Developed on Windows, version-controlled on GitHub,
        and automatically deployed to Ubuntu using Jenkins,
        Docker and Blue-Green Deployment.
      </p>
      <div class="actions">
        <a class="button" href="#pipeline">Explore CI/CD Pipeline ↗</a>
        <a class="button secondary" href="#infrastructure">
          View Infrastructure
        </a>
      </div>
    </div>

    <div class="orb">
      <div class="orb-inner">
        <div class="icon">⬡</div>
        <strong>v${VERSION}</strong>
        <small>ENTERPRISE RELEASE</small>
      </div>
      <div class="orbit-tag">◆ AUTOMATED DELIVERY</div>
    </div>
  </section>

  <section>
    <div class="section-heading">
      <div>
        <div class="section-label">CORE CAPABILITIES</div>
        <h2>Everything in one workflow</h2>
      </div>
      <p>From source code to running application.</p>
    </div>

    <div class="cards">
      <div class="card">
        <div class="symbol">⌘</div>
        <h3>Continuous Integration</h3>
        <p>
          GitHub stores application code.
          Jenkins detects changes and builds a new Docker image.
        </p>
        <div class="mini">GITHUB + JENKINS</div>
      </div>

      <div class="card">
        <div class="symbol">⬡</div>
        <h3>Blue-Green Deployment</h3>
        <p>
          The new release is deployed to the standby environment,
          health-checked, then routed through Nginx.
        </p>
        <div class="mini">DOCKER + NGINX</div>
      </div>

      <div class="card">
        <div class="symbol">◉</div>
        <h3>Infrastructure Monitoring</h3>
        <p>
          Node Exporter, Prometheus and Grafana help monitor
          Ubuntu system resources and performance.
        </p>
        <div class="mini">PROMETHEUS + GRAFANA</div>
      </div>
    </div>
  </section>

  <section class="pipeline" id="pipeline">
    <div class="section-label">AUTOMATED DELIVERY</div>
    <h2>CI/CD Pipeline Architecture</h2>

    <div class="steps">
      <div class="step">
        <div class="num">01</div>
        <strong>Windows</strong>
      </div>
      <span class="arrow">→</span>
      <div class="step">
        <div class="num">02</div>
        <strong>GitHub</strong>
      </div>
      <span class="arrow">→</span>
      <div class="step">
        <div class="num">03</div>
        <strong>Jenkins</strong>
      </div>
      <span class="arrow">→</span>
      <div class="step">
        <div class="num">04</div>
        <strong>Docker</strong>
      </div>
      <span class="arrow">→</span>
      <div class="step">
        <div class="num">05</div>
        <strong>Ubuntu</strong>
      </div>
    </div>

    <p class="pipeline-note">
      Developer pushes source code → Jenkins detects changes →
      Docker image is built → standby container is deployed →
      health check passes → Nginx switches traffic.
    </p>
  </section>

  <section class="bottom" id="infrastructure">
    <div class="panel">
      <div class="section-label">ZERO-DOWNTIME STRATEGY</div>
      <h3>Blue-Green Deployment</h3>
      <p>
        Two application environments allow the next release
        to be prepared before receiving production traffic.
      </p>

      <div class="envs">
        <div class="env">
          <b class="blue">● BLUE</b>
          <small>Application · Port 3000</small>
        </div>
        <div class="env">
          <b class="green">● GREEN</b>
          <small>Application · Port 3002</small>
        </div>
      </div>

      <div class="notice">
        Architecture illustration — not a live indicator
        of which environment is active.
      </div>
    </div>

    <div class="panel">
      <div class="section-label">OBSERVABILITY</div>
      <h3>Infrastructure Monitoring</h3>
      <p>
        System metrics are collected by Prometheus
        and visualized through Grafana dashboards.
      </p>

      <div class="metrics">
        <div class="metric">
          <strong>CPU</strong>
          <span>Usage metrics</span>
        </div>
        <div class="metric">
          <strong>RAM</strong>
          <span>Memory metrics</span>
        </div>
        <div class="metric">
          <strong>DISK</strong>
          <span>Storage metrics</span>
        </div>
      </div>

      <div class="notice">
        For live metrics, open the Grafana dashboard.
      </div>
    </div>
  </section>

  <section class="release">
    <div>
      <strong>✓ ${RELEASE} READY</strong>
      <p>
        DevOpsFlow — automated CI/CD demonstration
        with Blue-Green Deployment.
      </p>
    </div>
    <div class="version">v${VERSION}</div>
  </section>

  <footer>
    <span>VKU | DevOps CI/CD Final Project</span>
    <span>DevOpsFlow · Release ${VERSION}</span>
  </footer>

</div>
</body>
</html>`;

http.createServer((req, res) => {
  const path = (req.url || '/').split('?')[0];

  if (path === '/health') {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    });

    return res.end(
      req.method === 'HEAD'
        ? undefined
        : JSON.stringify({
            status: 'healthy',
            application: 'DevOps Demo App',
            version: VERSION
          })
    );
  }

  if (path === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store'
    });

    return res.end(req.method === 'HEAD' ? undefined : html);
  }

  res.writeHead(404, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end('Not Found');

}).listen(PORT, '0.0.0.0', () => {
  console.log(
    'DevOps App v' + VERSION + ' running on port ' + PORT
  );
});
