<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h4 class="fw-bold">ایجاد کاربر</h4>
  </div>

  <div v-if="errors.length > 0" class="alert alert-danger col-md-3 m-auto mb-4">
    <ul class="mb-0">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>

  <FormKit type="form" id="createAddress" @submit="create" :incomplete-message="false" :actions="false">
    <div class="row g-4">
      <div class="col col-md-3">
        <FormKit type="text" name="name" id="name" label="نام" label-class="form-label"
                 input-class="form-control" validation="required"
                 :validation-messages="{required: 'فیلد نام الزامی است.'}"
                 message-class="form-text text-danger"/>
      </div>
      <div class="col col-md-3">
        <FormKit type="email" name="email" id="email" label="ایمیل" label-class="form-label"
                 input-class="form-control" validation="required"
                 :validation-messages="{required: 'فیلد ایمیل الزامی است.'}"
                 message-class="form-text text-danger"/>
      </div>
      <div class="col col-md-3">
        <FormKit type="text" name="cellphone" id="cellphone" label="شماره تماس" label-class="form-label"
                 input-class="form-control" :validation="[['required'], ['matches', /^(\+98|0)?9\d{9}$/]]"
                 :validation-messages="{required:'فیلد شماره تماس الزامی است.', matches:'شماره تماس معتبر نمی باشد.'}"
                 message-class="form-text text-danger"/>
      </div>
      <div class="col col-md-3">
        <FormKit type="password" name="password" id="password" label="رمز عبور" label-class="form-label"
                 input-class="form-control" validation="required"
                 :validation-messages="{required: 'فیلد رمز عبور الزامی است.'}"
                 message-class="form-text text-danger"/>
      </div>
    </div>
    <div>
      <FormKit type="submit" input-class="btn btn-sm btn-outline-dark mt-3">
        ایجاد کاربر
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

async function create(formData) {

  try {
    loading.value = true;
    errors.value = [];

    await $fetch('/api/global', {
      method: 'POST',
      body: formData,
      query: {url: '/users'}
    })
    toast.success("ایجاد کاربر با موفقیت انجام شد.");
    return navigateTo('/users')
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>