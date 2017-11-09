// Initialize things we need
var express  = require('express'),
    app      = express(),
    parser   = require('body-parser'),
    mongoose = require('mongoose');

// APP config
mongoose.connect('mongodb://localhost/restful_blog_app', { useMongoClient: true });
app.set('view engine', 'ejs');
app.use(express.static('public')); // For custom style sheet that will be used later
app.use(parser.urlencoded({extended: true}));

// create Blog schema and model for database
var Blog = mongoose.model('Blog', {
    // Each blog post will have these elements
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

// ROUTES
app.get('/', function(req, res) {
    res.redirect('/blogs');
})

app.get('/blogs', function(req, res) {
    Blog.find(function(err, blogs) {
        if (err) {
            return console.log(err);
        }
        res.render('index', {blogs: blogs})
    });
})

app.listen(3000, function(req, res) {
    console.log('Blog App initialized...');
})