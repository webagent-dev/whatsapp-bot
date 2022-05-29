const { Client,LocalAuth  } = require('whatsapp-web.js')
const qrCode = require('qrcode-terminal')
const fs = require('fs')
// intilize session path
const SESSION_FILE_PATH = './session.json';

//  create A  session Data file
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}
// initialize a new app
// initialize whatapp
const whatapp = new Client({
        // session: sessionData
     authStrategy: new LocalAuth()
})
//  autheticate session
whatapp.on('authentication', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.log(err)
        }
    })
} )


whatapp.on('qr', (qr) => {
    // console.log('QR RECEIVED', qr);
    qrCode.generate(qr, { small: true });
});

whatapp.on('ready', () => {
    console.log('Client is ready');
    whatapp.getChats().then((chat) => {
        const client = chat.find((chat) => chat.name === 'TECH/CODING MINDS👨🏼‍💻 9ja🇳🇬')
        // whatapp.sendMessage(client.id._serialized, 'or let me send a random message like admin does ,,')
        for (let i = 0; i < 100; i++){
            const msg = 'good morning...everybody wake-up'
            whatapp.sendMessage(client.id._serialized, msg)
        }
    })
})

whatapp.initialize(); 
