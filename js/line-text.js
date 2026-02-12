document.addEventListener('DOMContentLoaded', function() {
  const text = document.getElementById('text');
  const position = localStorage.getItem('textPosition');
  const isHorizontal = localStorage.getItem('isHorizontal') === 'true';
  
  if (position && !isHorizontal) {
    // Vertical line - position horizontally where line was, centered vertically
    text.style.cssText = `
      position: absolute !important;
      left: ${position}% !important;
      top: 50vh !important;
      transform: translate(-50%, -50%) !important;
      margin: 0 !important;
      display: block !important;
      text-align: center !important;
    `;
  } else if (position && isHorizontal) {
    text.style.cssText = `
      position: absolute !important;
      left: 0 !important;
      top: ${position}vh !important;
      transform: translateY(-50%) !important;
      width: 100% !important;
      margin: 0 !important;
      display: block !important;
    `;
  } else {
    text.style.cssText = `
      position: absolute !important;
      left: 50% !important;
      top: 50vh !important;
      transform: translate(-50%, -50%) !important;
      margin: 0 !important;
      display: block !important;
    `;
  }
});