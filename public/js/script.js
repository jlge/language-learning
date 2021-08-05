window.onload = runType();

function runType() {
    const app = document.getElementById('learn');

    const typewriter = new Typewriter(app, {
    loop: true,
    delay: 75,
    });

    typewriter
    .typeString('<span>English</span>')
    .pauseFor(1500)
    .deleteChars(10)
    .typeString('<span>Spanish</span>')
    .pauseFor(1500)
    .deleteChars(10)
    .typeString('<span>French</span>')
    .pauseFor(1500)
    .deleteChars(10)
    .typeString('<span>Italian</span>')
    .pauseFor(1500)
    .deleteChars(10)
    .start();

}

const signIn = () => {
    console.log("sign in clicked");
    const provider = new firebase.auth.GoogleAuthProvider();
    // console.log(provider)
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential;
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        window.location = 'home.html';
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        const err = {
        errorCode,
        errorMessage,
        email,
        credential
        };
        console.log(err);
    });
}


