import { createApp } from "vue";
import Remind from "./Remind.vue";
// import ElementPlus from "./plugins/elementPlus";
import router from "../../router";
// import { setupStore } from "@/store";
// import "normalize.css";

const app = createApp(Remind);

// 挂载状态管理
// setupStore(app);

app
.use(router)
// .use(ElementPlus)
.mount("#app");
