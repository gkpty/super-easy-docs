//require('dotenv').config();
var fs = require("fs");

function optionError(err, callback){
  if(callback && typeof callback === 'function') callback(new Error(err))
  else throw new Error(err);
}

function AddVar(variable, value, callback){
  let rawdata = fs.readFileSync(`docs.json`);  
  obj = JSON.parse(rawdata);
  obj[variable] = value;
  jsonString = JSON.stringify(obj);
  fs.writeFileSync(`docs.json`, jsonString);
  //console.log('\x1b[33m', `Variable: ${variable} saved.`, '\x1b[0m')
  if(callback && typeof callback === 'function') callback(null, 'Success');
  else return 'Success';
}

function createFile(file, contents, callback) {
  if(fs.existsSync(file)){
    let err = `file ${file} already exists`
    if(callback && typeof callback === 'function') callback(null, err)
    else return data;
  }
  else {
    fs.writeFile(file, contents, (err) => {
      if (err) {
        if(callback && typeof callback === 'function') callback(new Error(err))
        else throw new Error(err);
      }
      else {
        let data = `Created the ${file} file`
        if(callback && typeof callback === 'function') callback(null, data)
        else return data;
      }
    })
  }
}

function initBuild(callback){
  let env_file = "";
  createFile('./docs.json', '{}', function(err, data){
    if(err) throw new Error(err)
    else {
      if(callback && typeof callback === 'function'){
        callback(null, 'Success');
      }
    }
  })
}

module.exports = {
  AddVar,
  initBuild,
  createFile
}