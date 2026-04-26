
        // Theme Toggle
        function toggleTheme() {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
        }

        // Reading Mode
        function toggleReadingMode() {
            document.body.classList.toggle('reading-mode');
        }

        // Scroll-based UI fade
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 100;
            document.body.classList.toggle('scrolled', scrolled);

            // Fade UI on scroll for reading mode
            const readingMode = document.body.classList.contains('reading-mode');
            const uiElements = document.querySelectorAll('header, .system-status');
            const opacity = scrolled && readingMode ? 0 : 1;

            uiElements.forEach(el => {
                el.style.opacity = opacity;
            });
        });

        // Intersection Observer for chapter animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0.2s';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.chapter').forEach(chapter => {
            observer.observe(chapter);
        });

        // Glitch effect on title hover
        document.querySelector('.chapter-title').addEventListener('mouseenter', function () {
            this.style.animation = 'glitch 0.3s infinite';
        });

        document.querySelector('.chapter-title').addEventListener('mouseleave', function () {
            this.style.animation = 'none';
        });

                fetch('chapter-1.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Gagal memuat file');
                }
                return response.text(); // Mengubah respon menjadi teks
            })
            .then(data => {
                // Memasukkan teks/HTML ke dalam div
                document.getElementById('konten-lain').innerHTML = data;
            })
            .catch(error => {
                console.error('Error:', error);
            });