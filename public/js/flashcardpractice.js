let googleUser;
let currentCard = 0;
let numTerms = 0;
let data;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      displayFlashcardSet(sessionStorage.getItem("setTitle"), user.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

function displayFlashcardSet(flashcardSet, userId) {
    console.log("session storage: " + sessionStorage.getItem("setTitle"));

    //change title
    const cardsetTitle = document.querySelector("#cardsetTitle");
    cardsetTitle.innerHTML = flashcardSet;
    // const flashcardsRef = firebase.database().ref(`users/${userId}/flashcard-sets/${flashcardSet}/cards`)
    // flashcardsRef.on('value', (snapshot) => {
    //     const data = snapshot.val();
    //     renderFlashcardBoxes(data);
    //     renderFlipFlashcard(currentCard, data);
    // })

    const dbRef = firebase.database().ref(`users/${userId}/flashcard-sets/${flashcardSet}/cards`);
    dbRef.get().then((snapshot) => {
    if (snapshot.exists()) {
        data = snapshot.val();
        renderFlashcardBoxes(data);
        renderFlipFlashcard(currentCard, data);
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
        console.error(error);
    });   
}

function nextCard() {
    document.querySelector("#flippingCard").classList.remove("is-active");
    currentCard++;
    renderFlipFlashcard(currentCard, data);
}

function beforeCard() {
    document.querySelector("#flippingCard").classList.remove("is-active");
    currentCard--;
    renderFlipFlashcard(currentCard, data);
}

function renderFlipFlashcard(currentCard, data) {
    console.log("Here")
    let pointer = 0;
    for (const dataKey in data) {
        if (pointer == currentCard) {
            setTimeout(() => { document.querySelector("#cardFront").innerHTML = data[dataKey].front }, 130);
            setTimeout(() => { document.querySelector("#cardBack").innerHTML = data[dataKey].back; }, 130);
            renderCardCounter();
            return;
        }
        pointer++;
    }
}

function renderCardCounter() {
    let cardNum = currentCard + 1;
    document.querySelector("#currentCard").innerHTML = cardNum + "/" + numTerms;
    if (cardNum >= numTerms) {
        document.getElementById("rightFlashcard").disabled = true;
    } else {
        document.getElementById("rightFlashcard").disabled = false;
    }
    
    if (cardNum == 1) {
        document.getElementById("leftFlashcard").disabled = true;
    } else {
        document.getElementById("leftFlashcard").disabled = false;
    }
}

function renderFlashcardBoxes(data) {
    let html = '';
    for (const dataKey in data) {
        numTerms++;
        const set = data[dataKey];
        const cardHtml = renderIndivFlashcards(set);
        html += cardHtml;
    }
    document.querySelector('#termNumber').innerHTML = `Terms in this set (${numTerms})`;
    document.querySelector('#cardHolder').innerHTML = html;       
}

function renderIndivFlashcards(data) {
    return `
        <div class="box">
            <div class="level">
                <p class="right-border" style="width: 40%;">${data.front}</p>
                <p style="width: 60%; padding-left: 1em;">${data.back}</p>
            </div>
        </div>
    `;
}