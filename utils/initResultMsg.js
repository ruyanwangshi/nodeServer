// success 请求是否成功 boolean类型 true 或是 false
// result 请求返回的数据
// message 自定义返回响应信息 string类型
module.exports = function initResultMsg(success, result, message) {
    const msg  = success ? message ||  '请求成功' : message || '请求失败';
    const code = success ?  200 : 400;
    return {
        httpCode: code,
        result: result ? result : null,
        message: msg,
        success: success,
    }
}