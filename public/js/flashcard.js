let googleUser;
let numFlashcards = 0;


const html = document.querySelector('html')
const nav = document.querySelector('nav')

if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    nav.classList.add('dark-nav');
}

const addFlashcardBtn = document.querySelector("#addFlashcard");
const flashcardModal = document.querySelector("#flashcardModal");
const flashcardModalBody = document.querySelector("#flashcardModalBody");
const deleteModal = document.querySelector("#deleteModal");
const addFlashcardSection = document.querySelector("#flashcards");
const flashcardTitleInput = document.querySelector("#flashcardTitle");
const flashcardDescrInput = document.querySelector("#flashcardDescription");
const flashcardSearch = document.querySelector("#flashcardSearch");
const flashcardDropdown = document.querySelector("#flashcardDropdown");


window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      getFlashcardSets(user.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

function toggleModal() {
    numFlashcards = 0;
    addFlashcardSection.innerHTML = "";
    addFlashcard(5);
    clearFlashcardForm();

    flashcardModal.classList.toggle("is-active");
    flashcardModalBody.scrollTop = 0;
}

function toggleDeleteModal(set) {
    sessionStorage.setItem("removed", set);
    
    deleteModal.classList.toggle("is-active");
}

function setUpFlashcards() {
    addFlashcard(5);    
}

function addFlashcard(num) {
    card = numFlashcards;
    for (let i = 0; i < num; i++) {
        card += 1;
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `
            <div class="field" id=card${card}>
                <div class="columns">
                    <div class="column">
                        <label class="label">${card}</label>
                    </div>
                    <div class="column has-text-right">
                        <button class="button is-small"><span class="icon"><i class="far fa-trash-alt"></i></span></button>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <textarea class="textarea" type="text" id="card${card}Front"></textarea>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <textarea class="textarea" type="text" id="card${card}Back"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <br>    
        `;
        addFlashcardSection.appendChild(wrapper);
    }
    numFlashcards += num;
    //console.log("numcards " + numFlashcards);  
}

function createNewSet() {
    let data = `{"cards": {`;
    let cardFront, cardBack;

    if (checkFlashcardInputs()) {        
        for (let i = 0; i < numFlashcards; i++) {
            cardFront = document.querySelector(`#card${i+1}Front`);
            cardBack = document.querySelector(`#card${i+1}Back`);
            if ((cardFront.value != "") && (cardBack.value != "")) {
                data += `"${i+1}": {"back":"${cardBack.value}", "front":"${cardFront.value}"},`;
            } 
        }
        data = data.slice(0, -1) + "},";

        const today = new Date();
        const date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;

        data += `"created":"${dateTime}", "description":"${flashcardDescrInput.value}"}`;
        const dataJSON = JSON.parse(data);
        firebase.database().ref(`users/${googleUser.uid}/flashcard-sets/${flashcardTitleInput.value}`).set(dataJSON);        
        toggleModal();
    }     
}

function checkFlashcardInputs() {
    let valid = true;
    if (flashcardTitleInput.value == "") {
        valid = false;
        document.querySelector("#flashcardTitleReq").classList.remove("hidden");
        flashcardTitleInput.classList.add("is-danger");
    } else {
        document.querySelector("#flashcardTitleReq").classList.add("hidden");
        flashcardTitleInput.classList.remove("is-danger");
    }
    return valid;
}

function clearFlashcardForm() {
    flashcardTitleInput.value = "";
    flashcardDescrInput.value = "";
    document.querySelector("#flashcardTitleReq").classList.add("hidden");
    flashcardTitleInput.classList.remove("is-danger");
}

function getFlashcardSets(userId) {
    const flashcardsRef = firebase.database().ref(`users/${userId}/flashcard-sets`)
    flashcardsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        renderData(data);
    })
}

function renderData(data){
    let html = '';
    for (const dataKey in data) {
        const set = data[dataKey];
        const cardHtml = renderFlashcard(dataKey, set);
        html += cardHtml;
    }
    document.querySelector('#flashcardSets').innerHTML = html;        
}

let counter = 0;
function renderFlashcard(title, set){
    counter++;
    let numCards = Object.keys(set.cards).length;
    if (numCards == 1) {
        numCards += " term";
    } else {
        numCards += " terms";
    }

    return `
            <div class="box flashcards" id="set${counter}" onclick='toPractice("${title}")'>
            <div class="level" style="margin:0;">
                <div class="has-text-grey">
                    ${numCards} | Created ${set.created}
                </div>
                <div class="column has-text-right">
                    <button class="button is-small trash" onclick='toggleDeleteModal("${title}")'><span class="icon"><i class="far fa-trash-alt"></i></span></button>
                </div>
            </div>
                <div class="is-size-5">
                    <b>${title}</b>
                </div>
            </div>       
    `;
    //removeSet("${title}")
}

function toPractice(flashcardSet) {
    sessionStorage.setItem("setTitle", flashcardSet);
    
    if (sessionStorage.getItem("removed") != flashcardSet) {
        console.log("switch to practice");
        // location.href="flashcardpractice.html";
    } 
}

function removeSet() {
    let set = sessionStorage.getItem("removed");
    console.log("delete set " + set);
    firebase.database().ref(`users/${googleUser.uid}/flashcard-sets/${set}`).remove();
    toggleDeleteModal(set);
}

// function showDropdown() {
//     const dropdown = document.querySelector('.dropdown');
//     dropdown.classList.toggle("is-active");
// }


