// Function to show the selected section and highlight the clicked category
function showSection(sectionId) {
    const sections = document.querySelectorAll(".content-section");
    sections.forEach((section) => {
        section.style.display = "none";
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = "block";
    }
}

// Function to handle the navigation clicks
function handleNavigationClick(event) {
    const targetId = event.target.getAttribute("data-section");
    if (targetId) {
        showSection(targetId);

        // Remove the "active" class from all navigation links
        navigationLinks.forEach((link) => {
            link.classList.remove("active");
        });

        // Add the "active" class to the clicked link
        event.target.classList.add("active");
    }
}

// Attach click event listeners to navigation links
const navigationLinks = document.querySelectorAll("nav ul li a");
navigationLinks.forEach((link) => {
    link.addEventListener("click", handleNavigationClick);
});

// Initially show the "blogs" section and highlight the "blogs" link as active
showSection("blogs");
navigationLinks[0].classList.add("active"); // Assuming "blogs" is the first link

// JavaScript to handle photo zooming
const photos = document.querySelectorAll('.zoomable');
const modal = document.getElementById('myModal');
const zoomedImg = document.getElementById('zoomedImg');

photos.forEach(photo => {
    photo.addEventListener('click', () => {
        modal.style.display = 'block';
        zoomedImg.src = photo.src;
    });
});

function closeModal() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}
