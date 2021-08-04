const addFlashcardBtn = document.querySelector("#addFlashcard");
const flashcardModal = document.querySelector("#flashcardModal");
const flashcardModalBody = document.querySelector("#flashcardModalBody");
const addFlashcardSection = document.querySelector("#flashcards");
const flashcardTitleInput = document.querySelector("#flashcardTitle");
const flashcardDescrInput = document.querySelector("#flashcardDescription");
let numFlashcards = 0;

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
    console.log("numcards " + numFlashcards);  
}

function createNewSet() {
    console.log("create clicked");
}

function clearFlashcardForm() {
    flashcardTitleInput.value = "";
    flashcardDescrInput.value = "";
}