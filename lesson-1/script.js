const goods = [
    {title: 'Shirt',   price: 100, quantity: 10},
    {title: 'Shirt_1', price: 1000, quantity: 1},
    {title: 'Shirt_2', price: 10000, quantity: 0},
    {title: 'Shirt_3', price: 10, quantity: 100},
    {title: 'Shirt_4', price: 500, quantity: 15},
    {title: 'Shirt_5', price: 800, quantity: 0},
    {title: 'Shirt_6', price: 9000, quantity: 2},
    {title: 'Shirt_7', price: 8900, quantity: 7},
    {title: 'Shirt_8', price: 550, quantity: 15},
    {title: 'Shirt_9', price: 900, quantity: 0},
    {title: 'Shirt_10', price: 9100, quantity: 2},
    {title: 'Shirt_11', price: 8600, quantity: 7},
];

const goodsInBasket = [
    {title: 'Shirt',   price: 100, quantity: 10},
    {title: 'Shirt_1', price: 1000, quantity: 1},
];

const basket = document.querySelector('#basket');
const basketBtn = document.querySelector('#basketBtn');
const catalog = document.querySelector('#catalog');

function renderGoodsItem({title, price}) {
    return `
    <div class="item">
        <img src="http://unsplash.it/150/150?random&gravity=center" alt="img">    
        <h3>${title}</h3>
        <p>${price}</p>
        <button class="btn item__btn">Добавить</button>
    </div>
    `;
}

function renderBasketOfGoods({title, price, quantity}) {
    return  `
    <div class="basket__item">
        <div class="basket__img">
            <img src="http://unsplash.it/150/150?random&gravity=center" alt="img">    
        </div>
        <div class="basket__info">
            <h4>${title}</h4>
            <span class="price">${quantity} * ${price}</span>
        </div>
        <button class="btn basket__del">X</button>
    </div>
    `;
}

const renderItemsCatalog = items => items.map(renderGoodsItem).join('');
catalog.innerHTML = renderItemsCatalog(goods);

const renderItemsBasket = items => items.map(renderBasketOfGoods).join('');
basket.innerHTML = renderItemsBasket(goodsInBasket);

basketBtn.addEventListener('click', el => basket.classList.toggle('hidden'));





