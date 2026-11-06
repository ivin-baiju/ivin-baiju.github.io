(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const progress = $('#readingProgress');
  const updateProgress = () => {
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, amount))}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const menuToggle = $('.menu-toggle');
  const mobileNav = $('#mobileNav');
  const closeMenu = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    mobileNav.hidden = true;
  };
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      mobileNav.hidden = isOpen;
    });
    $$('a', mobileNav).forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }

  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const filters = $$('.filter-button');
  const cards = $$('.project-card');
  filters.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filters.forEach(filter => {
        const selected = filter === button;
        filter.classList.toggle('active', selected);
        filter.setAttribute('aria-pressed', String(selected));
      });
      cards.forEach(card => {
        const visible = category === 'all' || card.dataset.category === category;
        card.classList.toggle('is-filtered-out', !visible);
      });
    });
  });

  const projectData = {
    visionlytics: {
      kicker: 'PRODUCTION BUILD / 01',
      title: 'VISIONLYTICS v1.0',
      description: 'A full-stack, multi-tenant computer vision SaaS platform rebuilt from the ground up as a Turborepo monorepo. Analyses images, video uploads, live webcams, and RTSP streams per frame with honest temperature-scaled confidence.',
      direction: '5-stage deterministic optical pipeline: Presigned S3 & magic-byte MIME verification → Calibrated Apache-2.0 RT-DETRv2-R18vd & YOLOS-Tiny ONNX detection (+ SAHI 2×2 tiled pass) → ByteTrack with Alpha-Beta Kalman smoothing & 26-d HSV/Lab Re-ID → Elliptical border-ring foreground CIELAB + CIEDE2000 (ΔE00) 28-colour & torso/leg garment naming → TimescaleDB hypertable, ray-cast polygon zones, and a continuous-evaluation Model Registry gate (mAP50-95 >= 0.83).',
      focus: 'React 19, Vite 8, Tailwind v4, WebGL2 GLSL shaders, 60fps HTML5 Canvas, Fastify 5, Drizzle ORM, PostgreSQL 16 + TimescaleDB, Redis + BullMQ, FastAPI, ONNX Runtime (Measured Golden mAP50: 91.43%, mAP50-95: 85.14%, CIEDE2000 Colour Acc: 85.71%, Person Count MAE: 0.00).',
      status: 'STATUS / LIVE PRODUCTION v1.0 · DEPLOYED ON GITHUB PAGES, VERCEL & DOCKER COMPOSE'
    },
    monarch: {
      kicker: 'BUILD NOTES / 02',
      title: 'MONARCH',
      description: 'A premium, dark-first intelligence console focused on bringing georeferenced imagery, spatial context, and connected data into one coherent workspace.',
      direction: 'Build a clear interface for complex spatial information — one that makes layers, bounds, image sources, and analysis outputs easier to navigate.',
      focus: 'React, TypeScript, Framer Motion, API integration, georeferenced imagery workflows, and interface architecture.',
      status: 'STATUS / IN DEVELOPMENT · FRONTEND AND SYSTEM INTEGRATION WORK'
    },
    atc: {
      kicker: 'PRODUCTION BUILD / 03',
      title: 'SKYCOMMAND: ATC SURFACE & LIVE ADS-B FLIGHTRADAR',
      description: 'A full-stack, enterprise-grade Air Traffic Control surface and terminal radar simulator paired with a real-time ADS-B live flight tracking engine, authentic airline liveries, and interactive 3D aircraft inspection.',
      direction: 'Real-time OpenSky Network ADS-B ingestion with 100ms dead-reckoning kinematics, individual 3D WebGL airframes (A320neo, B737, B787, A350, B777, ATR72) in authentic airline liveries (IndiGo, Air India, SpiceJet, Vistara, Akasa), high-definition Esri satellite radar, and a deterministic proactive AI runway incursion safety filter.',
      focus: 'FastAPI, Python 3.12, React 19, TypeScript 5.7, Three.js WebGL 3D, OpenSky Network ADS-B Mode-S, GeoJSON + Local ENU Projection, 60fps HTML5 Canvas with pointer capture, WCAG AA compliant Light Theme.',
      status: 'STATUS / LIVE PRODUCTION v1.0 · OPEN SOURCE ON GITHUB & DOCKER'
    },
    slm: {
      kicker: 'PRODUCTION BUILD / 04',
      title: 'CUSTOM SLM INFERENCE ENGINE v2.0',
      description: 'A from-scratch autoregressive transformer inference runtime and 3-workspace hardware telemetry workbench engineered in pure PyTorch for Apple Silicon Unified Memory — zero wrappers, zero transformers.generate().',
      direction: '6-stage deterministic tensor pipeline: ChatML Tokenization & Embedding → Pre-Attention FP32-upcast RMSNorm → QKV Projection + RoPE (θ = 1,000,000) → Grouped-Query Attention (7:1 KV head sharing via repeat_interleave) with Dynamic, Static & vLLM-style 16-token Paged KV Cache → SwiGLU MLP → Repetition Penalty, Top-K/Top-P sampler & OpenAI-compatible SSE telemetry stream.',
      focus: 'PyTorch 2.x (MPS/CUDA/CPU), Zero-Copy safe_open INT8 symmetric & INT4 nibble-packed quantization (compressing Qwen2.5-3B peak RAM from 13.0 GB OOM to 4.13 GB), multi-architecture support (Qwen2, Llama3, Phi-3, Gemma2), PEFT/TRL LoRA fine-tuning (ivin-baiju/qwen2.5-0.5b-expert), FastAPI, Prometheus, and a 3-workspace Anodized Silicon & EUV Cobalt UI (Measured: 1.00000179 Cosine Logits Parity vs HF, 48.3 tok/s FP16, 36.8 ms TTFT, 1.88× KV Cache speedup, 20/20 pytest suite).',
      status: 'STATUS / LIVE PRODUCTION v2.0 · DEPLOYED ON GITHUB PAGES, HUGGING FACE HUB & PYPI CLI'
    }
  };
  const dialog = $('#projectDialog');
  const closeDialog = $('.dialog-close');
  const openProject = key => {
    const data = projectData[key];
    if (!data || !dialog) return;
    $('#dialogKicker').textContent = data.kicker;
    $('#dialogTitle').textContent = data.title;
    $('#dialogDescription').textContent = data.description;
    $('#dialogDirection').textContent = data.direction;
    $('#dialogFocus').textContent = data.focus;
    $('#dialogStatus').textContent = data.status;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      document.body.classList.add('dialog-open');
    }
  };
  $$('.project-detail-trigger').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));
  if (closeDialog && dialog) closeDialog.addEventListener('click', () => dialog.close());
  if (dialog) {
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  }
})();
