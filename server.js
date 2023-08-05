const express = require("express");
const app = express();
const path = require('path');
app.use(express.json());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname+'/views'));
// let processedData = "";

app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use('/static',express.static('static'))
app.use(express.urlencoded())


app.get('/',(req,res)=>{
  const params ={ }
  res.status(200).render('index.html',params)
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html');
// });

app.post('/process-data', (req, res) => {
    const{ text_line }= req.body;
    // process inputText here and generate response
    const response = `You entered: ${text_line}`;
    // console.log(response);
    res.send({ response });
});
const port = 8000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});