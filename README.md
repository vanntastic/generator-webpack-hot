## Webpack hot generator 

Generate a webpack hot loadable es6 ready project. This structure is different from using something like webpack-dev-server, it provides:

- framework agnosticism, use react, angular, whatever you like
- es6 support via babel
- support for request proxying via http-proxy, super handy if you need access to a backend server that you don't have to control of or if you don't want to mess with CORS just for development
- sass support

## Directory structure

```
- src/
-- index.html
-- main.js
-- index.scss
- dist/
-- ... build files here
- server.js
- package.json
- webpack.config.js
```

## Workflow

## License

MIT
