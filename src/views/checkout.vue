<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="container main-contant py-5">
            <h1 class="text-center mb-3 text-secondary">結帳</h1>
            <section class="form-row align-items-center text-center">
                <div class="col">
                    <div class="alert alert-success alert-rounded mb-0" role="alert">
                        1.輸入訂單資料
                    </div>
                </div>
                <div class="col">
                    <div class="alert alert-light alert-rounded mb-0" role="alert">
                        2.金流付款
                    </div>
                </div>
                <div class="col">
                    <div class="alert alert-light alert-rounded mb-0" role="alert">
                        3.完成
                    </div>
                </div>
            </section>

            <section class="row justify-content-center mt-5">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header" id="headingOne">
                            <h6 class="mb-0 d-flex align-items-center">
                                <a data-toggle="collapse" href="#collapseOne">
                                    顯示購物車細節
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                </a>
                                <span class="h3 ml-auto mb-0">{{cart.final_total}}</span>
                            </h6>
                        </div>
                    </div>
                    <div id="collapseOne" class="collapse mt-3">
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th width="30"></th>
                                    <th width="100"></th>
                                    <th>商品名稱</th>
                                    <th width="100">數量</th>
                                    <th width="80">小計</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in cart.carts" :key="item.id">
                                    <td class="align-middle text-center">
                                        <a href="#" class="text-muted" data-toggle="modal"
                                            @click.prevent="openDelModal(item.id)">
                                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                    <td class="align-middle">
                                        <img :src="item.product.imageUrl"
                                            class="img-fluid img-thumbnail" alt="">
                                    </td>
                                    <td class="align-middle">{{item.product.title}}</td>
                                    <td class="align-middle">{{item.product.num}} {{item.product.unit}}</td>
                                    <td class="align-middle text-right">{{item.final_total}}</td>
                                </tr>
                                <!-- <tr>
                <td colspan="4" class="text-right">運費</td>
                <td class="text-right">
                  <strong>$60</strong>
                </td>
              </tr> -->
                                <tr>
                                    <td colspan="4" class="text-right">合計</td>
                                    <td class="text-right">
                                        <strong>{{cart.final_total}}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h5 class="py-3 mt-5 mb-2 text-center bg-light">
                        訂購人資訊
                    </h5>
                    <form @submit.prevent="creatOrder()">
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="name">姓名</label>
                                <input v-validate="'required'" type="text" class="form-control" 
                                name="name" id="name" placeholder="姓名" v-model="customerForm.user.name">
                                <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="email">Email</label>
                                <input v-validate="'required|email'" type="email" class="form-control" 
                                name="email" id="email" placeholder="Email" v-model="customerForm.user.email">
                                <span class="text-danger" v-if="errors.first('email')">{{errors.first('email')}}</span>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="email">聯絡電話</label>
                                <input v-validate="'required'" type="text" class="form-control" 
                                name="tel" id="tel" placeholder="聯絡電話" v-model="customerForm.user.tel">
                                <span class="text-danger" v-if="errors.has('name')">請輸入聯絡電話</span>
                            </div>
                        </div>
                        <!-- <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="state">國家</label>
                                <select id="state" class="form-control">
                                    <option selected>台灣</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div class="form-group col-md">
                                <label for="city">城市</label>
                                <select name="" id="city" class="form-control">
                                    <option value="台北市">台北市</option>
                                    <option value="台南市">台南市</option>
                                    <option value="高雄市">高雄市</option>
                                </select>
                            </div>
                            <div class="form-group col-md">
                                <label for="inputZip">郵遞區號</label>
                                <input type="text" class="form-control" id="inputZip">
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label for="inputAddress">地址</label>
                            <!-- <div type="text" class="form-control" id="inputAddress" placeholder="重慶南路一段122號" required> -->
                            <input v-validate="'required'" type="text" class="form-control" 
                            name="inputAddress" id="inputAddress" v-model="customerForm.user.address">
                            <span class="text-danger" v-if="errors.has('inputAddress')">請輸入地址</span>
                        </div>
                        <div class="form-group">
                            <label for="comment">留言</label>
                            <textarea name="" id="comment" class="form-control" cols="30" rows="10"
                                v-model="customerForm.message"></textarea>
                        </div>
                        <div class="text-right">
                            <router-link to="/" class="btn btn-secondary">繼續選購</router-link>
                            <button type="submit" class="btn btn-primary ml-2">確認付款</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        data() {
            return{
                customerForm: {
                    user: {
                        name: '',
                        email: '',
                        tel: '',
                        address: ''
                    },
                    message: ''
                }
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
            },
            creatOrder() {
                const api = `${PATH}/api/${APIPATH}/order`;
                this.$store.dispatch('updateLoading', true)
                const order = this.customerForm;
                this.$validator.validate().then((valid) => {
                    if (valid) {
                        this.$http.post(api, {data: order}).then((res) => {
                            console.log(res);
                            this.$store.dispatch('updateLoading', false)
                            if(res.data.success) {
                                this.$router.push(`/purchase/${res.data.orderId}`)
                            }
                        })
                    } else {
                        console.log('欄位不完整');
                        this.$store.dispatch('updateLoading', false)
                    }
                });
            }
        },
        computed: {
            isLoading() {
                return this.$store.state.isLoading;
            },
            cart() {
                return this.$store.state.cart;
            }
        }
    }
</script>