const PORT = 8000
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

//initialize express
const app = express();

//using axios to access the url and parse the response as HTML
const url = 'https://techcabal.com/'
axios(url).then(response => {
    const htmlMarkup = response.data;
    const _parsedHTML = cheerio.load(htmlMarkup)
    const articles = []

    //extracting data you want from the website
    _parsedHTML('.article-list-item').each(function () {
       const title =  _parsedHTML(this).find('.article-list-desc').find('a').text().replace( /[\r\n]+/gm, "")
        const category = _parsedHTML(this).find('.article-list-pretitle').find('a').text()
        const url =  _parsedHTML(this).find('.article-list-desc').find('a').attr('href')

        //appending data to existing
        articles.push({
            title,
            category,
            url
        })
    })
    console.log(articles) //logging data to console
}).catch(err => {
    //catching errors
  console.log({
      error: err
  })
})
app.listen(PORT, ()=> console.log(`server is running at ${PORT}`))

