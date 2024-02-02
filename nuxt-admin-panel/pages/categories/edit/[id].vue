<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h4 class="fw-bold">ویرایش دسته بندی</h4>
  </div>

  <div v-if="errors.length > 0" class="alert alert-danger col-md-3 m-auto mb-4">
    <ul class="mb-0">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>

  <FormKit type="form" id="createAddress" @submit="update" :incomplete-message="false" :actions="false">
    <div class="row g-4">
      <div class="col col-md-3">
        <FormKit type="text" name="name" id="name" label="نام" label-class="form-label"
                 :value="category.name"
                 input-class="form-control" validation="required"
                 :validation-messages="{required: 'فیلد نام الزامی است.'}"
                 message-class="form-text text-danger"/>
      </div>
      <div class="col col-md-3">
        <FormKit type="text" name="description" id="description" label="توضیحات" label-class="form-label"
                 :value="category.description"
                 input-class="form-control" />
      </div>
    </div>
    <div>
      <FormKit type="submit" input-class="btn btn-sm btn-outline-dark mt-3">
        ویرایش دسته بندی
        <div v-if="loading" class="spinner-border spinner-border-sm sm-2"></div>
      </FormKit>
    </div>
  </FormKit>
</template>
<script setup>
import {useToast} from "vue-toastification";

const errors = ref([]);
const loading = ref(false);
const toast = useToast();

const route = useRoute()

const {data: category} = await useFetch('/api/global', {
  query: {url: `/categories/${route.params.id}`},
  headers: useRequestHeaders(['cookie'])
})

async function update(formData) {

  try {
    loading.value = true;
    errors.value = [];

    await $fetch('/api/global', {
      method: 'PUT',
      body: formData,
      query: {url: `/categories/${category.value.id}`}
    })
    toast.success("ویرایش دسته بندی با موفقیت انجام شد.");
    return navigateTo('/categories')
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>