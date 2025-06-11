tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    animation: {
                        'fade-in': 'fadeIn 0.8s ease-out',
                        'slide-up': 'slideUp 0.6s ease-out',
                        'scale-in': 'scaleIn 0.5s ease-out',
                        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'bounce': 'bounce 1s infinite',
                        'rotate': 'rotate 2s linear infinite',
                        'float': 'float 3s ease-in-out infinite',
                        'shake': 'shake 0.5s ease-in-out',
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' },
                        },
                        scaleIn: {
                            '0%': { transform: 'scale(0.8)', opacity: '0' },
                            '100%': { transform: 'scale(1)', opacity: '1' },
                        }
                    }
                }
            }
        }


 
        // Botão Toggle
        const themeToggleBtn = document.getElementById('theme-toggle');
        const html = document.documentElement;
        
        
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        
        themeToggleBtn.addEventListener('click', () => {
            html.classList.toggle('dark');
            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        });
        
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-button');
        const navLateral = document.getElementById('nav-lateral');
        const backdrop = document.getElementById('backdrop');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLateral.classList.toggle('-translate-x-full');
            backdrop.classList.toggle('hidden');
            
            // Trigger menu item animations when opening
            if (!navLateral.classList.contains('-translate-x-full')) {
                document.querySelectorAll('.animate-menu-item').forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, index * 100);
                });
            }
        });
        
        backdrop.addEventListener('click', () => {
            navLateral.classList.add('-translate-x-full');
            backdrop.classList.add('hidden');
        });
        
        
        
        // Intersection Observer to trigger animations when elements are in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-scale-in');
                    
                    if (entry.target === skillBarContainer) {
                        animateSkillBars();
                        observer.unobserve(entry.target); // Only animate once
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
        
        // Project preview effect
        const preview = document.createElement('div');
        preview.className = 'project-preview';
        document.body.appendChild(preview);

        const projectImages = document.querySelectorAll('.project-image-hover');
        
        projectImages.forEach(image => {
            const previewSource = image.parentElement.querySelector('.project-preview-source');
            
            image.addEventListener('mouseenter', () => {
                if (previewSource) {
                    preview.innerHTML = `<img src="${previewSource.src}" alt="Project preview">`;
                    preview.classList.add('active');
                }
            });
            
            image.addEventListener('mouseleave', () => {
                preview.classList.remove('active');
            });
            
            image.addEventListener('mousemove', (e) => {
                const rect = image.getBoundingClientRect();
                const x = e.clientX;
                const y = e.clientY;
                
                // Position the preview to the right of the cursor
                preview.style.left = (x + 20) + 'px';
                preview.style.top = (y - 100) + 'px';  // Center vertically relative to cursor
            });
        });

        // Animate project cards sequentially
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
