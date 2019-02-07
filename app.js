const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

app = express();

app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/signup.html')
})


app.post('/',(req,res)=>{
    var FirstName = req.body.fName;
    var LastName = req.body.lName;
    var Email = req.body.email;

    var data ={
        members:[
            {email_address:Email,
            status:'subscribed',
            merge_fields:{
                FNAME:FirstName,
                LNAME:LastName
            }
        }
        ]
    }
    var jsonData = JSON.stringify(data)
    var options ={
        url:'https://us20.api.mailchimp.com/3.0/lists/5dec7558ab',
        method:'POST',
        headers:{
            'Authorization':'sandman2k18 7d4dda50fb4bdd316fa8446df724dd0e-us20'
        },
        body:jsonData
    }

    request(options, (error,response,body) =>{
        if(error){res.sendFile(__dirname + '/failure.html')}
        else{ if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        }else{
            res.sendFile(__dirname + '/failure.html')
        }}

    })
})


app.post('/failure' ,(req,res) => {
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('server is running on port 3000')
})


//7d4dda50fb4bdd316fa8446df724dd0e-us20
//5dec7558ab