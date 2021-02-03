<template>
    <div>
        <button id="basketBtn" 
            class="btn"
            @click="isShow = !isShow"
        >
            Корзина
        </button>
        <div class="basket" v-show="isShow">
            <item  
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
            // url: 'https://raw.githubusercontent.com/Vlad777-bit/static/master/JSON/JS2-JSON/basket.json',
            isShow: false
        }
    },
    methods: {
        add(item) {
            let find = this.items.find(el => el.id_product === item.id_product)
            if (!find) {
                this.items.push(Object.assign({}, item, { quantity: 1 }))
            } else {
                find.quantity++
            }
        },
        remove(item) {
            let find = this.items.find(el => el.id_product === item.id_product)
            if (find.quantity > 1) {
                find.quantity--
            } else {
                this.items.splice(this.items.indexOf(find), 1)
            }
        }
    },
    mounted() {
        this.$parent.get(this.url).then(d => this.items = d.contents)
    }
}
</script>