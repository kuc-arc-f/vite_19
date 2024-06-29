import * as React from 'react';

//console.log("env=", process.env.NODE_ENV)
//
export default function Page() { 
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
    <!--app-head-->
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="/assets/entry-client.js"></script>
  </body>
</html>
`;
}
/*
"/public/assets/entry-client.js"
<script type="module" src="/assets/entry-client.tsx"></script>
*/
