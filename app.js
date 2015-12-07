
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var wechat = require('wechat');

var config = {
  token:'syuuhi',
  appid:'wxb0864d52be23eaaa',
  encodingAESKey:'744UyZhHQsHsgfogSND5KGpTmzy6d3IZSTWvI22bu5O'

}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//app.use(app.query());
app.use('/wechat',wechat(config,function(req,res,next){
  var message = req.weixin;
  if(message.fromUsername == 'diaosi'){
    res.reply('hehe');
  }else if (message.fromUsername == 'text'){
    res.reply({
      content:"说啥捏",
      type:'text'
    });
  }else if (message.fromUsername == 'hehe'){
    res.reply({
      type:'music',
      content:{
        title:"来听首歌吧",
        description:"晴天",
        musicUrl:"http://y.qq.com/#type=song&mid=0039MnYb0qxYhV",
        hdMusiUrl:"http://y.qq.com/#type=song&mid=0039MnYb0qxYhV",
        thumbMediaId:"0039MnYb0qxYhV"
      }
    });
  }else{
    res.reply([
      {
        title:"范美丽,你要等我",
        description:"这是账房大娘和程序猿的对话",
        picurl:"http://nodeapi.cloudfoundry.com/qrcode.jpg",
        url:"http://nodeapi.cloudfoundry.com/"
      }
    ]);
  }
}));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
