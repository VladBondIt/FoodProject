
// OBJECT CARDS

// const cardsParent = document.querySelector('.menu__field .container');

// class card {
//     constructor(imgUrl, alt, heading, text, cost) {
//         this.img = imgUrl;
//         this.alt = alt;
//         this.heading = heading;
//         this.text = text;
//         this.cost = cost;
//     }
// }

// const fitness = new card(`img/tabs/vegy.jpg`, 'vegy', `Меню "Фитнес"`,
//     `Меню "Фитнес" - это новый подход к приготовлению блюд: больше 
//  свежих овощей и фруктов. Продукт активных и здоровых людей. 
//  Это абсолютно новый продукт с 
//  оптимальной ценой и высоким качеством!`, 229);

// cardsParent.innerHTML = '';

// function renderItem(x) {
//     cardsParent.innerHTML += `
//         <div class="menu__item">
//             <img src="${x.img}" alt="${x.alt}">
//             <h3 class="menu__item-subtitle">${x.heading}</h3>
//             <div class="menu__item-descr">${x.text}</div>
//             <div class="menu__item-divider"></div>
//             <div class="menu__item-price">
//                 <div class="menu__item-cost">Цена:</div>
//                 <div class="menu__item-total"><span>${x.cost}</span> грн/день</div>
//             </div>
//         </div>
//     `;
// }
// renderItem(fitness);