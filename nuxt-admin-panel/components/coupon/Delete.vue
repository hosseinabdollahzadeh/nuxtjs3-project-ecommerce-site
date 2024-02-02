<template>
  <button @click="deleteCoupon" :disabled="loading" class="btn btn-sm btn-dark mt-5">
    حذف
    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
  </button>
</template>

<script setup>
import { useToast} from "vue-toastification";

const props = defineProps(['couponId'])
const toast = useToast()
const loading = ref(false)
async function deleteCoupon()
{
  try {
    loading.value = true

    await $fetch('/api/global', {
      method: 'DELETE',
      query: {url: `/coupons/${props.couponId}`},
      headers: useRequestHeaders(['cookie'])
    })

    toast.warning('حذف تخفیف با موفقیت انجام شد.')
    return navigateTo('/coupons')

  } catch (error) {
    console.log(error.data)
  } finally {
    loading.value = false
  }
}


</script>