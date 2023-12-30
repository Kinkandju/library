'use strict';

//* Add class to element
const addClass = (element, someClass) => {
    element.classList.add(someClass);
}

//* Remove class from element
const removeClass = (element, someClass) => {
    element.classList.remove(someClass);
}

//* Toggle class in element
const toggleClass = (element, someClass) => {
    element.classList.toggle(someClass);
}

//* Press button 'Escape'
const onButtonPress = (evt) => {
    let keyName = evt.key;

    if (keyName === 'Escape') {
        closeMenu();
        closeAllModals();
    }
}

document.addEventListener('keydown', onButtonPress);

//* Menu burger
const burgerIcon = document.querySelector('.navigation__menu');
const navigationList = document.querySelector('.navigation__list');

const switchBurgerMenu = () => {
    burgerIcon.addEventListener('click', function() {
        toggleClass(document.body, 'lock');
        toggleClass(burgerIcon, 'active');
        toggleClass(navigationList, 'active');
        removeClass(navigationList, 'hide');

        document.addEventListener('click', checkBurgerMenu);
        document.removeEventListener('click', checkAuthorizationMenu);

        if(!authorizationMenu.classList.contains('visually-hidden')) {
            addClass(document.body, 'lock'); 
            addClass(authorizationMenu, 'visually-hidden');
        }
    });
}

switchBurgerMenu();

//* Menu authorization
const userIcon = document.querySelector('.dropdown-menu__icon');
const authorizationMenu = document.querySelector('.dropdown-menu__no-authorization');

const switchAuthorizationMenu = () => {
    userIcon.addEventListener('click', function() {
        toggleClass(document.body, 'lock');
        toggleClass(authorizationMenu, 'visually-hidden');

        document.addEventListener('click', checkAuthorizationMenu);
        document.removeEventListener('click', checkBurgerMenu);

        if (burgerIcon.classList.contains('active') && navigationList.classList.contains('active')) {
            addClass(document.body, 'lock');
            removeClass(burgerIcon, 'active');
            removeClass(navigationList, 'active');
        }
    });
}

switchAuthorizationMenu();

//* Change property (right) of autorization menu
const updateRightPropertyMenu = () => {
    const layoutContainer = document.querySelector('.layout-container');
    let leftContainerProperty = layoutContainer.offsetLeft;

    if (document.documentElement.clientWidth <= DESCTOP_WIDTH) {
        authorizationMenu.style.right = '';
    } else {
        authorizationMenu.style.right = leftContainerProperty + 10 + 'px';
    }
}

//* Close all menu
const closeMenu = () => {
    removeClass(document.body, 'lock');
    removeClass(burgerIcon, 'active');
    removeClass(navigationList, 'active');
    addClass(authorizationMenu, 'visually-hidden');
}

//* Checking for the element's occurrence in the click area
const checkBurgerMenu = (evt) => {
    const burgerClickIcon = evt.composedPath().includes(burgerIcon);
    const burgerClickNavigation = evt.composedPath().includes(navigationList);

    if (!burgerClickIcon && !burgerClickNavigation) {
        closeMenu();
    }
}

const checkAuthorizationMenu = (evt) => {
    const userClickIcon = evt.composedPath().includes(userIcon);
    const userClickAuthorization = evt.composedPath().includes(authorizationMenu);

    if (!userClickIcon && !userClickAuthorization) {
        closeMenu();
    }
}

//* Open modal
const openModal = (buttons, modal) => {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            removeClass(document.body, 'lock');
            addClass(document.body, 'modal-lock');
            removeClass(modal, 'visually-hidden');
            addClass(authorizationMenu, 'visually-hidden');
        })
    })
}

//* Modal register
const buttonsRegister = document.querySelectorAll('.signup');
const modalRegister = document.querySelector('.modal--register');

openModal(buttonsRegister, modalRegister);

//* Modal log-in
const buttonsLogIn = document.querySelectorAll('.login');
const modalLogIn = document.querySelector('.modal--login');

openModal(buttonsLogIn, modalLogIn);

//* Redirection modals register and log-in
const linkRedirection = document.querySelectorAll('.modal__redirection');

linkRedirection.forEach(link => {
    link.addEventListener('click', (evt) => {
        evt.preventDefault();

        if (link.id === 'signup-link') {
            addClass(modalLogIn, 'visually-hidden');
            removeClass(modalRegister, 'visually-hidden');
        } else if (link.id === 'login-link') {
            addClass(modalRegister, 'visually-hidden');
            removeClass(modalLogIn, 'visually-hidden');
        }
    });
});

//* Modal buy
const buttonsBuy = document.querySelectorAll('.book__button');
const modalBuy = document.querySelector('.modal--buy');

const openModalBuy = () => {
    removeClass(modalBuy, 'visually-hidden');
    addClass(document.body, 'modal-lock');
}

buttonsBuy.forEach(button => {
    button.addEventListener('click', openModalBuy);
});

//* Close all modals
const buttonsClose = document.querySelectorAll('.modal__close');

const closeAllModals = () => {
    removeClass(document.body, 'modal-lock');
    addClass(modalRegister, 'visually-hidden');
    addClass(modalLogIn, 'visually-hidden');
    addClass(modalBuy, 'visually-hidden');
}

buttonsClose.forEach(button => {
    button.addEventListener('click', () => {
        closeAllModals();
    })
});

//* Check modal popup
document.body.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('modal-lock')) {
        closeAllModals();
    }
});

//* Local Storage
const buttonRegister = modalRegister.querySelector('.modal__button');
const modalMainRegister = modalRegister.querySelector('.modal__main');
const registerElements = modalMainRegister.elements;

const firstNameInput = modalRegister['firstName'];
const lastNameInput = modalRegister['lastName'];
const mailInput = modalRegister['mail'];
const passwordInput = modalRegister['password'];

// let users = JSON.parse(localStorage.getItem('users')) || [];

/*
{
    name: Anton Bobrov,
    mail: user@mail.com,
    password: 11hh22zz
}
*/

// const addUsers = (firstName, lastName, mail, password) => {
//     users.push({
//         firstName, 
//         lastName, 
//         mail, 
//         password
//     })

//     localStorage.setItem('user', JSON.stringify(users));

//     return {firstName, lastName, mail, password};
// }

// modalRegister.onsubmit = (evt) => {
//     evt.preventDefault;

//     const newUser = addUsers(
//         firstNameInput.value,
//         lastNameInput.value,
//         mailInput.value,
//         passwordInput.value
//     )

//     console.log(users);
// }

let users = [];
let user = {};

// users.push(user);

const changeModalHandler = () => {
    for (let i = 0; i < (registerElements.length - 1); i++) {
        if (registerElements.nodeName = 'INPUT' && registerElements[i].value != '') {
            users.forEach(user => {
                user[registerElements[i].name] = registerElements[i].value;
            });
        }
    }
}

modalMainRegister.addEventListener('change', changeModalHandler);

const submitHandler = () => {
    users.push(user);

    localStorage.setItem('user', JSON.stringify(users));
}

modalRegister.addEventListener('submit', submitHandler);


// let userSettings = {};

// const changeModalHandler = () => {
//     for (let i = 0; i < (registerElements.length - 1); i++) {
//         if (registerElements.nodeName = 'INPUT' && registerElements[i].value != '') {
//             userSettings[registerElements[i].name] = registerElements[i].value;
//         }
//     }
//     console.log(userSettings);
// }

// modalMainRegister.addEventListener('change', changeModalHandler);

// const submitHandler = (evt) => {
//     evt.preventDefault;

//     users.push(userSettings);

//     localStorage.setItem('user', JSON.stringify(users));
// }

// modalRegister.addEventListener('submit', submitHandler);


//* Smooth links behaviar
const menuLinks = document.querySelectorAll('.navigation__link[data-goto]');

const addSmoothBehaviar = (evt) => {
    evt.preventDefault();
    const menuLink = evt.target;

    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const goToSection = document.querySelector(menuLink.dataset.goto);
        const goToSectionValue = goToSection.getBoundingClientRect().top;

        if (burgerIcon.classList.contains('active')) {
            closeMenu();
            addClass(navigationList, 'hide');
        }

        window.scrollTo({
              top: goToSectionValue,
              behavior: 'smooth'
        });  
    }
}

const activateSmoothBehaviar = () => {
    if (menuLinks.length > 0) {
        menuLinks.forEach((menuLink => {
            menuLink.addEventListener('click', addSmoothBehaviar);
        }));
    }
}

activateSmoothBehaviar();

//* Switch season
const seasonButtons = document.querySelectorAll('input[name="season"]');
const favoriteLists = document.querySelectorAll('.favorites__list[data-season]');
const ANIMATION_SPEED = 500;

const swithSeasonSelection = () => {
  if (seasonButtons.length > 0) {
      seasonButtons.forEach(seasonButton => {
          seasonButton.addEventListener('click', function(evt) {
              const seasonButton = evt.target;
              const buttonValue = seasonButton.value;

              for (let i = 0; i < favoriteLists.length; i++) {
                  const season = favoriteLists[i].dataset.season;

                  if (buttonValue === season) {
                    window.setTimeout(function () {
                        addClass(favoriteLists[i], 'list__show');
                        removeClass(favoriteLists[i], 'list__hide');     
                    }, ANIMATION_SPEED);
                  } else {
                    window.setTimeout(function () {
                        removeClass(favoriteLists[i], 'list__show');
                        addClass(favoriteLists[i], 'list__hide');
                    }, ANIMATION_SPEED);
                  }
              }
          });
      });
  }
}

swithSeasonSelection();

//* Adaptive slider
class Slider {
    static defaults = {
        margin:			25,
        visibleItems: 	1,
        responsive:		true,
        navigation:		false,
        indicators:		true,
        baseTransition:	0.5,
        delayTimer:		250
    };

    constructor(gallery, setup) {
        this.gallery = gallery;
        this.setup = setup;

        this.slider = this.gallery.querySelector('.slider__wrapper');
        this.sliderLine = this.gallery.querySelector('.slider__line');
        this.items = this.gallery.querySelectorAll('.slider__slide');
        this.count = this.items.length;

        this.current = 0;
        this.next = 0;

        this.init();
    }

    //* Combines and overwrites the values of two objects and produces a common result
    static extend(out) {
        out = out || {};

        for (let i = 1; i < arguments.length; i++) {
            if (!arguments[i]) {
                continue;
            }

            for (let key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    out[key] = arguments[i][key];
                } 
            }
        }

        return out; 
    };

    //* Initialization the new slider
    init() {
        this.options = Slider.extend({}, Slider.defaults, this.setup);

        this.setSizeSlider();
        this.setCoordinates();
        this.initControl();

        if (this.events) {
            return;
        }

        this.registerEventsHandler();
    }

    //* Calculates the width of the slider
    setSizeSlider() {
        this.widthSlider = this.slider.offsetWidth;

        if (this.options.responsive) {
            this.setAdaptiveOptions();
        } 

        this.max = this.count - this.options.visibleItems;

        const width = (this.widthSlider - this.options.margin * (this.options.visibleItems - 1)) / this.options.visibleItems;

        this.width = width + this.options.margin;
        this.widths = this.width * this.count;
        this.sliderLine.style.width = this.widths + 'px';

        for (let item of this.items) {
            item.style.cssText = `width:${width}px; margin-right:${this.options.margin}px;`;
        }

        const TIMEOUT = 350;

        setTimeout(() => { 
            this.gallery.style.visibility = 'visible'; 
        }, TIMEOUT);
    }

    //* Get the coordinate of each slide of the slider
    setCoordinates() {
        let point = 0;
        this.coordinates = [];

        while (this.coordinates.length < this.count) {
            this.coordinates.push(point);
            point -= this.width;
        }
    }

    //* Initialization navigation buttons and indicators
    initControl() {
        this.navigation = this.gallery.querySelector('.slider__navigation');
        this.indicators = this.gallery.querySelector('.slider__indicators');

        if (this.options.navigation === true) {
            this.btnPrev = this.navigation.querySelector('.slider__button--prev');
            this.btnNext = this.navigation.querySelector('.slider__button--next');

            this.setNavigationStyle();
            this.navigation.dataset.hidden = false;
        } else {
            this.navigation.dataset.hidden = true;
        }

        if (this.options.indicators === true) {
            this.createIndicators();
            this.indicators.dataset.hidden = false;
        } else {
            this.indicators.dataset.hidden = true;
        }
    }

    //* Add adaptive for the slider
    setAdaptiveOptions() {
        const width = document.documentElement.clientWidth;
        const points = [];
        let point;

        for (let key in this.options.adaptive) {
            points.push(key);
        }

        //* Determine the control point based on the width of the document
        for (let i = 0; i < points.length; i++) {
            let a = points[i];
            let b;

            if (points[i + 1] !== undefined) {
                b = points[i + 1];
            } else {
                b = points[i];
            }

            if (width <= points[0]) {
                point = points[0];
            } else if (width >= a && width < b) {
                point = a;
            } else if (width >= points[points.length - 1]) {
                point = points[points.length - 1];
            }
        }

        const setting = this.options.adaptive[point];

        for (let key in setting) {
            this.options[key] = setting[key];
        }
    }

    //* Add styles for navigation buttons
    setNavigationStyle() {
        this.btnPrev.classList.remove('disable');
        this.btnNext.classList.remove('disable');

        if (this.current === 0) {
            this.btnPrev.classList.add('disable');
        } else if (this.current >= (this.count - this.options.visibleItems)) {
            this.btnNext.classList.add('disable');
        }
    }

    //* Create and add indicators
    createIndicators() {
        this.dots = [];
        this.indicators.innerHTML = '';

        const li = document.createElement('li');
        let i = 0; 
        let point = 0; 
        let clone;

        while (i < this.count) {
            clone = li.cloneNode(true);
            this.indicators.appendChild(clone);
            this.dots.push(clone);

            i += this.options.visibleItems;

            if (i <= this.max) {
                point = point - this.width * this.options.visibleItems;
            } else {
                point = -this.width * this.max;
            }
        }

        this.setIndicatorsStyle();
    }

    //* Add styles for indicators
    setIndicatorsStyle() {
        for (let dot of this.dots) {
            dot.classList.remove('active');
        }

        let activeIndicator;

        if (this.next < this.max) {
            activeIndicator = Math.trunc(this.next / this.options.visibleItems);
        } else {
            activeIndicator = this.dots.length - 1;
        }

        this.dots[activeIndicator].classList.add('active');
    }

    //* Add events
    registerEventsHandler() {
        window.addEventListener('resize', this.resize.bind(this));
        this.navigation.addEventListener('click', this.navigationControl.bind(this));
        this.indicators.addEventListener('click', this.indicatorsControl.bind(this));

        this.events = true;
    }

    //* Resize slider
    resize() {
        clearTimeout(this.resizeTimer);

        this.resizeTimer = setTimeout(() => {
            this.init();

            if (this.current <= this.max) {
                this.current = this.current;
            } else {
                this.current = this.max;
            }

            let currentCoordinate = this.coordinates[this.current];
            this.scroll(currentCoordinate, this.options.baseTransition);

        }, this.options.delayTimer);
    }

    //* Buttons slider control
    navigationControl(evt) {
        let direction;

        if (evt.target.dataset.shift === 'next') {
            direction = 1; //* next
        } else {
            direction = -1; //* prev
        }

        const xCoordinate = this.getNextCoordinates(direction);

        this.scroll(xCoordinate, this.options.baseTransition);
    }

    //* Indicators slider control
    indicatorsControl(evt) {
        const i = this.dots.indexOf(evt.target);

        this.next = i * this.options.visibleItems;

        if (this.next <= this.max) {
            this.next = this.next;
        } else {
            this.next = this.max;
        }

        const xCoordinate = this.coordinates[this.next];
        const numberOfElements = Math.abs(this.current - this.next);
        const ANIMATION_BOOST = 0.05;
        const extraTimeAnimation = this.options.baseTransition + numberOfElements * ANIMATION_BOOST;

        this.scroll(xCoordinate, extraTimeAnimation);
    }

    //* Scrolling the slider
    getNextCoordinates(direction) {
        if (this.options.autoScroll && this.current >= this.count - this.options.visibleItems) {
            this.next = 0;
        } else {
            if (this.current === 0 && direction === -1 || (this.current >= this.max) && direction === 1) {
                return;
            } 

            this.next += direction;
        }

        return this.coordinates[this.next];
    }

    scroll(x, transition) {
        this.sliderLine.style.cssText = `width:${this.widths}px;  transform:translateX(${x}px); transition:${transition}s`;

        if (this.next < this.max) {
            this.current = this.next;
        } else {
            this.current = this.max;
        }

        if (this.options.navigation) {
            this.setNavigationStyle();
        }

        if (this.options.indicators) {
            this.setIndicatorsStyle();
        }
    }
}

//* Import values to the gallery and create slider
const galleries = document.querySelectorAll('.slider__gallery');

for (let gallery of galleries) {
    const setting = {
        importValues: {
            adaptive: {
                1036: {
                    navigation: true,
                    visibleItems: 1,
                },
                1037: {
                    visibleItems: 2,
                },
                1440: {
                    visibleItems: 3
                }
            }
        }
    };
    
    const setup = gallery.dataset.setting;

    const createSlider = () => {
        new Slider(gallery, setting[setup]);
    }

    createSlider();
}
