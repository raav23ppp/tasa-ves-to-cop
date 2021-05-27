const puppeteer = require('puppeteer');

(async () => {
  try {
    console.time()
    const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://p2p.binance.com/es-LA/trade/sell/USDT', {
    waitUntil: 'networkidle2',
  });
  // // // await page.pdf({ path: 'hn.pdf', format: 'a4' });
  const Currency_Selector= "#C2Cfiatfilter_searhbox_fiat > div.css-17ehxay > input"
  await page.click(Currency_Selector)
  const cop_selector = "#COP > div"
  await page.click(cop_selector)
  await page.waitForSelector("div.css-1pysja1")

  const Payment_Method = "#C2Cpaymentfilter_searchbox_payment > div.css-17ehxay > input"
   await page.click(Payment_Method)
   const Payment_Method_Name= "#C2Cpaymentfilter_searchbox_payment > div.bn-sdd-dropdown.showing.css-1klqufe > div > div > input"
   await page.click(Payment_Method_Name)
   await page.type(Payment_Method_Name,"Bancolombia",{delay:0})//Si existe un delay entre el typing y el enter funciona perfecto
  await page.waitForSelector('#C2CoofferSell_btn_sellNow',{visible:true}) 
  //  await page.waitForSelector('#C2CofferBuy__btn_buyNow',{visible:true}) 
   await page.keyboard.press('Enter');
  //  await page.waitForSelector('.css-1m1f8hn')
  //   await page.waitForSelector('div.css-1pysja1')

  // await page.click("#Bancolombia\ S\.A > div")

  // await page.click("#Bancolombia\\ S\\.A > div")
  // await page.click("#Bancolombia\ S\.A")
  // console.log(element)
  const element2 = await page.$(".css-1ex66fz") //Ejemplo btc
  const text = await page.evaluate(element => element.textContent, element2);//Funciona con btc
  console.log(text)

  // const etext = await page.evaluate(elementoa => {
  //   // const petro = Object.getOwnPropertyNames(elementoa)
  //   console.log(elementoa)}, e1);//Funciona con btc
  // console.log(etext)}
   await page.waitForSelector("div.css-1m1f8hn")
  const VALOR = await page.$eval("div.css-1m1f8hn", (element) => {
    console.log(element)
    console.log(element.innerHTML)
    return element.innerHTML.split(".")[0]
  })
  console.log(VALOR)
  // await page.waitForSelector("div.css-1pysja1")
  await page.click(Currency_Selector)
  await page.click("#VES > div")
  await page.click(Payment_Method)

  await page.click(Payment_Method_Name)
  await page.type(Payment_Method_Name,"venezuela",{delay:0})
  await page.waitForSelector('#C2CoofferSell_btn_sellNow',{visible:true}) 
  // await page.waitForSelector('#C2CofferBuy__btn_buyNow',{visible:true}) 
  // await page.waitForSelector('#Bank\ Transfer\ \(Venezuela\)')
  await page.keyboard.press('Enter');
  // await page.waitForSelector('.css-1m1f8hn')
  //  await page.waitForSelector('div.css-1pysja1')


   await page.waitForSelector("div.css-1m1f8hn")
const VALOR2 = await page.$eval("div.css-1m1f8hn", (element) => {

  console.log(typeof element.innerHTML)
  return element.innerHTML.split(".")[0]
})
console.log(VALOR2)
console.log(typeof VALOR2)


const ValorCOP = VALOR.replaceAll(",","");;
const ValorVES = VALOR2.replaceAll(",","");


console.log(ValorCOP)
console.log(ValorVES)
  const TASA = parseInt(ValorCOP) / parseInt(ValorVES);
  console.log(`La Tasa es de ${TASA.toFixed(6)}`)
console.timeEnd()
}catch(error){console.error(error)}




  // const newPage = await page.evaluate(() => {
  //   // var petro = document.getElementById("__APP").getElementsByClassName("css-1m1f8hn")[0];
  //   var oDiv = page.querySelector("#__APP > div.layout__Container-sc-1v4mjny-0.cRRZNA.scroll-container > main > div.css-16g55fu > div > div.css-vurnku > div:nth-child(3) > div.css-3um3kv > div.css-11db165 > div > div > div.css-1m1f8hn");

  //   console.log(oDiv.nodeValue)
  //   return oDiv
  //   }); 


  
})();
console.log("sda") 