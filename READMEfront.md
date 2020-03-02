Here is the link to the final page: (https://twirlinggoddess.github.io/foto-finder/)

# Foto Finder
33 Specification
With some jQuery lessons under your belt, it’s time to try your hand at building a small application: a photo album called Foto Finder! For this project, you can use either vanilla JavaScript (document.querySelector()) or the jQuery library ($()). If you’re going to use jQuery, don’t forget to pull in the library.

In it’s simplest form, the application should have the following:

## Setup: File Structure
Before you start writing code for this project, set up your project directory as follows:

Your project directory (called foto-finder)
An HTML file called index.html, which will contain all of your HTML code.
A CSS file called styles.css, which will contain all of your CSS including media queries.
A JavaScript file called scripts.js, which will contain all of your JavaScript code.
A directory called photos that will contain the image files that the user can save to the photo album page
Here is a visual representation of the file structure:

|-- foto-finder
   |-- index.html
   |-- styles.css
   |-- scripts.js
   |-- photos
      |-- photo1.jpg
      |-- photo2.jpg
      |-- photo3.jpg
It is up to you to gather images to put into your photos directory. These assets are not provided for you - only button assets are provided. In the example above, photo1.jpq is just a placeholder name to show you that your image files go inside the photos directory. The names of the image files can be whatever you want.

## Phase One
This phase is all about setting up the user inputs and general structure of the page. The page will not be very interactive in this phase.

Two input fields for new photos to put in the album
One for the title of the photo
One for the caption of the photo
One input field to upload the photo (hint: look at the different HTML input element type attributes and how you can use on of them to select a file from your computer)
This article can help you with styling the file upload button
One “Add to Album” button for adding the photo to the album so you see it on the page
A section for all of the photos in the album to live
## Phase Two
This phase builds on Phase 1 and gives some functionality to the page.

When a user fills in the Title, Caption, selects an image file from the photos directory, and then clicks the “Add to Album”, the photo should be added to the photo album.
Each photo, when added to the album, is placed in a “card”, and each photo card should display:
The photo
The title of the photo
The caption of the photo
A button to mark the photo as a “Favorite”
A button to “Remove” the photo from the album
The application should be responsive and work equally well on desktop and mobile
When the user clicks on the “Favorite” button, the photo card background turns (a different color), and the button should stay in the active (pink) state
When the user clicks on the “Remove” button, the photo should be removed from the page
Note: If you refresh the page, the photos disappear! This is OK. You do not need to worry about photo persistence on page refresh (we’ll handle that in later projects).

## Phase Three
Let’s improve the user experience in this phase.

If the user does not have text in the Title or Caption input elements, or they have not selected a photo from the photos directory, then the “Add to Album” button should be disabled.
If there are no photos in the album yet, then there should be an indication to the user to add photos, displayed in the empty photo section.
The file selector should only allow image file types
Extensions
Sorting: If a user marks a photo as a “Favorite”, then that photo (an all other photos marked as favorites) should show at the top of the page before any other photos.

Image Analysis: Mathematically determine the most prominent color of the photos in the album, and change the background of the album section to that prominent color. The background color should be calculated every time a new photo is added to the album.

Animations: When a user removes a photo, the photos in the album shift almost instantly, which is a sharp, hard transition. Add a soft, brief animation that lets the remaining photos move smoothly.

Zoom View: When a user clicks on an image card, the application should pop up a large view of the image overlaid on the rest of the album. Once in zoom view, the user should be able to click something on the image (like an “X”) to exit out of the zoom view and see all of the images in the 
