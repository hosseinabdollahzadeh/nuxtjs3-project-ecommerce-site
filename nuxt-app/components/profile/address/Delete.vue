<template>
  <div @click="deleteAddress" class="btn btn-dark">
    حذف
    <div v-if="loading" class="spinner-border spinner-border-sm sm-2"></div>
  </div>
</template>

<script setup>
import {useToast} from "vue-toastification";

const errors = ref([]);
const loading = ref(false);
const toast = useToast();

const props = defineProps(['addressId']);
const refreshGetAddress = inject('refreshGetAddress');
async function deleteAddress() {
  try {
    loading.value = true;
    errors.value = [];

    await $fetch('/api/profile/addresses/delete', {
      method: 'POST',
      body: {address_id: props.addressId}
    })
    refreshGetAddress();
    toast.warning("حذف آدرس با موفقیت انجام شد.");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>