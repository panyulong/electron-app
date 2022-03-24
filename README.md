# 说明

## yarn dev //浏览器开发

## yarn electron:dev //electron 开发

## yarn app:pack //发布，只合并，不产生压缩包

## yarn app:build //发布应用

    "build": {
    	"appId": "com.my-website.my-app",
    	"productName": "测试app",
    	"copyright": "Copyright © 2022 ${author}",
    	"directories": {
    		"buildResources": "assets",
    		"output": "dist_electron"
    	},
    	"win": {
    		"icon": "public/cccs.icns",
    		"target": [
    			"nsis",
    			"zip",
    			"7z"
    		]
    	},
    	"files": [
    		"dist/**/*",
    		"electron/**/*"
    	],
    	"mac": {
    		"category": "public.app-category.utilities",
    		"icon": "public/cccs.icns"
    	},
    	"nsis": {
    		"oneClick": false,
    		"allowToChangeInstallationDirectory": true
    	}
    }
