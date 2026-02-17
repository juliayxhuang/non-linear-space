// Clear localStorage when clicking internal links to prevent scroll inheritance
document.addEventListener('DOMContentLoaded', function() {
  // Get all links on the page
  const internalLinks = document.querySelectorAll('a[href*=".html"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't clear if it's the home button
      if (!this.classList.contains('map')) {
        // Clear the position data so next page starts fresh
        localStorage.removeItem('textPosition');
        localStorage.removeItem('isHorizontal');
      }
    });
  });
});