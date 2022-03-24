import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";
const portal = () => import("@/views/portal/index.vue");

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/",
		name: "首页",
		component: portal,
	},
	// {
	// 	path: "/:pathMatch(.*)*",
	// 	name: "找不到页面",
	// 	component: noFound,
	// },
];

export default createRouter({
	history: createWebHistory(import.meta.env.VITE_APP_PATH),
	routes,
});
