
const db = firebase.firestore();
let uid;

//Holds all claims keyed by claimID as fetched from the db
let claimRecords = {};

let claimStatus = {};

function fetchClaimsStaff() {
    //TODO staff validation

    //Convert search button pointer
    //document.getElementById('searchButton').onclick = fetchClaimsStaff;

    document.getElementById('claimsInjectPoint').innerHTML = "";

    let searchRoot = db.collection('users');

    console.log("attempting fetch staff...");
    searchRoot.get().then(function (querySnapshot) {
        console.log("query fired..");        // FOR LOOP #1
        querySnapshot.forEach(function (doc) {
            searchRoot.doc(doc.id).collection('claims').get().then(function (data) {
                // FOR LOOP #2
                data.forEach(function (claim) {
                    //console.log(claim.id);
                    searchRoot.doc(doc.id).collection('claims').doc(claim.id).get().then(function (claimData) {
                        let claimObjPre = claimData.data();
                        console.log(claimObjPre);
                        let claimObj = claimObjPre.claim;
                        let claimDate = claimObj.claimDate.toDate();

                        let claimId = claim.id;

                        let currentProgress = 25;
                        //console.log(claimObj.additionalInfo);
                        document.getElementById('claimsInjectPoint').innerHTML +=
                            "<div class='tm-col tm-col-span'>" +
                                "<div class='bg-white tm-block h-100 reduceSize'>" +
                                    "<table class='manageBox'>" +
                                        "<tr>" +
                                            "<td class='std id'>#" + claim.id + "</td>" +
                                            "<td class='centerRow' rowspan='2'>" + claimObj.type[0].toUpperCase() + claimObj.type.slice(1, ) + ' Insurance Claim' + "<br/>" +
                            "<div class='loadingBar'>" +
                    "<div class='contLoadingBar'>" +
                    "<div class='checkpoint'></div>" +
                    "<div class='checkpoint'></div>" +
                    "<div class='checkpoint'></div>" +
                    "</div>" +
                    "<div class='progressBar' style='margin-top: 8px; width:" + currentProgress + "%'>" +
                    "<div class='contLoadingBar'>" +
                    "<div class='checkpoint'></div>" +
                    "<div class='checkpoint'></div>" +
                    "<div class='checkpoint'></div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                                            "</td>" +
                                            "<td class='std ra id'>" + /*claimDate.getDate() + "/" + claimDate.getMonth() + "/" + claimDate.getFullYear() + "   " + claimDate.getHours() + ":" + claimDate.getMinutes()*/ moment(claimDate).format('DD/MM/YYYY h:mm a')+ " </td>" +//TODO
                                        "</tr><tr></tr><tr>" +
                                            "<td colspan='3' rowspan='2' class='centerRow name'>" + claimObj.fullName + "</td>" +
                                        "</tr><tr>" +
                                            "<td colspan='3'></td>" +
                                        "</tr><tr>" +
                                            "<td><button class='manageButton' onclick='inspect(this)'>Inspect<span class='hider'>"+ claimId+ "</span></button></td>" +
                                            "<td colspan='1' class='centerRow'>" + claimObj.email + "</td>" +
                                            "<td class='ra'><button class='manageButton' onclick='reject(this)'>Reject<span class='hider btn-large btn-large-white px-4 black-text rounded-0'>"+ claimId+ "</span></button><button class='manageLeft manageButton btn-large btn-large-white px-4 black-text rounded-0' onclick='resolve(this)'>Resolve<span class='hider'>"+ claimId + "</span></button></td>" +
                                        "</tr>" +
                                    "</table>" +
                                "</div>" +
                            "</div>";

                        claimRecords[claimId] = claimObj;

                        if (claimObjPre.outcome !== undefined){
                            claimStatus[claimId] = claimObjPre.outcome;
                        }

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

                let claimId = claim.id;

                let currentProgress = 110;
                //onload="this.width=screenWidth;"
                document.getElementById('claimsInjectPoint').innerHTML +=
                    "<div class='tm-col tm-col-span'>" +
                        "<div class='bg-white tm-block h-100 reduceSize'>" +
                            "<table class='manageBox'>" +
                                "<tr>" +
                                    "<td class='std id'>#" + claim.id + "</td>" +
                                    "<td class='centerRow' rowspan='2'>" + claimObj.type[0].toUpperCase() + claimObj.type.slice(1, ) + ' Insurance Claim' + "<br/>" +
                    "<div class='loadingBar'>" +
                    "<div class='contLoadingBar'>" +
                    "<div class='checkpoint'></div>" +
                    "<div class='checkpoint'></div>" +
                    "<div class='checkpoint'></div>" +
                    "</div>" +
                    "<div class='progressBar' style='width:" + currentProgress + "%'>" +
                    "<div class='contLoadingBar'>" +
                    "<div class='checkpoint'></div>" +
                    "<div class='checkpoint'></div>" +
                    "<div class='checkpoint'></div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                                    "<td class='std ra id'>" + /*claimDate.getDate() + "/" + claimDate.getMonth() + "/" + claimDate.getFullYear() + "   " + claimDate.getHours() + ":" + claimDate.getMinutes()*/ moment(claimDate).format('DD/MM/YYYY h:mm a') + " </td>" +//TODO
                                "</tr><tr></tr><tr>" +
                                    "<td colspan='3' rowspan='2' class='centerRow name'>" + claimObj.fullName + "</td>" +
                                "</tr><tr>" +
                                    "<td colspan='3'></td>" +
                                "</tr><tr>" +
                                    "<td><button class='manageButton waves-effect btn-large btn-large-white px-4 black-text rounded-0, button' onclick='inspect(this)'>Inspect<span class='hider'>"+ claimId+ "</span></button></td>" +
                                    "<td colspan='1' class='centerRow'>" + claimObj.email + "</td>" +
                                    "<td class='ra'></td>" +
                                "</tr>" +
                                "</table>" +
                        "</div>" +
                    "</div>";

                    //ADD THE CLAIM OBJ TO THE OBJECT OF CLAIMS

                    claimRecords[claimId] = claimObj;
            });
        }).catch(function (error) {
            console.log("Fetch failed :(, => ", error);
        });
    });
}

function searchRecords() {

    console.log("searching...");

    let claimsElements = document.getElementById('claimsInjectPoint').classList.add('hider');
    let loaderElement = document.getElementById('claimsLoader').classList.remove('hider');

   let searchString =  document.getElementById('searchBarText').value;
   let filter = document.getElementById('searchFilter').value;

   console.log("Search String => ", searchString, " Filter => ", filter);

    //TODO add validation and query code
   switch (filter) {
       case "id":
           filterClaimsID();
           break;
       case "email":
           filterClaimsEmail();
           break;
       case "fullName":
           filterClaimsName();
           break;
       case "type":
           filterClaimsType();
           break;
       case "date":
           filterClaimsDate();
           break;
       default:
           console.log("No associated filter");
           break;
   }

   function filterClaimsID() {
       document.getElementById('claimsInjectPoint').classList.remove('hider');
       document.getElementById('claimsLoader').classList.add('hider');
   }

   function filterClaimsEmail() {
       document.getElementById('claimsInjectPoint').classList.remove('hider');
       document.getElementById('claimsLoader').classList.add('hider');
   }

   function filterClaimsType() {
       document.getElementById('claimsInjectPoint').classList.remove('hider');
       document.getElementById('claimsLoader').classList.add('hider');
   }

   function filterClaimsName() {
       document.getElementById('claimsInjectPoint').classList.remove('hider');
       document.getElementById('claimsLoader').classList.add('hider');
   }

   function filterClaimsDate() {
       document.getElementById('claimsInjectPoint').classList.remove('hider');
       document.getElementById('claimsLoader').classList.add('hider');
   }

}



function inspect(claimID) {
    let modal = document.getElementById("inspectModal");
    let span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    //ADD MODAL CONTENT

    let recordID = claimID.firstChild.nextSibling.firstChild.nodeValue;
    let claim = claimRecords[recordID];

    let claimStatusObj = claimStatus[recordID];

    /*
     let claimObj = claim.data().claim;
                let claimDate = claimObj.claimDate.toDate();
     */

    let date = claim.claimDate.toDate();

    document.getElementById('caseNumber').innerHTML = recordID;
    document.getElementById('lodgedDate').innerHTML = moment(date).format('MM/DD/YYYY h:mm a');
    document.getElementById('claimType').innerHTML = claim.type[0].toUpperCase() + claim.type.slice(1, ) + ' Insurance Claim';
    document.getElementById('name').innerHTML = claim.fullName;
    document.getElementById('email').innerHTML = claim.email;
    document.getElementById('incidentDate').innerHTML = claim.occurrenceDate;
    document.getElementById('addressOne').innerHTML = claim.mailingAddress1;
    document.getElementById('addressTwo').innerHTML = claim.mailingAddress2;
    document.getElementById('city').innerHTML = claim.city;
    document.getElementById('postcode').innerHTML = claim.postCode;

    document.getElementById('details').innerHTML = claim.additionalInfo;

    //TODO add elements for relevant type
    switch (claim.type) {
        case "car":
            document.getElementById('carClaim').classList.remove('hider');
            break;
        case "home":
            //document.getElementById('')
            break;
        case "personal":
            document.getElementById('personalClaim').classList.remove('hider');
            document.getElementById('personalClaimItems').classList.remove('hider');
            document.getElementById('lostItems').innerHTML = claim.lostItems;
            break;
        default:
            console.log('no associated type');
            break;
    }

    document.getElementById('approved').classList.add('hider');
    document.getElementById('pending').classList.add('hider');
    document.getElementById('rejected').classList.add('hider');


    if (claimStatusObj !== undefined) {
        switch (claimStatusObj.status) {
            case "Rejected":
                document.getElementById('rejectReason').innerHTML = claimStatusObj.reason;
                document.getElementById('rejected').classList.remove('hider');
                break;
            case "Accepted":
                document.getElementById('estCost').innerHTML = claimStatusObj.estimatedCover;
                document.getElementById('excessAmount').innerHTML = claimStatusObj.excess;
                document.getElementById('dateApproved').innerHTML = claimStatusObj.approvalDate;
                document.getElementById('approved').classList.remove('hider');
                break;
            default:
                document.getElementById('pending').classList.remove('hider');
                break;
        }
    } else {
        document.getElementById('pending').classList.remove('hider');
    }

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

let currentRecordID;

function resolve(claimID) {
    let modal = document.getElementById("resolveModal");
    let resolveClose = document.getElementById("resolveClose");

    modal.style.display = "block";

    currentRecordID = claimID.firstChild.nextSibling.firstChild.nodeValue;
    let claim = claimRecords[currentRecordID];

    //CLOSE MODAL =>
    resolveClose.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

function reject(claimID) {
    let modal = document.getElementById("rejectModal");
    let rejectClose = document.getElementById("rejectClose");

    modal.style.display = "block";

    currentRecordID = claimID.firstChild.nextSibling.firstChild.nodeValue;
    let claim = claimRecords[currentRecordID];

    console.log("ACK recordID => ", currentRecordID);


    //CLOSE MODAL =>
    rejectClose.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

function rejectClaim() {
    let reason = document.getElementById('reason').value;

    console.log("ACK recordID => ", currentRecordID);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in

            //PERFORM DB SEARCH FOR CLAIM ID

            let searchRoot = db.collection('users');

            searchRoot.get().then(function (data) {
                data.forEach(function (user) {
                    console.log("User =>", user.id);
                    searchRoot.doc(user.id).collection('claims').get().then(function (claims) {
                        claims.forEach(function (claim) {
                            if (claim.id === currentRecordID){
                                console.log("record located => ", claim.id);
                                console.log("writing outcome...");

                                searchRoot.doc(user.id).collection('claims').doc(claim.id).set({
                                    outcome: {
                                        status: "Rejected",
                                        reason: reason
                                    }
                                }, { merge: true })
                            }
                        })
                    })
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    });
    
}

function resolveClaim() {
    let estimatedCover = document.getElementById('estimatedCover').value;
    let excess = document.getElementById('excess').value;
    let approvalDate = document.getElementById('approvedDate').value;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.

            //PERFORM DB SEARCH FOR CLAIM ID

            let searchRoot = db.collection('users');

            searchRoot.get().then(function (data) {
                data.forEach(function (user) {
                    searchRoot.doc(user.id).collection('claims').get().then(function (claims) {
                        claims.forEach(function (claim) {
                            if (claim.id === currentRecordID){
                                console.log("record located => ", claim.id);
                                console.log("writing outcome...");

                                searchRoot.doc(user.id).collection('claims').doc(claim.id).set({
                                    outcome: {
                                        status: "Accepted",
                                        estimatedCover: estimatedCover,
                                        excess: excess,
                                        approvalDate: approvalDate
                                    }
                                }, { merge: true })
                            }
                        })
                    })
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    });
}
