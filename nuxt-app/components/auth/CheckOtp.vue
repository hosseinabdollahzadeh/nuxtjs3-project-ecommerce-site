<template>
  <div class="card-body">
    <div v-if="errors.length > 0" class="alert alert-danger">
      <ul class="mb-0">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>
    <div class="form_container">
      <form @submit.prevent="checkOtp">
        <div class="mb-3">
          <label for="otp" class="form-label">کد ورود</label>
          <input v-model="otp" type="text" class="form-control" id="otp">
        </div>
        <button type="submit" class="btn btn-primary btn-auth">
          تأیید
          <div v-if="loading" class="spinner-border spinner-border-sm sm-2"></div>
        </button>
      </form>
    </div>
  </div>
</template>


<script setup>
import {useToast} from "vue-toastification";

const otp = ref(null);
const toast = useToast();
const errors = ref([]);
const loading = ref(false);

async function checkOtp() {

  if (otp.value === null) {
    toast.error("کد ورود الزامی است.");
    return;
  }
  const pattern = /^[0-9]{6}$/;

  if (!pattern.test(otp.value)) {
    toast.error("فرمت کد ورود معتبر نیست.");
    return;
  }

  return 'Success'
  try {
    loading.value = true;
    errors.value = [];

    const data = await $fetch('/api/auth/checkOtp', {
      method: 'POST',
      body: {otp: otp.value}
    })
    console.log(data)
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>