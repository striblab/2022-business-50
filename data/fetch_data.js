require('dotenv').config()
const fetch = require('node-fetch')
const fs = require('fs')

const DATA_UI_LOCATION = process.env.DATA_UI_LOCATION;
const DATA_UI_USER = process.env.DATA_UI_USERNAME;
const DATA_UI_API_KEY = process.env.DATA_UI_API_KEY;
const PUBLISH_YEAR = 2022;

const url = DATA_UI_LOCATION + '/api/v01/company_details/?finance_publishyear=' + PUBLISH_YEAR + '&limit=100&username=' + DATA_UI_USER + '&api_key=' + DATA_UI_API_KEY;

fetch(url)
    .then(res => res.json())
    .then(json => {
        const data = JSON.stringify(json.objects);

        fs.writeFile('./data/companies.json', data, (err) => {
            if (err) {
                throw err;
            }

            console.log('Data updated!')
        })
    })