/**
 * Created by syuuhi on 15/12/29.
 */
var express = require('express');
var router = express.Router();
var config = require('../config/config.json');

var crypto = require('crypto');
var url = require('url');
var wechat = require('wechat');


function sha1(str){
    var md5sum = crypto.createHash('sha1');
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
}

function validateToken(req,res){
    var query = url.parse(req.url,true).query;
    var signature = query.signature;
    var echostr = query.echostr;
    var timestamp = query['timestamp'];
    var nonce = query.nonce;
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = config.wx.token;

    oriArray.sort();
    var original = oriArray.join('');
    console.log("original str:"+original);
    console.log("signature:"+signature);
    var scyptoString = sha1(original);
    console.log(scyptoString);
    console.log(signature);

    if(signature == scyptoString){
        res.send(echostr);
        console.log("confirm and send echo back");
    }else{
        res.send("shibaile");
        console.log("failed");

    }
    res.end();
}

//app.use('/wechat', wechat('syuuhi', function(req, res,next) {
//  res.reply('你好！');
//}));
router.get('/',validateToken);

router.post('/', wechat(config.wx.token, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(message);
    if((message.MsgType == 'event') && (message.Event == 'subscribe'))
    {
        //var refillStr = "<a href=\"http://your_IP/weixin/refill?weixinId=" + message.fromUsername + "\">1. 关注公众账号</a>"
        //
        //var consumeStr = "<a href=\"http://your_IP/weixin/consume?weixinId=" + message.fromUsername + "\">2. 关注公众账号</a>"
        //var deleteStr = "<a href=\"http://your_IP/weixin/delete?weixinId=" + message.fromUsername + "\">3. 关注公众账号</a>"
        //var historyStr = "<a href=\"http://your_IP/weixin/history?weixinId=" + message.fromUsername + "\">4. 关注公众账号</a>"
        //
        //var emptyStr = "          ";
        var replyStr = "您好，商洛市邮政管理局官方微信开通啦！是商洛市邮政管理局政务信息公开的又一重要平台。欢迎您的关注！";
        res.reply(replyStr);
    }else if((message.MsgType == "event") && (message.Event == 'CLICK')){
        if(message.EventKey == "coming_soon"){
            res.reply("敬请期待!");
        }else if(message.EventKey == "network_query"){
            var refillStr = "<a href=\"http://www.chinapost.com.cn/\">中国邮政集团公司</a>" +"\n" +
                "<a href=\"http://www.yto.net.cn/\">瑞通速递有限公司（圆通）</a>" +"\n";

            res.reply(refillStr);
        }
    }else if(message.MsgType == 'text'){
        res.reply("敬请期待!");
    }
}));

module.exports = router;