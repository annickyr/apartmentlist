const { KintoneRestAPIClient} = require("@kintone/rest-api-client");
const express = require('express');
const PORT = process.env.PORT || 3000;

const ExpressApp = express();

ExpressApp.get('/', function (req, res) {
	res.sendFile('../index.html', {root: __dirname});

});

const client = new KintoneRestAPIClient({
	baseUrl: "https://apartments.kintone.com",
	auth: { apiToken: "JCXQSLlNpb6nPxAmYkNqDiC5WguupUEL3mQxOy1O"}
});

ExpressApp.listen(PORT, {} => console.log('Listening on ${Port}'));