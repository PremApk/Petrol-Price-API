const PORT = 8000

const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio');


const app = express();
const url = "https://www.goodreturns.in/petrol-price.html"
const TN_url = "https://www.goodreturns.in/petrol-price-in-tamil-nadu-s30.html"
const parsed_data = []

app.get('/metrocities', (req, res) => {
    axios.get(url).then((response) => {
        const html = response.data
        const $ = cheerio.load(html)


        $('.even_row, .odd_row', html).each(function () {
            const capital = $(this).find('td:nth-child(1)').text();
            const t_Price = $(this).find('td:nth-child(2)').text();
            const y_Price = $(this).find('td:nth-child(3)').text();

            parsed_data.push({
                "City": capital,
                "Today's Price": t_Price,
                "Yesterday's Price": y_Price
            })
        })
        res.json(parsed_data);
        parsed_data.splice(0, parsed_data.length);

    }).catch(err => console.log(err))
})
app.get('/tamilnadu', (req, res) => {
    axios.get(TN_url).then((response) => {
        const html = response.data
        const $ = cheerio.load(html)

        $('.even_row, .odd_row', html).each(function () {
            const district = $(this).find('td:nth-child(1)').text();
            const t_Price = $(this).find('td:nth-child(2)').text().replace(/\t|\n/gm, "");
            const y_Price = $(this).find('td:nth-child(3)').text().replace(/\t|\n/gm, "");

            parsed_data.push({
                "District": district,
                "Today's Price": t_Price,
                "Yesterday's Price": y_Price
            })
        })
        res.json(parsed_data);
        parsed_data.splice(0, parsed_data.length);
    }).catch(err => console.log(err))
})


app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`))