var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var readdirp = require('readdirp');
var json = require('JSONStream');
var findup = require('findup');

path.join(process.cwd(), 'test.txt');

path.join(__dirname, 'test2.txt');

// Pipe contents of a file to std out
fs.createReadStream(path.join(__dirname, 'text.txt'))
  .pipe(process.stdout);

// Pipe contents of a file into a new file
fs.createReadStream(path.join(__dirname, 'text.txt'))
  .pipe(fs.createWriteStream(path.join(__dirname, './my-other-file')))

// Remove directory, rm -rf style
rimraf(path.join(__dirname, './my-directory'), function(err) {
  if(err) {
    console.log(err);
  }
});

// Create directory
mkdirp(path.join(__dirname, 'foo/bar'), function(err) {
  if(err) {
    console.log(err);
  }
});

// recursively print out all files in all subdirectories
// to the command line. The object stream must be
// stringified before being passed to `stdout`.
readdirp({ root: path.join(__dirname), fileFilter: [ '!.git' ], directoryFilter: [ '!.git', '!*modules' ] })
  .pipe(json.stringify())
  .pipe(process.stdout);

findup(path.join(__dirname), 'package.json', function(err, resp) {
  if(err) {
    console.log(err);
  }
  console.log('dir is: ' + resp);
});
