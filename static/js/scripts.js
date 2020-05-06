//----------variable declarations--------//
var $inputType = $('#input-type');
var $chosenFile = $('#choose-file');
var $submitButton = $('#submit-button');
var $outputAlbumArea = $('.card-box');
var $loader = $('.ld');
var $cards = $('article');
var $download = $('#download');

//------------event listeners---------//
$inputType.on('change', submitButtonToggle)
$chosenFile.on('change', submitButtonToggle);
$submitButton.on('click', loaderToggle);
$download.on('click', downloadFiles);

////////////////////////////////////////////////////////////////////////////////
//Functions
//NOTE: These functions handle html interactions

//---------------------clear all the input fields------------------//
function clearInputs() {
  $inputTitle.val("");
  $inputType.val("");
  $chosenFile.val("")
}

//-----------toggles the submit button disabled attribute--------------//
function submitButtonToggle() {
  if ($inputType.val() && $chosenFile.val()) {
    $submitButton.prop('disabled', false);
  } else {
    $submitButton.prop('disabled', true);
  }
}

//-------------toggles the loading animation on and off---------------//
function loaderToggle() {
  $loader.prop('hidden', false);
  $outputAlbumArea.prop('hidden', true)
  setTimeout(function() {$loader.prop('hidden', true)}, 7000);
  setTimeout(function() {$outputAlbumArea.prop('hidden', false)}, 7000);
  $download.prop('hidden', false);
}

////////////////////////////////////////////////////////////////////////////////
//NOTE: These functions are for sever file interactions

//This function will zip the files and allow for download
function downloadFiles() {
  var zip = new JSZip(); //Create new zip object

  //Check to see if files have been processed
  if (document.getElementById('file_cards').dataset.processed == 'false') {
    console.log('no files to download');
    return;
  }

  //Add files to zip
  cards = document.getElementById('file_cards').children
  for(var i=0; i<cards.length; i++) {
    name = cards[i].id
    data = cards[i].dataset.file_data

    zip.file(name, data)
  }

  //Check for user title, may not need this
  title = "nn4mc"

  //Download the zip file
  zip.generateAsync({type:"blob"})
    .then(blob => saveAs(blob, title+".zip"))
    .catch(e => console.log(e))
}
