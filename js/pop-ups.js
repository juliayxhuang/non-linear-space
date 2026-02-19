// Add vertical scrolling text elements to horizontal scroll pages
document.addEventListener('DOMContentLoaded', function() {
  const text = document.getElementById('text');
  if (!text) return;
  
  // Wait for page to load and check if it's horizontal scroll
  setTimeout(() => {
    const computedStyle = window.getComputedStyle(text);
    const isHorizontal = computedStyle.whiteSpace === 'nowrap' && computedStyle.display === 'inline-block';
    
    if (!isHorizontal) return; // Only for horizontal pages
    
    // Create vertical text elements
    const verticalTexts = [
      {
        content: `tire screeching
guy texting in front
uncrosses his legs
next stop is astor place
he's zooming in on google maps
puddle of snapple on the floor
ding
this is astor place
train slows down
doors open`,
        startPosition: 1500, // When it starts appearing (in px from left)
        endPosition: 3000,   // When it disappears
        leftPosition: '25%'  // Where it sits horizontally on screen
      },
      {
        content: `he's laughing
grabbing onto the pole
glove off scrolling
iphone blue
iphone black
otterbox
arriving at the station`,
        startPosition: 3500,
        endPosition: 5000,
        leftPosition: '70%'
      }
    ];
    
    verticalTexts.forEach((item, index) => {
      const verticalEl = document.createElement('div');
      verticalEl.id = `vertical-text-${index}`;
      verticalEl.style.cssText = `
        position: fixed;
        left: ${item.leftPosition};
        top: 0;
        transform: translateX(-50%);
        font-size: ${window.getComputedStyle(text).fontSize};
        font-family: ${window.getComputedStyle(text).fontFamily};
        color: ${window.getComputedStyle(text).color};
        white-space: pre-line;
        text-align: center;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 1.5em 0;
        max-height: 100vh;
        overflow-y: auto;
      `;
      verticalEl.textContent = item.content;
      
      document.body.appendChild(verticalEl);
    });
    
    // Show/hide vertical text based on scroll position
    window.addEventListener('scroll', function() {
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      
      verticalTexts.forEach((item, index) => {
        const el = document.getElementById(`vertical-text-${index}`);
        
        if (scrollX >= item.startPosition && scrollX <= item.endPosition) {
          el.style.opacity = '1';
        } else {
          el.style.opacity = '0';
        }
      });
    });
    
    // Initial check
    window.dispatchEvent(new Event('scroll'));
  }, 200);
});