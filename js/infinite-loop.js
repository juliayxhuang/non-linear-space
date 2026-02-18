// Infinite looping text - duplicates content when reaching bottom
document.addEventListener('DOMContentLoaded', function() {
  const text = document.getElementById('text');
  if (!text) return;
  
  const originalContent = text.innerHTML;
  let duplicateCount = 0;
  const maxDuplicates = 20;
  
  // Wait for other scripts to position the text
  setTimeout(() => {
    const computedStyle = window.getComputedStyle(text);
    const isHorizontal = computedStyle.whiteSpace === 'nowrap' && computedStyle.display === 'inline-block';
    
    if (isHorizontal) {
      // Don't loop horizontal scrolling pages
      return;
    }
    
    // Get the original text's position info
    const originalPosition = text.style.position;
    const originalLeft = text.style.left;
    const originalTransform = text.style.transform;
    const originalMaxWidth = text.style.maxWidth;
    const originalMargin = text.style.margin;
    const originalTextAlign = text.style.textAlign;
    
    // For vertical pages - append duplicates with same positioning
    function addMoreContent() {
      if (duplicateCount >= maxDuplicates) return;
      
      const newText = document.createElement('p');
      newText.innerHTML = originalContent;
      newText.id = `text-loop-${duplicateCount}`;
      
      // Apply same positioning as original
      newText.style.position = originalPosition;
      newText.style.left = originalLeft;
      newText.style.transform = originalTransform;
      newText.style.maxWidth = originalMaxWidth;
      newText.style.margin = originalMargin;
      newText.style.textAlign = originalTextAlign;
      newText.style.display = 'block';
      
      // Position it below the previous text
      const previousElement = duplicateCount === 0 ? text : document.getElementById(`text-loop-${duplicateCount - 1}`);
      const previousBottom = previousElement.offsetTop + previousElement.offsetHeight;
      
      newText.style.top = `${previousBottom + 48}px`; // 3em gap (assuming 16px base)
      
      document.body.appendChild(newText);
      duplicateCount++;
    }
    
    function isNearBottom() {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      return scrollHeight - scrollTop - clientHeight < 300;
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (isNearBottom()) {
          addMoreContent();
        }
      }, 100);
    });
    
    // Add first duplicate
    addMoreContent();
  }, 150);
});