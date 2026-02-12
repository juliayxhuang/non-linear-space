// BLUR CENTERED

// document.addEventListener('DOMContentLoaded', function() {
//     const aboutButton = document.getElementById('aboutButton');
//     const aboutOverlay = document.getElementById('aboutOverlay');
//     const closeButton = document.getElementById('closeAbout');
    
//     // Open overlay
//     aboutButton.addEventListener('click', function() {
//         aboutOverlay.classList.add('active');
//     });
    
//     // Close overlay when clicking close button
//     closeButton.addEventListener('click', function() {
//         aboutOverlay.classList.remove('active');
//     });
    
//     // Close overlay when clicking outside the content
//     aboutOverlay.addEventListener('click', function(e) {
//         if (e.target === aboutOverlay) {
//             aboutOverlay.classList.remove('active');
//         }
//     });
// });

// SLIDE IN BAR

document.addEventListener('DOMContentLoaded', function() {
    const aboutButton = document.getElementById('aboutButton');
    const aboutSidebar = document.getElementById('aboutSidebar');
    const closeButton = document.getElementById('closeAbout');

    // Open sidebar
    aboutButton.addEventListener('click', function() {
        aboutSidebar.classList.add('active');
    });

    // Close sidebar
    closeButton.addEventListener('click', function() {
        aboutSidebar.classList.remove('active');
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (
          !aboutSidebar.contains(e.target) &&
          !aboutButton.contains(e.target)
        ) {
            aboutSidebar.classList.remove('active');
        }
    });
});
