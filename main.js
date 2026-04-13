// ============================================================
// EMBERLORN SITE — Particles, Sprite Animations, Scroll FX
// ============================================================

// ── Ember Particles ──
(function() {
    const canvas = document.getElementById('embers');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const particles = [];
    const COUNT = 40;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = document.documentElement.scrollHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    // Re-measure after images load (page height may change)
    window.addEventListener('load', resize);

    for (let i = 0; i < COUNT; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: 1.5 + Math.random() * 2.5,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -(0.3 + Math.random() * 0.6),
            alpha: 0.3 + Math.random() * 0.5,
            flicker: Math.random() * Math.PI * 2,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.flicker += 0.03;
            const a = p.alpha * (0.6 + 0.4 * Math.sin(p.flicker));

            if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
            if (p.x < -10) p.x = W + 10;
            if (p.x > W + 10) p.x = -10;

            // Glow
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
            grad.addColorStop(0, `rgba(240, 147, 43, ${a})`);
            grad.addColorStop(0.4, `rgba(231, 76, 60, ${a * 0.5})`);
            grad.addColorStop(1, 'rgba(231, 76, 60, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.fillStyle = `rgba(255, 220, 150, ${a})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// ── Scroll fade-in ──
(function() {
    const els = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        }
    }, { threshold: 0.15 });
    els.forEach(el => observer.observe(el));
})();

// ── Parallax spell decorations ──
(function() {
    const decors = document.querySelectorAll('.spell-decor');
    if (!decors.length) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            decors.forEach(d => {
                const speed = parseFloat(d.dataset.speed || 0.15);
                const baseTop = parseFloat(d.dataset.baseTop || 0);
                d.style.transform = `translateY(${-scrollY * speed}px) rotate(${scrollY * 0.02}deg)`;
            });
            ticking = false;
        });
    });
})();

// ── Animated character sprites (CSS background-position stepping) ──
(function() {
    const COLS = 6, ROWS = 6, TOTAL = 36;
    const FPS = 10;

    document.querySelectorAll('.char-sprite').forEach(el => {
        const src = el.dataset.sheet;
        if (!src) return;

        const spriteEl = el.querySelector('.char-anim');
        if (!spriteEl) return;

        spriteEl.style.backgroundImage = `url(${src})`;
        spriteEl.style.backgroundSize = `${COLS * 100}% ${ROWS * 100}%`;

        let frame = 0;
        setInterval(() => {
            const col = frame % COLS;
            const row = Math.floor(frame / COLS);
            spriteEl.style.backgroundPosition = `${col * (100 / (COLS - 1))}% ${row * (100 / (ROWS - 1))}%`;
            frame = (frame + 1) % TOTAL;
        }, 1000 / FPS);
    });
})();

// ── Language switcher ──
(function() {
    const T = {
        pt: {
            tagline: 'Um roguelike sombrio. 8 personagens. 32 habilidades. Sobreviva.',
            steam: 'Lista de Desejos',
            itch: 'Jogar Demo Grátis',
            champion: 'Escolha seu Campeão',
            f1t: '8 Personagens', f1d: 'Cada um com perks, estilos e caminhos de maestria únicos.',
            f2t: '32 Habilidades', f2d: 'Corpo a corpo, à distância, em área, alvo único. Físico e mágico.',
            f3t: '30 Ondas', f3d: 'Hordas de inimigos, monstros elite e 6 chefes únicos.',
            f4t: 'Personalização', f4d: 'Equipamentos, troféus, transmutação e bônus de onda.',
            ss: 'Capturas de Tela',
            cta: 'Entre na arena. Escolha seu destino.',
            foot: '&copy; 2026 Hudson Borges. Todos os direitos reservados.',
        },
        en: {
            tagline: 'A dark roguelike. 8 characters. 32 abilities. Survive.',
            steam: 'Wishlist on Steam',
            itch: 'Play Demo Free',
            champion: 'Choose Your Champion',
            f1t: '8 Characters', f1d: 'Each with unique perks, playstyles, and mastery paths.',
            f2t: '32 Abilities', f2d: 'Melee, ranged, area, single-target. Physical and magical.',
            f3t: '30 Waves', f3d: 'Hordes of enemies, elite monsters, and 6 unique bosses.',
            f4t: 'Deep Builds', f4d: 'Equipment, trophies, transmutation, and wave bonuses.',
            ss: 'Screenshots',
            cta: 'Enter the arena. Choose your fate.',
            foot: '&copy; 2026 Hudson Borges. All rights reserved.',
        },
        es: {
            tagline: 'Un roguelike oscuro. 8 personajes. 32 habilidades. Sobrevive.',
            steam: 'Lista de deseados',
            itch: 'Jugar Demo Gratis',
            champion: 'Elige tu Campeón',
            f1t: '8 Personajes', f1d: 'Cada uno con ventajas, estilos y caminos de maestría únicos.',
            f2t: '32 Habilidades', f2d: 'Cuerpo a cuerpo, a distancia, en área, objetivo único. Físico y mágico.',
            f3t: '30 Oleadas', f3d: 'Hordas de enemigos, monstruos élite y 6 jefes únicos.',
            f4t: 'Builds Profundas', f4d: 'Equipamiento, trofeos, transmutación y bonificaciones de oleada.',
            ss: 'Capturas de Pantalla',
            cta: 'Entra en la arena. Elige tu destino.',
            foot: '&copy; 2026 Hudson Borges. Todos los derechos reservados.',
        },
        de: {
            tagline: 'Ein dunkles Roguelike. 8 Charaktere. 32 Fähigkeiten. Überlebe.',
            steam: 'Auf die Wunschliste',
            itch: 'Demo Kostenlos Spielen',
            champion: 'Wähle deinen Champion',
            f1t: '8 Charaktere', f1d: 'Jeder mit einzigartigen Perks, Spielstilen und Meisterschaftspfaden.',
            f2t: '32 Fähigkeiten', f2d: 'Nahkampf, Fernkampf, Fläche, Einzelziel. Physisch und magisch.',
            f3t: '30 Wellen', f3d: 'Horden von Feinden, Elite-Monster und 6 einzigartige Bosse.',
            f4t: 'Tiefe Builds', f4d: 'Ausrüstung, Trophäen, Transmutation und Wellen-Boni.',
            ss: 'Screenshots',
            cta: 'Betritt die Arena. Wähle dein Schicksal.',
            foot: '&copy; 2026 Hudson Borges. Alle Rechte vorbehalten.',
        },
        ru: {
            tagline: 'Тёмный рогалик. 8 персонажей. 32 способности. Выживи.',
            steam: 'В список желаемого',
            itch: 'Играть Демо Бесплатно',
            champion: 'Выбери своего Чемпиона',
            f1t: '8 Персонажей', f1d: 'Каждый с уникальными перками, стилями и путями мастерства.',
            f2t: '32 Способности', f2d: 'Ближний бой, дальний бой, по площади, по цели. Физические и магические.',
            f3t: '30 Волн', f3d: 'Орды врагов, элитные монстры и 6 уникальных боссов.',
            f4t: 'Глубокие Билды', f4d: 'Снаряжение, трофеи, трансмутация и бонусы волн.',
            ss: 'Скриншоты',
            cta: 'Войди на арену. Выбери свою судьбу.',
            foot: '&copy; 2026 Hudson Borges. Все права защищены.',
        },
        ja: {
            tagline: 'ダークなローグライク。8人のキャラ。32のスキル。生き残れ。',
            steam: 'ウィッシュリストに追加',
            itch: '無料デモをプレイ',
            champion: 'チャンピオンを選べ',
            f1t: '8人のキャラクター', f1d: 'それぞれ固有のパーク、プレイスタイル、マスタリーパスを持つ。',
            f2t: '32のスキル', f2d: '近接、遠距離、範囲、単体。物理と魔法。',
            f3t: '30ウェーブ', f3d: '敵の大群、エリートモンスター、6体のユニークなボス。',
            f4t: '深いビルド', f4d: '装備、トロフィー、変成、ウェーブボーナス。',
            ss: 'スクリーンショット',
            cta: 'アリーナに入れ。運命を選べ。',
            foot: '&copy; 2026 Hudson Borges. All rights reserved.',
        },
        zh: {
            tagline: '黑暗肉鸽。8个角色。32个技能。活下去。',
            steam: '加入愿望单',
            itch: '免费试玩',
            champion: '选择你的勇士',
            f1t: '8个角色', f1d: '每个都有独特的天赋、玩法和精通路径。',
            f2t: '32个技能', f2d: '近战、远程、范围、单体。物理和魔法。',
            f3t: '30波次', f3d: '成群的敌人、精英怪物和6个独特的Boss。',
            f4t: '深度构建', f4d: '装备、奖杯、嬗变和波次加成。',
            ss: '游戏截图',
            cta: '踏入竞技场。选择你的命运。',
            foot: '&copy; 2026 Hudson Borges. 保留所有权利。',
        },
        ko: {
            tagline: '어둠의 로그라이크. 8명의 캐릭터. 32개의 스킬. 생존하라.',
            steam: '위시리스트에 추가',
            itch: '무료 데모 플레이',
            champion: '챔피언을 선택하라',
            f1t: '8명의 캐릭터', f1d: '각각 고유한 퍼크, 플레이 스타일, 숙련 경로를 가짐.',
            f2t: '32개의 스킬', f2d: '근접, 원거리, 범위, 단일 대상. 물리와 마법.',
            f3t: '30 웨이브', f3d: '적의 무리, 엘리트 몬스터, 6명의 고유한 보스.',
            f4t: '깊은 빌드', f4d: '장비, 트로피, 변환, 웨이브 보너스.',
            ss: '스크린샷',
            cta: '아레나에 입장하라. 운명을 선택하라.',
            foot: '&copy; 2026 Hudson Borges. All rights reserved.',
        },
    };

    function apply(t) {
        // All elements with data-i18n get their text from the translation object
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key] != null) el.textContent = t[key];
        });
        // Buttons (appear twice — hero + bottom)
        document.querySelectorAll('.btn-steam-text').forEach(el => el.textContent = t.steam);
        document.querySelectorAll('.btn-itch-text').forEach(el => el.textContent = t.itch);
        // Footer (uses innerHTML for &copy;)
        const ft = document.querySelector('footer p');
        if (ft) ft.innerHTML = t.foot;
    }

    window.setLang = function(lang) {
        const t = T[lang];
        if (!t) return;
        apply(t);
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.lang === lang);
        });
        localStorage.setItem('emberlorn-lang', lang);
    };

    // Auto-detect on load
    const saved = localStorage.getItem('emberlorn-lang');
    if (saved && T[saved]) { setLang(saved); return; }
    const bl = (navigator.language || '').toLowerCase();
    if (bl.startsWith('pt')) setLang('pt');
    else if (bl.startsWith('es')) setLang('es');
    else if (bl.startsWith('de')) setLang('de');
    else if (bl.startsWith('ru')) setLang('ru');
    else if (bl.startsWith('ja')) setLang('ja');
    else if (bl.startsWith('zh')) setLang('zh');
    else if (bl.startsWith('ko')) setLang('ko');
    else setLang('en');
})();
