function slider() {
    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1,
        offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }
    // Задаем ширину ленте слайдера умножаем 100% на количество слайдов
    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach(slide => {
        // выставляем ширину каждому слайду, ширина равна обертке сладера,
        // она будет окном для показа ленты сладера
        slide.style.width = width;
    });

    // Создаем точки
    const dots = document.createElement('ol'),
        //создаем массив для помещения туда ново-созданных 'li'
        pagination = [];
    dots.classList.add('carousel-indicators');
    // ИнлайнСтили можно задавать и через cssText
    // dots.style.cssText = `
    //     position: absolute;
    //     right: 0;
    //     bottom: 0;
    //     left: 0;
    //     z-index: 15;
    //     display: flex;
    //     justify-content: center;
    //     margin-right: 15%;
    //     margin-left: 15%;
    //     list-style: none;
    // `;
    // Вставляем ордеред лист в блок слайдер.
    slider.append(dots);


    // const widthReplased = +width.replace(/\D/gi, '');

    // Запускаем цикл основанный на кол-ве слайдов, на каждой итерации создаем элемент ордеред листа 'li'
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        // Устанавливаем Лишкам атрибут, и прибавляем единицу что бы счет начинался с 1, а не 0
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        // Устанавливаем начальный слайд в активное состаяние
        if (i === 0) {
            dot.style.opacity = 1;
        }
        // Вставляем новосоданную Лишку в Ордеред Лист
        dots.append(dot);
        // Пушим Лишку в искуственно созданый массив
        pagination.push(dot);
    }

    function activePagination() {
        pagination.forEach(item => item.style.opacity = '0.5');
        // Отниаем от индекса сладера 1 т.к. устанавливаем значение в 1, а не 0
        pagination[slideIndex - 1].style.opacity = 1;
    }

    function renderNumCurrentSlide() {
        // Если количество сладов меньше 10 то в начало добавляем 0
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

    }

    function setTranslate() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    next.addEventListener('click', () => {
        //При клике на на стрелку слудующий, если лента доходит до ширины обертки 
        // слайдера умноженой на количесвто сладов - 1 
        // т.к. нам нужно показать 1 слайд, то устанавливам отступ в 0 
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            // если нет то к отступу прибавляем ширину слайда, до тех пор пока не выполнится условие
            offset += +width.slice(0, width.length - 2);
        }

        setTranslate();

        // При кликах если индекс слайдов становится равен последнему слайду в массиве,
        // то устанавливаем индекс в 1
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        renderNumCurrentSlide();

        activePagination();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        setTranslate();

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        renderNumCurrentSlide();

        activePagination();
    });

    pagination.forEach(item => {
        item.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            setTranslate();

            activePagination();

            renderNumCurrentSlide();
        });
    });
}

module.exports = slider;