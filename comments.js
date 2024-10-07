// Create web server
// Create comments array
// Create route for /comments
// Create route for /comments/new
// Create route for /comments/:id
// Create route for /comments/:id/edit
// Create route for /comments/:id/delete

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var comments = [
    { title: 'Comment 1', body: 'This is the first comment' },
    { title: 'Comment 2', body: 'This is the second comment' },
    { title: 'Comment 3', body: 'This is the third comment' }
];

app.get('/comments', function(req, res) {
    res.render('comments/index.ejs', { comments: comments });
});

app.get('/comments/new', function(req, res) {
    res.render('comments/new.ejs');
});

app.post('/comments', function(req, res) {
    var title = req.body.title;
    var body = req.body.body;
    comments.push({ title: title, body: body });
    res.redirect('/comments');
});

app.get('/comments/:id', function(req, res) {
    res.render('comments/show.ejs', { comment: comments[req.params.id] });
});

app.get('/comments/:id/edit', function(req, res) {
    res.render('comments/edit.ejs', { comment: comments[req.params.id], id: req.params.id });
});

app.put('/comments/:id', function(req, res) {
    var title = req.body.title;
    var body = req.body.body;
    comments[req.params.id] = { title: title, body: body };
    res.redirect('/comments');
});

app.delete('/comments/:id', function(req, res) {
    comments.splice(req.params.id, 1);
    res.redirect('/comments');
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});