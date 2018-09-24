var express = require('express');
var app = express();
var controller = require('./server/controller/controllers');
var apiControllers = require('./server/controller/apiController');

app.use('/',express.static('index.html'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Method','GET,PUT,DELETE,POST');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With', 'Content-Type, Accept'
    );
    res.header(
        "Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

controller(app);
apiControllers(app);  

var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
