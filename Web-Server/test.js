const fs = require("fs");

const path = "Web-Server/server.js";

try {
  let a = fs.lstatSync(path);
  console.log(a);
} catch (error) {
  console.log('File not found: '+error);
}
