<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h4 class="fw-bold">دسته بندی : {{ category.name }}</h4>
  </div>
  <div>
    <div class="row g-4">
      <div class="col-md-3">
        <label class="form-label">نام</label>
        <input type="text" class="form-control" disabled :placeholder="category.name"/>
      </div>

      <div class="col-md-3">
        <label class="form-label">توضیحات</label>
        <input type="text" class="form-control" disabled :placeholder="category.description"/>
      </div>

    </div>

    <CategoryDelete :categoryId="category.id" />
  </div>
</template>

<script setup>

const route = useRoute()

const {data: category} = await useFetch('/api/global', {
  query: {url: `/categories/${route.params.id}`},
  headers: useRequestHeaders(['cookie'])
})

</script>