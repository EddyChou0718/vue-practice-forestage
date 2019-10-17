<template>
    <div>
        <!-- headers -->
        <nav class="navbar navbar-light bg-light">
            <router-link to="/" class="navbar-brand">
                <i class="fa fa-heart text-info" aria-hidden="true"></i>
                Eddy購物平台
            </router-link>
            <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
            <div class="dropdown ml-auto">
                <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
                    <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
                    <span class="badge badge-pill badge-danger" v-if="showCart">{{cart.carts.length}}</span>
                    <span class="sr-only">unread messages</span>
                </button>
                <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px" data-offset="400">
                    <h6>已選擇商品</h6>
                    <table class="table table-sm">
                        <tbody>
                            <tr v-for="item in cart.carts" :key="item.id" class="text-nowrap">
                                <td class="align-middle text-center">
                                    <a herf="#" class="text-muted" data-toggle="modal"
                                        @click.prevent="openDelModal(item.id)">
                                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    </a>
                                </td>
                                <td class="align-middle">{{item.product.title}}</td>
                                <td class="align-middle">{{item.qty}} {{item.product.unit}}</td>
                                <td class="align-middle text-right" v-if="item.product.price">{{item.product.price | currency}}</td>
                                <td class="align-middle text-right" v-else>{{item.product.origin_price | currency}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <router-link to="/checkout" class="btn btn-primary btn-block">
                        <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
                    </router-link>
                </div>
            </div>
        </nav>

        <div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                <h5 class="modal-title">刪除商品</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <p>是否確認刪除商品</p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">否</button>
                <button type="button" class="btn btn-outline-danger px-5" @click.prevent="delCartItem()">是</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'

export default {
    data() {
        return {
        }
    },
    methods: {
        openDelModal(id) {
            $('#delModal').modal('show');
            this.$store.dispatch('setDelItem', id)
        },
        delCartItem() {
            this.$store.dispatch('delCartItem');
            $('#delModal').modal('hide');
        }
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
        showCart() {
            return this.$store.state.showCart;
        }
    },
    created() {
        this.$store.dispatch('getCart');
    }
}
</script>