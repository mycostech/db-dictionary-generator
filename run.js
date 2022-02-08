#!/usr/bin/env node
const ddg = require("./ddg.js");

var trimmedArgs = process.argv.slice(2);
var args = {}

trimmedArgs.map((item) => {
    let start = item.indexOf("--");
    let end = item.indexOf("=");
    if(start!=-1 && start < end){
        args[item.substring(2,end)] = item.substring(end+1,item.length);
    }
})

console.log(args);

var config = {
    client: args.client ? args.client : process.env.CLIENT,
    version: args.version ? args.version : process.env.VERSION,
    connection: {
        host: args.host ? args.host : process.env.HOST,
        port: args.port ? args.port : process.env.PORT,
        user: args.user ? args.user : process.env.USER,
        password: args.password ? args.password : process.env.PASSWORD,
        database: args.database ? args.database : process.env.DATABASE,
    }
}

ddg.write(config);

