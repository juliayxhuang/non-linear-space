// Randomize text position on line pages
document.addEventListener('DOMContentLoaded', function() {
  const randomizeBtn = document.getElementById('randomizeBtn');
  const text = document.getElementById('text');
  
  if (!randomizeBtn || !text) return;
  
  randomizeBtn.addEventListener('click', function() {
    const computedStyle = window.getComputedStyle(text);
    const isHorizontal = computedStyle.whiteSpace === 'nowrap' && computedStyle.display === 'inline-block';
    
    if (isHorizontal) {
      // For horizontal, check if text is in a wrapper (from infinite loop)
      const wrapper = text.parentElement;
      const target = (wrapper && wrapper.style.position === 'absolute') ? wrapper : text;
      
      // Horizontal scroll - randomize vertical position (35-60% safe middle range)
      const randomTop = Math.random() * 25 + 35;
      target.style.top = `${randomTop}vh`;
      
    } else {
      // Vertical scroll - randomize horizontal position (30-70% for bigger left margin)
      const randomLeft = Math.random() * 40 + 30;
      text.style.left = `${randomLeft}%`;
      
      // Also update all duplicates
      let i = 0;
      let duplicate = document.getElementById(`text-loop-${i}`);
      while (duplicate) {
        duplicate.style.left = `${randomLeft}%`;
        i++;
        duplicate = document.getElementById(`text-loop-${i}`);
      }
    }
  });
});