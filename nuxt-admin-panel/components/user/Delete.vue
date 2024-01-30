<template>
  <button @click="deleteUser" :disabled="loading" class="btn btn-sm btn-dark mt-5">
    حذف
    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
  </button>
</template>

<script setup>
import { useToast} from "vue-toastification";

const props = defineProps(['userId'])
const toast = useToast()
const loading = ref(false)
async function deleteUser()
{
  try {
    loading.value = true

    await $fetch('/api/global', {
      method: 'DELETE',
      query: {url: `/users/${props.userId}`},
      headers: useRequestHeaders(['cookie'])
    })

    toast.warning('حذف کاربر با موفقیت انجحام شد.')
    return navigateTo('/users')

  } catch (error) {
    console.log(error.data)
  } finally {
    loading.value = false
  }
}


</script>