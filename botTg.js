const {Telegraf} = require ("telegraf")      
const bot = new Telegraf("1546836095:AAHK1CJpyC5aziSiODUNheH3qigRnFAtI9w")
const searcher = require('./searchAndScrappTheExchangePriceCopVes.js')
// async function* GeneratorInterval(ctx) {
//     console.log(ctx)
//     let a = true
//     if (a == true) {
//         yield setInterval(() => {ctx.reply("Test")}, 1000);
//     } 
//     a = false
//     if (a == false) {
//         clearInterval(GeneratorInterval);
//     } 
//     yield;
// }



let int;

 let switchInterval =(ctx, off) => {
    if (off) {
        console.log("apagado")
        clearInterval(int)
    } else {
        console.log("cendido")
      int = setInterval( function() {
        ctx.reply(`--Para este momento la tasa es: ${searcher.TASA}--`)}, 600000)
    }
}

bot.start((ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply("Hola!,comenzemos a mantenerte informado:")
    switchInterval(ctx)
})

bot.help((ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`¡ Hola !, soy TR, un bot creado para informarte de la tasa para el cambio de pesos y bolivares en tiempo real.
    Si tienes algun problema, intenta escribir /Start
    Comandos:

    /Start 🟢 
    /informacion
    /Gracias
    /Donaciones
    /Stop 🛑
    `)
})

bot.command(["Gracias","gracias","GRACIAS"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`Nunca te des por vencido, a seguir adelante. ⚡`)
})

bot.command(["Stop","stop","STOP"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`He detenido la ejecucion. hasta pronto!`);
    clearInterval(int)
})
bot.command(["informacion","Informacion","INFORMACION"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`Para sacar la tasa, consulto cada 10 minutos el precio estimado del USDT o Theter en Bolivares (VES), luego en
    Pesos Colombianos (COP), y mediante una division puedo determinar la tasa.
    `);
    
})
bot.command(["Donaciones","DONACIONES","donaciones"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`Si deseas ayudar al pequeño a comprar su tasa de cafe ☕ al inicio de cada jornada, puedes donarnos 
    a traves de Paypal o Binance a la siguiente direccion de correo:  ricardo.v1v45@gmail.com , tambien puedes ponerte
    en contacto con nosotros por allí si tienes algun problema o inconveniente.`);
})

bot.launch() //Iniciar bot