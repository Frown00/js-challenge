const fs = require('fs');
const https = require('https');

function readContent(path) {
  return fs.readFileSync(path, 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }
  })
}

function fetchData(url) {
  return https.get(url, res => {
    let data = [];
  
    res.on('data', chunk => {
      data.push(chunk);
    });
  
    res.on('end', () => {
      const inputData = JSON.parse(Buffer.concat(data).toString());
      solve(inputData)
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
  });
}

function run(inputData) {
  const url = 'https://www.monogo.pl/competition/input.txt'
  const response = fetchData(url);
}

function extendProducts(products, colors, sizes) {
  for(let i = 0; i < products.length; i++) {
    const p = products[i];
    p.color = colors.find(c => c.id === p.id).value;
    p.size = sizes.find(s => parseInt(s.id) === p.id).value;
  }
  return products
}

function solve(inputData) {
  /**
   * colors: { [black, blue], sizes: [41, 43] }
   * products: { id: number, price: number }[]
   * colors: { id: number, value: string } []
   * sizes: { id: string, value: number } []
   */
  const { selectedFilters, products, colors, sizes } = inputData;
  const extendedProducts = extendProducts(products, colors, sizes);
  const cheap = extendedProducts.filter(p => p.price <= 200);
  const max = Math.max(...cheap.map(c => c.price))
  const min = Math.min(...cheap.map(c => c.price))
  const multiple = Math.floor(max * min)
  const result = multiple.toString().split('')
  const sum = []
  for(let i = 0; i < result.length; i+=2) {
    sum.push(parseInt(result[i]) + parseInt(result[i+1]));
  }
  console.log(sum, multiple)
  const final = sum[1] * multiple * 'Monogo'.length
  console.log(final);
}

run()