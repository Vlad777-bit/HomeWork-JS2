<template>
    <div>
        <button id="basketBtn" 
            class="btn"
            @click="isShow = !isShow"
        >
            Корзина
        </button>
        <div class="basket" v-show="isShow">
        <p class="center" v-if="this.items.length == 0">Корзина пуста</p>    
            <item  
                v-else
                v-for="item in items" 
                :key="item.id_product"
                itemType="basket"
                :item="item"
            /> 
        </div>
    </div>
</template>

<script>
import item from './Item.vue'

export default {
    components: { item },
    data() {
        return {
            items: [],
            url: '/api/basket',
            isShow: false

        }
    },
    methods: {
        add(item) {
            let find = this.items.find(el => el.id_product === item.id_product);
            if (!find) {
                let newItem = Object.assign({}, item, {quantity: 1});
                this.$parent.post(this.url, newItem)
                .then(res => {
                    if (res.status) {
                        this.items.push(newItem);
                    } else {
                        console.log('ERR_ADD_ITEM:' + newItem.product_name);
                    }
                })
            } else {
                this.$parent.put(`/api/basket/${item.id_product}`, { amount: 1 })
                .then(res => {
                    if (res.status) {
                        find.quantity++;
                    } else {
                        console.log('ERR_ADD_ITEM:' + item.product_name);
                    }
                })
            }
        },
        remove(item) {
            let find = this.items.find(el => el.id_product === item.id_product);
            if (find.quantity > 1) {
                this.$parent.put(`/api/basket/${item.id_product}`, { amount: -1 })
                .then(res => {
                    if (res.status) {
                        find.quantity--;
                    } else {
                        console.log('ERR_REMOVE_ITEM:' + item.product_name);
                    }
                })
            } else {
                this.$parent.delete(`/api/basket/${item.id_product}`)
                .then(res => {
                    if (res.status) {
                        this.items.splice(this.items.indexOf(find), 1);
                    } else {
                        console.log('ERR_REMOVE_ITEM:' + item.product_name);
                    }
                })
            }
        },
    },
    mounted() {
        this.$parent.get(this.url).then(d => this.items = d.contents)
    }
}
</script>