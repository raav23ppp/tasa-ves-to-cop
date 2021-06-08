const puppeteer = require('puppeteer');
(async () => {
 
  
    // setInterval(() => {
    //     work()
    // }, 30000);
    console.warn("Start")
    let TimesExcecuted = 1
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],

    }); //{headless:false}
    const page = await browser.newPage();
    searchAndScrappTheExchangeCOP_VESRate()
    async function searchAndScrappTheExchangeCOP_VESRate () {
        console.time()
  try {

    const PosiblesSelectoresBinance = ["#C2Cfiatfilter_searhbox_fiat > div.bn-input-md.css-1vd5j1n > input|#C2Cpaymentfilter_searchbox_payment > div.bn-input-md.css-1vd5j1n > input"]
      console.log(`Test ${TimesExcecuted}`)
  await page.goto('https://p2p.binance.com/es-LA/trade/sell/USDT', {
    waitUntil: 'networkidle2',
  });

  let  vecesIntentadas = 0
  // // // await page.pdf({ path: 'hn.pdf', format: 'a4' });
    async function CambiarDivisa(moneda = "COP", tabla) {
      try {
        let Currency_Table_Selector= tabla || "#C2Cfiatfilter_searhbox_fiat > div.bn-input-md.css-1piw0cg > input" //#C2Cfiatfilter_searhbox_fiat > div.bn-input-md.css-1vd5j1n > input
        await page.click(Currency_Table_Selector)
        //  await page.click(Currency_Table_Selector)
        // await page.click("#C2Cfiatfilter_searhbox_fiat > div.bn-input-md.css-1vd5j1n > input")
      const Currency_selector = `#${moneda} > div`
      await page.click(Currency_selector)
      await page.waitForSelector("div.css-1pysja1")
      console.log("Cambio Divisa Exitoso")
      } catch (error) {
        vecesIntentadas = vecesIntentadas + 1
        console.error("Error selector cambiando divisa : " + error  + "Veces intentadas " + vecesIntentadas)
        await CambiarDivisa(moneda,PosiblesSelectoresBinance[-1 + vecesIntentadas].split('|')[0])
      }
    }
    console.log("VECES TRYED" + vecesIntentadas)

    await CambiarDivisa()
    vecesIntentadas = 0

    async function ChosePaymentMethod(bank = "Bancolombia", tabla) {
      try {
      let Payment_Method = tabla || "#C2Cpaymentfilter_searchbox_payment > div.bn-input-md.css-1piw0cg > input" // #C2Cfiatfilter_searhbox_fiat > div.bn-input-md.css-1vd5j1n > input
        await page.click(Payment_Method)
      let Payment_Method_Name= "#C2Cpaymentfilter_searchbox_payment > div.bn-sdd-dropdown.showing.css-1klqufe > div > div > input"
      await page.click(Payment_Method_Name)
      await page.type(Payment_Method_Name,bank,{delay:2000})//Si existe un delay entre el typing y el enter funciona perfecto
     await page.waitForSelector('#C2CoofferSell_btn_sellNow',{visible:true}) 
     //  await page.waitForSelector('#C2CofferBuy__btn_buyNow',{visible:true}) 
      await page.keyboard.press('Enter');
      console.log("eligio metodo banko Exitoso")
    }
   catch (error) {
    vecesIntentadas = vecesIntentadas + 1
    console.error("Error selector cambiando divisa : " + error  + "Veces intentadas " + vecesIntentadas)
    await ChosePaymentMethod(bank,PosiblesSelectoresBinance[-1 + vecesIntentadas].split('|')[1])
  }}

    await ChosePaymentMethod()
    vecesIntentadas = 0

  const element2 = await page.$(".css-1ex66fz") //Ejemplo btc
  const text = await page.evaluate(element => element.textContent, element2);//Funciona con btc
  console.log(text)
 
  
   await page.waitForSelector("div.css-1m1f8hn")
   const ValorPesos = await page.$eval("div.css-1m1f8hn", (element) => {
    console.log(typeof element.innerHTML)
    return element.innerHTML.split(".")[0].replaceAll(",","")
  })
   console.log(ValorPesos)

  await CambiarDivisa("VES")
  vecesIntentadas = 0
  await ChosePaymentMethod("venezuela")

   await page.waitForSelector("div.css-1m1f8hn")
const ValorVES = await page.$eval("div.css-1m1f8hn", (element) => {
 
    return element.innerHTML.split(".")[0].replaceAll(",","")
  })
console.log(ValorVES)

const TASA = parseInt(ValorPesos) / parseInt(ValorVES);
  console.log(`-----La Tasa es de ${TASA.toFixed(7)}--------`)

//  await RUTA_TASA.update({tasa: TASA.toFixed(6)});
exports.ValorPesos = ValorPesos;
exports.ValorVES = ValorVES;
exports.TASA = TASA.toFixed(6);

console.timeEnd()
}catch(error){console.error(error)}
setTimeout(() => {
     TimesExcecuted = TimesExcecuted + 1
    searchAndScrappTheExchangeCOP_VESRate()
}, 1145000); //1145000
}


  // const newPage = await page.evaluate(() => {
  //   // var petro = document.getElementById("__APP").getElementsByClassName("css-1m1f8hn")[0];
  //   var oDiv = page.querySelector("#__APP > div.layout__Container-sc-1v4mjny-0.cRRZNA.scroll-container > main > div.css-16g55fu > div > div.css-vurnku > div:nth-child(3) > div.css-3um3kv > div.css-11db165 > div > div > div.css-1m1f8hn");

  //   console.log(oDiv.nodeValue)
  //   return oDiv
  //   }); 


  
})();

console.log("sda") 