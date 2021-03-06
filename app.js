const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const session    = require('express-session');



const loginRoutes= require ('./routes/login');
const cabroutes  = require ('./routes/cabroutes'); 
const con        = require('./connection');

const app = express();
app.set('view engine','ejs');
app.set('port',(process.env.PORT || 8000))


app.use(bodyParser.urlencoded({extend:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 10 }
    })
  );


app.use(loginRoutes);
app.use(cabroutes);


app.use((req,res,next) => {    
    console.log("entered 404 error");
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

//listing to port 8000
app.listen(app.get('port'),()=>{
    console.log('Node app is uprunning on port :http://localhost:'+app.get('port'));
});