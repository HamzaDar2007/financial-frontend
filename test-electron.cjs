const electron = require('electron');
console.log('Process versions:', process.versions);
console.log('Type of electron:', typeof electron);
console.log('Electron keys:', Object.keys(electron));
if (typeof electron === 'string') {
    console.log('Electron is a string path:', electron);
} else {
    console.log('Electron app is available:', !!electron.app);
}

const { app } = electron;
if (app) {
    console.log('App is ready');
    app.quit();
} else {
    console.log('App is undefined');
}
