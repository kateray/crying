var https = require('https')
  , fs = require('fs');

var pts = [{"x":19285,"y":24648},{"x":19285,"y":24649},{"x":19285,"y":24650},{"x":19285,"y":24651},{"x":19285,"y":24652},{"x":19286,"y":24648},{"x":19286,"y":24649},{"x":19286,"y":24650},{"x":19286,"y":24651},{"x":19286,"y":24652},{"x":19290,"y":24651},{"x":19290,"y":24652},{"x":19291,"y":24651},{"x":19291,"y":24652},{"x":19292,"y":24651},{"x":19292,"y":24652},{"x":19293,"y":24651},{"x":19293,"y":24652},{"x":19294,"y":24651},{"x":19294,"y":24652},{"x":19295,"y":24652},{"x":19295,"y":24651},{"x":19296,"y":24651},{"x":19296,"y":24652},{"x":19297,"y":24651},{"x":19297,"y":24652},{"x":19298,"y":24651},{"x":19298,"y":24652},{"x":19299,"y":24651},{"x":19299,"y":24652},{"x":19300,"y":24651},{"x":19300,"y":24652},{"x":19301,"y":24651},{"x":19301,"y":24652},{"x":19302,"y":24651},{"x":19302,"y":24652},{"x":19303,"y":24652},{"x":19303,"y":24651},{"x":19304,"y":24651},{"x":19304,"y":24652},{"x":19305,"y":24652},{"x":19305,"y":24651},{"x":19306,"y":24651},{"x":19306,"y":24652},{"x":19307,"y":24651},{"x":19307,"y":24652},{"x":19290,"y":24653},{"x":19290,"y":24654},{"x":19290,"y":24655},{"x":19290,"y":24656},{"x":19290,"y":24657},{"x":19291,"y":24653},{"x":19291,"y":24654},{"x":19291,"y":24656},{"x":19291,"y":24655},{"x":19291,"y":24657},{"x":19292,"y":24654},{"x":19292,"y":24655},{"x":19292,"y":24653},{"x":19293,"y":24653},{"x":19292,"y":24657},{"x":19292,"y":24656},{"x":19293,"y":24654},{"x":19293,"y":24655},{"x":19294,"y":24653},{"x":19293,"y":24657},{"x":19293,"y":24656},{"x":19294,"y":24654},{"x":19294,"y":24655},{"x":19294,"y":24656},{"x":19294,"y":24657},{"x":19295,"y":24653},{"x":19295,"y":24656},{"x":19295,"y":24654},{"x":19295,"y":24655},{"x":19295,"y":24657},{"x":19296,"y":24653},{"x":19296,"y":24654},{"x":19296,"y":24656},{"x":19296,"y":24655},{"x":19296,"y":24657},{"x":19297,"y":24654},{"x":19297,"y":24653},{"x":19297,"y":24655},{"x":19297,"y":24656},{"x":19297,"y":24657},{"x":19298,"y":24653},{"x":19298,"y":24654},{"x":19298,"y":24655},{"x":19298,"y":24656},{"x":19298,"y":24657},{"x":19299,"y":24654},{"x":19299,"y":24653},{"x":19299,"y":24656},{"x":19299,"y":24655},{"x":19299,"y":24657},{"x":19300,"y":24653},{"x":19300,"y":24655},{"x":19300,"y":24654},{"x":19300,"y":24656},{"x":19300,"y":24657},{"x":19301,"y":24653},{"x":19301,"y":24654},{"x":19301,"y":24655},{"x":19301,"y":24656},{"x":19301,"y":24657},{"x":19302,"y":24653},{"x":19302,"y":24655},{"x":19302,"y":24654},{"x":19302,"y":24656},{"x":19303,"y":24653},{"x":19302,"y":24657},{"x":19303,"y":24656},{"x":19303,"y":24654},{"x":19303,"y":24655},{"x":19303,"y":24657},{"x":19304,"y":24653},{"x":19304,"y":24654},{"x":19304,"y":24655},{"x":19304,"y":24656},{"x":19305,"y":24653},{"x":19305,"y":24654},{"x":19304,"y":24657},{"x":19305,"y":24655},{"x":19305,"y":24656},{"x":19305,"y":24657},{"x":19306,"y":24654},{"x":19306,"y":24653},{"x":19306,"y":24656},{"x":19306,"y":24657},{"x":19306,"y":24655},{"x":19307,"y":24653},{"x":19307,"y":24655},{"x":19307,"y":24654},{"x":19307,"y":24656},{"x":19307,"y":24657},{"x":19308,"y":24652},{"x":19308,"y":24651},{"x":19308,"y":24653},{"x":19308,"y":24654},{"x":19308,"y":24656},{"x":19308,"y":24657},{"x":19308,"y":24655},{"x":19309,"y":24651},{"x":19309,"y":24652},{"x":19309,"y":24653},{"x":19309,"y":24654},{"x":19309,"y":24655},{"x":19309,"y":24656},{"x":19309,"y":24657},{"x":19310,"y":24651},{"x":19310,"y":24652},{"x":19310,"y":24653},{"x":19310,"y":24656},{"x":19310,"y":24655},{"x":19310,"y":24654},{"x":19310,"y":24657},{"x":19311,"y":24651},{"x":19311,"y":24652},{"x":19311,"y":24654},{"x":19311,"y":24653},{"x":19311,"y":24656},{"x":19311,"y":24655},{"x":19311,"y":24657},{"x":19286,"y":24653},{"x":19286,"y":24654},{"x":19286,"y":24656},{"x":19286,"y":24655},{"x":19286,"y":24658},{"x":19286,"y":24659},{"x":19286,"y":24657},{"x":19286,"y":24660},{"x":19286,"y":24661},{"x":19287,"y":24659},{"x":19287,"y":24660},{"x":19287,"y":24661},{"x":19288,"y":24659},{"x":19288,"y":24660},{"x":19289,"y":24658},{"x":19288,"y":24661},{"x":19289,"y":24660},{"x":19289,"y":24661},{"x":19289,"y":24659},{"x":19290,"y":24658},{"x":19290,"y":24659},{"x":19291,"y":24658},{"x":19290,"y":24661},{"x":19290,"y":24660},{"x":19291,"y":24659},{"x":19291,"y":24660},{"x":19291,"y":24661},{"x":19292,"y":24658},{"x":19292,"y":24660},{"x":19292,"y":24661},{"x":19293,"y":24658},{"x":19292,"y":24659},{"x":19293,"y":24659},{"x":19293,"y":24661},{"x":19293,"y":24660},{"x":19294,"y":24659},{"x":19294,"y":24658},{"x":19294,"y":24661},{"x":19294,"y":24660},{"x":19295,"y":24660},{"x":19295,"y":24661},{"x":19295,"y":24658},{"x":19295,"y":24659},{"x":19296,"y":24658},{"x":19296,"y":24659},{"x":19296,"y":24660},{"x":19296,"y":24661},{"x":19297,"y":24659},{"x":19297,"y":24658},{"x":19297,"y":24660},{"x":19297,"y":24661},{"x":19298,"y":24658},{"x":19298,"y":24659},{"x":19298,"y":24661},{"x":19299,"y":24658},{"x":19298,"y":24660},{"x":19299,"y":24659},{"x":19299,"y":24660},{"x":19299,"y":24661},{"x":19300,"y":24660},{"x":19300,"y":24658},{"x":19300,"y":24659},{"x":19301,"y":24658},{"x":19300,"y":24661},{"x":19301,"y":24659},{"x":19301,"y":24660},{"x":19301,"y":24661},{"x":19302,"y":24658},{"x":19302,"y":24659},{"x":19302,"y":24660},{"x":19302,"y":24661},{"x":19303,"y":24658},{"x":19303,"y":24659},{"x":19303,"y":24660},{"x":19303,"y":24661},{"x":19304,"y":24659},{"x":19304,"y":24658},{"x":19304,"y":24660},{"x":19304,"y":24661},{"x":19305,"y":24659},{"x":19305,"y":24658},{"x":19305,"y":24660},{"x":19305,"y":24661},{"x":19306,"y":24658},{"x":19306,"y":24659},{"x":19306,"y":24661},{"x":19306,"y":24660},{"x":19307,"y":24659},{"x":19307,"y":24658},{"x":19307,"y":24660},{"x":19307,"y":24661},{"x":19308,"y":24658},{"x":19308,"y":24659},{"x":19308,"y":24661},{"x":19308,"y":24660},{"x":19281,"y":24645},{"x":19281,"y":24647},{"x":19281,"y":24650},{"x":19281,"y":24649},{"x":19281,"y":24646},{"x":19281,"y":24648},{"x":19281,"y":24651},{"x":19281,"y":24652},{"x":19281,"y":24654},{"x":19281,"y":24653},{"x":19281,"y":24655},{"x":19281,"y":24656},{"x":19281,"y":24657},{"x":19282,"y":24647},{"x":19282,"y":24645},{"x":19282,"y":24646},{"x":19282,"y":24649},{"x":19282,"y":24650},{"x":19282,"y":24648},{"x":19282,"y":24651},{"x":19282,"y":24652},{"x":19282,"y":24653},{"x":19282,"y":24656},{"x":19282,"y":24654},{"x":19282,"y":24655},{"x":19282,"y":24657},{"x":19283,"y":24646},{"x":19283,"y":24645},{"x":19283,"y":24649},{"x":19283,"y":24650},{"x":19283,"y":24647},{"x":19283,"y":24648},{"x":19283,"y":24651},{"x":19283,"y":24652},{"x":19283,"y":24656},{"x":19283,"y":24655},{"x":19283,"y":24653},{"x":19283,"y":24654},{"x":19283,"y":24657},{"x":19284,"y":24645},{"x":19284,"y":24646},{"x":19284,"y":24648},{"x":19284,"y":24649},{"x":19284,"y":24647},{"x":19284,"y":24650},{"x":19284,"y":24652},{"x":19284,"y":24651},{"x":19284,"y":24653},{"x":19284,"y":24654},{"x":19284,"y":24655},{"x":19284,"y":24656},{"x":19284,"y":24657},{"x":19285,"y":24653},{"x":19285,"y":24654},{"x":19285,"y":24656},{"x":19285,"y":24655},{"x":19285,"y":24657},{"x":19276,"y":24653},{"x":19276,"y":24650},{"x":19276,"y":24648},{"x":19276,"y":24651},{"x":19276,"y":24649},{"x":19276,"y":24652},{"x":19276,"y":24656},{"x":19276,"y":24654},{"x":19276,"y":24655},{"x":19276,"y":24658},{"x":19276,"y":24657},{"x":19276,"y":24659},{"x":19277,"y":24648},{"x":19277,"y":24649},{"x":19277,"y":24650},{"x":19277,"y":24651},{"x":19277,"y":24652},{"x":19277,"y":24653},{"x":19277,"y":24654},{"x":19277,"y":24655},{"x":19277,"y":24656},{"x":19277,"y":24658},{"x":19277,"y":24657},{"x":19277,"y":24659},{"x":19278,"y":24648},{"x":19278,"y":24650},{"x":19278,"y":24649},{"x":19278,"y":24652},{"x":19278,"y":24651},{"x":19278,"y":24653},{"x":19278,"y":24654},{"x":19278,"y":24655},{"x":19278,"y":24657},{"x":19278,"y":24656},{"x":19278,"y":24659},{"x":19278,"y":24658},{"x":19279,"y":24648},{"x":19279,"y":24649},{"x":19279,"y":24651},{"x":19279,"y":24650},{"x":19279,"y":24653},{"x":19279,"y":24654},{"x":19279,"y":24652},{"x":19279,"y":24655},{"x":19279,"y":24657},{"x":19279,"y":24656},{"x":19279,"y":24659},{"x":19279,"y":24658},{"x":19280,"y":24648},{"x":19280,"y":24650},{"x":19280,"y":24649},{"x":19280,"y":24651},{"x":19280,"y":24655},{"x":19280,"y":24652},{"x":19280,"y":24654},{"x":19280,"y":24656},{"x":19280,"y":24657},{"x":19280,"y":24653},{"x":19280,"y":24658},{"x":19281,"y":24658},{"x":19280,"y":24659},{"x":19282,"y":24658},{"x":19281,"y":24659},{"x":19282,"y":24659},{"x":19283,"y":24658},{"x":19283,"y":24659},{"x":19284,"y":24659},{"x":19285,"y":24658},{"x":19284,"y":24658},{"x":19285,"y":24659}];

pts.forEach(function(pt) {
  var dir = 'client/public/images/mapbox/' + pt.x.toString();
  var localPath = dir + '/' + pt.y.toString() + '.png';
  console.log(localPath)
  if (!fs.existsSync(localPath)){
    console.log('it does not')
    var path = "/styles/v1/kray/cj27t4m1200022rrwbvocwh7d/tiles/256/16/"+ pt.x.toString() + '/' + pt.y.toString() + "?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw";
    var options = {host: 'api.mapbox.com', path: path}
    var request = https.get(options, function(res){
      var imagedata = ''
      res.setEncoding('binary')
      res.on('data', function(chunk){
        imagedata += chunk
      })

      res.on('end', function(){
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        fs.writeFile(dir + '/' + pt.y.toString() + '.png', imagedata, 'binary', function(err){
          if (err) throw err
          console.log('File saved.')
        })
      })
    })
  }
});
