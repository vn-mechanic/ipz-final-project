const gulp = require('gulp');
const http = require('http');
const connect = require('connect');
const serveStatic = require('serve-static');
const Launcher = require('webdriverio/build/lib/launcher');
const path = require('path');
const wdio = new Launcher(path.join(__dirname, 'wdio.conf.js'));

let httpServer;

gulp.task('test', () => {
    //Default test
    console.log('It works!');
});

gulp.task('http', (done) => {
    //Setting up a webpage on the 9000 port
    const app = connect().use(serveStatic('test/fixtures'));
    http.createServer(app).listen(9000, done);
});

gulp.task('e2e', ['http'], () => {
    //Checking if webdriverio works
    return wdio.run(code => {
        process.exit(code);
    }, error => {
        console.error('Fail', error.stacktrace);
        process.exit(1);
    });
});

gulp.task('test-close', ['e2e'], () => {
    //Shytting down the server
    httpServer.close();
});