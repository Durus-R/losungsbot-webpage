import { defineStore } from 'pinia';

export const useDateStore = defineStore('date', {
  state: () => ({
    date: new Date(),
    url: '',
    at: true,
  }),

  actions: {
    increment() {
      this.date.setDate(this.date.getDay() + 1);
    },
    decrement() {
      this.date.setDate(this.date.getDay() - 1);
    },
    setAT(val: boolean) {
      this.at = val;
    },
    switchAT() {
      this.at = !this.at;
    },
    setDate(date: Date) {
      this.date = date;
    },
  },
});
