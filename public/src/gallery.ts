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

  //Display image from chatGPT
  document.getElementById('makeOutfit')?.addEventListener('click', async () => {
    const res = await fetch('http://localhost:3000/api/outfit/generate');
    const data = await res.json();
    if (data.imageUrl) {
      const outfitElement = document.getElementById('outfit') as HTMLImageElement | null;
      if (outfitElement) {
        outfitElement.src = data.imageUrl;
      }
      console.log('Attributes used:', data.attributes);
    } else {
      alert(data.error || 'Failed to make outfit');
    }
  });

  
  
  