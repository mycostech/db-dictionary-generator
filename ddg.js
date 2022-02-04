let schemaInspector = require('knex-schema-inspector');
let defaultTemplate = require('./template.js')
const fs = require('fs');

var config = {
    client: "",
    version: "",
    connection: {
        host: "",
        port: "",
        user: "",
        password: "",
        database: "",
    }
}

function getBooleanMark(value){
    if(value === true || value === "true")
        return "✔";
    else if(value === false || value === "false")
        return "❌";
    else
        return "";
}

function getString(value){
    if(value === null || value === undefined)
        return "";
    else
        return value;
}

function generateHtml(schemaArray,template,config) {
    var htmlContent = template;

    let start = template.indexOf("${tableStart}");
    let end = template.indexOf("${tableEnd}");
    var tableTemplate = template.substring(start+13,end);

    var allTableContent = "";
    var tableList = "<ul class='table-of-content'>";

    schemaArray.map((table,index)=>{
        var tableContent = tableTemplate;
        tableList += `<li><a href="#table-${tableName[index]}">${tableName[index]}</a></li>`
        

        var grid = `<table>
                        <thead>
                            <tr>
                                <th>key</th>
                                <th>name</th>
                                <th>data type</th>
                                <th>is generated</th>
                                <th>is nullable</th>
                                <th>comment</th>
                                <th>is unique</th>
                                <th>has auto
                                increment</th>
                                <th>generation
                                expression</th>
                                <th>default
                                value</th>
                                <th>max
                                length</th>
                                <th>numeric
                                precision</th>
                                <th>numeric
                                scale</th>
                                <th>references</th>
                            </tr>
                        </thead>
                        <tbody>`;
        table.map((col)=>{  
            var fk_string = `${col.foreign_key_schema ? col.foreign_key_schema.toString()+"." : ""}${col.foreign_key_table ? col.foreign_key_table.toString()+"." : ""}${col.foreign_key_column ? col.foreign_key_column.toString() : ""}`
            grid += `<tr>
                <td>${col.is_primary_key ? "<span class='badge'>PK</span> " : ""}</td>
                <td>${getString(col.name)}</td>
                <td>${getString(col.data_type)}</td>
                <td class="center">${getBooleanMark(col.is_generated)}</td>
                <td class="center">${getBooleanMark(col.is_nullable)}</td>
                <td>${getString(col.comment)}</td>
                <td class="center">${getBooleanMark(col.is_unique)}</td>
                <td class="center">${getBooleanMark(col.has_auto_increment)}</td>
                <td>${getString(col.generation_expression)}</td>
                <td>${getString(col.default_value)}</td>
                <td>${getString(col.max_length)}</td>
                <td>${getString(col.numeric_precision)}</td>
                <td>${getString(col.numeric_scale)}</td>
                <td>${fk_string}</td>
                `
        });

        grid += "</tbody></table>";

        tableContent = tableContent.replace(/\$\{tableName\}/g,tableName[index]);
        tableContent = tableContent.replace("${tableContent}",grid);

        allTableContent += tableContent;
    })

    tableList += "</ul>";
    tableStringToRemove = template.substring(start,end+11);
    htmlContent = htmlContent.replace(tableStringToRemove, allTableContent);

    htmlContent = htmlContent.replace(/\$\{dbName\}/g, config.connection.database)
    .replace("${createDate}", new Date().toUTCString())
    .replace("${tableList}", tableList);

    return htmlContent;
}

function closeConnection(con){
    con.destroy();
}

async function readFs(templatePath){
    return await fs.readFile(templatePath,(err,data) => {
        if (err) {
          console.error(err);
          return "";
        }else
            return data.toString();
    });
}

/**
 * main function
 * @param {*} config 
 * @returns 
 */
async function write(config,templatePath = "|default|") {
    const knex = require('knex')(config);
    const inspector = schemaInspector.default(knex);

    tableName = await inspector.tables();
    console.log(tableName);
    
    var schema = await Promise.all(tableName.map(async (colName)=>{
        var columnInfo = await inspector.columnInfo(colName);
        return columnInfo;
    }));

    await inspector.foreignKeys().then((res)=>{
        return;
    });

    //Create dictionary file
    console.log("start export file process");
    var template = "";
    if(templatePath === "|default|"){
        template = defaultTemplate;
    }else{
        template = readFs(templatePath);
    }

    var template = data.toString();
    var htmlContent = generateHtml(schema, template, config);

    fs.writeFile('./dictionary.html',htmlContent,err => {
        if (err) {
            console.error(err);
            closeConnection(knex);
            return;
        }else{
            console.log("write file success");
            closeConnection(knex);
            return;
        }
        
    });
    return;
};

const ddg = { write: write };
module.exports = ddg;
//close connection and end process
//write().then(()=>{knex.destroy();});
