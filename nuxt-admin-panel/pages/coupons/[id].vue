<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h4 class="fw-bold">کد تخفیف: {{ coupon.code }}</h4>
  </div>
  <div>
    <div class="row g-4">
      <div class="col-md-3">
        <label class="form-label">کد</label>
        <input type="text" class="form-control" disabled :placeholder="coupon.code"/>
      </div>

      <div class="col-md-3">
        <label class="form-label">درصد</label>
        <input type="text" class="form-control" disabled :placeholder="coupon.percentage"/>
      </div>

      <div class="col-md-3">
        <label class="form-label">تاریخ انقضاء</label>
        <input type="text" class="form-control" disabled :placeholder="coupon.expired_at_jalali"/>
      </div>

      <div class="col-md-3">
        <label class="form-label">تاریخ ایجاد</label>
        <input type="text" class="form-control" disabled :placeholder="coupon.created_at"/>
      </div>


    </div>

    <CouponDelete :couponId="coupon.id" />
  </div>
</template>

<script setup>

const route = useRoute()

const {data: coupon} = await useFetch('/api/global', {
  query: {url: `/coupons/${route.params.id}`},
  headers: useRequestHeaders(['cookie'])
})

</script>