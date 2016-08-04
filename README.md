# javascript setup
Put the following content in `src/main/webapp/.env` file :
```
NODE_ENV=development
PORT=8000
MODE=app
```
This will start the gulp webserver, which can be accessed on 9090 port

---
# Troubleshooting
Note: If you get this error :

```sh
events.js:141
      throw er; // Unhandled 'error' event
      ^

Error: watch webapp/app/scripts/main.js ENOSPC
```
Run the following command:
```sh
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

---
# Directory Structure

app/scripts
* models
    Plain ES6 Models (not framework dependent)
* stores
    Mobxdata stores for the Domains (using mobxdata)
* routers
    A single router for now (using react-router)
* components
    Reusable React components ( pagination, pills, toggles) )
    Please try to divide your view into independent, *reusable*, self sustained componentes
* containers
    Top level pages (like regions in Backbone). Defines the structure of a page.
    This will call various components
* themes
    CSS Themes (using something like Radium)
* utils
    For your usual stuffs!!

---

# Naming Conventions

# TODO

* Add support for PostCSS / LESS / SASS /SCSS

---
# Technologies used:
## Client Side
* React
* MobX
* ES6 (Babel)

---
# Tools
* Gulp
* Browserify

## Install
### OSX

Install Node.js

Via brew:
```bash
$ brew install node
```

Run setup script

```bash
$ ./bin/setup
```

## Run application

```bash
$ gulp
```


```bash
NODE_ENV=development # build app with development environment
NODE_ENV=production # build app with production environment
PORT=8000 # run server on 8000 port
```

Start to use application on browser:

```bash
localhost:8000
```
