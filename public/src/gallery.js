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
