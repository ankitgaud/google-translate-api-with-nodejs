const app = require('express')();
const http = require('http').Server(app);
const chalk = require('chalk');

require('dotenv').config();

const port = process.env.PORT;
const google_api = require("./google_translate_demo");


app.get('/detectLanguage', async (req, res) => {
    try {
        let { text = 'english' } = req.query;
        let detectedLanguage = await google_api.detectLanguage(text);
        return res.send({
            message: "success",
            statusCode: "200",
            requestUrl: req.url,
            method: "GET",
            results: detectedLanguage
        })
    } catch (error) {
        throw error
    }
})

app.get('/translateText', async (req, res) => {
    try {
        let { targetlanguage = 'en', text = '' } = req.query;
        let translated_text = await google_api.translateText(text, targetlanguage);
        return res.send({
            message: "success",
            statusCode: "200",
            requestUrl: req.url,
            method: "GET",
            results: translated_text
        })
    } catch (error) {
        throw error
    }
})

http.listen(3000, function () {
    console.log(chalk.blue(`Server is listen on port : ${port}`));
});
