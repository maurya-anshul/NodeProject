const fs = require("fs");
const requestHandler=((req,res)=>{
const url=req.url;
const method=req.method;
    if (url === "/") {
        fs.readFile("message.txt", "utf-8", (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end("Internal Server Error");
            console.error("Error reading file:", err);
            return;
          }
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write("<html>");
          res.write("<head><title>Enter Message</title></head>");
          res.write(`<body>${data}</body>`);
          res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
          );
          res.write("</html>");
          return res.end();
        });
      }
      if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
          console.log(chunk.toString());
          body.push(chunk);
        });
        return req.on("end", () => {
          const pasreBody = Buffer.concat(body).toString();
          const message = pasreBody.split("=")[1];
          fs.writeFile("message.txt", message, (err) => {
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
          });
        });
      }
});
// module.exports={
//     handler: requestHandler,
//     someText:'some hard coded text'
// }

// module.exports.handler=requestHandler;
// module.exports.someText='Some hard coded text'


exports.handler=requestHandler;
exports.someText='Some hard coded text'