'use strict';

module.exports = function(app) {
 var User = app.models.user;
 var router = app.loopback.Router();



       app.get('/inventorymanagement', function(req, res) {
   
    res.render('inventorymanagement');///// how i can secure this route if i m serving ejs file
  });

//custom securing route 

app.get('/download/:check',function(req,res){

    const download=require('../../migration/downloadexec')
    download(app,function(data){console.log(data); console.log(data=="true")})

    res.send(JSON.stringify({ a: '1' }, null, 3));

});


  app.use(router);
};
