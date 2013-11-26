# HTML5 video format conversion tool

### Requires ffmpeg

```
sudo apt-get install ffmpeg
```
```
git clone git://source.ffmpeg.org/ffmpeg.git ffmpeg
```

If provided an .webm or .mp4 the module will produce the other format and a .jpg screenshot at 1 second.  If given any other video format it will attempt both conversions.  The module will return an object with the locations of the files or null if it was unable to convert.

Current testing module is configured to be executed from within the 'tests/' directory.  In index.js is a hard-coded path to the 'scipts/' directory named 'path_to_scripts'.

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
