<template>
  <div class="table-responsive">
    <table class="table align-middle">
      <thead>
      <tr>
        <th>تصویر</th>
        <th>نام</th>
        <th>دسته بندی</th>
        <th>قیمت</th>
        <th>تعداد</th>
        <th>وضعیت</th>
        <th>عملیات</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in props.products" :key="product.id">
        <td><img src="/images/preloader.png" v-img="product.primary_image" width="80" height="53"></td>
        <td>{{ product.name }}</td>
        <td>{{ product.category }}</td>
        <td>{{ numberFormat(product.price) }}</td>
        <td>{{ product.quantity }}</td>
        <td>{{ product.status }}</td>
        <td>
          <div class="d-flex">
            <a href="#" class="btn btn-sm btn-outline-dark me-2">
              نمایش
            </a>
            <a href="#" class="btn btn-sm btn-dark">
              ویرایش
            </a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>

const props = defineProps(['products'])

</script>