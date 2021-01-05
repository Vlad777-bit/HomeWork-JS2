'use strict';

new Content = {
    data {

    }
}

Vue.createApp(Content).mount('#content')
















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
     * @param {number} id_product - id товара
     * @param {string} product_name - название товара
     * @param {number} price - цена товара
     */
    constructor(id_product, product_name, price) {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
    }

    /**
     * Метод рендерит HTML разметку каталога товаров
     */
    renderCatalog() {
        return `
            <div class="item">
                <img src="http://unsplash.it/180/150?random&gravity=center" alt="img">    
                <h3>${this.product_name}</h3>
                <p>Price - ${this.price}</p>
                <button 
                    class="btn item__btn"
                    data-id="${this.id_product}"
                    name="addToBasket"
                >Добавить</button>
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
        this.filteredGoods = [];
        this.url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
    }
    
    init() {
        this.fetchGoods(() => this.render())
        this.filterGoods()
    }

    fetchGoods(cb) {
        makeGETRequest(`${this.url}/catalogData.json`, (goods) => {
          this.goods = JSON.parse(goods);
          this.filteredGoods = JSON.parse(goods);
          cb();
        })
    }
    
    render() {
        let listHtml = '';
        this.filteredGoods.forEach((good) => {
            const catalogList = new GoodsItem(good.id_product, good.product_name, good.price);
            listHtml += catalogList.renderCatalog();
        })
        document.querySelector('#catalog').innerHTML = listHtml;
    }

    filterGoods(value)  {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(item => regexp.test(item.product_name));
        this.render();

        let searchButton = document.querySelector('.search_btn');
        let searchInput = document.querySelector('.search');

        searchButton.addEventListener('click', (e) => {
            let value = searchInput.value;
            // console.log(value)
            catalog.filterGoods(value);
        });
          
    }
}

class BasketItems {
    /**
     * 
     * @param {string} id_product - id товаров корзины
     * @param {string} product_name - название товаров корзины
     * @param {number} price - цена товаров корзины
     * @param {number} quantity - кол-во товаров корзины
     */
    constructor(id_product, product_name, price, quantity) {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.quantity = quantity;
    }

    /**
     * Метод рендерит HTML разметку корзины
     */
    renderBasket() {
        return `
            <div class="basket__item">
                <div class="basket__img">
                    <img src="http://unsplash.it/180/150?random&gravity=center" alt="img">    
                </div>
                <div class="basket__info">
                    <h4>${this.product_name}</h4>
                    <span class="price">${this.quantity} * ${this.price}</span>
                </div>
                <button 
                    class="btn basket__del"
                    data-id="${this.id_product}"
                    name="remove"
                >X</button>
            </div>
        `;
    }
}

class Basket {
    constructor(goods = [], amount = 0) {
        this.goods = goods;
        this.amount = amount;
        this.url = 'https:raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
    }

    /**
     * Метод инициализирует все методы класса
     */
    init() {
        this.fetchGoods(() => this.render())
        this.handleEvents()
    }

    fetchGoods(cb) {
        makeGETRequest(`${this.url}/getBasket.json`, (goods) => {
            this.goods = JSON.parse(goods);
            cb();
            
        })
    }

    render() {
        let listHtml = '';
        this.goods.contents.forEach((good) => {
            const basketList = new BasketItems(good.id_product, good.product_name, good.price, good.quantity);
            listHtml += basketList.renderBasket();
        })
        document.querySelector('#basket').insertAdjacentHTML('afterbegin', listHtml);
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
catalog.init();


const basket = new Basket();
basket.init();