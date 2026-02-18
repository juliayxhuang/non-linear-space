// Infinite looping text for horizontal scroll
document.addEventListener('DOMContentLoaded', function() {
  const text = document.getElementById('text');
  if (!text) return;
  
  const originalContent = text.innerHTML;
  let duplicateCount = 0;
  const maxDuplicates = 20;
  
  // Wait for other scripts to position the text
  setTimeout(() => {
    // Create a wrapper container
    const wrapper = document.createElement('div');
    wrapper.style.cssText = text.style.cssText;
    wrapper.style.display = 'inline-block';
    wrapper.style.whiteSpace = 'nowrap';
    
    // Move original text into wrapper
    text.parentNode.insertBefore(wrapper, text);
    wrapper.appendChild(text);
    
    // Reset text styles to work inside wrapper
    text.style.position = 'relative';
    text.style.top = 'auto';
    text.style.left = 'auto';
    text.style.transform = 'none';
    text.style.display = 'inline-block';
    
    function addMoreContent() {
      if (duplicateCount >= maxDuplicates) return;
      
      const newText = document.createElement('span');
      newText.innerHTML = originalContent;
      newText.style.display = 'inline-block';
      newText.style.fontSize = window.getComputedStyle(text).fontSize;
      newText.style.fontFamily = window.getComputedStyle(text).fontFamily;
      newText.style.color = window.getComputedStyle(text).color;
      
      wrapper.appendChild(newText);
      duplicateCount++;
    }
    
    function isNearEnd() {
      const scrollWidth = document.documentElement.scrollWidth;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const clientWidth = window.innerWidth;
      
      return scrollWidth - scrollLeft - clientWidth < 300;
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (isNearEnd()) {
          addMoreContent();
        }
      }, 100);
    });
    
    // Add first few duplicates
    addMoreContent();
    addMoreContent();
  }, 150);
});