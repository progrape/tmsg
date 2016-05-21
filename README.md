### tmsg 发送微信模板消息 [![npm version](https://img.shields.io/npm/v/tmsg.svg)](https://www.npmjs.org/package/tmsg) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/progrape/tmsg/master/LICENSE)


tmsg 是一个 `node.js` 写的用于发送微信模板消息的模块。

#### 使用方式

下载：

```
npm install --save tmsg
```

使用（node.js 版本 >= 4.0.0）：

```javascript
const tmsg = require('tmsg');
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
```

#### API

##### getAccessToken(appid, secret)

通过 `appid` 和 密钥 `secret`，获取访问微信公众平台接口的 `access_token`，返回一个 Promise 对象。

参数：

|参数名|说明|
|------|----|
|appid | appid|
|secret| 密钥|

#### sendTMsg(option)

发送模板消息，返回一个 Promise 对象。

option 字段如下：

|字段名|说明|
|------|----|
|access_token| access_token，通过 `getAccessToken` 方法获取，也可以自行获取|
|toUser| 消息接收者的 openid|
|templateId| 模板消息 id|
|url      | 用户接受到消息后，点击消息跳转的 url，可空|
|data     | 模板消息填充的参数，形式如： `{content: {value: '消息内容', color: '#ff0000'}}`|

### License

MIT
