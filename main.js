function isFullNow() { return !!(document.fullscreenElement || document.webkitFullscreenElement) }
        function fsToast(msg) {
            let t = document.getElementById("fstoast");
            if (!t) { t = document.createElement("div"); t.id = "fstoast"; t.style.cssText = "position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:200;background:rgba(15,25,15,.95);color:#f4f1e6;padding:12px 16px;border-radius:12px;font:14px/1.4 system-ui,sans-serif;text-align:center;max-width:86vw;border:1px solid rgba(255,255,255,.2)"; document.body.appendChild(t) }
            t.textContent = msg; t.style.display = "block"; clearTimeout(t._h); t._h = setTimeout(() => t.style.display = "none", 5000);
        }
        function toggleFullscreen() {
            const el = document.documentElement;
            if (!isFullNow()) {
                const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
                if (!req) { fsToast("Browser ini tidak mendukung layar penuh. Di iPhone: ketuk Bagikan lalu \"Tambah ke Layar Utama\", lalu buka dari ikonnya."); return }
                try {
                    const r = req.call(el, { navigationUI: "hide" });
                    if (r && r.then) r.then(() => { try { screen.orientation && screen.orientation.lock && screen.orientation.lock("landscape").catch(() => { }) } catch (e) { } }).catch(() => fsToast("Layar penuh ditolak browser. Coba lagi atau buka lewat Chrome."));
                } catch (e) { fsToast("Layar penuh tidak bisa dibuka di browser ini.") }
            } else {
                const ex = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
                try { ex && ex.call(document) } catch (e) { }
                try { screen.orientation && screen.orientation.unlock && screen.orientation.unlock() } catch (e) { }
            }
        }

        // Handle Fullscreen UI Icon state
        document.addEventListener("fullscreenchange", updateFullIcon);
        document.addEventListener("webkitfullscreenchange", updateFullIcon);
        document.addEventListener("fullscreenerror", () => fsToast("Layar penuh ditolak browser."));
        function updateFullIcon() {
            const isFull = isFullNow();
            const bfull = document.getElementById("bfull");
            const pfull = document.getElementById("pfull");
            if (bfull) bfull.textContent = isFull ? "✕" : "⛶";
            if (pfull) pfull.textContent = isFull ? "✕ Keluar Layar Penuh" : "⛶ Layar Penuh (Fullscreen)";
        }
        const S = 7, W = 360, H = 490, MH = 392;
        const mosq = new Image(); mosq.src = "assets/mosq.png";
        const iso = new Image(); iso.src = "assets/iso.png";
        // Semua koordinat dalam satuan screenshot (360x490)
        const roads = [
            { p: [[133, -20], [135, 60], [138, 130], [142, 200], [150, 250], [185, 320], [225, 380], [245, 430], [262, 520]], w: 26, y: 1 },
            { p: [[-20, 176], [135, 176]], w: 18 },
            { p: [[-20, 270], [152, 270]], w: 18 },
            
            { p: [[258, -20], [262, 45], [304, 62], [340, 100], [385, 130]], w: 20 },
            { p: [[132, 10], [190, 8], [260, 10]], w: 14 },
            { p: [[-20, 383], [100, 378], [160, 374], [226, 380]], w: 12 }];
        const blds = [
            { x: 8, y: 132, w: 60, h: 32, c: "#c9b99a", r: "#d8cbb0", n: "" },
            { x: 21.58, y: 278.38, w: 80.84, h: 60.62, hid: 1, c: "#8a8f94", r: "#a4a9ae", n: "" },
            { x: 185, y: 38, w: 58, h: 37.5, hid: 1, c: "#cfcabc", r: "#e4e0d4", n: "" },
            { x: 197.5, y: 75.5, w: 31.8, h: 8.3, hid: 1, c: "#cfcabc", r: "#e4e0d4", n: "" },
            { x: 72, y: 200, w: 50, h: 40, c: "#b59a78", r: "#c8ae8a", n: "" },
            
        ];
        const plaza = { x: -50, y: -50, w: 0, h: 0 }, oct = { x: 248, y: 420, r: 20 }, garden = { x: 186, y: 86, w: 56, h: 160 }, blobs = [[[158, 90], [170, 88], [178, 94], [179, 112], [176, 130], [170, 137], [160, 134], [154, 118], [155, 100]], [[160, 148], [172, 146], [179, 156], [178, 172], [172, 183], [162, 181], [157, 168], [157, 155]], [[163, 196], [176, 194], [181, 210], [180, 232], [176, 252], [168, 256], [165, 240], [161, 218]]];

        // ===== EVENT "Kwas!" - Pameran Seni & Cosplay di Sekretariat UPM =====
        // Gedung: x72 y200 w50 h40. Logo diambil dari gambar yang diberikan pengguna.
        const evLogo = new Image(); evLogo.src = "assets/evlogo.png";
        const EVR = "#3c87fe", EVD = "#1d3f8f", EVW = "#f7f7f7", EVG = "#8ed63a", EVP = "#ff8fb8";
        const evBooths = []; for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) evBooths.push({ x: 16 + c * 18, y: 194 + r * 18, w: 14, h: 10, t: ["Lukisan", "Cosplay", "Fotografi", "Ilustrasi", "Kriya", "Merch"][r * 3 + c] });
        // area terhalang: [x, y, w, h]
        const evStands = evBooths.map(b => [b.x - .5, b.y, b.w + 1, b.h + 3]).concat([[84.5, 252.5, 7, 7], [102.5, 252.5, 7, 7]]);
        function evDecor(g) {
            g.save(); g.textAlign = "center";
            // matras / lantai area pameran
            g.fillStyle = "rgba(34,42,78,.9)"; g.beginPath(); g.roundRect(13, 189, 57, 41, 2); g.fill();
            g.strokeStyle = "rgba(255,255,255,.07)"; g.lineWidth = .25;
            for (let x = 15; x < 70; x += 4) { g.beginPath(); g.moveTo(x, 189); g.lineTo(x, 230); g.stroke() }
            for (let y = 191; y < 230; y += 4) { g.beginPath(); g.moveTo(13, y); g.lineTo(70, y); g.stroke() }
            g.strokeStyle = EVR; g.lineWidth = .5; g.beginPath(); g.roundRect(13, 189, 57, 41, 2); g.stroke();
            // galeri: lukisan berbingkai di tepi bawah matras
            const fr = [["#ff8fb8", "#8ed63a"], ["#3c87fe", "#ffe27a"], ["#8ed63a", "#ff6a5e"], ["#ffe27a", "#7a5cff"], ["#ff6a5e", "#3c87fe"], ["#7a5cff", "#8ed63a"]];
            fr.forEach(([c1, c2], i) => {
                const fx = 15.5 + i * 9, fy = 225.6;
                g.fillStyle = "rgba(0,0,0,.35)"; g.fillRect(fx + .7, fy + .7, 8, 3.6);
                g.fillStyle = "#f4efe4"; g.fillRect(fx, fy, 8, 3.6); g.fillStyle = c1; g.fillRect(fx + .5, fy + .5, 7, 2.6);
                g.fillStyle = c2; g.beginPath(); g.arc(fx + 2.6, fy + 1.8, .9, 0, 7); g.fill(); g.fillRect(fx + 4.4, fy + 1.6, 2.6, 1.2);
            });
            // karpet menuju pintu
            g.fillStyle = "rgba(0,0,0,.3)"; g.fillRect(91.8, 245.8, 12, 16);
            g.fillStyle = "#2a3a78"; g.fillRect(91, 245, 12, 17);
            g.fillStyle = EVG; g.fillRect(91, 245, .8, 17); g.fillRect(102.2, 245, .8, 17);
            g.strokeStyle = "rgba(255,255,255,.14)"; g.lineWidth = .3; g.setLineDash([1.2, 1.2]); g.beginPath(); g.moveTo(97, 246); g.lineTo(97, 261); g.stroke(); g.setLineDash([]);
            // panel logo di atap gedung (logo digambar di evAnim)
            g.fillStyle = "rgba(0,0,0,.25)"; g.beginPath(); g.roundRect(75.8, 203.8, 44, 28.5, 1.2); g.fill();
            g.fillStyle = "rgb(60,135,254)"; g.beginPath(); g.roundRect(75, 203, 44, 28.5, 1.2); g.fill();
            g.fillStyle = EVW; g.font = "bold 2.9px system-ui,sans-serif"; g.fillText("PAMERAN SENI & COSPLAY", 97, 229.6);
            g.strokeStyle = "#fff"; g.lineWidth = .5; g.beginPath(); g.roundRect(75, 203, 44, 28.5, 1.2); g.stroke();
            // spanduk menggantung di atas pintu
            g.fillStyle = "rgba(0,0,0,.35)"; g.fillRect(75, 239.2, 44, 6.5);
            g.fillStyle = EVR; g.fillRect(74, 238, 46, 6.5);
            g.fillStyle = EVG; g.fillRect(74, 238, 46, .6); g.fillRect(74, 243.9, 46, .6);
            g.font = "bold 4.4px system-ui,sans-serif"; g.fillStyle = "#fff"; g.fillText("SELAMAT DATANG", 97, 242.5);
            // roll-up banner / standee
            for (const [sx, sy] of [[68, 238], [124, 238]]) { g.fillStyle = "rgba(0,0,0,.3)"; g.fillRect(sx + .8, sy + .8, 3.6, 8); g.fillStyle = EVD; g.fillRect(sx, sy, 3.6, 8); g.fillStyle = EVG; g.fillRect(sx, sy, 3.6, 1.2); g.fillStyle = EVW; g.font = "bold 1.5px system-ui"; g.fillText("SENI", sx + 1.8, sy + 4.5) }
            // tiang bunting
            for (const px of [14, 122]) { g.fillStyle = "#888"; g.beginPath(); g.arc(px, 189, 1, 0, 7); g.fill(); g.fillStyle = "#ccc"; g.beginPath(); g.arc(px, 189, .5, 0, 7); g.fill() }
            // alas balon
            for (const bx of [88, 106]) { g.fillStyle = "rgba(0,0,0,.3)"; g.beginPath(); g.ellipse(bx + .8, 257.5, 3.6, 2.6, 0, 0, 7); g.fill(); g.fillStyle = "#3a4a86"; g.beginPath(); g.arc(bx, 256.5, 3, 0, 7); g.fill(); g.strokeStyle = EVG; g.lineWidth = .4; g.stroke() }
            // stand
            for (const b of evBooths) {
                g.fillStyle = "rgba(0,0,0,.32)"; g.fillRect(b.x + 1.4, b.y + 1.4, b.w, b.h + 2.5);
                g.fillStyle = "#6b4a2a"; g.fillRect(b.x + .6, b.y + b.h, b.w - 1.2, 2.5);
                g.fillStyle = "#8a6238"; g.fillRect(b.x + .6, b.y + b.h, b.w - 1.2, .6);
                for (let i = 0; i < 7; i++) { g.fillStyle = i % 2 ? EVW : EVR; g.fillRect(b.x + i * 2, b.y, 2, b.h) }
                g.strokeStyle = "rgba(0,0,0,.4)"; g.lineWidth = .35; g.strokeRect(b.x, b.y, b.w, b.h);
                g.fillStyle = "rgba(29,63,143,.94)"; g.beginPath(); g.roundRect(b.x + 1.2, b.y + 3.2, b.w - 2.4, 3.6, .6); g.fill();
                g.fillStyle = "#fff"; g.font = "bold 2.2px system-ui,sans-serif"; g.fillText(b.t, b.x + b.w / 2, b.y + 5.6);
                g.fillStyle = [EVG, EVP, "#ffe27a"][(b.x + b.y) % 3]; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(b.x + 3 + i * 4, b.y + b.h + 1.3, .6, 0, 7); g.fill() }
            }
            g.restore();
        }
        function gateSigns(g) {
            g.save(); g.textAlign = "center";
            for (const [x, y, t, col] of [[104, 303, "IKHWAN", "#1e5aa8"], [60, 342.5, "AKHWAT", "#b03a7a"]]) {
                g.fillStyle = "rgba(0,0,0,.3)"; g.fillRect(x + .6, y + 4.4, 14, 1.2);
                g.fillStyle = "#5b4630"; g.fillRect(x + 1.6, y + 3.4, .7, 2); g.fillRect(x + 11.7, y + 3.4, .7, 2);
                g.fillStyle = "#fff"; g.fillRect(x - .4, y - .4, 14.8, 4.6); g.fillStyle = col; g.fillRect(x, y, 14, 3.8);
                g.fillStyle = "#fff"; g.font = "bold 2.6px system-ui,sans-serif"; g.fillText(t, x + 7, y + 2.8);
            }
            g.restore();
        }

        // ===== Plaza paving semen + bata melingkar mengelilingi Masjid Al-Furqan =====
        function mosquePlaza(g) {
            const cx = 70, cy = 318, R = 58, TAU = Math.PI * 2;
            g.save();
            g.beginPath(); g.arc(cx, cy, R + 1, 0, TAU); g.fillStyle = "#6b6b6e"; g.fill();
            g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.clip();
            g.fillStyle = "#b4b4b8"; g.fillRect(cx - R, cy - R, 2 * R, 2 * R);
            const r = rng(33), cols = ["#8e8e93", "#85858a", "#9a9a9f", "#7d7d82", "#92929a"];
            for (let y = cy - R, row = 0; y < cy + R; y += 2.5, row++) {
                const off = (row % 2) * 2.3;
                for (let x = cx - R - 5 + off; x < cx + R; x += 4.6) {
                    if (Math.hypot(x + 2.1 - cx, y + 1.1 - cy) > R + 3) continue;
                    g.fillStyle = cols[(r() * cols.length) | 0]; g.fillRect(x, y, 4.25, 2.15);
                    g.fillStyle = "rgba(255,255,255,.07)"; g.fillRect(x, y, 4.25, .5);
                }
            }
            // cincin semen luar (bergaris radial)
            g.beginPath(); g.arc(cx, cy, R + 1, 0, TAU); g.moveTo(cx + R - 6, cy); g.arc(cx, cy, R - 6, 0, TAU, true); g.fillStyle = "#d4d4d8"; g.fill("evenodd");
            g.strokeStyle = "#a6a6ab"; g.lineWidth = .25;
            for (let i = 0; i < 90; i++) { const a = i / 90 * TAU; g.beginPath(); g.moveTo(cx + Math.cos(a) * (R - 6), cy + Math.sin(a) * (R - 6)); g.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); g.stroke() }
            g.strokeStyle = "#9a9a9f"; g.lineWidth = .5; g.beginPath(); g.arc(cx, cy, R - 6, 0, TAU); g.stroke();
            // jalur semen melingkar di tengah plaza
            g.strokeStyle = "#d0d0d4"; g.lineWidth = 2.6; g.beginPath(); g.arc(cx, cy, 41, 0, TAU); g.stroke();
            g.strokeStyle = "#9a9a9f"; g.lineWidth = .3; g.beginPath(); g.arc(cx, cy, 42.3, 0, TAU); g.stroke(); g.beginPath(); g.arc(cx, cy, 39.7, 0, TAU); g.stroke();
            g.restore();
        }
        function evAnim(c, n) {
            c.save(); c.textAlign = "center";
            // logo Kwas! di panel atap
            if (evLogo.complete && evLogo.naturalWidth) { c.imageSmoothingEnabled = true; c.imageSmoothingQuality = "high"; c.drawImage(evLogo, 82.4, 204.4, 29.2, 22) }
            // kilau berjalan di panel
            c.save(); c.beginPath(); c.roundRect(75, 203, 44, 28.5, 1.2); c.clip();
            const sx = 75 + ((n / 22) % 80) - 18, gr = c.createLinearGradient(sx, 0, sx + 14, 0); gr.addColorStop(0, "rgba(255,255,255,0)"); gr.addColorStop(.5, "rgba(255,255,255,.22)"); gr.addColorStop(1, "rgba(255,255,255,0)");
            c.fillStyle = gr; c.fillRect(sx - 2, 203, 20, 28.5); c.restore();
            // lampu kedip di spanduk
            for (let i = 0; i < 12; i++) { c.fillStyle = (Math.floor(n / 280) + i) % 3 ? "rgba(255,255,255,.18)" : "#ffe27a"; c.beginPath(); c.arc(75.5 + i * 3.8, 244.9, .45, 0, 7); c.fill() }
            // bunting warna-warni
            const cols = [EVR, EVW, EVG, EVP], x0 = 14, x1 = 122, N = 18;
            c.strokeStyle = "#cfcfcf"; c.lineWidth = .25; c.beginPath(); for (let i = 0; i <= 40; i++) { const t = i / 40, x = x0 + (x1 - x0) * t, y = 189 + Math.sin(Math.PI * t) * 2.2; i ? c.lineTo(x, y) : c.moveTo(x, y) } c.stroke();
            for (let i = 0; i < N; i++) {
                const t = (i + .5) / N, x = x0 + (x1 - x0) * t, y = 189 + Math.sin(Math.PI * t) * 2.2, w = Math.sin(n / 260 + i * .9) * .9;
                c.fillStyle = cols[i % 4]; c.beginPath(); c.moveTo(x - 2.2, y); c.lineTo(x + 2.2, y); c.lineTo(x + w, y + 4.6); c.closePath(); c.fill();
                c.strokeStyle = "rgba(0,0,0,.25)"; c.lineWidth = .2; c.stroke();
            }
            // balon di tiang gerbang
            for (const [bx, ph] of [[88, 0], [106, 1.7]]) {
                const bob = Math.sin(n / 500 + ph) * .9;
                [[-1.8, -1.2, EVR], [1.6, -1.6, EVP], [0, -3.6, EVG], [-2.6, -4.4, EVW], [2.2, -5, "#ffe27a"]].forEach(([dx, dy, col], k) => {
                    const yy = 254.5 + dy * 1.4 + bob * (1 + k * .15), xx = bx + dx * 1.2;
                    c.strokeStyle = "rgba(255,255,255,.35)"; c.lineWidth = .15; c.beginPath(); c.moveTo(bx, 255.5); c.lineTo(xx, yy + 1.8); c.stroke();
                    c.fillStyle = col; c.beginPath(); c.ellipse(xx, yy, 1.7, 2.1, 0, 0, 7); c.fill();
                    c.fillStyle = "rgba(255,255,255,.55)"; c.beginPath(); c.arc(xx - .6, yy - .8, .45, 0, 7); c.fill();
                });
            }
            // konfeti kecil jatuh di sekitar pintu
            for (let i = 0; i < 14; i++) {
                const ph = (n / 1400 + i * .137) % 1, cx = 80 + ((i * 53) % 34) + Math.sin(n / 400 + i) * 1.2, cy = 236 + ph * 24;
                c.globalAlpha = 1 - ph * .8; c.fillStyle = [EVG, EVP, "#ffe27a", EVR][i % 4]; c.fillRect(cx, cy, .9, .9);
            }
            c.globalAlpha = .1 + .07 * Math.sin(n / 350); c.fillStyle = "#fff"; c.beginPath(); c.ellipse(97, 254, 5, 8, 0, 0, 7); c.fill();
            c.restore();
        }
        function treeBase(g, t) { const s = t.s; g.fillStyle = "rgba(0,0,0,.22)"; g.beginPath(); g.ellipse(t.x + 1.5, t.y + 1.2, s * (t.k === 5 ? .7 : t.k === 3 ? .6 : .95), s * .45, 0, 0, 7); g.fill(); if (t.k === 6) return; g.fillStyle = t.k === 5 ? "#6b5636" : "#3b2a1a"; g.beginPath(); g.arc(t.x, t.y, t.k === 3 || t.k === 5 ? 1.4 : 2.1, 0, 7); g.fill() }
        function treeCan(k, t) {
            const rs = rng((t.v * 1e6) | 0), s = t.s, x = t.x, y = t.y - 1.5;
            const lob = (cx, cy, R, n, cols, sp) => { for (let i = 0; i < n; i++) { const a = rs() * 6.283, d = rs() * sp; k.fillStyle = cols[i % cols.length]; k.beginPath(); k.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, R * (.8 + rs() * .4), 0, 7); k.fill() } };
            switch (t.k) {
                case 0: k.fillStyle = "#244f23"; k.beginPath(); k.arc(x, y, s, 0, 7); k.fill(); lob(x, y, s * .5, 7, ["#2f6b2c", "#3a7a35", "#46893f"], s * .55); k.fillStyle = "rgba(150,210,110,.35)"; k.beginPath(); k.arc(x - s * .3, y - s * .35, s * .35, 0, 7); k.fill(); break;
                case 1: k.fillStyle = "#27602d"; k.beginPath(); k.ellipse(x, y, s * 1.4, s * .95, 0, 0, 7); k.fill(); for (let i = 0; i < 9; i++) { k.fillStyle = ["#3a8a3e", "#4aa048", "#2f7a36"][i % 3]; k.beginPath(); k.arc(x + (rs() - .5) * s * 1.8, y + (rs() - .5) * s * .9, s * .5, 0, 7); k.fill() } break;
                case 2: k.fillStyle = "#1c4220"; k.beginPath(); k.arc(x, y, s * 1.05, 0, 7); k.fill(); lob(x, y, s * .3, 12, ["#245a2a", "#1f4d25", "#2d6a30"], s * .75); break;
                case 3: for (let i = 0; i < 3; i++) { const ty = y - s * 1.6 + i * s * .8, w = s * (.7 + i * .3); k.fillStyle = i % 2 ? "#255a30" : "#1f4a2a"; k.beginPath(); k.moveTo(x, ty - s * .9); k.lineTo(x + w, ty + s * .8); k.lineTo(x - w, ty + s * .8); k.fill() } break;
                case 4: k.fillStyle = "#2b6f32"; k.beginPath(); k.arc(x, y, s * 1.1, 0, 7); k.fill(); lob(x, y, s * .5, 6, ["#3a8a3e", "#2f7a36"], s * .6); for (let i = 0; i < 16; i++) { const a = rs() * 6.283, d = rs() * s * .9; k.fillStyle = ["#e8472b", "#ff7043", "#ffab40"][i % 3]; k.beginPath(); k.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, .7, 0, 7); k.fill() } break;
                case 5: { const cy = y - s * .9; k.strokeStyle = "#6b5636"; k.lineWidth = 1.2; k.beginPath(); k.moveTo(t.x, t.y); k.lineTo(x, cy); k.stroke(); for (let i = 0; i < 8; i++) { k.save(); k.translate(x, cy); k.rotate(i * .785 + rs() * .2); k.fillStyle = i % 2 ? "#3b8a3a" : "#2f7a33"; k.beginPath(); k.ellipse(s * .8, 0, s * .9, s * .26, 0, 0, 7); k.fill(); k.restore() } k.fillStyle = "#5b3a1a"; k.beginPath(); k.arc(x, cy, 1, 0, 7); k.fill(); break }
                default: k.fillStyle = "#2d6a2c"; k.beginPath(); k.arc(t.x, t.y, s * .55, 0, 7); k.fill(); lob(t.x, t.y, s * .28, 4, ["#3f8a3b", "#4a9a45"], s * .3); if (t.v > .7) { k.fillStyle = "#f48fb1"; for (let i = 0; i < 3; i++) { k.beginPath(); k.arc(t.x + (rs() - .5) * s * .7, t.y + (rs() - .5) * s * .7, .6, 0, 7); k.fill() } }
            }
        }
        function inPoly(x, y, P) { let c = 0; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const a = P[i], b = P[j]; if ((a[1] > y) != (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) c = !c } return c }
        function inGreen(x, y) { return blobs.some(P => [[0, 0], [4, 0], [-4, 0], [0, 4], [0, -4]].some(d => inPoly(x + d[0], y + d[1], P))) }
        function blob(g, pts) { const n = pts.length; g.beginPath(); g.moveTo((pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2); for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; g.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2) } g.closePath() }
        const items = [
            { n: "Gedung Rektorat", x: 214, y: 128 }, 
            { n: "Sekretariat UPM", x: 97, y: 252 }, { n: "Taman Bareti", x: 214, y: 224 }, { n: "Masjid Al-Furqan", x: 62, y: 356 }];
        const spawn = { x: 214, y: 102 };
        items.push({ n: "Indomaret", x: 38, y: 171 });
        const labels = [["Gedung Rektorat UPI, ISOLA", 214, 15], ["Sekretariat UPM", 97, 235.6]];
        const zones = [[235, 90, 125, 330, .8], [150, 85, 60, 100, .7], [150, 200, 60, 140, .7], [0, 190, 120, 70, .45], [60, 315, 60, 70, .5], [210, 255, 40, 150, .6], [0, 0, 25, 130, .5], [235, 0, 125, 90, .55], [90, 115, 45, 70, .5], [260, 400, 100, 40, .5]];
        function rng(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
        function dSeg(px, py, a, b) { const dx = b[0] - a[0], dy = b[1] - a[1]; let t = ((px - a[0]) * dx + (py - a[1]) * dy) / (dx * dx + dy * dy); t = Math.max(0, Math.min(1, t)); return Math.hypot(px - a[0] - t * dx, py - a[1] - t * dy) }
        function roadDist(x, y, R = roads) { let m = 1e9; for (const r of R) { for (let i = 0; i < r.p.length - 1; i++) { m = Math.min(m, dSeg(x, y, r.p[i], r.p[i + 1]) - r.w / 2) } } return m }
        function inR(x, y, b, m) { return x > b.x - m && x < b.x + b.w + m && y > b.y - m && y < b.y + b.h + m }
        const roads0 = [{ p: [[133, -20], [135, 60], [138, 130], [142, 200], [150, 250], [185, 320], [225, 380], [245, 430], [262, 520]], w: 26 }, { p: [[-20, 186], [135, 186]], w: 18 }, { p: [[-20, 265], [152, 265]], w: 18 }, { p: [[118, 265], [120, 345], [205, 345]], w: 12 }, { p: [[258, -20], [262, 45], [304, 62], [340, 100], [385, 130]], w: 20 }, { p: [[132, 10], [190, 8], [260, 10]], w: 14 }, { p: [[-20, 383], [100, 378], [160, 374], [226, 380]], w: 12 }];
        const blds0 = [{ x: 8, y: 132, w: 60, h: 32 }, { x: 10, y: 270, w: 50, h: 42 }, { x: 185, y: 38, w: 58, h: 37.5 }, { x: 197.5, y: 75.5, w: 31.8, h: 8.3 }, { x: 5, y: 395, w: 80, h: 75 }];
        const items0 = [{ x: 214, y: 128 }, { x: 35, y: 322 }, { x: 214, y: 224 }, { x: 68, y: 475 }], spawn0 = { x: 214, y: 102 };
        function treeOK(x, y) { return !(x > -10 && x < 150 && y > 176 && y < 270) && !(y > 388) && !(x > -10 && x < 135 && y > 278 && y < 374) && roadDist(x, y) >= 5 && !blds.some(b => inR(x, y, b, 5)) && !items.some(i => Math.hypot(x - i.x, y - i.y) < 11) && Math.hypot(x - spawn.x, y - spawn.y) >= 12 }
        roads.pop(); const trees = [];
        (function () {
            const r = rng(7);
            for (const [zx, zy, zw, zh, p] of zones) for (let x = zx; x < zx + zw; x += 11)for (let y = zy; y < zy + zh; y += 11) {
                const tx = x + (r() - .5) * 7, ty = y + (r() - .5) * 7; if (r() > p || tx < 2 || ty < 2 || tx > W - 2 || ty > H - 2) continue;
                if (roadDist(tx, ty, roads0) < 5) continue; if (blds0.some(b => inR(tx, ty, b, 5))) continue; if (inR(tx, ty, plaza, 4) || inR(tx, ty, garden, 6) || inGreen(tx, ty) || ((tx - 214) / 48) ** 2 + ((ty - 52) / 46) ** 2 < 1 || ((tx - 45) / 58) ** 2 + ((ty - 432) / 52) ** 2 < 1 || inR(tx, ty, { x: 90, y: 404, w: 32, h: 52 }, 2)) continue;
                if (Math.hypot(tx - oct.x, ty - oct.y) < oct.r + 4) continue; if (items0.some(i => Math.hypot(tx - i.x, ty - i.y) < 11)) continue;
                if (Math.hypot(tx - spawn0.x, ty - spawn0.y) < 12) continue; if (tx > 150 && ty > 90 && ty < 340 && (Math.abs(Math.sin(tx * 5.3 + ty * 9.7) * 7777.7) % 1) > .4) continue; if (tx > 140 && tx < 290 && ty < 150 && (Math.abs(Math.sin(tx * 7.7 + ty * 3.1) * 4321.5) % 1) > .3) continue; { const q = Math.abs(Math.sin(tx * 12.9898 + ty * 78.233) * 43758.5453) % 1; const T = { x: tx, y: ty, s: 5 + r() * 2.2, k: q < .34 ? 0 : q < .52 ? 1 : q < .68 ? 2 : q < .8 ? 3 : q < .9 ? 4 : q < .95 ? 5 : 6, v: Math.abs(Math.sin(tx * 39.3 + ty * 11.1) * 9999.7) % 1 }; if (treeOK(tx, ty)) trees.push(T) }
            }
            trees.sort((a, b) => a.y - b.y)
        })();
        const pines = []; (function () { const r = rng(11); for (const x of [180, 248]) for (let y = 106; y < 248; y += 18)pines.push({ x: x + (r() - .5) * 2, y: y, h: 13 + r() * 3 }) })();

        // Render peta statis
        function mk() { const c = document.createElement("canvas"); c.width = W * S; c.height = H * S; const g = c.getContext("2d"); g.scale(S, S); return [c, g] }
        const [base, g] = mk(), [can, k] = mk();
        g.fillStyle = "#3f6b3a"; g.fillRect(0, 0, W, H);
        const spk = rng(3); for (let i = 0; i < 1800; i++) { g.fillStyle = spk() > .5 ? "#4a7a44" : "#365f32"; g.fillRect(spk() * W, spk() * H, 1.4, 1.4) }
        for (const b of blobs) { const xs = b.map(q => q[0]), ys = b.map(q => q[1]), x0 = Math.min(...xs) + 1, x1 = Math.max(...xs) - 1, y0 = Math.min(...ys), y1 = Math.max(...ys), rp = () => { g.beginPath(); g.roundRect(x0, y0, x1 - x0, y1 - y0, 4) }; rp(); g.fillStyle = "#92cf6b"; g.fill(); g.save(); rp(); g.clip(); for (let yy = y0; yy < y1; yy += 5) { g.fillStyle = ((yy - y0) / 5 | 0) % 2 ? "#86c45f" : "#9bd774"; g.fillRect(x0, yy, x1 - x0, 5) } g.restore(); rp(); g.strokeStyle = "#80bd5a"; g.lineWidth = .6; g.stroke() }
        { g.save(); g.beginPath(); g.rect(-5, 178, 155, 92); g.clip(); g.restore(); g.fillStyle = "#eadfc0"; g.strokeStyle = "#d9c9a0"; g.lineWidth = .6; }
        g.fillStyle = "#eadfc0"; g.strokeStyle = "#d9c9a0"; g.lineWidth = .6; g.beginPath(); g.ellipse(214, 52, 44, 42, 0, 0, 7); g.fill(); g.stroke();
        g.beginPath(); g.ellipse(45, 432, 56, 50, 0, 0, 7); g.fillStyle = "#eadfc0"; g.fill(); g.stroke();
        g.fillStyle = "#92cf6b"; g.strokeStyle = "#80bd5a"; g.beginPath(); g.roundRect(92, 408, 28, 46, 6); g.fill(); g.stroke();
        g.fillStyle = "#2f6f33"; for (const [x, y] of [[99, 416], [113, 416], [99, 446], [113, 446], [106, 431]]) { g.beginPath(); g.arc(x, y, 2.6, 0, 7); g.fill() }
        {
            const gx = garden.x, gw = garden.w; g.save(); g.beginPath(); g.roundRect(gx, 86, gw, 160, [2, 2, 28, 28]); g.clip();
            g.fillStyle = "#eadfc0"; g.fillRect(gx, garden.y, gw, garden.h);
            g.fillStyle = "#dcc9a0"; g.fillRect(gx + 4, 112, gw - 8, 22);
            g.fillStyle = "#c4ad80"; for (let y = 113; y < 134; y += 2.5)g.fillRect(gx + 4, y, gw - 8, .4);
            g.fillStyle = "#e6d8b2"; g.fillRect(gx, 138, gw, 108);
            g.save(); g.beginPath(); g.rect(gx, 138, gw, 108); g.clip(); g.strokeStyle = "#cdbd92"; g.lineWidth = .3; for (let i = -60; i < 60; i += 7) { g.beginPath(); g.moveTo(gx + i + 30, 138); g.lineTo(gx + i + 95, 246); g.stroke() } g.restore();
            g.fillStyle = "#d9ccaa"; g.fillRect(gx, 86, gw, 1.2);
            for (const sx of [gx + 5, gx + gw - 5]) { g.fillStyle = "rgba(0,0,0,.18)"; g.beginPath(); g.ellipse(sx + .8, 93.6, 3.2, 1.6, 0, 0, 7); g.fill(); g.fillStyle = "#3f7d3f"; g.beginPath(); g.arc(sx, 91.5, 3, 0, 7); g.fill(); g.fillStyle = "#5fa04e"; g.beginPath(); g.arc(sx - .8, 90.7, 1.6, 0, 7); g.fill() }
            g.fillStyle = "#5f9a48"; g.beginPath(); g.ellipse(214, 192, 17, 14, 0, 0, 7); g.fill();
            for (let a = 0; a < 12; a++) { g.fillStyle = "#2f6f33"; g.beginPath(); g.arc(214 + Math.cos(a / 12 * 6.283) * 19, 192 + Math.sin(a / 12 * 6.283) * 16, 2.6, 0, 7); g.fill() }
            g.fillStyle = "#7aa83a"; g.beginPath(); g.arc(211, 192, 2, 0, 7); g.moveTo(220, 191); g.arc(218, 191, 2, 0, 7); g.fill(); g.restore(); g.beginPath(); g.roundRect(gx, 86, gw, 160, [2, 2, 28, 28]); g.strokeStyle = "#cdbd92"; g.lineWidth = .6; g.stroke()
        }
        g.fillStyle = "#b9b3a4"; g.fillRect(plaza.x, plaza.y, plaza.w, plaza.h);
        for (let i = 0; i < plaza.w / 6.67; i++)for (let j = 0; j < plaza.h / 6.5; j++) { if ((i + j) % 2) { g.fillStyle = "#8d877a"; g.fillRect(plaza.x + i * 6.67, plaza.y + j * 6.5, 6.67, 6.5) } }
        g.fillStyle = "#b8a27a"; g.beginPath(); g.arc(oct.x, oct.y, oct.r, 0, 7); g.fill(); g.strokeStyle = "#8c7a58"; g.lineWidth = 1.5; g.stroke();
        g.fillStyle = "#cdb88e"; g.beginPath(); g.arc(oct.x, oct.y, oct.r * .5, 0, 7); g.fill();
        mosquePlaza(g);
        g.lineCap = "round"; g.lineJoin = "round";
        for (const r of roads) { g.beginPath(); r.p.forEach((q, i) => i ? g.lineTo(...q) : g.moveTo(...q)); g.strokeStyle = "#4e4e4e"; g.lineWidth = r.w + 2; g.stroke() }
        for (const r of roads) { g.beginPath(); r.p.forEach((q, i) => i ? g.lineTo(...q) : g.moveTo(...q)); g.strokeStyle = "#7a7a7a"; g.lineWidth = r.w; g.stroke() }
        const yr = roads[0]; g.beginPath(); yr.p.forEach((q, i) => i ? g.lineTo(...q) : g.moveTo(...q)); g.setLineDash([5, 5]); g.strokeStyle = "#e8e2a8"; g.lineWidth = .8; g.lineCap = "butt"; g.stroke(); g.setLineDash([]);
        for (const b of blds) { if (b.hid) continue; if (b.x === 8 && b.y === 132) { const X = b.x, Y = b.y, w = b.w, h = b.h; g.fillStyle = "rgba(0,0,0,.3)"; g.fillRect(X + 2, Y + 2, w, h); g.fillStyle = "#d9d9d9"; g.fillRect(X, Y, w, h); g.fillStyle = "#f7f7f7"; g.fillRect(X + 1.5, Y + 1.5, w - 3, h - 8); g.fillStyle = "#0b4ea2"; g.fillRect(X, Y + h - 6.5, w, 3.6); g.fillStyle = "#e3001b"; g.fillRect(X, Y + h - 2.9, w, 1.5); g.fillStyle = "#ffcc00"; g.fillRect(X, Y + h - 1.4, w, 1.4); g.fillStyle = "#c9c9c9"; g.fillRect(X + 6, Y + 5, 7, 5); g.fillRect(X + w - 14, Y + 5, 7, 5); g.fillStyle = "#b5b5b5"; g.fillRect(X + 7, Y + 6, 5, 3); g.fillRect(X + w - 13, Y + 6, 5, 3); g.textAlign = "center"; g.font = "bold 5.2px system-ui"; g.fillStyle = "#0b4ea2"; g.fillText("Indo", X + w / 2 - 6.5, Y + 15); g.fillStyle = "#e3001b"; g.fillText("maret", X + w / 2 + 5.5, Y + 15); g.fillStyle = "#ffcc00"; g.fillRect(X + 8, Y + 17.6, w - 16, .9); continue } g.fillStyle = "rgba(0,0,0,.3)"; g.fillRect(b.x + 2, b.y + 2, b.w, b.h); g.fillStyle = b.c; g.fillRect(b.x, b.y, b.w, b.h); g.fillStyle = b.r; g.fillRect(b.x + 2, b.y + 2, b.w - 4, b.h - 4) }
        evDecor(g); gateSigns(g);
        
        for (const t of trees) treeBase(g, t);
        g.textAlign = "center"; g.font = "bold 4px system-ui"; g.lineWidth = 1.4; g.lineJoin = "round";
        for (const [t, x, y, a] of labels) { g.save(); g.translate(x, y); if (a) g.rotate(a); g.strokeStyle = "rgba(0,0,0,.8)"; g.strokeText(t, 0, 0); g.fillStyle = "#fff"; g.fillText(t, 0, 0); g.restore() }
        for (const t of trees) treeCan(k, t);
        for (const p of pines) treeCan(k, { x: p.x, y: p.y, s: p.h / 3.4, k: 3, v: .5 });
        

        // Game
        const cv = document.getElementById("c"), ctx = cv.getContext("2d"); let cw, ch, Z;
        function rs() { cw = cv.width = innerWidth * devicePixelRatio; ch = cv.height = innerHeight * devicePixelRatio; Z = Math.max(Math.min(cw, ch) / 95, cw / W, ch / MH) }
        addEventListener("resize", rs); rs();
        const keys = {}; addEventListener("keydown", e => { keys[e.key.toLowerCase()] = 1; if (e.key.startsWith("Arrow")) e.preventDefault() }); addEventListener("keyup", e => keys[e.key.toLowerCase()] = 0);
        document.querySelectorAll("#dpad button").forEach(b => { const kk = b.dataset.k.toLowerCase(); b.onpointerdown = () => keys[kk] = 1; b.onpointerup = b.onpointerleave = b.onpointercancel = () => keys[kk] = 0 });
        let qStage = 0, P, got, t0, done, fx = 1, near = -1, dlg = false, talkNpc = null, nearN = null, talkLines = [], talkI = 0, started = false, tyTimer = 0, tyFull = "", afterD = null, mono = false, storyDone = false;
        const MC = { sh: "#3a6fd8", pt: "#2c3352", hr: "#1b1410", sk: "#e9b88c" };
        const ME = "Yupi";

        const MK = { sh: "#c4252b", jas: "#8f1a1f", pt: "#f3f0ee", hr: "#24150f", sk: "#f6d3b3", long: 1 };
        const IMG_SAD = "assets/img_sad.jpg", IMG_HAPPY = "assets/img_happy.jpg", IMG_HOPE = "assets/img_hope.jpg", IMG_ASK = "assets/img_ask.jpg", IMG_PENG = "assets/img_peng.png";
        const SLIDES = [
            { full: 1, bg: "#000", art: '<img src="' + IMG_HOPE + '" class="sl" style="--pp:57% 50%;width:100%;height:100%;object-fit:cover;object-position:50% 60%;display:block;animation:pop .8s both">', cap: "Malam itu, <b>Yupi</b> menunduk dan berdoa di depan laptopnya. Hari ini <b>pengumuman SNBT</b>. Semoga keterima dan lolos <b>Unpad</b>..." },
            { full: 1, bg: "#000", art: '<div style="width:100%;height:100%;background:linear-gradient(160deg,#5a8fb0,#8fbcd0);display:flex;align-items:center;justify-content:center;padding:9% 2% 22%;box-sizing:border-box"><img src="' + IMG_PENG + '" style="width:min(96%,calc(56vh*1.587));height:auto;object-fit:contain;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,.45);animation:pop .8s both"></div>', cap: "Halaman pengumuman terbuka... <b>\"Selamat! Anda dinyatakan lulus seleksi SNBT.\"</b> Yeahhh! Yeayyy! 🎉" },
            { full: 1, bg: "#000", art: '<img src="' + IMG_HAPPY + '" class="sl" style="--pp:57% 50%;width:100%;height:100%;object-fit:cover;object-position:50% 60%;display:block;animation:pop .8s both">', cap: "<b>\"Aku keterii!!\"</b> Yupi melompat kegirangan. Impiannya jadi mahasiswa Unpad akhirnya nyata... <b>TAPI</b>..." },
            { full: 1, bg: "#000", art: '<img src="' + IMG_SAD + '" class="sl" style="--pp:57% 50%;width:100%;height:100%;object-fit:cover;object-position:50% 60%;display:block;animation:shk .6s .4s">', cap: "Yahh... ternyata <b>bukan ke Unpad</b>. Ia lulus di <b>UPI</b>. Dunia Yupi terasa berhenti sebentar." },
            { full: 1, bg: "#000", art: '<img src="' + IMG_ASK + '" class="sl" style="--pp:50% 30%;width:100%;height:100%;object-fit:cover;object-position:50% 8%;display:block;animation:pop .8s both">', cap: "Yahh... jadi harus <b>senang</b> atau <b>sedih</b>? Yupi <b>bingung</b> harus merasa apa..." },
            { bg: "linear-gradient(160deg,#000,#0d0d18)", art: '<div style="text-align:center"><div class="big" style="animation:pop .8s both">📅</div><div style="margin-top:16px;font-size:30px;font-weight:700;letter-spacing:3px;color:#ffd54a;animation:pop 1s .5s both">1 BULAN KEMUDIAN...</div></div>', cap: "Hari berganti. Satu bulan berlalu, dan tibalah <b>hari pertama</b> Yupi di kampus." }
        ];
        let sIdx = -1, sOn = false;
        function showSlide(i) {
            const box = document.getElementById("sbox"), s = SLIDES[i];
            box.innerHTML = s.full ? '<div class="sc full" style="background:#000"><div class="art">' + s.art + '</div><div class="cap">' + s.cap + '</div></div>' : '<div class="sc" style="background:' + s.bg + '"><div class="art" style="background:' + s.bg + '">' + s.art + '</div><div class="cap">' + s.cap + '</div></div>';
            requestAnimationFrame(() => requestAnimationFrame(() => { const e = box.firstChild; if (e) e.classList.add("on") }));
            document.getElementById("sdots").textContent = SLIDES.map((_, k) => k <= i ? "●" : "○").join("");
        }
        function nextSlide() { if (!sOn) return; sIdx++; if (sIdx >= SLIDES.length) return endSlides(); showSlide(sIdx) }
        function endSlides() { sOn = false; document.getElementById("slides").style.display = "none"; beginGame() }
        function startSlides() { document.getElementById("title").style.display = "none"; sOn = true; sIdx = -1; document.getElementById("slides").style.display = "block"; nextSlide() }
        document.getElementById("slides").addEventListener("click", e => { if (e.target.id === "sskip") endSlides(); else nextSlide() });
        window.addEventListener("keydown", e => { if (!sOn) return; e.stopImmediatePropagation(); e.preventDefault(); if (e.key === "Escape") endSlides(); else if (["Enter", " ", "e", "E", "ArrowRight"].includes(e.key)) nextSlide() }, true);
        let M = { x: 0, y: 0, dir: 1, ph: 0, mv: 0 }, guide = false, walkT = 0, walkCb = null, shake = 0, heartT = 0, ending = false;
        let rot = 0, rotT = 0, paused = false, inUp = false;

        const IMG_MIKA = "assets/img_mika.jpg";
        function showCG() { const c = document.getElementById("cg"); document.getElementById("cgi").src = IMG_MIKA; c.style.display = "block"; document.body.classList.add("cgon"); requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add("on"))) }
        function hideCG() { const c = document.getElementById("cg"); c.classList.remove("on"); document.body.classList.remove("cgon"); setTimeout(() => { if (!c.classList.contains("on")) c.style.display = "none" }, 400) }
        const Y = t => ({ n: ME, t }), K = t => ({ n: "Mika", t, pal: MK });
        const introLines = [
            Y("Villa Isola... iya, iya, cantik. Tapi harusnya hari ini aku jalan di Jatinangor, bukan di sini."),
            Y("Padahal tinggal selangkah lagi ke Unpad. Kata orang rezeki nggak akan ke mana-mana, tapi kok rasanya masih belum rela ya..."),
            Y("Senang sih tetap kuliah. Tapi sedih juga. Senang... sedih... senang... sedih... ah, bingung sendiri."),
            Y("(Yupi berjalan sambil melamun, menatap langit kosong...)")
        ];
        const bumpLines = [
            K("Aduuh! Ya ampun, maaf banget! Kamu nggak apa-apa?"),
            Y("A-aku yang minta maaf, Kak! Tadi aku nggak lihat jalan... (Eh...?)"),
            Y("(Rambut panjang, senyum manis, suara selembut itu... Jantungku... kok jadi kencang begini?)"),
            K("Kamu mahasiswa baru, ya? Aku Mika, semester lima. Dari wajahmu kelihatan masih bingung sama kampus."),
            Y("Y-Yupi, Kak. Iya... baru hari pertama. (Ya Allah, cantik banget...)"),
            K("Aku jadi nggak enak sudah ditabrak gini. Tapi... boleh minta tolong? Barangku banyak banget, dan semuanya harus kubawa ke Masjid Al-Furqan."),
            Y("Boleh banget, Kak! Biar aku yang bawakan kardusnya. (Kapan lagi bisa bantu Kak Mika...)"),
            K("Makasih ya, Yupi! Masjidnya ada di sisi barat jalan besar. Ikuti panah kuning di dekatmu, aku jalan di belakangmu!"),
            Y("Siap, Kak! (Mungkin... UPI nggak seburuk yang kukira.).")
        ];
        const reactLines = [
            [K("Ini Villa Isola, atau Gedung Rektorat. Dibangun tahun 1933 sebagai rumah seorang saudagar. Dulu aku juga bengong lama kayak kamu pas pertama lihat."), Y("Ternyata aslinya jauh lebih megah dari foto. (Dan Kak Mika lebih cantik dari semuanya... eh, fokus Yupi!)"), K("Satu tempat beres. Lanjut yuk!")],
            [K("Nah, ini Sekretariat UPM, tempat anak-anak pers mahasiswa berkarya. Kebetulan hari ini lagi ada Kwas!, pameran seni dan cosplay, makanya dekornya heboh begini."), Y("Wih, ada spanduk gede, karpet, sampai stand lukisan dan cosplayer segala! (Kak Mika kelihatan senang lihat keramaian... ikut senang deh.)"), K("UPM jadi media partner-nya. Aku dulu juga sering liputan di sini, lho. Nanti mampir ke stand Lukisan atau Cosplay ya, siapa tahu ketemu karakter favoritmu!"), Y("Siap, Kak! Kalau Kakak ikut, aku pasti ikut... eh, maksudku, penasaran juga sama cosplayernya, hehe.")],
            
            [K("Taman Bareti, tempat favoritku buat nugas dan menenangkan pikiran. Lihat, Isola kelihatan gagah dari sini."), Y("Adem banget... Rasanya beban soal Unpad pelan-pelan ikut hilang."), K("Oh, kamu tadinya ngincar Unpad? Nggak apa-apa. Banyak kok yang awalnya nggak rela, ujungnya malah betah di sini.")],
            [K("Terakhir, Masjid Al-Furqan. Tenang, kan? Aku sering ke sini kalau lagi capek."), Y("Iya, tenang banget. Terima kasih ya, Kak, sudah menemani.")]
        ];
        const endLines = [
            K("Nah, semua tempat sudah kita datangi. Gimana kesan pertamanya soal UPI?"),
            Y("Jujur, Kak, tadi pagi aku masih mikir ini cuma pelarian. Sekarang... aku mulai merasa ini memang tempatku."),
            K("Senang dengarnya. Kampus ini punya cara sendiri bikin orang jatuh cinta kok."),
            Y("(Kalau begitu... aku sudah jatuh cinta duluan sejak ditabrak tadi.)"),
            K("Kenapa senyum-senyum sendiri? Hehe. Ya sudah, aku ada kelas. Kalau bingung, cari aku aja di Taman Bareti ya, Yupi!"),
            Y("Siap, Kak Mika! Terima kasih untuk hari ini. Mimpi Unpad-nya... kayaknya digantikan mimpi baru di UPI.")
        ];
        const questLines = [
            [K("Nah, sampai! Taruh kardusnya di teras masjid ya. Makasih banyak, Yupi, tanganku sampai pegal dari tadi."), Y("Sama-sama, Kak. Berat juga ternyata... isinya apa sih, Kak?"), K("Perlengkapan buat acara sore nanti. Eh, aku baru ingat belum beli minuman dingin buat panitia. Bisa tolong ke Indomaret? Ini uangnya."), Y("Siap, Kak! Aku ke Indomaret dulu. (Ikuti panah kuning...)")],
            [Y("Permisi, Kak. Aku mau beli air mineral dingin, ya."), { n: "Kasir", t: "Siap, Dek! Totalnya Rp48.000. Mau pakai kantong plastik?", pal: { sh: "#e3001b", pt: "#222222", hr: "#1b1410", sk: "#e9b88c" } }, Y("Nggak usah, Kak. Makasih!"), K("Dapat? Cepat juga kamu, Yupi! Sebagai tanda terima kasih, sekarang kuantar keliling kampus. Ada Rektorat, Sekretariat UPM, dan Taman Bareti.")]];
        function isActive(i) { return storyDone && (i === 3 ? qStage === 1 : i === 4 ? qStage === 2 : i < 3 && qStage === 3) }
        function target() { if (!storyDone) return null; if (qStage === 1) return items[3]; if (qStage === 2) return items[4]; if (qStage !== 3) return null; let b = null, bd = 1e9; for (let i = 0; i < 3; i++) if (!got.has(i)) { const d = Math.hypot(P.x - items[i].x, P.y - items[i].y); if (d < bd) { bd = d; b = items[i] } } return b }
        function questText() { const hd = "Bagian 1: <br>"; if (qStage === 1) return hd + "<b>Quest 1:</b> Bantu Mika antar barang ke Masjid Al-Furqan"; if (qStage === 2) return hd + "<b>Quest 2:</b> Beli minuman di Indomaret"; if (qStage === 3) return hd + "Jelajah kampus: " + items.filter((it, i) => i < 3 && !got.has(i)).map(it => it.n).join(", "); return hd }
        const binfo = [["Indomaret", "Minimarket di pinggir jalan kampus, tempat favorit mahasiswa buat beli jajan, minuman dingin, dan kebutuhan harian."], ["Masjid Al-Furqan", "Masjid kampus UPI, pusat kegiatan ibadah dan keagamaan civitas akademika."], ["Gedung Rektorat (Villa Isola)", "Villa Isola dibangun tahun 1933 dan kini menjadi Gedung Rektorat UPI, salah satu ikon kampus."], ["Gedung Rektorat (Villa Isola)", "Villa Isola dibangun tahun 1933 dan kini menjadi Gedung Rektorat UPI, salah satu ikon kampus."], ["Sekretariat UPM (Pameran Seni Kwas!)", "Sekretariat Unit Pers Mahasiswa UPI. Hari ini gedungnya dihias spanduk, karpet, dan stand untuk Kwas!: pameran lukisan, fotografi, kriya, dan ilustrasi, lengkap dengan para cosplayer."]];
        function bdist(b, x, y) { const cx = Math.max(b.x, Math.min(x, b.x + b.w)), cy = Math.max(b.y, Math.min(y, b.y + b.h)); return Math.hypot(x - cx, y - cy) }
        function openD(i) { document.getElementById("dn").textContent = binfo[i][0]; document.getElementById("dp").style.display = "none"; setText(binfo[i][1]); document.getElementById("dlg").style.display = "flex"; document.getElementById("dc").textContent = "Tutup"; dlg = true }
        function closeD() { document.getElementById("dlg").style.display = "none"; dlg = false; talkNpc = null; mono = false; if (afterD) { const f = afterD; afterD = null; f() } }
        function showLine() { const L = talkLines[talkI]; if (typeof L === "object") { document.getElementById("dn").textContent = L.n; drawPortrait(L.pal || MC); setText(L.t) } else { document.getElementById("dn").textContent = talkNpc.n; setText(L) } document.getElementById("dc").textContent = talkI < talkLines.length - 1 ? "Lanjut ▶" : "Tutup" }
        function openTalk(q) { talkNpc = q; talkLines = q.talks[q.talk++ % q.talks.length]; talkI = 0; document.getElementById("dp").style.display = "block"; drawPortrait(q.pal); showLine(); document.getElementById("dlg").style.display = "flex"; dlg = true }
        function setText(s) { clearInterval(tyTimer); tyFull = s; const el = document.getElementById("dd"); let i = 0; el.textContent = ""; tyTimer = setInterval(() => { i += 2; el.textContent = s.slice(0, i); if (i >= s.length) clearInterval(tyTimer) }, 22) }
        function openSeq(lines, cb) { if (!started) return; talkNpc = { n: ME, pal: MC }; talkLines = lines; talkI = 0; mono = true; afterD = cb || null; document.getElementById("dp").style.display = "block"; showLine(); document.getElementById("dlg").style.display = "flex"; dlg = true }
        function startG() { startSlides() }
        function beginGame() { started = true; document.getElementById("hud").classList.remove("off"); document.getElementById("ctl").classList.remove("off"); document.getElementById("dpad").classList.remove("off"); P.dir = 0; M.x = spawn.x + 1; M.y = spawn.y + 17; M.dir = 1; guide = false; openSeq(introLines, () => { walkT = .9; walkCb = () => { shake = .5; heartT = 5; showCG(); openSeq(bumpLines, () => { hideCG(); storyDone = true; guide = true; qStage = 1 }) } }) }
        function drawPortrait(pal) {
            const c = document.getElementById("dp").getContext("2d"); c.clearRect(0, 0, 360, 420); const SK = pal.sk || "#e9b88c", SH = pal.sh || "#3a6fd8", HR = pal.hr || "#1b1410";
            if (pal.long) { c.fillStyle = HR; c.beginPath(); c.roundRect(76, 70, 208, 340, 64); c.fill() }
            c.fillStyle = SH; c.beginPath(); c.moveTo(20, 420); c.quadraticCurveTo(30, 330, 110, 305); c.lineTo(250, 305); c.quadraticCurveTo(330, 330, 340, 420); c.closePath(); c.fill();
            c.fillStyle = SK; c.fillRect(150, 255, 60, 66); c.fillStyle = "rgba(0,0,0,.14)"; c.fillRect(150, 255, 60, 24);
            c.fillStyle = "rgba(255,255,255,.88)"; c.beginPath(); c.moveTo(138, 305); c.lineTo(180, 348); c.lineTo(222, 305); c.closePath(); c.fill();
            c.fillStyle = SK; c.beginPath(); c.ellipse(180, 175, 82, 98, 0, 0, 7); c.ellipse(98, 187, 12, 20, 0, 0, 7); c.ellipse(262, 187, 12, 20, 0, 0, 7); c.fill();
            c.fillStyle = HR; c.beginPath(); c.moveTo(92, 165); c.bezierCurveTo(70, 28, 290, 28, 268, 165); c.quadraticCurveTo(255, 112, 215, 106); c.quadraticCurveTo(180, 126, 140, 106); c.quadraticCurveTo(105, 114, 92, 165); c.fill();
            c.fillStyle = "#fff"; c.beginPath(); c.ellipse(145, 188, 16, 10, 0, 0, 7); c.ellipse(215, 188, 16, 10, 0, 0, 7); c.fill();
            c.fillStyle = "#222"; c.beginPath(); c.arc(147, 188, 6.5, 0, 7); c.arc(213, 188, 6.5, 0, 7); c.fill();
            c.strokeStyle = HR; c.lineWidth = 6; c.lineCap = "round"; c.beginPath(); c.moveTo(124, 164); c.lineTo(164, 159); c.moveTo(196, 159); c.lineTo(236, 164); c.stroke();
            c.strokeStyle = "rgba(0,0,0,.2)"; c.lineWidth = 3; c.beginPath(); c.moveTo(180, 196); c.lineTo(176, 218); c.lineTo(184, 218); c.stroke();
            c.strokeStyle = "#8a4a3a"; c.lineWidth = 4; c.beginPath(); c.arc(180, 232, 22, .25, Math.PI - .25); c.stroke();
            c.fillStyle = "rgba(255,110,110,.22)"; c.beginPath(); c.arc(122, 218, 14, 0, 7); c.arc(238, 218, 14, 0, 7); c.fill()
        }
        function doAct() { if (paused) return; if (!started) { startG(); return } if (dlg) { const el = document.getElementById("dd"); if (el.textContent.length < tyFull.length) { clearInterval(tyTimer); el.textContent = tyFull; return } if (talkNpc) { talkI++; if (talkI >= talkLines.length) closeD(); else showLine() } else closeD() } else if (nearN) openTalk(nearN); else if (near >= 0) openD(near) }
        addEventListener("keydown", e => { const k = e.key.toLowerCase(); if (k === "e" || k === "enter") doAct() });
        document.getElementById("act").onclick = doAct; document.getElementById("dlg").onclick = doAct; document.getElementById("play").onclick = startG;
        function reset() { P = { x: spawn.x, y: spawn.y, a: 1.57, dir: 0, ph: 0, ch: 0 }; ending = false; guide = storyDone; qStage = storyDone ? 1 : 0; M.x = spawn.x - 6; M.y = spawn.y + 2; walkT = 0; shake = 0; heartT = 0; got = new Set(); t0 = 0; done = false; document.getElementById("win").style.display = "none" }
        document.getElementById("rs").onclick = reset; reset();
        function blocked(x, y) {
            const r = 3; if (x < r || y < r || x > W - r || y > MH - r) return 1;

            for (const b of blds) { const cx = Math.max(b.x, Math.min(x, b.x + b.w)), cy = Math.max(b.y, Math.min(y, b.y + b.h)); if (Math.hypot(x - cx, y - cy) < r) return 1 }
            for (const s of evStands) { const cx = Math.max(s[0], Math.min(x, s[0] + s[2])), cy = Math.max(s[1], Math.min(y, s[1] + s[3])); if (Math.hypot(x - cx, y - cy) < 2.5) return 1 }
            return 0
        }
        function rr(c, x, y, w, h, col, r) { c.fillStyle = col; c.beginPath(); c.roundRect(x, y, w, h, r || .4); c.fill() }
        function arm(c, px, py, ang, len, SH, SK) { c.save(); c.translate(px, py); c.rotate(ang); rr(c, -.6, 0, 1.2, 1.7, SH); rr(c, -.5, 1.6, 1, len - 1.6, SK, .5); c.restore() }
        function sdir(d) { if (!rot) return d; const v = [[0, 1], [0, -1], [-1, 0], [1, 0]][d] || [0, 1], co = Math.cos(rot), si = Math.sin(rot), x = v[0] * co - v[1] * si, y = v[0] * si + v[1] * co; return Math.abs(x) > Math.abs(y) ? (x > 0 ? 3 : 2) : (y > 0 ? 0 : 1) }
        function drawBoy(c, x, y, dir, st, ph, pal) {
            if (!rot || inUp) { drawBoy0(c, x, y, sdir(dir), st, ph, pal); return }
            c.save(); c.translate(x, y); c.rotate(-rot); c.translate(-x, -y); drawBoy0(c, x, y, sdir(dir), st, ph, pal); c.restore()
        }
        function drawBoy0(c, x, y, dir, st, ph, pal) {
            const SK = (pal && pal.sk) || "#e9b88c", SH = (pal && pal.sh) || "#3a6fd8", PT = (pal && pal.skirt) ? (pal.lg || SK) : ((pal && pal.pt) || "#2c3352"), HR = (pal && pal.hr) || "#1b1410", SO = "#f4f4f4";
            const run = st === "run", wk = st === "walk" || run, ch = st === "cheer", wv = st === "wave";
            const sw = wk ? Math.sin(ph) * (run ? 1.6 : 1.1) : 0;
            const bob = wk ? Math.abs(Math.cos(ph)) * (run ? .7 : .4) : Math.sin(ph) * .1;
            const jmp = ch ? Math.abs(Math.sin(ph)) * 2.6 : 0;
            c.fillStyle = "rgba(0,0,0,.3)"; c.beginPath(); c.ellipse(x, y + .3, 2.8 - jmp * .25, 1.2, 0, 0, 7); c.fill();
            c.save(); c.translate(x, y - jmp - bob);
            const bl = (performance.now() % 3200) < 130;
            if (dir < 2) {
                const L = Math.max(0, sw) * 1.4, R = Math.max(0, -sw) * 1.4;
                rr(c, -1.9, -3, 1.6, 3 - L, PT); rr(c, -2, -L - .9, 1.8, .9, SO, .4);
                rr(c, .3, -3, 1.6, 3 - R, PT); rr(c, .2, -R - .9, 1.8, .9, SO, .4);
                rr(c, -2.4, -6.9, 4.8, 4, SH, 1); rr(c, -2.4, -3.6, 4.8, .8, (pal && pal.jas) || "#2c52a8", .4); if (pal && pal.jas && dir === 0) { c.fillStyle = "#fff"; c.beginPath(); c.moveTo(-.9, -6.9); c.lineTo(.9, -6.9); c.lineTo(0, -5.1); c.closePath(); c.fill(); c.fillStyle = "#5a0f13"; c.fillRect(-.15, -4.8, .3, .3); c.fillRect(-.15, -4.1, .3, .3) }
                const aL = ch ? 2.7 + Math.sin(ph * 2) * .3 : .12 - sw * .12, aR = ch ? -2.7 - Math.sin(ph * 2) * .3 : wv ? -2.6 + Math.sin(ph * 2.2) * .45 : -.12 + sw * .12;
                if (pal && pal.skirt) { c.fillStyle = pal.skirt; c.beginPath(); c.moveTo(-2.4, -3.9); c.lineTo(2.4, -3.9); c.lineTo(3.1, -1.1); c.lineTo(-3.1, -1.1); c.closePath(); c.fill() }
                arm(c, -2.5, -6.4, aL, 3.2, SH, SK); arm(c, 2.5, -6.4, aR, 3.2, SH, SK);
                c.fillStyle = SK; c.beginPath(); c.arc(0, -8.9, 2.2, 0, 7); c.fill();
                if (dir === 0) {
                    c.fillStyle = HR; c.beginPath(); c.arc(0, -9.3, 2.35, Math.PI, 0); c.fill(); rr(c, -2.3, -9.4, 4.6, .9, HR, .4); if (pal && pal.long) { rr(c, -2.5, -9.2, .9, 3.6, HR, .4); rr(c, 1.6, -9.2, .9, 3.6, HR, .4) }
                    if (!bl) { c.fillStyle = "#222"; c.beginPath(); c.arc(-.9, -8.6, .3, 0, 7); c.arc(.9, -8.6, .3, 0, 7); c.fill() } else { rr(c, -1.2, -8.65, .6, .12, "#222"); rr(c, .6, -8.65, .6, .12, "#222") }
                    c.strokeStyle = "#a0522d"; c.lineWidth = .2; c.beginPath(); c.arc(0, -7.9, .6, .2, Math.PI - .2); c.stroke()
                }
                else { c.fillStyle = HR; c.beginPath(); c.arc(0, -9, 2.35, 0, 7); c.fill(); if (pal && pal.long) rr(c, -2.35, -9, 4.7, 3.8, HR, .8) }
            } else {
                if (dir === 2) c.scale(-1, 1);
                const a1 = sw * .5;
                c.save(); c.translate(0, -3); c.rotate(-a1); rr(c, -.7, 0, 1.4, 2.1, PT); rr(c, -.7, 2.1, 1.9, .9, "#d0d0d0", .4); c.restore();
                arm(c, 0, -6.4, ch ? 2.7 : wv ? .2 : a1 * 1.2, 3.2, SH, SK);
                c.save(); c.translate(0, -3); c.rotate(a1); rr(c, -.7, 0, 1.4, 2.1, PT); rr(c, -.7, 2.1, 1.9, .9, SO, .4); c.restore();
                rr(c, -1.8, -6.9, 3.6, 4, SH, 1);
                if (pal && pal.skirt) { c.fillStyle = pal.skirt; c.beginPath(); c.moveTo(-1.9, -3.9); c.lineTo(1.9, -3.9); c.lineTo(2.6, -1.1); c.lineTo(-2.6, -1.1); c.closePath(); c.fill() }
                arm(c, 0, -6.4, ch ? -2.7 : wv ? -2.4 + Math.sin(ph * 2.2) * .45 : -a1 * 1.2, 3.2, SH, SK);
                c.fillStyle = HR; c.beginPath(); c.arc(-.4, -9.1, 2.4, 0, 7); c.fill(); if (pal && pal.long) rr(c, -2.7, -9.2, 1.9, 3.8, HR, .8);
                c.fillStyle = SK; c.beginPath(); c.arc(.5, -8.7, 2, 0, 7); c.fill();
                c.fillStyle = HR; c.beginPath(); c.arc(.3, -9.6, 2.1, Math.PI * 1.05, Math.PI * 1.95); c.fill();
                c.fillStyle = "#d9a47a"; c.beginPath(); c.arc(-.4, -8.5, .6, 0, 7); c.fill();
                if (!bl) { c.fillStyle = "#222"; c.beginPath(); c.arc(1.5, -8.7, .3, 0, 7); c.fill() } else rr(c, 1.2, -8.75, .6, .12, "#222");
            }
            c.restore()
        }
        const npcs = [
            { n: "Pak Satpam", x: 148, y: 170, dir: 3, wr: 0, pal: { sh: "#2b3a67", pt: "#1f2a4a", hr: "#141010" }, talks: [["Selamat datang di kampus UPI! Gedung besar di depan itu Villa Isola, sekarang jadi Gedung Rektorat.", "Kalau mau ke Taman Bareti, jalan saja lurus ke selatan dari sini."], ["Jangan lupa jaga kebersihan taman ya.", "Tekan Shift kalau mau lari, tapi hati-hati jangan menabrak orang."]] },
            { n: "Rina", x: 190, y: 216, dir: 0, wr: 7, pal: { sh: "#d6477a", pt: "#3b3b5c", hr: "#2a1a14", long: 1 }, talks: [["Taman ini adem banget buat nugas. Sore-sore banyak yang duduk di sini.", "Kamu lagi cari apa? Biasanya anak baru muter-muter dulu."], ["Masjid Al-Furqan ada di sebelah barat jalan besar, ke arah barat daya dari sini."]] },
            { n: "Pak Dedi", x: 120, y: 305, dir: 2, wr: 6, pal: { sh: "#8a6a3d", pt: "#2a2a2a", hr: "#3a3a3a", sk: "#d99b6c" }, talks: [["Kuliah pagi sudah selesai? Masjid Al-Furqan ada di sebelah kiri jalan ini."], ["Mahasiswa yang rajin itu yang mau keliling kampus begini. Bagus!"]] },
            { n: "Pak Kebun", x: 168, y: 115, dir: 1, wr: 6, pal: { sh: "#6b8f3a", pt: "#4a3b2a", hr: "#2a2a2a", sk: "#b9784a" }, talks: [["Rumputnya baru saya rapikan. Jangan diinjak lama-lama, nanti botak."], ["Pohon di kampus ini macam-macam: ada palem, cemara, sampai pohon berbunga."]] },
            { n: "Bu Warung", x: 106, y: 440, dir: 0, wr: 4, pal: { sh: "#c0392b", pt: "#5a3b5a", hr: "#1b1410", long: 1, sk: "#d99b6c" }, talks: [["Gorengan, bakso, es teh! Mau beli apa, Dek?", "Eh, belum ada fitur beli ya. Nanti ya, kalau gamenya sudah diupdate."], ["Habis kuliah biasanya ramai di sini."]] },
            { n: "Fikri", x: 104, y: 352, dir: 2, wr: 8, pal: { sh: "#ffffff", pt: "#2a3a2a", hr: "#1b1410", sk: "#f2c9a0" }, talks: [["Habis Dzuhur masjid ramai banget. Aku biasa mengaji dulu di teras."], ["Kamu sudah ke Masjid Al-Furqan? Titik misinya ada di halaman depan masjid."]] },
            { n: "windah", x: 140, y: 150, dir: 0, wr: 8, pal: { sh: "#e08a1e", pt: "#2c3352", hr: "#1b1410" }, talks: [["Aku lagi cari kelas. Kamu tahu gedung FIP di mana?", "Hehe, sama, aku juga nyasar."], ["Jalan ini selalu rame kalau jam masuk kuliah."]] },
            { n: "Sari", x: 60, y: 176, dir: 0, wr: 7, pal: { sh: "#7a5bd6", pt: "#2c3352", hr: "#2a1a14", long: 1, sk: "#f2c9a0" }, talks: [["Halo! Kamu mahasiswa baru? Kampus ini luas banget, ya.", "Coba kunjungi empat tempat: Rektorat, Sekretariat UPM, Taman Bareti, dan Masjid Al-Furqan."], ["Semangat keliling kampusnya!"]] },
            { n: "Mas Ojek", x: 250, y: 428, dir: 2, wr: 6, pal: { sh: "#2e8b57", pt: "#222222", hr: "#141010", sk: "#b9784a" }, talks: [["Ojek kampus! Mau ke mana? Bercanda, jalan kaki saja, sehat."], ["Di sekitar bundaran ini enak buat istirahat sebentar."]] },
            { n: "Bu Tini", x: 100, y: 378, dir: 3, wr: 8, pal: { sh: "#e6a100", pt: "#3a3a3a", hr: "#2a2a2a", long: 1, sk: "#d99b6c" }, talks: [["Tolong buang sampah pada tempatnya ya, Dek."], ["Kampus bersih, belajar jadi nyaman."]] },
            { n: "Raka", x: 22, y: 247, dir: 0, wr: 6, pal: { sh: "#1f1f1f", pt: "#2c52a8", hr: "#3b2a1a" }, talks: [["Aku ketua UKM fotografi. Gedung Isola bagus banget buat difoto pagi hari.", "Tapi hari ini aku lagi kepincut acara seni Kwas! di Sekretariat UPM. Cosplayernya fotogenik banget!"], ["Kalau mau foto bagus, cari sudut dari depan kolam."]] },
            { n: "Pengunjung", x: 230, y: 262, dir: 0, wr: 6, pal: { sh: "#f4e04d", pt: "#4a6a8a", hr: "#5a3a1a", sk: "#f2c9a0" }, talks: [["Wah, Isola keren ya! Dulu katanya vila, sekarang kampus."], ["Aku ke sini cuma mau foto-foto, kampusnya cantik."]] },
            { n: "Kak Rani (Panitia Kwas!)", x: 117, y: 254, dir: 2, wr: 3, pal: { sh: "#3c87fe", pt: "#1d3f8f", hr: "#2a1a14", long: 1, sk: "#f2c9a0" }, talks: [["Selamat datang di Kwas!, pameran seni dan cosplay di Sekretariat UPM! Ada lukisan, fotografi, kriya, ilustrasi, dan cosplayer.", "Gratis buat mahasiswa UPI, lho. Tinggal mampir ke stand-stand di sebelah barat."], ["Jangan lupa foto di bawah spanduk biru itu, lalu tag akun kami ya!"]] },
            { n: "Kak Dito (Panitia)", x: 36, y: 233, dir: 0, wr: 5, pal: { sh: "#3c87fe", pt: "#2c3352", hr: "#1b1410" }, talks: [["Di stand Ilustrasi, pengunjung boleh minta digambarkan karikatur. Antreannya penuh terus.", "Kalau mau lihat cosplay, cari stand Cosplay di tengah atau tanya langsung ke orangnya."], ["Pengunjung paling aktif dapat merch eksklusif Kwas! Hadiah utamanya poster bertanda tangan."]] },
            { n: "Bima (Pengunjung)", x: 62, y: 236, dir: 3, wr: 5, pal: { sh: "#c62828", pt: "#222222", hr: "#1b1410", sk: "#f2c9a0" }, talks: [["Wah, lukisannya detail banget! Aku sampai lama berdiri di depan stand Lukisan.", "Tadi aku juga foto bareng cosplayer. Kostumnya keren parah."], ["Kampus jadi rame gara-gara acara ini. Biasanya Sekretariat UPM sepi."]] },
            { n: "Kak Sakura (Cosplayer)", x: 44, y: 252, dir: 0, wr: 4, pal: { sh: "#fff0f6", skirt: "#e0457b", hr: "#ff8fc0", long: 1, sk: "#f6d3b8" }, talks: [["Hai! Aku cosplay jadi karakter penyihir favoritku. Bikin kostumnya makan waktu dua bulan, lho.", "Boleh foto bareng, asal jangan tarik wignya ya, hehe."], ["Kalau mau tahu cara bikin kostum, mampir ke stand Kriya."]] },
            { n: "Kak Rei (Cosplayer)", x: 77, y: 254, dir: 2, wr: 4, pal: { sh: "#1c2a6b", pt: "#f2f2f2", hr: "#7ad7ff", sk: "#f2c9a0" }, talks: [["Aku cosplay jadi pendekar es. Panas banget pakai kostum begini, tapi worth it.", "Pose terbaikku? Berdiri tegap sambil memasang wajah dingin."], ["Besok aku ikut lomba cosplay di Bandung. Doakan menang ya!"]] },
            { n: "Aisyah", x: 52.5, y: 346, dir: 1, wr: 0, pal: { sh: "#ffffff", skirt: "#111111", hr: "#1b1410", long: 1, sk: "#f2c9a0" }, talks: [["Antre dulu ya, Dek. Pintu depan ini khusus akhwat, yang ikhwan lewat pintu samping.", "Aku mau shalat Dzuhur berjamaah. Lumayan panjang antriannya hari ini."]] },
            { n: "Salma", x: 52.5, y: 353, dir: 1, wr: 0, pal: { sh: "#ffffff", skirt: "#111111", hr: "#2a1a14", long: 1, sk: "#e9b88c" }, talks: [["Kalau kamu laki-laki, antrenya di pintu samping sebelah kanan ya.", "Masjid Al-Furqan memang selalu ramai pas jam Dzuhur."]] },
            { n: "Nabila", x: 52.5, y: 360, dir: 1, wr: 0, pal: { sh: "#ffffff", skirt: "#111111", hr: "#1b1410", long: 1, sk: "#d99b6c" }, talks: [["Sabar, sebentar lagi giliran kita masuk.", "Habis ini aku mau lanjut ke kelas Pak Dedi."]] },
            { n: "Zahra", x: 52.5, y: 367, dir: 1, wr: 0, pal: { sh: "#ffffff", skirt: "#111111", hr: "#3b2a1a", long: 1, sk: "#f2c9a0" }, talks: [["Barisan akhwat di sini. Tolong jangan menyelak ya, Kak.", "Bukan galak, cuma biar tertib, hehe."]] },
            { n: "Rizky", x: 107, y: 324, dir: 2, wr: 0, pal: { sh: "#ffffff", pt: "#111111", hr: "#1b1410", sk: "#e9b88c" }, talks: [["Pintu samping ini khusus ikhwan. Yang akhwat lewat pintu depan ya.", "Antre di sini, jangan menyelak, hehe."]] },
            { n: "Fajar", x: 113, y: 324, dir: 2, wr: 0, pal: { sh: "#ffffff", pt: "#111111", hr: "#141010", sk: "#d99b6c" }, talks: [["Biasanya aku datang lebih awal biar nggak antre panjang begini.", "Tapi hari ini kelasnya molor, jadi telat deh."]] },
            { n: "Hafiz", x: 119, y: 324, dir: 2, wr: 0, pal: { sh: "#ffffff", pt: "#111111", hr: "#2a1a14", sk: "#f2c9a0" }, talks: [["Tolong jaga jarak antrean ya, biar tertib masuknya.", "Imam hari ini katanya suaranya merdu banget."]] },
            { n: "Irfan", x: 125, y: 324, dir: 2, wr: 0, pal: { sh: "#ffffff", pt: "#111111", hr: "#1b1410", sk: "#b9784a" }, talks: [["Aku paling belakang. Kalau mau antre, ikut di belakangku ya.", "Santai saja, pasti kebagian tempat kok."]] },
        ].filter(o => o.n !== "Bu Warung" && o.n !== "Mas Ojek").map(o => ({ ...o, hx: o.x, hy: o.y, tx: o.x, ty: o.y, wt: Math.random() * 3, talk: 0, mv: 0, ph: Math.random() * 6 }));
        function nb(x, y) { return npcs.some(q => Math.hypot(q.x - x, q.y - y) < 5) }
        function updNpc(dt) {
            for (const q of npcs) {
                const d = Math.hypot(P.x - q.x, P.y - q.y);
                if (q === talkNpc || d < 12) { q.mv = 0; if (d < 16) q.dir = Math.abs(P.x - q.x) > Math.abs(P.y - q.y) ? (P.x > q.x ? 3 : 2) : (P.y > q.y ? 0 : 1) }
                else {
                    q.wt -= dt; if (q.wt <= 0) { q.wt = 2 + Math.random() * 4; if (q.wr && Math.random() < .55) { q.tx = q.hx + (Math.random() - .5) * q.wr * 2; q.ty = q.hy + (Math.random() - .5) * q.wr * 2 } else { q.tx = q.x; q.ty = q.y } }
                    const ex = q.tx - q.x, ey = q.ty - q.y, l = Math.hypot(ex, ey);
                    if (l > .8) { const mx = ex / l * 14 * dt, my = ey / l * 14 * dt; let ok = 0; q.mv = 1; q.dir = Math.abs(ex) > Math.abs(ey) ? (ex > 0 ? 3 : 2) : (ey > 0 ? 0 : 1); if (!blocked(q.x + mx, q.y)) { q.x += mx; ok = 1 } if (!blocked(q.x, q.y + my)) { q.y += my; ok = 1 } if (!ok) { q.tx = q.x; q.ty = q.y } } else q.mv = 0
                }
                q.ph += dt * (q.mv ? 9 : 2)
            }
        }
        function drawNpc(q) {
            if (!rot) { drawNpc0(q); return }
            ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(-rot); ctx.translate(-q.x, -q.y); inUp = true; drawNpc0(q); inUp = false; ctx.restore()
        }
        function drawNpc0(q) {
            drawBoy(ctx, q.x, q.y + 2.2, q.dir, q.mv ? "walk" : "idle", q.ph, q.pal); const d = Math.hypot(P.x - q.x, P.y - q.y);
            if (d < 22) { ctx.font = "bold 3px system-ui"; ctx.textAlign = "center"; ctx.lineWidth = .8; ctx.strokeStyle = "rgba(0,0,0,.8)"; ctx.strokeText(q.n, q.x, q.y - 12.5); ctx.fillStyle = "#fff"; ctx.fillText(q.n, q.x, q.y - 12.5) }
            if (q === nearN && !dlg) { const b = Math.sin(performance.now() / 180) * .6; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(q.x, q.y - 17 + b, 2.3, 0, 7); ctx.fill(); ctx.fillStyle = "#333"; ctx.font = "bold 3.4px system-ui"; ctx.textAlign = "center"; ctx.fillText("...", q.x, q.y - 16 + b) }
        }
        let last = performance.now();
        function dlg0() { return dlg }
        let isoC = null;
        function buildIso() {
            const w = iso.naturalWidth, h = iso.naturalHeight, T = 60, c = document.createElement("canvas"); c.width = w; c.height = h + T; const x = c.getContext("2d");
            x.save(); x.beginPath(); const pts = [[345, 0], [655, 0], [670, 60], [865, 100], [875, 215], [960, 245], [965, 520], [950, 590], [790, 610], [765, 640], [738, 690], [705, 735], [295, 735], [262, 690], [235, 640], [210, 610], [55, 590], [40, 500], [40, 250], [130, 215], [135, 110], [330, 70]];
            pts.forEach((q, i) => i ? x.lineTo(q[0], q[1] + T) : x.moveTo(q[0], q[1] + T)); x.closePath(); x.clip(); x.drawImage(iso, 0, T); x.restore();
            const t = document.createElement("canvas"); t.width = w; t.height = h; const tx = t.getContext("2d"); tx.drawImage(iso, 0, 0); let rc = "#eadfc3"; try { const px = tx.getImageData(500, 24, 1, 1).data; rc = "rgb(" + px[0] + "," + px[1] + "," + px[2] + ")"; } catch (e) { }
            x.fillStyle = rc; x.strokeStyle = "#a89f88"; x.lineWidth = 4; x.beginPath(); x.moveTo(352, T + 4); x.lineTo(352, 66); x.quadraticCurveTo(352, 8, 430, 4); x.lineTo(570, 4); x.quadraticCurveTo(648, 8, 648, 66); x.lineTo(648, T + 4); x.closePath(); x.fill(); x.stroke();
            x.fillStyle = rc; x.fillRect(354, T - 2, 292, 10);
            isoC = c
        }
        function loop(n) {
            const rawd = n - last, dt = paused ? 0 : Math.min(.05, rawd / 1000); last = n; if (paused && t0) t0 += rawd;
            if (Math.abs(rotT - rot) > .002) rot += (rotT - rot) * (1 - Math.exp(-rawd / 1000 * 12)); else rot = rotT;
            let dx = (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0), dy = (keys.s || keys.arrowdown ? 1 : 0) - (keys.w || keys.arrowup ? 1 : 0);
            { const co = Math.cos(rot), si = Math.sin(rot), a0 = dx, b0 = dy; dx = a0 * co + b0 * si; dy = -a0 * si + b0 * co; if (Math.abs(dx) < 1e-9) dx = 0; if (Math.abs(dy) < 1e-9) dy = 0 }
            let mv = 0; const rn = !!keys.shift; const autoW = walkT > 0; if (walkT > 0) { walkT -= dt; P.y += 14 * dt; P.dir = 0; P.a = 1.57; mv = 1; if (walkT <= 0) { const f = walkCb; walkCb = null; if (f) f() } } if ((dx || dy) && !done && !dlg && started && !autoW) {
                mv = 1; if (!t0) t0 = n; const l = Math.hypot(dx, dy), sp = 42 * (rn ? 1.6 : 1); dx = dx / l * sp * dt; dy = dy / l * sp * dt; P.a = Math.atan2(dy, dx); P.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 3 : 2) : (dy > 0 ? 0 : 1);
                if (!blocked(P.x + dx, P.y) && !nb(P.x + dx, P.y)) P.x += dx; if (!blocked(P.x, P.y + dy) && !nb(P.x, P.y + dy)) P.y += dy
            }
            for (let i = 0; i < items.length; i++)if (!got.has(i) && isActive(i) && Math.hypot(P.x - items[i].x, P.y - items[i].y) < 7) { got.add(i); P.ch = .9; P.ph = 0; if (i === 3) qStage = 2; else if (i === 4) qStage = 3; const rl = i === 3 ? questLines[0] : i === 4 ? questLines[1] : reactLines[i]; const show = () => { if (dlg) setTimeout(show, 400); else openSeq(rl) }; setTimeout(show, 650) }
            M.mv = 0; if (guide && !dlg0()) { const md = Math.hypot(P.x - M.x, P.y - M.y); if (md > 40) { M.x = P.x - 6; M.y = P.y } else if (md > 9) { const ux = (P.x - M.x) / md, uy = (P.y - M.y) / md, sp = 40 * (md > 18 ? 1.5 : 1) * dt; if (!blocked(M.x + ux * sp, M.y)) M.x += ux * sp; if (!blocked(M.x, M.y + uy * sp)) M.y += uy * sp; M.mv = 1; M.dir = Math.abs(ux) > Math.abs(uy) ? (ux > 0 ? 3 : 2) : (uy > 0 ? 0 : 1) } else M.dir = Math.abs(P.x - M.x) > Math.abs(P.y - M.y) ? (P.x > M.x ? 3 : 2) : (P.y > M.y ? 0 : 1) } M.ph += dt * (M.mv ? 11 : 2.2);
            near = -1; let bd = 4.6; blds.forEach((b, i) => { const d = bdist(b, P.x, P.y); if (d < bd) { bd = d; near = i } });
            updNpc(dt); nearN = null; let nd = 9; for (const q of npcs) { const d = Math.hypot(P.x - q.x, P.y - q.y); if (d < nd) { nd = d; nearN = q } }
            const ab = document.getElementById("act"); ab.style.display = (nearN || near >= 0) && !dlg && !done && started ? "block" : "none"; if (nearN) ab.textContent = "Tekan E / ketuk: Bicara dengan " + nearN.n; else if (near >= 0) ab.textContent = "Tekan E / ketuk: " + binfo[near][0];
            if (!done && !ending && got.size === items.length && !dlg && !P.ch) { ending = true; const s = ((n - t0) / 1000).toFixed(1); setTimeout(() => { openSeq(endLines, () => { done = true; document.getElementById("wt").textContent = "Hari pertama " + ME + " di UPI berakhir indah. Gagal ke Unpad memang pahit, tapi di Villa Isola ia bertemu kakak senior bernama Mika, dan kisah barunya baru dimulai. Semua lokasi ditemukan dalam " + s + " detik. Bersambung... 💕"; document.getElementById("win").style.display = "flex" }) }, 300) }
            const vw = cw / Z, vh = ch / Z, aco = Math.abs(Math.cos(rot)), asi = Math.abs(Math.sin(rot)), bx = aco * vw / 2 + asi * vh / 2, by = asi * vw / 2 + aco * vh / 2;
            const mcx = bx * 2 >= W ? W / 2 : Math.max(bx, Math.min(W - bx, P.x)), mcy = by * 2 >= MH ? MH / 2 : Math.max(by, Math.min(MH - by, P.y));
            ctx.fillStyle = "#1b2a1a"; ctx.fillRect(0, 0, cw, ch);
            ctx.save(); ctx.translate(cw / 2, ch / 2); ctx.rotate(rot); ctx.scale(Z, Z); ctx.translate(-mcx, -mcy);
            ctx.drawImage(base, 0, 0, W, H);
            ctx.save(); if (shake > 0) { shake -= dt; ctx.translate((Math.random() - .5) * 2.5, (Math.random() - .5) * 2.5) }
            if (!isoC && iso.complete && iso.naturalWidth) buildIso();
            if (isoC) { ctx.imageSmoothingQuality = "high"; ctx.drawImage(isoC, 182.4, 38 - 60 * .0634, 63.4, isoC.height * .0634) }
            if (mosq.complete && mosq.naturalWidth) { ctx.imageSmoothingQuality = "high"; ctx.drawImage(mosq, 19.0, 269.71, 86, 72.29) }
            evAnim(ctx, n);
            const pu = 1 + .15 * Math.sin(n / 200);
            items.forEach((it, i) => { if (got.has(i) || !isActive(i)) return; ctx.fillStyle = "rgba(255,213,74,.35)"; ctx.beginPath(); ctx.arc(it.x, it.y, 6 * pu, 0, 7); ctx.fill(); ctx.fillStyle = "#ffd54a"; ctx.strokeStyle = "#7a5a00"; ctx.lineWidth = .6; ctx.beginPath(); ctx.arc(it.x, it.y, 2.6, 0, 7); ctx.fill(); ctx.stroke() });
            P.ch = Math.max(0, (P.ch || 0) - dt); const st = P.ch > 0 || done ? "cheer" : dlg && !mono ? "wave" : mv ? (rn ? "run" : "walk") : "idle"; P.ph += dt * ({ cheer: 10, wave: 6, run: 16, walk: 11, idle: 2.2 }[st]); for (const q of npcs) if (q.y < P.y) drawNpc(q); const mb = started && M.y < P.y; if (mb) drawBoy(ctx, M.x, M.y + 2.2, M.dir, M.mv ? "walk" : "idle", M.ph, MK); drawBoy(ctx, P.x, P.y + 2.2, P.dir, st, P.ph); if (started && !mb) drawBoy(ctx, M.x, M.y + 2.2, M.dir, M.mv ? "walk" : "idle", M.ph, MK); for (const q of npcs) if (q.y >= P.y) drawNpc(q);
            { const tg = target(); if (tg && !dlg && started && walkT <= 0) { const dxx = tg.x - P.x, dyy = tg.y - P.y, dd = Math.hypot(dxx, dyy); if (dd > 14) { const an = Math.atan2(dyy, dxx), R = 17 + Math.sin(n / 250) * 1.2, ax = P.x + Math.cos(an) * R, ay = P.y - 5 + Math.sin(an) * R; ctx.save(); ctx.translate(ax, ay); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(4.5, 0); ctx.lineTo(-2.5, -3.4); ctx.lineTo(-.8, 0); ctx.lineTo(-2.5, 3.4); ctx.closePath(); ctx.fillStyle = "#ffd54a"; ctx.fill(); ctx.strokeStyle = "#7a5a00"; ctx.lineWidth = .6; ctx.stroke(); ctx.restore() } } if (qStage === 1 && storyDone && !dlg) { ctx.font = "5px sans-serif"; ctx.textAlign = "center"; ctx.save(); ctx.translate(P.x, P.y); ctx.rotate(-rot); ctx.translate(-P.x, -P.y); ctx.fillText("📦", P.x, P.y - 10.5); ctx.restore() } }
            if (heartT > 0) { heartT -= dt; ctx.font = "7px sans-serif"; ctx.textAlign = "center"; ctx.globalAlpha = Math.min(1, heartT); ctx.save(); ctx.translate(P.x, P.y); ctx.rotate(-rot); ctx.translate(-P.x, -P.y); ctx.fillText(shake > 0 ? "💥" : "💕", P.x + Math.sin(n / 250) * 2, P.y - 12 - (5 - heartT) * 1.2); ctx.restore(); ctx.globalAlpha = 1 }


            ctx.restore();
            ctx.globalAlpha = .82; ctx.drawImage(can, 0, 0, W, H); ctx.globalAlpha = 1; ctx.restore();
            document.getElementById("stat").innerHTML = "Lokasi: <b>" + got.size + "/" + items.length + "</b><br>Waktu: <b>" + (t0 ? ((done ? last : n) - t0) / 1000 | 0 : 0) + " dtk</b>";
            document.getElementById("tgt").innerHTML = questText();
            requestAnimationFrame(loop)
        }

        // ===== Putar peta, Menu / Jeda, Keluar =====
        const $ = id => document.getElementById(id);
        function setPause(v) {
            if (v === paused) return;
            if (v && (!started || done || sOn)) return;
            paused = v; $("pause").style.display = v ? "flex" : "none";
            for (const k in keys) keys[k] = 0;
            resetExitBtn()
        }
        let exitArm = 0;
        function resetExitBtn() { clearTimeout(exitArm); exitArm = 0; $("pexit").textContent = "⏏ Keluar ke Judul" }
        function exitToTitle() {
            setPause(false); clearInterval(tyTimer); $("dlg").style.display = "none"; dlg = false; talkNpc = null; mono = false; afterD = null;
            started = false; storyDone = false; rot = rotT = 0; reset();
            $("hud").classList.add("off"); $("dpad").classList.add("off"); $("ctl").classList.add("off");
            $("act").style.display = "none"; $("win").style.display = "none"; $("title").style.display = "flex"
        }
        const btn = (id, f) => { const b = $(id); b.addEventListener("click", () => { f(); b.blur() }) };
        btn("bmenu", () => setPause(true)); btn("bfull", toggleFullscreen); btn("pfull", toggleFullscreen);
        btn("pres", () => setPause(false));
        btn("pexit", () => {
            if (!exitArm) { $("pexit").textContent = "Yakin keluar? Ketuk lagi"; exitArm = setTimeout(resetExitBtn, 3000) }
            else { resetExitBtn(); exitToTitle() }
        });
        addEventListener("keydown", e => {
            if (!started || sOn || e.repeat) return; const k = e.key.toLowerCase();
            if (k === "escape" || k === "p") { setPause(!paused); e.preventDefault(); return }
            if (paused) return;
            if (k === "f") toggleFullscreen()
        });
        document.addEventListener("visibilitychange", () => { if (document.hidden) setPause(true) });
        requestAnimationFrame(loop);
