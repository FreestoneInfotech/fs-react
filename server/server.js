import express from 'express';
const app = express();
import bodyParser  from 'body-parser';
import mongoose from 'mongoose';
import Bear from './models/Bear';
import Post from './models/Post';

mongoose.connect('mongodb://localhost:27017', (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
console.log('Listening on port 3000...');


app.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.get('/post', function(req, res) {
    Post.find()
    .populate('_bearId')
    .exec(function(err, bears) {
        if(err)
            res.send(err);
        res.json(bears);
    });
});

app.post('/post', function(req, res) {
    var post = new Post({name: req.body.name});
    post.save(function(err) {
        if(err)
            res.send(err)
        res.json([{message: 'Post created!'}]);
    })
});
app.get('/post/:post_id', function(req, res) {
    Post
    .findOne({_id: req.params.post_id})
    .populate('_bearId', 'bears')
    .exec(function(err, post) {
        if(err)
            res.send(err)
        res.json(post)
    })
});
app.put('/post/:post_id', function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if(err)
            res.send(err)
        post.name = req.body.name;

        post.save(function(err) {
            if(err)
                res.send(err)
            res.json({message: 'Post Updated!'});
        })
    })
});
app.delete('/post/:post_id', function(req, res) {
    Post.remove({
        _id: req.params.post_id
    }, function(err) {
        if(err)
            res.send(err)
        res.json({message: 'Successfully deleted'});
    })
});




app.get('/bears', function(req, res) {
    Bear
    .find()
    .populate('_postId')
    .exec(function(err, bears) {
        if(err)
            res.send(err);
        res.json(bears);
    });
});
app.post('/bears', function(req, res) {
    var bear = new Bear({name: req.body.name, _postId: req.body.postId});
    bear.save(function(err) {
        if(err)
            res.send(err)
        res.json([{message: 'Bear created!'}]);
    })
});
app.get('/bears/:bear_id', function(req, res) {
    Bear
    .findOne({_id: req.params.bear_id})
    .populate('_postId')
    .exec(function(err, bear) {
        if(err)
            res.send(err)
        res.json(bear)
    })
});
app.put('/bears/:bear_id', function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
        if(err)
            res.send(err)
        bear.name = req.body.name;

        bear.save(function(err) {
            if(err)
                res.send(err)
            res.json({message: 'Bear Updated!'});
        })
    })
});
app.delete('/bears/:bear_id', function(req, res) {
    Bear.remove({
        _id: req.params.bear_id
    }, function(err) {
        if(err)
            res.send(err)
        res.json({message: 'Successfully deleted'});
    })
});