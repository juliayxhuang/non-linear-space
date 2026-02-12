// Scroll to navigate to line-1.html
let scrollTimeout;
let isTransitioning = false;

window.addEventListener('wheel', function(e) {
    if (isTransitioning) return;
    
    // Only trigger on downward scroll
    if (e.deltaY > 0) {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            isTransitioning = true;
            
            // Add fade out effect
            document.body.style.transition = 'opacity 0.3s ease-out';
            document.body.style.opacity = '0';
            
            // Navigate to line-1.html after fade
            setTimeout(() => {
                window.location.href = 'line-1.html';
            }, 300);
        }, 150); // Small delay to prevent accidental triggers
    }
}, { passive: true });

// Touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

window.addEventListener('touchend', function(e) {
    if (isTransitioning) return;
    
    touchEndY = e.changedTouches[0].screenY;
    
    // Check if swipe was upward (scrolling down the page)
    if (touchStartY - touchEndY > 50) {
        isTransitioning = true;
        
        document.body.style.transition = 'opacity 0.05s ease-out';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'line-1.html';
        }, 300);
    }
}, { passive: true });