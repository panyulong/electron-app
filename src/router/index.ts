import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";
const portal = () => import("@/views/portal/index.vue");
const Main = () => import("@/modules/main/Main.vue");
const home = () => import("@/views/home/index.vue");
const about = () => import("@/views/about/index.vue");

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/home",
		name: "首页",
		component: portal,
		children: [

      {
				path: "main",
				name: "Main",
				component: Main,
				meta: {
          title: '主页',
					bodyClassName: "body-portal",
				},
        children:[
          {
            path: "home",
            name: "Home",
            component: home,
            meta: {
              title: '首页',
              bodyClassName: "body-portal",
            },
          },
        ]
			},

			{
				path: "home",
				name: "Home",
				component: home,
				meta: {
          title: '首页',
					bodyClassName: "body-portal",
				},
			},
			{
				path: "about",
				name: "About",
				component: about,
				meta: {
          title: '关于',
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
	history: createWebHistory(import.meta.env.VITE_APP_PATH),
	routes,
});
