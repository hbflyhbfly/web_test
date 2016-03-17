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
        var replyStr = "您好，商洛市邮政管理局官方微信开通啦！是商洛市邮政管理局政务信息公开的又一重要平台。欢迎您的关注！";
        res.reply(replyStr);
    }else if((message.MsgType == "event") && (message.Event == 'CLICK')){
        if(message.EventKey == "coming_soon"){
            res.reply("敬请期待!");
        }else if(message.EventKey == "network_query") {
            var replyStr = "<a href=\"http://www.chinapost.com.cn/\">中国邮政集团公司</a>" + "\n" +
                "<a href=\"http://www.yto.net.cn/\">瑞通速递有限公司（圆通）</a>" + "\n" +
                "<a href=\"http://www.yundaex.com/\">韵达速递有限公司</a>" + "\n" +
                "<a href=\"http://www.sto.cn/\">申通快递有限公司</a>" + "\n" +
                "<a href=\"http://www.htky365.com/\">汇通速递有限公司</a>" + "\n" +
                "<a href=\"http://www.yyexp.com/\">运逸快递有限公司</a>" + "\n" +
                "<a href=\"http://sxfy.alibole.com/\">陕西飞远文化传播有限公司</a>" + "\n" +
                "<a href=\"http://11516438.czvv.com/\">陕西联合快递有限责任公司</a>" + "\n" +
                "<a href=\"http://www.zjs.com.cn/\">宅急送快运有限公司</a>" + "\n" +
                "<a href=\"http://1231192.71ab.com/\">西安城联速递有限责任公司</a>" + "\n" +
                "<a href=\"http://www.zto.cn/\">中通快递有限公司</a>" + "\n" +
                "<a href=\"http://jd-ex.com/\">京邦达贸易有限公司商洛分公司（京东）</a>" + "\n" +
                "<a href=\"http://www.sf-express.com/cn/sc/\">顺丰速运有限公司</a>" + "\n" +
                "<a href=\"http://www.qfkd.com.cn/\">全峰快递有限责任公司</a>" + "\n" +
                "<a href=\"http://www.ttkdex.com/\">商洛天逸速递有限公司（天天）</a>" + "\n" +
                "<a href=\"http://www.ane56.com/home/home.jsp\">安能物流</a>" + "\n" +
                "<a href=\"http://www.deppon.com/\">德邦物流</a>"
            res.reply(replyStr);
        }else if(message.eventKey == ""){

        }
    }else if(message.MsgType == 'text'){
        res.reply("敬请期待!");
    }
}));

module.exports = router;