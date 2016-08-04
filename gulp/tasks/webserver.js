import gulp from 'gulp';
import webserver from 'gulp-webserver';
import config from '../config';
//import Proxy from 'gulp-connect-proxy';


gulp.task('webserver', function() {
    if (config.isDevelopment) {
        return gulp.src('./public')
            .pipe(webserver({
                port: '9090',
                host: '0.0.0.0',
                livereload: false,
                //directoryListing: true,
                open: false,
                proxies: [{
                    source: '/service', target: 'http://localhost:8080/ga/service', options: {
                        headers: {'Cookie': 'JSESSIONID=64CC12F5F26E737AB349F33B6E3692FE'}
                    }
                }]
            }));
    }
});

