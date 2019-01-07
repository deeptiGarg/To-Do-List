var express = require("express");
var app = express();
var bodyP = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

app.use(express.static('public'));
var urlEncodedParser = bodyP.urlencoded({extended:false})

mongoose.connect('mongodb://dp:123456@35.224.75.227/deepti')
var Todo = mongoose.model('Todo', {
	text : String
});


app.get('/api/ToDos',function(req,res){
	Todo.find(function(err, todos) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		console.log("In get")
		if (err)
			res.send(err)
		res.json(todos); // return all todos in JSON format
	});
})

app.post('/api/add',urlEncodedParser,function(req,res){
	// create a todo, information comes from AJAX request from Angular
	taskN = req.body.task_name
	Todo.create({
		text : taskN,
		done : false
	}, function(err, todo) {
		if (err)
			res.send(err);

		// get and return all the todos after you create another
		Todo.find(function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos);
		});
	});
})

app.get('/', function(request,response){
	response.sendFile(__dirname + "/"+"index.html");
	console.log("Got a GET request");
})

app.post('/',function(response,request){
	console.log("Got a POST request");
})

app.get('/process_get',function(req,res){
	fN = req.query.first_name
	lN = req.query.last_name
	result = {
		first: fN,
		last : lN
	}
	console.log(lN)
	console.log(fN)
	res.send(JSON.stringify(result))
})

app.post('/process_post',urlEncodedParser,function(req,res){
	result = {
		first: req.body.first_name,
		last: req.body.last_name
	}
	res.send(JSON.stringify(result));
})

app.get('/getList',function(req,res){
	res.send("Displays all lists")
	console.log("Got a GET for List display");
})

var server = app.listen(8081, function(){
	var host = server.address().address
	var port = server.address().port
	console.log("Server running at http://%s:%s",host,port)
})

/*http.createServer(function(request,response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello World!!\n');
	
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081/");*/


//mongodb://<dbuser>:<dbpassword>@xxxx.mlab.com:<portNumber>/db-name

//mongodb://dp:123456@35.224.75.227/deepti