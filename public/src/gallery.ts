// Fetch top images from server and display in gallery
document.addEventListener('DOMContentLoaded', () => {
    const topsDiv = document.getElementById('tops');
    const bottomsDiv = document.getElementById('bottoms');
    const shoesDiv = document.getElementById('shoes');
    const accessoriesDiv = document.getElementById('accessories');
    const outerwearDiv = document.getElementById('outerwear');
    if (!topsDiv || !bottomsDiv || !shoesDiv || !accessoriesDiv || !outerwearDiv) return;
    
    // Fetch images for each category and display in respective sections
    // Tops
    fetch('http://localhost:3000/api/images/tops')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ctype = res.headers.get('content-type') || '';
        if (!ctype.includes('application/json')) return res.text().then(t => { throw new Error(`Expected JSON, got: ${t.slice(0,80)}...`); });
        return res.json();
      })
      .then((files: string[]) => {
        files.forEach(file => {
          const img = document.createElement('img');
          img.src = `../../uploads/tops/${file}`;
          img.width = 200;
          img.style.margin = '10px';
          topsDiv.appendChild(img);
        });
      })
      .catch(err => console.error('Error loading images:', err));

      // Bottoms
      fetch('http://localhost:3000/api/images/bottoms')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ctype = res.headers.get('content-type') || '';
        if (!ctype.includes('application/json')) return res.text().then(t => { throw new Error(`Expected JSON, got: ${t.slice(0,80)}...`); });
        return res.json();
      })
      .then((files: string[]) => {
        files.forEach(file => {
          const img = document.createElement('img');
          img.src = `../../uploads/bottoms/${file}`;
          img.width = 200;
          img.style.margin = '10px';
          bottomsDiv.appendChild(img);
        });
      })
      .catch(err => console.error('Error loading images:', err));

    // Shoes
    fetch('http://localhost:3000/api/images/shoes')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ctype = res.headers.get('content-type') || '';
        if (!ctype.includes('application/json')) return res.text().then(t => { throw new Error(`Expected JSON, got: ${t.slice(0,80)}...`); });
        return res.json();
      })
      .then((files: string[]) => {
        files.forEach(file => {
          const img = document.createElement('img');
          img.src = `../../uploads/shoes/${file}`;
          img.width = 200;
          img.style.margin = '10px';
          shoesDiv.appendChild(img);
        });
      })
      .catch(err => console.error('Error loading images:', err));

    // Accessories
    fetch('http://localhost:3000/api/images/accessories')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ctype = res.headers.get('content-type') || '';
        if (!ctype.includes('application/json')) return res.text().then(t => { throw new Error(`Expected JSON, got: ${t.slice(0,80)}...`); });
        return res.json();
      })
      .then((files: string[]) => {
        files.forEach(file => {
          const img = document.createElement('img');
          img.src = `../../uploads/accessories/${file}`;
          img.width = 200;
          img.style.margin = '10px';
          accessoriesDiv.appendChild(img);
        });
      })
      .catch(err => console.error('Error loading images:', err));

    // Outerwear
    fetch('http://localhost:3000/api/images/outerwear')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ctype = res.headers.get('content-type') || '';
        if (!ctype.includes('application/json')) return res.text().then(t => { throw new Error(`Expected JSON, got: ${t.slice(0,80)}...`); });
        return res.json();
      })
      .then((files: string[]) => {
        files.forEach(file => {
          const img = document.createElement('img');
          img.src = `../../uploads/outerwear/${file}`;
          img.width = 200;
          img.style.margin = '10px';
          outerwearDiv.appendChild(img);
        });
      })
      .catch(err => console.error('Error loading images:', err));
  });

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

  // Upload image button functionality
document.addEventListener('DOMContentLoaded', () => {
    const uploadButtonTops = document.getElementById('uploadButtonTops') as HTMLButtonElement | null;
    const uploadButtonBottoms = document.getElementById('uploadButtonBottoms') as HTMLButtonElement | null;
    const uploadButtonShoes = document.getElementById('uploadButtonShoes') as HTMLButtonElement | null;
    const uploadButtonAccessories = document.getElementById('uploadButtonAccessories') as HTMLButtonElement | null;
    const uploadButtonOuterwear = document.getElementById('uploadButtonOuterwear') as HTMLButtonElement | null;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
  
    if (!uploadButtonTops || !fileInput || !uploadButtonBottoms || !uploadButtonShoes || !uploadButtonAccessories || !uploadButtonOuterwear) {
      console.error('uploadButton or fileInput not found in DOM');
      return;
    }

    let currentCategory: string | null = null;

    // Assign category on click, then trigger file input
    uploadButtonTops.addEventListener('click', () => { currentCategory = 'tops'; fileInput.click(); });
    uploadButtonBottoms.addEventListener('click', () => { currentCategory = 'bottoms'; fileInput.click(); });
    uploadButtonShoes.addEventListener('click', () => { currentCategory = 'shoes'; fileInput.click(); });
    uploadButtonAccessories.addEventListener('click', () => { currentCategory = 'accessories'; fileInput.click(); });
    uploadButtonOuterwear.addEventListener('click', () => { currentCategory = 'outerwear'; fileInput.click(); });
  
    // Prevent accidental form submission
    [uploadButtonTops, uploadButtonBottoms, uploadButtonShoes, uploadButtonAccessories, uploadButtonOuterwear]
    .forEach(btn => btn.type = 'button');
  
    fileInput.addEventListener('change', () => {
        if (currentCategory) {
          uploadFiles(fileInput, 'http://localhost:3000/upload', 'images', currentCategory);
          currentCategory = null; // reset
        } else {
          console.error('No category selected before file input change');
        }
      });
    });

  // Parameterised upload function
async function uploadFiles(fileInput: HTMLInputElement, uploadUrl: string, fieldName: string, category?: string) {
    const files = fileInput.files;
    if (!files?.length) return;
  
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) formData.append(fieldName, file);
    }
  
    const targetUrl = category ? `${uploadUrl}/${encodeURIComponent(category)}` : uploadUrl;
  
    try {
      const res = await fetch(targetUrl, { method: 'POST', body: formData });
      if (!res.ok) {
        console.error(`Upload failed: ${res.status} ${res.statusText}`);
        return;
      }
      const msg = await res.text();
      console.log('Upload success:', msg);
    } catch (err) {
      console.error('Network error while uploading:', err);
    }
  }

// --- Outfit generator: spinner + hide until loaded + set image + log attributes ---
(() => {
    const btn = document.getElementById('makeOutfit') as HTMLButtonElement | null;
    const img = document.getElementById('outfit') as HTMLImageElement | null;
    const statusEl = document.getElementById('outfitpageStatus') as HTMLElement | null;
    const spinner = document.getElementById('outfitpageSpinner') as HTMLElement | null;
  
    // Optional: if you want to also prepend the new image to the history grid
    const historyGrid = document.getElementById('historyGrid') as HTMLDivElement | null;
    const historyEmpty = document.getElementById('historyEmpty') as HTMLElement | null;
  
    if (!(btn && img && statusEl && spinner)) return;
  
    // Prevent duplicate listeners if this file is accidentally included twice
    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';

  
    const base = location.origin.startsWith('file:') ? 'http://localhost:3000' : '';
  
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      statusEl.textContent = 'Generating outfit...';
  
      // Hide previous image and show spinner
      spinner.hidden = false;
      img.hidden = true;
      img.removeAttribute('src'); // ensure next 'load' fires
  
      try {
        const res = await fetch('http://localhost:3000/api/outfit/generate');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
        const data = await res.json();
        if (!data.imageUrl) throw new Error(data.error || 'No imageUrl returned');
        
        if (data.imageUrl) {
            const outfitElement = document.getElementById('outfit') as HTMLImageElement | null;
            if (outfitElement) {
              outfitElement.src = data.imageUrl;
            }
            console.log('Attributes used:', data.attributes);
          } else {
            alert(data.error || 'Failed to make outfit');
        }
        // Build absolute URL and add cache-buster to avoid stale images
        const rawUrl = data.imageUrl.startsWith('http') ? data.imageUrl : `${base}${data.imageUrl}`;
        const bustUrl = rawUrl + (rawUrl.includes('?') ? '&' : '?') + 'v=' + Date.now();
  
        // Reveal only after the image has fully loaded
        img.addEventListener(
          'load',
          () => {
            spinner.hidden = true;
            img.hidden = false;
            statusEl.textContent = 'Outfit generated ✔';
  
            // Optional: prepend to history grid
            if (historyGrid) {
              const thumb = new Image();
              thumb.alt = 'Previously generated outfit';
              thumb.src = bustUrl;
              if (historyEmpty) historyEmpty.style.display = 'none';
              historyGrid.prepend(thumb);
            }
          },
          { once: true }
        );
  
        img.addEventListener(
          'error',
          () => {
            spinner.hidden = true;
            statusEl.textContent = 'Image failed to load. Please try again.';
          },
          { once: true }
        );
  
        //preserves the previous inline functionality
        img.src = bustUrl;
        //console.log('Attributes used:', data.attributes);
  
      } catch (e) {
        console.error(e);
        spinner.hidden = true;
        statusEl.textContent = 'Something went wrong. Please try again.';
      } finally {
        btn.disabled = false;
      }
    });
  })();

  // --- Previously Generated Outfits (TypeScript) ---
type GeneratedItem = { filename: string; url: string };
type GeneratedList =
  | GeneratedItem[]
  | { items: GeneratedItem[]; total?: number; offset?: number; limit?: number; hasMore?: boolean };

(() => {
  const base = location.origin.startsWith('file:') ? 'http://localhost:3000' : '';

  const historyGrid = document.getElementById('historyGrid') as HTMLDivElement | null;
  const historyEmpty = document.getElementById('historyEmpty') as HTMLElement | null;
  if (!(historyGrid && historyEmpty)) return;

  async function loadHistory(): Promise<void> {
    try {
      const res = await fetch(`${base}/api/generated`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!historyGrid || !historyEmpty) return;

      const data = (await res.json()) as GeneratedList;
      const items = Array.isArray(data) ? data : Array.isArray(data.items) ? data.items : [];

      historyGrid.innerHTML = '';
      if (!items.length) {
        historyEmpty.style.display = 'block';
        return;
      }
      historyEmpty.style.display = 'none';

      const frag = document.createDocumentFragment();
      for (const it of items) {
        const url = it.url.startsWith('http') ? it.url : `${base}${it.url}`;
        const img = new Image();
        img.alt = 'Previously generated outfit';
        img.src = url;
        frag.appendChild(img);
      }
      historyGrid.appendChild(frag);
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    void loadHistory();
  });
})();
  

  
  
  