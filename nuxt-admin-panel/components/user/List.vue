<template>
  <div class="table-responsive">
    <table class="table align-middle">
      <thead>
      <tr>
        <th>نام</th>
        <th>ایمیل</th>
        <th>شماره تلفن</th>
        <th>تاریخ عضویت</th>
        <th>عملیات</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in props.users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.cellphone }}</td>
        <td>{{ user.created_at }}</td>
        <td>
          <div class="d-flex">
            <NuxtLink :to="`/users/${user.id}`" class="btn btn-sm btn-outline-dark me-2">
              نمایش
            </NuxtLink>
            <NuxtLink :to="`/users/edit/${user.id}`" class="btn btn-sm btn-dark">
              ویرایش
            </NuxtLink>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>

const props = defineProps(['users'])

</script>