import { createApp } from "vue";
// import Main from "./Main.vue";
import Main from "@/views/portal/index.vue";
import ElementPlus from "../../plugins/elementPlus";
import router from "./router";
// import { setupStore } from "@/store";
// import "normalize.css";

const app = createApp(Main);

// 挂载状态管理
// setupStore(app);

app.use(router).use(ElementPlus).mount("#app");
