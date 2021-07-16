// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

//UNIX STUFF
function timeConverter(unix_time){
  var a = new Date(unix_time);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var day = days[a.getDay()];
  var date = a.getDate();
  var hour = "0" + a.getHours();
  var min = "0" + a.getMinutes();
  var sec = "0" + a.getSeconds();
  var time = `${day}, ${date} ${month} ${year} ${hour.substr(-2)}:${min.substr(-2)}:${sec.substr(-2)} GMT`;
  return time;
}

//UTC STUFF
function utcToUnixConverter(utc_time){
  const time = new Date(utc_time).valueOf();
  return time;
}

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

app.get('/api/:date', function(req, res){
  let unixParam;
  let utcParam;

  if(req.params.date.length == 13){
    unixParam = parseInt(req.params.date);
    res.send({unix: unixParam, utc: timeConverter(unixParam)});
  } else {
    if (new Date(req.params.date) == null){
      res.send({ error: "Invalid Date" });
    } else {
      utcParam = req.params.date;
      res.send({unix: utcToUnixConverter(utcParam), utc: timeConverter(utcParam)});
    };
  }
})

app.get('/api/', (res,req) => {
  const n = Date.now();
  res.send({unix: n, utc: timeConverter(n)});
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
