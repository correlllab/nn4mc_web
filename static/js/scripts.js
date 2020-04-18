//Variables and basic functions

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
// $download.on('click', downloadFiles);
$download.on('click', testProcess)

////////////////////////////////////////////////////////////////////////////////

//Functions
//NOTE: These functions handle html interactions
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

function toggle_ld(event) {
  event.preventDefault();
  $loader.prop('hidden', false);
  $outputAlbumArea.prop('hidden', true)
  setTimeout(function() {$loader.prop('hidden', true)}, 3000);
  setTimeout(function() {uploadCard(event)}, 3000);
  setTimeout(function() {$outputAlbumArea.prop('hidden', false)}, 3000);
  $download.prop('hidden', false);
}

////////////////////////////////////////////////////////////////////////////////

//NOTE: These functions are for sever file interactions

//COOPER
//NOTE: These are functions that Cooper has added

var CFiles_JSON; //C files from python

//This function will send the file data to the python server
function translateFile(event) {
  event.preventDefault();
  var data = 1;//Get file upload from html

  $.post("/postdata",
  {file_data: data},
  function(err, req, resp){
    // passing the response text to uploadCard, along with the event, for checks
    console.log(resp, req, err);
    uploadCard(event, resp);
  });
}

//This function will zip the files and allow for download
function downloadFiles(event) {
  event.preventDefault()
  var zip = new JSZip();

  //Add files to zip

  zip.generateAsync({type:"blob"})
    .then(blob => saveAs(blob, "nn4mc.zip"))
    .catch(e => console.log(e))
}

//This function will request an example JSON object from server
//This JSON object is what the files will look like
function testProcess(event) {
  //Call test function in server
  $.get("/posttest",
  function(err, req, resp){
    console.log(resp, req, err);
    CFiles_JSON = resp;
  })
}
