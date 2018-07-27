const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

/* For Facebook Validation */
function verification(req, res) {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'Wh1t3l4b3l') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
};

app.get('/page', verification);
app.get('/groups', verification);
app.get('/user', verification);
app.get('/security', verification);
app.get('/link', verification);

/* Handling all messenges */
function handlePost(req, res) {
  console.log(req.body);
  if (req.body.object === 'page') {
    //req.body.entry.forEach((entry) => {
    //  entry.messaging.forEach((event) => {
    //    if (event.message && event.message.text) {
    //      sendMessage(event);
    //    }
    //  });
    //});
    res.status(200).end();
  }
};

app.post('/page', handlePost);
app.post('/groups', handlePost);
app.post('/user', handlePost);
app.post('/security', handlePost);
app.post('/link', handlePost);

