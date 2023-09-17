module.exports = (template, data) => {
  const output = template
    .replace(/{%NAME%}/g, data.productName)
    .replace(/{%IMAGE-URL%}/g, data.image)
    .replace(/{%PRICE%}/g, data.price)
    .replace(/{%PLACE%}/g, data.from)
    .replace(/{%ORGANIC%}/g, data.organic ? "Organic" : " ")
    .replace(/{%DESCRIPTION%}/g, data.description)
    .replace(/{%ID%}/g, data.id)
    .replace(/{%NUTRIENTS%}/g, Object.keys(data.nutrients));
  return output;
};
