var http = require('http');
var gb = requre('./custom_module');
http.createServer(function(request, response){
	response.writeHead(200); //Status code in header
	response.write("Hello world");
	gb.makeRequest("Blah");
	setTimeout(function(){
		response.write("Dog is done.");
		response.end();
	}, 5000);
	
}).listen(8080);

console.log('listening on port 8080');