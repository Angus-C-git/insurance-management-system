
const db = firebase.firestore();
let uid;

function fetchClaimsStaff() {
    //TODO staff validation

    //Convert search button pointer
    document.getElementById('searchButton').onclick = fetchClaimsStaff;

    document.getElementById('claimsInjectPoint').innerHTML = "";

    let searchRoot = db.collection('users');

    console.log("attempting fetch staff...");
    searchRoot.get().then(function (querySnapshot) {
        console.log("query fired..");
        // FOR LOOP #1
        querySnapshot.forEach(function (doc) {
            searchRoot.doc(doc.id).collection('claims').get().then(function (data) {
                // FOR LOOP #2
                data.forEach(function (claim) {
                    //console.log(claim.id);
                    searchRoot.doc(doc.id).collection('claims').doc(claim.id).get().then(function (claimData) {
                        let claimObjPre = claimData.data();
                        let claimObj = claimObjPre.claim;
                        let claimDate = claimObj.claimDate.toDate();
                        //console.log(claimObj.additionalInfo);
                        document.getElementById('claimsInjectPoint').innerHTML +=
                            "<div class='tm-col tm-col-span'>" +
                                "<div class='bg-white tm-block h-100 reduceSize'>" +
                                    "<table class='manageBox'>" +
                                        "<tr>" +
                                            "<td class='std id'>#" + claimData.id + "</td>" +
                                            "<td class='centerRow'>" + claimObj.type + "</td>" +
                                            "<td class='std ra id'>" + claimDate.getDate() + "/" + claimDate.getMonth() + "/" + claimDate.getFullYear() + "   " + claimDate.getHours() + ":" + claimDate.getMinutes() + " </td>" +//TODO
                                        "</tr><tr>" +
                                            "<td colspan='3' rowspan='2' class='centerRow name'>" + claimObj.fullName + "</td>" +
                                        "</tr><tr>" +
                                            "<td colspan='3'></td>" +
                                        "</tr><tr>" +
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
            //console.log(doc.id);
        });
    })
        .catch(function (error) {
            console.log("Fetch failed :(, => ", error);
        });
}


function fetchClaimsUser() {
    document.getElementById('claimsInjectPoint').innerHTML = "";

    firebase.auth().onAuthStateChanged(function(user) {
        console.log("User UID: ", user.uid);
        let searchRoot = db.collection('users').doc(user.uid);

        console.log("query fired usr..");
        searchRoot.collection('claims').get().then(function (data) {
            data.forEach(function (claim) {
                //console.log(claim.data());
                let claimObj = claim.data().claim;
                let claimDate = claimObj.claimDate.toDate();
                document.getElementById('claimsInjectPoint').innerHTML +=
                    "<div class='tm-col tm-col-span'>" +
                        "<div class='bg-white tm-block h-100 reduceSize'>" +
                            "<table class='manageBox'>" +
                                "<tr>" +
                                    "<td class='std id'>#" + claim.id + "</td>" +
                                    "<td class='centerRow'>" + claimObj.type + "</td>" +
                                    "<td class='std ra id'>" + claimDate.getDate() + "/" + claimDate.getMonth() + "/" + claimDate.getFullYear() + "   " + claimDate.getHours() + ":" + claimDate.getMinutes() + " </td>" +//TODO
                                "</tr><tr>" +
                                    "<td colspan='3' rowspan='2' class='centerRow name'>" + claimObj.fullName + "</td>" +
                                "</tr><tr>" +
                                    "<td colspan='3'></td>" +
                                "</tr><tr>" +
                                    "<td><button class='manageButton' onclick='inspect()'>Inspect</button></td>" +
                                    "<td colspan='1' class='centerRow'>" + claimObj.email + "</td>" +
                                    "<td class='ra'><button class='manageButton' onclick='resolve()'>Resolve</button></td>" +
                                "</tr>" +
                                "</table>" +
                        "</div>" +
                    "</div>";
            });
        }).catch(function (error) {
            console.log("Fetch failed :(, => ", error);
        });
    });
}

function filterClaimsID() {
    
}

function filterClaimsEmail() {
    
}

function filterClaimsType() {

}

function filterClaimsName() {

}

function filterClaimsDate() {

}

function resolve() {

}

function inspect() {
    let modal = document.getElementById("inspectModal");
    let span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    //MODAL ELEMENTS


    //CLOSE MODAL =>
    span.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}