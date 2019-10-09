
let db;

function writeClaim() {

    db = firebase.firestore();

    let type = document.getElementById('insuranceType').value;
    let fullName = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let mailingAddress1 = document.getElementById('address1').value;
    let mailingAddress2 = document.getElementById('address2').value;
    let city = document.getElementById('city').value;
    let postCode = document.getElementById('postCode').value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let occurrenceDate = document.getElementById('occurrenceDate').value;

    //TODO
    let additionalInfo = document.getElementById('incidentNotes').value;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            let userId = String(user.uid);

            let docRef = db.collection('users').doc(userId).collection('claims').doc();
            docRef.get().then(function(doc) {
                //console.log("Document data:", doc.data());
                switch (type) {
                    case "car":
                        let registrationNumber = document.getElementById('registrationNumber').value;
                        let registrationExpiry = document.getElementById('registrationExpiry').value;
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
                                gender: gender,
                                occurrenceDate: occurrenceDate,
                                registrationNumber: registrationNumber,
                                registrationExpiry: registrationExpiry,
                                additionalInfo: additionalInfo
                            }
                        });
                        break;
                    case "home":
                        //TODO work out how to do file stuff

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
                                gender: gender,
                                occurrenceDate: occurrenceDate,
                                additionalInfo: additionalInfo
                            }
                        });
                        break;
                    case "personal":
                        //TODO add file stuff
                        let lostItems = document.getElementById('lostItems').value;
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
                                gender: gender,
                                occurrenceDate: occurrenceDate,
                                lostItems: lostItems,
                                additionalInfo: additionalInfo
                            }
                        });
                        break;
                    default:
                        console.log("null");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
    });
}

function showRespectiveElements() {
    let type = document.getElementById('insuranceType').value;
    let carToggle = document.getElementById('carHider');
    let homeToggle = document.getElementById('homeHider');
    let personalToggle = document.getElementById('personalHider');

    console.log("aye", type);
    switch (type) {
        case "car":
            homeToggle.classList.add('hider');
            personalToggle.classList.add('hider');

            carToggle.classList.remove('hider');
            break;
        case "home":
             carToggle.classList.add('hider');
             personalToggle.classList.add('hider');

            homeToggle.classList.remove('hider');
            break;
        case "personal":
            carToggle.classList.add('hider');
            homeToggle.classList.add('hider');

            personalToggle.classList.remove('hider');
            break;
        default:
            console.log("null");
            break;
    }

}