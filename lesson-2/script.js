'use strict';
class GoodsItem {
    /**
     * 
     * @param {string} title - название товара
     * @param {number} price - цена товара
     * @param {number} quantity - кол-во 
     */
    constructor(title, price, quantity = 1) {
        this.title = title;
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
                <h3>${this.title}</h3>
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
    fetchGoods() {
        this.goods = [
            {title: 'Shirt',   price: 100, quantity: 10},
            {title: 'Shirt_1', price: 1000, quantity: 1},
            {title: 'Shirt_2', price: 10000, quantity: 0},
            {title: 'Shirt_3', price: 10, quantity: 12},
            {title: 'Shirt_4', price: 500, quantity: 15},
            {title: 'Shirt_5', price: 800, quantity: 0},
            {title: 'Shirt_6', price: 9000, quantity: 2},
            {title: 'Shirt_7', price: 8900, quantity: 7},
            {title: 'Shirt_8', price: 550, quantity: 15},
            {title: 'Shirt_9', price: 900, quantity: 0},
            {title: 'Shirt_10', price: 9100, quantity: 2},
            {title: 'Shirt_11', price: 8600, quantity: 7},
        ];
    }

    /**
     * Метод рендерит товары из метода fetchGoods в уже созданную HTML разметку 
     */
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.quantity);
            listHtml += goodItem.renderCatalog();
        });
        document.querySelector('#catalog').insertAdjacentHTML('afterbegin', listHtml);
    }

    /**
     * Метод, определяющий суммарную стоимость всех товаров
     * Закомментированный код определяет стоимость товаров * на их количество
     */
    calcSum() {
        this.goods.forEach(good => this.sum += good.price * good.quantity);
        // this.goods.forEach(good => this.sum += good.price);
        document.querySelector('.totalOfAllProducts').insertAdjacentHTML('beforeend', this.sum);
    }
}

class GoodBasketItems extends GoodsItem {
    /**
     * 
     * @param {string} title - название товаров корзины
     * @param {number} price - цена товаров корзины
     * @param {number} quantity - кол-во товаров корзины
     */
    constructor(title, price, quantity) {
        super(title, price, quantity);
    }

    /**
     * Метод рендерит HTML разметку корзины
     */
    renderBasket() {
        return  `
            <div class="basket__item">
                <div class="basket__img">
                    <img src="http://unsplash.it/180/150?random&gravity=center" alt="img">    
                </div>
                <div class="basket__info">
                    <h4>${this.title}</h4>
                    <span class="price">${this.quantity} * ${this.price}</span>
                </div>
                <button class="btn basket__del">X</button>
            </div>
        `;
    }
}

class Basket {
    constructor() {
        this.basketGoods = [];
        this.sum = 0;
    }

    /**
     * Метод инициализирует начальные товары в корзине
     */
    fetchGoodsInBasket() {
        this.basketGoods = [
            {title: 'Shirt',   price: 100, quantity: 7},
            {title: 'Shirt_1', price: 1000, quantity: 3},
        ];
    }

    /**
     * Метод рендерит товары из метода fetchGoodsInBasket в уже созданную HTML разметку корзины
     */
    render() {
        let listHtml = '';
        this.basketGoods.forEach(good => {
            const basketItem = new GoodBasketItems(good.title, good.price, good.quantity);
            listHtml += basketItem.renderBasket();
        });
        document.querySelector('#basket').insertAdjacentHTML('afterbegin', listHtml);
    }

    /**
     * Метод, определяющий суммарную стоимость всех товаров находящихся в корзине
     */
    calcSum() {
        this.basketGoods.forEach(good => this.sum += good.quantity * good.price);
        document.querySelector('.sum').innerText = this.sum;
    }

    /**
     * Метод позволяет при клике открывать корзину
     */
    handleEvents() {
        const basket = document.querySelector('#basket');

        const basketBtn = document.querySelector('#basketBtn');
        basketBtn.addEventListener('click', el => basket.classList.toggle('hidden'));
    }

    /**
     * Метод позволяет добавлять товар в корзину
     */
    add() {}

    /**
     * Метод позволяет удалить товар из корзины
     */
    remove() {}




}

const catalog = new Catalog();
catalog.fetchGoods();
catalog.render();
catalog.calcSum();

const basket = new Basket();
basket.fetchGoodsInBasket();
basket.render();
basket.handleEvents();
basket.calcSum();




