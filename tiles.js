const https = require('https')
const fs = require('fs')

const pts = []

pts.forEach((pt) => {
  const dir = 'client/public/images/mapbox/' + pt.x.toString()
  const localPath = dir + '/' + pt.y.toString() + '.png'
  console.log(localPath)
  if (!fs.existsSync(localPath)) {
    console.log('it does not')
    const path = `/styles/v1/kray/cj27t4m1200022rrwbvocwh7d/tiles/256/16/${pt.x.toString()}/${pt.y.toString()}?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw`
    const options = {host: 'api.mapbox.com', path: path}
    https.get(options, (res) => {
      let imagedata = ''
      res.setEncoding('binary')
      res.on('data', (chunk) => {
        imagedata += chunk
      })

      res.on('end', () => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir)
        }
        fs.writeFile(dir + '/' + pt.y.toString() + '.png', imagedata, 'binary', (err) => {
          if (err) throw err
          console.log('File saved.')
        })
      })
    })
  }
})
