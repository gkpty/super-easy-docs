//generates a markdown version of your node module's API
const fs = require('fs')

//fetch the index.js file
function main(file){
  return new Promise((resolve, reject)=>{
    let indexFile = fs.readFileSync(file, 'utf8');
    let arr = indexFile.split('module.exports')
    let exportMethods = [];
    let exportFunctions = [];
    let filesArr = [];
    for(let a of arr) {
      if(a.trim().startsWith('=') || a.trim().startsWith('.')){
        //console.log(a)
        let firstw = a.split('=', 2)[1].trim().split(' ')[0];
        if(firstw === 'function' || firstw === 'async'){
          exportFunctions.push(a.split('=', 2)[1].split(')')[0].trim()+')');
        } 
        else {
          //console.log(a)
          exportMethods.push(a.split('=',2)[1].trim().split(';')[0]);
        }
      }
    }
    if(exportMethods.length > 0){
      for(let e of exportMethods){
        if(indexFile.split(e).length > 2){
          for(let i in indexFile.split(e)){
            if(i%2 && indexFile.split(e)[i].trim().startsWith('=')){
              //check if has the words require
              let sw = indexFile.split(e)[i].split('=',2)[1].trim();
              console.log(sw)
              if(sw.startsWith('require')) filesArr.push(sw.split('require(')[1]);
              //else call the checkType function
            }
          } 
        }
      }
    }
    resolve({em: exportMethods, ef: exportFunctions, files:filesArr})
  })
}

main('fakeindex.js').then((data)=> console.log(data))