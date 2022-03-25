// electron/main.ts
"use strict";
// 控制应用生命周期和创建原生浏览器窗口的模组
const {
	app,
	BrowserWindow,
	protocol,
	Tray,
	Menu,
	ipcMain,
} = require("electron");
const path = require("path");
const iconPath = path.join(__dirname, "icon.png");
const NODE_ENV = process.env.NODE_ENV;

let mainWindow;
let remindWindow;
let tray;

function createWindow() {
	// 创建浏览器窗口
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		// minWidth: 400,
		// minHeight: 400,
		icon: iconPath,
		// frame: true, // * app边框(包括关闭,全屏,最小化按钮的导航栏) @false: 隐藏
		// // show: false, // 启动窗口时隐藏,直到渲染进程加载完成「ready-to-show 监听事件」 再显示窗口,防止加载时闪烁
		// resizable: true, // 禁止手动修改窗口尺寸
		// transparent: true, // * app 背景透明
		// hasShadow: false, // * app 边框阴影
		webPreferences: {
			preload: path.join(__dirname, "preload.ts"),
			// nodeIntegration: true,
		},
	});

	// 加载 index.html
	// mainWindow.loadFile('../main.html') //将该行改为下面这一行，加载url
	mainWindow.loadURL(
		NODE_ENV === "development"
			? "http://localhost:3000"
			: `file://${path.join(__dirname, "../dist/index.html")}`
	);
	// mainWindow.removeMenu();
	// setTray();
	// 打开开发工具
	if (NODE_ENV === "development") {
		mainWindow.webContents.openDevTools();
	}
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
// app.disableHardwareAcceleration();
app.whenReady().then(() => {
	createWindow();

	app.on("activate", function () {
		// 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
		// 打开的窗口，那么程序会重新创建一个窗口。
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

// ipcMain.on("mainWindow:close", () => {
// 	mainWindow.hide();
// });

// ipcMain.on("remindWindow:close", () => {
// 	remindWindow.close();
// });

// ipcMain.on("setTaskTimer", (event, time, task) => {
// 	const now = new Date();
// 	const date = new Date();
// 	date.setHours(time.slice(0, 2), time.slice(3), 0);
// 	const timeout = date.getTime() - now.getTime();
// 	setTimeout(() => {
// 		createRemindWindow(task);
// 	}, timeout);
// });

// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用 require 导入。
function setTray() {
	tray = new Tray(iconPath);
	tray.setToolTip("Tasky");
	tray.on("click", () => {
		if (mainWindow.isVisible()) {
			mainWindow.hide();
		} else {
			mainWindow.show();
		}
	});
	tray.on("right-click", () => {
		const menuConfig = Menu.buildFromTemplate([
			{
				label: "Quit",
				click: () => app.quit(),
			},
		]);
		tray.popUpContextMenu(menuConfig);
	});
}

function createRemindWindow(task) {
	const { screen } = require("electron");
	if (remindWindow) remindWindow.close();
	remindWindow = new BrowserWindow({
		height: 450,
		width: 360,
		resizable: false,
		frame: false,
		icon: iconPath,
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});
	remindWindow.removeMenu();

	const size = screen.getPrimaryDisplay().workAreaSize;
	const { y } = tray.getBounds();
	const { height, width } = remindWindow.getBounds();
	const yPosition = process.platform === "darwin" ? y : y - height;
	remindWindow.setBounds({
		x: size.width - width,
		y: yPosition,
		height,
		width,
	});

	remindWindow.setAlwaysOnTop(true);

	// if (process.env.WEBPACK_DEV_SERVER_URL) {
	// 	remindWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "/remind.html");
	// } else {
	// 	// createProtocol("app");
	// 	remindWindow.loadURL(`file://${__dirname}/remind.html`);
	// }

	remindWindow.loadURL(
		NODE_ENV === "development"
			? "http://localhost:3000"
			: `file://${path.join(__dirname, "../dist/remind.html")}`
	);

	remindWindow.webContents.on("did-finish-load", () => {
		remindWindow.webContents.send("setTask", task);
	});

	remindWindow.show();
	remindWindow.on("closed", () => {
		remindWindow = null;
	});
	setTimeout(() => {
		remindWindow && remindWindow.close();
	}, 50 * 1000);
}
