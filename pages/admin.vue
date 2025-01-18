<script setup lang="ts">
import BcButton from "~/components/bc-design-system/bc-button.vue";
import BcInput from "~/components/bc-design-system/bc-input.vue";
import { validateUser } from "~/services/user";
import { useUserStore } from "~/store/user";

const $user = useUserStore();

const authenticated = ref<boolean>(false);
const invalidPassword = ref<boolean>(false);
const password = ref<string>();

const checkPassword = (): void => {
  const pw: string = password.value || '';

  validateUser(pw)
    .then((valid:boolean) => {
      if (valid) {
        $user.setPassword(pw);
      }
      authenticated.value = valid;
      invalidPassword.value = !valid;
    });
}
</script>

<template>
  <div class="container mx-auto">
    <add-rating v-if="authenticated" />
    <form v-else @submit.prevent="checkPassword" class="p-4">
      <bc-input label="Password" inputType="password" v-model="password"/>
      <bc-button type="submit" variant="primary">Check Password</bc-button>
      <span v-if="invalidPassword" class="text-red-500 font-semibold ml-4">Invalid Password!</span>
    </form>
  </div>
</template>

<style scoped>

</style>