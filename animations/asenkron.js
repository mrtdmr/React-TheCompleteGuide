'use strict';
let adi = null;

// Uzun bir AJAX veya Fetch API isteği
function islem(callback) {
  setTimeout(() => {
    adi = 'Yusuf SEZER';
    callback();
  }, 2000);
}

// Yazdırma işlemi
function yazdir() {
  setTimeout(() => {
    console.log(adi);
  }, 1000);
}

islem(yazdir);
