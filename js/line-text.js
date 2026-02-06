document.addEventListener('DOMContentLoaded', function() {
  const text = document.getElementById('text');
  const position = localStorage.getItem('textPosition');
  const isHorizontal = localStorage.getItem('isHorizontal') === 'true';
  
  if (position) {
    text.style.position = 'absolute';
    
    if (isHorizontal) {
      // Position vertically for horizontal line
      text.style.top = position + '%';
      text.style.transform = 'translateY(-50%)';
      text.style.left = '0';
    } else {
      // Position horizontally for vertical lines
      text.style.left = position + '%';
      text.style.transform = 'translateX(-50%)';
    }
  }
});