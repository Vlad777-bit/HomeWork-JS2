'use strict';
  
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
     */
    constructor(goods = []) {
        this.goods = goods;
        this.url = 'https:raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
    }

    /**
     * Метод async getGoods:
     * Принимает url с псевдосервера
     * Переделывает его из json формата в object
     * Распределяет товары для класса GoodsItem
     * Рендерит HTML разметку каталога
     * Записывает разметку в #catalog
     */
    async getGoods() {
        const res = await fetch(this.url)
        const data = await res.json()
        const getGoods = await data.map(item => new GoodsItem(item.product_name, item.price))
        const catalogList = getGoods.map(item => item.renderCatalog()).join('')
        document.querySelector('#catalog').insertAdjacentHTML('afterbegin', catalogList)

        //=============================================================================================================//

        // fetch(
        //     'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
        // )
        // .then(res => res.json())
        // .then(res => { 
        //     this.goods = res.map(item => new GoodsItem(item.product_name, item.price));
        // }).then(() => {
        //     let catalogList = this.goods.map(item => item.renderCatalog()).join('')
        //     document.querySelector('#catalog').insertAdjacentHTML('afterbegin', catalogList)
        // })     
    }
}

class GoodsBasketItems extends GoodsItem {
    /**
     * 
     * @param {string} product_name - название товаров корзины
     * @param {number} price - цена товаров корзины
     * @param {number} quantity - кол-во товаров корзины
     */
    constructor(product_name, price, quantity) {
        super(product_name, price, quantity);
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
                    <h4>${this.product_name}</h4>
                    <span class="price">${this.quantity} * ${this.price}</span>
                </div>
                <button class="btn basket__del">X</button>
            </div>
        `;
    }
}

class Basket extends Catalog {
    constructor(goods = [], amount = 0) {
        super(goods)
        this.amount = amount;
        this.url = 'https:raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'
    }

    /**
     * Метод async getGoods:
     * Принимает url с псевдосервера
     * Переделывает его из json формата в object
     * Записывает общую сумму товаров
     * Распределяет товары для класса GoodsBasketItems
     * Рендерит HTML разметку каталога
     * Записывает разметку в #catalog
     */

    async getGoods() {
        const res = await fetch(this.url)
        const data = await res.json()
        const getAmmount = await data.amount
        const getGoods = await data.contents.map(item => new GoodsBasketItems(item.product_name, item.price))
        const basketList = getGoods.map(item => item.renderBasket()).join('')
        document.querySelector('#basket').insertAdjacentHTML('afterbegin', basketList)
        document.querySelector('.amount').innerText = getAmmount;
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
catalog.getGoods(); 


const basket = new Basket();
basket.getGoods();
basket.handleEvents();





