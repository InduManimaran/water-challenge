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

  for (var [key, value] of systemMap) {
    let path = __dirname + '/parsed/' + key + '.json';
    if (fs.existsSync(path)) {
      console.log(key+' exists')
    } else {
      console.log(key+' does not exist')
      fs.writeFile(path, JSON.stringify(systemMap.get(key)), 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }
        //console.log("The file was saved!");
      });
    }
  }

})
