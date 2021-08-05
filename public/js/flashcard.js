const html = document.querySelector('html')
const nav = document.querySelector('nav')

if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    nav.classList.add('dark-nav');
}