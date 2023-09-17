const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require("./modules/replaceTemplate");
const path = require("path");

const data = fs.readFileSync("./data/products.json", "utf-8");
const products = JSON.parse(data);

const productsTemplate = fs.readFileSync("./templates/products.html", "utf-8");
const productTemplate = fs.readFileSync("./templates/product.html", "utf-8");
const productDetailsTemplate = fs.readFileSync(
  "./templates/productDetails.html",
  "utf-8"
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/products" || pathname === "/") {
    res.writeHead(200, {
      "content-type": "text/html",
      "content-header": "all products",
    });

    const template = products.map((product) =>
      replaceTemplate(productTemplate, product)
    );
    const templateHTML = template.join("");
    const productsPage = productsTemplate.replace(
      /{%ALL PRODUCTS%}/g,
      templateHTML
    );
    res.end(productsPage);
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
      "content-header": "all products",
    });

    const template = replaceTemplate(
      productDetailsTemplate,
      products[query.id]
    );
    res.end(template);
  } else {
    res.writeHead(200, {
      "content-type": "text/html",
      "content-header": "custom header",
    });
    res.end("<h1>hello from server</h1>");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
