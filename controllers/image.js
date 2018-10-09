const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	db('users').where({id}).increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0]))
		.catch(err => res.status(400).json('error processing request'));
}
module.exports = { handleImage }
