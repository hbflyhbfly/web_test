/**
 * Created by syuuhi on 15/12/29.
 */
var API = require('wechat-api');
var config = require('../config/config.json');

var menu_config = config.wx.wx_menu;
var app_id      = config.wx.app_id;
var app_secret  = config.wx.app_secret;

var api = new API(app_id, app_secret);

function createMenu(callback){
    api.createMenu(menu_config,function(err,result){
       if(err){
           callback('menu init failure:'+err);
       }else{
           if(result.errmsg === 'ok'){
               callback('menu init ok');
           }else{
               callback('menu init failure'+result);
           }
       }
    });
}

exports.createMenu = createMenu;

