// Initialize packages
var express  = require('express'),
    app      = express(),
    parser   = require('body-parser'),
    mongoose = require('mongoose');
    override = require('method-override');

// APP config
mongoose.connect('mongodb://localhost/restful_blog_app', { useMongoClient: true });
app.set('view engine', 'ejs');
app.use(express.static('public')); // For custom style sheet that will be used later
app.use(parser.urlencoded({extended: true}));
app.use(override('_method'));

// create Blog schema and model for database
var Blog = mongoose.model('Blog', {
    // Each blog post will have these elements
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

// ROUTES

// Root redirects to index
app.get('/', function(req, res) {
    res.redirect('/blogs');
});

// INDEX route
app.get('/blogs', function(req, res) {
    Blog.find(function(err, blogs) {
        if (err) {
            return console.log(err);
        }
        res.render('index', {blogs: blogs})
    });
});

// NEW route
app.get('/blogs/new', function(req, res) {
    res.render('new');
});

// CREATE route 
app.post('/blogs', function(req, res) {
    Blog.create(req.body.blog, function(err, blog) {
        // If error, return to new blog form
        if (err) {
            res.render('new');
        } else {
            res.redirect('/blogs');
        }
    });
});

// SHOW route
app.get('/blogs/:id', function(req, res) {
    // Access id using req.params
    Blog.findById(req.params.id, function(err, blog) {
        // If error, return user to blogs page
        // Otherwise render show page for given id
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: blog});
        }
    });
});

// EDIT route
app.get('/blogs/:id/edit', function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog: blog});
        }
    });
});

// UPDATE route
app.put('/blogs/:id', function(req, res) {
    var id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body.blog, function(err, blog) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + id);
        }
    });
});

app.delete('/blogs/:id', function(req, res) {
    // destroy blog post
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs');
        }
    });
});


app.listen(3000, function(req, res) {
    console.log('Blog App initialized...');
})