let $html;
let $navMobile;
let $burgerBtn;
let $mobileLinks;
let $footerYear;
let $nav;
let $body;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    $html = document.querySelector('html')
    $navMobile = document.querySelector('.nav__mobile');
    $burgerBtn = document.querySelector('.nav__burger-btn');
    $mobileLinks = document.querySelector('.nav__mobile-links');
    $footerYear = document.querySelector('.footer__year');
    $nav = document.querySelector('.nav');
    $body = document.querySelector('body');
}

const prepareDOMEvents = () => {
    handleCurrentYear()
    window.addEventListener('scroll', addNavShadow)
    $burgerBtn.addEventListener('click', showNav)
    $mobileLinks.addEventListener('click', showNav)
    setPaddingScroll()
}

const showNav = () => {
    $navMobile.classList.toggle('show-nav')
    $body.classList.toggle('disable-scroll')
    
}

const handleCurrentYear = () => {
    const year = new Date().getFullYear()
    $footerYear.innerText = year
}

const addNavShadow = () => {
    if (window.scrollY >= 100) {
        $nav.classList.add('show-bg')
    } else {
        $nav.classList.remove('show-bg')
    }
}

const setPaddingScroll = () => {
    let navHeight = $nav.offsetHeight
    $html.style.scrollPaddingTop = `${navHeight}px`
}

document.addEventListener('DOMContentLoaded', main);

