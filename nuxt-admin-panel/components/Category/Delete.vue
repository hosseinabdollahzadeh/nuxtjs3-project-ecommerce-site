<template>
  <button @click="deleteCategory" :disabled="loading" class="btn btn-sm btn-dark mt-5">
    حذف
    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
  </button>
</template>

<script setup>
import { useToast} from "vue-toastification";

const props = defineProps(['categoryId'])
const toast = useToast()
const loading = ref(false)
async function deleteCategory()
{
  try {
    loading.value = true

    await $fetch('/api/global', {
      method: 'DELETE',
      query: {url: `/categories/${props.categoryId}`},
      headers: useRequestHeaders(['cookie'])
    })

    toast.warning('حذف دسته بندی با موفقیت انجام شد.')
    return navigateTo('/categories')

  } catch (error) {
    console.log(error.data)
  } finally {
    loading.value = false
  }
}


</script>