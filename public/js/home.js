let googleUserId;

const html = document.querySelector('html')
const nav = document.querySelector('nav')



window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
    getScore(); 
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    };
    document.querySelector("#welcome").innerHTML = "Welcome, " + user.displayName.split(" ")[0] + ".";;

  });
    
};



                
                    function getScore () {
                    const notesRef = firebase.database().ref(`users/${googleUserId}/scores`);
                    console.log(googleUserId);
                    notesRef.on('value', (snapshot) => {
                        const data = snapshot.val();
                        updateScore(data);
                    });
                    }

                    function updateScore(data) {
                        const numQs = document.querySelector("#num-qs");
                        console.log(data);
                        numQs.innerHTML = data.verbscore; 
                        console.log("score is + " + data.verbscore) 

                    }


if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    nav.classList.add('dark-nav');
}



