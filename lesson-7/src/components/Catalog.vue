<template>
    <div class="catalog">
        <item 
            itemType="catalog" 
            v-for="item in filteredGoods"
            :item="item" 
            :key="item.id_product"
        />
    </div>
</template>

<script>
import search from './Search.vue'
import item from './Item.vue'

export default {
    components: { item, search },
    data() {
        return {
            items: [],
            url: 'https://raw.githubusercontent.com/Vlad777-bit/static/master/JSON/JS2-JSON/catalog.json'
        }
    },
    mounted() {
        this.$parent.get(this.url).then(d => {
            this.items = d
        })
    },
    props: ['filter'],
    computed: {
        filteredGoods() {
            return this.filter ? [...this.items.filter(({ product_name }) => product_name.includes(this.filter))] : [...this.items];  
        }
    }
}
</script>