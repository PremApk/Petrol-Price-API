const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio');

const app = express();

//Url For Web-Scrapping
const urls = {
    "url": "https://www.goodreturns.in/petrol-price.html",
    "AN_url": "https://www.goodreturns.in/petrol-price-in-andaman-nicobar-s1.html",
    "AP_url": "https://www.goodreturns.in/petrol-price-in-andhra-pradesh-s2.html",
    "AR_url": "https://www.goodreturns.in/petrol-price-in-arunachal-pradesh-s3.html",
    "AS_url": "https://www.goodreturns.in/petrol-price-in-assam-s4.html",
    "BR_url": "https://www.goodreturns.in/petrol-price-in-bihar-s5.html",
    "CH_url": "https://www.goodreturns.in/petrol-price-in-chandigarh-s6.html",
    "CG_url": "https://www.goodreturns.in/petrol-price-in-chhatisgarh-s7.html",
    "DH_url": "https://www.goodreturns.in/petrol-price-in-dadra-nagarhaveli-s8.html",
    "DD_url": "https://www.goodreturns.in/petrol-price-in-daman-diu-s9.html",
    "DL_url": "https://www.goodreturns.in/petrol-price-in-delhi-s10.html",
    "GA_url": "https://www.goodreturns.in/petrol-price-in-goa-s11.html",
    "GJ_url": "https://www.goodreturns.in/petrol-price-in-gujarat-s12.html",
    "HR_url": "https://www.goodreturns.in/petrol-price-in-haryana-s13.html",
    "HP_url": "https://www.goodreturns.in/petrol-price-in-himachal-pradesh-s14.html",
    "JK_url": "https://www.goodreturns.in/petrol-price-in-jammu-kashmir-s15.html",
    "JH_url": "https://www.goodreturns.in/petrol-price-in-jharkhand-s16.html",
    "KA_url": "https://www.goodreturns.in/petrol-price-in-karnataka-s17.html",
    "KL_url": "https://www.goodreturns.in/petrol-price-in-kerala-s18.html",
    "MP_url": "https://www.goodreturns.in/petrol-price-in-madhya-pradesh-s19.html",
    "MH_url": "https://www.goodreturns.in/petrol-price-in-maharashtra-s20.html",
    "MN_url": "https://www.goodreturns.in/petrol-price-in-manipur-s21.html",
    "ML_url": "https://www.goodreturns.in/petrol-price-in-meghalaya-s22.html",
    "MZ_url": "https://www.goodreturns.in/petrol-price-in-mizoram-s23.html",
    "NL_url": "https://www.goodreturns.in/petrol-price-in-nagaland-s24.html",
    "OR_url": "https://www.goodreturns.in/petrol-price-in-odisha-s25.html",
    "PY_url": "https://www.goodreturns.in/petrol-price-in-pondicherry-s26.html",
    "PB_url": "https://www.goodreturns.in/petrol-price-in-punjab-s27.html",
    "RJ_url": "https://www.goodreturns.in/petrol-price-in-rajasthan-s28.html",
    "SK_url": "https://www.goodreturns.in/petrol-price-in-sikkim-s29.html",
    "TN_url": "https://www.goodreturns.in/petrol-price-in-tamil-nadu-s30.html",
    "TS_url": "https://www.goodreturns.in/petrol-price-in-telangana-s31.html",
    "TR_url": "https://www.goodreturns.in/petrol-price-in-tripura-s32.html",
    "UP_url": "https://www.goodreturns.in/petrol-price-in-uttar-pradesh-s33.html",
    "UK_url": "https://www.goodreturns.in/petrol-price-in-uttarakhand-s34.html",
    "WB_url": "https://www.goodreturns.in/petrol-price-in-west-bengal-s35.html"

}

const parsed_data = []

//Main Script for parsing necessary data
function script(res, url) {
    axios.get(url).then((response) => {

        const html = response.data
        const $ = cheerio.load(html)

        $('.even_row, .odd_row', html).each(function () {
            const capital = $(this).find('td:nth-child(1)').text();
            const t_Price = $(this).find('td:nth-child(2)').text().replace(/\t|\n/gm, "");
            const y_Price = $(this).find('td:nth-child(3)').text().replace(/\t|\n/gm, "");

            parsed_data.push({
                "City": capital,
                "Today's Price": t_Price,
                "Yesterday's Price": y_Price
            })
        })
        res.json(parsed_data);
        parsed_data.splice(0, parsed_data.length);

    }).catch(err => console.log(err))
}

//Routers
app.get('/', (req, res) => {
    res.json("Hey Dev! Give '/<state-name>' with base Url to get respective Petrol Prices!!!");
})

app.get('/india', (req, res) => {
    script(res, urls["url"]);
})

app.get('/andaman', (req, res) => {
    script(res, urls["AN_url"]);
})

app.get('/andhrapradesh', (req, res) => {
    script(res, urls["AP_url"]);
})

app.get('/arunachalpradesh', (req, res) => {
    script(res, urls["AR_url"]);
})

app.get('/assam', (req, res) => {
    script(res, urls["AS_url"]);
})

app.get('/bihar', (req, res) => {
    script(res, urls["BR_url"]);
})

app.get('/chandigarh', (req, res) => {
    script(res, urls["CH_url"]);
})

app.get('/chhatisgarh', (req, res) => {
    script(res, urls["CG_url"]);
})

app.get('/dadranagarhaveli', (req, res) => {
    script(res, urls["DH_url"]);
})

app.get('/damandiu', (req, res) => {
    script(res, urls["DD_url"]);
})

app.get('/delhi', (req, res) => {
    script(res, urls["DL_url"]);
})

app.get('/goa', (req, res) => {
    script(res, urls["GA_url"]);
})

app.get('/gujarat', (req, res) => {
    script(res, urls["GJ_url"]);
})

app.get('/haryana', (req, res) => {
    script(res, urls["HR_url"]);
})

app.get('/himachalpradesh', (req, res) => {
    script(res, urls["HP_url"]);
})

app.get('/jammukashmir', (req, res) => {
    script(res, urls["JK_url"]);
})

app.get('/jharkhand', (req, res) => {
    script(res, urls["JH_url"]);
})

app.get('/karnataka', (req, res) => {
    script(res, urls["KA_url"]);
})

app.get('/kerala', (req, res) => {
    script(res, urls["KL_url"]);
})

app.get('/madhyapradesh', (req, res) => {
    script(res, urls["MP_url"]);
})

app.get('/maharashtra', (req, res) => {
    script(res, urls["MH_url"]);
})

app.get('/manipur', (req, res) => {
    script(res, urls["MN_url"]);
})

app.get('/meghalaya', (req, res) => {
    script(res, urls["ML_url"]);
})

app.get('/mizoram', (req, res) => {
    script(res, urls["MZ_url"]);
})

app.get('/nagaland', (req, res) => {
    script(res, urls["NL_url"]);
})

app.get('/odisha', (req, res) => {
    script(res, urls["OR_url"]);
})

app.get('/pondicherry', (req, res) => {
    script(res, urls["PY_url"]);
})

app.get('/punjab', (req, res) => {
    script(res, urls["PB_url"]);
})

app.get('/rajasthan', (req, res) => {
    script(res, urls["RJ_url"]);
})

app.get('/sikkim', (req, res) => {
    script(res, urls["SK_url"]);
})

app.get('/tamilnadu', (req, res) => {
    script(res, urls["TN_url"]);
})

app.get('/telangana', (req, res) => {
    script(res, urls["TS_url"]);
})

app.get('/tripura', (req, res) => {
    script(res, urls["TR_url"]);
})

app.get('/uttarpradesh', (req, res) => {
    script(res, urls["UP_url"]);
})

app.get('/uttarakhand', (req, res) => {
    script(res, urls["UK_url"]);
})

app.get('/westbengal', (req, res) => {
    script(res, urls["WB_url"]);
})


//Port Mapping
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`))
