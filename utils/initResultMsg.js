module.exports = function initResultMsg(success, result, Message) {
    const msg  = success ? Message ||  '请求成功' : Message || '请求失败';
    const code = success ?  200 : 400;
    return {
        httpCode: code,
        result: result ? result : null,
        Message: msg,
        success: success,
    }
}