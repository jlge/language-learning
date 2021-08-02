window.onload = runType();

function runType() {
    var app = document.getElementById('learn');

    var typewriter = new Typewriter(app, {
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
