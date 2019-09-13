


//login
function loginUser(){
    
    var email = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            //TODO
            alert('Wrong password.');
            return;
        } else {
            //TODO
            alert(errorMessage);
        } console.log(errorMessage);

    }).then(function () {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log("login was a success");
                window.location.replace("manage.html");
            }
        });

    });
}
