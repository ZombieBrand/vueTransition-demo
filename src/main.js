// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Fullpage from "@/components/Fullpage.vue";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  data: {
    bgColor: ["red", "blue", "yellow", "green"]
  },
  components: { Fullpage }
});
