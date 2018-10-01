const fs = require('fs');
const csv=require('csvtojson');
const waterSystemDataFile = __dirname + '/raw/wsb_180622_oima.json'
let zipMap = new Map();

fs.readFile(waterSystemDataFile, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  let waterSystemData = data;
  let waterSystemDataFeatures = JSON.parse(waterSystemData).features;

  csv()
  .fromString(fs.readFileSync(__dirname + '/zips.csv', 'utf8'))
  .then((zipsObj)=>{

    zipsObj.forEach(function(zip) {
      zipMap.set(zip.ZIP,zip);
    })

    csv()
    .fromString(fs.readFileSync(__dirname + '/water-data-violations-glitch.csv', 'utf8'))
    .then((jsonObj)=>{

      let outputJSON = {
        "type": "FeatureCollection",
        "features": [] };
        jsonObj.forEach(function(item) {
          let featureObj = {"type": "Feature"}
          featureObj.properties = item;
          let matchFound = false;
          waterSystemDataFeatures.forEach(function(system) {
            //console.log(system.properties.pwsid + '==' + item.WATER_SYSTEM_NUMBER)
            if(system.properties.pwsid == item.WATER_SYSTEM_NUMBER) {
              if(system.geometry.type == 'Point') {
                featureObj.geometry = system.geometry;
                //console.log('found one')
                matchFound = true;
              }
            }
          })
          if(!matchFound) {
            //console.log(item.ZIPCODE)
            let zipInfo = zipMap.get(item.ZIPCODE);
            //console.log(zipInfo)
            if(zipInfo) {
              matchFound = true;
              featureObj.geometry = {
                "type": "Point",
                "coordinates": [
                  zipInfo.LNG,
                  zipInfo.LAT
                ]
              }
            }
          }
          if(matchFound) {
            let result = parseFloat(featureObj.properties.RESULT.split(' ')[0]);
            let mcl = parseFloat(featureObj.properties.MCL.split(' ')[0]);
            featureObj.properties.result_value = result,
            featureObj.properties.mcl_valu = mcl,
            featureObj.properties.proportion_mcl = result / mcl
            if((result / mcl) > 1.5) {
              outputJSON.features.push(featureObj);
            } else {
              console.log(featureObj.properties.RESULT.split(' ')[0])
              console.log(featureObj.properties.MCL.split(' ')[0])
              //console.log(result /mcl)
            }
          }
        })

      fs.writeFileSync(__dirname + '/violations-output.json', JSON.stringify(outputJSON));

    })
  })

});
