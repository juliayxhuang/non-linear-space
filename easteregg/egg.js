document.addEventListener('DOMContentLoaded', function() {
    const easterEgg = document.getElementById('easterEgg');
    const homeButton = document.getElementById('homeButton');
    const musicPlayer = document.getElementById('music-player');
    const audio = document.getElementById('background-music');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    let isPlaying = false;
    let easterEggTriggered = false;
    
    // Store original position
    const originalBottom = easterEgg.style.bottom || '2rem';
    const originalRight = easterEgg.style.right || '2rem';
    
    // Mouse events
    easterEgg.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    // Touch events for mobile
    easterEgg.addEventListener('touchstart', dragStart, { passive: false });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', dragEnd);
    
    function dragStart(e) {
        if (easterEggTriggered) return;
        
        // Get the correct coordinates for both mouse and touch
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        
        initialX = clientX - xOffset;
        initialY = clientY - yOffset;
        
        if (e.target === easterEgg || easterEgg.contains(e.target)) {
            isDragging = true;
            easterEgg.classList.add('dragging');
        }
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            // Get the correct coordinates for both mouse and touch
            const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
            
            currentX = clientX - initialX;
            currentY = clientY - initialY;
            
            // Get egg dimensions
            const eggWidth = easterEgg.offsetWidth;
            const eggHeight = easterEgg.offsetHeight;
            
            // Get window dimensions
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
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
        if (easterEggTriggered) return;
        
        easterEggTriggered = true;
        isDragging = false;
        easterEgg.classList.remove('dragging');
        
        // Show music player
        musicPlayer.classList.remove('hidden');
        
        // Reset easter egg to original position
        easterEgg.style.transition = 'transform 0.5s ease';
        easterEgg.style.transform = 'translate3d(0, 0, 0)';
        xOffset = 0;
        yOffset = 0;
        
        // Optional: hide the easter egg after returning
        setTimeout(() => {
            easterEgg.style.opacity = '0';
        }, 500);
    }
    
    // Music player toggle
    musicPlayer.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
        isPlaying = !isPlaying;
    });
});