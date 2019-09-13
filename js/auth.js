var firebaseConfig = {
    apiKey: "AIzaSyCVAWE9Z6gnOQX1M0aDiolKLWw3n8dsZOU",
    authDomain: "insurancesystem-6eddd.firebaseapp.com",
    databaseURL: "https://insurancesystem-6eddd.firebaseio.com",
    projectId: "insurancesystem-6eddd",
    storageBucket: "insurancesystem-6eddd.appspot.com",
    messagingSenderId: "628284186442",
    appId: "1:628284186442:web:cc9956825d72c13c"
};


function checkAuthState() {
    firebase.auth().onAuthStateChanged(function(user) {

        //If User is signed in display related tags
        if (user) {
            let uid = user.uid;
            console.log("Signed in", uid);
        } else {
            console.log("Signed Out");
            window.location.replace("index.html");
        }
    });
}

//Logout Function -> Ends user session on database end and then redirects to home page (hiding logged in links)
function Logout(){
    firebase.auth().signOut().then(function() {
        console.log("signed out");
        window.location.reload(); //REDIRECT HOME
    }).catch(function(error) {
        console.log(error);
    });
}