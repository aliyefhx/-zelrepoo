const request = require('request');
const fs = require('fs');
const exec = require('child_process').exec;
const os = require("os");
async function worktype(type, Language) {

  if (!type || !Language) { throw new Error ('Missing Worktype!!') }
  var data = ''
  if (type == 'private') {
    if (Language == 'TR') {
      data = "*WhatsAsena Private Olarak Çalışıyor! 🐺*\n\n" +
        "_Lütfen burada plugin denemesi yapmayın. Burası sizin LOG numaranızdır._\n" +
        "_Herhangi bir sohbette komutları deneyebilirsiniz :)_\n\n" +
        "*Botunuz sadece size özel olarak çalışmaktadır. Değiştirmek için* _.setvar WORK_TYPE:public_ *komutunu kullanın.*\n\n" +
        "*WhatsAsena Kullandığın İçin Teşekkürler 💌*"
    } else if (Language == 'EN') {
      data = "*WhatsAsena Working as Private! 🐺*\n\n_Please do not try plugins here. This is your LOG number._\n_You can try commands to any chat :)_\n\n*Your bot working as private. To change it, use* _.setvar WORK_TYPE:public_\n\n*Thanks for using WhatsAsena 💌*"
    } else if (Language == 'AZ') {
      data = "*WhatsAsena Şəxsi olaraq işləyir! 🐺*\n\n_Zəhmət olmasa burada plaginləri sınamayın. Bu sizin LOG nömrənizdir._\n_İstənilən söhbət üçün əmrləri sınaya bilərsiniz :)_\n\n*Şəxsi olaraq işləmirsən. Dəyişdirmək üçün istifadə edin:* _.setvar WORK_TYPE:public_\n\n*WhatsAsena istifadə etdiyiniz üçün təşəkkürlər. 💌*"
    } else if (Language == 'RU') {
      data = "*WhatsAsena работает как частное лицо! 🐺*\n\n_Пожалуйста, не пробуйте здесь плагины. Это ваш номер ЖУРНАЛА._\n_Вы можете попробовать команды в любой чат :)_\n\n*Вы не работаете как частный. Чтобы изменить это, используйте:* _.setvar WORK_TYPE:public_\n\n*Спасибо за использование WhatsAsena 💌*"
    } else if (Language == 'ML') {
      data = "*WhatsAsena സ്വകാര്യമായി പ്രവർത്തിക്കുന്നു! 🐺*\n\n_ദയവായി ഇവിടെ പ്ലഗിനുകൾ പരീക്ഷിക്കരുത്. ഇത് നിങ്ങളുടെ LOG നമ്പർ ആണ്._\n_ഏത് ചാറ്റിലേക്കും നിങ്ങൾക്ക് കമാൻഡുകൾ പരീക്ഷിക്കാം :)_\n\n*നിങ്ങൾ സ്വകാര്യമായി പ്രവർത്തിക്കുന്നില്ല. അത് മാറ്റാൻ, ഉപയോഗിക്കുക:* _.setvar WORK_TYPE:public_\n\n*WhatsAsena ഉപയോഗിച്ചതിന് നന്ദി 💌*"
    } else if (Language == 'HI') {
      data = "*WhatsAsena निजी के रूप में काम कर रहा है! 🐺*\n\n_कृपया यहां प्लगइन्स का प्रयास न करें। यह आपका लॉग नंबर है।_\n_आप किसी भी चैट के लिए कमांड आज़मा सकते हैं :)_\n\n*आप निजी के रूप में काम नहीं कर रहे हैं। इसे बदलने के लिए, उपयोग करें:* _.setvar WORK_TYPE:public_\n\n*WhatsAsena का उपयोग करने के लिए धन्यवाद 💌*"
    } else if (Language == 'ID') {
      data = "*WhatsAsena Bekerja sebagai Swasta! 🐺*\n\n_Tolong jangan coba plugin di sini. Ini adalah nomor LOG Anda._\n_Anda dapat mencoba perintah ke obrolan apa pun :)_\n\n*Anda tidak bekerja sebagai pribadi. Untuk mengubahnya, gunakan:* _.setvar WORK_TYPE:public_\n\n*Terima kasih telah menggunakan WhatsAsena 💌*"
    } else if (Language == 'ES') {
      data = "*WhatsAsena trabajando como privado! 🐺*\n\n_No pruebes los complementos aquí. Este es su número de LOG._\n_Puedes probar comandos en cualquier chat. :)_\n\n*No estás trabajando como privado. Para cambiarlo, use:* _.setvar WORK_TYPE:public_\n\n*Gracias por usar WhatsAsena 💌*"
    } else if (Language == 'PT') {
      data = "*WhatsAsena trabalhando como privado! 🐺*\n\n_Não tente plug-ins aqui. Este é o seu número de LOG._\n_Você pode tentar comandos para qualquer bate-papo :)_\n\n*Você não está trabalhando como privado. Para mudar isso, use:* _.setvar WORK_TYPE:public_\n\n*Obrigado por usar o WhatsAsena 💌*"
    }
  } else if (type == 'public') {
    if (Language == 'TR') {
      data = "*WhatsAsena Public Olarak Çalışıyor! 🐺*\n\n" +
        "_Lütfen burada plugin denemesi yapmayın. Burası sizin LOG numaranızdır._\n" +
        "_Herhangi bir sohbette komutları deneyebilirsiniz :)_\n\n" +
        "*Botunuz herkese açık olarak çalışmaktadır. Bazı komutları kullanamazsınız. Değiştirmek için* _.setvar WORK_TYPE:private_ *komutunu kullanın.*\n\n" +
        "*WhatsAsena Kullandığın İçin Teşekkürler 💌*"
    } else if (Language == 'EN') {
      data = "*WhatsAsena Working as Public! 🐺*\n\n_Please do not try plugins here. This is your LOG number._\n_You can try commands to any chat :)_\n\n*Your bot working as public. Some commands you cannot use. To change it, use* _.setvar WORK_TYPE:private_\n\n*Thanks for using WhatsAsena 💌*"
    } else if (Language == 'AZ') {
      data = "*WhatsAsena İctimai olaraq işləyir! 🐺*\n\n_Zəhmət olmasa burada plaginləri sınamayın. Bu sizin LOG nömrənizdir._\n_İstənilən söhbət üçün əmrləri sınaya bilərsiniz :)_\n\n*İctimai olaraq işləmirsiniz. İstifadə edə bilmədiyiniz bəzi əmrlər. Dəyişdirmək üçün istifadə edin:* _.setvar WORK_TYPE:private_\n\n*WhatsAsena istifadə etdiyiniz üçün təşəkkürlər. 💌*"
    } else if (Language == 'RU') {
      data = "*WhatsAsena работает как общественная! 🐺*\n\n_Пожалуйста, не пробуйте здесь плагины. Это ваш номер ЖУРНАЛА._\n_Вы можете попробовать команды в любой чат :)_\n\n*Вы не работаете публично. Некоторые команды нельзя использовать. Чтобы изменить это, используйте:* _.setvar WORK_TYPE:private_\n\n*Спасибо за использование WhatsAsena 💌*"
    } else if (Language == 'ML') {
      data = "*WhatsAsena പൊതുവായി പ്രവർത്തിക്കുന്നു! 🐺*\n\n_ദയവായി ഇവിടെ പ്ലഗിനുകൾ പരീക്ഷിക്കരുത്. ഇത് നിങ്ങളുടെ LOG നമ്പർ ആണ്._\n_ഏത് ചാറ്റിലേക്കും നിങ്ങൾക്ക് കമാൻഡുകൾ പരീക്ഷിക്കാം :)_\n\n*നിങ്ങൾ പൊതുവായി പ്രവർത്തിക്കുന്നില്ല. നിങ്ങൾക്ക് ഉപയോഗിക്കാൻ കഴിയാത്ത ചില കമാൻഡുകൾ. അത് മാറ്റാൻ, ഉപയോഗിക്കുക:* _.setvar WORK_TYPE:private_\n\n*WhatsAsena ഉപയോഗിച്ചതിന് നന്ദി 💌*"
    } else if (Language == 'HI') {
      data = "*WhatsAsena जनता के रूप में काम कर रहा है! 🐺*\n\n_कृपया यहां प्लगइन्स का प्रयास न करें। यह आपका लॉग नंबर है।_\n_आप किसी भी चैट के लिए कमांड आज़मा सकते हैं :)_\n\n*आप जनता के रूप में काम नहीं कर रहे हैं। कुछ कमांड जिनका आप उपयोग नहीं कर सकते हैं। इसे बदलने के लिए, उपयोग करें:* _.setvar WORK_TYPE:private_\n\n*WhatsAsena का उपयोग करने के लिए धन्यवाद 💌*"
    } else if (Language == 'ID') {
      data = "*WhatsAsena Bekerja sebagai Publik! 🐺*\n\n_Tolong jangan coba plugin di sini. Ini adalah nomor LOG Anda._\n_Anda dapat mencoba perintah ke obrolan apa pun :)_\n\n*Anda tidak bekerja sebagai publik. Beberapa perintah yang tidak dapat Anda gunakan. Untuk mengubahnya, gunakan:* _.setvar WORK_TYPE:private_\n\n*Terima kasih telah menggunakan WhatsAsena 💌*"
    } else if (Language == 'ES') {
      data = "*WhatsAsena trabajando como público! 🐺*\n\n_No pruebes los complementos aquí. Este es su número de LOG._\n_Puedes probar comandos en cualquier chat. :)_\n\n*No estás trabajando como público. Algunos comandos no se pueden usar. Para cambiarlo, use:* _.setvar WORK_TYPE:private_\n\n*Gracias por usar WhatsAsena 💌*"
    } else if (Language == 'PT') {
      data = "*WhatsAsena trabalhando como público! 🐺*\n\n_Não tente plug-ins aqui. Este é o seu número de LOG._\n_Você pode tentar comandos para qualquer bate-papo :)_\n\n*Você não está trabalhando como público. Alguns comandos você não pode usar. Para mudar isso, use:* _.setvar WORK_TYPE:private_\n\n*Obrigado por usar o WhatsAsena 💌*"
    }
  } else {
    if (Language == 'TR') { data = '_Girdiğin_ *WORK_TYPE* _Anahtarı Bulunamadı!_ \n_Lütfen_ ```.setvar WORK_TYPE:private``` _Yada_ ```.setvar WORK_TYPE:public``` _Komutunu Kullanın!_' 
    } else if (Language == 'AZ') { data = '_Daxil etdiyiniz_ *WORK_TYPE* _Açarı Tapılmadı!_ \n_Zəhmət olmasa_ ```.setvar WORK_TYPE:private``` _və ya_ ```.setvar WORK_TYPE:public``` _yazın._'
    } else if (Language == 'EN') { data = '_The_ *WORK_TYPE* _Key You Entered Was Not Found!_ \n_Please Type_ ```.setvar WORK_TYPE:private``` _Or_ ```.setvar WORK_TYPE:public```'
    } else if (Language == 'RU') { data = '_Введенный вами ключ_ *WORK_TYP* _не найден!_ \n_Введите_ ```.setvar WORK_TYPE:private``` или ```.setvar WORK_TYPE:public```'
    } else if (Language == 'ML') { data = '_നിങ്ങൾ നൽകിയ_ *WORK_TYPE* _കീ കണ്ടെത്തിയില്ല!_ \n_ദയവായി_ ```.setvar WORK_TYPE:private``` _അല്ലെങ്കിൽ_ ```.setvar WORK_TYPE:public``` _എന്ന് ടൈപ്പ് ചെയ്യുക_'
    } else if (Language == 'HI') { data = '_आपके द्वारा दर्ज की गई_ *WORK_TYPE* _कुंजी नहीं मिली!_ \n_कृपया टाइप करें_ ```.setvar WORK_TYPE:private``` या ```.setvar WORK_TYPE:public```'
    } else if (Language == 'ID') { data = '_Kunci_ *WORK_TYPE* _yang Anda Masukkan Tidak Ditemukan!_ \n_Silakan Ketik_ ```.setvar WORK_TYPE:private``` _Atau_ ```.setvar WORK_TYPE:public```'
    } else if (Language == 'PT') { data = '_A chave_ *WORK_TYPE* _que você digitou não foi encontrada!_ \n_Digite_ ```.setvar WORK_TYPE:private``` _ou_ ```.setvar WORK_TYPE:public```'
    } else if (Language == 'ES') { data = '_¡No se encontró la clave_ *WORK_TYPE* _que ingresó!_ \n_Escriba_ ```.setvar WORK_TYPE:private``` _o_ ```.setvar WORK_TYPE:public```'
    }
  }
  return data;
}
module.exports = worktype;
