// Dynamic Dark Mode
function updateBackgroundColor() {
  const hour = new Date().getHours();
  const isDaytime = hour > 6 && hour < 18;
  // const isDaytime = false;
  
  // Set background color to a lighter shade during the day and a darker shade during the night
  const backgroundColor = isDaytime ? '#e6e6e6' : '#222222'; // Light gray for day, darker gray for night
  const textColor = isDaytime ? '#000000' : '#ffffff';
  const sectionColor = isDaytime ? '#ffffff' : '#111111';
  const headfootColor = isDaytime ? '#bbbbbb' : '#111111';
  document.documentElement.style.setProperty('--section-color', sectionColor);
  document.documentElement.style.setProperty('--background-color', backgroundColor);
  document.documentElement.style.setProperty('--text-color', textColor);
  document.documentElement.style.setProperty('--head-foot-color', headfootColor);
}
// Dynamic Dark Mode

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

let direction = false;
// Increment color circularly
function updateMyColor() {
  // Get the current CSS color variable
  let hex_color = document.documentElement.style.getPropertyValue('--mycolor').trim();
  
  // Default starting color if not set
  if (!hex_color) {
    hex_color = "#750000";
  }

  // Convert hex to RGB
  let r = parseInt(hex_color.substring(1, 3), 16);
  let g = parseInt(hex_color.substring(3, 5), 16);
  let b = parseInt(hex_color.substring(5, 7), 16);

  // // Rainbow color transition logic
  // if (r === 117 && g < 117 && b === 0) { // #750000 → #757500
  //   g += 1;
  // } else if (r > 0 && g === 117 && b === 0) { // #757500 → #007500
  //   r -= 1;
  // } else if (r === 0 && g === 117 && b < 117) { // #007500 → #007575
  //   b += 1;
  // } else if (r === 0 && g > 0 && b === 117) { // #007575 → #000075
  //   g -= 1;
  // } else if (r < 117 && g === 0 && b === 117) { // #000075 → #750075
  //   r += 1;
  // } else if (r === 117 && g === 0 && b > 0) { // #750075 → #750000
  //   b -= 1;
  // }

  // Red-Purple-Blue color transition logic
  if (r === 117 && b < 117 && !direction) { // #750000 → #750075 (Down to blue)
    b += 1;
  } else if (r > 0 && b === 117 && !direction) { // #750075 → #000075 (Down to blue)
    r -= 1;
  } else if (r < 117 && b === 117 && direction) { // #000075 → #750075 (Up to red)
    r += 1;
  } else if (r === 117 && b > 0 && direction) { // #750075 → #750000 (Up to red)
    b -= 1;
  }
  // Update direction when the transition is complete
  if (r === 0 && b === 117) { // Transition from #000075 → #750075 (Back up to red)
    direction = true;  // Change direction to up
  } else if (r === 117 && b === 0) { // Transition from #750000 → #750075 (Down to blue)
    direction = false; // Change direction to down
  }

  // Convert back to hex format
  let newHexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  // Update the CSS color variable
  document.documentElement.style.setProperty('--mycolor', newHexColor);
}

document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
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

// Get the menu icon, popup menu, and header
const menuIcon = document.getElementById('menu-icon');
const popupMenu = document.getElementById('popup-menu');
const header = document.querySelector('header');

// Function to close the popup menu
function closePopupMenu() {
  popupMenu.style.transform = 'translateY(-100%)'; // Slide up behind the header
  setTimeout(() => {
    popupMenu.style.display = 'none'; // Hide after animation
  }, 300); // Matches the transition duration

  setTimeout(() => {
    header.style.borderRadius = '0 0 3vw 3vw'; // Reset border-radius after 0.2s
  }, 200);
}

// Toggle the popup menu when the menu icon is clicked
menuIcon.addEventListener('click', () => {
  if (popupMenu.style.transform === 'translateY(0%)') {
    closePopupMenu();
  } else {
    popupMenu.style.display = 'block';

    setTimeout(() => {
      popupMenu.style.transform = 'translateY(0%)'; // Slide down
    }, 10);

    setTimeout(() => {
      header.style.borderRadius = '0 0 3vw 0'; // Change border-radius after 0.2s
    }, 200);
  }
});


// Close the popup menu when the viewport resizes
window.addEventListener('resize', closePopupMenu);




// Initial call
updateBackgroundColor();

// Set interval to update background color every minute (60000 milliseconds)
setInterval(updateBackgroundColor, 60000);

setInterval(updateMyColor, 300);
