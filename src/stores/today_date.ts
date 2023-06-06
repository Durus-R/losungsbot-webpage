import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDateStore = defineStore('date', {
  state: () => ({
    date: ref(new Date()),
    url: ref(''),
  }),

  actions: {
    increment() {
      this.date.setDate(this.date.getDay() + 1);
    },
    decrement() {
      this.date.setDate(this.date.getDay() - 1);
    },
  },
});
