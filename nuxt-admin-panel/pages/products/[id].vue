<template>
  <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h4 class="fw-bold">محصول : {{ product.name }}</h4>
  </div>

  <div>
    <div class="row gy-4">
      <div class="col-md-12 mb-4">
        <div class="row justify-content-center">
          <div class="col-md-3">
            <img src="/images/preloader.png" width="350" height="235" v-img="product.primary_image" />
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <label class="form-label">نام</label>
        <input type="text" class="form-control" disabled :placeholder="product.name" />
      </div>
      <div class="col-md-3">
        <label class="form-label">دسته بندی</label>
        <input type="text" class="form-control" disabled :placeholder="product.category" />
      </div>
      <div class="col-md-3">
        <label class="form-label">وضعیت</label>
        <input type="text" class="form-control" disabled :placeholder="product.status" />
      </div>
      <div class="col-md-3">
        <label class="form-label">قیمت</label>
        <input type="text" class="form-control" disabled :placeholder="numberFormat(product.price)" />
      </div>
      <div class="col-md-3">
        <label class="form-label">تعداد</label>
        <input type="text" class="form-control" disabled :placeholder="product.quantity" />
      </div>
      <div class="col-md-3">
        <label class="form-label">قیمت حراجی</label>
        <input type="text" class="form-control" disabled :placeholder="numberFormat(product.sale_price)" />
      </div>
      <div class="col-md-3">
        <label class="form-label">تاریخ شروع حراجی</label>
        <input type="text" class="form-control" disabled :placeholder="product.date_on_sale_from_jalali" />
      </div>
      <div class="col-md-3">
        <label class="form-label">تاریخ پایان حراجی</label>
        <input type="text" class="form-control" disabled :placeholder="product.date_on_sale_to_jalali" />
      </div>
      <div class="col-md-12">
        <label class="form-label">توضیحات</label>
        <textarea rows="5" class="form-control" disabled :value="product.description"></textarea>
      </div>

      <div class="col-md-12">
        <img v-for="image in product.images" class="me-3" src="/images/preloader.png" v-img="image.image"
             width="300" />
      </div>
    </div>
  </div>

  <ProductDelete :productId="product.id" />
</template>

<script setup>

const route = useRoute()

const {data: product} = await useFetch('/api/global', {
  query: {url: `/products/${route.params.id}`},
  headers: useRequestHeaders(['cookie'])
})

</script>