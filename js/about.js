document.addEventListener('DOMContentLoaded', function() {
    const aboutButton = document.getElementById('aboutButton');
    const aboutOverlay = document.getElementById('aboutOverlay');
    const closeButton = document.getElementById('closeAbout');
    
    // Open overlay
    aboutButton.addEventListener('click', function() {
        aboutOverlay.classList.add('active');
    });
    
    // Close overlay when clicking close button
    closeButton.addEventListener('click', function() {
        aboutOverlay.classList.remove('active');
    });
    
    // Close overlay when clicking outside the content
    aboutOverlay.addEventListener('click', function(e) {
        if (e.target === aboutOverlay) {
            aboutOverlay.classList.remove('active');
        }
    });
});