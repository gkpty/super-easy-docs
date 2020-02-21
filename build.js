//require('dotenv').config();
var fs = require("fs");

let regionSet = [
  "us-east-2",
  "us-east-1",
  "us-west-1",
  "us-west-2",
  "ap-east-1",
  "ap-south-1",
  "ap-northeast-2",
  "ap-southeast-1",
  "ap-southeast-2",
  "ap-northeast-1",
  "ca-central-1",
  "cn-north-1",
  "cn-northwest-1",
  "eu-central-1",
  "eu-west-1",
  "eu-west-2",
  "eu-west-3",
  "eu-north-1",
  "me-south-1",
  "sa-east-1",
  "us-gov-east-1",
  "us-gov-west-1"
];

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

function initBuild(region, profile, callback){
  let env_file = "";
  try {
    createFile('./docs.json', '{}', function(err, data){
      if(err) throw new Error(err)
      else console.log(data)
    })
    if(profile){
      if(/^[a-zA-Z0-9]*$/.test(profile)){
        env_file += `\nAWS_PROFILE=${profile}`
      }
      else{
        let err = "AWS Profile invalid. Only alphanumeric characters accepted. No spaces.";
        throw new Error(err);
      }
    }
    if(region){
      if(regionSet.includes(region)){
        env_file += `\nAWS_REGION=${region}`
      }
      else {
        let err = "Invalid AWS region code";
        throw new Error(err)  
      }
    }
    createFile('./.env', env_file, function(err, data){
      if(err) throw new Error(err)
      else {
        //console.log(data)
        createFile('./.gitignore', '.env', function(err, data){
          if(err) throw new Error(err)
          else {
            //console.log(data)
            if(callback && typeof callback === 'function'){
              callback(null, 'Success');
            }
          }
        })
      }
    });
  }
  catch(err){
    optionError(err, callback)
  }
}

module.exports = {
  AddVar,
  initBuild,
  createFile
}