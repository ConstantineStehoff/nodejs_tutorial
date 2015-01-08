var fs = require('fs'); //filestream module
var http = require('http');
 
http.createServer(function(request, response){
	var newFile = fs.createWriteStream("readme_copy.md");
	var fileBites = request.headers['content-length'];
	var uploadedBites = 0;

	request.pipe(newFile);

	request.on('data', function(chunk){
		uploadedBites += chunk.length;
		var progress = (uploadedBites/fileBites) * 100;
		response.write("progress " + parseInt(progress, 10) + "%\n");
	});

	request.on('end', function(){
		response.end('uploaded!');
	});
}).listen(8080);