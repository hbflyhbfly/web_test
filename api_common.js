/**
 * Created by syuuhi on 15/12/28.
 */
var API = require('wechat-api');
var config = require('./config/config.json');

var menu_config = config.wx.wx_menu;
var app_id      = config.wx.app_id;
var app_secret  = config.wx.app_secret;

//配置
var api = new API(app_id, app_secret);

//测试
function app(){
    api.createMenu(menu_config, function(err, result){
        console.log(result);
    });
}

module.exports = app;