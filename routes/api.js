// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

router.post('/:resource', function(req, res){
    // const resource = req.params.resource

    res.json({
    	confirmation: 'success' ,
    	data: req.body
    })
})

module.exports = router
