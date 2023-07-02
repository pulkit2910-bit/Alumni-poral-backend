const Post = require('../models/Post');
const User = require('../models/User');
const { getDataUri } = require('../utils/dataUri');
const cloudinary = require('cloudinary');

const createPost = async (req, res) => {
    const userID = req.data.userID;
    const file = req.file;  
    const fileUri = getDataUri(file);
    
    try {
        const cloud = await cloudinary.v2.uploader.upload(fileUri.content);
        const newPost = await new Post({
            userID : userID,
            img: {
                public_id : cloud.public_id,
                url : cloud.secure_url
            },
            ...req.body
        });
        const post = await newPost.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}

const updatePost = async (req, res) => {
    const userID = req.data.userID;
    
    try {
        const post = await Post.findById(req.params.postID);
        !post && res.status(404).json('Post not found !');
        
        if (post.userID === userID) {
            const updatedPost = await post.updateOne( { $set : req.body } );
            res.status(200).json(updatedPost);
        } else {
            res.status(403).json("You cannot update other user's post !");
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

const deletePost = async (req, res) => {
    const userID = req.data.userID;
    
    try {
        const post = await Post.findById(req.params.postID);
        !post && res.status(404).json('Post not found !');
        
        if (post.userID === userID) {
            await Post.findByIdAndDelete(req.params.postID);
            res.status(200).json('Post deleted !!');
        } else {
            res.status(403).json("You cannot delete other user's post !");
        }

    } catch (err) {
        res.status(500).json(err);
    }
}



const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.query.postID);
        !post && res.status(404).json('Post not found !!');

        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
}



const userFeed = async (req, res) => {
    
    if (req.data.userID === req.params.userID) {

        try {
            const user = await User.findById(req.data.userID);

            var userPosts = await Post.find({ userID : req.params.userID });

            const friendPosts = await Promise.all(
                user.following.map((friendID) => {
                    return Post.find({ userID : friendID });
                })
            );

            // console.log(friendPosts);
            
            const data = [];
            userPosts.map((post) => { data.push(post); });
            friendPosts.map((friends) => {
                friends.map((p) => data.push(p));
            })
            // console.log(data);
            res.status(200).json(data);
    
        } catch (err) {
            res.status(500).json(err);
        }

    } else {
        res.status(403).json("You cannot access other's feed !!");
    }

}

const getAllUserPosts = async (req, res) => {
    try {
        const user = await User.findById(req.query.userID);
        !user && res.status(404).json('User not found !');

        var userPosts = await Post.find({ userID : req.query.userID });
        !userPosts && res.status(404).json('No posts found !!');
        
        // console.log(userPosts);
        res.status(200).json(userPosts);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}


module.exports = { createPost, updatePost, deletePost, getPost, userFeed, getAllUserPosts };