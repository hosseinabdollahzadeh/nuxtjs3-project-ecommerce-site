<template>
  <Slider />

  <div>
    {{counter.count}}
    <button @click="counter.increament(5)">Increment</button>
    <button @click="counter.decreament(5)">Decrement</button>
  </div>

  <Features />
  <ProductTabs />
  <AboutUs />
  <ContactUs />
</template>
<script setup>

import {useCounter} from "../store/counter"

const counter = useCounter();
</script>