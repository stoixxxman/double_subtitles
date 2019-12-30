const makeDir = require('make-dir');
(async () => {
    const paths = await Promise.all([
        makeDir('sourse'),
        makeDir('sourse/txt'),
        makeDir('sourse/srt'),
        makeDir('sourse/mp3')
    ]);
 
    //console.log(paths);
    /*
    [
        '/Users/sindresorhus/fun/unicorn/rainbow',
        '/Users/sindresorhus/fun/foo/bar'
    ]
    */
})();