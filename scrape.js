//var scraper = require('./tools').scraper;
//scraper = function(url,parseFcn,filename)
//scrapes a URL, parses it with parseFcn, and archives the data in a JSON file called filename.

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");




var urls = Array.from(Array(22)).map(function(key,val)
    {
        return "https://www.centre.edu/directory/pg/"+(val+1)+"/";
    });

//console.log(urls);

//var urls = ["https://www.centre.edu/directory/pg/1/"]

var promises = urls.map(function(url)
{
  return axios.get(url);
})


Promise.all(promises)
.then(function(htmls)
{
var data = [];

    htmls.forEach(function(html)
 {
     const $ = cheerio.load(html.data);
     //console.log("html",html);
     var parent = $(".individual");
     parent.toArray()
     .forEach(function(person)
     {
         var obj = {};
         obj.firstName = $(person).find(".given-name").text();
         obj.lastName = $(person).find(".family-name").text();
         obj.photo = $(person).find(".photo").attr("srcset");
         if(obj.photo)
         {
            obj.photo = "https:"+obj.photo.substring(0,(obj.photo.length-3));
         }
         obj.title= $(person).find(".title").text();
         obj.unit = $(person).find(".organization-unit").text();
         obj.email = $(person).find(".email-address").text();
         obj.bio = $(person).find(".cn-biography>p:first-child").text();
         obj.phone = $(person).find(".phone-number-block .value").text();
         data.push(obj);
     });
 })
    console.log("data",data);
 var json = JSON.stringify(data);
    fs.writeFile("faculty.json",json,"utf8",function(){console.log("All Done!")});
})

//console.log("Arr",Array(23).keys());
