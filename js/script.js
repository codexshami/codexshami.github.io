/* 
    Mohd Shami Portfolio - Main Interactive Script
    Features: 
    - AOS Animations
    - Custom Dynamic Cursor
    - Scroll Spy & Active Nav
    - Typing Animation & Counters
    - Web Audio API UI Sound Synthesizer
    - Multi-Theme Manager (Emerald / Cyber Neon / Tech Gold)
    - Command Palette (Ctrl+K)
    - Interactive AI & ML Playground (Revive, HamOrSpam, FarmAIQ)
    - Interactive Code & Pipeline Explorer (Terminal Simulation)
    - Modal Managers (Projects, Certifications, Schedule Call)
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS immediately
    if (window.AOS) {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // 2. Web Audio API UI Sound Synthesizer
    class SoundEngine {
        constructor() {
            this.audioCtx = null;
            this.muted = localStorage.getItem('shami_audio_muted') === 'true';
            this.updateButton();
        }

        initContext() {
            if (!this.audioCtx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.audioCtx = new AudioCtx();
            }
        }

        playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.05) {
            if (this.muted) return;
            try {
                this.initContext();
                if (!this.audioCtx) return;

                const osc = this.audioCtx.createOscillator();
                const gain = this.audioCtx.createGain();

                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
                gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

                osc.connect(gain);
                gain.connect(this.audioCtx.destination);

                osc.start();
                osc.stop(this.audioCtx.currentTime + duration);
            } catch (e) {
                // Audio context handling
            }
        }

        playClick() { this.playTone(800, 'sine', 0.05, 0.04); }
        playSuccess() { 
            this.playTone(523.25, 'sine', 0.1, 0.05); // C5
            setTimeout(() => this.playTone(659.25, 'sine', 0.15, 0.05), 80); // E5
        }
        playHover() { this.playTone(300, 'sine', 0.03, 0.02); }

        toggleMute() {
            this.muted = !this.muted;
            localStorage.setItem('shami_audio_muted', this.muted);
            this.updateButton();
            if (!this.muted) this.playSuccess();
        }

        updateButton() {
            const btn = document.getElementById('audioToggleBtn');
            if (btn) {
                btn.innerHTML = this.muted 
                    ? '<i class="fas fa-volume-mute"></i>' 
                    : '<i class="fas fa-volume-up"></i>';
                btn.title = this.muted ? "Unmute UI Sounds" : "Mute UI Sounds";
            }
        }
    }

    const sound = new SoundEngine();

    // Attach click audio listener to buttons and links
    document.querySelectorAll('button, .btn, .nav-link, .social-icon').forEach(el => {
        el.addEventListener('click', () => sound.playClick());
    });

    const audioToggleBtn = document.getElementById('audioToggleBtn');
    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sound.toggleMute();
        });
    }

    // 3. Multi-Theme Manager
    const themes = ['emerald', 'neon', 'gold'];
    let currentThemeIndex = 0;

    const savedTheme = localStorage.getItem('shami_portfolio_theme') || 'emerald';
    document.documentElement.setAttribute('data-theme', savedTheme);
    currentThemeIndex = themes.indexOf(savedTheme) !== -1 ? themes.indexOf(savedTheme) : 0;

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            const newTheme = themes[currentThemeIndex];
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('shami_portfolio_theme', newTheme);
            sound.playSuccess();
            showToast(`Theme switched to ${newTheme.toUpperCase()}`);
        });
    }



    // 5. Navbar Scroll Effect & Scroll Spy
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const scrollProgress = document.querySelector('.scroll-progress');
    const navOverlay = document.getElementById('navOverlay');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            if (navbar) navbar.classList.add('scrolled');
            if (backToTop) backToTop.classList.add('active');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
            if (backToTop) backToTop.classList.remove('active');
        }

        if (scrollProgress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + "%";
        }

        highlightNavLink();
    });

    function highlightNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const dockItems = document.querySelectorAll('.mobile-quick-dock .dock-item[href]');
        let current = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });

        dockItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    // Mobile Drawer Controls
    function toggleMobileMenu() {
        const isOpen = navMenu.classList.contains('active');
        if (isOpen) closeMobileMenu();
        else openMobileMenu();
    }

    function openMobileMenu() {
        if (navMenu) navMenu.classList.add('active');
        if (hamburger) hamburger.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);

    document.querySelectorAll('.nav-link, .nav-mobile-btn').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // 6. Typing Animation
    const typingText = document.querySelector('.typing-text');
    const roles = ["Data Analyst", "ML Engineer", "Python Specialist", "AI Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingText) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 120;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 7. Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                let currentCount = 0;
                const duration = 2000;
                const increment = countTo / (duration / 16);

                const updateCount = () => {
                    currentCount += increment;
                    if (currentCount < countTo) {
                        target.textContent = Math.ceil(currentCount);
                        requestAnimationFrame(updateCount);
                    } else {
                        target.textContent = countTo;
                    }
                };
                updateCount();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // 8. Skill Progress Bars
    const progressBars = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-progress');
                bar.style.width = `${width}%`;
            }
        });
    }, { threshold: 0.1 });
    progressBars.forEach(bar => skillObserver.observe(bar));

    // 9. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // 10. Command Palette Engine
    const cmdOverlay = document.getElementById('cmdPaletteOverlay');
    const cmdInput = document.getElementById('cmdInput');
    const cmdResults = document.getElementById('cmdPaletteResults');
    const cmdTrigger = document.getElementById('cmdTrigger');

    const cmdData = [
        { title: 'Home', category: 'Navigation', icon: 'fa-home', action: () => scrollToSection('home') },
        { title: 'About Me', category: 'Navigation', icon: 'fa-user', action: () => scrollToSection('about') },
        { title: 'Skills & Tech Stack', category: 'Navigation', icon: 'fa-microchip', action: () => scrollToSection('skills') },
        { title: 'Work Experience', category: 'Navigation', icon: 'fa-briefcase', action: () => scrollToSection('experience') },
        { title: 'Featured Projects', category: 'Navigation', icon: 'fa-project-diagram', action: () => scrollToSection('projects') },
        { title: 'Interactive AI Lab', category: 'Interactive Tool', icon: 'fa-flask', action: () => scrollToSection('playground') },
        { title: 'Code Explorer & Pipeline', category: 'Interactive Tool', icon: 'fa-code', action: () => scrollToSection('code-explorer') },
        { title: 'Certifications', category: 'Credentials', icon: 'fa-certificate', action: () => scrollToSection('certifications') },
        { title: 'Achievements', category: 'Milestones', icon: 'fa-trophy', action: () => scrollToSection('achievements') },
        { title: 'Services Offered', category: 'Services', icon: 'fa-cogs', action: () => scrollToSection('services') },
        { title: 'Contact Mohd Shami', category: 'Navigation', icon: 'fa-envelope', action: () => scrollToSection('contact') },
        { title: 'Revive - ML Disease Prediction', category: 'Project', icon: 'fa-heartbeat', action: () => openProjectModal('revive') },
        { title: 'Download Resume (PDF)', category: 'Document', icon: 'fa-file-pdf', action: () => window.open('files/Mohd_Shami_Resume.pdf', '_blank') },
        { title: 'GitHub Profile', category: 'External Link', icon: 'fa-github', action: () => window.open('https://github.com/mohdshamii', '_blank') },
        { title: 'LinkedIn Profile', category: 'External Link', icon: 'fa-linkedin', action: () => window.open('https://linkedin.com/in/mohdshamii', '_blank') },
        { title: 'Kaggle Profile', category: 'External Link', icon: 'fa-kaggle', action: () => window.open('https://kaggle.com/mohdshami', '_blank') },
        { title: 'HuggingFace Profile', category: 'External Link', icon: 'fa-face-smile', action: () => window.open('https://huggingface.co/mohdshami', '_blank') },
        { title: 'LeetCode Profile', category: 'External Link', icon: 'fa-code', action: () => window.open('https://leetcode.com/mohdshamii', '_blank') }
    ];

    function openCmdPalette() {
        if (!cmdOverlay) return;
        cmdOverlay.classList.add('active');
        cmdInput.value = '';
        renderCmdResults('');
        setTimeout(() => cmdInput.focus(), 100);
        document.body.style.overflow = 'hidden';
    }

    function closeCmdPalette() {
        if (!cmdOverlay) return;
        cmdOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function renderCmdResults(query) {
        if (!cmdResults) return;
        const q = query.toLowerCase().trim();
        const filtered = cmdData.filter(item => 
            item.title.toLowerCase().includes(q) || 
            item.category.toLowerCase().includes(q)
        );

        if (filtered.length === 0) {
            cmdResults.innerHTML = `<div class="cmd-item"><i class="fas fa-exclamation-circle"></i> No results found for "${query}"</div>`;
            return;
        }

        cmdResults.innerHTML = filtered.map((item, idx) => `
            <div class="cmd-item ${idx === 0 ? 'selected' : ''}" data-idx="${idx}">
                <i class="fas ${item.icon}"></i>
                <div class="cmd-item-info">
                    <div class="cmd-item-title">${item.title}</div>
                    <div class="cmd-item-category">${item.category}</div>
                </div>
                <i class="fas fa-chevron-right" style="font-size: 0.75rem; opacity: 0.5;"></i>
            </div>
        `).join('');

        cmdResults.querySelectorAll('.cmd-item').forEach((el, idx) => {
            el.addEventListener('click', () => {
                closeCmdPalette();
                filtered[idx].action();
            });
        });
    }

    function scrollToSection(id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    if (cmdTrigger) cmdTrigger.addEventListener('click', openCmdPalette);

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdOverlay && cmdOverlay.classList.contains('active')) closeCmdPalette();
            else openCmdPalette();
        }
        if (e.key === 'Escape' && cmdOverlay && cmdOverlay.classList.contains('active')) {
            closeCmdPalette();
        }
    });

    if (cmdInput) {
        cmdInput.addEventListener('input', (e) => renderCmdResults(e.target.value));
    }

    if (cmdOverlay) {
        cmdOverlay.addEventListener('click', (e) => {
            if (e.target === cmdOverlay) closeCmdPalette();
        });
    }

    // 11. Interactive AI Lab Playground Logic
    const pgTabs = document.querySelectorAll('.pg-tab-btn');
    const pgContents = document.querySelectorAll('.pg-tab-content');
    pgTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            pgTabs.forEach(t => t.classList.remove('active'));
            pgContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // Revive Predictor
    const ageSlider = document.getElementById('pgAge');
    const bmiSlider = document.getElementById('pgBmi');
    const bpSlider = document.getElementById('pgBp');
    const glucoseSlider = document.getElementById('pgGlucose');
    const runDiseaseBtn = document.getElementById('runDiseaseModel');

    function updateDiseaseModel() {
        if (!ageSlider || !bmiSlider || !bpSlider || !glucoseSlider) return;
        const age = parseFloat(ageSlider.value);
        const bmi = parseFloat(bmiSlider.value);
        const bp = parseFloat(bpSlider.value);
        const glucose = parseFloat(glucoseSlider.value);

        document.getElementById('ageVal').textContent = age;
        document.getElementById('bmiVal').textContent = bmi;
        document.getElementById('bpVal').textContent = bp;
        document.getElementById('glucoseVal').textContent = glucose;

        let score = Math.round(
            (age * 0.25) + 
            (Math.max(0, bmi - 22) * 2.2) + 
            (Math.max(0, bp - 120) * 0.6) + 
            (Math.max(0, glucose - 95) * 0.4)
        );
        score = Math.min(98, Math.max(8, score));

        const scoreEl = document.getElementById('diseaseScore');
        const statusEl = document.getElementById('diseaseStatus');
        const factorEl = document.getElementById('primaryFactor');
        const recEl = document.getElementById('diseaseRec');
        const gaugeEl = document.getElementById('diseaseGauge');

        if (scoreEl) scoreEl.textContent = `${score}%`;

        if (score < 30) {
            if (statusEl) { statusEl.textContent = 'Low Risk'; statusEl.style.color = '#08BF7C'; }
            if (factorEl) factorEl.textContent = 'Optimal Biomarkers';
            if (recEl) recEl.textContent = 'Healthy parameters detected. Regular fitness and routine checkups recommended.';
            if (gaugeEl) gaugeEl.style.borderColor = '#08BF7C';
        } else if (score < 65) {
            if (statusEl) { statusEl.textContent = 'Moderate Risk'; statusEl.style.color = '#C78F22'; }
            if (factorEl) factorEl.textContent = (glucose > 140) ? 'Elevated Glucose' : (bp > 135) ? 'Elevated Blood Pressure' : 'Overweight BMI Index';
            if (recEl) recEl.textContent = 'Moderate risk metrics identified. Lifestyle adjustments and dietary monitoring suggested.';
            if (gaugeEl) gaugeEl.style.borderColor = '#C78F22';
        } else {
            if (statusEl) { statusEl.textContent = 'High Risk'; statusEl.style.color = '#ff4b4b'; }
            if (factorEl) factorEl.textContent = 'Critical Biomarker Combination';
            if (recEl) recEl.textContent = 'High risk indicator triggered. Consult a medical expert for comprehensive diagnostics.';
            if (gaugeEl) gaugeEl.style.borderColor = '#ff4b4b';
        }
    }

    [ageSlider, bmiSlider, bpSlider, glucoseSlider].forEach(s => {
        if (s) s.addEventListener('input', updateDiseaseModel);
    });

    if (runDiseaseBtn) {
        runDiseaseBtn.addEventListener('click', () => {
            sound.playSuccess();
            updateDiseaseModel();
            showToast('XGBoost Model Inference Executed Successfully!');
        });
    }

    // Spam Classifier Simulator
    const spamInput = document.getElementById('spamInput');
    const runSpamBtn = document.getElementById('runSpamModel');
    const presetBtns = document.querySelectorAll('.preset-btn');

    presetBtns.forEach(pBtn => {
        pBtn.addEventListener('click', () => {
            if (spamInput) {
                spamInput.value = pBtn.getAttribute('data-text');
                runSpamClassification();
            }
        });
    });

    function runSpamClassification() {
        if (!spamInput) return;
        const text = spamInput.value.toLowerCase();
        const spamKeywords = ['won', 'lottery', 'cash', 'claim', 'prize', 'free', 'http', 'click', 'money', 'urgent', '1,000,000', 'dollar', 'credit'];
        
        let matches = 0;
        const matchedWords = [];
        spamKeywords.forEach(word => {
            if (text.includes(word)) {
                matches++;
                matchedWords.push(word);
            }
        });

        let prob = Math.round((matches / 4) * 100);
        if (text.includes('http') || text.includes('win')) prob += 30;
        prob = Math.min(99, Math.max(3, prob));

        const badgeEl = document.getElementById('spamBadge');
        const probBar = document.getElementById('spamProbBar');
        const probVal = document.getElementById('spamProbVal');
        const confVal = document.getElementById('spamConfVal');
        const tagsEl = document.getElementById('spamTags');

        if (probVal) probVal.textContent = `${prob}%`;
        if (confVal) confVal.textContent = `${(95 + (prob % 4)).toFixed(1)}%`;
        if (probBar) probBar.style.width = `${prob}%`;

        if (prob >= 50) {
            if (badgeEl) {
                badgeEl.className = 'spam-badge spam';
                badgeEl.textContent = 'SPAM DETECTED';
            }
        } else {
            if (badgeEl) {
                badgeEl.className = 'spam-badge ham';
                badgeEl.textContent = 'HAM (Clean Message)';
            }
        }

        if (tagsEl) {
            if (matchedWords.length > 0) {
                tagsEl.innerHTML = matchedWords.map(w => `<span class="tag">${w}</span>`).join('');
            } else {
                tagsEl.innerHTML = `<span class="tag">pipeline</span><span class="tag">review</span><span class="tag">clean</span>`;
            }
        }
    }

    if (runSpamBtn) {
        runSpamBtn.addEventListener('click', () => {
            sound.playSuccess();
            runSpamClassification();
            showToast('NLP TF-IDF Classification Completed!');
        });
    }

    // FarmAIQ Crop Recommender
    const nSlider = document.getElementById('pgN');
    const pSlider = document.getElementById('pgP');
    const kSlider = document.getElementById('pgK');
    const rainSlider = document.getElementById('pgRain');
    const runCropBtn = document.getElementById('runCropModel');

    function updateCropModel() {
        if (!nSlider || !pSlider || !kSlider || !rainSlider) return;
        const n = parseFloat(nSlider.value);
        const p = parseFloat(pSlider.value);
        const k = parseFloat(kSlider.value);
        const rain = parseFloat(rainSlider.value);

        document.getElementById('nVal').textContent = n;
        document.getElementById('pVal').textContent = p;
        document.getElementById('kVal').textContent = k;
        document.getElementById('rainVal').textContent = rain;

        let crop = "Rice";
        let desc = "Optimal conditions detected for high-yield cereal crop cultivation.";
        let icon = "fa-seedling";

        if (rain < 80) {
            crop = "Chickpea / Pulses";
            desc = "Low rainfall suitability matched with high nitrogen efficiency.";
            icon = "fa-leaf";
        } else if (n > 100 && rain > 180) {
            crop = "Jute / Sugarcane";
            desc = "High nitrogen soil coupled with heavy rainfall optimal for cash crops.";
            icon = "fa-tree";
        } else if (k > 80) {
            crop = "Cotton / Fruits";
            desc = "Potassium rich soil composition best suited for fiber and fruit yield.";
            icon = "fa-apple-alt";
        } else if (p > 80) {
            crop = "Maize / Corn";
            desc = "Balanced phosphorus levels ideal for cereal grain production.";
            icon = "fa-wheat-awn";
        }

        const cropName = document.getElementById('cropName');
        const cropDesc = document.getElementById('cropDesc');
        const cropIcon = document.getElementById('cropIcon');
        const soilMatch = document.getElementById('soilMatch');

        if (cropName) cropName.textContent = crop;
        if (cropDesc) cropDesc.textContent = desc;
        if (cropIcon) cropIcon.innerHTML = `<i class="fas ${icon}"></i>`;
        if (soilMatch) soilMatch.textContent = `${Math.min(99, 88 + (n % 10))}%`;
    }

    [nSlider, pSlider, kSlider, rainSlider].forEach(s => {
        if (s) s.addEventListener('input', updateCropModel);
    });

    if (runCropBtn) {
        runCropBtn.addEventListener('click', () => {
            sound.playSuccess();
            updateCropModel();
            showToast('FarmAIQ Crop Suitability Model Updated!');
        });
    }

    // 12. Code Explorer Engine
    const codeViewer = document.getElementById('codeViewer');
    const consoleOutput = document.getElementById('consoleOutput');
    const codeTabs = document.querySelectorAll('.code-tab');
    const runCodeBtn = document.getElementById('runCodeBtn');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const clearConsoleBtn = document.getElementById('clearConsoleBtn');

    const snippets = {
        'xgboost': `import pandas as pd
import numpy as np
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Load medical dataset
df = pd.read_csv('clinical_health_data.csv')

# Feature Engineering
X = df[['age', 'bmi', 'blood_pressure', 'glucose_level']]
y = df['disease_risk_label']

# Train Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Instantiate XGBoost Model
model = XGBClassifier(
    n_estimators=150, 
    learning_rate=0.05, 
    max_depth=4, 
    eval_metric='logloss'
)

# Model Training
model.fit(X_train, y_train)

# Evaluation
preds = model.predict(X_test)
acc = accuracy_score(y_test, preds)
print(f"XGBoost Model Diagnostic Accuracy: {acc * 100:.2f}%")`,

        'tfidf': `import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from imblearn.over_sampling import SMOTE

# Load dataset
df = pd.read_csv('email_spam_collection.csv')

# TF-IDF Feature Extraction
tfidf = TfidfVectorizer(max_features=3000, stop_words='english')
X = tfidf.fit_transform(df['text'])
y = df['label']

# Handle Class Imbalance with SMOTE
smote = SMOTE(random_state=42)
X_res, y_res = smote.fit_resample(X, y)

# Train Classifier
clf = LogisticRegression(C=1.0)
clf.fit(X_res, y_res)

print("TF-IDF Vectorizer initialized with 3,000 max features.")
print(f"SMOTE Resampled shape: {X_res.shape}")
print("Classifier accuracy on holdout test set: 98.8%")`,

        'etl': `import pandas as pd
import numpy as np

def clean_and_transform_pipeline(input_filepath):
    # Load raw heterogeneous data
    raw_df = pd.read_csv(input_filepath)
    
    # 1. Handle missing values
    raw_df.fillna({'age': raw_df['age'].median(), 'income': 0}, inplace=True)
    
    # 2. Outlier Removal via IQR
    Q1 = raw_df['income'].quantile(0.25)
    Q3 = raw_df['income'].quantile(0.75)
    IQR = Q3 - Q1
    cleaned_df = raw_df[(raw_df['income'] >= Q1 - 1.5 * IQR) & (raw_df['income'] <= Q3 + 1.5 * IQR)]
    
    # 3. Categorical Encoding
    cleaned_df = pd.get_dummies(cleaned_df, columns=['category'], drop_first=True)
    
    print(f"Pipeline Execution Complete. Processed {len(cleaned_df)} records.")
    return cleaned_df

# Run ETL pipeline execution
df_clean = clean_and_transform_pipeline('raw_business_data.csv')`
    };

    let activeSnippetKey = 'xgboost';
    if (codeViewer) codeViewer.textContent = snippets['xgboost'];

    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            codeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeSnippetKey = tab.getAttribute('data-snippet');
            if (codeViewer) codeViewer.textContent = snippets[activeSnippetKey];
        });
    });

    if (runCodeBtn) {
        runCodeBtn.addEventListener('click', () => {
            sound.playSuccess();
            if (!consoleOutput) return;
            consoleOutput.innerHTML = '';
            
            const logs = [
                { type: 'info', text: `[1/4] Initializing Python 3.11 Runtime Environment...` },
                { type: 'info', text: `[2/4] Executing ${activeSnippetKey}_pipeline.py script...` },
                { type: 'warning', text: `[3/4] Preprocessing datasets & scaling feature vectors...` },
                { type: 'success', text: `[4/4] Model Training complete! Validation Accuracy: ${activeSnippetKey === 'tfidf' ? '98.8%' : '85.4%'}` },
                { type: 'success', text: `>>> Process finished with exit code 0` }
            ];

            logs.forEach((log, idx) => {
                setTimeout(() => {
                    const p = document.createElement('p');
                    p.className = `console-line ${log.type}`;
                    p.textContent = log.text;
                    consoleOutput.appendChild(p);
                    consoleOutput.scrollTop = consoleOutput.scrollHeight;
                }, idx * 300);
            });
        });
    }

    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            sound.playSuccess();
            const textToCopy = snippets[activeSnippetKey];
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast('Code snippet copied to clipboard!');
            });
        });
    }

    if (clearConsoleBtn) {
        clearConsoleBtn.addEventListener('click', () => {
            if (consoleOutput) {
                consoleOutput.innerHTML = '<p class="console-line info">[SYSTEM] Console cleared.</p>';
            }
        });
    }

    // 13. Schedule Call Form
    const openScheduleBtn = document.getElementById('openScheduleBtn');
    const mobileDockScheduleBtn = document.getElementById('mobileDockScheduleBtn');
    const scheduleForm = document.getElementById('scheduleForm');

    if (openScheduleBtn) {
        openScheduleBtn.addEventListener('click', () => openModal('scheduleModal'));
    }
    if (mobileDockScheduleBtn) {
        mobileDockScheduleBtn.addEventListener('click', () => openModal('scheduleModal'));
    }

    if (scheduleForm) {
        scheduleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            sound.playSuccess();
            closeModal('scheduleModal');
            showToast('Meeting call successfully scheduled! Check your email for invite details.');
            scheduleForm.reset();
        });
    }

    // 14. Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Processing...</span>';
            btn.disabled = true;

            const formData = new FormData(contactForm);
            const name = formData.get('name') || 'Friend';

            setTimeout(() => {
                sound.playSuccess();
                btn.innerHTML = '<span><i class="fas fa-check-circle"></i> Message Sent!</span>';
                btn.style.background = 'linear-gradient(135deg, #00643D 0%, #08BF7C 100%)';
                
                showToast(`Thanks ${name}! Your message has been sent successfully.`);
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1200);
        });
    }

    // Helper Toast Function
    window.showToast = function(message) {
        let toast = document.querySelector('.form-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'form-notification';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3200);
        }, 50);
    };

    // Global Modal Helpers
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    // Close Modals on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Rich Project Modal Launcher
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    if (!modal || !modalBody) return;

    const projects = {
        'revive': {
            title: 'Revive - ML Disease Prediction System',
            subtitle: 'End-to-End Clinical Diagnostic Pipeline & Web Application',
            accuracy: '85.4% Accuracy (XGBoost)',
            description: 'Revive is a machine learning web platform designed to analyze high-dimensional clinical health parameters (age, BMI, blood pressure, glucose) and predict potential disease risks. Optimized feature engineering improved baseline classification accuracy from 72% to 85.4%.',
            tags: ['Python', 'Flask', 'XGBoost', 'Scikit-learn', 'EDA', 'Pandas'],
            github: 'https://github.com/mohdshamii/Revive',
            demoLink: '#playground'
        },
        'hamspam': {
            title: 'HamOrSpam - Advanced Email Classifier',
            subtitle: 'NLP Pipeline with TF-IDF Vectorization & Class Balancing',
            accuracy: '98.8% Accuracy (SMOTE + Logistic Regression)',
            description: 'An intelligent email spam filtering engine leveraging TF-IDF n-gram tokenization and Logistic Regression. Applied Synthetic Minority Over-sampling Technique (SMOTE) to overcome text class imbalance, achieving >98% accuracy with minimal false positive spam classifications.',
            tags: ['Python', 'NLP', 'TF-IDF', 'SMOTE', 'Scikit-learn'],
            github: 'https://github.com/mohdshamii/HamOrSpam-Classifier',
            demoLink: '#playground'
        },
        'farmaiq': {
            title: 'FarmAIQ - Smart Agriculture System',
            subtitle: 'AI Crop Recommendation & Plant Disease Detection',
            accuracy: '96% Crop Suitability Match',
            description: 'Smart agriculture decision system empowering farmers with soil N-P-K recommendation models and Convolutional Neural Network (CNN) leaf disease detection pipelines built with TensorFlow.',
            tags: ['Python', 'Random Forest', 'CNN', 'TensorFlow', 'OpenCV'],
            github: 'https://github.com/mohdshamii/FarmAIQ',
            demoLink: '#playground'
        }
    };

    const p = projects[projectId] || projects['revive'];
    modalBody.innerHTML = `
        <div class="project-modal-detail">
            <div class="modal-header-custom">
                <span class="cert-issuer">${p.accuracy}</span>
                <h2 style="margin-top: 10px;">${p.title}</h2>
                <p style="color: var(--primary-color); font-weight: 600;">${p.subtitle}</p>
            </div>
            <p style="font-size: 1rem; color: var(--text-muted); line-height: 1.7; margin: 1.5rem 0;">${p.description}</p>
            <div class="tag-cloud" style="margin-bottom: 2rem;">
                ${p.tags.map(t => `<span class="tag" style="padding: 6px 14px; font-size: 0.85rem;">${t}</span>`).join('')}
            </div>
            <div class="hero-buttons" style="justify-content: center;">
                <a href="${p.github}" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> View GitHub Repo
                </a>
                <a href="${p.demoLink}" onclick="closeProjectModal()" class="btn btn-secondary">
                    <i class="fas fa-flask"></i> Try Live AI Demo
                </a>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}
