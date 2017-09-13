const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 4000;
const app = express();



hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})
hbs.registerHelper('capitalize', (text) => {
	return text.toUpperCase();
})

hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.set('view engine', 'hbs')

app.use((req, res, next) => {
	const nowDate = new Date().toString()
	const log = `${nowDate}: ${req.method} ${req.url}`

	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log')
		}
	})
	next()
})

// app.use((req, res, next) => {
// 	res.render('main.hbs')
// })

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'Welcome',
	})
})


app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	})
})

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Error message'
	})
})

app.listen(port, () => {
	console.log(`Server starting in ${port} port`)
});