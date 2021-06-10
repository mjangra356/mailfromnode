const express = require('express');
const app = express();
const port = 3000;
var nodemailer = require('nodemailer');


async function sendMail(mail){
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'testmailformode@gmail.com',
                pass: 'ENTER_YOUR_PASSWORD'
            }
        });
        
        var mailOptions = {
            from: 'Mohit from Nodejs <testmailfornode@gmail.com>',
            to: mail,
            bcc: 'mjangra356@gmail.com',
            subject: 'Mail using Nodemailer',
            text:'This is a test email from node js using nodemailer'
        };
        
        const result = await transporter.sendMail(mailOptions);
        return result;


    }catch(err){
        return error
    }
}



app.get('/getMail/:id', (req, res) => {
    const {id} = req.params;
    sendMail(id).then(result=> {
        res.send('Email sent successfully!!!');
        console.log('Email sent successfully...',result)
    })
    .catch(error=> console.log(error.message))

  })
  
  app.listen(port, (req,res) => {
    console.log(`Local Server at http://localhost:${port}`)
  })


// change your passsword and email in user and pass in transporter