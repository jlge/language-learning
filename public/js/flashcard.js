const addFlashcardBtn = document.querySelector("#addFlashcard");
const flashcardModal = document.querySelector("#flashcardModal");
const flashcardModalBody = document.querySelector("#flashcardModalBody");
const addFlashcardSection = document.querySelector("#flashcards");
const flashcardTitleInput = document.querySelector("#flashcardTitle");
const flashcardDescrInput = document.querySelector("#flashcardDescription");
const flashcardSearch = document.querySelector("#flashcardSearch");
let numFlashcards = 0;
let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
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

function addFlashcard(num) {
    card = numFlashcards;
    for (let i = 0; i < num; i++) {
        card += 1;
        addFlashcardSection.innerHTML += `
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
    }
    numFlashcards += num;
    //console.log("numcards " + numFlashcards);  
}

function createNewSet() {
    if (checkFlashcardInputs()) {
        let cardFront, cardBack;
        firebase.database().ref(`users/${googleUser.uid}/flashcard-sets/${flashcardTitleInput.value}`).child("description").set(
            flashcardDescrInput.value
        );
        
        for (let i = 0; i < numFlashcards; i++) {
            //console.log("collect data for flashcard " + i);
            cardFront = document.querySelector(`#card${i+1}Front`);
            cardBack = document.querySelector(`#card${i+1}Back`);
            if ((cardFront.value != "") && (cardBack.value != "")) {
                firebase.database().ref(`users/${googleUser.uid}/flashcard-sets/${flashcardTitleInput.value}/cards`).push({
                    front: cardFront.value,
                    back: cardBack.value
                });
            }
        }        
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