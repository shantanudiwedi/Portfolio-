/**
 * Shantanu Diwedi Portfolio — Rishi Thakor Design System
 * Interactive scroll-driven portfolio script
 */

(() => {
  'use strict';

  // Ensure scroll position resets to top on initial load / refresh
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // ---- Intro-once-per-session guard ----
  // If the visitor has already seen the intro this session, skip straight to site.
  let introAlreadySeen = false;
  try { introAlreadySeen = sessionStorage.getItem('introSeen') === '1'; } catch (e) {}
  if (introAlreadySeen) {
    // Hide all intro layers immediately so the site shows without any flash
    document.addEventListener('DOMContentLoaded', () => {
      ['splashScreen', 'gateScreen', 'introVideo', 'globalSkipBtn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('is-hidden');
      });
      document.body.classList.add('site-ready');
    });
    // Also apply immediately in case DOM is already loaded
    ['splashScreen', 'gateScreen', 'introVideo'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('is-hidden');
    });
    document.body.classList.add('site-ready');
  }

  // Element selections
  const splashScreen = document.getElementById('splashScreen');
  const splashStartBtn = document.getElementById('splashStartBtn');
  const globalSkipBtn = document.getElementById('globalSkipBtn');
  const gateScreen = document.getElementById('gateScreen');
  const startBtn = document.getElementById('startBtn');
  const introVideo = document.getElementById('introVideo');
  const matchCutVideo = document.getElementById('matchCutVideo');
  const introSkipBtn = document.getElementById('introSkipBtn');
  const siteRoot = document.getElementById('siteRoot');
  const mainNav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contact-form') || document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================================
  // GLOBAL PULL-CORD THEME TOGGLE (Light & Dark Mode)
  // ==========================================================
  const pullCord = document.getElementById('pullCord');
  const cordWrap = document.getElementById('cordWrap');

  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (e) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }

  // Initialize theme
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (pullCord && cordWrap) {
    let isDragging = false;
    let startY = 0;
    let currentPullY = 0;
    const MAX_PULL = 40;
    const TRIGGER_THRESHOLD = 18;

    function triggerSpring(andToggle = false) {
      cordWrap.style.setProperty('--pull-y', `${currentPullY}px`);
      cordWrap.classList.remove('is-springing');
      void cordWrap.offsetWidth; // Force reflow
      cordWrap.classList.add('is-springing');
      cordWrap.style.transform = '';

      if (andToggle) {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      }

      currentPullY = 0;
      setTimeout(() => {
        cordWrap.classList.remove('is-springing');
      }, 750);
    }

    // Pointer drag interaction
    pullCord.addEventListener('pointerdown', e => {
      isDragging = true;
      startY = e.clientY;
      currentPullY = 0;
      cordWrap.classList.remove('is-springing');
      pullCord.setPointerCapture(e.pointerId);
    });

    pullCord.addEventListener('pointermove', e => {
      if (!isDragging) return;
      const delta = e.clientY - startY;
      if (delta > 0) {
        currentPullY = Math.min(delta, MAX_PULL);
        cordWrap.style.transform = `translateY(${currentPullY}px)`;
      } else {
        currentPullY = 0;
        cordWrap.style.transform = '';
      }
    });

    function finishDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      try { pullCord.releasePointerCapture(e.pointerId); } catch (err) {}

      const shouldToggle = currentPullY >= TRIGGER_THRESHOLD;
      triggerSpring(shouldToggle);
    }

    pullCord.addEventListener('pointerup', finishDrag);
    pullCord.addEventListener('pointercancel', finishDrag);

    // Click handler for direct click without dragging
    pullCord.addEventListener('click', () => {
      if (currentPullY > 0) return;
      triggerSpring(true);
    });

    // Keyboard accessibility: Enter or Space triggers spring & toggle
    pullCord.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerSpring(true);
      }
    });
  }

  // ==========================================================
  // 1. SPLASH -> VIDEO -> SITE FLOW
  // ==========================================================

  let flowStep = 'splash'; // splash, gate, video, site
  let videoPulseTimer = null;

  // New Premier Splash Start Button
  if (splashStartBtn) {
    splashStartBtn.addEventListener('click', () => {
      if (flowStep !== 'splash') return;
      flowStep = 'video';

      // Music starts only when visitor clicks the music toggle (not auto-started)

      // Fade out splash (500ms cross-fade into video)
      if (splashScreen) splashScreen.classList.add('is-hidden');
      if (gateScreen) gateScreen.classList.add('is-hidden');

      if (prefersReducedMotion) {
        // Skip straight to site for reduced motion
        fadeToVolume(isInputFocused ? 0.15 : 0.30, 1000);
        finishIntroSequence();
        return;
      }

      // Start full-screen match-cut video UNMUTED on user gesture
      startVideoSequence({ unmuted: true });
    });
  }

  // Legacy gate button fallback
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      flowStep = 'video';

      if (splashScreen) splashScreen.classList.add('is-hidden');
      if (gateScreen) gateScreen.classList.add('is-hidden');

      if (prefersReducedMotion) {
        fadeToVolume(isInputFocused ? 0.15 : 0.30, 1000);
        finishIntroSequence();
        return;
      }

      startVideoSequence({ unmuted: true });
    });
  }

  function startVideoSequence(options = {}) {
    introVideo.classList.add('is-active');

    // Thin 2px progress bar tracker along bottom edge
    const videoProgressFill = document.getElementById('videoProgressFill');
    if (videoProgressFill) {
      matchCutVideo.addEventListener('timeupdate', () => {
        if (matchCutVideo.duration) {
          const pct = (matchCutVideo.currentTime / matchCutVideo.duration) * 100;
          videoProgressFill.style.width = pct + '%';
        }
      });
    }

    // Clicking START is the direct user gesture -> start UNMUTED
    if (options.unmuted) {
      matchCutVideo.muted = false;
    }
    matchCutVideo.currentTime = 0;

    // Attempt video play
    const playPromise = matchCutVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback to muted if browser policy blocks unmuted
        matchCutVideo.muted = true;
        matchCutVideo.play().catch(() => {
          // If video still cannot play, proceed directly to site
          endVideoSequence();
        });
      });
    }

    matchCutVideo.addEventListener('ended', onVideoEnd, { once: true });
    if (introSkipBtn) introSkipBtn.addEventListener('click', endVideoSequence);
  }

  function onVideoEnd() {
    endVideoSequence();
  }

  function endVideoSequence() {
    if (flowStep !== 'video') return;

    matchCutVideo.pause();
    introVideo.classList.remove('is-active');
    // Video ended: fade background music back up to normal 0.30 over 1.5s (never stop or restart music)
    fadeToVolume(isInputFocused ? 0.15 : 0.30, 1500);
    finishIntroSequence();
  }

  // Global skip (Esc key or Skip pill) immediately jumps to site
  function skipStraightToSite() {
    if (flowStep === 'site') return;
    try {
      matchCutVideo.pause();
      matchCutVideo.muted = true;
    } catch (e) {}
    // Video skipped: fade background music back up to 0.30 over 1.5s
    fadeToVolume(isInputFocused ? 0.15 : 0.30, 1500);
    finishIntroSequence();
  }

  if (globalSkipBtn) {
    globalSkipBtn.addEventListener('click', skipStraightToSite);
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('resumeModal');
      if (modal && !modal.hasAttribute('hidden')) {
        closeResumeModal();
        return;
      }
      skipStraightToSite();
    }
  });

  function finishIntroSequence() {
    flowStep = 'site';
    document.body.classList.add('site-ready');
    // No auto-music: music starts only on explicit toggle click
    // Mark intro as seen for this session
    try { sessionStorage.setItem('introSeen', '1'); } catch (e) {}

    if (splashScreen) splashScreen.classList.add('is-hidden');
    if (globalSkipBtn) globalSkipBtn.style.display = 'none';
    if (gateScreen) gateScreen.classList.add('is-hidden');
    if (introVideo) {
      introVideo.classList.remove('is-active');
      try {
        matchCutVideo.pause();
        matchCutVideo.muted = true;
      } catch (err) {}
    }

    // Requirement: Site starts at the very top (page 1), never mid-page
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    // Initialise scroll reveals
    initScrollObserver();
  }

  // ==========================================================
  // 4. SCROLL REVEAL (IntersectionObserver)
  // ==========================================================

  function initScrollObserver() {
    const revealElements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    revealElements.forEach(el => observer.observe(el));
  }

  // ==========================================================
  // 5. MOBILE NAVIGATION TOGGLE
  // ==========================================================

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav when clicking a navigation link
  if (navLinks) {
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav && mainNav.classList.contains('is-open')) {
          mainNav.classList.remove('is-open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Active section highlighting in navigation
  const trackedSections = document.querySelectorAll('section[id]');
  window.addEventListener(
    'scroll',
    () => {
      const scrollPos = window.scrollY + 140;
      trackedSections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (navLinks) {
          const matchingLink = navLinks.querySelector(`a[href="#${id}"]`);
          if (matchingLink) {
            if (scrollPos >= top && scrollPos < top + height) {
              matchingLink.classList.add('is-active');
            } else {
              matchingLink.classList.remove('is-active');
            }
          }
        }
      });
    },
    { passive: true }
  );

  // ==========================================================
  // TIMELINE SCROLL OBSERVER & ANIMATIONS
  // ==========================================================
  const timelineSection = document.getElementById('timeline');
  const timelineEntries = document.querySelectorAll('.timeline-entry');
  const bigYearEl = document.getElementById('timelineBigYear');
  const dateRangeEl = document.getElementById('timelineDateRange');
  const counterEl = document.getElementById('timelineCounter');
  const barFillEl = document.getElementById('timelineBarFill');
  const activeDotEl = document.getElementById('timelineActiveDot');
  const glowEl = document.getElementById('timelineGlow');

  if (timelineEntries.length > 0) {
    let currentActiveIdx = -1;

    function setActiveTimelineEntry(entry, index) {
      if (currentActiveIdx === index) return;
      currentActiveIdx = index;

      timelineEntries.forEach(e => e.classList.remove('is-active'));
      entry.classList.add('is-active');

      const year = entry.getAttribute('data-year') || '2026';
      const dates = entry.getAttribute('data-dates') || '';
      const total = timelineEntries.length;
      const countStr = `0${index + 1} / 0${total}`;
      const fillPct = `${((index + 1) / total) * 100}%`;

      // Year counting / cross-fade transition
      if (bigYearEl) {
        if (bigYearEl.textContent !== year) {
          bigYearEl.classList.add('is-updating');
          setTimeout(() => {
            bigYearEl.textContent = year;
            bigYearEl.classList.remove('is-updating');
          }, 150);
        }
      }

      if (dateRangeEl) dateRangeEl.textContent = dates;
      if (counterEl) counterEl.textContent = countStr;
      if (barFillEl) barFillEl.style.width = fillPct;

      // Position the active dot on the track line
      if (activeDotEl) {
        const entryDot = entry.querySelector('.entry-dot');
        if (entryDot && entry.offsetTop !== undefined) {
          activeDotEl.style.top = `${entry.offsetTop + entryDot.offsetTop}px`;
        }
      }

      // Shift background radial glow toward active entry
      if (glowEl && timelineSection) {
        const rect = entry.getBoundingClientRect();
        const sectionRect = timelineSection.getBoundingClientRect();
        const relativeY = rect.top - sectionRect.top + rect.height / 2;
        glowEl.style.top = `${relativeY}px`;
      }
    }

    // IntersectionObserver to switch active entry as user scrolls
    const tlObserver = new IntersectionObserver(
      entries => {
        entries.forEach(change => {
          if (change.isIntersecting) {
            const idx = Array.from(timelineEntries).indexOf(change.target);
            if (idx !== -1) {
              setActiveTimelineEntry(change.target, idx);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-25% 0px -40% 0px',
        threshold: 0.1
      }
    );

    timelineEntries.forEach(entry => tlObserver.observe(entry));

    // Support clicking an entry directly
    timelineEntries.forEach((entry, idx) => {
      entry.addEventListener('click', () => {
        setActiveTimelineEntry(entry, idx);
        entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });

    // Initialize with first entry
    setActiveTimelineEntry(timelineEntries[0], 0);
  }

  // ==========================================================
  // 6. CONTACT FORM HANDLING (FormSubmit AJAX)
  // ==========================================================

  if (contactForm) {
    contactForm.addEventListener('submit', async event => {
      event.preventDefault();

      // Clear previous errors
      clearFormErrors();
      if (formStatus) {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }

      const nameInput = document.getElementById('contactName') || contactForm.querySelector('[name="name"]');
      const emailInput = document.getElementById('contactEmail') || contactForm.querySelector('[name="email"]');
      const scopeInput = document.getElementById('contactWork') || contactForm.querySelector('[name="scope"]') || contactForm.querySelector('[name="work"]');
      const messageInput = document.getElementById('contactMessage') || contactForm.querySelector('[name="message"]');
      const honeypot = contactForm.querySelector('input[name="_honey"]');

      let hasErrors = false;

      // Honeypot bot protection
      if (honeypot && honeypot.value.trim() !== '') {
        if (formStatus) {
          formStatus.textContent = 'Message successfully dispatched.';
          formStatus.classList.add('is-success');
        }
        contactForm.reset();
        return;
      }

      // Validation
      if (!nameInput || !nameInput.value.trim()) {
        showFieldError('nameError', nameInput, 'Please state your name.');
        hasErrors = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput || !emailInput.value.trim()) {
        showFieldError('emailError', emailInput, 'Please provide an email address.');
        hasErrors = true;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        showFieldError('emailError', emailInput, 'Please enter a valid email format (e.g. name@domain.com).');
        hasErrors = true;
      }

      if (!messageInput || !messageInput.value.trim()) {
        showFieldError('messageError', messageInput, 'Please provide message details.');
        hasErrors = true;
      }

      if (hasErrors) return;

      // Send via WhatsApp and background FormSubmit copy
      const WHATSAPP_NUMBER = '918766642337';
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const scope = scopeInput ? scopeInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      const waLines = ['New portfolio message', '', 'Name: ' + name, 'Email: ' + email];
      if (scope) waLines.push('Scope / Role: ' + scope);
      waLines.push('', 'Message:', message);
      const waText = waLines.join('\n');
      const waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(waText);

      // Email copy (best effort; keepalive lets it finish while the page opens WhatsApp)
      try {
        fetch('https://formsubmit.co/ajax/shantanudiwedi2007@gmail.com', {
          method: 'POST', keepalive: true,
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, scope, work: scope, message, _subject: 'New Portfolio Contact Submission (Shantanu Diwedi)', _captcha: 'false' }),
        }).catch(() => {});
      } catch (err) {}

      // Open WhatsApp inside the click gesture so browsers do not block it
      const waWindow = window.open(waUrl, '_blank');
      if (waWindow) { waWindow.opener = null; } else { window.location.href = waUrl; }

      if (formStatus) {
        formStatus.textContent = 'WhatsApp is opening with your message ready. Press Send there to deliver it to Shantanu. ';
        const retry = document.createElement('a');
        retry.href = waUrl; retry.target = '_blank'; retry.rel = 'noopener'; retry.textContent = 'Open WhatsApp again';
        formStatus.appendChild(retry);
        formStatus.classList.add('is-success');
      }
      contactForm.reset();
    });
  }

  function showFieldError(errorId, inputElement, message) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = message;
    inputElement.setAttribute('aria-invalid', 'true');
  }

  function clearFormErrors() {
    ['nameError', 'emailError', 'messageError'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    contactForm.querySelectorAll('.input, .textarea').forEach(el => {
      el.removeAttribute('aria-invalid');
    });
  }

  // Autofocus the Start Experience button on load
  if (splashStartBtn) {
    setTimeout(() => {
      try { splashStartBtn.focus(); } catch (err) {}
    }, 100);
  }

  // ==========================================================
  // 7. BACKGROUND MUSIC CONTROLLER
  // ==========================================================
  const bgMusic = document.getElementById('bgMusic');
  const bgMusicToggle = document.getElementById('bgMusicToggle');
  let musicStarted = false;
  let isMuted = false;
  let isInputFocused = false;
  let currentFadeAnim = null;

  try {
    isMuted = localStorage.getItem('bgMusicMuted') === 'true';
  } catch (e) {
    isMuted = false;
  }

  function updateToggleUI() {
    if (!bgMusicToggle) return;
    if (isMuted) {
      bgMusicToggle.classList.add('is-muted');
      bgMusicToggle.setAttribute('aria-pressed', 'false');
      bgMusicToggle.setAttribute('aria-label', 'Unmute background music');
    } else {
      bgMusicToggle.classList.remove('is-muted');
      bgMusicToggle.setAttribute('aria-pressed', 'true');
      bgMusicToggle.setAttribute('aria-label', 'Mute background music');
    }
  }
  updateToggleUI();

  function getTargetVolume() {
    if (isMuted) return 0;
    return isInputFocused ? 0.15 : 0.30;
  }

  function fadeToVolume(targetVol, durationMs = 1500) {
    if (!bgMusic) return;
    if (prefersReducedMotion || durationMs <= 0) {
      bgMusic.volume = targetVol;
      return;
    }
    if (currentFadeAnim) cancelAnimationFrame(currentFadeAnim);

    const startVol = bgMusic.volume;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      bgMusic.volume = startVol + (targetVol - startVol) * progress;
      if (progress < 1) {
        currentFadeAnim = requestAnimationFrame(step);
      } else {
        currentFadeAnim = null;
      }
    }
    currentFadeAnim = requestAnimationFrame(step);
  }

  function startBackgroundMusic(options = {}) {
    if (musicStarted || !bgMusic) return;
    musicStarted = true;
    updateToggleUI();

    if (isMuted) {
      bgMusic.volume = 0;
      bgMusic.muted = true;
      return;
    }

    const targetVol = options.targetVol !== undefined ? options.targetVol : getTargetVolume();
    const durationMs = options.durationMs !== undefined ? options.durationMs : 1000;

    bgMusic.volume = 0;
    bgMusic.muted = false;
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          fadeToVolume(targetVol, durationMs);
        })
        .catch(err => {
          console.warn('Audio playback prevented by browser:', err);
        });
    }
  }

  // Toggle button click handler
  if (bgMusicToggle) {
    bgMusicToggle.addEventListener('click', () => {
      isMuted = !isMuted;
      try {
        localStorage.setItem('bgMusicMuted', isMuted ? 'true' : 'false');
      } catch (e) {}
      updateToggleUI();

      if (isMuted) {
        fadeToVolume(0, prefersReducedMotion ? 0 : 350);
        setTimeout(() => {
          if (isMuted && bgMusic) {
            bgMusic.muted = true;
            bgMusic.pause();
          }
        }, prefersReducedMotion ? 0 : 350);
      } else {
        musicStarted = true;
        if (bgMusic) {
          bgMusic.muted = false;
          const playPromise = bgMusic.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              fadeToVolume(getTargetVolume(), prefersReducedMotion ? 0 : 800);
            }).catch(() => {});
          } else {
            fadeToVolume(getTargetVolume(), prefersReducedMotion ? 0 : 800);
          }
        }
      }
    });
  }

  // Pause on tab visibilitychange (when hidden), resume when visible unless muted
  document.addEventListener('visibilitychange', () => {
    if (!bgMusic || !musicStarted) return;
    if (document.hidden) {
      if (!isMuted && !bgMusic.paused) {
        bgMusic.pause();
      }
    } else {
      if (!isMuted && bgMusic.paused) {
        bgMusic.play().catch(() => {});
      }
    }
  });

  // Duck volume to 0.15 while form inputs are focused
  function attachInputDucking() {
    const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        isInputFocused = true;
        if (musicStarted && !isMuted) {
          fadeToVolume(0.15, prefersReducedMotion ? 0 : 300);
        }
      });
      input.addEventListener('blur', () => {
        isInputFocused = false;
        if (musicStarted && !isMuted) {
          fadeToVolume(0.30, prefersReducedMotion ? 0 : 400);
        }
      });
    });
  }
  attachInputDucking();

  // ==========================================================
  // 8. COPY MICRO-ACTION (Email & Phone cards)
  // ==========================================================
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const ta = document.createElement('textarea');
          ta.value = textToCopy;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        const origText = btn.textContent;
        btn.textContent = 'Copied';
        btn.classList.add('is-copied');
        setTimeout(() => {
          btn.textContent = origText;
          btn.classList.remove('is-copied');
        }, 1500);
      } catch (err) {
        console.warn('Clipboard copy error:', err);
      }
    });
  });

  // ==========================================================
  // 9. SPIRAL-BOUND FLIP NOTEPAD CONTROLLER (Hero About Me Card)
  // ==========================================================
  const aboutFlipPad = document.getElementById('aboutFlipPad');
  const flipCounter = document.getElementById('flipCounter');
  if (aboutFlipPad) {
    const pages = aboutFlipPad.querySelectorAll('.flip-page');
    const totalPages = pages.length;
    let currentFlipPage = 0;
    let isInteracting = false;
    let flipTimer = null;

    function goToFlipPage(nextIndex) {
      if (nextIndex === currentFlipPage || pages.length === 0) return;
      const prevPage = pages[currentFlipPage];
      const nextPage = pages[nextIndex];

      if (prevPage) {
        prevPage.classList.remove('is-active');
        prevPage.classList.add('is-flipping-out');
        setTimeout(() => {
          prevPage.classList.remove('is-flipping-out');
        }, 600);
      }

      if (nextPage) {
        nextPage.classList.remove('is-flipping-out');
        nextPage.classList.add('is-active');
      }

      currentFlipPage = nextIndex;
      if (flipCounter) {
        flipCounter.textContent = `0${currentFlipPage + 1} / 0${totalPages}`;
      }
    }

    function nextFlipPage() {
      const next = (currentFlipPage + 1) % totalPages;
      goToFlipPage(next);
    }

    function prevFlipPage() {
      const prev = (currentFlipPage - 1 + totalPages) % totalPages;
      goToFlipPage(prev);
    }

    // Auto-advance every 4 seconds
    function startAutoFlip() {
      stopAutoFlip();
      flipTimer = setInterval(() => {
        if (!isInteracting) {
          nextFlipPage();
        }
      }, 4000);
    }

    function stopAutoFlip() {
      if (flipTimer) {
        clearInterval(flipTimer);
        flipTimer = null;
      }
    }

    startAutoFlip();

    // Pause on hover or focus
    aboutFlipPad.addEventListener('mouseenter', () => { isInteracting = true; });
    aboutFlipPad.addEventListener('mouseleave', () => { isInteracting = false; });
    aboutFlipPad.addEventListener('focusin', () => { isInteracting = true; });
    aboutFlipPad.addEventListener('focusout', () => { isInteracting = false; });

    // Click to flip
    aboutFlipPad.addEventListener('click', e => {
      e.preventDefault();
      nextFlipPage();
    });

    // Keyboard navigation (Arrow keys & Space/Enter)
    aboutFlipPad.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        nextFlipPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevFlipPage();
      }
    });
  }

  // ==========================================================
  // 10. RESUME VIEWER MODAL CONTROLLER
  // ==========================================================
  const resumeModal = document.getElementById('resumeModal');
  const resumeModalBackdrop = document.getElementById('resumeModalBackdrop');
  const resumeModalClose = document.getElementById('resumeModalClose');
  const resumeFrame = document.getElementById('resumeFrame');
  let resumeTriggerEl = null;

  function openResumeModal(trigger) {
    resumeTriggerEl = trigger || null;

    // If PDF viewer is not supported/enabled (common on mobile browsers), open PDF in new tab
    if (typeof navigator !== 'undefined' && 'pdfViewerEnabled' in navigator && !navigator.pdfViewerEnabled) {
      window.open('resume.pdf', '_blank', 'noopener,noreferrer');
      return;
    }

    if (!resumeModal) return;

    if (resumeFrame && (!resumeFrame.src || resumeFrame.src === 'about:blank' || !resumeFrame.src.includes('resume.pdf'))) {
      resumeFrame.src = 'resume.pdf';
    }

    resumeModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    setTimeout(() => {
      if (resumeModalClose) resumeModalClose.focus();
    }, 50);
  }

  function closeResumeModal() {
    if (!resumeModal || resumeModal.hasAttribute('hidden')) return;

    resumeModal.setAttribute('hidden', '');
    document.body.style.overflow = '';

    if (resumeTriggerEl && typeof resumeTriggerEl.focus === 'function') {
      try { resumeTriggerEl.focus(); } catch (e) {}
    }
    resumeTriggerEl = null;
  }

  // Bind all resume triggers across the site (nav link, nav button, hero button, contact buttons/cards)
  document.querySelectorAll('.resume-trigger, #resumeBtnNav, #resumeBtnHero, #resumeLinkNav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openResumeModal(btn);
    });
  });

  if (resumeModalClose) {
    resumeModalClose.addEventListener('click', e => {
      e.preventDefault();
      closeResumeModal();
    });
  }

  if (resumeModalBackdrop) {
    resumeModalBackdrop.addEventListener('click', e => {
      e.preventDefault();
      closeResumeModal();
    });
  }

  // Check if user has already bypassed intro (for developer ease or fast navigation)
  // Default behaviour: full experience starts with gate
  console.log('Shantanu Diwedi Portfolio loaded with Rishi Thakor design system.');
})();
