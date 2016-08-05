import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './models/user';
import Post from './models/Post';
import Comment from './models/comment';

mongoose.connect('mongodb://localhost:27017', (error) => {
    if (error) {
        console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
        throw error;
    }
});
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
console.log('Listening on port 3000...');


app.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});


/*  User apis
 ==============
*/
/*User Post*/
app.post('/user', function(req, res) {
    var user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        //dob: req.body.dob,
        username: req.body.username,
        password: req.body.password
    });
    user.save(function(err) {
        if (err)
            res.send(err)
        res.json([{
            message: 'User created!'
        }]);
    })
});


/*User Get All*/

app.get('/users', function(req, res) {
    User.find()
        .exec(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
});

/*User Get By Id*/
app.get('/user/:userId', function(req, res) {
    User
        .findOne({
            _id: req.params.userId
        })
        .exec(function(err, user) {
            if (err)
                res.send(err)
            res.json(user)
        })
});


/*User Put*/

app.put('/user/:userId', function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err)
            res.send(err)
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        //user.dob = req.body.dob;
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function(err) {
            if (err)
                res.send(err)
            res.json({
                message: 'User Updated!'
            });
        })
    })
});

/*User Delete*/

app.delete('/user/:userId', function(req, res) {
    User.remove({
        _id: req.params.userId
    }, function(err) {
        if (err)
            res.send(err)
        res.json({
            message: 'User Deleted'
        });
    })
});



/* Post apis
==============
*/

/*Post Post*/
app.post('/post', function(req, res) {
    var post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.authorId
    });
    post.save(function(err) {
        if (err)
            res.send(err)
        res.json([{
            message: 'Post created!'
        }]);
    })
});

/*Post Get All*/

app.get('/posts', function(req, res) {
    Post.find()
        .populate('author')
        .exec(function(err, posts) {
            if (err)
                res.send(err);
            res.json(posts);
        });
});

/*Post Get By Id*/

app.get('/post/:postId', function(req, res) {
    Post.findOne({
        _id: req.params.postId
    })
        .populate('author')
        .exec(function(err, post) {
            if (err)
                res.send(err)
            res.json(post)
        })
});

/*Post Put*/
app.put('/post/:postId', function(req, res) {
    Post.findById(req.params.postId, function(err, post) {
        if (err)
            res.send(err)
        post.title = req.body.title;
        post.content = req.body.content;
        post.author = req.body.authorId;

        post.save(function(err) {
            if (err)
                res.send(err)
            res.json({
                message: 'Post Updated!'
            });
        })
    })
});

/*Post Delete*/
app.delete('/post/:postId', function(req, res) {
    /*Comment.find().where({post: req.params.postId})
    .exec(function(err, comment) {
        if (err)
            res.send(err)

        comment.remove(function(err, comment) {
            if (err)
                res.send(err)
            Post.remove({
                _id: req.params.postId
            }, function(err) {
                if (err)
                    res.send(err)
                res.json({
                    message: 'Post Deleted'
                });
            })
        })
    })*/
});


/* Comment apis
==============
*/

/*Comment Post*/

app.post('/comment', function(req, res) {
    var comment = new Comment({
        content: req.body.content,
        author: req.body.authorId,
        post: req.body.postId
    });
    comment.save(function(err) {
        if (err)
            res.send(err)
        res.json([{
            message: 'Comment created!'
        }]);
    })
});


/*Comment Get All*/

app.get('/comments', function(req, res) {
    Comment.find()
        .populate(['author', 'post'])
        .exec(function(err, comment) {
            if (err)
                res.send(err);
            res.json(comment);
        });
});

/*Comment Get By Id*/
app.get('/comment/:commentId', function(req, res) {
    Comment.findOne({
        _id: req.params.commentId
    })
        .populate(['author', 'post'])
        .exec(function(err, comment) {
            if (err)
                res.send(err)
            res.json(comment)
        })
});

/*Comment Put*/
app.put('/comment/:commentId', function(req, res) {
    Comment.findById(req.params.commentId, function(err, comment) {
        if (err)
            res.send(err)
        comment.content = req.body.content;
        comment.author = req.body.authorId;
        comment.post = req.body.postId;

        comment.save(function(err) {
            if (err)
                res.send(err)
            res.json({
                message: 'Comment Updated!'
            });
        })
    })
});

/*Comment Delete*/
app.delete('/comment/:commentId', function(req, res) {
    Comment.remove({
        _id: req.params.commentId
    }, function(err) {
        if (err)
            res.send(err)
        res.json({
            message: 'Comment Deleted'
        });
    })
});









/*app.get('/post', function(req, res) {
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
});*/