<template>
    <div class="col-md-3">
        <div class="list-group sticky-top">
            <a class="list-group-item list-group-item-action" :class="{'active' : category == index}"
            data-toggle="list" href="#" @click.prevent="activeCategory(index)"
            v-for="(item, index) in categories" :key="index">{{item}}</a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        category: Number
    },
    data() {
        return {
        }
    },
    methods: {
        activeCategory(index = 0) {
            this.$store.dispatch('activeCategory', index)
        }
    },
    computed: {
        categories() {
            return this.$store.state.categories;
        }
    },
    created() {
        this.activeCategory();
    }
}
</script>