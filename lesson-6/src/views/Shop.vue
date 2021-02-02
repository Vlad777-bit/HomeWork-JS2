<template>
    <div>
        <header class="header">
            <!-- <div class="form">
                <input type="text" class="search" placeholder="Что искать?"> 
            </div> -->
            <search v-on:search="filteredGoods"></search>
        </header>
        <main class="container">
            <catalog 
                @add="addItem" 
                :filter="search"
            />

            <basket ref="basket"/> 
        </main> 
    </div>
</template>

<script>
import Search from '../components/Search.vue'
import Catalog from '../components/Catalog.vue'
import Basket from '../components/Basket.vue'

export default {
    components: {
        'catalog': Catalog,
        'basket': Basket,
        'search': Search

    },
    data() {
        return {
            search: ''
        }
    },
    props: {},
    methods: {
        addItem(item) {
            this.$refs.basket.add(item)
        },
        get(url) {
            return fetch(url).then(data => data.json())
        },
        filteredGoods(search){
            this.search = search;
        }
    },
    mounted() {},
}
</script>

