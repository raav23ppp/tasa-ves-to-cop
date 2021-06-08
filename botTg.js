const {Telegraf} = require ("telegraf")
const bot = new Telegraf("1546836095:AAHK1CJpyC5aziSiODUNheH3qigRnFAtI9w")
const searcher = require('./searchAndScrappTheExchangePriceCopVes.js')
// async function* GeneratorInterval(ctx) {
//     console.log(ctx)
//     let a = true
//     if (a == true) {


//         yield setInterval(() => {ctx.reply("Test")}, 1000);
// //     }

//     a = false
//     if (a == false) {
//         clearInterval(GeneratorInterval);
//     }
//     yield;
// }
console.log("inicio bot tg")
const CantPersonasActivas = [];

// let int;
setInterval(() => {
    console.log("Informando tasa (intervalo)")
    CantPersonasActivas.forEach((id)=> bot.telegram.sendMessage(id,`
🔸El precio estimado del dolar en VES es: ${searcher.ValorVES}
🔸El precio estimado del dolar en COP es: ${searcher.ValorPesos}
    
🔷Para este momento la tasa es de: ${searcher.TASA}  `))
}, 1200000);

// let switchInterval =(ctx) => {
//         console.log("Encendido intervalo")
//         int = setInterval( function() {
//         ctx.reply(`--Para este momento la tasa es de: ${searcher.TASA} --`)}, 1000000)
// }

bot.start((ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`Hola!, si tienes alguna duda o inconveniente puedes consultar el comando /help o escribir help

🔸 Comandos útiles:

/start 🟢
/Informacion📜
/Gracias🤝
/Donaciones💎
/Stop 🛑
    `);

    let iduser = ctx.chat.id

    if (CantPersonasActivas.includes(iduser) == false){
        ctx.reply(`Empezamos a mantenerte informado 🟢. en unos minutos comenzare a informarte sobre la tasa`);
        // switchInterval(ctx);
        CantPersonasActivas.push(iduser)
        console.log(`**Personas activas tg : ${CantPersonasActivas.length}`)
    }


})
bot.command(["Start","START"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`Hola!, si tienes alguna duda o inconveniente puedes consultar el comando /help

🔸 Comandos útiles:

/start 🟢
/Informacion📜
/Gracias🤝
/Donaciones💎
/Stop 🛑
`);

    let iduser = ctx.chat.id

    if (CantPersonasActivas.includes(iduser) == false){
        ctx.reply(`Empezamos a mantenerte informado 🟢. en unos minutos comenzare a informarte sobre la tasa`);
        // switchInterval(ctx);
        CantPersonasActivas.push(iduser)
        console.log(`**Personas activas tg : ${CantPersonasActivas.length}`)
    }
})


bot.help((ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(` Hola , soy TR, un bot creado para informarte de la tasa para el cambio de pesos y bolivares en tiempo real.
Si no te estoy informando, intenta escribir /start y en unos minutos comenzaré a hacerlo.


🔸 Comandos útiles:

/start 🟢

/Informacion📜
/Donaciones💎

/Stop 🛑
`)
})


bot.command(["Gracias","gracias","GRACIAS"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`Nunca te des por vencido, a seguir adelante. ⚡`)
})

bot.command(["informacion","Informacion","INFORMACION"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`Para sacar la tasa, consulto  cada cierto tiempo el precio estimado del USDT o Theter en Bolivares (VES),
después en Peso Colombiano (COP), y mediante una division puedo determinar la tasa


*Nota: Mi finalidad es solamente informativa
`);

})
bot.command(["Donaciones","DONACIONES","donaciones"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`Si deseas ayudar al pequeño equipo que me desarrolló a comprar su tasa de cafe ☕ al inicio de cada jornada, puedes donarnos
a traves de Paypal o Binance a la siguiente direccion de correo:

🔸 ricardo.v1v45@gmail.com 

Tambien puedes ponerte en contacto con mi equipo creador por correo, en caso de que tengas alguna sugerencia o inconveniente`);
})
bot.on('stiker', (ctx) => {
    ctx.reply(`En unos minutos te estaremos informando de la tasa`)
})
bot.on('image', (ctx) => {
    ctx.reply(`En unos minutos te estaremos informando de la tasa`)
})
bot.command(["Stop","stop","STOP"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`Hola!, si tienes alguna duda o inconveniente puedes consultar el comando /help`)
    let iduser = ctx.chat.id
    if (CantPersonasActivas.includes(iduser) == true){
        const index = CantPersonasActivas.findIndex((elementoevaluando => {
            return iduser === elementoevaluando
            }))
        
        ctx.reply(`He detenido la ejecucion. hasta pronto!`);
        // // clearInterval(int)
        CantPersonasActivas.splice(index,1)
        // CantPersonasActivas.pop(iduser)
        console.log(`**Personas activas tg : ${CantPersonasActivas.length}`)
    }

})


bot.hears(["Gracias","gracias","GRACIAS"], (ctx) =>{
     ctx.reply(`Nunca te des por vencido ⚡`)
})
bot.hears(["informacion","Informacion","INFORMACION"], (ctx) =>{
    ctx.reply(`Para sacar la tasa, consulto  cada cierto tiempo el precio estimado del USDT o Theter en Bolivares (VES). 
después en Peso Colombiano (COP), y mediante una division puedo determinar la tasa
    
    
🔸 Nota: Mi finalidad es solamente informativa
`);
})
bot.hears(["Donaciones","DONACIONES","donaciones","donar","ayudar","paypal","binance"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`Si deseas ayudar al pequeño equipo que me desarrolló a comprar su tasa de cafe ☕ al inicio de cada jornada, puedes donarnos
a traves de Paypal o Binance a la siguiente direccion de correo:
    
🔸 ricardo.v1v45@gmail.com 
    
Tambien puedes ponerte en contacto con mi equipo creador por correo, en caso de que tengas alguna sugerencia o inconveniente`);
})
bot.hears(["ricardo","Ricardo"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`⚡`);
})
bot.hears(["help","Help","HELP","ayuda","Ayuda"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(` Hola , soy TR, un bot creado para informarte de la tasa para el cambio de pesos y bolivares en tiempo real.
Si no te estoy informando, intenta escribir /start y en unos minutos comenzaré a hacerlo


🔸 Comandos útiles:

/start 🟢

/Informacion📜
/Donaciones💎

/Stop 🛑
    `)
})
bot.hears(["start","START","Start"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`Hola!, si tienes alguna duda o inconveniente puedes consultar el comando /help o escribir help


🔸 Comandos útiles:

/start 🟢
/Informacion📜
/Gracias🤝
/Donaciones💎
/Stop 🛑
`);

    let iduser = ctx.chat.id

    if (CantPersonasActivas.includes(iduser) == false){
        ctx.reply(`Empezamos a mantenerte informado 🟢. en unos minutos comenzare a informarte sobre la tasa`);
        // switchInterval(ctx);
        CantPersonasActivas.push(iduser)
        console.log(`**Personas activas tg : ${CantPersonasActivas.length}`)
    }

})
bot.hears(["stop","STOP","Stop"],(ctx) => {  //ctx se refiere al contexto o mensaje
    ctx.reply(`Hola!, si tienes alguna duda o inconveniente puedes consultar el comando /help`)
    let iduser = ctx.chat.id
    if (CantPersonasActivas.includes(iduser) == true){
        const index = CantPersonasActivas.findIndex((elementoevaluando => {
            return iduser === elementoevaluando
         }))
        ctx.reply(`He detenido la ejecucion. hasta pronto!`);
        // clearInterval(int)
        // CantPersonasActivas.pop(iduser)
        CantPersonasActivas.splice(index, 1)
        console.log(`**Personas activas tg : ${CantPersonasActivas.length}`)
    }

})

bot.on('message', (ctx) => {
    ctx.reply(`En unos minutos te estaremos informando de la tasa`)
})


bot.launch() //Iniciar bot, raav24