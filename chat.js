var socket = require('socket.io');
var redis = require('redis');
var app = express.createServer();
var io = socket.listen(app);
var redisClient = redis.createClient();

var storeMessage = function(name, data){
	var message = JSON.stringify({name: name, data: data});
	redisClient.lpush("messages", message, function(err, response){
		redisClient.ltrim("messages", 0, 10);
	});
}

io.sockets.on('connection', function(client){
	console.log('Client connected...');
	client.on('messages', function(message){
		client.get('nickname', function(err, name){
			storeMessage(name, message);
		});
		client.broadcast.emit("messages", data);
	});
	client.on('join', function(name){
		redisClient.lrange("messages", 0, -1, function(err, messages){
			messages = messages.reverse();
			messages.forEach(function(message){
				message = JSON.parse(message);
				client.emit("messages", message.name + ": " + message.data);
			});
		});
		
		
	});
});