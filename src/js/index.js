const menuBurger = document.querySelector('.page-header__burger');
const pageNav = document.querySelector('.page-header__nav');
const pageContacts = document.querySelector('.page-header__contacts');

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider li');
const slideButtons = document.querySelectorAll('.slider-button');

menuBurger.addEventListener('click', () => {
    if (menuBurger.firstChild.classList.contains('active')) {
        menuBurger.firstChild.classList.remove('active');
        pageContacts.parentElement.classList.remove('opened');
        pageContacts.classList.remove('opened');
        pageNav.classList.remove('opened');
    } else {
        menuBurger.firstChild.classList.add('active');
        pageContacts.parentElement.classList.add('opened');
        pageContacts.classList.add('opened');
        pageNav.classList.add('opened');
    }
});

const slidesData = [
    {
        conferency: {
            title: 'Видео конференции 1',
            span: 'Оснащение конференц-залов',
            description:
                'Профессиональное оборудование для конференц-залов предназначено для проведения и организации презентаций, совещаний, бизнес-тренингов и онлайн-трансляции контента. Обратный звонок Заполнить бриф',
            bg: './img/page-slider__img-1.jpg',
        },
        slide: {
            number: '01',
            description:
                'Простота использования оснащения позволяет решать функциональные и организационные задачи, оптимизировать работу, проводить мероприятия различного масштаба.',
        },
    },
    {
        conferency: {
            title: 'Видео конференции 2',
            span: 'Оснащение конференц-залов 2',
            description:
                'Профессиональное оборудование для конференц-залов предназначено для проведения и организации презентаций, совещаний, бизнес-тренингов и онлайн-трансляции контента. Обратный звонок Заполнить бриф',
            bg: './img/page-slider__img-2.jpg',
        },
        slide: {
            number: '02',
            description:
                'Простота использования оснащения позволяет решать функциональные и организационные задачи, оптимизировать работу, проводить мероприятия различного масштаба.',
        },
    },
    {
        conferency: {
            title: 'Видео конференции 3',
            span: 'Оснащение конференц-залов 3',
            description:
                'Профессиональное оборудование для конференц-залов предназначено для проведения и организации презентаций, совещаний, бизнес-тренингов и онлайн-трансляции контента. Обратный звонок Заполнить бриф',
            bg: './img/page-slider__img-3.jpg',
        },
        slide: {
            number: '03',
            description:
                'Простота использования оснащения позволяет решать функциональные и организационные задачи, оптимизировать работу, проводить мероприятия различного масштаба.',
        },
    },
    {
        conferency: {
            title: 'Видео конференции 4',
            span: 'Оснащение конференц-залов 4',
            description:
                'Профессиональное оборудование для конференц-залов предназначено для проведения и организации презентаций, совещаний, бизнес-тренингов и онлайн-трансляции контента. Обратный звонок Заполнить бриф',
            bg: './img/page-slider__img-4.jpg',
        },
        slide: {
            number: '04',
            description:
                'Простота использования оснащения позволяет решать функциональные и организационные задачи, оптимизировать работу, проводить мероприятия различного масштаба.',
        },
    },
];

const conferenceGenerator = (title, aboutConference, description, bgImage) => {
    const h1 = document.querySelector('.conference__description h1');
    const span = document.querySelector('.under__h1');
    const p = document.querySelector('.conference__description p');
    const background = document.querySelector('.page-slider');

    background.style.background = `url(${bgImage}) no-repeat `;
    background.style.backgroundSize = `cover`;
    h1.textContent = title;
    span.textContent = aboutConference;
    p.textContent = description;
};

let current = 0;
let prev = slidesData.length - 1;
let next = 1;

for (let i = 0; i < slideButtons.length; i++) {
    slideButtons[i].addEventListener('click', () =>
        i == 0 ? goToPrev() : goToNext()
    );
}

const goToPrev = () =>
    current > 0 ? goToNum(current - 1) : goToNum(slides.length - 1);

const goToNext = () =>
    current < slidesData.length - 1 ? goToNum(current + 1) : goToNum(0);

const goToNum = (number) => {
    const { title, span, description, bg } = slidesData[number].conferency;
    conferenceGenerator(title, span, description, bg);

    current = number;
    prev = current - 1;
    next = current + 1;

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
        slides[i].classList.remove('prev');
        slides[i].classList.remove('next');
    }

    if (next == slidesData.length) {
        next = 0;
    }

    if (prev == -1) {
        prev = 3;
    }

    slides[current].classList.add('active');
    slides[prev].classList.add('prev');
    slides[next].classList.add('next');
};
