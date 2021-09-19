require('./db/mongoose');
const express = require('express');
const Blog = require('./models/blog');
// const multer = require('multer');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');


const app = express();
app.use(express.json());
app.use(cors())

app.use(express.urlencoded());


app.use("/", function(req,res, next){
console.log(req.url);
next();
})


const testFolder = './public/';
const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
});


// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// app.use(methodOverride('_method'))

// ==========================
app.use('*/image',express.static('public/image'));

app.use(express.static('public'));
app.use(express.static('views'));
app.use('*/articles',express.static('views/blogHtml/articles'));
app.use('*/css',express.static('public/css'));

app.get('/', async (req, res) => {
     // const article = await Article.find().sort({ createdAt: 'desc' })
    res.render('index.html');
})

app.get('/about.html', function(req, res) {
    res.render('views/about.html');
});


// ==========blog app===============

app.get('/blog.html', function(req, res) {
    res.render('views/blogHtml/articles/blog-index.html');
});

// new article
app.get('/blogs', async (req, res) => {
    res.render('views/blogHtml/articles/blog-new.html')
})


// show one article
app.get('/show', async (req, res) => {
    res.render('views/blogHtml/articles/blog-show.html')
})


// edit selected article
app.get('/edit', async (req, res) => {
    res.render('views/blogHtml/articles/blog-edit.html')
})


// get all article
app.get('/allblogs', async (req, res) => {
    // res.render('articles/new.html')
    try {
        const blogs = await Blog.find({});
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }
})


//   add new article 
app.post('/blogs',async (req, res) => {
 
    // res.render('articles/new.html')
    const blog = new Blog(req.body);
    console.log(req.body);

    try {
        await blog.save();
        res.status(201).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})


// get one article
app.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404);
        }
        res.status(200).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})


//  edit
app.patch('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) {
            return res.status(404).send();
        }
        res.status(200).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})


// delete 1 article
app.delete('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})


app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);
app.listen(3000, (req, res) => {
    console.log('app is running in port 3000!');
})