<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end">
            <div class="container">
                <div class="p-3 bg-lighter">
                    <h1 class="display-3 font-weight-bold">買到剁手手！最後出清</h1>
                    <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its
                        parent.</p>
                </div>
            </div>
        </div>
        <div class="container main-contant mb-1">
            <div class="row">
                <sideBar :category="category"></sideBar>
                <div class="col-md-9">
                    <div class="d-flex mb-4">
                        <!-- Search bar -->
                        <form class="form-inline my-3 my-lg-0">
                            <div class="input-group">
                                <input class="form-control" type="text" placeholder="Search" aria-label="Search">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-warning" type="submit">
                                        <i class="fa fa-search" aria-hidden="true"></i> Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- 主要商品列表 (Card) -->
                    <div class="tab-content">
                        <div class="tab-pane" :class="{'active' : category == index}" v-for="(item, index) in categories" :key="index">
                            <div class="row">
                                <!-- 金牌 -->
                                <template v-for="_item in products">
                                    <div class="col-md-4 mb-4" :key="_item.id" v-if="_item.category == item">
                                        <div class="card border-0 box-shadow text-center h-100">
                                            <img v-if="_item.image" class="card-img-top"
                                                :src="_item.image"
                                                alt="Card image cap">
                                            <img v-else class="card-img-top"
                                                :src="_item.imageUrl"
                                                alt="Card image cap">
                                            <div class="card-body">
                                                <h4 class="card-title">{{_item.title}}</h4>
                                                <p class="card-text">{{_item.content}}</p>
                                            </div>
                                            <div class="card-footer border-top-0 bg-white">
                                                <router-link :to="`/product/${_item.id}`" class="btn btn-outline-secondary btn-block btn-sm">
                                                    <i class="fa fa-cart-plus" aria-hidden="true"></i> 搶購去
                                                </router-link>
                                                <!-- <a href="#" class="btn btn-outline-secondary btn-block btn-sm disabled">
                                                    缺貨中
                                                </a> -->
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <!-- pagination -->
                            <nav aria-label="Page navigation" class="my-5" v-if="pagination.total_page > 1">
                                <ul class="pagination justify-content-center">
                                    <li class="page-item disabled" :class="{disabled: !pagination.has_pre}">
                                        <a class="page-link" href="#" tabindex="-1" @click.prevent="getProducts(pagination.current_page - 1)">&laquo;</a>
                                    </li>
                                    <li class="page-item" v-for="num in pagination.total_page" :key="num">
                                        <a class="page-link" href="#">{{num}}</a>
                                    </li>
                                    <li class="page-item" :class="{disabled: !pagination.has_next}">
                                        <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page + 1)">&raquo;</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <!-- <div class="tab-pane" id="list-gift">
                            <div class="row align-items-stretch">
                                <div class="col-md-4 mb-4">
                                    <div class="card border-0 box-shadow text-center h-100">
                                        <img class="card-img-top"
                                            src="https://images.unsplash.com/photo-1482173074468-5b323335debe?w=1350"
                                            alt="Card image cap">
                                        <div class="card-body">
                                            <h4 class="card-title">超精緻禮物</h4>
                                            <p class="card-text">This is a longer card with supporting text below as a
                                                natural lead-in to additional content. This content
                                                is a little bit longer.</p>
                                        </div>
                                        <div class="card-footer border-top-0 bg-white">
                                            <a href="#" class="btn btn-outline-secondary btn-block btn-sm">
                                                <i class="fa fa-cart-plus" aria-hidden="true"></i> 搶購去
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <!-- tab-content end -->

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import sideBar from '../components/sideBar'
    export default {
        components: {
            sideBar
        },
        data() {
            return {
            }
        },
        methods: {
            getProducts(page = 1) {
                this.$store.dispatch('getProducts', page)
            },
        },
        computed: {
            isLoading() {
                return this.$store.state.isLoading;
            },
            products() {
                return this.$store.state.products;
            },
            pagination() {
                return this.$store.state.pagination;
            },
            category() {
                return this.$store.state.category;
            },
            categories() {
                return this.$store.state.categories;
            }
        },
        created() {
            this.getProducts()
        }
    }
</script>