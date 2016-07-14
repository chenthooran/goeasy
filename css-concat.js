var fs = require('fs'),
    glob = require('glob'),
    args = process.argv.splice(2);

if(args.length !== 2)
    return console.log('Incorrect usage. "node concat [glob] [output file]"');

try {
    fs.accessSync(args[1], fs.F_OK);
    fs.unlinkSync(args[1]);
} catch (e) {
    // It isn't accessible
}

glob.sync(args[0]).forEach(function(file) {
    fs.appendFileSync(args[1], fs.readFileSync(file, 'utf-8'));
});