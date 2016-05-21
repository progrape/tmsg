const https = require('https');

/**
 * get access token by appid and secret
 * @param {String} appid
 * @param {String} secret
 * @returns {Promise}
 */
module.exports.getAccessToken = (appid, secret) => {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
    return new Promise((resolve, reject) => {
        const request = https.get(url, (res) => {
            if (res['statusCode'] == 200){
                var data = '';
                res.on('data', (chunk) => {
                    data += chunk.toString();
                });
                res.on('end', () => {
                    // {access_token: '', expires_in: 7200}
                    resolve(JSON.parse(data));
                });

                res.on('error', (err) => {
                    reject(err);
                });
            }
            else {
                reject(res);
            }
        });

        request.end();
    });
};

/**
 * send template message
 * @param {Object} option
 * @returns {Promise}
 */
module.exports.sendTMsg = (option) => {
    option = Object.assign({}, {
        access_token: '',
        toUser: '',
        templateId: '',
        url: '',
        data: {}
    }, option);

    const json = {
        touser: option.toUser,
        template_id: option.templateId,
        url: option.url,
        topcolor:'#FF0000',
        data: option.data
    };

    const bodyString = JSON.stringify(json);

    const options = {
        host: 'api.weixin.qq.com',
        port: '443',
        path: `/cgi-bin/message/template/send?access_token=${option.access_token}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': bodyString.length
        }
    };

    return new Promise((resolve, reject) => {
        const request = https.request(options, (res) => {
            if (res['statusCode'] == 200){
                var data = '';
                res.on('data', (chunk) => {
                    data += chunk.toString();
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });

                res.on('error', (err) => {
                    reject(err);
                });
            }
            else {
                reject(res);
            }
        });

        request.write(bodyString);
        request.end();
    });
};