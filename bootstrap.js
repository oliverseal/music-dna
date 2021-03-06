/**
 * Copyright 2014 Google Inc. All Rights Reserved.
 * For licensing see http://lab.aerotwist.com/canvas/music-dna/LICENSE
 */

window.requestAnimFrame =
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.requestAnimationFrame;

(function() {

  var musicDNA = new MusicDNA();
  var fileDropArea = document.getElementById('file-drop-area');
  var artist = document.getElementById('artist');
  var track = document.getElementById('track');

  fileDropArea.addEventListener('drop', dropFile, false);
  fileDropArea.addEventListener('dragover', cancel, false);
  fileDropArea.addEventListener('dragenter', cancel, false);
  fileDropArea.addEventListener('dragexit', cancel, false);

  function cancel(evt) {
    evt.preventDefault();
  }

  function dropFile(evt) {

    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;

    if (files.length) {
      musicDNA.parse(files[0]);
      fileDropArea.classList.add('dropped');

      ID3.loadTags("filename.mp3", function() {
        var tags = ID3.getAllTags("filename.mp3");
        if (tags.artist)
          artist.innerText = tags.artist;
        if (tags.title)
          track.innerText = tags.title;
      }, {
        dataReader: FileAPIReader(files[0])
      });
    }
  }

})();
