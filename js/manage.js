
let db;

function fetchClaimsStaff() {
    //TODO staff validation
    db = firebase.firestore();

    let searchRoot = db.collection('users');
    console.log("attempting fetch...");
    searchRoot.get().then(function (querySnapshot) {
        console.log("query fired..");
        querySnapshot.forEach(function (doc) {
            searchRoot.doc(doc.id).collection('claims').get().then(function (data) {
                data.forEach(function (claim) {
                    console.log(claim.id);
                    searchRoot.doc(doc.id).collection('claims').doc(claim.id).get().then(function (claimData) {
                        let claimObjPre = claimData.data();
                        let claimObj = claimObjPre.claim;
                        console.log(claimObj.additionalInfo);
                        //console.log({claim : claim});
                    })
                })
            });
            console.log(doc.id);
        });
    })
        .catch(function (error) {
            console.log("Fetch failed :(, => ", error);
        });

    //for (){} //TODO iterate through retrieved query
}


function fetchClaimsUser() {

}