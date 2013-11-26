// html5-video converter tool
//
// *assumes input file is a video file of any format
// *requires ffmpeg

var async = require('async'),
    exec = require('child_process').exec,
    fs = require('fs');

module.exports = function(fromFile, callback) {
  
  // Get the file path, basename without extention, and given format
  var path, fileName;
  var givenFormat = fromFile.substring(fromFile.lastIndexOf(".") + 1, fromFile.length);
  if (fromFile.indexOf("/") !== -1) {
    path = fromFile.substring(0, fromFile.lastIndexOf("/") + 1);
    fileName = fromFile.substring(fromFile.lastIndexOf("/") + 1, fromFile.lastIndexOf("."));
  } else {
    path = './';
    fileName = fromFile.substring(0, fromFile.lastIndexOf("."));
  }  

  async.series([
      // 1. Check if ffmpeg is installed
      function (cb) {
        verify_packages('ffmpeg', function (err, res) {
          if (err) return cb(err)
          if (res.ffmpeg) cb(null)
          else cb("html5Video: ffmpeg is not installed.")
        });
      },

      // 2. Check the filetype then generate the other
      function (cb) {
        switch(givenFormat){
          case 'mp4':
            make_webm(fromFile, path + fileName, function (err, res) {
              if (err) return cb(err)
              cb(null);
            });
          case 'webm':
            make_mp4(fromFile, path + fileName, function (err, res) {
              if (err) return cb(err)
              cb(null);
            });
          default:
            // Input is something else
            // We will try to generate mp4 and webm 
            // but we wont stop it from failing
            // 4. will validate output
            ['.webm', '.mp4'].forEach( function (fmt, cb) {
                ffmpeg_ex(fromFile, path + fileName, fmt, function (err, res) {});});
            cb(null);
            
        }
      },

      // 3. Make screen shot at 00:01
      function (cb) {
        make_screenshot(fromFile, path + fileName, function (err, res) {
          if (err) return cb(err)
          cb(null);
        });
      },

      // 4. Validate files and populate return object
      function (cb) {
        var expected = ['mp4', 'webm', 'jpg'];
        var res = {};

        // Check what exists and add locations to res
        // For failled conversions, ffmpeg will make an empty file
        // so we need to verfiy the file actually has data.
        // If not, delete it and set location to null
        for (var i=0; i < expected.length; i++) {
          fn = path + fileName + '.' + expected[i];
          if (fs.existsSync(fn)){
            stats = fs.statSync(fn);
            if (stats.size > 0) {
              res[expected[i]] = fn;
            } else { 
              res[expected[i]] = null;
              fs.unlinkSync(fn);
            }
          } else {
            res[expected[i]] = null;
          }
        };
        callback(null, res);
      }

    ],

    // Done: return locations
    function (err, results) {
      if (err) return callback(err)
      callback(null, results);
    }
  );
  

};

// .sh exec calls -----------------------------------------------------------//

var path_to_scripts = '../scripts/'  // * fix hard code


verify_packages = function (package, cb) {
  exec(path_to_scripts + 'verify_packages.sh ' + package, function (err, stdout, stderr) {
    if (err) return cb(err);
    return cb(null, JSON.parse(stdout));
  });
};

make_webm = function (original, dest, cb) {
  exec(path_to_scripts + 'ffmpeg.sh ' + original + ' ' + dest + '.webm', function (err, stdout, stderr) {
    if (err) return cb(err);
    return cb(null);
  });
}

make_mp4 = function (original, dest, cb) {
  exec(path_to_scripts + 'ffmpeg.sh ' + original + ' ' + dest + '.mp4', function (err, stdout, stderr) {
    if (err) return cb(err);
    return cb(null);
  });
}

ffmpeg_ex = function (original, dest, targetFormat, cb) {
  exec(path_to_scripts + 'ffmpeg_ex.sh ' + original + ' ' + dest + targetFormat, function (err, stdout, stderr) {
    if (err) return cb(err);
    return cb(null);
  });
}

make_screenshot = function (original, dest, cb) {
  exec(path_to_scripts + 'screenshot.sh ' + original + ' ' + dest + '.jpg', function (err, stdout, stderr) {
    if (err) return cb(err);
    return cb(null);
  });
}