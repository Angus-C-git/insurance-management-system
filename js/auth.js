function checkAuthState(nonAccessPage) {
    firebase.auth().onAuthStateChanged(function(user) {

        //If User is signed in display related tags
        if (user) {
            let uid = user.uid;
            console.log("Signed in", uid);
        } else {
            console.log("Signed Out");
            if (nonAccessPage === "yes"){
                window.location.replace("index.html");
            }
        }
    });
}

//Logout Function -> Ends user session on database end and then redirects to home page (hiding logged in links)
function Logout(){
    firebase.auth().signOut().then(function() {
        console.log("signed out");
        window.location.reload(); //REDIRECT HOME
    }).catch(function(error) {
        console.log(error);
    });
}