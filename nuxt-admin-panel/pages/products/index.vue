<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h4 class="fw-bold">محصولات</h4>
    <NuxtLink to="/products/create" class="btn btn-sm btn-outline-dark">
      ایجاد محصول
    </NuxtLink>
  </div>

  <ProductList :products="data.products"/>

  <div class="d-flex justify-content-center">
    <nav aria-label="navigation">
      <ul class="pagination">
        <li v-for="(link, index) in data.meta.links.slice(1, -1)" :key="index"
            class="page-item" :class="{active : link.active}">
          <button @click="paginate(link.label)" class="page-link">{{ link.label }}</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const page = ref(0)
const {data, refresh} = await useFetch(() => '/api/global', {
  query: {url: '/products', page},
  headers: useRequestHeaders(['cookie'])
})

function paginate(number) {
  page.value = number;
  refresh()
}
</script>