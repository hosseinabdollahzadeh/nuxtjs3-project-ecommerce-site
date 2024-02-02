<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h4 class="fw-bold">ویرایش کد تخفیف: {{coupon.code}}</h4>
  </div>

  <div v-if="errors.length > 0" class="alert alert-danger col-md-3 m-auto mb-4">
    <ul class="mb-0">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>

  <FormKit type="form" id="createAddress" @submit="update" :incomplete-message="false" :actions="false">
    <div class="row g-4">
      <div class="col col-md-3">
        <FormKit type="text" name="code" id="code" label="کد تخفیف" label-class="form-label"
                 input-class="form-control" :value="coupon.code" validation="required"
                 :validation-messages="{required: 'فیلد کد تخفیف الزامی است.'}"
                 message-class="form-text text-danger"/>
      </div>
      <div class="col col-md-3">
        <FormKit type="text" name="percentage" id="percentage" label="درصد" label-class="form-label"
                 input-class="form-control" :value="coupon.percentage" validation="required|number"
                 :validation-messages="{required:'فیلد کد تخفیف الزامی است.', number:'فیلد کد تخفیف باید عددی باشد.'}"
                 message-class="form-text text-danger"/>
      </div>

      <clientOnly>
        <div class="col-md-3">
          <label class="form-label">تاریخ انقضاء</label>
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="bi bi-clock"></i></span>
            <input type="text" class="form-control" id="date-expire" :placeholder="coupon.expired_at_jalali"/>
          </div>
          <date-picker v-model="dateExpire" type="datetime" display-format="HH:mm jYYYY-jMM-jDD"
                       format="YYYY-MM-DD HH:mm:ss"
                       custom-input="#date-expire"/>
        </div>
      </clientOnly>

    </div>
    <div>
      <FormKit type="submit" input-class="btn btn-sm btn-outline-dark mt-3">
        ویرایش کد تخفیف
        <div v-if="loading" class="spinner-border spinner-border-sm sm-2"></div>
      </FormKit>
    </div>
  </FormKit>
</template>
<script setup>
import {useToast} from "vue-toastification";

const dateExpire = ref(null)

const errors = ref([]);
const loading = ref(false);
const toast = useToast();

const route = useRoute()

const {data: coupon} = await useFetch('/api/global', {
  query: {url: `/coupons/${route.params.id}`},
  headers: useRequestHeaders(['cookie'])
})

async function update(formData) {

  try {
    loading.value = true;
    errors.value = [];

    await $fetch('/api/global', {
      method: 'PUT',
      body: dateExpire.value ? {...formData, expired_at: dateExpire.value} : formData,
      query: {url: `/coupons/${coupon.value.id}`}
    })
    toast.success("ویرایش تخفیف با موفقیت انجام شد.");
    return navigateTo('/coupons')
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>