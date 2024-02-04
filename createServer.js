const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body id="body"><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
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
  fs.readFile("message.txt", "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("Internal Server Error");
      console.error("Error reading file:", err);
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    console.log(data);
    res.write("<html>");
    res.write(`<body><h1>${data}</h1></body>`);
    res.write("</html>");
    return res.end();
  });
});
server.listen(4000);
