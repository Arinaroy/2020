var express = require('express'); 
var app = express(); 
var path = require('path');
var axios = require('axios');
const bodyParser = require("body-parser");
var PORT = 3000; 

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const url1 = "https://api.covidindiatracker.com/state_data.json";
  const url2 = "https://api.covidindiatracker.com/total.json";
  axios.all([
    axios.get(url1), 
    axios.get(url2)
  ]).then(axios.spread((data1, data2)=>{
    res.render("index", {
          appName: "SPOILER 2020",
          pageName: "India Fights Corona",
          data1: data1.data,
          data2: data2.data
    });
  }));
});


app.listen(PORT, function(err){ 
  if (err) console.log(err); 
  console.log("Server listening on PORT", PORT); 
}); 