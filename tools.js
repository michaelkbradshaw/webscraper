const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");


var retrievePage = function(url,command)
{
    axios.get(url)
    .then(function(response)
    {
        command(response.data);   
    })
    .catch(function(error)
    {
        console.log("unable to retrieve URL",error);    
    })
}


var storeToDisk = function(filename,data,callback)
{
    var json = JSON.stringify(data);
    fs.writeFile(filename,json,"utf8",callback);
}

//scrapes a URL, parses it with parseFcn, and archives the data in a JSON file called filename.
exports.scraper = function(url,parseFcn,filename)
{
    console.log("reading page");
    retrievePage(url,function(html)
    {
        console.log("picked up html",html)
        const $ = cheerio.load(html);
        var data = [];
        parseFcn($,data);
        storeToDisk(filename,data,function(){console.log("Saved to "+filename);});
    });
}


//scrapes a URL, parses it with parseFcn, and archives the data in a JSON file called filename.
exports.scraper2 = function(url,parseFcn,data)
{
    console.log("reading page");
    retrievePage(url,function(html)
    {
        console.log("picked up html",html)
        const $ = cheerio.load(html);
//        var data = [];
        parseFcn($,data);
//        storeToDisk(filename,data,function(){console.log("Saved to "+filename);});
    });
}


