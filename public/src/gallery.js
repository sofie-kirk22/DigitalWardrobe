var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Fetch top images from server and display in gallery
document.addEventListener('DOMContentLoaded', function () {
    var topsDiv = document.getElementById('tops');
    var bottomsDiv = document.getElementById('bottoms');
    var shoesDiv = document.getElementById('shoes');
    var accessoriesDiv = document.getElementById('accessories');
    var outerwearDiv = document.getElementById('outerwear');
    if (!topsDiv || !bottomsDiv || !shoesDiv || !accessoriesDiv || !outerwearDiv)
        return;
    // Fetch images for each category and display in respective sections
    // Tops
    fetch('http://localhost:3000/api/images/tops')
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
            img.src = "../../uploads/tops/".concat(file);
            img.width = 200;
            img.style.margin = '10px';
            topsDiv.appendChild(img);
        });
    })
        .catch(function (err) { return console.error('Error loading images:', err); });
    // Bottoms
    fetch('http://localhost:3000/api/images/bottoms')
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
            img.src = "../../uploads/bottoms/".concat(file);
            img.width = 200;
            img.style.margin = '10px';
            bottomsDiv.appendChild(img);
        });
    })
        .catch(function (err) { return console.error('Error loading images:', err); });
    // Shoes
    fetch('http://localhost:3000/api/images/shoes')
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
            img.src = "../../uploads/shoes/".concat(file);
            img.width = 200;
            img.style.margin = '10px';
            shoesDiv.appendChild(img);
        });
    })
        .catch(function (err) { return console.error('Error loading images:', err); });
    // Accessories
    fetch('http://localhost:3000/api/images/accessories')
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
            img.src = "../../uploads/accessories/".concat(file);
            img.width = 200;
            img.style.margin = '10px';
            accessoriesDiv.appendChild(img);
        });
    })
        .catch(function (err) { return console.error('Error loading images:', err); });
    // Outerwear
    fetch('http://localhost:3000/api/images/outerwear')
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
            img.src = "../../uploads/outerwear/".concat(file);
            img.width = 200;
            img.style.margin = '10px';
            outerwearDiv.appendChild(img);
        });
    })
        .catch(function (err) { return console.error('Error loading images:', err); });
});
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
// Upload image button functionality
document.addEventListener('DOMContentLoaded', function () {
    var uploadButtonTops = document.getElementById('uploadButtonTops');
    var uploadButtonBottoms = document.getElementById('uploadButtonBottoms');
    var uploadButtonShoes = document.getElementById('uploadButtonShoes');
    var uploadButtonAccessories = document.getElementById('uploadButtonAccessories');
    var uploadButtonOuterwear = document.getElementById('uploadButtonOuterwear');
    var fileInput = document.getElementById('fileInput');
    if (!uploadButtonTops || !fileInput || !uploadButtonBottoms || !uploadButtonShoes || !uploadButtonAccessories || !uploadButtonOuterwear) {
        console.error('uploadButton or fileInput not found in DOM');
        return;
    }
    var currentCategory = null;
    // Assign category on click, then trigger file input
    uploadButtonTops.addEventListener('click', function () { currentCategory = 'tops'; fileInput.click(); });
    uploadButtonBottoms.addEventListener('click', function () { currentCategory = 'bottoms'; fileInput.click(); });
    uploadButtonShoes.addEventListener('click', function () { currentCategory = 'shoes'; fileInput.click(); });
    uploadButtonAccessories.addEventListener('click', function () { currentCategory = 'accessories'; fileInput.click(); });
    uploadButtonOuterwear.addEventListener('click', function () { currentCategory = 'outerwear'; fileInput.click(); });
    // Prevent accidental form submission
    [uploadButtonTops, uploadButtonBottoms, uploadButtonShoes, uploadButtonAccessories, uploadButtonOuterwear]
        .forEach(function (btn) { return btn.type = 'button'; });
    fileInput.addEventListener('change', function () {
        if (currentCategory) {
            uploadFiles(fileInput, 'http://localhost:3000/upload', 'images', currentCategory);
            currentCategory = null; // reset
        }
        else {
            console.error('No category selected before file input change');
        }
    });
});
// Parameterised upload function
function uploadFiles(fileInput, uploadUrl, fieldName, category) {
    return __awaiter(this, void 0, void 0, function () {
        var files, formData, i, file, targetUrl, res, msg, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = fileInput.files;
                    if (!(files === null || files === void 0 ? void 0 : files.length))
                        return [2 /*return*/];
                    formData = new FormData();
                    for (i = 0; i < files.length; i++) {
                        file = files[i];
                        if (file)
                            formData.append(fieldName, file);
                    }
                    targetUrl = category ? "".concat(uploadUrl, "/").concat(encodeURIComponent(category)) : uploadUrl;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(targetUrl, { method: 'POST', body: formData })];
                case 2:
                    res = _a.sent();
                    if (!res.ok) {
                        console.error("Upload failed: ".concat(res.status, " ").concat(res.statusText));
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, res.text()];
                case 3:
                    msg = _a.sent();
                    console.log('Upload success:', msg);
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.error('Network error while uploading:', err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// --- Outfit generator: spinner + hide until loaded + set image + log attributes ---
(function () {
    var btn = document.getElementById('makeOutfit');
    var img = document.getElementById('outfit');
    var statusEl = document.getElementById('outfitpageStatus');
    var spinner = document.getElementById('outfitpageSpinner');
    // Optional: if you want to also prepend the new image to the history grid
    var historyGrid = document.getElementById('historyGrid');
    var historyEmpty = document.getElementById('historyEmpty');
    if (!(btn && img && statusEl && spinner))
        return;
    // Prevent duplicate listeners if this file is accidentally included twice
    if (btn.dataset.bound === '1')
        return;
    btn.dataset.bound = '1';
    var base = location.origin.startsWith('file:') ? 'http://localhost:3000' : '';
    btn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, outfitElement, rawUrl, bustUrl_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    btn.disabled = true;
                    statusEl.textContent = 'Generating outfit...';
                    // Hide previous image and show spinner
                    spinner.hidden = false;
                    img.hidden = true;
                    img.removeAttribute('src'); // ensure next 'load' fires
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('http://localhost:3000/api/outfit/generate')];
                case 2:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (!data.imageUrl)
                        throw new Error(data.error || 'No imageUrl returned');
                    if (data.imageUrl) {
                        outfitElement = document.getElementById('outfit');
                        if (outfitElement) {
                            outfitElement.src = data.imageUrl;
                        }
                        console.log('Attributes used:', data.attributes);
                    }
                    else {
                        alert(data.error || 'Failed to make outfit');
                    }
                    rawUrl = data.imageUrl.startsWith('http') ? data.imageUrl : "".concat(base).concat(data.imageUrl);
                    bustUrl_1 = rawUrl + (rawUrl.includes('?') ? '&' : '?') + 'v=' + Date.now();
                    // Reveal only after the image has fully loaded
                    img.addEventListener('load', function () {
                        spinner.hidden = true;
                        img.hidden = false;
                        statusEl.textContent = 'Outfit generated ✔';
                        // Optional: prepend to history grid
                        if (historyGrid) {
                            var thumb = new Image();
                            thumb.alt = 'Previously generated outfit';
                            thumb.src = bustUrl_1;
                            if (historyEmpty)
                                historyEmpty.style.display = 'none';
                            historyGrid.prepend(thumb);
                        }
                    }, { once: true });
                    img.addEventListener('error', function () {
                        spinner.hidden = true;
                        statusEl.textContent = 'Image failed to load. Please try again.';
                    }, { once: true });
                    //preserves the previous inline functionality
                    img.src = bustUrl_1;
                    return [3 /*break*/, 6];
                case 4:
                    e_1 = _a.sent();
                    console.error(e_1);
                    spinner.hidden = true;
                    statusEl.textContent = 'Something went wrong. Please try again.';
                    return [3 /*break*/, 6];
                case 5:
                    btn.disabled = false;
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); });
})();
(function () {
    var base = location.origin.startsWith('file:') ? 'http://localhost:3000' : '';
    var historyGrid = document.getElementById('historyGrid');
    var historyEmpty = document.getElementById('historyEmpty');
    if (!(historyGrid && historyEmpty))
        return;
    function loadHistory() {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, items, frag, _i, items_1, it, url, img, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("".concat(base, "/api/generated"))];
                    case 1:
                        res = _a.sent();
                        if (!res.ok)
                            throw new Error("HTTP ".concat(res.status));
                        if (!historyGrid || !historyEmpty)
                            return [2 /*return*/];
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = (_a.sent());
                        items = Array.isArray(data) ? data : Array.isArray(data.items) ? data.items : [];
                        historyGrid.innerHTML = '';
                        if (!items.length) {
                            historyEmpty.style.display = 'block';
                            return [2 /*return*/];
                        }
                        historyEmpty.style.display = 'none';
                        frag = document.createDocumentFragment();
                        for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                            it = items_1[_i];
                            url = it.url.startsWith('http') ? it.url : "".concat(base).concat(it.url);
                            img = new Image();
                            img.alt = 'Previously generated outfit';
                            img.src = url;
                            frag.appendChild(img);
                        }
                        historyGrid.appendChild(frag);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.error('Failed to load history:', e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    document.addEventListener('DOMContentLoaded', function () {
        void loadHistory();
    });
})();
