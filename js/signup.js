//Signup

function signUp() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password2').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.message;

        //TODO: Perform password validation etc
    }).then(function () {
        loginNewSignUp(email, password);
    });
}

function loginNewSignUp(email, password) {

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
            return;
        } else {
            alert(errorMessage);
        } console.log(errorMessage);
        return;

    }).then(function () {
        sendEmailVerification();
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log("login was a success");
                window.location.replace("manage.html");
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
    });
    // [END sendemailverification]
}