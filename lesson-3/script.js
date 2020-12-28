'use strict';

function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
        let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(callback(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
      });
}

class GoodsItem {
    /**
     * 
     * @param {string} product_name - название товара
     * @param {number} price - цена товара
     * @param {number} quantity - кол-во 
     */
    constructor(product_name, price, quantity = 1) {
        this.product_name = product_name;
        this.price = price;
        this.quantity = quantity;
    }

    /**
     * Метод рендерит HTML разметку каталога товаров
     */
    renderCatalog() {
        return `
            <div class="item">
                <img src="http://unsplash.it/180/150?random&gravity=center" alt="img">    
                <h3>${this.product_name}</h3>
                <span>Quantity - ${this.quantity}</span>  
                <p>Price - ${this.price}</p>
                <button class="btn item__btn">Добавить</button>
            </div>
        `;
    }
}

class Catalog {
    /**
     * 
     * @param {array} goods - массив товаров 
     * @param {number} sum - сумма товаров
     */
    constructor(goods = [], sum = 0) {
        this.goods = goods;
        this.sum = sum;
    }

    /**
     * Метод инициализирует товары
     */
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            cb();
        })
    }

    /**
     * Метод рендерит товары из метода fetchGoods в уже созданную HTML разметку 
     */
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.quantity);
            listHtml += goodItem.renderCatalog();
        });
        document.querySelector('#catalog').insertAdjacentHTML('afterbegin', listHtml);
    }

    /**
     * Метод, определяющий суммарную стоимость всех товаров
     * Закомментированный код определяет стоимость товаров * на их количество
     */
    // calcSum() {
    //     this.goods.forEach(good => this.sum += good.price * good.quantity);
    //     // this.goods.forEach(good => this.sum += good.price);
    //     document.querySelector('.totalOfAllProducts').insertAdjacentHTML('beforeend', this.sum);
    // }
}

// class GoodsBasketItems extends GoodsItem {
//     /**
//      * 
//      * @param {string} product_name - название товаров корзины
//      * @param {number} price - цена товаров корзины
//      * @param {number} quantity - кол-во товаров корзины
//      */
//     constructor(product_name, price, quantity) {
//         super(product_name, price, quantity);
//     }

//     /**
//      * Метод рендерит HTML разметку корзины
//      */
//     renderBasket() {
//         return `
//             <div class="basket__item">
//                 <div class="basket__img">
//                     <img src="http://unsplash.it/180/150?random&gravity=center" alt="img">    
//                 </div>
//                 <div class="basket__info">
//                     <h4>${this.product_name}</h4>
//                     <span class="amount">${this.quantity} * ${this.price}</span>
//                 </div>
//                 <button class="btn basket__del">X</button>
//             </div>
//         `;
//     }
// }

// class Basket {
//     constructor(basketGoods = [], amount = 0) {
//         this.basketGoods = basketGoods;
//         this.amount = amount;
//     }

//     /**
//      * Метод инициализирует начальные товары в корзине
//      */
//     fetchGoodsInBasket(cb) {
//         makeGETRequest(`${API_URL}/getBasket.json`, (basketGoods) => {
//             this.basketGoods = JSON.parse(basketGoods);
//             cb();
//         })
//     }

//     /**
//      * Метод рендерит товары из метода fetchGoodsInBasket в уже созданную HTML разметку корзины
//      */
//     render() {
//         let listHtml = '';
//         this.basketGoods.forEach(good => {
//             const basketItem = new GoodsBasketItems(good.product_name, good.price, good.quantity);
//             listHtml += basketItem.renderBasket();
//         });
//         document.querySelector('#basket').insertAdjacentHTML('afterbegin', listHtml);
//     }

//     /**
//      * Метод, определяющий суммарную стоимость всех товаров находящихся в корзине
//      */
//     // calcSum() {
//     //     this.basketGoods.forEach(good => this.amount += good.quantity * good.price);
//     //     document.querySelector('.amount').innerText = this.amount;
//     // }

//     /**
//      * Метод позволяет при клике открывать корзину
//      */
//     handleEvents() {
//         const basket = document.querySelector('#basket');

//         const basketBtn = document.querySelector('#basketBtn');
//         basketBtn.addEventListener('click', el => basket.classList.toggle('hidden'));
//     }

//     /**
//      * Метод позволяет добавлять товар в корзину
//      */
//     add() {}

//     /**
//      * Метод позволяет удалить товар из корзины
//      */
//     remove() {}
// }



const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const catalog = new Catalog();
catalog.fetchGoods(() => catalog.render());
// catalog.calcSum();

// const basket = new Basket();
// basket.fetchGoodsInBasket(() => basket.render());
// // basket.fetchGoodsInBasket();
// // basket.render();
// basket.handleEvents();
// // basket.calcSum();