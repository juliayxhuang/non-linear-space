// Add horizontal scrolling text elements to vertical scroll pages
document.addEventListener('DOMContentLoaded', function() {
  const text = document.getElementById('text');
  if (!text) return;
  
  // Wait for page to load and check if it's vertical scroll
  setTimeout(() => {
    const computedStyle = window.getComputedStyle(text);
    const isVertical = computedStyle.wordSpacing === '100vw';
    
    if (!isVertical) return; // Only for vertical pages
    
    // Create horizontal text elements
    const horizontalTexts = [
      {
        content: `standing in the aisle swaying with the movement holding tight phone buzzing checking messages`,
        startPosition: 500,
        endPosition: 3000,
        topPosition: '25%',
        scrollSpeed: 0.15
      },
      {
        content: `announcements crackling overhead next stop union square transfer available doors chime warning`,
        startPosition: 2000,
        endPosition: 5000,
        topPosition: '50%',
        scrollSpeed: 0.15
      },
      {
        content: `crowd pushes in backpacks bumping excuse me sorry getting off here stepping over bags`,
        startPosition: 4000,
        endPosition: 7000,
        topPosition: '70%',
        scrollSpeed: 0.15
      },
      {
        content: `platform appearing through windows slowing down brakes squealing metal on metal stopping`,
        startPosition: 6000,
        endPosition: 9000,
        topPosition: '35%',
        scrollSpeed: 0.15
      }
    ];
    
    horizontalTexts.forEach((item, index) => {
      const horizontalEl = document.createElement('div');
      horizontalEl.id = `horizontal-text-${index}`;
      horizontalEl.style.cssText = `
        position: fixed;
        top: ${item.topPosition};
        left: 0;
        transform: translateY(-50%);
        font-size: ${window.getComputedStyle(text).fontSize};
        font-family: ${window.getComputedStyle(text).fontFamily};
        color: ${window.getComputedStyle(text).color};
        white-space: nowrap;
        z-index: 1;
        padding: 0;
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
      `;
      horizontalEl.textContent = item.content;
      
      document.body.appendChild(horizontalEl);
      
      // Calculate actual width after adding to DOM
      const actualWidth = horizontalEl.offsetWidth;
      horizontalEl.dataset.width = actualWidth;
      
      // Start completely off-screen to the left
      horizontalEl.style.left = `-${actualWidth}px`;
      horizontalEl.style.visibility = 'visible';
    });
    
    // Update horizontal text position based on vertical scroll
    function updateHorizontalText() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      
      horizontalTexts.forEach((item, index) => {
        const el = document.getElementById(`horizontal-text-${index}`);
        if (!el) return;
        
        const textWidth = parseInt(el.dataset.width);
        const sectionProgress = scrollY - item.startPosition;
        const sectionLength = item.endPosition - item.startPosition;
        
        if (scrollY < item.startPosition) {
          // Before section - hidden off-screen left
          el.style.opacity = '0';
          el.style.left = `-${textWidth}px`;
        } else if (scrollY >= item.startPosition && scrollY <= item.endPosition) {
          // During section - slide in from left with fade in
          const horizontalOffset = sectionProgress * item.scrollSpeed;
          
          // Fade in over first 300px of scroll
          const fadeProgress = Math.min(sectionProgress / 300, 1);
          const opacity = fadeProgress * 0.85;
          
          el.style.opacity = opacity;
          el.style.left = `${horizontalOffset - textWidth}px`;
          el.style.transform = 'translateY(-50%)';
        } else {
          // After section - continue right and fade out
          const maxOffset = sectionLength * item.scrollSpeed;
          const afterProgress = scrollY - item.endPosition;
          const fadeOut = Math.max(0.85 - (afterProgress / 300), 0);
          
          el.style.opacity = fadeOut;
          el.style.left = `${maxOffset - textWidth + afterProgress * item.scrollSpeed}px`;
        }
      });
    }
    
    // Listen to scroll
    window.addEventListener('scroll', updateHorizontalText, true);
    
    // Initial check
    updateHorizontalText();
  }, 250);
});