const btn = document.querySelector('#checkbox');
const html = document.querySelector('html');
const nav = document.querySelector('nav');

// I need this to grab it from the Javascript
const flashcards = document.querySelector('#flashcardSets');
console.log()
console.log(flashcards);

btn.addEventListener('click', () => {
    html.classList.toggle('dark');
    nav.classList.toggle('dark-nav');
    // flashcards.classList.toggle('.flashcards')
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');

});


if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    nav.classList.add('dark-nav');
    // flashcards.classList.add('.flashcards')
}

