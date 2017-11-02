var http = require('http');
var tracery = require('tracery-grammar');
var story = require('./shadowgirl-story.js');

var grammar = tracery.createGrammar(story.city);
grammar.addModifiers(tracery.baseEngModifiers);

var custom = require('./tracery-custom');
grammar.addModifiers(custom.modifiers(grammar));

var stylesheet = `
<style>
body {
  font-family: "Times New Roman", Georgia, Serif;
}

p {
  page-break-inside: avoid;
}

.title {
  text-align: center;
  font-size: 250%;
  font-variant: small-caps;
  font-weight: 900;
}

.author {
  text-align: center;
  font-size: 150%;
  font-weight: normal;
  font-style: italic;
}

.story {
  text-align: left;
  font-size: 100%;
  font-weight: normal;
  font-variant: normal;
  font-style: normal;
  max-width: 800;
  margin-left: auto;
  margin-right: auto;
}
</style>
`;


var htmlhead = '<html><head>',
    headbody = '</head><body>',
    titlebox = '<div class="title">',
    authorbox = '</div><br /><div class="author">',
    storybox = '</div><br /><div class="story">',
    storytail = '</div></body></html>';

http.createServer(function(req, res) {
  var title = "She of Shadows";
  var author = "Coppelia Robeson";
  var story = grammar.flatten('#test#');
  var everything = htmlhead + stylesheet + headbody + titlebox + title + authorbox + author + storybox + story + storytail;

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(everything);
}).listen(8080);