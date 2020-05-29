let express = require('express');
let path = require ('path')
let bodyParser = require ('body-parser');

let app = express();
let PORT = process.env.PORT|| 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

app.listen(PORT, function () {
    console.log("PORT", PORT);
});