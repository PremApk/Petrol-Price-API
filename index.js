const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio');

const app = express();

//Url For Web-Scrapping
const petrol_urls = {
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

const lpg_urls = {
    "url": "https://www.goodreturns.in/lpg-price.html",
    "AN_url": "https://www.goodreturns.in/lpg-price-in-andaman-nicobar-s1.html",
    "AP_url": "https://www.goodreturns.in/lpg-price-in-andhra-pradesh-s2.html",
    "AR_url": "https://www.goodreturns.in/lpg-price-in-arunachal-pradesh-s3.html",
    "AS_url": "https://www.goodreturns.in/lpg-price-in-assam-s4.html",
    "BR_url": "https://www.goodreturns.in/lpg-price-in-bihar-s5.html",
    "CH_url": "https://www.goodreturns.in/lpg-price-in-chandigarh-s6.html",
    "CG_url": "https://www.goodreturns.in/lpg-price-in-chhatisgarh-s7.html",
    "DH_url": "https://www.goodreturns.in/lpg-price-in-dadra-nagarhaveli-s8.html",
    "DD_url": "https://www.goodreturns.in/lpg-price-in-daman-diu-s9.html",
    "DL_url": "https://www.goodreturns.in/lpg-price-in-delhi-s10.html",
    "GA_url": "https://www.goodreturns.in/lpg-price-in-goa-s11.html",
    "GJ_url": "https://www.goodreturns.in/lpg-price-in-gujarat-s12.html",
    "HR_url": "https://www.goodreturns.in/lpg-price-in-haryana-s13.html",
    "HP_url": "https://www.goodreturns.in/lpg-price-in-himachal-pradesh-s14.html",
    "JK_url": "https://www.goodreturns.in/lpg-price-in-jammu-kashmir-s15.html",
    "JH_url": "https://www.goodreturns.in/lpg-price-in-jharkhand-s16.html",
    "KA_url": "https://www.goodreturns.in/lpg-price-in-karnataka-s17.html",
    "KL_url": "https://www.goodreturns.in/lpg-price-in-kerala-s18.html",
    "MP_url": "https://www.goodreturns.in/lpg-price-in-madhya-pradesh-s19.html",
    "MH_url": "https://www.goodreturns.in/lpg-price-in-maharashtra-s20.html",
    "MN_url": "https://www.goodreturns.in/lpg-price-in-manipur-s21.html",
    "ML_url": "https://www.goodreturns.in/lpg-price-in-meghalaya-s22.html",
    "MZ_url": "https://www.goodreturns.in/lpg-price-in-mizoram-s23.html",
    "NL_url": "https://www.goodreturns.in/lpg-price-in-nagaland-s24.html",
    "OR_url": "https://www.goodreturns.in/lpg-price-in-odisha-s25.html",
    "PY_url": "https://www.goodreturns.in/lpg-price-in-pondicherry-s26.html",
    "PB_url": "https://www.goodreturns.in/lpg-price-in-punjab-s27.html",
    "RJ_url": "https://www.goodreturns.in/lpg-price-in-rajasthan-s28.html",
    "SK_url": "https://www.goodreturns.in/lpg-price-in-sikkim-s29.html",
    "TN_url": "https://www.goodreturns.in/lpg-price-in-tamil-nadu-s30.html",
    "TS_url": "https://www.goodreturns.in/lpg-price-in-telangana-s31.html",
    "TR_url": "https://www.goodreturns.in/lpg-price-in-tripura-s32.html",
    "UP_url": "https://www.goodreturns.in/lpg-price-in-uttar-pradesh-s33.html",
    "UK_url": "https://www.goodreturns.in/lpg-price-in-uttarakhand-s34.html",
    "WB_url": "https://www.goodreturns.in/lpg-price-in-west-bengal-s35.html"
}

const parsed_data = []

//Main Script for parsing necessary data
function script(res, url, type) {
    axios.get(url).then((response) => {

        const html = response.data
        const $ = cheerio.load(html)

        $('.even_row, .odd_row', html).each(function () {
            const capital = $(this).find('td:nth-child(1)').text();
            const t_Price = $(this).find('td:nth-child(2)').text().replace(/\t|\n/gm, "");
            const y_Price = $(this).find('td:nth-child(3)').text().replace(/\t|\n/gm, "");

            if(type === "petrol") 
            {
                parsed_data.push({
                    "City": capital,
                    "Today's Price": t_Price,
                    "Yesterday's Price": y_Price
                })    
            }
            else
            {
                parsed_data.push({
                    "City": capital,
                    "Today's Price": t_Price,
                    "Last Month's Price": y_Price
                })
            }
            
        })
        res.json(parsed_data);
        parsed_data.splice(0, parsed_data.length);

    }).catch(err => console.log(err))
}

//Petrol Routers
app.get('/', (req, res) => {
    res.json("Hey Dev! Give '/<petrol/lpg>/<state-name>' with base Url to get respective Petrol Prices!!!");
})

app.get('/petrol/india', (req, res) => {
    script(res, petrol_urls["url"], "petrol");
})

app.get('/petrol/andaman', (req, res) => {
    script(res, petrol_urls["AN_url"], "petrol");
})

app.get('/petrol/andhrapradesh', (req, res) => {
    script(res, petrol_urls["AP_url"], "petrol");
})

app.get('/petrol/arunachalpradesh', (req, res) => {
    script(res, petrol_urls["AR_url"], "petrol");
})

app.get('/petrol/assam', (req, res) => {
    script(res, petrol_urls["AS_url"], "petrol");
})

app.get('/petrol/bihar', (req, res) => {
    script(res, petrol_urls["BR_url"], "petrol");
})

app.get('/petrol/chandigarh', (req, res) => {
    script(res, petrol_urls["CH_url"], "petrol");
})

app.get('/petrol/chhatisgarh', (req, res) => {
    script(res, petrol_urls["CG_url"], "petrol");
})

app.get('/petrol/dadranagarhaveli', (req, res) => {
    script(res, petrol_urls["DH_url"], "petrol");
})

app.get('/petrol/damandiu', (req, res) => {
    script(res, petrol_urls["DD_url"], "petrol");
})

app.get('/petrol/delhi', (req, res) => {
    script(res, petrol_urls["DL_url"], "petrol");
})

app.get('/petrol/goa', (req, res) => {
    script(res, petrol_urls["GA_url"], "petrol");
})

app.get('/petrol/gujarat', (req, res) => {
    script(res, petrol_urls["GJ_url"], "petrol");
})

app.get('/petrol/haryana', (req, res) => {
    script(res, petrol_urls["HR_url"], "petrol");
})

app.get('/petrol/himachalpradesh', (req, res) => {
    script(res, petrol_urls["HP_url"], "petrol");
})

app.get('/petrol/jammukashmir', (req, res) => {
    script(res, petrol_urls["JK_url"], "petrol");
})

app.get('/petrol/jharkhand', (req, res) => {
    script(res, petrol_urls["JH_url"], "petrol");
})

app.get('/petrol/karnataka', (req, res) => {
    script(res, petrol_urls["KA_url"], "petrol");
})

app.get('/petrol/kerala', (req, res) => {
    script(res, petrol_urls["KL_url"], "petrol");
})

app.get('/petrol/madhyapradesh', (req, res) => {
    script(res, petrol_urls["MP_url"], "petrol");
})

app.get('/petrol/maharashtra', (req, res) => {
    script(res, petrol_urls["MH_url"], "petrol");
})

app.get('/petrol/manipur', (req, res) => {
    script(res, petrol_urls["MN_url"], "petrol");
})

app.get('/petrol/meghalaya', (req, res) => {
    script(res, petrol_urls["ML_url"], "petrol");
})

app.get('/petrol/mizoram', (req, res) => {
    script(res, petrol_urls["MZ_url"], "petrol");
})

app.get('/petrol/nagaland', (req, res) => {
    script(res, petrol_urls["NL_url"], "petrol");
})

app.get('/petrol/odisha', (req, res) => {
    script(res, petrol_urls["OR_url"], "petrol");
})

app.get('/petrol/pondicherry', (req, res) => {
    script(res, petrol_urls["PY_url"], "petrol");
})

app.get('/petrol/punjab', (req, res) => {
    script(res, petrol_urls["PB_url"], "petrol");
})

app.get('/petrol/rajasthan', (req, res) => {
    script(res, petrol_urls["RJ_url"], "petrol");
})

app.get('/petrol/sikkim', (req, res) => {
    script(res, petrol_urls["SK_url"], "petrol");
})

app.get('/petrol/tamilnadu', (req, res) => {
    script(res, petrol_urls["TN_url"], "petrol");
})

app.get('/petrol/telangana', (req, res) => {
    script(res, petrol_urls["TS_url"], "petrol");
})

app.get('/petrol/tripura', (req, res) => {
    script(res, petrol_urls["TR_url"], "petrol");
})

app.get('/petrol/uttarpradesh', (req, res) => {
    script(res, petrol_urls["UP_url"], "petrol");
})

app.get('/petrol/uttarakhand', (req, res) => {
    script(res, petrol_urls["UK_url"], "petrol");
})

app.get('/petrol/westbengal', (req, res) => {
    script(res, petrol_urls["WB_url"]), "petrol";
})

//LPG Routers
app.get('/lpg/india', (req, res) => {
    script(res, lpg_urls["url"], "lpg");
})

app.get('/lpg/andaman', (req, res) => {
    script(res, lpg_urls["AN_url"], "lpg");
})

app.get('/lpg/andhrapradesh', (req, res) => {
    script(res, lpg_urls["AP_url"], "lpg");
})

app.get('/lpg/arunachalpradesh', (req, res) => {
    script(res, lpg_urls["AR_url"], "lpg");
})

app.get('/lpg/assam', (req, res) => {
    script(res, lpg_urls["AS_url"], "lpg");
})

app.get('/lpg/bihar', (req, res) => {
    script(res, lpg_urls["BR_url"], "lpg");
})

app.get('/lpg/chandigarh', (req, res) => {
    script(res, lpg_urls["CH_url"], "lpg");
})

app.get('/lpg/chhatisgarh', (req, res) => {
    script(res, lpg_urls["CG_url"], "lpg");
})

app.get('/lpg/dadranagarhaveli', (req, res) => {
    script(res, lpg_urls["DH_url"], "lpg");
})

app.get('/lpg/damandiu', (req, res) => {
    script(res, lpg_urls["DD_url"], "lpg");
})

app.get('/lpg/delhi', (req, res) => {
    script(res, lpg_urls["DL_url"], "lpg");
})

app.get('/lpg/goa', (req, res) => {
    script(res, lpg_urls["GA_url"], "lpg");
})

app.get('/lpg/gujarat', (req, res) => {
    script(res, lpg_urls["GJ_url"], "lpg");
})

app.get('/lpg/haryana', (req, res) => {
    script(res, lpg_urls["HR_url"], "lpg");
})

app.get('/lpg/himachalpradesh', (req, res) => {
    script(res, lpg_urls["HP_url"], "lpg");
})

app.get('/lpg/jammukashmir', (req, res) => {
    script(res, lpg_urls["JK_url"], "lpg");
})

app.get('/lpg/jharkhand', (req, res) => {
    script(res, lpg_urls["JH_url"], "lpg");
})

app.get('/lpg/karnataka', (req, res) => {
    script(res, lpg_urls["KA_url"], "lpg");
})

app.get('/lpg/kerala', (req, res) => {
    script(res, lpg_urls["KL_url"], "lpg");
})

app.get('/lpg/madhyapradesh', (req, res) => {
    script(res, lpg_urls["MP_url"], "lpg");
})

app.get('/lpg/maharashtra', (req, res) => {
    script(res, lpg_urls["MH_url"], "lpg");
})

app.get('/lpg/manipur', (req, res) => {
    script(res, lpg_urls["MN_url"], "lpg");
})

app.get('/lpg/meghalaya', (req, res) => {
    script(res, lpg_urls["ML_url"], "lpg");
})

app.get('/lpg/mizoram', (req, res) => {
    script(res, lpg_urls["MZ_url"], "lpg");
})

app.get('/lpg/nagaland', (req, res) => {
    script(res, lpg_urls["NL_url"], "lpg");
})

app.get('/lpg/odisha', (req, res) => {
    script(res, lpg_urls["OR_url"], "lpg");
})

app.get('/lpg/pondicherry', (req, res) => {
    script(res, lpg_urls["PY_url"], "lpg");
})

app.get('/lpg/punjab', (req, res) => {
    script(res, lpg_urls["PB_url"], "lpg");
})

app.get('/lpg/rajasthan', (req, res) => {
    script(res, lpg_urls["RJ_url"], "lpg");
})

app.get('/lpg/sikkim', (req, res) => {
    script(res, lpg_urls["SK_url"], "lpg");
})

app.get('/lpg/tamilnadu', (req, res) => {
    script(res, lpg_urls["TN_url"], "lpg");
})

app.get('/lpg/telangana', (req, res) => {
    script(res, lpg_urls["TS_url"], "lpg");
})

app.get('/lpg/tripura', (req, res) => {
    script(res, lpg_urls["TR_url"], "lpg");
})

app.get('/lpg/uttarpradesh', (req, res) => {
    script(res, lpg_urls["UP_url"], "lpg");
})

app.get('/lpg/uttarakhand', (req, res) => {
    script(res, lpg_urls["UK_url"], "lpg");
})

app.get('/lpg/westbengal', (req, res) => {
    script(res, lpg_urls["WB_url"], "lpg");
})

//Port Mapping
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`))
