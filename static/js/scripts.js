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
var output_files;


//------------event listeners---------//
$inputType.on('change', submitButtonToggle)
$chosenFile.on('change', submitButtonToggle);
$submitButton.on('click', loaderToggle);
// $download.on('click', downloadFiles);

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

// // -----------------creates cards of output files-------------------//
// function uploadCard(outputFiles) {
//   Object.keys(outputFiles).forEach((filename, index) => {
//   $outputAlbumArea.append(`
//     <article>
//       <h2>${filename}</h2>
//       <div class="file-container" aria-label="file-container">
//         <p alt="bookmarked file" class="new-file" id="new-file">${Object.values(outputFiles)[index]}</p>
//       </div>
//       <p>${$inputType.val()}</p>
//       <aside>
//         <button id="delete-button" type="submit" name="trash"></button>
//         <button id="love-button" type="icon" name="love"></button>
//       </aside>
//     </article>
//     `);
//   clearInputs();
//   submitButtonToggle();
//   })
// }

////////////////////////////////////////////////////////////////////////////////
//NOTE: These functions are for sever file interactions

//COOPER
//NOTE: These are functions that Cooper has added

//This function will zip the files and allow for download
function downloadFiles() {
  var zip = new JSZip();
  
  //Add files to zip
  cards = document.getElementById('file_cards').children
  for(var i=0; i<cards.length; i++) {
    name = cards[i].id
    data = cards[i].dataset.file_data

    zip.file(name, data)
  }

  title = "nn4mc"
  if ($inputTitle.val() != '') {
    title = $inputTitle.val();
  }

  zip.generateAsync({type:"blob"})
    .then(blob => saveAs(blob, title+".zip"))
    .catch(e => console.log(e))
}

//This function will request an example JSON object from server
//This JSON object is what the files will look like
function get_JSON_test_output() {
  //Call test function in server
  $.get("/jsontest",
  function(resp, req, err){
    output_files = resp;
    uploadCard(resp);
  })
}
