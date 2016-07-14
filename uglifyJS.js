var fs = require('fs');
var uglify = require("uglify-js");

var uglified = uglify.minify(['js/vendors/materialize.min.js','js/vendors/modernizr.js','js/vendors/bootstrap.min.js', 'js/vendors/jquery.nicescroll.min.js', 'js/vendors/waves.min.js', 'js/vendors/bootstrap-growl.min.js', 'js/vendors/sweet-alert.min.js', 'js/vendors/autosize.min.js','js/vendors/functions.js', 'js/vendors/demo.js']);

fs.writeFile('js/vendors.min.js', uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", 'vendors.min.js');
  }      
});