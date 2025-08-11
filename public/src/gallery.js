document.addEventListener('DOMContentLoaded', function () {
    var galleryDiv = document.getElementById('gallery');
    if (!galleryDiv)
        return;
    fetch('http://localhost:3000/api/images')
        .then(function (res) {
        if (!res.ok)
            throw new Error("HTTP ".concat(res.status));
        var ctype = res.headers.get('content-type') || '';
        if (!ctype.includes('application/json'))
            return res.text().then(function (t) { throw new Error("Expected JSON, got: ".concat(t.slice(0, 80), "...")); });
        return res.json();
    })
        .then(function (files) {
        files.forEach(function (file) {
            var img = document.createElement('img');
            img.src = "../../uploads/".concat(file);
            img.width = 200;
            img.style.margin = '10px';
            galleryDiv.appendChild(img);
        });
    })
        .catch(function (err) { return console.error('Error loading images:', err); });
});
