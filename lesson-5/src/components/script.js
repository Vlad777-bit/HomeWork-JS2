let app = new Vue({
    el: '#app',

    data: {
        catalogItems: [],
        basketItems: [],
        basketAmount: '',
        showBasket: false,
        catalogUrl: 'https://raw.githubusercontent.com/Vlad777-bit/static/master/JSON/JS2-JSON/catalog.json',
        basketUrl: 'https://raw.githubusercontent.com/Vlad777-bit/static/master/JSON/JS2-JSON/basket.json'
    },

    methods: {
        get(url) {
            return fetch(url).then(data => data.json());
        },

        add(item) {
            console.log('added ' + item.product_name)
            this.basketItems.push(item)
            item.quantity += 1
            this.basketAmount += item.price
        },

        remove(item) {
            console.log('removed ' + item.product_name)
            this.basketItems.splice(item, 1)
            item.quantity -= 1
            this.basketAmount -= item.price
        },

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
    },

    async mounted() {
        try {
            this.catalogItems = await this.get(this.catalogUrl);
            this.basketItems = await this.get(this.basketUrl);
            this.basketAmount = this.basketItems.amount;
            this.basketItems = this.basketItems.contents;
        }
        finally {
            console.log('data loaded');
            console.log(this.basketItems)
        }
    },
});