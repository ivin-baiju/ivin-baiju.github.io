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
      kicker: 'CONCEPT NOTES / 03',
      title: 'AI AIR TRAFFIC CONTROL SIMULATION',
      description: 'A simulation-first concept for exploring how an AI controller could monitor aircraft, spot emerging conflicts, and communicate safe instructions in a controlled virtual airport environment.',
      direction: 'Recreate an airport layout, replay traffic, inject near-miss scenarios, and evaluate how a controller detects and responds to changing situations.',
      focus: 'Airport and traffic simulation, scenario design, conflict detection, decision support, and aircraft response logic.',
      status: 'STATUS / CONCEPT · A PROPOSED BUILD, NOT A DEPLOYED SAFETY SYSTEM'
    },
    slm: {
      kicker: 'RESEARCH NOTES / 04',
      title: 'SMALL MODEL SYSTEMS',
      description: 'A research track around the systems that make smaller language models practical, efficient, observable, and easier to understand.',
      direction: 'Explore inference serving, quantization with minimal quality loss, multilingual niche adaptation, and local-first observability for model memory and behaviour.',
      focus: 'SLM inference, low-bit quantization, fine-tuning, observability, and mechanistic interpretability.',
      status: 'STATUS / EXPLORATION · RESEARCH DIRECTIONS AND EARLY EXPERIMENTS'
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
