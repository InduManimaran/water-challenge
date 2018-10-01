const fs = require('fs');
const csv=require('csvtojson');

let systemMap = new Map();

// .fromString(fs.readFileSync(__dirname + '/hr2w_web_data_active_8_2018.csv', 'utf8'))
// .fromString(fs.readFileSync(__dirname + '/hr2w_web_data_rtc_8_2018.csv', 'utf8'))

csv()
.fromString(fs.readFileSync(__dirname + '/hr2w_web_data_active_8_2018.csv', 'utf8'))
.then((jsonObj)=>{

  jsonObj.forEach(function(item) {
    let newArray = [];
    existingItem = systemMap.get(item.WATER_SYSTEM_NUMBER);
    if(existingItem) {
      newArray = existingItem;
    }
    newArray.push(item);
    systemMap.set(item.WATER_SYSTEM_NUMBER, newArray);
  });

  let json = JSON.parse(fs.readFileSync(__dirname.replace('/data','') + '/violations_proportion.json', 'utf8'));
  let matches = 0;
  let noMatches = 0;
  console.log(json.features)
  for (var [key, value] of systemMap) {
    let matchFound = false;
    json.features.forEach( function(item) {
      if(item.properties.WATER_SY_1 == key) {
        matchFound = true;
        matches++;
      }
    })
    if(!matchFound) {
      noMatches++;
    }
    console.log(matchFound);
    
  }
  console.log('matches '+matches);
  console.log('no matches '+noMatches)

})
