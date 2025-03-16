// Listen for keydown events on the entire document
document.addEventListener('keydown', function(event) {
  // Check if the Escape key is pressed
  if (event.key === "Escape") {
      // Call the closePopup function
      closePopup();
  }
});

// Function to open the popup
function openPopup(src, altText, glow) {
  // Get the modal
  var modal = document.getElementById("popup-modal");
  // Get the image and insert it inside the modal
  var modalImg = document.getElementById("popup-image");
  var modalPdf = document.getElementById("popup-pdf");
  var captionText = document.getElementById("caption");
  
  
  modal.style.display = "block";
  modalPdf.style.display = "none";
  modalImg.style.display = "block";
  modalImg.src = src;
  captionText.innerHTML = altText;

  // Apply or remove glow effect
  if (glow) {
    modalImg.classList.add("glow-effect");
  } else {
    modalImg.classList.remove("glow-effect");
  }
}

// Function to open the popup for PDFs
function openPdf(pdfSrc, altText) {
  var modal = document.getElementById("popup-modal");
  var modalImg = document.getElementById("popup-image");
  var modalPdf = document.getElementById("popup-pdf");
  var captionText = document.getElementById("caption");

  modal.style.display = "block";
  captionText.innerHTML = altText;

  // Hide the image and show the embedded PDF
  modalImg.style.display = "none";
  modalPdf.style.display = "block";
  modalPdf.src = pdfSrc;
}

// Function to close the popup
function closePopup() {
  var modal = document.getElementById("popup-modal");
  modal.style.display = "none";
}

// Function to open the popup
function openPopup(src, altText, glow) {
  // Get the modal
  var modal = document.getElementById("popup-modal");
  // Get the image and insert it inside the modal
  var modalImg = document.getElementById("popup-image");
  var modalPdf = document.getElementById("popup-pdf");
  var captionText = document.getElementById("caption");
  
  
  modal.style.display = "block";
  modalPdf.style.display = "none";
  modalImg.style.display = "block";
  modalImg.src = src;
  captionText.innerHTML = altText;

  // Apply or remove glow effect
  if (glow) {
    modalImg.classList.add("glow-effect");
  } else {
    modalImg.classList.remove("glow-effect");
  }
}

// Function to open the popup for PDFs
function openPdf(pdfSrc, altText) {
  var modal = document.getElementById("popup-modal");
  var modalImg = document.getElementById("popup-image");
  var modalPdf = document.getElementById("popup-pdf");
  var captionText = document.getElementById("caption");

  modal.style.display = "block";
  captionText.innerHTML = altText;

  // Hide the image and show the embedded PDF
  modalImg.style.display = "none";
  modalPdf.style.display = "block";
  modalPdf.src = pdfSrc;
}


// Function to close the popup
function closePopup() {
  var modal = document.getElementById("popup-modal");
  modal.style.display = "none";
}















// Include the following div at the end of html files to initialze modal object:

/*
    <div id="popup-modal" class="modal">
      <span class="close" onclick="closePopup()">&times;</span>
      <img id="popup-image" class="modal-content" />
      <iframe id="popup-pdf" class="modal-content" style="display: none"></iframe>
      <div id="caption"></div>
    </div>
*/