const makeDir = require('make-dir');
(async () => {
    const paths = await Promise.all([
        makeDir('sourse'),
        makeDir('sourse/mp3'),
        makeDir('sourse/mp3/topWords'),
        makeDir('sourse/mp3/output')
    ]);
 
    //console.log(paths);
    /*
    [
        '/Users/sindresorhus/fun/unicorn/rainbow',
        '/Users/sindresorhus/fun/foo/bar'
    ]
    */
})();