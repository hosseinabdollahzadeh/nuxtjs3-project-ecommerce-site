<template>
  <client-only>
    <section class="auth_section ">
      <div class="container">
        <div class="row mt-5">
          <div class="col-md-5 offset-md-4">
            <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
              <ul class="mb-0">
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </div>
            <div class="card">
              <div class="card-body">
                <div class="text-center mb-5">
                  <template v-if="payment.status">
                    <i class="bi bi-check-circle-fill text-success fs-1"></i>
                    <h5 class="mt-3 text-success">پرداخت شما با موفقیت انجام شد</h5>
                    <h6 class="mt-3">شماره پیگیری : <span>{{ payment.transId }}</span></h6>
                  </template>
                  <template v-else>
                    <i class="bi bi-x-circle-fill text-danger fs-1"></i>
                    <h5 class="mt-3 text-danger">{{ payment.error }}</h5>
                  </template>

                </div>
                <div class="d-flex justify-content-between">
                  <NuxtLink v-if="payment.status" to="/profile/orders" class="btn btn-primary">مشاهده سفارش</NuxtLink>
                  <NuxtLink v-else to="/cart" class="btn btn-primary">سبد خرید</NuxtLink>
                  <NuxtLink href="/" class="btn btn-dark">بازگشت به سایت</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <template #fallback>
      <div class="cart-loading">
        <div class="spinner-border spinner-border-sm ms-2 cart-spinner"></div>
      </div>
    </template>
  </client-only>
</template>

<script setup>
import {useCartStore} from "~/store/cart.js";

definePageMeta({
  middleware: 'auth'
})

const cart = useCartStore()
const route = useRoute()
const {public: {apiBaseUrl}} = useRuntimeConfig()
const errors = ref([]);
const payment = ref(null);

if (process.client) {
  try {
    const data = await $fetch(`${apiBaseUrl}/payment/verify`, {
      method: 'POST',
      body: route.query
    });

    payment.value = data.data;
    if(payment.value.status){
      cart.clear()
    }
  } catch (error) {
    errors.value = Object.values(error.data.message).flat()
  }
}

</script>