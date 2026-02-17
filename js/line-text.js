document.addEventListener('DOMContentLoaded', function() {
  const text = document.getElementById('text');
  const position = localStorage.getItem('textPosition');
  const isHorizontal = localStorage.getItem('isHorizontal') === 'true';
  
  if (position && !isHorizontal) {
    // Vertical line - position horizontally where line was, start from top
    text.style.cssText = `
      position: absolute !important;
      left: ${position}% !important;
      top: 0 !important;
      transform: translateX(-50%) !important;
      display: block !important;
      text-align: center !important;
      margin: 1.5em !important;
      padding-top: 1em !important;
      padding-bottom: 1.2em !important;
      max-width: calc(100% - 3em) !important;
    `;
  } else if (position && isHorizontal) {
    text.style.cssText = `
      position: absolute !important;
      left: 0 !important;
      top: ${position}vh !important;
      transform: translateY(-50%) !important;
      display: inline-block !important;
      white-space: nowrap !important;
      margin: 0 1.2em !important;
    `;
    
    // Add spacing at the end using ::after
    const style = document.createElement('style');
    style.textContent = `
      #text::after {
        content: '';
        display: inline-block;
        width: 1.5em;
      }
    `;
    document.head.appendChild(style);
  } else {
    text.style.cssText = `
      position: absolute !important;
      left: 50% !important;
      top: 50vh !important;
      transform: translate(-50%, -50%) !important;
      display: block !important;
      margin: 1.2em !important;
      max-width: calc(100% - 3em) !important;
    `;
  }
});