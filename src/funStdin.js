 function funStdin(){
    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', () => {
        let chunk;
        chunk = process.stdin.read()
        process.stdout.write(`times: ${chunk}`);
        return chunk;
        
    });

    process.stdin.on('end', () => {
    process.stdout.write('end');
    });
}
module.exports = funStdin;