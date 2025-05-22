
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
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Collapse all .project elements
    document.querySelectorAll(".project.active").forEach((project) => {
      project.classList.remove("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const title = document.getElementById("expandAllProjects");

  title.addEventListener("click", function () {
    const projects = document.querySelectorAll(".project");
    let atLeastOneClosed = false;

    projects.forEach(project => {
      if (!project.classList.contains("active")) {
        atLeastOneClosed = true;
      }
    });

    projects.forEach(project => {
      if (atLeastOneClosed) {
        project.classList.add("active");  // Expand all
      } else {
        project.classList.remove("active"); // Collapse all
      }
    });
  });
});



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

document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".contact-icons li");
  const total = icons.length;

  icons.forEach((icon, index) => {
    // Reverse the delay: last icon gets 0s, second-to-last gets 0.05s, etc.
    const delay = (total - index - 1) * 0.08;
    icon.style.transitionDelay = `${delay}s`;
  });
});

function toggleGallery(headerElement) {
  const wrapper = headerElement.closest('.gallery-wrapper');
  wrapper.classList.toggle('open');
}

function toggleProject(element) {
  const project = element.closest('.project');
  project.classList.toggle('active');
}