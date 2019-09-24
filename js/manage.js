
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
                        document.getElementById('claimsInjectPoint').innerHTML += "<div class='tm-col tm-col-span'>" +
                            "<div class='bg-white tm-block h-100 reduceSize'>" +
                            "<table class='manageBox'>" +
                            "<tr>" +
                            "<td class='id'>" + claimData.id + "</td>" +
                            "<td class='centerRow'>" + claimObj.type + "</td>" +
                            "<td class='ra id'>" + claimObj.claimDate.toDate() + "</td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td colspan='3' rowspan='2' class='centerRow name'>" + claimObj.fullName + "</td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td colspan='3'></td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td><button class='manageButton' onclick='inspect()'>Inspect</button></td>" +
                            "<td colspan='1' class='centerRow'>" + claimObj.email + "</td>" +
                            "<td class='ra'><button class='manageButton' onclick='resolve()'>Resolve</button></td>" +
                            "</tr>" +
                            "</table>" +
                            "</div>" +
                            "</div>";

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