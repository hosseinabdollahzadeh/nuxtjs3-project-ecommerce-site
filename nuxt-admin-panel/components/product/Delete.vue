<template>
  <button @click="deleteProduct" :disabled="loading" class="btn btn-sm btn-dark my-5">
    حذف
    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
  </button>
</template>

<script setup>
import { useToast} from "vue-toastification";

const props = defineProps(['productId'])
const toast = useToast()
const loading = ref(false)
async function deleteProduct()
{
  try {
    loading.value = true

    await $fetch('/api/global', {
      method: 'DELETE',
      query: {url: `/products/${props.productId}`},
      headers: useRequestHeaders(['cookie'])
    })

    toast.warning('حذف محصول با موفقیت انجحام شد.')
    return navigateTo('/products')

  } catch (error) {
    console.log(error.data)
  } finally {
    loading.value = false
  }
}


</script>