Vue.component('search', {
    template:
    `
    <label class="form" name="search">
        <input type="text" 
            class="search" name="search" 
            placeholder="Что искать?" 
            v-model="search"
            v-on:keyup.enter="filteredGoods"
        >
        <button 
            class="search_btn"
            @click="clear"
            v-if="search.length >= 1"
        >
            X
        </button>
       
    </label>
    `,
    data() {
        return {
            search: '',
        } 
    },
    methods: {
        filteredGoods() {
            this.$emit('search', this.search);
        },
        clear() {    
            this.search = ''
        }
    }
})

Vue.component('catalog', {
    template: 
    `
    <div id="catalog">
        <catalog-item
            v-for="(item, id) in filteredGoods" 
            :key="\`catalogItems_\${id}\`" 
            :name="item.product_name" 
            :price="item.price" >
        </catalog-item>
    </div>
    `,
    data() {
        return {
            catalogItems: [],
            catalogUrl: 'https://raw.githubusercontent.com/Vlad777-bit/static/master/JSON/JS2-JSON/catalog.json',
        } 
    },
    props: ['filter'],
    computed: {
        filteredGoods() {
            return this.filter ? [...this.catalogItems.filter(({ product_name }) => product_name.includes(this.filter))] : [...this.catalogItems];  
        }
    },
    methods: {
        get(url) {
            return fetch(url).then(data => data.json());
        },
    },
    async mounted() {
        try {
            this.catalogItems = await this.get(this.catalogUrl);
        }
        catch (e) {
            throw('Произошла ошибка в Catalog - ' +  e);
        }
    }
})

Vue.component('catalog-item', {
    template:
    `
        <div class="item">
            <img src="http://unsplash.it/180/150?random&gravity=center" alt="#"> 
            <h3>{{ name }}</h3>
            <p>{{ price }} руб.</p>
            <button class="btn item__btn">Добавить</button>
        </div>
    `,
    props: ['name', 'price']
})

Vue.component('basket', {
    template:
    `
    <div>
        <button @click="isShow = !isShow" id="basketBtn" class="btn">
            Корзина
        </button>

        <div id="basket" v-show="isShow"> 
            <basket-item
                v-for="(item, id) in basketItems" 
                :key="\`basketItems_\${id}\`" 
                :name="item.product_name" 
                :price="item.price"  
                :quantity="item.quantity"
                :on-click="() => deleteItem(id)">
            </basket-item>
            <div id="basketSum">
                <span class="total">Total</span>
                <span class="amount">{{ basketAmount }}</span>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            basketUrl: 'https://raw.githubusercontent.com/Vlad777-bit/static/master/JSON/JS2-JSON/basket.json',
            basketItems: [],
            basketAmount: 0,
            isShow: false
        } 
    },
    methods: {
        get(url) {
            return fetch(url).then(data => data.json());
        },
        deleteItem(id) {
            this.basketItems.splice(id, 1)
        }
    },
    async mounted() {
        try {
            this.basketItems = await this.get(this.basketUrl);
            this.basketAmount = this.basketItems.amount;
            this.basketItems = this.basketItems.contents;
        }
        catch (e) {
            console.log('Произошла ошибка в Basket', e);
        }
    },

})

Vue.component('basket-item', {
    template:
    `
    <div class="basket__item">
        <div class="basket__img">
            <img src="http://unsplash.it/180/150?random&gravity=center" alt="">
        </div>
        <div class="basket__info">
            <h4>{{ name }}</h4>
            <span class="price">{{ quantity }} * {{ price }}</span>
        </div>
        <button class="btn basket__del" @click="onClick">&times;</button>
    </div>
    `, 
    props: ['name', 'price', 'quantity', 'onClick']
})

let app = new Vue({
    el: '#app',
    data: {
        search: ''
    },
    methods: {
        filteredGoods(search){
            this.search = search;
        }
    }
})