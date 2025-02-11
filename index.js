// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// your second API endpoint... 
app.get("/api/other", function (req, res) {
  res.json({greeting: 'other API'});
});

// your second API endpoint... 
app.get("/api/:date?", function (req, res) {
  let aDate;
  let aDate_unix;
  if(!req.params.date){
    aDate = new Date();
    aDate_unix = Math.floor(new Date().getTime() / 1000); 
  } else if(req.params.date.includes('-')){
    aDate = new Date(req.params.date.replace('-','.'));
    aDate_unix = Math.floor(new Date(aDate).getTime() / 1000);
  } else{
    aDate_unix = parseInt(req.params.date);
    aDate = new Date(parseInt(aDate_unix)).toString();
  }
  let hours = aDate.getHours() < 10 ? "0" + aDate.getHours() : aDate.getHours();
  let minutes = aDate.getMinutes() < 10 ? "0" + aDate.getMinutes() : aDate.getMinutes();
  let seconds = aDate.getSeconds() < 10 ? "0" + aDate.getSeconds() : aDate.getSeconds();
  res.json({unix: aDate_unix, utc: `${weekDays[aDate.getDay()]}, ${aDate.getDate()} ${months[aDate.getMonth()]} ${aDate.getFullYear()} ${hours}:${minutes}:${seconds} GMT`});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
