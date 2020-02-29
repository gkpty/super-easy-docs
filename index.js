var fs = require("fs");
var {initBuild} = require('./build')
var addSections = require('./AddSections')
var createIndex = require('./CreateIndex')
var mdToHtml = require('easy-md-to-html')
var project_title = 'Super Easy Forms'

var head = `
  <head>
    <meta name="description" content="documentation for ${project_title} made with Super Easy Docs">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">    
		<link rel="icon" href="img/sef-favicon.png">
    <link href="docs.css" rel="stylesheet">
    <title>${project_title} docs</title>
  </head>
`;

var nav = fs.readFileSync('./nav.html', 'utf8');

var footer = `
<footer class="bg-dark sticky-bottom text-center text-white py-4">
  <div class="container">
    <div class="row">
      <div class="col-sm-6">
        <p class="text-lg-left">Copyright &copy; Super Easy Forms 2019</p>
      </div>
      <div class="col-sm-6">
        <p class="text-lg-right">powered by <a href="https://torus-digital.com">Torus</a></p>
      </div>
    </div>
  </div>
</footer>
`;
var scripts = `
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
<script src="docs.js"></script>
`;

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
          let body = mdToHtml(data);
          //add sections
          addSections(data, function(err, data){
            if(err) throw new Error(err)
            else {
              //create the index
              let index = createIndex();
              //build the html file
              let html = `
              <!doctype html>
                <html lang="en">
                  ${head}
                <body id="page-top">
                  <div class="d-lg-flex" id="wrapper">
                    ${index}
                    <div id="page-content-wrapper">
                      ${nav}
                      <div class="container docs">
                        ${body}
                        </section>
                      </div>
                      ${footer}
                    </div>
                  </div>
                  ${scripts}
                </body>
              </html>        
              `;
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