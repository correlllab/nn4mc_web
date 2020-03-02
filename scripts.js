var $inputTitle = $('#input-title');
var $inputType = $('#input-type');
var $chosenFile = $('#choose-file');
var $submitButton = $('#submit-button');
var $outputAlbumArea = $('main');
var $outputTitle = $('h2');
var $outputType = $('p');
var $uploadedFile = $('#new-file');
var $deleteButton = $('#delete-button');
var $loveButton = $('#love-button')


$inputTitle.on('keyup', submitButtonToggle);
$inputType.on('keyup', submitButtonToggle);
$chosenFile.on('change', submitButtonToggle)
$submitButton.on('click', uploadCard);

function submitButtonToggle() {
  if (($inputTitle.val() && $inputType.val()) && $chosenFile.val()) {
    $submitButton.prop('disabled', false);
  } else {
    $submitButton.prop('disabled', true);
  } 
}

function uploadCard(event) {
  event.preventDefault();
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

// document.getElementById("yourFileInput").files[0].fileName;
