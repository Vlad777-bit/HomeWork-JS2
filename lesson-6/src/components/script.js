// let app = new Vue({
//     el: '#app',

//     data: {
//         catalogItems: [],
//         basketItems: [],
//         basketAmount: '',
//         showBasket: false,
//         catalogUrl: 'https://raw.githubusercontent.com/Vlad777-bit/static/master/JSON/JS2-JSON/catalog.json',
//         basketUrl: 'https://raw.githubusercontent.com/Vlad777-bit/static/master/JSON/JS2-JSON/basket.json'
//     },

//     methods: {
//         get(url) {
//             return fetch(url).then(data => data.json());
//         },

//         add(item) {
//             console.log('added ' + item.product_name)
//             this.basketItems.push(item)
//             item.quantity += 1
//             this.basketAmount += item.price
//         },

//         remove(item) {
//             console.log('removed ' + item.product_name)
//             this.basketItems.splice(item, 1)
//             item.quantity -= 1
//             this.basketAmount -= item.price
//         },

//         filterGoods(value)  {
//             const regexp = new RegExp(value, 'i');
//             this.filteredGoods = this.goods.filter(item => regexp.test(item.product_name));
//             this.render();
    
//             let searchButton = document.querySelector('.search_btn');
//             let searchInput = document.querySelector('.search');
    
//             searchButton.addEventListener('click', (e) => {
//                 let value = searchInput.value;
//                 // console.log(value)
//                 catalog.filterGoods(value);
//             });
              
//         }
//     },

//     async mounted() {
//         try {
//             this.catalogItems = await this.get(this.catalogUrl);
//             this.basketItems = await this.get(this.basketUrl);
//             this.basketAmount = this.basketItems.amount;
//             this.basketItems = this.basketItems.contents;
//         }
//         finally {
//             console.log('data loaded');
//             console.log(this.basketItems)
//         }
//     },
// });

Vue.component('search', {
    template:
    `
    <label class="form">
        <input type="text" class="search" placeholder="Что искать?" v-model="search">
        <input type="submit" class="btn search_btn" value="Поиск" @click="filteredGoods">
    </label>
    `,
    data() {
        return {
            search: ''
        } 
    },
    methods: {
        filteredGoods() {
            this.$emit('search', this.search);
        }
    }
})

Vue.component('catalog', {
    template: 
    `
    <div id="catalog">
        <catalog-item
            v-for="(item, id) in filteredGoods" 
            :key="\`goods_\${id}\`" 
            :name="item.product_name" 
            :price="item.price"  
            :on-click="() => deleteItem(id)">
        </catalog-item>
    </div>
    `,
    data() {
        return {
            goods: []
        } 
    },
    props: ['filter'],
    computed: {
        filteredGoods() {
            return this.filter ? [...this.goods.filter(({product_name}) => product_name.includes(this.filter))] : [...this.goods];  
        }
    },
    methods: {
        deleteItem(id) {
            this.goods.splice(id, 1)
        }
    },
    mounted() {
        fetch(
            'https://raw.githubusercontent.com/Vlad777-bit/static/master/JSON/JS2-JSON/catalog.json'
        ).then(res => res.json()).then(res => this.goods = [...res, ...res, ...res]);
    }
})

Vue.component('catalog-item', {
    template:
    `
        <div class="item">
            <img src="http://unsplash.it/180/150?random&gravity=center" alt="#"> 
            <h3>{{ name }}</h3>
            <p>{{ price }} руб.</p>
            <button class="btn item__btn" @click="onClick">Добавить</button>
        </div>
    `,
    props: ['name', 'price', 'onClick']
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