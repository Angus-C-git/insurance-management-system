//Signup


const firebaseConfig = {
    apiKey: "AIzaSyCVAWE9Z6gnOQX1M0aDiolKLWw3n8dsZOU",
    authDomain: "insurancesystem-6eddd.firebaseapp.com",
    databaseURL: "https://insurancesystem-6eddd.firebaseio.com",
    projectId: "insurancesystem-6eddd",
    storageBucket: "insurancesystem-6eddd.appspot.com",
    messagingSenderId: "628284186442",
    appId: "1:628284186442:web:baedef4f4f5ebe53192bb3"
};

firebase.initializeApp(firebaseConfig);

let db;


function signUp() {
    db = firebase.firestore();
    logout();
    //Logout Function -> Ends user session if new user is being created from a logged in acc
    function logout(){
        firebase.auth().signOut().then(function() {
            console.log("signed out");
            //window.location.reload(); //REDIRECT HOME
        }).catch(function(error) {
            console.log(error);
        });
    }

    let email = document.getElementById('email').value;
    let password = document.getElementById('password2').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

        let errorCode = error.code;
        let errorMessage = error.message;

        //TODO: Perform password validation etc
    }).then(function () {
        loginNewSignUp(email, password);
    });
}

function loginNewSignUp(email, password) {

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
            return;
        } else {
            alert(errorMessage);
        } console.log(errorMessage);
    }).then(function () {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                sendEmailVerification();
                // User is signed in.
                let userId = String(user.uid);
                let email = String(user.email);

                let docRef = db.collection('users').doc(userId);
                docRef.set({email: email});
                console.log("New usr created...");
                console.log("login was a success");

            }
        });

    });

}

function sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
        window.location.replace("manage.html"); //TODO work out where to locate this redirect
    });
    // [END sendemailverification]
}