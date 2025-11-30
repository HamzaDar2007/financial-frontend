import { app } from 'electron';
console.log('App:', app);
if (app) {
    console.log('App is ready');
    app.quit();
}
