<template>
  <div class="vh-70">
    <FormKit type="form" @submit="edit" :incomplete-message="false" :actions="false">
      <div class="row g-4">
        <div class="col col-md-6">
          <FormKit type="text" name="name" id="name" label="نام و نام خانوادگی" label-class="form-label"
                   input-class="form-control" validation="required"
                   :validation-messages="{required: 'نام و نام خانوادگی الزامی است.'}"
                   message-class="form-text text-danger"/>
        </div>
        <div class="col col-md-6">
          <FormKit type="email" name="email" id="email" label="ایمیل" label-class="form-label"
                   input-class="form-control" validation="required"
                   :validation-messages="{required: 'ایمیل الزامی است.'}"
                   message-class="form-text text-danger"/>
        </div>
        <div class="col col-md-6">
          <label class="form-label">شماره تلفن</label>
          <input type="text" disabled class="form-control" value="09100000000">
        </div>


        <FormKit type="submit" input-class="btn btn-primary mt-4">
          ویرایش
        </FormKit>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
function edit(formData) {
  console.log(formData)
}
</script>