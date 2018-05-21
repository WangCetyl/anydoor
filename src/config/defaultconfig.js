'usr strict'
module.exports = {
	hostname:'127.0.0.1',
	port : 3000,
	root: process.cwd(),
	//正则匹配相关需要压缩的文件
	compress: /\.(html|js|css|md|jpeg|jpg|png)/,
	cache : {
		maxAge:600,
		expires:true,
		cacheControl:true,
		etag:true	
	}
};