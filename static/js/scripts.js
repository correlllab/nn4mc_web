var $inputTitle = $('#input-title');
var $inputType = $('#input-type');
var $chosenFile = $('#choose-file');
var $submitButton = $('#submit-button');
var $outputAlbumArea = $('.card-box');
var $outputTitle = $('h2');
var $outputType = $('p');
var $uploadedFile = $('#new-file');
var $deleteButton = $('#delete-button');
var $loveButton = $('#love-button');
var $loader = $('.ld');
var $cards = $('article');
var $download = $('a');


$inputTitle.on('keyup', submitButtonToggle);
$inputType.on('keyup', submitButtonToggle);
$chosenFile.on('change', submitButtonToggle)
$submitButton.on('click', toggle_ld);
$download.click(fireDownload);

function submitButtonToggle() {
  if (($inputTitle.val() && $inputType.val()) && $chosenFile.val()) {
    $submitButton.prop('disabled', false);
  } else {
    $submitButton.prop('disabled', true);
  }
}

function uploadCard(event, resp) {
  event.preventDefault();
  // console.log(resp); //<---making sure the response is passed
  if($submitButton.is(':disabled')){
    alert('Please enter all form fields to');
  }
  $outputAlbumArea.append(`
    <article>
      <h2>${$inputTitle.val()}</h2>
      <div class="file-container" aria-label="file-container">
        <p alt="bookmarked file" class="new-file" id="new-file">${$chosenFile.val()}</p>
      </div>
      <p>${$inputType.val()}</p>
      <aside>
        <button id="delete-button" type="submit" name="trash"></button>
        <button id="love-button" type="icon" name="love"></button>
      </aside>
    </article>
    `);
  clearInputs();
  submitButtonToggle();
}

function clearInputs() {
  $inputTitle.val("");
  $inputType.val("");
  $chosenFile.val("")
}

//COOPER
//This function will five the file data to the python server
//Not entirely sure about the "function(err...)" part

// LEELEE
//** err is an error message built in that can be used in the event the request isn't successful **
function translateFile(event) {
  event.preventDefault();
  var data = 1;//Get file upload from html
  $.post("/postdata",
  {file_data: data},
  function(err, req, resp){
    //Update data in html page (NOTE: Not gonna redirect)
    // passing the response text to uploadCard, along with the event, for checks
    console.log(resp, req, err);
    uploadCard(event, resp);    
  });
}

function toggle_ld(event) {
  event.preventDefault();
  $loader.prop('hidden', false);
  $outputAlbumArea.prop('hidden', true)
  setTimeout(function() {$loader.prop('hidden', true)}, 3000);
  setTimeout(function() {uploadCard(event)}, 3000);
  setTimeout(function() {$outputAlbumArea.prop('hidden', false)}, 3000);
  $download.prop('hidden', false);
}

function fireDownload(event) {
    event.preventDefault();  
    window.location.href = 'uploads/file.doc';  
}

