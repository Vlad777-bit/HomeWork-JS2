'use strict';

class List {
    constructor(url, container, basket) {
        this.url = 'https://raw.githubusercontent.com/Vlad777-bit/static/master/JSON/JS2-JSON' + url;
        this.container = container;
        this.items = [];
        this._init(basket);
    }

    _init(basket = false) {
        this._get(this.url)
            .then(data => {
                this.items = !basket ? data : data.contents;
                this._render();
                this._handleEvents();
                this.filItems = data

            })
    }

    _get(url) {
        return fetch(url).then(data => data.json());
    }

    _render() {
        let htmlStr = this.items.map(item => new connect[this.constructor.name](item).render())
        document.querySelector(this.container).innerHTML = htmlStr.join('')
    }

    _handleEvents() {
        return ''
    }
}

class Item {
    constructor(item) {
        this.item = item;   
    }

    render() {
        return `
        <div class="item">
            <img src="http://unsplash.it/180/150?random&gravity=center" alt="img">    
            <h3>${this.item.product_name}</h3>
            <p>Price - ${this.item.price}</p>
            <button 
                class="btn item__btn"
                name="buy"
                data-id="${this.item.id_product}"
                data-name="${this.item.product_name}"
                data-price="${this.item.price}"
            >Добавить</button>
        </div>
        `
    }
}

class Catalog extends List {
    constructor(basket, url = '/catalog.json', container = '#catalog', filItems = []) {
        super(url, container);
        this.basket = basket;
        this.filItems = filItems
        this.filterGoods();
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', evt => {
            if (evt.target.name == 'buy') {
                this.basket.add(evt.target.dataset);
            }
        })
    }

    // отсюда

    filterGoods(value) {
        this._get(this.url)
            .then(data => {
                this.filItems = data
            })

        const regexp = new RegExp(value, 'i');
        let filtredItem = this.filItems.filter(item => regexp.test(item.product_name))
        
        let renderFiltredItem = filtredItem.map(item => new connect[this.constructor.name](item).render())
        document.querySelector(this.container).innerHTML = renderFiltredItem.join('')
    
        document.querySelector('.search_btn').addEventListener('click', (e) => {
            let value = document.querySelector('.search').value;
            this.filterGoods(value);
        });
    }

    // досюда
}



class Basket extends List {
    constructor(url = '/basket.json', container = '#basket', basket = true) {
        super(url, container, basket);
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', evt => {
            if (evt.target.name == 'remove') {
                this.remove(evt.target.dataset.id)
            }
        })

        document.querySelector('#basketBtn').addEventListener('click', () => {
            document.querySelector('#basket').classList.toggle('hidden')
        })
    }

    add(item) {
        let find = this.items.find(el => el.id_product == item.id);
        if (find) {
            find.quantity++;
            this._render();
        } else {
            let newItem = {
                    id_product: item.id,
                    product_name: item.name,
                    price: +item.price,
                    quantity: 1 
                };
            this.items.push(newItem);
            this._render();
        }
    }

    remove(itemId) {
        let find = this.items.find(el => el.id_product == itemId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.items.splice(this.items.indexOf(find), 1)
        }
        this._render();
    }
}

class CatalogItem extends Item {}

class BasketItem extends Item {
    constructor(item) {
        super(item)
    }

    render() {
        return `
            <div class="basket__item">
                <div class="basket__img">
                    <img src="http://unsplash.it/180/150?random&gravity=center" alt="img">    
                </div>
                <div class="basket__info">
                    <h4>${this.item.product_name}</h4>
                    <span class="price">${this.item.quantity} * ${this.item.price}</span>
                </div>
                <button 
                    class="btn basket__del"
                    data-id="${this.item.id_product}"
                    name="remove"
                >&times;</button>
            </div>
        `;
    }
}

let connect = {
    'Catalog': CatalogItem,
    'Basket': BasketItem
}

let basket = new Basket();
let catalog = new Catalog(basket);




