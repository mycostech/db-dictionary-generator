# db-dictionary-generator
generate data dictionary in html format from existing database with template file.
using knex as query builder

# Usage

using **write(config, ?templateString)** to generate html on current directory.


ex. 
```js
const ddg = require("data-dictionary-generator");  
var config = {
    client: "pg",
    version: "14",
    connection: {
        host: "localhost",
        port: "5432",
        user: "postgres",
        password: "112345",
        database: "testdb",
    }
}  
ddg.write(config);
```

# global cli (v1.0.2)
use **ddg-write** to generate html on current directory via bash or cmd.
for config you can pass in below format

```ddg-write --client=pg --version=14 --port=5432 --host=localhost --user=postgres --password=112345 --database=testdb```
