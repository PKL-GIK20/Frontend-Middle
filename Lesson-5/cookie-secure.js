// Mengimpor pustaka js-cookie
var Cookies = require("js-cookie");

// Membuat data sensitif
var sensitiveData = "Hello World";

// Membuat cookie dengan atribut HttpOnly, Secure, dan SameSite
Cookies.set("sensitiveData", sensitiveData, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
});

// Membaca cookie dari sisi klien (tidak akan berhasil karena atribut HttpOnly)
var sensitiveDataFromClient = Cookies.get("sensitiveData");

// Menampilkan data sensitif (tidak akan berhasil karena atribut HttpOnly)
console.log(sensitiveDataFromClient); // undefined

// Membaca cookie dari sisi server (akan berhasil jika cookie dikirimkan melalui header Cookie)
var http = require('http');

http.createServer(function (req, res) {
  var cookies = req.headers.cookie;
  var sensitiveDataFromServer = null;

  if (cookies) {
    var cookieArray = cookies.split(';');
    cookieArray.forEach(function(cookie) {
      var cookieParts = cookie.trim().split('=');
      var cookieName = cookieParts[0];
      var cookieValue = cookieParts[1];

      if (cookieName === "sensitiveData") {
        sensitiveDataFromServer = cookieValue;
      }
    });
  }

  // Menampilkan data sensitif (akan berhasil karena atribut HttpOnly)
  console.log(sensitiveDataFromServer); // Hello World

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!\n');
}).listen(3000);

// Menghapus cookie dari sisi klien atau server
Cookies.remove("sensitiveData");
