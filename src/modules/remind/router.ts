import {
	createRouter,
	RouteRecordRaw,
	createWebHistory,
	createWebHashHistory,
} from "vue-router";
const Remind = () => import("./Remind.vue");
const home = () => import("./views/home/index.vue");

const routes: RouteRecordRaw[] = [
	{
		path: "/remind",
		name: "Remind",
		component: Remind,
		redirect: "/remind/home",
		meta: {
			title: "主页",
			bodyClassName: "body-portal",
		},
		children: [
			{
				path: "home",
				name: "Home",
				component: home,
				meta: {
					title: "首页",
					bodyClassName: "body-portal",
				},
			},
		],
	},
	// {
	// 	path: "/:pathMatch(.*)*",
	// 	name: "找不到页面",
	// 	component: noFound,
	// },
];

export default createRouter({
	// history: createWebHistory(import.meta.env.VITE_APP_PATH),
	history: createWebHashHistory(),
	routes,
});
