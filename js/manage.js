
let db = firebase.firestore();

function fetchClaimsStaff() {
    //TODO staff validation

    let searchRoot = db.collection('users');

    let fetchQuery = searchRoot.where('claims').get().then(function (querySnapshot) {

    })

    //for (){} //TODO iterate through retrieved query
}


function fetchClaimsUser() {

}