import { createApp } from "vue";
import Remind from "./Remind.vue";
import router from "../../router";
import store from "../../store";

createApp(Remind).use(store).use(router).mount("#app");
