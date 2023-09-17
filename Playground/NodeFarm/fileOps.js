const fs = require("fs");

// try {
//   let myFile = fs.readFileSync("./myFile.txt", "utf-8");
//   console.log(myFile);

//   myFile += `Date: ${new Date().toLocaleString()}\n`;
//   fs.writeFileSync("./myFile.txt", myFile);
// } catch {
//   console.log("falied to read file");
// }

//Reading file contents asynchronously
fs.readFile("./myFile.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(`Error reading file: ${err}`);
    return;
  }
  console.log(data);

  const newData = data + `Date: ${new Date().toLocaleString()}\n`;

  fs.writeFile("./myFile.txt", newData, (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`);
      return;
    }
    console.log("Date Logged to file");
  });
});

console.log("Reading file contents");
