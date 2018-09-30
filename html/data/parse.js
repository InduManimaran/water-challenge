const fs = require('fs');
const csv=require('csvtojson');

let systemMap = new Map();

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
    fs.writeFile(__dirname + '/' + key, JSON.stringify(systemMap.get(key)), 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }); 
  }

})
