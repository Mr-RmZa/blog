const connection = require("../config/db");
var formidable = require('formidable');
var fs = require('fs');

exports.login = (req, res) => {
    connection.execute(
        'SELECT email FROM users WHERE email = ?', [req.body.email],
        function(err, results, fields) {
          if( results.length > 0 ) {
            connection.execute(
                'SELECT password FROM users WHERE password = ?', [req.body.password],
                function(err, results, fields) {
                  if( results.length > 0 ) {
                    req.session.user = req.body.email;
                    connection.execute(
                        'UPDATE users SET is_login = 1 WHERE users.email = ?', [req.body.email],
                        function(err, results, fields) {
                            // console.log(results);
                            return res.render('index', {
                                message: 'وارد شدین!',
                                class: "success"
                            })
                        });
                  } else {
                    return res.render('login', {
                        message: 'Password Invalid!',
                        class: "danger"
                        })
                  } 
                }
              );
        } else {
            return res.render('login', {
            message: 'email not found',
            class: 'danger'
            })
        }
        }
        
      );
};

exports.register = (req, res) => {
    connection.execute(
        'SELECT email FROM users WHERE email = ?', [req.body.email],
        function(err, results, fields) {
          console.log(results);
          console.log(fields);
          if( results.length > 0 ) {
            return res.render('register', {
                message: 'This email is already in use',
                class: "danger"
            })
        } else {
            connection.execute(
                'INSERT INTO `users` (`name`, `email`, `password`) VALUES (?, ?, ?)', [req.body.name, req.body.email, req.body.password],
                function(err, results, fields) {
                  console.log(results);
                  console.log(fields);
                }
              );
            return res.render('index', {
            message: 'ثبت نام با موفقیت انجام شد!',
            class: "success"
            })
        }
        }
    );
};

exports.file = (req, res) => {
      var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log(req, files);
      var oldpath = files.filetoupload.filepath;
      var newpath = 'C:/Users/m.ramezani/Desktop/shop/public/file/' + files.filetoupload.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        return res.render('index', {
          message: 'فایل با موفقیت آپلود شد',
          class: "success"
          })
      });
 });
};