'use strict'

//由于服务器的调试需要不断重启，所以按装supervisor 插件随时更新相关文件的变化
//如果显示的文字乱码，可以用记事本打开改为utf-8试试
const http = require('http');
const conf = require('./config/defaultconfig.js');
const chalk = require('chalk');
const path = require('path');
const route = require('./helper/route.js');
const openUrl = require('./helper/openUrl');

class Server {
	constructor (config) {
		this.conf = Object.assign({},conf,config);
		console.log(this.conf);
	}
	start () {
		let server =http.createServer((req,res)=> {
		//const url = req.url;
		let filePath = path.join(this.conf.root,req.url);
		route(req,res,filePath,this.conf);
        });

		server.listen(this.conf.port,this.conf.hostname,()=> {
			let addr = `http://${this.conf.hostname}:${this.conf.port}`;
			console.log(`Server started at ${chalk.green(addr)}`)
			openUrl(addr);
		});
	}
}

module.exports= Server;

//运行时请使用supersivor 文件名
	