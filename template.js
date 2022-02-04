var template = `
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>\${dbName} data dictionary</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <style>
        body{
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
        }
        .container{
            margin-right: auto;
            margin-left: auto;
            max-width: 1800px;
            padding: 10px;
            background-color: rgb(255, 255, 255);
        }

        .top-btn, .table-of-content li{
            cursor: pointer;
        }
        .table-of-content li:hover{
            color: #049962;
        }
        .center{
            text-align: center;
        }

        .badge{
            color: #fff;
            background-color: #007bff;
            display: inline-block;
            padding: 0.25em 0.4em;
            font-size: 75%;
            font-style: bold;
            font-weight: 700;
            line-height: 1;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: 0.25rem;
            
        }
        .tableObject table {
            border-collapse: collapse;
            width: 100%;
            display: block;
            overflow: auto;
        }

        .tableObject td, .tableObject th {
            border: 1px solid #ddd;
            padding: 6px;
        }

        .tableObject tr{
            background-color: #f9f9f9;
        }

        .tableObject tr:hover {
            background-color: #a9e4ce;
        }

        .tableObject th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: center;
            background-color: #04AA6D;
            color: white;
        }

        
    </style>
</head>
<body>
    <script>
        function toTop() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
    </script>
    <div class="container">
        <h1>Database: \${dbName}</h1>
        <p>This document is generated on \${createDate}</p>
        
        <h3>List of tables</h3>
        \${tableList}

        \${tableStart}<div class="tableObject">
            <div>
                <h2 id="table-\${tableName}"><span class="top-btn" title="back to top" onclick="toTop()">&#8593;</span> Table: ${tableName}</h2>
            </div>
            \${tableContent}
        </div>
        \${tableEnd}
    </div>
</body>
</html>`

module.exports = template;
