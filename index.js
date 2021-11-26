const { spawn } = require('child_process');

const expressAPITemplateURL =
	'https://github.com/andersonzach02/express-api-template.git';

const dirName = process.argv[2];

if (
	!dirName ||
	dirName.match('^[a-zA-Z]:\\(((?![<>:"/\\|?*]).)+((?<![ .])\\)?)*$')
) {
	return console.log(`
	Invalid directory name
	Usage: create-express-template project-name`);
}

executeCommand('git', ['clone', expressAPITemplateURL, dirName]);

function executeCommand(command, args, options = undefined) {
	const spawnedProcess = spawn(command, args, {
		...options,
		shell: true,
	});

	return new Promise((resolve) => {
		spawnedProcess.stdout.on('data', (data) => {
			console.log(`${data}`);
		});

		spawnedProcess.stderr.on('data', (data) => {
			console.error(`${data}`);
		});

		spawnedProcess.on('close', (code) => {
			resolve();
		});
	});
}
