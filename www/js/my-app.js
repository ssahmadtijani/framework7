// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

    document.getElementById("createFile").addEventListener("click", createFile);
    document.getElementById("writeFile").addEventListener("click", writeFile);
    document.getElementById("readFile").addEventListener("click", readFile);
    document.getElementById("removeFile").addEventListener("click", removeFile);
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})


function createFile() {
    var type = window.PERMANENT;
    var size = 5*1024*1024;
    window.requestFileSystem(type, size, successCallback, errorCallback)
 
    function successCallback(fs) {
       fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
          alert('File creation successfull!')
       }, errorCallback);
    }
 
    function errorCallback(error) {
       alert("ERROR: " + error.code)
    }
     
 }


 function writeFile() {
    var type = window.PERMANENT;
    var size = 5*1024*1024;
    window.requestFileSystem(type, size, successCallback, errorCallback)
 
    function successCallback(fs) {
       fs.root.getFile('log.txt', {create: true}, function(fileEntry) {
 
          fileEntry.createWriter(function(fileWriter) {
             fileWriter.onwriteend = function(e) {
                alert('Write completed.');
             };
 
             fileWriter.onerror = function(e) {
                alert('Write failed: ' + e.toString());
             };
 
             var blob = new Blob(['Lorem IpsumOIOIOII'], {type: 'text/plain'});
             fileWriter.write(blob);
          }, errorCallback);
       }, errorCallback);
    }
 
    function errorCallback(error) {
       alert("ERROR: " + error.code)
    }
 }


 function readFile() {
    var type = window.PERMANENT;
    var size = 5*1024*1024;
    window.requestFileSystem(type, size, successCallback, errorCallback)
 
    function successCallback(fs) {
       fs.root.getFile('log.txt', {}, function(fileEntry) {
 
          fileEntry.file(function(file) {
             var reader = new FileReader();
 
             reader.onloadend = function(e) {
                var txtArea = document.getElementById('textarea');
                txtArea.value = this.result;
             };
             reader.readAsText(file);
          }, errorCallback);
       }, errorCallback);
    }
 
    function errorCallback(error) {
       alert("ERROR: " + error.code)
    }
 }	


 function removeFile() {
    var type = window.PERMANENT;
    var size = 5*1024*1024;
    window.requestFileSystem(type, size, successCallback, errorCallback)
 
    function successCallback(fs) {
       fs.root.getFile('log.txt', {create: false}, function(fileEntry) {
 
          fileEntry.remove(function() {
             alert('File removed.');
          }, errorCallback);
       }, errorCallback);
    }
 
    function errorCallback(error) {
       alert("ERROR: " + error.code)
    }
 }	
