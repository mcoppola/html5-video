# HTML5 video format conversion tool

## Not yet implemented. Just a set of failing unit tests at the moment.

For successful cross-browser use of HTML5 video you must supply the video in both WebM and MP4 formats. This module will accept a WebM (VP8) or MP4 video, convert it to the other format, and also generate a JPEG thumbnail image as a fallback.

Usage will be as follows:

```javascript
var html5Video = require('html5-video');
html5Video('myfile.mp4', function(err, result) {
  // If err is null you can now access the following filenames:
  // result.mp4
  // result.webm
  // result.jpg
});
```

To run the tests you need to install mocha:

npm install -g mocha

Then you can do:

cd tests
mocha test
