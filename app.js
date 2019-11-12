const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');

const app = express();
app.set('view engine', 'pug');
app.set('views', 'views');

const shopRouter = require('./routes/shop');
const adminData = require('./routes/admin');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/admin', adminData.routes);
app.use(shopRouter);


app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
})

app.listen(3000); 