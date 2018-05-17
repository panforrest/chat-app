// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const CDN = (process.env.TURBO_ENV == 'dev') ? '' : process.env.TURBO_CDN

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
    const recentTopics = [
    	{room:'politics', title:'Should I run 2020', profile:{username:'dtrump', image:''}, numReplies:4, date:'March 20, 2018'},
    	{room:'sports', title:'We will win NBA title?', profile:{username:'lebron', image:''}, numReplies:14, date:'March 22, 2018'}
    ]


    const config = {
    	cdn: CDN,
    	page: 'Home',
    	topics: recentTopics,
        loggedIn: 'false'
    }

    //no one logged in
    if(req.vertexSession == null) {
        res.render('index', config)
        return  
    }
     
    //no one logged in
    if(req.vertexSession.user == null) {
        res.render('index', config)
        return  
    }

    //Someone logged in!
    turbo.fetchOne('user', req.vertexSession.user.id)
    .then(data => {
        delete config['loggedIn']
        config['user'] = data
        res.render('index', config)
    })
    .catch(err => {
        res.render('index', config)
    })
})

router.get('/rooms', (req, res) => {
	res.render('rooms', null)
})

router.get('/room/:id', (req, res) => {  //router.get('/room', (req, res) => {
	res.render('room', {room: req.params.id})
})

module.exports = router
