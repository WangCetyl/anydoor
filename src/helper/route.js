'use strict'
const fs = require('fs');
const path = require('path');
const HandleBars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const mime = require('./mime.js');
const compress = require('./compress.js');
const range = require('./range.js');

const tplPath = path.join(__dirname,'../template/dir.tpl');
const source = fs.readFileSync(tplPath);
//注意compile的内容必须是一个数据.字符串，所以上souce定义中加入utf8,或者在soucre后面用toString（）
const template = HandleBars.compile(source.toString());
//const config = require('../config/defaultconfig.js');

module.exports = async function(req,res,filePath,config) {
	try {
		const stats = await stat(filePath);
		if (stats.isFile()) {
			const contentType = mime(filePath);
			
			res.setHeader('Content-Type',contentType);
			let rs;
			const {code,start,end} = range(stats.size,req,res);
			if(code===200) {
				res.statusCode =200;
				rs = fs.createReadStream(filePath);
			}
			else {
				res.statusCode =206;
				rs = fs.createReadStream(filePath,{start,end});
			}
			if(filePath.match(config.compress)) {
				rs = compress(rs,req,res);
			}
			rs.pipe(res);
		}
		else if(stats.isDirectory()) {
			const files =  await readdir(filePath);
			res.statusCode =200;
			res.setHeader('Content-Type','text/html');
			const dir = path.relative(config.root,filePath);
			const data = {
                title:path.basename(filePath),
                dir: dir ? `/${dir}` : '',
				files:files.map((file)=>{
					return {
						file,
						icon:mime(file)
					}
				})
			};
			res.end(template(data));
			
			// res.end(files.join(','));
		}
	} catch(ex) {
			console.error(ex);
			res.statusCode =404;
			res.setHeader('Content-Type','text/txt');
			res.end(`${filePath} is not a file or directory `);
			//下面一行不要使用，这样会将错误直接打印在浏览器中不安全
			//res.end(`${filePath} is not a file or directory\n ${ex.toString()}`);
	}
}