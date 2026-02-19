// Add vertical scrolling text elements to horizontal scroll pages
document.addEventListener('DOMContentLoaded', function() {
  const text = document.getElementById('text');
  if (!text) return;
  
  // Wait for page to load and check if it's horizontal scroll
  setTimeout(() => {
    const computedStyle = window.getComputedStyle(text);
    const isHorizontal = computedStyle.whiteSpace === 'nowrap' && computedStyle.display === 'inline-block';
    
    if (!isHorizontal) return; // Only for horizontal pages
    
    // Disable vertical scrolling on horizontal pages
    document.body.style.overflowY = 'hidden';
    document.documentElement.style.overflowY = 'hidden';
    
    // Create vertical text elements
    const verticalTexts = [
      {
        content: `tire screeching guy texting in front uncrosses his legs next stop is astor place he's zooming in on google maps puddle of snapple on the floor ding this is astor place`,
        startPosition: 750,
        endPosition: 25000,
        leftPosition: '30%',
        scrollSpeed: 0.2
      },
      {
        content: `train slows down doors open two people walk in another two stand clear of the closing doors please doors stutter`,
        startPosition: 4500,
        endPosition: 12500,
        leftPosition: '70%',
        scrollSpeed: 0.2
      },
      {
        content: `he's laughing grabbing onto the pole glove off scrolling iphone blue iphone black otterbox arriving at the station`,
        startPosition: 8500,
        endPosition: 21500,
        leftPosition: '50%',
        scrollSpeed: 0.2
      },
      {
        content: `humming surprisingly quiet walks in with baggy pants headphones on beats is that matthew looks like clown feet big parkas furry hoods curly hair and pink`,
        startPosition: 11500,
        endPosition: 25000,
        leftPosition: '80%',
        scrollSpeed: 0.2
      },
      {
        content: `backpacks please don't skip my stop waiting at the door`,
        startPosition: 15500,
        endPosition: 28000,
        leftPosition: '20%',
        scrollSpeed: 0.2
      }
    ];
    
    verticalTexts.forEach((item, index) => {
      const verticalEl = document.createElement('div');
      verticalEl.id = `vertical-text-${index}`;
      verticalEl.style.cssText = `
        position: fixed;
        left: ${item.leftPosition};
        bottom: 0;
        transform: translateX(-50%);
        font-size: ${window.getComputedStyle(text).fontSize};
        font-family: ${window.getComputedStyle(text).fontFamily};
        color: ${window.getComputedStyle(text).color};
        white-space: pre-line;
        text-align: center;
        z-index: 1;
        padding: 0;
        pointer-events: none;
        line-height: 1.7;
        opacity: 0;
        word-spacing: 100vw;
        visibility: hidden;
      `;
      verticalEl.textContent = item.content;
      
      document.body.appendChild(verticalEl);
      
      // Calculate actual height after adding to DOM
      const actualHeight = verticalEl.offsetHeight;
      verticalEl.dataset.height = actualHeight;
      
      // Start completely below screen
      verticalEl.style.bottom = `-${actualHeight}px`;
      verticalEl.style.visibility = 'visible';
    });
    
    // Update vertical text position based on horizontal scroll
    function updateVerticalText() {
      const scrollX = document.body.scrollLeft || window.pageXOffset || document.documentElement.scrollLeft;
      
      verticalTexts.forEach((item, index) => {
        const el = document.getElementById(`vertical-text-${index}`);
        if (!el) return;
        
        const textHeight = parseInt(el.dataset.height);
        const sectionProgress = scrollX - item.startPosition;
        const sectionLength = item.endPosition - item.startPosition;
        
        if (scrollX < item.startPosition) {
          // Before section - hidden below screen
          el.style.opacity = '0';
          el.style.bottom = `-${textHeight}px`;
        } else if (scrollX >= item.startPosition && scrollX <= item.endPosition) {
          // During section - rise up from bottom with fade in
          const verticalOffset = sectionProgress * item.scrollSpeed;
          
          // Fade in over first 300px of scroll
          const fadeProgress = Math.min(sectionProgress / 300, 1);
          const opacity = fadeProgress * 0.85;
          
          el.style.opacity = opacity;
          el.style.bottom = `${verticalOffset - textHeight}px`;
          el.style.transform = 'translateX(-50%)';
        } else {
          // After section - continue up and fade out
          const maxOffset = sectionLength * item.scrollSpeed;
          const afterProgress = scrollX - item.endPosition;
          const fadeOut = Math.max(0.85 - (afterProgress / 300), 0);
          
          el.style.opacity = fadeOut;
          el.style.bottom = `${maxOffset - textHeight + afterProgress * item.scrollSpeed}px`;
        }
      });
    }
    
    // Listen to scroll on both window and body for better compatibility
    window.addEventListener('scroll', updateVerticalText, true);
    document.body.addEventListener('scroll', updateVerticalText, true);
    
    // Initial check
    updateVerticalText();
  }, 250);
});