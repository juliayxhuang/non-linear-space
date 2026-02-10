document.addEventListener('DOMContentLoaded', function() {
    const easterEgg = document.getElementById('easterEgg');
    const homeButton = document.getElementById('homeButton');
    const popup = document.getElementById('egg-popup');
    const closeBtn = document.getElementById('egg-modal-close');
    const okBtn = document.getElementById('egg-modal-btn');
    
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    // Drag functionality
    easterEgg.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        
        if (e.target === easterEgg || easterEgg.contains(e.target)) {
            isDragging = true;
            easterEgg.classList.add('dragging');
        }
    }
    
function drag(e) {
    if (isDragging) {
        e.preventDefault();
        
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        
        // Get egg dimensions
        const eggWidth = easterEgg.offsetWidth;
        const eggHeight = easterEgg.offsetHeight;
        
        // Get window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Get current position of egg (before transform)
        const eggStyle = window.getComputedStyle(easterEgg);
        const matrix = new DOMMatrix(eggStyle.transform);
        const currentLeft = easterEgg.offsetLeft + matrix.m41;
        const currentTop = easterEgg.offsetTop + matrix.m42;
        
        // Calculate boundaries
        const minX = -easterEgg.offsetLeft;
        const maxX = windowWidth - easterEgg.offsetLeft - eggWidth;
        const minY = -easterEgg.offsetTop;
        const maxY = windowHeight - easterEgg.offsetTop - eggHeight;
        
        // Constrain to boundaries
        currentX = Math.max(minX, Math.min(currentX, maxX));
        currentY = Math.max(minY, Math.min(currentY, maxY));
        
        xOffset = currentX;
        yOffset = currentY;
        
        setTranslate(currentX, currentY, easterEgg);
        
        // Check if overlapping with home button
        checkOverlap();
    }
}
    
    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        
        isDragging = false;
        easterEgg.classList.remove('dragging');
    }
    
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
    
    function checkOverlap() {
        const eggRect = easterEgg.getBoundingClientRect();
        const homeRect = homeButton.getBoundingClientRect();
        
        // Check if circles overlap
        if (!(eggRect.right < homeRect.left || 
              eggRect.left > homeRect.right || 
              eggRect.bottom < homeRect.top || 
              eggRect.top > homeRect.bottom)) {
            // They overlap! Trigger easter egg
            triggerEasterEgg();
        }
    }
    
    function triggerEasterEgg() {
        popup.classList.add('active');
        isDragging = false;
        easterEgg.classList.remove('dragging');
    }
    
    // Close popup
    closeBtn.addEventListener('click', function() {
        popup.classList.remove('active');
    });
    
    okBtn.addEventListener('click', function() {
        popup.classList.remove('active');
    });
    
    // Close when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
});