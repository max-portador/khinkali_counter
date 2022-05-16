import * as fs from "fs";

const dropboxV2Api = require('dropbox-v2-api');

const dropbox = dropboxV2Api.authenticate({
    token: 'sl.BHt-0zQaPRW63OHpOcIR850e1GN6HmjMWzi0ZfPEpy1NQYY_Xy_W4h3kMc4UixLoZWeeIjH7zt3Y6MXeuXY9ixAatjcTBVsJB1fAgfgaTsYs1-iOXSyUDp7opD-XRsJPZlViuZg'
});

// use session ref to call API, i.e.:
dropbox({
    resource: 'files/upload',
    parameters: {
       path: './',
        'mode': 'add',
        'autorename': true,
        'mute': false,
        'strict_conflict': false
    },
    readStream: fs.createReadStream('path/to/file.js')
}, (err, result, response) => {
    if (err) { return console.log(err); }
    console.log(result);
});
