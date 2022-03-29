const express = require('express')
const router = express.Router()
const { execLocally, execOnline } = require('../compiler/executer')

// @desc Submit code
// @route POST /run
// @access Public
const submitCode = async (req, res) => {
	const { code, runInfo } = req.body

	if (!code || !runInfo) {
		return res.status(400).json({ error: 'Either code body or runInfo is empty' })
	}

	try {
		if (runInfo === 'local') {
			const output = await execLocally(code)
			return res.status(200).json(output)
		} else if (runInfo === 'online') {
			const output = await execOnline(code)
			return res.status(200).json(output.output)
		}
	} catch (err) {
		res.status(500).json(err)
	}
}

router.post('/run', submitCode)

module.exports = router
