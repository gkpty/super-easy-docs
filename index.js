var fs = require("fs");
var {initBuild} = require('./build')
var addSections = require('./AddSections')
var createIndex = require('./CreateIndex')
var mdToHtml = require('easy-md-to-html')

function CreateDocs(path, callback){
  //build the docs.json file
  initBuild(function(err, data){
    if(err) throw new Error(err)
    else{
      //read the markdown file
      fs.readFile(path, 'utf8', function(err, data){
        if(err) throw new Error(err)
        else{
          //convert md to html
          let htmlBody = mdToHtml(data)
          //add sections
          addSections(data, function(err, data){
            if(err) throw new Error(err)
            else {
              console.log('hello')
              //create the index
              let index = createIndex()
              //build the html file
              let html = index + htmlBody;
              //save the html file
              fs.writeFile('docs.html', html, function(err, data){
                if(err) throw new Error(err)
                else {
                  callback(null, html)
                }
              })
            }
          })
        }
      })
    }
  })
}

CreateDocs('./docs.md', function(err, data){
  if(err) console.log(err)
  else console.log('success')
})