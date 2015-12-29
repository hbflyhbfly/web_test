var express = require('express');
var router = express.Router();
var fs = require('fs');

var menu = require('../service/menu_service.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/init',function(req,res){
  fs.exists('./init_lock',function(exits){
    if(exits){
      res.send('has init!');
    }else{
      menu.createMenu(function(data){
        console.log(data);
      });
      fs.writeFile('./init_lock','init ok', {encoding: 'utf-8', flag: 'w'},function(err){
        if(err){
          console.log(err);
          res.send('生成初始化锁定文件失败!');
        }else{
          res.send('初始化完成!');
        }
      })
    }
  })
})

module.exports = router;
