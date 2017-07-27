var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars')
        .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

/* added from express site */
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})




app.get('/', function(req, res){
        res.type('text/plain');
        res.send('Meadowlark Travel');
});
app.get('/about', function(req, res){
        res.type('text/plain');
        res.send('About Meadowlark Travel');
});



// custom 404 page
app.use(function(req, res, next){
        res.type('text/plain');
        res.status(404);
        res.send('404 - Not Found');
});



// custom 500 page
app.use(function(err, req, res, next){
        console.error(err.stack);
        res.type('text/plain');
        res.status(500);
        res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
