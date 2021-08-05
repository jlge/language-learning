const btn = document.querySelector('#checkbox')
const html = document.querySelector('html')
const nav = document.querySelector('nav')

// const heading = document.querySelector('h1')

btn.addEventListener('click', () => {
    html.classList.toggle('dark');
    p.classList.toggle('dark-text')
    nav.classList.toggle('dark-nav')
    // title.classList.toggle('dark-title')
    // welcome.classList.toggle('dark-welcome')
    // question.classList.toggle('dark-question')
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');

});


if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    nav.classList.add('dark-nav');
}

