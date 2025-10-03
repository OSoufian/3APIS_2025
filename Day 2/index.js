const express = require('express');
const fibonacci = require("./fibonacci");

const app = express();

app.get('/', (req, res) => {
    res.send(`<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>Todos</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <style>
    body{font-family:system-ui,Arial;padding:1.5rem;max-width:800px;margin:auto}
    table{border-collapse:collapse;width:100%}
    th,td{border:1px solid #ddd;padding:.5rem;text-align:left}
    th{background:#f5f5f5}
    .topbar a{margin-right:.75rem}
  </style>
</head>
<body>
  <div class="topbar">
    <a href="/index">🏠 Index</a>
    <a href="/form">➕ Nouveau</a>
  </div>
  <h1>Todo list</h1>
  <table>
    <thead><tr><th>ID</th><th>Texte</th><th>Fait</th><th>Action</th></tr></thead>
  </table>
</body>
</html>`);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
    console.log(fibonacci(1));
    
});
