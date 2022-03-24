import ElementPlus, { ElMessage } from "element-plus";
import "element-plus/dist/index.css";
import * as ElIcons from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

export default {
	install(app: any) {
		for (const name in ElIcons) {
			app.component(name, (ElIcons as any)[name]);
		}
		app.config.globalProperties.$elMessage = function (
			params: any,
			closeAll = true
		) {
			if (closeAll) {
				ElMessage.closeAll();
			}
			ElMessage({
				type: params.type || "success",
				message: params.message,
				duration: params.duration || 1200,
			});
		};
		app.use(ElementPlus, { size: "small", locale: zhCn });
	},
};
