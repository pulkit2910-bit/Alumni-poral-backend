const router = require('express').Router();

// middlewares
const { createPost, updatePost, deletePost, likePost, getPost, commentPost, userFeed, getAllUserPosts } = require('../controller/postController');
const { verifyUser } = require("../middlewares/authMiddleware");
const { postUpload } = require("../middlewares/multer");

// create a post
router.post('/', verifyUser, postUpload, createPost);
// router.post('/', verifyUser, createPost);

// update a post
router.put('/:postID', verifyUser, updatePost);

// delete a post
router.delete('/:postID', verifyUser, deletePost);

// get a post
router.get('/post', getPost);

// like / dislike a post
router.put('/like/:postID', verifyUser, likePost);

// get all posts of all users who are followed by current user
router.get('/feed/:userID', verifyUser, userFeed);  

// get all the posts of the user
router.get("/", verifyUser, getAllUserPosts);

module.exports = router;