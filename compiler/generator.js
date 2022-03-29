const escodegen = require('escodegen')
const parse = require('./parser')

const generate = (sourceCode) => {
	const ast = parse(sourceCode)

	let jsCode = escodegen.generate(ast)

	const runtimeLibrary = "function লেখো(...args) { process.stdout.write([...args].join(' ')); }"

	return jsCode + runtimeLibrary
}

module.exports = generate
