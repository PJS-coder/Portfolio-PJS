class Portfolio {
    constructor() {
        this.data = null;
        this.init();
    }

    async init() {
        try {
            await this.loadPortfolioData();
            this.setupEventListeners();
            this.renderPortfolio();
            this.setupNavbarScrollEffect();
            this.setupItemObserver();
        } catch (error) {
            console.error('Failed to initialize portfolio:', error);
            this.showError('Failed to load portfolio data');
        }
    }

    async loadPortfolioData() {
        const response = await fetch('/api/portfolio');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        this.data = await response.json();
    }

    renderPortfolio() {
        if (!this.data) return;
        this.renderHero();
        this.renderAbout();
        this.renderExperience();
        this.renderProjects();
        this.renderEducation();
        this.renderSkills();
        this.renderContact();
    }

    renderHero() {
        const { personal } = this.data;
        document.getElementById('heroName').textContent = personal.name;
        document.getElementById('heroTitle').textContent = personal.title;
        document.getElementById('heroSubtitle').textContent = personal.subtitle;
        document.getElementById('heroBio').textContent = personal.bio;
        document.getElementById('heroLocation').textContent = personal.location;
        document.getElementById('heroEmail').textContent = personal.email;

        const heroAvatar = document.querySelector('.hero-avatar');
        if (heroAvatar) {
            const img = heroAvatar.querySelector('img');
            if (img) {
                img.addEventListener('load', () => {
                    heroAvatar.style.background = 'none';
                });
            }
        }

        document.getElementById('resumeBtn').href = personal.resumeLink;
        document.getElementById('githubLink').href = personal.github;
        document.getElementById('linkedinLink').href = personal.linkedin;
        document.getElementById('emailLink').href = `mailto:${personal.email}`;
    }

    renderAbout() {
        const { personal } = this.data;
        document.getElementById('aboutBio').textContent = personal.bio;
    }

    renderExperience() {
        const { experience } = this.data;
        const container = document.getElementById('experienceList');
        container.innerHTML = experience.map((exp, index) => `
            <div class="timeline-item item-box" style="transition-delay:${index * 0.1}s">
                <div class="timeline-card">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h4 class="h5 mb-1">${exp.title}</h4>
                            <h5 class="h6 text-primary mb-2">${exp.company}</h5>
                        </div>
                        <div class="text-end">
                            <small class="text-muted"><i class="fas fa-calendar me-1"></i>${exp.duration}</small><br>
                            <small class="text-muted"><i class="fas fa-map-marker-alt me-1"></i>${exp.location}</small>
                        </div>
                    </div>
                    <p class="text-muted mb-3">${exp.description}</p>
                    <div>
                        <h6 class="small fw-bold mb-2">Technologies Used:</h6>
                        <div>${exp.skills.map(s => `<span class="tech-badge">${s}</span>`).join('')}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderProjects() {
        const { projects } = this.data;
        const container = document.getElementById('projectsList');
        container.innerHTML = projects.map((p, index) => `
            <div class="col-lg-12 mb-5 item-box" style="transition-delay:${index * 0.1}s">
                <div class="card project-card">
                    <div class="row g-0">
                        <div class="col-md-5">
                            <img src="${p.image}" class="card-img project-image w-100" alt="${p.title}">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <h5 class="card-title">${p.title}</h5>
                                <p class="card-text">${p.description}</p>
                                <div class="mb-3">
                                    <h6 class="small fw-bold">Technologies Used:</h6>
                                    <div>${p.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}</div>
                                </div>
                                <div class="mb-3">
                                    <h6 class="small fw-bold">Key Features:</h6>
                                    <ul class="small">${p.features.slice(0,4).map(f => `<li>${f}</li>`).join('')}</ul>
                                </div>
                                <div class="d-flex gap-2">
                                    <a href="${p.liveDemo}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-eye me-1"></i>Live Demo</a>
                                    <a href="${p.github}" target="_blank" class="btn btn-outline-secondary btn-sm"><i class="fab fa-github me-1"></i>View Code</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderEducation() {
        const { education } = this.data;
        const container = document.getElementById('educationList');
        container.innerHTML = education.map((edu, index) => `
            <div class="timeline-item item-box" style="transition-delay:${index * 0.1}s">
                <div class="timeline-card">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h4 class="h5 mb-1">${edu.degree}</h4>
                            <h5 class="h6 text-primary mb-2">${edu.institution}</h5>
                        </div>
                        <div class="text-end">
                            <small class="text-muted"><i class="fas fa-calendar me-1"></i>${edu.duration}</small><br>
                            <small class="text-success fw-bold"><i class="fas fa-award me-1"></i>${edu.grade}</small>
                        </div>
                    </div>
                    ${edu.relevantCourses ? `<div><h6 class="small fw-bold mb-2">Relevant Coursework:</h6><div>${edu.relevantCourses.map(c => `<span class="tech-badge">${c}</span>`).join('')}</div></div>` : ''}
                    ${edu.stream ? `<p class="text-muted mt-2"><strong>Stream:</strong> ${edu.stream}</p>` : ''}
                </div>
            </div>
        `).join('');
    }

    renderSkills() {
        const { skills, languages, interests } = this.data;
        const skillCategories = [
            { title: 'Frontend', icon: 'fas fa-globe', skills: skills.frontend, color: 'primary' },
            { title: 'Backend', icon: 'fas fa-server', skills: skills.backend, color: 'success' },
            { title: 'Tools & Tech', icon: 'fas fa-tools', skills: skills.tools, color: 'warning' },
            { title: 'Programming', icon: 'fas fa-code', skills: skills.languages, color: 'danger' }
        ];
        const container = document.getElementById('skillsContainer');
        container.innerHTML = skillCategories.map((cat, index) => `
            <div class="col-lg-6 col-md-6 mb-4 item-box" style="transition-delay:${index * 0.1}s">
                <div class="skill-category">
                    <div class="d-flex align-items-center mb-3">
                        <div class="skill-icon bg-${cat.color} text-white me-3"><i class="${cat.icon}"></i></div>
                        <h5 class="mb-0">${cat.title}</h5>
                    </div>
                    <div>${cat.skills.map(s => `<span class="skill-badge">${s}</span>`).join('')}</div>
                </div>
            </div>
        `).join('');

        document.getElementById('languagesList').innerHTML = languages.map(lang => `
            <div class="d-flex justify-content-between align-items-center mb-2 item-box">
                <span class="fw-medium">${lang.name}</span>
                <span class="badge bg-primary">${lang.proficiency}</span>
            </div>
        `).join('');

        document.getElementById('interestsList').innerHTML =
            interests.map(i => `<span class="skill-badge item-box">${i}</span>`).join('');
    }

    renderContact() {
        const { personal } = this.data;
        document.getElementById('footerEmail').textContent = personal.email;
        document.getElementById('footerLocation').textContent = personal.location;
        document.getElementById('footerName').textContent = personal.name;
        document.getElementById('footerGithub').href = personal.github;
        document.getElementById('footerLinkedin').href = personal.linkedin;
        document.getElementById('footerEmailLink').href = `mailto:${personal.email}`;
    }

    setupEventListeners() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                const navbarHeight = document.getElementById('mainNav')?.offsetHeight || 70;
                const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
}

            });
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            });
        });
    }

    setupNavbarScrollEffect() {
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('mainNav');
            if (window.scrollY > 100) navbar.classList.add('navbar-scrolled');
            else navbar.classList.remove('navbar-scrolled');
        });
    }

    setupItemObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible when entering viewport
                    entry.target.classList.add('visible');
                } else {
                    // Remove visible when leaving viewport (so animation can play again)
                    entry.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.01 });

        document.querySelectorAll('.item-box').forEach(el => observer.observe(el));
    }


    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger alert-dismissible fade show position-fixed';
        errorDiv.style.cssText = 'top: 100px; right: 20px; z-index: 9999; max-width: 400px;';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle me-2"></i>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => new Portfolio());
window.addEventListener('load', () => {
    document.querySelectorAll('.loading').forEach(el => el.style.display = 'none');
});
