<template>
  <FormKit type="form" id="createAddress" @submit="create" #default="{ value }" :incomplete-message="false"
           :actions="false">
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      ایجاد آدرس جدید
    </button>
    <div class="collapse mt-3" id="collapseExample">
      <div class="card card-body">
        <div v-if="errors.length > 0" class="alert alert-danger">
          <ul class="mb-0">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>
        <div class="row g-4">
          <div class="col col-md-6">
            <FormKit type="text" name="title" id="title" label="عنوان" label-class="form-label"
                     input-class="form-control" validation="required"
                     :validation-messages="{required: 'فیلد عنوان الزامی است.'}"
                     message-class="form-text text-danger"/>
          </div>
          <div class="col col-md-6">
            <FormKit type="text" name="cellphone" id="cellphone" label="شماره تماس" label-class="form-label"
                     input-class="form-control" :validation="[['required'], ['matches', /^(\+98|0)?9\d{9}$/]]"
                     :validation-messages="{required:'فیلد شماره تماس الزامی است.', matches:'شماره تماس معتبر نمی باشد.'}"
                     message-class="form-text text-danger"/>
          </div>
          <div class="col col-md-6">
            <FormKit type="text" name="postal_code" id="postal_code" label="کد پستی" label-class="form-label"
                     input-class="form-control" :validation="[['required'], ['matches', /^\d{5}[-]?\d{5}$/i]]"
                     :validation-messages="{required:'فیلد کد پستی الزامی است.', matches:'کد پستی معتبر نمی باشد.'}"
                     message-class="form-text text-danger"/>
          </div>
          <div class="col col-md-6">
            <FormKit type="select" name="province_id" id="province_id" label="استان" label-class="form-label"
                     @change="changeProvince"
                     input-class="form-select" validation="required"
                     :validation-messages="{required:'فیلد استان الزامی است.'}"
                     message-class="form-text text-danger">
              <option v-for="province in props.provinces" :key="province.id" :value="province.id">{{
                  province.name
                }}
              </option>
            </FormKit>
          </div>
          <div class="col col-md-6">
            <FormKit type="select" name="city_id" id="city_id" ref="cityEl" label="شهر" label-class="form-label"
                     input-class="form-select" validation="required"
                     :validation-messages="{required:'فیلد شهر الزامی است.'}"
                     message-class="form-text text-danger">
              <option v-for="city in props.cities.filter((item) => item.province_id == value .province_id )"
                      :key="city.id" :value="city.id">{{ city.name }}
              </option>
            </FormKit>
          </div>
          <div class="col col-md-12">
            <FormKit type="textarea" rows="5" name="address" id="address" label="آدرس" label-class="form-label"
                     input-class="form-control" validation="required"
                     :validation-messages="{required: 'فیلد آدرس الزامی است.'}"
                     message-class="form-text text-danger"/>
          </div>
        </div>
        <div>
          <FormKit type="submit" input-class="btn btn-primary mt-4">
            ایجاد
            <div v-if="loading" class="spinner-border spinner-border-sm sm-2"></div>
          </FormKit>
        </div>
      </div>
    </div>
  </FormKit>
</template>
<script setup>
import {useToast} from "vue-toastification";
import {reset} from "@formkit/core";

const errors = ref([]);
const loading = ref(false);
const toast = useToast();

const props = defineProps(['provinces', 'cities'])
const refreshGetAddress = inject('refreshGetAddress');

const cityEl = ref(null);

function changeProvince(el) {
  cityEl.value.node.input(props.cities.find((item) => item.province_id == el.target.value).id);
}

async function create(formData) {
  try {
    loading.value = true;
    errors.value = [];

    await $fetch('/api/profile/addresses/create', {
      method: 'POST',
      body: formData
    })
    reset('createAddress');
    refreshGetAddress();
    toast.success("آدرس با موفقیت ایجاد شد.");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>