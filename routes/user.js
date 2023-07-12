const express = require('express');
const User = require('../models/User'); //import user model
const firebase = require('../firebase'); //import firebase config file

//initiaalize firestore database
const firestore = firebase.firestore();

const router = express.Router();

//create a new user with set();
router.post('/', async (req, res) => {
    try {
        const savedUser = await firestore.collection("users").doc().set(req.body);
        res.status(200).json({
            message: "User created query successful",
            data: savedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "User create server error",
            error: error
        });
    }
});

//get single user with get();
router.get('/:id', async (req, res) => {
    try {
        const singleUser = await firestore.collection("users").doc(req.params.id).get();
        const user = singleUser.data();
        res.status(200).json({
            message: "Get single user query successfull",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Get single user server error",
            error: error
        });
    }
});

//get all users with get();
router.get('/', async (req, res) => {

    const users = [];

    try {

        const userDocuments = await firestore.collection("users").get();

        userDocuments.forEach( (doc) => {
            const user = new User(
                doc.data().firstName,
                doc.data().lastName,
                doc.data().age,
                doc.data().mobile
            );
            users.push(user);
        });

        res.status(200).json({
            message: "Get all users query successffuly",
            data: users
        });        

    } catch (error) {
        res.status(500).json({
            message: "Get all users server error",
            error: error
        });
    }
});

//update user with set();
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await firestore.collection("users").doc(req.params.id).update(req.body);
        res.status(200).json({
            message: "User update query successfull",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Update user server error",
            error: error
        });
    }
});

//delete user with delete();
router.delete('/:id', async (req, res) => {
    try {
        await firestore.collection("users").doc(req.params.id).delete();
        res.status(200).json({
            message: "Delete user query succesfull",
        });
    } catch (error) {
        res.status(500).json({
            message: "Delete user server error",
            error: error
        });
    }
});

module.exports = router;