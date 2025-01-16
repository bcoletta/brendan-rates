import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
   const password = ref<string>('');

   function setPassword(pw:string) {
       password.value = pw;
   }

   return { password, setPassword };
});