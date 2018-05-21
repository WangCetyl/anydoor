const yargs = require('yargs');
const Server = require('./app.js');

let argv = yargs
	.usage('Usage : $0 <command>  [options]')
	.option ('p',{
		alias:'port',
		describe:'portcode',
		demandOption: true,
		default: 3000
	})
	.option ('h',{
		alias:'hostname',
		describe:'host',
		default: '127.0.0.1'
	})
	.option ('d',{
		alias:'root',
		describe:'root path',
		default: process.cwd()
	})
	.version()
	.alias('v','version')
	.help()
	.argv;

let server = new Server(argv);
server.start();
 //I want to pass custom parameters from command line.