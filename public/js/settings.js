const btn = document.querySelector('#checkbox');
const html = document.querySelector('html');


btn.addEventListener('click', () => {
    html.classList.toggle('dark');
    nav.classList.toggle('dark-nav');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');

});


if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    nav.classList.add('dark-nav');
}

