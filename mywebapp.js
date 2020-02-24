const { KintoneRestAPIClient } = require("@kintone/rest-api-client");
const express = require('express');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
// Create express application
const ExpressApp = express();

// Page: (root)
// Action: display contents of /index.html
ExpressApp.get('/', function (req, res) {
    res.sendFile('/index.html', { root: __dirname });
});

// Page: (root)/kintoneresponse
// Action: Get records from Kintone database and display them
ExpressApp.post('/kintoneresponse', function (req, res) {

    const client = new KintoneRestAPIClient({
        baseUrl: 'https://apartments.kintone.com',
        auth: { apiToken: 'JCXQSLlNpb6nPxAmYkNqDiC5WguupUEL3mQxOy1O' }

    });

    const params = {
        app: 1,
        fields: ['aname', 'address', 'rent', 'bedrooms', 'bathrooms', 'utilities',
        'unit', 'laundry', 'kitchen', 'tech', 'recreation',
        'location', 'safety', 'pets', 'pet', 'comments'],
    }

    client.record
        .getRecords(params)
        .then(resp => {
            console.dir(resp.records, { depth: null });
            var word = "";
            for (var i = 0; i<resp.records.length; i++){
            	word += '<div>Apartment Name: ' + resp.records[i].aname.value + '</div>' +
                    '<div>Address: ' + resp.records[i].address.value + '</div>' +
                    '<div>Rent: ' + resp.records[i].rent.value + '</div>' +
                    '<div>Bedroom(s): ' + resp.records[i].bedrooms.value + '</div>' +
                    '<div>Bathroom(s): ' + resp.records[i].bathrooms.value + '</div>' +
                    '<div>Utilites: ' + resp.records[i].utilities.value + '</div>' +
                    '<div>Unit Amenities: ' + resp.records[i].unit.value + '</div>' +
                    '<div>Laundry Amenities: ' + resp.records[i].laundry.value + '</div>' +
                    '<div>Kitchen Amenities: ' + resp.records[i].kitchen.value + '</div>' +
                    '<div>Tech Amenities: ' + resp.records[i].tech.value + '</div>' +
                    '<div>Recreation: ' + resp.records[i].recreation.value + '</div>' +
                    '<div>Location: ' + resp.records[i].location.value + '</div>' +
                    '<div>Safety: ' + resp.records[i].safety.value + '</div>' +
                    '<div>Pets: ' + resp.records[i].pets.value + '</div>' +
                    '<div>Pet Amenities: ' + resp.records[i].pet.value + '</div>' +
                    '<div>Additional Comments: ' + resp.records[i].comments.value + '</div></br>'
            }
            res.send(word);
            //res.json(resp.records)
        })
        .catch(err => {
            console.log(err);
        });

});

ExpressApp.use(bodyParser.urlencoded({extended: true}));


ExpressApp.post('/kintoneadd', function (req, res) {

    const client = new KintoneRestAPIClient({
        baseUrl: 'https://apartments.kintone.com',
        auth: { apiToken: 'JCXQSLlNpb6nPxAmYkNqDiC5WguupUEL3mQxOy1O' }

    });


    const params = {
    'app': 1,
    'record':
    {
        'aname': {
            'value': req.body.aname
        },
        'address': {
            'value': req.body.address
        },
        'rent': {
            'value': req.body.rent
            //'value': "a"
        },
        'bedrooms': {
            'value': req.body.bedrooms
            //'value': "a"
        },
        'bathrooms': {
            'value': req.body.bathrooms
            //'value': "a"
        },
        'unit': {
            'value': req.body.unit
        },
        'laundry': {
            'value': req.body.laundry
        },
        'kitchen': {
            'value': req.body.kitchen
        },
        'tech': {
            'value': req.body.tech
        },
        'recreation': {
            'value': req.body.recreation
        },
        'location': {
            'value': req.body.location
        },
        'safety': {
            'value': req.body.safety
        },
        'pets': {
            'value': req.body.pets
        },
        'pet': {
            'value': req.body.pet
        },
        'comments': {
            'value': req.body.comments
        }
    }
	};

    client.record
    .addRecord(params)
    .then(resp => {
        console.dir(resp, { depth: null });
    })
    .catch(err => {
        console.log(err);
    });

});



ExpressApp.listen(PORT, () => console.log(`Listening on ${PORT}`));


