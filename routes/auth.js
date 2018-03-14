// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

router.post('/register', function(req, res) {
    turbo.createUser(req.body)
    .then(data => {
    	res.json({
    		confirmation: '',
    		data: data  //NOTE: NOT "user: user"
    	})
    })
    .catch(err => {
    	res.json({
    		confirmation: 'fail',
    		message: err.message
    	})
    })
})

router.post('/login', function(req, res) {
    turbo.login(req.body)
    .then(data => {
        req.vertexSession.user = {id: data.id}
        res.json({
            confirmation: '',
            data: data  //NOTE: NOT "user: user"
        })
    })
    .catch(err => {
        res.json({
            confirmation: 'fail',
            message: err.message
        })
    })
})

router.get('/currentuser', (req, res) => {
    if(req.vertexSession.user) {
        // res.json({
        //     confirmation: 'user logged in'
        // })
        turbo.fetchUser(req.vertexSession.user.id)
        .then(data => {
            res.json({
                confirmation: 'user logged',
                data: data
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
    } else {
        res.json({
            confirmation: 'user not logged in'
        })
    }
})

module.exports = router
