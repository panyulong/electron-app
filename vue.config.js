const { defineConfig } = require("@vue/cli-service");
const path = require("path");

export default defineConfig(({ mode }) => {
	const { VITE_APP_BASE_URL } = loadEnv(mode, process.cwd());
	return {
		base: VITE_APP_BASE_URL,
		plugins: [vue()], //VueSetupExtend()
		transpileDependencies: true,
		lintOnSave: false,
		build: {
			chunkSizeWarningLimit: 1000,
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes("node_modules")) {
							return id
								.toString()
								.split("node_modules/")[1]
								.split("/")[0]
								.toString();
						}
					},
				},
			},
		},
		pages: {
			main: {
				// 入口js
				entry: "src/modules/main/main.ts",
				// 模板来源
				template: "public/main.html",
				// 在 dist 中生成的html文件名字
				filename: "main.html",
				// template html 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
				title: "Main Page",
			},
			remind: {
				entry: "src/modules/remind/remind.ts",
				template: "public/remind.html",
				filename: "remind.html",
				title: "Remind Page",
			},
		},
		server: {
			open: true,
			host: true,
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
				"@c": path.resolve(__dirname, "src/components"),
			},
		},
		css: {
			preprocessorOptions: {
				less: {
					charset: false,
					javascriptEnabled: true,
					additionalData: `@import '${path.resolve(
						__dirname,
						"src/assets/css/common.less"
					)}';`,
				},
			},
			charset: false,
			postcss: {
				plugins: [
					{
						postcssPlugin: "internal:charset-removal",
						AtRule: {
							charset: (atRule) => {
								if (atRule.name === "charset") {
									atRule.remove();
								}
							},
						},
					},
				],
			},
		},
	};
});
