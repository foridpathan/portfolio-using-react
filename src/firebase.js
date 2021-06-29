import firebase from 'firebase';
import 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDZlP5hwJHxYuGSDqi96-ZhEMuI5gF-I7g",
    authDomain: "forid-pathan.firebaseapp.com",
    databaseURL: "https://forid-pathan-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "forid-pathan",
    storageBucket: "forid-pathan.appspot.com",
    messagingSenderId: "102876429307",
    appId: "1:102876429307:web:a720407e15396f989ee95e",
    measurementId: "G-HYBW0RDGPL"

};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseProfile = firebaseDB.ref('profile/prinserted');
const firebaseUserRole = firebaseDB.ref('user_roles');
const firebaseEducation = firebaseDB.ref('education');
const firebaseTraining = firebaseDB.ref('training');
const firebaseExperience = firebaseDB.ref('experience');
const firebaseSkills = firebaseDB.ref('skills');
const firebaseServices = firebaseDB.ref('services');
const firebaseFacts = firebaseDB.ref('facts');
const firebaseTestimonials = firebaseDB.ref('testimonials');
const firebasePortfolios = firebaseDB.ref('portfolios');

export {
    firebase,
    firebaseDB,
    firebaseProfile,
    firebaseUserRole,
    firebaseEducation,
    firebaseTraining,
    firebaseExperience,
    firebaseSkills,
    firebaseServices,
    firebaseFacts,
    firebaseTestimonials,
    firebasePortfolios
}