<template>
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
</template>

<script>
export default {
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
}
</script>