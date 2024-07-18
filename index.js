const http = require("http")
const query = require("querystring")
const mysql = require("mysql");
const con = mysql.createConnection({
  "host":"localhost",
  "user":"root" ,
  "password":"",
  "database":"blog" 
});
con.connect((er)=>{
    if(er){
        console.log(er);
    }else{
        console.log("we are connected")
    }
});
const server = http.createServer((re,rs)=>{
    console.log(re.url)
    const endPoint = re.url.split("?")[0];
    const queryEndPont = re.url.split("?")[1]; 
    const q = query.parse(queryEndPont)
   if(endPoint == "/search" || endPoint == "/search/"){
    con.query(`SELECT * FROM blog WHERE title like '%${q.q}%'`,(err,data)=>{
if(err) throw err;
rs.write(JSON.stringify(data))
rs.end()
    });
    
   }else{
    rs.setHeader("Content-Type","text/html");
    rs.write(`
        <form action="/search">
        <input type="text" name="q" id="search"> 
        <button>Search</button>
        </form>
        `)
    rs.end()
   }
   
});

server.listen(80)