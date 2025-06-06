// Dynamic Dark Mode
function updateBackgroundColor() {
  const hour = new Date().getHours();
  const isDaytime = hour > 6 && hour < 18;
  // const isDaytime = false;
  
  // Set background color to a lighter shade during the day and a darker shade during the night
  const backgroundColor = isDaytime ? '#e6e6f0' : '#222230'; // Light gray for day, darker gray for night
  const textColor = isDaytime ? '#000000' : '#ffffff';
  const sectionColor = isDaytime ? '#cdcdde' : '#111111';
  const headfootColor = isDaytime ? '#aaaabb' : '#0b0b0b';
  document.documentElement.style.setProperty('--section-color', sectionColor);
  document.documentElement.style.setProperty('--background-color', backgroundColor);
  document.documentElement.style.setProperty('--text-color', textColor);
  document.documentElement.style.setProperty('--head-foot-color', headfootColor);
}
// Dynamic Dark Mode

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

// Initial call
document.addEventListener("DOMContentLoaded", () => {
  updateBackgroundColor();
});

// Set interval to update background color every minute (60000 milliseconds)
setInterval(updateBackgroundColor, 60000);

setInterval(updateMyColor, 300);