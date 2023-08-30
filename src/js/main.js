let $html;
let $navMobile;
let $burgerBtn;
let $mobileLinks;
let $footerYear;
let $nav;
let $body;
let $name;
let $email;
let $topic;
let $message;
let $sendMsgBtn;
let $popup;

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
    $name = document.querySelector('#name');
    $email = document.querySelector('#email');
    $topic = document.querySelector('#topic');
    $message = document.querySelector('#message');
    $sendMsgBtn = document.querySelector('.contact__form-btn')
    $popup = document.querySelector('.contact__popup')
}

const prepareDOMEvents = () => {
    handleCurrentYear()
    window.addEventListener('scroll', addNavShadow)
    $burgerBtn.addEventListener('click', showNav)
    $mobileLinks.addEventListener('click', showNav)
    setPaddingScroll()
    $sendMsgBtn.addEventListener('click', e => {
        e.preventDefault();
    
        checkForm([$name, $email, $topic, $message])
        checkLength($message, 5);
        checkEmail($email);
        checkErrors()
    })
    
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

const showError = (input, msg) => {
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text');

    formBox.classList.add('error');
    errorMsg.textContent = msg;
}

const checkForm = input => {
    input.forEach(el => {
        if (el.value === '') {
            showError(el, `Pole ${el.placeholder} nie może być puste.`)
        } else {
            clearError(el)
        };
    });
};

const checkLength = (input, min) => {
    if (input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} musi składać się z min. ${min} znaków.`);
    }
}

const checkEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email.value)) {
        clearError(email)
    } else {
        showError(email, 'E-mail jest niepoprawny')
    }
}

const checkErrors = () => {

    const allInputs = document.querySelectorAll('.contact__form-box');
    let errorCount = 0;

    allInputs.forEach(el => {
        if (el.classList.contains('error')) {
            errorCount++
        }
    })

    if (errorCount === 0) {
        $popup.classList.add('contact__show-popup')
        $body.classList.add('disable-scroll')
        
    }
}

const clearError = (input) => {
    const formBox = input.parentElement;
    formBox.classList.remove('error');
}

document.addEventListener('DOMContentLoaded', main);