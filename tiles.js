var https = require('https')
  , fs = require('fs');

var pts = [{"x":19286,"y":24627},{"x":19286,"y":24628},{"x":19286,"y":24629},{"x":19286,"y":24630},{"x":19286,"y":24631},{"x":19286,"y":24632},{"x":19286,"y":24633},{"x":19286,"y":24634},{"x":19286,"y":24635},{"x":19286,"y":24636},{"x":19286,"y":24637},{"x":19286,"y":24638},{"x":19286,"y":24639},{"x":19286,"y":24640},{"x":19286,"y":24641},{"x":19286,"y":24642},{"x":19287,"y":24627},{"x":19287,"y":24628},{"x":19287,"y":24629},{"x":19287,"y":24630},{"x":19287,"y":24631},{"x":19287,"y":24632},{"x":19287,"y":24633},{"x":19287,"y":24634},{"x":19287,"y":24635},{"x":19287,"y":24636},{"x":19287,"y":24637},{"x":19287,"y":24638},{"x":19287,"y":24639},{"x":19287,"y":24640},{"x":19287,"y":24641},{"x":19287,"y":24642},{"x":19288,"y":24627},{"x":19288,"y":24628},{"x":19288,"y":24629},{"x":19288,"y":24630},{"x":19288,"y":24631},{"x":19288,"y":24632},{"x":19288,"y":24633},{"x":19288,"y":24634},{"x":19288,"y":24635},{"x":19288,"y":24636},{"x":19288,"y":24637},{"x":19288,"y":24638},{"x":19288,"y":24639},{"x":19288,"y":24640},{"x":19288,"y":24641},{"x":19288,"y":24642},{"x":19289,"y":24627},{"x":19289,"y":24628},{"x":19289,"y":24629},{"x":19289,"y":24630},{"x":19289,"y":24631},{"x":19289,"y":24632},{"x":19289,"y":24633},{"x":19289,"y":24634},{"x":19289,"y":24635},{"x":19289,"y":24636},{"x":19289,"y":24637},{"x":19289,"y":24638},{"x":19289,"y":24639},{"x":19289,"y":24640},{"x":19289,"y":24641},{"x":19289,"y":24642},{"x":19290,"y":24627},{"x":19290,"y":24628},{"x":19290,"y":24629},{"x":19290,"y":24630},{"x":19290,"y":24631},{"x":19290,"y":24632},{"x":19290,"y":24633},{"x":19290,"y":24634},{"x":19290,"y":24635},{"x":19290,"y":24636},{"x":19290,"y":24637},{"x":19290,"y":24638},{"x":19290,"y":24639},{"x":19290,"y":24640},{"x":19290,"y":24641},{"x":19290,"y":24642},{"x":19291,"y":24627},{"x":19291,"y":24628},{"x":19291,"y":24629},{"x":19291,"y":24630},{"x":19291,"y":24631},{"x":19291,"y":24632},{"x":19291,"y":24633},{"x":19291,"y":24634},{"x":19291,"y":24635},{"x":19291,"y":24636},{"x":19291,"y":24637},{"x":19291,"y":24638},{"x":19291,"y":24639},{"x":19291,"y":24640},{"x":19291,"y":24641},{"x":19291,"y":24642},{"x":19292,"y":24627},{"x":19292,"y":24628},{"x":19292,"y":24629},{"x":19292,"y":24630},{"x":19292,"y":24631},{"x":19292,"y":24632},{"x":19292,"y":24633},{"x":19292,"y":24634},{"x":19292,"y":24635},{"x":19292,"y":24636},{"x":19292,"y":24637},{"x":19292,"y":24638},{"x":19292,"y":24639},{"x":19292,"y":24640},{"x":19292,"y":24641},{"x":19292,"y":24642},{"x":19293,"y":24627},{"x":19293,"y":24628},{"x":19293,"y":24629},{"x":19293,"y":24630},{"x":19293,"y":24631},{"x":19293,"y":24632},{"x":19293,"y":24633},{"x":19293,"y":24634},{"x":19293,"y":24635},{"x":19293,"y":24636},{"x":19293,"y":24637},{"x":19293,"y":24638},{"x":19293,"y":24639},{"x":19293,"y":24640},{"x":19293,"y":24641},{"x":19293,"y":24642},{"x":19294,"y":24627},{"x":19294,"y":24628},{"x":19294,"y":24629},{"x":19294,"y":24630},{"x":19294,"y":24631},{"x":19294,"y":24632},{"x":19294,"y":24633},{"x":19294,"y":24634},{"x":19294,"y":24635},{"x":19294,"y":24636},{"x":19294,"y":24637},{"x":19294,"y":24638},{"x":19294,"y":24639},{"x":19294,"y":24640},{"x":19294,"y":24641},{"x":19294,"y":24642},{"x":19295,"y":24627},{"x":19295,"y":24628},{"x":19295,"y":24629},{"x":19295,"y":24630},{"x":19295,"y":24631},{"x":19295,"y":24632},{"x":19295,"y":24633},{"x":19295,"y":24634},{"x":19295,"y":24635},{"x":19295,"y":24636},{"x":19295,"y":24637},{"x":19295,"y":24638},{"x":19295,"y":24639},{"x":19295,"y":24640},{"x":19295,"y":24641},{"x":19295,"y":24642},{"x":19296,"y":24627},{"x":19296,"y":24628},{"x":19296,"y":24629},{"x":19296,"y":24630},{"x":19296,"y":24631},{"x":19296,"y":24632},{"x":19296,"y":24633},{"x":19296,"y":24634},{"x":19296,"y":24635},{"x":19296,"y":24636},{"x":19296,"y":24637},{"x":19296,"y":24638},{"x":19296,"y":24639},{"x":19296,"y":24640},{"x":19296,"y":24641},{"x":19296,"y":24642},{"x":19297,"y":24627},{"x":19297,"y":24628},{"x":19297,"y":24629},{"x":19297,"y":24630},{"x":19297,"y":24631},{"x":19297,"y":24632},{"x":19297,"y":24633},{"x":19297,"y":24634},{"x":19297,"y":24635},{"x":19297,"y":24636},{"x":19297,"y":24637},{"x":19297,"y":24638},{"x":19297,"y":24639},{"x":19297,"y":24640},{"x":19297,"y":24641},{"x":19297,"y":24642},{"x":19298,"y":24627},{"x":19298,"y":24628},{"x":19298,"y":24629},{"x":19298,"y":24630},{"x":19298,"y":24631},{"x":19298,"y":24632},{"x":19298,"y":24633},{"x":19298,"y":24634},{"x":19298,"y":24635},{"x":19298,"y":24636},{"x":19298,"y":24637},{"x":19298,"y":24638},{"x":19298,"y":24639},{"x":19298,"y":24640},{"x":19298,"y":24641},{"x":19298,"y":24642},{"x":19299,"y":24627},{"x":19299,"y":24628},{"x":19299,"y":24629},{"x":19299,"y":24630},{"x":19299,"y":24631},{"x":19299,"y":24632},{"x":19299,"y":24633},{"x":19299,"y":24634},{"x":19299,"y":24635},{"x":19299,"y":24636},{"x":19299,"y":24637},{"x":19299,"y":24638},{"x":19299,"y":24639},{"x":19299,"y":24640},{"x":19299,"y":24641},{"x":19299,"y":24642},{"x":19300,"y":24627},{"x":19300,"y":24628},{"x":19300,"y":24629},{"x":19300,"y":24630},{"x":19300,"y":24631},{"x":19300,"y":24632},{"x":19300,"y":24633},{"x":19300,"y":24634},{"x":19300,"y":24635},{"x":19300,"y":24636},{"x":19300,"y":24637},{"x":19300,"y":24638},{"x":19300,"y":24639},{"x":19300,"y":24640},{"x":19300,"y":24641},{"x":19300,"y":24642},{"x":19301,"y":24627},{"x":19301,"y":24628},{"x":19301,"y":24629},{"x":19301,"y":24630},{"x":19301,"y":24631},{"x":19301,"y":24632},{"x":19301,"y":24633},{"x":19301,"y":24634},{"x":19301,"y":24635},{"x":19301,"y":24636},{"x":19301,"y":24637},{"x":19301,"y":24638},{"x":19301,"y":24639},{"x":19301,"y":24640},{"x":19301,"y":24641},{"x":19301,"y":24642},{"x":19302,"y":24627},{"x":19302,"y":24628},{"x":19302,"y":24629},{"x":19302,"y":24630},{"x":19302,"y":24631},{"x":19302,"y":24632},{"x":19302,"y":24633},{"x":19302,"y":24634},{"x":19302,"y":24635},{"x":19302,"y":24636},{"x":19302,"y":24637},{"x":19302,"y":24638},{"x":19302,"y":24639},{"x":19302,"y":24640},{"x":19302,"y":24641},{"x":19302,"y":24642},{"x":19303,"y":24627},{"x":19303,"y":24628},{"x":19303,"y":24629},{"x":19303,"y":24630},{"x":19303,"y":24631},{"x":19303,"y":24632},{"x":19303,"y":24633},{"x":19303,"y":24634},{"x":19303,"y":24635},{"x":19303,"y":24636},{"x":19303,"y":24637},{"x":19303,"y":24638},{"x":19303,"y":24639},{"x":19303,"y":24640},{"x":19303,"y":24641},{"x":19303,"y":24642},{"x":19304,"y":24627},{"x":19304,"y":24628},{"x":19304,"y":24629},{"x":19304,"y":24630},{"x":19304,"y":24631},{"x":19304,"y":24632},{"x":19304,"y":24633},{"x":19304,"y":24634},{"x":19304,"y":24635},{"x":19304,"y":24636},{"x":19304,"y":24637},{"x":19304,"y":24638},{"x":19304,"y":24639},{"x":19304,"y":24640},{"x":19304,"y":24641},{"x":19304,"y":24642},{"x":19305,"y":24627},{"x":19305,"y":24628},{"x":19305,"y":24629},{"x":19305,"y":24630},{"x":19305,"y":24631},{"x":19305,"y":24632},{"x":19305,"y":24633},{"x":19305,"y":24634},{"x":19305,"y":24635},{"x":19305,"y":24636},{"x":19305,"y":24637},{"x":19305,"y":24638},{"x":19305,"y":24639},{"x":19305,"y":24640},{"x":19305,"y":24641},{"x":19305,"y":24642},{"x":19306,"y":24627},{"x":19306,"y":24628},{"x":19306,"y":24629},{"x":19306,"y":24630},{"x":19306,"y":24631},{"x":19306,"y":24632},{"x":19306,"y":24633},{"x":19306,"y":24634},{"x":19306,"y":24635},{"x":19306,"y":24636},{"x":19306,"y":24637},{"x":19306,"y":24638},{"x":19306,"y":24639},{"x":19306,"y":24640},{"x":19306,"y":24641},{"x":19306,"y":24642},{"x":19307,"y":24627},{"x":19307,"y":24628},{"x":19307,"y":24629},{"x":19307,"y":24630},{"x":19307,"y":24631},{"x":19307,"y":24632},{"x":19307,"y":24633},{"x":19307,"y":24634},{"x":19307,"y":24635},{"x":19307,"y":24636},{"x":19307,"y":24637},{"x":19307,"y":24638},{"x":19307,"y":24639},{"x":19307,"y":24640},{"x":19307,"y":24641},{"x":19307,"y":24642},{"x":19308,"y":24627},{"x":19308,"y":24628},{"x":19308,"y":24629},{"x":19308,"y":24630},{"x":19308,"y":24631},{"x":19308,"y":24632},{"x":19308,"y":24633},{"x":19308,"y":24634},{"x":19308,"y":24635},{"x":19308,"y":24636},{"x":19308,"y":24637},{"x":19308,"y":24638},{"x":19308,"y":24639},{"x":19308,"y":24640},{"x":19308,"y":24641},{"x":19308,"y":24642},{"x":19282,"y":24626},{"x":19282,"y":24627},{"x":19282,"y":24628},{"x":19282,"y":24629},{"x":19282,"y":24630},{"x":19282,"y":24631},{"x":19282,"y":24632},{"x":19282,"y":24633},{"x":19282,"y":24634},{"x":19282,"y":24635},{"x":19282,"y":24636},{"x":19282,"y":24637},{"x":19282,"y":24638},{"x":19282,"y":24639},{"x":19282,"y":24640},{"x":19282,"y":24641},{"x":19282,"y":24642},{"x":19283,"y":24626},{"x":19283,"y":24627},{"x":19283,"y":24628},{"x":19283,"y":24629},{"x":19283,"y":24630},{"x":19283,"y":24631},{"x":19283,"y":24632},{"x":19283,"y":24633},{"x":19283,"y":24634},{"x":19283,"y":24635},{"x":19283,"y":24636},{"x":19283,"y":24637},{"x":19283,"y":24638},{"x":19283,"y":24639},{"x":19283,"y":24640},{"x":19283,"y":24641},{"x":19283,"y":24642},{"x":19284,"y":24626},{"x":19284,"y":24627},{"x":19284,"y":24628},{"x":19284,"y":24629},{"x":19284,"y":24630},{"x":19284,"y":24631},{"x":19284,"y":24632},{"x":19284,"y":24633},{"x":19284,"y":24634},{"x":19284,"y":24635},{"x":19284,"y":24636},{"x":19284,"y":24637},{"x":19284,"y":24638},{"x":19284,"y":24639},{"x":19284,"y":24640},{"x":19284,"y":24641},{"x":19284,"y":24642},{"x":19285,"y":24626},{"x":19285,"y":24627},{"x":19285,"y":24628},{"x":19285,"y":24629},{"x":19285,"y":24630},{"x":19285,"y":24631},{"x":19285,"y":24632},{"x":19285,"y":24633},{"x":19285,"y":24634},{"x":19285,"y":24635},{"x":19285,"y":24636},{"x":19285,"y":24637},{"x":19285,"y":24638},{"x":19285,"y":24639},{"x":19285,"y":24640},{"x":19285,"y":24641},{"x":19285,"y":24642},{"x":19286,"y":24626},{"x":19287,"y":24626},{"x":19288,"y":24626},{"x":19289,"y":24626},{"x":19290,"y":24626},{"x":19291,"y":24626},{"x":19292,"y":24626},{"x":19293,"y":24626},{"x":19294,"y":24626},{"x":19295,"y":24626},{"x":19296,"y":24626},{"x":19297,"y":24626},{"x":19298,"y":24626},{"x":19299,"y":24626},{"x":19300,"y":24626},{"x":19301,"y":24626},{"x":19302,"y":24626},{"x":19303,"y":24626},{"x":19304,"y":24626}];
// const dir = 'client/public/images/mapbox/19308';
//
// if (!fs.existsSync(dir)){
//   fs.mkdirSync(dir);
// }
//
// mkdirp('/client/public/images/mapbox/19308/', (err) => {
//   if (!err) {
//     console.log('dir created')
//   }
// })

pts.forEach(function(pt) {
  var dir = 'client/public/images/mapbox/' + pt.x.toString();
  var localPath = dir + '/' + pt.y.toString() + '.png';
  console.log(localPath)
  if (!fs.existsSync(localPath)){
    console.log('it does not')
    var path = "/styles/v1/kray/cizcz53tq00bh2spmmkpwoqj6/tiles/256/16/"+ pt.x.toString() + '/' + pt.y.toString() + "?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw";
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
