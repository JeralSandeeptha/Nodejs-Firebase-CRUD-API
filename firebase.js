//In here we should configure firebase server side SDK configuration

//dont use firebase. it it used to client side.
// const firebase = require('firebase');
const admin = require('firebase-admin');

//for that we need firebase server side SDK key
//to get this key --> project settings --> service accounts --> generate key
const serviceAccount = require("./nodejs-firestore-9815a-firebase-adminsdk-5r0sw-0c7d806466.json");

//configure firebase server side SDK
const db = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = db;