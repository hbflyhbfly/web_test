
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var wechat = require('wechat');
var http = require("http");
var url = require('url');
var crypto = require('crypto');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.user
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

app.use(express.query()); // Or app.use(express.query());

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
  oriArray[0] = "syuuhi";
  oriArray[1] = timestamp;
  oriArray[2] = nonce;

  oriArray.sort();
  var original = oriArray.join('');
  console.log("original str:"+original);
  console.log("signature:"+signature);
  var scyptoString = sha1(original);
  if(signature == scyptoString){
    res.send(echostr);
    console.log("confirm and send echo back");
  }else{
    res.send("false");
    console.log("failed");
  }
  res.end();
}

app.post('/wechat', wechat('syuuhi', function (req, res, next) {

  res.send("zhoufei");
  var message = req.weixin;
  if(message.MsgType == 'text'){
    res.reply({ type: "text", content: "you input " + message.Content});
  }
}));
//app.get('/wechat',validateToken);

//app.use('/wechat', wechat('syuuhi', function (req, res, next) {
//  // 微信输入信息都在req.weixin上
//  var message = req.weixin;
//  console.log(message);
//  if((message.MsgType == 'event') && (message.Event == 'subscribe'))
//  {
//    var refillStr = "<a href=\"http://your_IP/weixin/refill?weixinId=" + message.fromUsername + "\">1. 点击记录团队充值</a>"
//
//    var consumeStr = "<a href=\"http://your_IP/weixin/consume?weixinId=" + message.fromUsername + "\">2. 点击记录团队消费</a>"
//    var deleteStr = "<a href=\"http://your_IP/weixin/delete?weixinId=" + message.fromUsername + "\">3. 点击回退记录</a>"
//    var historyStr = "<a href=\"http://your_IP/weixin/history?weixinId=" + message.fromUsername + "\">4. 点击查询历史记录</a>"
//
//    var emptyStr = "          ";
//    var replyStr = "感谢你的关注！" + "\n"+ emptyStr + "\n" + refillStr + "\n"+ emptyStr + "\n" + consumeStr
//        + "\n"+ emptyStr + "\n" + deleteStr + "\n"+ emptyStr + "\n" + historyStr;
//    res.reply(replyStr);
//  }
//}));
//
//app.use('/zhoufei',function(req,res,next){
//  console.log("zhoufei");
//})

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}

// production error handler
// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});




module.exports = app;
