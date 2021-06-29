import firebase from 'firebase';
import 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""

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