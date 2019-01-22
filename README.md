hapi RethinkDB Dash
==========================

Your Node.js boilerplate based on [hapi](http://hapijs.com/) and [RethinkDB](https://rethinkdb.com/).

[![Build Status](https://semaphoreci.com/api/v1/futurestudio/hapi-rethinkdb-dash/branches/develop/badge.svg)](https://semaphoreci.com/futurestudio/hapi-rethinkdb-dash)
[![Known Vulnerabilities](https://snyk.io/test/github/fs-opensource/hapi-rethinkdb-dash/badge.svg)](https://snyk.io/test/github/fs-opensource/hapi-rethinkdb-dash) [![Greenkeeper badge](https://badges.greenkeeper.io/futurestudio/hapi-rethinkdb-dash.svg)](https://greenkeeper.io/)


## Futureflix
`hapi-rethinkdb-dash` is outdated and currently unmaintained. You can still benefit from the ideas within this code.

We started **[learn hapi](http://learnhapi.com) as a learning path for the hapi web framework**. Become a hapi hero by following the tutorial series. 

<p>
  <a href="http://learnhapi.com">	
    <img src="https://futurestud.io/images/badges/hapi-hero-md.svg" height="30" />	
  </a>
</p>

You’ll build a complete app from start to finish. From zero to hero!

Check out the [Futureflix Starter Kit](https://github.com/fs-opensource/futureflix-starter-kit) for more details :tv:


-----


## Project Overview
This is a project boilerplate based on Node.js and RethinkDB. It reduces the initial effort which comes for every project. You can start with the fun things and skip the implementation of an account system (for the 25th time).

Development of Hapi-RethinkDB-Dash is ongoing and we plan to implement new features over time. The following list depicts the already available features

- Accounts
    - Create new Accounts (Email/Password)
    - Login
    - Edit account information (Name, Homepage)
    - Change Password
    - Delete Account
- Environment-based database access
    - different DBs for development, testing and production environments (per NODE_ENV)
- Test Coverage


## Stack
Hapi-RethinkDB-Dash requires

- Node.js
- RethinkDB

Besides the core technologies it uses the following components (this list is very likely incomplete):

- [hapi](https://hapijs.com/) — Node.js web framework
- [RethinkDB](https://rethinkdb.com/) — Open-Source database for the realtime web
- [Handlebars](http://handlebarsjs.com/) — HTML templating engine
- [bcrypt](https://www.npmjs.com/package/bcrypt) — For password encryption
- [Twitter Bootstrap v3](http://getbootstrap.com/) — UI component & layout library
- [Lab](https://github.com/hapijs/lab) — Node.js testing framework


## Configuration & Install
Install Node.js and RethinkDB before usage.

```bash
git clone git@github.com:fs-opensource/hapi-rethinkdb-dash.git
cd hapi-rethinkdb-dash
npm install
```

The **database configuration** is placed in `server/config/database.js`.

```bash
nano server/config/database.js
```

Currently this project does not use any handlebars helpers. That's why git deletes the `helpers` folder from within the `views` folder. Enabling helper classes requires you to uncomment the respective line in `server/config/settings.js`.

The password reset functionality requires a valid mail configuration. Change the `email` and `baseUrl` settings to make things work.

```bash
nano server/config/settings.js
```

Start server

```bash
node server
```

Everything went smooth? Visit

```bash
localhost:3000
```


## Tests
Run tests with

```bash
npm test
```


## Contributions
We very warmly welcome any contributions. If it's bugs, feature requests or implementation, we enjoy feedback :)

    The MIT License (MIT)

    Copyright (c) 2015 Future Studio

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
