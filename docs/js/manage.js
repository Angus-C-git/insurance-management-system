
const db = firebase.firestore();
let uid;

//Holds all claims keyed by claimID as fetched from the db
let claimRecords = {};

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
                        let claimObj = claimObjPre.claim;
                        let claimDate = claimObj.claimDate.toDate();

                        let claimId = claim.id;
                        //console.log(claimObj.additionalInfo);
                        document.getElementById('claimsInjectPoint').innerHTML +=
                            "<div class='tm-col tm-col-span'>" +
                                "<div class='bg-white tm-block h-100 reduceSize'>" +
                                    "<table class='manageBox'>" +
                                        "<tr>" +
                                            "<td class='std id'>#" + claim.id + "</td>" +
                                            "<td class='centerRow' rowspan='2'>" + claimDate.type +"<br/>" +

                                            "</td>" +
                                            "<td class='std ra id'>" + claimDate.getDate() + "/" + claimDate.getMonth() + "/" + claimDate.getFullYear() + "   " + claimDate.getHours() + ":" + claimDate.getMinutes() + " </td>" +//TODO
                                        "</tr><tr></tr><tr>" +
                                            "<td colspan='3' rowspan='2' class='centerRow name'>" + claimObj.fullName + "</td>" +
                                        "</tr><tr>" +
                                            "<td colspan='3'></td>" +
                                        "</tr><tr>" +
                                            "<td><button class='manageButton' onclick='inspect(this)'>Inspect<span class='hider'>"+ claimId+ "</span></button></td>" +
                                            "<td colspan='1' class='centerRow'>" + claimObj.email + "</td>" +
                                            "<td class='ra'><button class='manageButton' onclick='reject(this)'>Reject<span class='hider'>"+ claimId+ "</span></button><button class='manageLeft manageButton' onclick='resolve(this)'>Resolve<span class='hider'>"+ claimId + "</span></button></td>" +
                                        "</tr>" +
                                    "</table>" +
                                "</div>" +
                            "</div>";

                        claimRecords[claimId] = claimObj;
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
                //onload="this.width=screenWidth;"
                document.getElementById('claimsInjectPoint').innerHTML +=
                    "<div class='tm-col tm-col-span'>" +
                        "<div class='bg-white tm-block h-100 reduceSize'>" +
                            "<table class='manageBox'>" +
                                "<tr>" +
                                    "<td class='std id'>#" + claim.id + "</td>" +
                                    "<td class='centerRow' rowspan='2'>" + claimDate.type + "<br/>" +

                                    "<td class='std ra id'>" + claimDate.getDate() + "/" + claimDate.getMonth() + "/" + claimDate.getFullYear() + "   " + claimDate.getHours() + ":" + claimDate.getMinutes() + " </td>" +//TODO
                                "</tr><tr></tr><tr>" +
                                    "<td colspan='3' rowspan='2' class='centerRow name'>" + claimObj.fullName + "</td>" +
                                "</tr><tr>" +
                                    "<td colspan='3'></td>" +
                                "</tr><tr>" +
                                    "<td><button class='manageButton' onclick='inspect(this)'>Inspect<span class='hider'>"+ claimId+ "</span></button></td>" +
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

    document.getElementById('caseNumber').innerHTML = recordID;
    /*document.getElementById('lodgedDate').innerHTML = claim.claimDate.getDate() + "/" + claim.claimDate.getMonth() + "/" + claim.claimDate.getFullYear() + "   " + claim.claimDate.getHours() + ":" + claim.claimDate.getMinutes();*/
    document.getElementById('claimType').innerHTML = claim.type;
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
            break;
        default:
            console.log('no associated type');
            break;
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

function resolve(claimID) {
    let modal = document.getElementById("resolveModal");
    let span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    let recordID = claimID.firstChild.nextSibling.firstChild.nodeValue;
    let claim = claimRecords[recordID];

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

function reject(claimID) {
    let modal = document.getElementById("rejectModal");
    let span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    let recordID = claimID.firstChild.nextSibling.firstChild.nodeValue;
    let claim = claimRecords[recordID];




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