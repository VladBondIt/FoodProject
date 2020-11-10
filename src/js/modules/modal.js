function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    // clearInterval(modalTimerId);
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    // modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalTriggers = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);


    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => openModal(modalSelector, modalTimerId));

    });


    // Проделигировали событие на ново-созданный дочерний крестик.
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (Math.ceil(window.pageYOffset) + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;

export { closeModal };
export { openModal };