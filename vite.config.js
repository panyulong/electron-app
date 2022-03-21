import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// import { createProxy } from './build/vite/proxy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_APP_PATH, VITE_PORT, VITE_PROXY } = loadEnv(mode, process.cwd());
  return {
    base: VITE_APP_PATH,
    transpileDependencies: true,
    lintOnSave: false,
    plugins: [vue()],
    //多页面打包
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "main.html"),
          remind: path.resolve(__dirname, "remind.html"),
        },
      },
    },
    server: {
      open: true,
      port: VITE_PORT,
      host: true,
      // proxy: createProxy(VITE_PROXY),
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
    // pages: {
    //   main: {
    //     // page 的入口
    //     entry: 'src/modules/main/main.ts',
    //     // 模板来源
    //     template: 'public/main.html',
    //     // 在 dist/index.html 的输出
    //     filename: 'main.html',
    //     // 当使用 title 选项时，
    //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //     title: 'Main Page'
    //   },
    //   remind: {
    //     entry: 'src/modules/remind/remind.ts',
    //     template: 'public/remind.html',
    //     filename: 'remind.html',
    //     title: 'Remind Page'
    //   }
    // }
  };
});
