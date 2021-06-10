const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const hb = require('handlebars')
const readFile = utils.promisify(fs.readFile)

async function getTemplateHTML(){
    console.log("Loading template file in memory");
    try{
        const invoicePath = path.resolve("./Untitleddocument.html");
        return await readFile(invoicePath,'utf8');
    } catch(err){
        return Promise.reject("Could not load html template");
    }
}

async function generatePdf(){
    let data = {};
    getTemplateHTML().then(async (res)=>{
        console.log("Compiling the template with handlebars");
        const template = hb.compile(res,{strict:true});
        const result = template(data);
        const html = result;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        await page.pdf({path: 'example.pdf' , format:'A4'});
        await browser.close();
        console.log("Pdf generated")
    }).catch(err =>{
        console.log(err)
    });
}

generatePdf();