// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

router.post('/register', function(req, res) {
    // req.vertexSession.user = {id: data.id}
    turbo.createUser(req.body)
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

router.post('/login', function(req, res) {
    turbo.login(req.body)
    .then(data => {
        req.vertexSession.user = {id: data.id}
        res.json({
            confirmation: 'success',
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

    //no one logged in
    if(req.vertexSession == null) {
        res.json({
            confirmation: 'success',
            user: null
        }) 
        return  
    }
     
    //no one logged in
    if(req.vertexSession.user == null) {
        res.json({
            confirmation: 'success',
            user: null
        }) 
        return  
    }

    //Someone logged in!
    turbo.fetchOne('user', req.vertexSession.user.id)
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
})

router.get('/logout', (req, res) => {
    req.vertexSession.reset()  //req.vertexSession.user.id
    res.redirect('/')

    // res.json({
    //     confirmation: 'success',
    //     message: 'LOGOUT'
    // })
})

module.exports = router

