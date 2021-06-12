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


    }catch(error){
        return error
    }
}



app.get('/getMail/:id',async (req, res) => {
    const {id} = req.params;
    const sent = await sendMail(id);
    if(sent.accepted){
        res.send("Email sent to "+[sent.accepted]);
        console.log('Email sent successfully ',sent);
    }else{
        console.log('Mail not sent',sent);
        res.send('Mail not sent');
    }
  })
  
  app.listen(port, (req,res) => {
    console.log(`Local Server at http://localhost:${port}`)
  })


// change your passsword and email in user and pass in transporter
