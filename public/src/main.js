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
// Upload image button functionality
document.addEventListener('DOMContentLoaded', function () {
    var uploadButton = document.getElementById('uploadButton');
    var fileInput = document.getElementById('fileInput');
    if (!uploadButton || !fileInput) {
        console.error('uploadButton or fileInput not found in DOM');
        return;
    }
    // If inside a <form>, avoid accidental submit
    uploadButton.type = 'button';
    uploadButton.addEventListener('click', function () { return fileInput.click(); });
    fileInput.addEventListener('change', function () { return __awaiter(_this, void 0, void 0, function () {
        var files, formData, i, file, res, msg, err_1;
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
                            formData.append('images', file);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('http://localhost:3000/upload', { method: 'POST', body: formData })];
                case 2:
                    res = _a.sent();
                    if (!res.ok) {
                        console.error('Upload failed:', res.status, res.statusText);
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
    }); });
});
// Smooth-scroll for in-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
        var targetId = a.getAttribute('href');
        if (targetId.length > 1) {
            e.preventDefault();
            var el = document.querySelector(targetId);
            el === null || el === void 0 ? void 0 : el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // close mobile nav after click
            nav === null || nav === void 0 ? void 0 : nav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});
// Mobile nav toggle
var navToggle = document.querySelector('.nav-toggle');
var nav = document.querySelector('.nav');
navToggle.addEventListener('click', function () {
    var expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav === null || nav === void 0 ? void 0 : nav.classList.toggle('open');
});
// FAQ accordion (accessible)
var accordion = document.querySelector('[data-accordion]');
accordion === null || accordion === void 0 ? void 0 : accordion.querySelectorAll('.acc-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        // close others (optional)
        /*accordion.querySelectorAll<HTMLButtonElement>('.acc-trigger').forEach(b => {
          if (b !== btn) {
            b.setAttribute('aria-expanded', 'false');
            const p = document.getElementById(b.getAttribute('aria-controls')!);
            p?.setAttribute('hidden', '');
          }
        });*/
        // toggle current
        btn.setAttribute('aria-expanded', String(!expanded));
        panel === null || panel === void 0 ? void 0 : panel.toggleAttribute('hidden');
    });
});
// “Read to Bottom” helper inside About
document.querySelectorAll('[data-scroll-to-end]').forEach(function (btn) {
    var _a;
    var targetSel = btn.getAttribute('data-scroll-to-end');
    var scope = (_a = document.querySelector(targetSel)) === null || _a === void 0 ? void 0 : _a.querySelector('[data-overflow]');
    btn.addEventListener('click', function () {
        if (!scope)
            return;
        scope.scrollTo({ top: scope.scrollHeight, behavior: 'smooth' });
    });
});
