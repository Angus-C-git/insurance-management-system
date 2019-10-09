
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


function checkAuthState(nonAccessPage) {
    firebase.auth().onAuthStateChanged(function(user) {
        let db = firebase.firestore();

        //If User is signed in display related tags
        if (user) {
            //SHOW NAV ELEMENTS
            document.getElementById('lodgeNavElement').id = "";
            document.getElementById('manageNavElement').id = "";
            document.getElementById('logButton').innerHTML = "Logout";
            document.getElementById('logButton').onclick = logout;

            let uid = user.uid;
            console.log("Signed in", uid);
            //If user is staff member fire full lookup query

           db.collection('staff').doc(user.uid).get().then(function (data) {
               console.log(data.data());
                if (data.data() !== undefined){
                    console.log("IS STAFF => ", user.uid);
                    fetchClaimsStaff();
                } else {fetchClaimsUser()}
            });
        } else {
            console.log("Signed Out");
            if (nonAccessPage === "yes"){
                window.location.replace("/insurance-managment-sytem/");
            }
        }
    });
}

//Logout Function -> Ends user session
function logout(){
    firebase.auth().signOut().then(function() {
        console.log("signed out");
        window.location.reload(); //REDIRECT HOME
    }).catch(function(error) {
        console.log(error);
    });
}