document.addEventListener('DOMContentLoaded', function() {
    const easterEgg = document.getElementById('easterEgg');
    const homeButton = document.getElementById('homeButton');
    const musicPlayer = document.getElementById('music-player');
    const audio = document.getElementById('background-music');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let xOffset = 0;
    let yOffset = 0;
    let isPlaying = false;
    let easterEggTriggered = false;
    
    // Prevent default touch behavior on the egg itself
    easterEgg.addEventListener('touchstart', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Touch events for mobile
    easterEgg.addEventListener('touchstart', handleStart, { passive: false });
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd, { passive: false });
    
    // Mouse events for desktop
    easterEgg.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    
    function handleStart(e) {
        if (easterEggTriggered) return;
        
        let clientX, clientY;
        
        if (e.type === 'touchstart') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        initialX = clientX - xOffset;
        initialY = clientY - yOffset;
        
        isDragging = true;
        easterEgg.classList.add('dragging');
    }
    
    function handleMove(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        
        let clientX, clientY;
        
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        currentX = clientX - initialX;
        currentY = clientY - initialY;
        
        xOffset = currentX;
        yOffset = currentY;
        
        setTranslate(currentX, currentY, easterEgg);
        checkOverlap();
    }
    
    function handleEnd(e) {
        if (!isDragging) return;
        
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