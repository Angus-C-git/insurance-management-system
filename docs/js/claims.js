//TODO write methods to add form data to db
/*
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

 */

let db;


function writeClaim() {

    db = firebase.firestore();

    let type = "test"; //document.getElementById('type').value;
    let fullName = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let mailingAddress1 = document.getElementById('address1').value;
    let mailingAddress2 = document.getElementById('address2').value;
    let city = document.getElementById('city').value;
    let postCode = document.getElementById('postCode').value;
    let gender = document.getElementsByName('gender').value; //BROKEN
    //TODO
    let additionalInfo = document.getElementById('message').value;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            let userId = String(user.uid);

            let docRef = db.collection('users').doc(userId).collection('claims').doc();
            docRef.get().then(function(doc) {
                //console.log("Document data:", doc.data());

                docRef.set({
                    claim: {
                        type: type,
                        claimDate: firebase.firestore.FieldValue.serverTimestamp(),
                        fullName: fullName,
                        email: email,
                        mailingAddress1: mailingAddress1,
                        mailingAddress2: mailingAddress2,
                        city: city,
                        postCode: postCode,
                        gender: "M",
                        additionalInfo: additionalInfo
                    }
                });
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });


        }
    });

}