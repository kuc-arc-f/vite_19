# vite_19

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2024/06/29 

 update  :

***
### Summary

file base routing, Preact + express + vite +  SPA sample

***
### build

* build, dev-start

```
yarn build

#
yarn dev
```

***
* vercel.json

```

{
    "version": 2,
    "public": true,
    "builds": [
      {
        "src": "public/**/*",
        "use": "@vercel/static"
      },        
      {
        "src": "dist/server.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      { "handle": "filesystem" },
      {
        "src": "/.*",
        "dest": "/dist/server.js"
      }
    ]
}
```
***
### blog 

***

