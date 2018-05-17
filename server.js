var express = require('express');
var config = require('./server/config/config');
var async=require('async');
var BrandsColl=require('./server/model/schema').BrandsColl;
var ColthesColl=require('./server/model/schema').ClothesColl;
var _=require('underscore');
var app = express();

app.set('port', process.env.PORT || config.port);
app.use(express.static('client', {index: "/views/index.html"}));



app.get('/search-brands-cloths/:input',function (req,res) {
   var input=req.params.input;
   async.parallel({
       brands:function (brandsCallback) {
           BrandsColl.find({$text:{$search:input,$caseSensitive:false}},function (err,brands) {
               brandsCallback(err,brands);
           });
       },
       clothes:function (clothesCallback) {
           ColthesColl.find({$text:{$search:input,$caseSensitive:false}},function (err,clothes) {
               clothesCallback(err,clothes);
           });
       }
   },function (err,result) {
       if(err){
            res.status(500).json({status:false,err:JSON.stringify(err.message),data:null});
       }else{
            var brands=_.pluck(result.brands,"name");
            var clothes=_.pluck(result.clothes,"name");

            for(var i=0;i<brands.length;i++){
                var br = new RegExp(brands[i], 'ig');
                    input =   input.replace(br,"<b>"+brands[i]+"</b>");
            }
           for(var i=0;i<clothes.length;i++){
               var li = new RegExp(clothes[i], 'ig');
               input =   input.replace(li,"<i>"+clothes[i]+"</i>");
           }
           res.status(200).json({status:true,err:null,data:input});

       }
   })

});

app.use(function (req, res, next) {
    res.sendFile(__dirname + '/client/views/index.html');
});

var server = app.listen(app.get('port'), function () {
    console.log('Listening on port ' + server.address().port);
});