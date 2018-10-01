  const fs = require('fs');
  const http = require("http");
  const csv=require('csvtojson');
  const fetch = require('node-fetch');

  const Json2csvParser = require('json2csv').Parser;
  const rp = require('request-promise');

  var requestLib = require('request');
  


  let existingItem, outputFields;
  let systemMap = new Map();
  let rows = [];
  let writeStr = "";

  let tularePoints = null;

  csv()
  .fromString(fs.readFileSync(__dirname + '/raw/TulareBasin_Output.txt', 'utf8'))
  .then((jsonObj)=>{
    tularePoints = jsonObj;
  })

  function dedupe(csvStr, callback) {
    csv()
    .fromString(csvStr)
    .then((jsonObj)=>{
      let waterSystemReports = jsonObj;
      const outputFields = [];
      for(var key in jsonObj[0]) {
        outputFields.push(key);
      }
      jsonObj.forEach(function(item) {
        existingItem = systemMap.get(item.WATER_SYSTEM_NUMBER+'-'+item.ANALYTE_NAME);
        if(existingItem) {
          if(new Date(existingItem.VIOL_BEGIN_DATE).getTime() < new Date(item.VIOL_BEGIN_DATE).getTime()) {
            writeItemToMap(item.WATER_SYSTEM_NUMBER+'-'+item.ANALYTE_NAME, item);
          }
        } else {
          writeItemToMap(item.WATER_SYSTEM_NUMBER+'-'+item.ANALYTE_NAME, item);
        }
      });
      callback(systemMap, outputFields);
    })
  }

  function writeItemToMap(name,item) {
    item.inTulareBasin = false;
    tularePoints.forEach(function(point) {
      if(point.WATER_SYST === item.WATER_SYSTEM_NUMBER) {
        console.log('in Tulare')
        item.inTulareBasin = true;
      }
    })
    systemMap.set(name, item);
  }

  function writeCSV(systemMap, outputFields) {
    console.log('writing csv')
    let count = 0;
    let outputJson = []
    for (var [key, value] of systemMap) {
      outputJson.push(systemMap.get(key));
      count++;
    }
    console.log(count)

    try {
      const parser = new Json2csvParser({ outputFields });
      const csv = parser.parse(outputJson);
      response.setHeader('Content-Type', 'text/csv')
      response.end(csv);
    } catch (err) {
      console.error(err);
    }
  }

  requestLib('https://data.ca.gov/sites/default/files/hr2w_web_data_active_8_2018.csv', function (error, response, body) {
    console.log(body);
    dedupe(body, writeCSV);
  });
