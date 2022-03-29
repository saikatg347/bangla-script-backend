const nearley = require('nearley')
const grammar = require('./grammars/grammar')

const parse = (code) => {
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))
	parser.feed(code)
	if (parser.results.length > 1) {
		// throw new Error("The parser found ambiguous parses.");
		return parser.results[1]
	}
	if (parser.results.length === 0) {
		throw new Error('No parses found. Input appeared to be incomplete.')
	}
	const ast = parser.results[0]

	let programAST = {
		type: 'Program',
		body: [],
		sourceType: 'script',
	}

	for (let statement of ast) {
		programAST.body.push(statement)
	}

	return programAST
}

module.exports = parse
