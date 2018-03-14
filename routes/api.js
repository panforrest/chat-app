// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

router.post('/:resource', (req, res) => {
    const params = req.body
    turbo.create('room', params)
	.then(data => {
	    res.json({
	    	confirmation: 'success',
	    	data: data
	    })
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
	

    // res.json({
    // 	confirmation: 'success' ,
    // 	data: req.body
    // })
})

module.exports = router
