<template>
  <ClientOnly>
    <div class="d-flex align-items-center">
      <div v-if="!showResendOtpButton" class="mt-3 me-3" style="direction: ltr">
        <vue-countdown :time="6 * 1000" :transform="transformSlotProps" @end="onCountdownEnd"
                       v-slot="{ minutes, seconds }">
          {{ minutes }} : {{ seconds }}
        </vue-countdown>
      </div>
      <button v-else class="btn btn-dark">
        ارسال دوباره
      </button>
    </div>
  </ClientOnly>
</template>
<script setup>
import VueCountdown from '@chenfengyuan/vue-countdown';

const showResendOtpButton = ref(false);

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
</script>