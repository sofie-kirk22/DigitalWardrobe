document.addEventListener('DOMContentLoaded', () => {
    const galleryDiv = document.getElementById('gallery');
    if (!galleryDiv) return;
  
    fetch('http://localhost:3000/api/images')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ctype = res.headers.get('content-type') || '';
        if (!ctype.includes('application/json')) return res.text().then(t => { throw new Error(`Expected JSON, got: ${t.slice(0,80)}...`); });
        return res.json();
      })
      .then((files: string[]) => {
        files.forEach(file => {
          const img = document.createElement('img');
          img.src = `../../uploads/${file}`;
          img.width = 200;
          img.style.margin = '10px';
          galleryDiv.appendChild(img);
        });
      })
      .catch(err => console.error('Error loading images:', err));
  });
  