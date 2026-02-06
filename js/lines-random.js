document.addEventListener('DOMContentLoaded', function() {
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  const line3 = document.getElementById('line3');
  
  // Random horizontal positions for vertical lines (20-80%)
  const pos1 = Math.random() * 60 + 20;
  const pos2 = Math.random() * 60 + 20;
  
  // Random vertical position for horizontal line (20-80%)
  const pos3 = Math.random() * 60 + 20;
  
  line1.style.left = pos1 + '%';
  line2.style.left = pos2 + '%';
  line3.style.top = pos3 + '%';
  
  // Save positions
  line1.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('textPosition', pos1);
    localStorage.setItem('isHorizontal', 'false');
    window.location.href = 'line-1.html'; // Changed
  });

  line2.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('textPosition', pos2);
    localStorage.setItem('isHorizontal', 'false');
    window.location.href = 'line-3.html'; // Changed
  });

  line3.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('textPosition', pos3);
    localStorage.setItem('isHorizontal', 'true');
    window.location.href = 'line-2.html'; // Changed
  });
});