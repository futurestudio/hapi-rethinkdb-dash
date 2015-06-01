hapi-rethinkdb-dash
==========================

This is a project boilerplate based on NodeJS and RethinkDB. It reduces the initial effort which comes for every project. You can start with the fun things and skip the implementation of an account system (for the 25th time).

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

- NodeJS
- RethinkDB

Besides the core technologies it uses the following components (this list is very likely incomplete):

- [hapi](http://hapijs.com/) - Node.js Web Framework
- [Handlebars](http://handlebarsjs.com/) - HTML Templating Engine
- [Bcrypt](https://www.npmjs.com/package/bcrypt-nodejs) - For password encryption
- [Twitter Bootstrap](http://getbootstrap.com/) - UI Component & Layout Library
- [Mocha](https://www.npmjs.com/package/mocha) - node.js Testing framework


## Configuration & Install
Install NodeJS and RethinkDB before usage.

    git clone git@github.com:fs-opensource/hapi-rethinkdb-dash.git
    cd hapi-rethinkdb-dash
    npm install

The **database configuration** is placed in `server/config/database.js`.

    nano server/config/database.js

Currently this project does not use any handlebars helpers. That's why git deletes the `helpers` folder from within the `views` folder. Enabling helper classes requires you to uncomment the respective line in `server/config/settings.js`.

The password reset functionality requires a valid mail configuration. Change the `email` and `baseUrl` settings to make things work.

    nano server/config/settings.js

Start server

    node server

Everthing went smooth? Visit

    localhost:3000


## Tests
Run tests with

    npm test


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
