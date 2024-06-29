import fs from 'node:fs/promises'
import express from 'express'
//
import testRouter from './api/test';
//
//import SsrTop from '../src/SsrTop';
// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

const topHtml = `
<html>
<head>
    <title>welcome</title>
</head>
<div id="app"></div>
<script type="module" src="/static/entry-client.js"></script>
</html>
`;
const prodHtml = `
<html>
<head>
    <title>welcome</title>
</head>
<div id="app"></div>
<script type="module" src="/public/static/entry-client.js"></script>
</html>
`;
//<script type="module" src="/public/static/entry-client.js"></script>
// Cached production assets
const templateHtml = isProduction
  ? prodHtml
  : '';
//await fs.readFile('./dist/client/index.html', 'utf-8')

// Create http server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
app.use('/api/test', testRouter);

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: {
      middlewareMode: true,
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100,
      },
    },
    appType: 'custom',
    base
  })
  app.use(vite.middlewares)
} else {
  app.use(express.static('public'));
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template, html
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      const rendered = await render();
      html = template
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '')
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
    }
    else {
      res.send(prodHtml);
    }
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
