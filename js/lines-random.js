// Create a function for the randomization logic
function randomizeLines() {
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  const line3 = document.getElementById('line3');
  
  // Random horizontal positions for vertical lines (20-80%)
  let pos1 = Math.random() * 60 + 20;
  let pos2 = Math.random() * 60 + 20;
  
  // Keep regenerating pos2 until it's at least 10% away from pos1
  while (Math.abs(pos2 - pos1) < 10) {
    pos2 = Math.random() * 60 + 20;
  }
  
  // Random vertical position for horizontal line (20-80%)
  const pos3 = Math.random() * 60 + 20;
  
  line1.style.left = pos1 + '%';
  line2.style.left = pos2 + '%';
  line3.style.top = pos3 + '%';
  
  // Remove old event listeners by cloning elements
  const newLine1 = line1.cloneNode(true);
  const newLine2 = line2.cloneNode(true);
  const newLine3 = line3.cloneNode(true);
  
  line1.parentNode.replaceChild(newLine1, line1);
  line2.parentNode.replaceChild(newLine2, line2);
  line3.parentNode.replaceChild(newLine3, line3);
  
  // Add new event listeners with updated positions
  newLine1.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('textPosition', pos1);
    localStorage.setItem('isHorizontal', 'false');
    window.location.href = 'line-1.html';
  });

  newLine2.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('textPosition', pos2);
    localStorage.setItem('isHorizontal', 'false');
    window.location.href = 'line-3.html';
  });

  newLine3.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('textPosition', pos3);
    localStorage.setItem('isHorizontal', 'true');
    window.location.href = 'line-2.html';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Randomize on page load
  randomizeLines();
  
  // Add randomize button listener
  const randomizeBtn = document.getElementById('randomizeBtn');
  randomizeBtn.addEventListener('click', randomizeLines);
});