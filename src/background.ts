"use strict";

import {
	app,
	protocol,
	BrowserWindow,
	Tray,
	Menu,
	ipcMain,
	screen,
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

const path = require("path");
const iconPath = path.join(__dirname, "icon.png");

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: "app", privileges: { secure: true, standard: true } },
]);

let mainWindow: any;
let remindWindow: any;
let tray: any;

async function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		resizable: false,
		icon: iconPath,
		webPreferences: {
			backgroundThrottling: false,
			// Required for Spectron testing
			enableRemoteModule: !!process.env.IS_TEST,

			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: process.env
				.ELECTRON_NODE_INTEGRATION as unknown as boolean,
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
		},
	});

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
		if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
	} else {
		createProtocol("app");
		// Load the index.html when not in development
		// mainWindow.loadURL('app://./index.html')
		mainWindow.loadURL(`file://${__dirname}/main.html`);
	}
	mainWindow.removeMenu();
	setTray();
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
		try {
			await installExtension(VUEJS3_DEVTOOLS);
		} catch (e: any) {
			console.error("Vue Devtools failed to install:", e.toString());
		}
	}
	createWindow();
});

ipcMain.on("mainWindow:close", () => {
	mainWindow.hide();
});

ipcMain.on("remindWindow:close", () => {
	remindWindow.close();
});

ipcMain.on("setTaskTimer", (event, time, task) => {
	const now = new Date();
	const date = new Date();
	date.setHours(time.slice(0, 2), time.slice(3), 0);
	const timeout = date.getTime() - now.getTime();
	setTimeout(() => {
		createRemindWindow(task);
	}, timeout);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === "win32") {
		process.on("message", (data) => {
			if (data === "graceful-exit") {
				app.quit();
			}
		});
	} else {
		process.on("SIGTERM", () => {
			app.quit();
		});
	}
}

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

function createRemindWindow(task: any) {
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

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		remindWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "/remind.html");
	} else {
		createProtocol("app");
		remindWindow.loadURL(`file://${__dirname}/remind.html`);
	}

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
