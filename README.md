# db-dictionary-generator
generate data dictionary in html format from existing database with template file.
using knex as query builder

# Usage

using write(config, ?templatePath) to generate html  on current directory.

ex. 
> const ddg = require("db-dictionary-generator");

> let config = {
    client: "pg",
    version: "14",
    connection: {
        host: "localhost",
        port: "5432",
        user: "postgres",
        password: "postgres",
        database: "testdb",
    }
}

> ddg.write(config);


