import firebase from "firebase"
import "@firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyCUEkyAI1I*******************",
    authDomain: "contactapp***************.firebaseapp.com",
    databaseURL: "https://contactapp*************.firebaseio.com",
    projectId: "contactap***************",
    storageBucket: "contactapp**************.appspot.com",
    messagingSenderId: "30496****************",
    appId: "1:304969406432:web:35f1044a*******************",
    measurementId: "G-LDHYY*************"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
