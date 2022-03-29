const generate = require('./generator')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const execLocally = async (code) => {
	const jsCode = generate(code)

	const dirCodes = path.join(__dirname, './codes/code.js')

	fs.writeFileSync(dirCodes, jsCode)

	const { stdout, stderr } = await exec(`node ${dirCodes}`)

	if (stderr) {
		return stderr
	}
	return stdout
}

const execOnline = async (code) => {
	const jsCode = generate(code)

	const headers = {
		'content-type': 'application/json',
	}

	const body = {
		clientId: 'e32dd3588d04400b5bfd6e0e4204f5cd',
		clientSecret: '556c72e7954a9e4d8fd95c8c0908a8c68a880a979d95aa5e55ffe9d86d5c5a84',
		script: jsCode,
		language: 'nodejs',
		versionIndex: '4',
	}

	const res = await axios.post('https://api.jdoodle.com/v1/execute', body, headers)

	return res.data
}

module.exports = {
	execOnline,
	execLocally,
}
