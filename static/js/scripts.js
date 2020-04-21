//----------variable declarations--------//

var $inputTitle = $('#input-title');
var $inputType = $('#input-type');
var $chosenFile = $('#choose-file');
var $submitButton = $('#submit-button');
var $outputAlbumArea = $('.card-box');
var $deleteButton = $('#delete-button');
var $loveButton = $('#love-button');
var $loader = $('.ld');
var $cards = $('article');
var $download = $('a');


//------------event listeners---------//
$inputTitle.on('keyup', submitButtonToggle);
$inputType.on('change', submitButtonToggle);
$chosenFile.on('change', submitButtonToggle);
$submitButton.on('click', toggle_ld);
// $download.on('click', downloadFiles);

////////////////////////////////////////////////////////////////////////////////

//Functions
//NOTE: These functions handle html interactions

//-----------toggles the submit button disabled attribute--------------//
function submitButtonToggle() {
  // console.log($chosenFile);
  if (($inputTitle.val() && $inputType.val()) && $chosenFile.val()) {
    $submitButton.prop('disabled', false);
  } else {
    $submitButton.prop('disabled', true);
    $('#uploader').prop('style', "opacity: .4")
  }
  if($inputType.val()){
    $('#uploader').prop('style', "opacity: 1")
  }
}

//-------------toggles the loading animation on and off---------------//
function toggle_ld(event) {
  if ($submitButton.is(':disabled')) {
    alert('Please enter all form fields to');
  }
  event.preventDefault();
  $loader.prop('hidden', false);
  $outputAlbumArea.prop('hidden', true)
  setTimeout(function() {$loader.prop('hidden', true)}, 3000);
  setTimeout(function() {processFile()}, 3000);
  setTimeout(function() {$outputAlbumArea.prop('hidden', false)}, 3000);
  $download.prop('hidden', false);
}

//----------------parses the uploaded file into text-----------------//
function processFile() {
  var files = document.getElementById('choose-file').files;
  if (!files.length) {
    alert('Please select a file!');
    return;
  }
  for(let i = 0; i < files.length; i++){
    var file = files[i];
    var reader = new FileReader();
    reader.onloadend = function(evt) {
      evt.preventDefault();
      if (evt.target.readyState == FileReader.DONE) {
        translateFile(evt.target.result);
      }
    }
    var blob = file.slice(0, file.size);
    reader.readAsBinaryString(blob);
    testProcess();
  }
}

// -----------------creates cards of output files-------------------//
function uploadCard(outputFiles) {
  Object.keys(outputFiles).forEach((filename, index) => {
  $outputAlbumArea.append(`
    <article>
      <h2>${filename}</h2>
      <div class="file-container" aria-label="file-container">
        <p alt="bookmarked file" class="new-file" id="new-file">${Object.values(outputFiles)[index]}</p>
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
  })
}

//---------------------clear all the input fields------------------//
function clearInputs() {
  $inputTitle.val("");
  $inputType.val("");
  $chosenFile.val("")
}

////////////////////////////////////////////////////////////////////////////////

//NOTE: These functions are for sever file interactions

//COOPER
//NOTE: These are functions that Cooper has added

var CFiles_JSON; //C files from python   ????????? <------DO YOU STILL NEED THIS ????????????

//This function will send the file data to the python server
function translateFile(fileString) {
  var data = {type: $inputType.val(), text: fileString};//Get file upload from html
  console.log(data.text);
  $.post("/postdata",
  {file_data: data},
  function(err, req, resp){
    console.log(resp, req, err);
  });
}

//This function will zip the files and allow for download
function downloadFiles(event) {
  event.preventDefault()
  var zip = new JSZip();
  //Add files to zip
  //--?????-----maybe we save as title user input-----????--//
  zip.generateAsync({type:"blob"})
    .then(blob => saveAs(blob, "nn4mc.zip"))
    .catch(e => console.log(e))
}

//This function will request an example JSON object from server
//This JSON object is what the files will look like
function testProcess() {
  //Call test function in server
  $.get("/posttest",
  function(err, req, resp){
    console.log(req, resp, err);
    CFiles_JSON = resp;     //????????? <------DO YOU STILL NEED THIS ????????????
    uploadCard(err);
  })
}
