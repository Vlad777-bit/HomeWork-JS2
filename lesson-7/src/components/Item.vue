<template>
    <div :class="computedClass">
        <template v-if="itemType === 'catalog'">
            <img src="http://unsplash.it/180/150?random&gravity=center" alt="#"> 
            <h3>{{ item.product_name }}</h3>
            <p>{{ item.price }} руб.</p>
            <button 
                class="btn catalog__item-btn"
                name="buy"
                @click="add(item)"
            >
                Добавить
            </button>
        </template>

        <template v-else-if="itemType === 'basket'">    
            <div class="basket__img">
                <img src="http://unsplash.it/180/150?random&gravity=center" alt="">
            </div>
            <div class="basket__info">
                <h4>{{ item.product_name }}</h4>
                <span class="price">{{ item.quantity }} * {{ item.price }}</span>
            </div>
            <button 
                name="basket__del"
                class="btn basket__del" 
                @click="$parent.remove(item)"
            >
                &times;
            </button>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        itemType: {
            type: String
        },
        item: {
            type: Object
        }
    },
    methods: {
        add(item) {
            this.$parent.$emit('add', item)
        }
    },
    computed: {
        computedClass() {
            return this.itemType === 'basket' ? 'basket__item' : 'catalog__item'
        }
    }
}
</script>