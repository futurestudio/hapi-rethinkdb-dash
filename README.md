hapi-rethinkdb-boilerplate
==========================

Hapi + RethinkDB Boilerplate


## Setup

### Database
You have to create the specified database on your own. The used ORM `thinky`
does not take care of it. However, the created models are translated into tables.

**What to do**
Go to `server/settings/database.js` and set your database connection settings.
They are configured to connect to RethinkDB on the default port. Afterwards,
set the database name you created in RethinkDB (probably RethinkDB admin panel).
