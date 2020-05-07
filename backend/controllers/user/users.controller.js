const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/user/User.model');

process.env.SECRET_KEY = 'secret';

router.post('/register', (req, res) => {

	const userData = new User(req.body);

	User.findOne({
			email: req.body.email
		})
		.then(user => {
			if(!user) {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					userData.password = hash;
					User.create(userData)
					 .then(user => {
					 	res.send(`${user.email}  Registred`);
					 })
					 .catch(err => {
					 	res.send('err '+ err);	
					 })
				});
			}else{
				res.status(400).send('User already exists');
			}
		})
		 .catch(err => {
		 	res.send(err);
		 });
});

router.post('/login', (req, res) => {
	User.findOne({email: req.body.email})
		.then(user => {
			if(user){
				if(bcrypt.compareSync(req.body.password, user.password)){
					const payload = req.body;
					let token = jwt.sign(payload, process.env.SECRET_KEY, {
						expiresIn: 1440
					});
					res.send(token);
				}else{
					res.status(400).send('User does not exist');
				}
			}else{
				res.status(400).send('User does not exist');
			}
		})
		.catch(err => {
			res.status(400).send(err);
		})
})

router.get('/profile', (req, res) => {
	let coder = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

	User.findOne({
		_id: coder._id
	})
	 .then(user => {
	 	if(user){
	 		res.send(user)
	 	}else{
	 		res.status(400).send('User does not exist');
	 	}
	 })
	  .catch(err => {
	  	res.status(400).send('User does not exist');
	  });
});

module.exports = router;