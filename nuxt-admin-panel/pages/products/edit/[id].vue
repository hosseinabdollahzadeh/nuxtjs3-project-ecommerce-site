<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h4 class="fw-bold">ویرایش محصول: {{ product.name }}</h4>
  </div>

  <div v-if="errors.length > 0" class="alert alert-danger col-md-3 m-auto mb-4" role="alert">
    <ul class="mb-0">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>

  <ClientOnly fallback-tag="span" fallback="در حال بارگزاری ...">
    <FormKit type="form" id="createAddress" @submit="edit" :incomplete-message="false" :actions="false">
      <div class="row g-4">

        <ProductPrimaryImage :primary-image="product.primary_image"
                             @set-primary-image="(image) => primaryImage = image"/>

        <div class="col col-md-3">
          <FormKit type="text" name="name" id="name" label="نام" label-class="form-label"
                   input-class="form-control" :value="product.name" validation="required"
                   :validation-messages="{required: 'فیلد نام الزامی است.'}"
                   message-class="form-text text-danger"/>
        </div>

        <div class="col col-md-3">
          <FormKit type="select" name="category_id" id="category_id" label="دسته بندی ها" label-class="form-label"
                   input-class="form-select" :value="product.category_id" validation="required"
                   :validation-messages="{required: 'فیلد دسته بندی الزامی است.'}"
                   message-class="form-text text-danger">
            <option v-for="category in categories.categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </FormKit>
        </div>

        <div class="col col-md-3">
          <FormKit type="select" name="status" id="status" label="وضعیت" label-class="form-label"
                   input-class="form-select" validation="required" :value="product.status_value"
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
                   input-class="form-control" validation="required|number" :value="product.price"
                   :validation-messages="{required: 'فیلد قیمت الزامی است.', number: 'مقدار قیمت باید عددی باشد.'}"
                   message-class="form-text text-danger"/>
        </div>

        <div class="col col-md-3">
          <FormKit type="text" name="quantity" id="quantity" label="تعداد" label-class="form-label"
                   input-class="form-control" validation="required|number" :value="product.quantity"
                   :validation-messages="{required: 'فیلد تعداد الزامی است.', number: 'مقدار تعداد باید عددی باشد.'}"
                   message-class="form-text text-danger"/>
        </div>


        <div class="col col-md-3">
          <FormKit type="text" name="sale_price" id="sale_price" label="قیمت حراجی" label-class="form-label"
                   input-class="form-control" validation="number" :value="product.sale_price"
                   :validation-messages="{number: 'مقدار قیمت حراجی باید عددی باشد.'}"
                   message-class="form-text text-danger"/>
        </div>

        <div class="col-md-3">
          <label class="form-label">تاریخ شروع حراجی</label>
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="bi bi-clock"></i></span>
            <input type="text" class="form-control" id="sale-date-from-picker"
                   :placeholder="product.date_on_sale_from_jalali"/>
          </div>
          <date-picker v-model="saleDateFrom" type="datetime" display-format="HH:mm jYYYY-jMM-jDD"
                       format="YYYY-MM-DD HH:mm:ss"
                       custom-input="#sale-date-from-picker"/>
        </div>

        <div class="col-md-3">
          <label class="form-label">تاریخ پایان حراجی</label>
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="bi bi-clock"></i></span>
            <input type="text" class="form-control" id="sale-date-to-picker"
                   :placeholder="product.date_on_sale_to_jalali"/>
          </div>
          <date-picker v-model="saleDateTo" type="datetime" display-format="HH:mm jYYYY-jMM-jDD"
                       format="YYYY-MM-DD HH:mm:ss"
                       custom-input="#sale-date-to-picker"/>
        </div>

        <div class="col-md-12">
          <formKit type="textarea" rows="5" name="description" id="description" label="توضیحات"
                   label-class="form-label" input-class="form-control" message-class="form-text text-danger"
                   validation="required" :value="product.description"
                   :validation-messages="{required: 'فیلد توضیحات الزامی است.'}"/>
        </div>

        <div class="col-md-3">
          <label for="images" class="form-label">تصاویر</label>
          <input @change="imagesFile" type="file" class="form-control" id="images" multiple/>
        </div>

        <div class="col-md-12" v-if="product.images.length > 0">
          <img v-for="image in product.images" class="me-3" :src="image.image" width="300">
        </div>

        <FormKit type="submit" input-class="btn btn-sm btn-outline-dark mt-3 mb-5">
          ویرایش محصول
          <div v-if="loading" class="spinner-border spinner-border-sm sm-2"></div>
        </FormKit>

      </div>
    </FormKit>
  </ClientOnly>

</template>

<script setup>
import {useToast} from "vue-toastification";

definePageMeta({
  middleware: 'auth'
})

const toast = useToast()
const errors = ref([])
const loading = ref(null)


const primaryImage = ref(null)
const saleDateFrom = ref(null)
const saleDateTo = ref(null)
const images = ref(null)

const route = useRoute()

const {data: product} = await useFetch('/api/global', {
  query: {url: `/products/${route.params.id}`},
  headers: useRequestHeaders(['cookie'])
})


const {data: categories} = await useFetch('/api/global', {
  query: {url: '/categories'},
  headers: useRequestHeaders(['cookie'])
})

function imagesFile(el) {
  images.value = el.target.files
}


async function edit(data) {

  const formData = new FormData()

  if (images.value) {
    for (let index = 0; index < images.value.length; index++) {
      formData.append("images", images.value[index])
    }
  } else {
    formData.append("images", null)
  }

  formData.append("primary_image", primaryImage.value ? primaryImage.value : null)
  formData.append("name", data.name)
  formData.append("category_id", data.category_id)
  formData.append("status", data.category_id)
  formData.append("price", data.price)
  formData.append("quantity", data.quantity)
  formData.append("sale_price", data.sale_price)
  formData.append("date_on_sale_from", saleDateFrom.value ? saleDateFrom.value : product.value.date_on_sale_from_jalali)
  formData.append("date_on_sale_to", saleDateTo.value ? saleDateTo.value : product.value.date_on_sale_to_jalali)
  formData.append("description", data.description)


  try {
    loading.value = true
    errors.value = []

    await $fetch('/api/products/edit', {
      method: 'PUT',
      body: formData,
      query: {url: `/products/${product.value.id}`}
    })

    toast.success('ویرایش محصول با موفقیت انجام شد')
    return navigateTo('/products')
  } catch (error) {

    errors.value = Object.values(error.data.data.message).flat();

  } finally {
    loading.value = false
  }
}

</script>