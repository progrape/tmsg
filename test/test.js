const tmsg = require('../src');
const getAccessToken = tmsg.getAccessToken;
const sendTMsg = tmsg.sendTMsg;

const appid = '';
const secret = '';
const toUser = '';
const templateId = '';
const url = '';
const data = {
    content: {
        value: 'hello world',
        color: '#ff0000'
    }
};

getAccessToken(appid, secret).then((res) => {
    // res: {access_token: '', expires_in: 7200}
    return sendTMsg({
        access_token: res['access_token'],
        toUser: toUser,
        templateId: templateId,
        url: url,
        data: data
    });
}).then(() => {
    console.log('ok');
}, (err) => {
    console.log(err);
});