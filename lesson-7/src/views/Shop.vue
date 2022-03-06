<template>
    <div>
        <header class="header">
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
         post(url, obj) {
            return fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj)
            }).then(data => data.json());
        },
        put(url, obj) {
            return fetch(url, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj)
            }).then(data => data.json());
        },
        delete(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }
            }).then(data => data.json());
        },
        filteredGoods(search){
            this.search = search;
        }
    },
    mounted() {},
}
</script>

