// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const CDN = (process.env.TURBO_ENV == 'dev') ? '' : process.env.TURBO_CDN

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
    const config = {
    	cdn: CDN
    }

	res.render('index', config)
})

router.get('/rooms', (req, res) => {
	res.render('rooms', null)
})

router.get('/room/:id', (req, res) => {  //router.get('/room', (req, res) => {
	res.render('room', {room: req.params.id})
})

module.exports = router
