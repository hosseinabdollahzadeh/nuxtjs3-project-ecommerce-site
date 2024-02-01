<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h4 class="fw-bold">ایجاد محصول</h4>
  </div>

  <ClientOnly fallback-tag="span" fallback="در حال بارگزاری ...">
    <FormKit type="form" id="createAddress" @submit="create" :incomplete-message="false" :actions="false">
      <div class="row g-4">

        <ProductPrimaryImage @set-primary-image="(image) => primaryImage = image"/>

        <div class="col col-md-3">
          <FormKit type="text" name="name" id="name" label="نام" label-class="form-label"
                   input-class="form-control" validation="required"
                   :validation-messages="{required: 'فیلد نام الزامی است.'}"
                   message-class="form-text text-danger"/>
        </div>

        <div class="col col-md-3">
          <FormKit type="select" name="category_id" id="category_id" label="دسته بندی ها" label-class="form-label"
                   input-class="form-select" validation="required"
                   :validation-messages="{required: 'فیلد دسته بندی الزامی است.'}"
                   message-class="form-text text-danger">
            <option v-for="category in categories.categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </FormKit>
        </div>

        <div class="col col-md-3">
          <FormKit type="select" name="status" id="status" label="وضعیت" label-class="form-label"
                   input-class="form-select" validation="required" value="1"
                   :validation-messages="{required: 'فیلد وضعیت الزامی است.'}"
                   message-class="form-text text-danger">
            <option value="1" selected>
              فعال
            </option>
            <option value="0">
              غیر فعال
            </option>
          </FormKit>
        </div>

        <div class="col col-md-3">
          <FormKit type="text" name="price" id="price" label="قیمت" label-class="form-label"
                   input-class="form-control" validation="required|number"
                   :validation-messages="{required: 'فیلد قیمت الزامی است.', number: 'مقدار قیمت باید عددی باشد.'}"
                   message-class="form-text text-danger"/>
        </div>

        <div class="col col-md-3">
          <FormKit type="text" name="quantity" id="quantity" label="تعداد" label-class="form-label"
                   input-class="form-control" validation="required|number"
                   :validation-messages="{required: 'فیلد تعداد الزامی است.', number: 'مقدار تعداد باید عددی باشد.'}"
                   message-class="form-text text-danger"/>
        </div>


        <div class="col col-md-3">
          <FormKit type="text" name="sale_price" id="sale_price" label="قیمت حراجی" label-class="form-label"
                   input-class="form-control" validation="number"
                   :validation-messages="{number: 'مقدار قیمت حراجی باید عددی باشد.'}"
                   message-class="form-text text-danger"/>
        </div>

        <FormKit type="submit" input-class="btn btn-sm btn-outline-dark mt-3 mb-5">
          ایجاد محصول
          <!--      <div v-if="loading" class="spinner-border spinner-border-sm sm-2"></div>-->
        </FormKit>

      </div>
    </FormKit>
  </ClientOnly>

</template>

<script setup>

const primaryImage = ref(null)

const {data: categories} = await useFetch('/api/global', {
  query: {url: '/categories'},
  headers: useRequestHeaders(['cookie'])
})


console.log(categories.value)

function create(formData) {

  console.log(formData)
}

</script>