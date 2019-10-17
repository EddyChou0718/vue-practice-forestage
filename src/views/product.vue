<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="container main-contant mb-1">
            <nav aria-label="breadcrumb" role="navigation">
                <ol class="breadcrumb bg-transparent pl-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首頁</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
                    <!-- <li class="breadcrumb-item">
                    <a href="#">金牌專賣店</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">金牌西裝</li> -->
                </ol>
            </nav>
            <div class="row">
                <div class="col-md-4 mb-5">
                    <div class="sticky-top" style="top: 10px;">
                        <h1 class="h2">{{product.title}}
                            <!-- <small class="text-muted">(加拉哈德版)</small> -->
                        </h1>
                        <div class="d-flex my-3 align-items-end justify-content-end">
                            <del class="text-muted">售價 {{product.origin_price | currency}}</del>
                            <div class="h3 mb-0 ml-auto text-danger">
                                <small>網路價 </small>
                                <strong>{{product.price | currency}}</strong>
                            </div>
                        </div>
                        <!-- <hr> 尺寸:
                        <div class="btn-group btn-group-sm btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-outline-secondary active">
                            <input type="radio" name="size" checked> SM
                            </label>
                            <label class="btn btn-outline-secondary">
                            <input type="radio" name="size"> M
                            </label>
                            <label class="btn btn-outline-secondary disabled">
                            <input type="radio" name="size" disabled> L
                            </label>
                            <label class="btn btn-outline-secondary">
                            <input type="radio" name="size"> XL
                            </label>
                        </div> -->

                        <div class="input-group mt-3">
                            <select name="" class="form-control mr-1" id="" v-model="productQty">
                                <option :value="num" v-for="num in 10" :key="num">{{num}} {{product.unit}}</option>
                            </select>
                            <button class="btn btn-primary" @click="addtoCart(product.id, productQty)">
                                <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車
                            </button>
                        </div>

                        <!-- <div class="mt-2 text-right text-muted">
                            <i class="fa fa-cc-visa" aria-hidden="true"></i>
                            <i class="fa fa-cc-jcb" aria-hidden="true"></i>
                            <i class="fa fa-cc-paypal" aria-hidden="true"></i>
                        </div> -->

                    </div>


                </div>
                <div class="col-md-8">
                    <h2>{{product.content}}</h2>
                    <p class="card-text">{{product.description}}</p>

                    <!-- <h3 class="mt-5 text-center">合身剪裁</h3> -->
                    <img v-if="product.imageUrl" :src="product.imageUrl" class="w-100" alt="">
                    <img v-if="product.image" :src="product.image" class="w-100" alt="">

                    <!-- <div class="alert alert-secondary mt-4" role="alert">
                        <h2 class="text-center">購物說明</h2>
                        <p>{{product.description}}</p>
                    </div> -->
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                productQty: 1,
            }
        },
        methods: {
            getProduct() {
                this.$store.dispatch('getProduct', this.$route.params.itemId)
            },
            addtoCart(id, qty = 1) {
                this.$store.dispatch('addtoCart', {id, qty})
            }
        },
        computed: {
            isLoading() {
                return this.$store.state.isLoading;
            },
            product() {
                return this.$store.state.product;
            }
        },
        created() {
            this.getProduct()
        }
    }
</script>