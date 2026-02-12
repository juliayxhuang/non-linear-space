// Scroll back to homepage when reaching end of page
let scrollTimeout;
let isTransitioning = false;
let scrollAttempts = 0;

function isAtBottom() {
    // More precise bottom detection
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const clientHeight = window.innerHeight;
    
    return scrollHeight - scrollTop - clientHeight < 5;
}

window.addEventListener('wheel', function(e) {
    if (isTransitioning) return;
    
    // Only trigger on downward scroll when at bottom
    if (e.deltaY > 0 && isAtBottom()) {
        scrollAttempts++;
        
        // Require multiple scroll attempts at bottom before transitioning
        if (scrollAttempts >= 2) {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                isTransitioning = true;
                
                // Add fade out effect
                document.body.style.transition = 'opacity 0.15s ease-out';
                document.body.style.opacity = '0';
                
                // Navigate back to index.html after fade
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 150);
            }, 50);
        }
    } else {
        // Reset counter if not at bottom
        scrollAttempts = 0;
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
    
    // Check if swipe was upward (scrolling down) and at bottom
    if (touchStartY - touchEndY > 50 && isAtBottom()) {
        isTransitioning = true;
        
        document.body.style.transition = 'opacity 0.15s ease-out';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 150);
    }
}, { passive: true });