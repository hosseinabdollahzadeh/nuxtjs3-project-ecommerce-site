<template>
  <ClientOnly>
    <div class="d-flex align-items-center">
      <div v-if="!showResendOtpButton" class="mt-3 me-3" style="direction: ltr">
        <vue-countdown :time="6 * 1000" :transform="transformSlotProps" @end="onCountdownEnd"
                       v-slot="{ minutes, seconds }">
          {{ minutes }} : {{ seconds }}
        </vue-countdown>
      </div>
      <button @click="resend"  :disabled="loading" v-else class="btn btn-dark">
        ارسال دوباره
        <div v-if="loading" class="spinner-border spinner-border-sm sm-2"></div>
      </button>
    </div>
  </ClientOnly>
</template>
<script setup>
import VueCountdown from '@chenfengyuan/vue-countdown';
import {useToast} from 'vue-toastification';

const emit = defineEmits(['resendOtpErrors'])

const showResendOtpButton = ref(false);
const toast = useToast();
const loading = ref(false);

function onCountdownEnd() {
  showResendOtpButton.value = true;
}

function transformSlotProps(props) {
  const formattedProps = {};

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });

  return formattedProps;
}

async function resend() {
  try {
    loading.value = true;

    await $fetch('/api/auth/resendOtp', {
      method: 'POST',
    })
    toast.success("کد ورود دوباره برای شما ارسال شد.");
    showResendOtpButton.value = false;
  } catch (error) {
    emit('resendOtpErrors', Object.values(error.data.data.message).flat())
  } finally {
    loading.value = false;
  }
}
</script>