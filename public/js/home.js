let googleUserId;

const html = document.querySelector('html')
const nav = document.querySelector('nav')



window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    };
    document.querySelector("#welcome").innerHTML = "Welcome, " + user.displayName.split(" ")[0] + ".";;
  });
};

if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    nav.classList.add('dark-nav');
}



