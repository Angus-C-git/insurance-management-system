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

//login
function loginUser(){
    
    let email = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            //TODO show wrong password element
            document.getElementById('errorMessage').classList.remove('errorMessage');
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

//Staff Login => requires code also
function loginStaff() {
    let email = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let inviteCode = document.getElementById('authCode').value;

    let db = firebase.firestore();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            document.getElementById('errorMessage').classList.remove('errorMessage');
        } else {
            alert(errorMessage);
        } console.log(errorMessage);
    }).then(function () {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log("login was a success");
                console.log("ID => ", user.uid);
                let authRef = db.collection('staff').doc(user.uid);
                authRef.get().then(function (data) {
                    console.log(data.data());
                    if (data.data().authCode === inviteCode){
                        window.location.replace("manage.html");
                    } else {
                        console.log("auth code was wrong");
                        document.getElementById('errorMessage').classList.remove('errorMessage');
                    }
                })
            }
        });

    });


}
