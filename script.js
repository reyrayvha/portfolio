// ================================================
//  Caesar Rayvha Portfolio — script.js
// ================================================

document.addEventListener("DOMContentLoaded", () => {

    // ── Theme Toggle ──────────────────────────────
    const html = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    const savedTheme = localStorage.getItem("theme") || "light";
    html.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
    }

    // ── Navbar Scroll ─────────────────────────────
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }, { passive: true });

    // ── Scroll Progress Bar ───────────────────────
    const progressBar = document.getElementById("scrollProgress");
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = pct + "%";
    }, { passive: true });

    // ── Back to Top ───────────────────────────────
    const backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ── Hamburger / Mobile Menu ───────────────────
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        const isOpen = navMenu.classList.contains("open");
        hamburger.setAttribute("aria-expanded", isOpen);
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
        });
    });

    // ── Scroll Reveal (IntersectionObserver) ─────
    const reveals = document.querySelectorAll(".reveal-up, .reveal-fade, .reveal-left, .reveal-scale");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.dataset.delay || 0);
                setTimeout(() => {
                    el.classList.add("active");
                }, delay);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));

    // ── Cinema Widget ─────────────────────────────
    const movieDB = {
        "Sci-Fi": {
            "Mind-Bending": [
                { title: "Interstellar", year: 2014, genre: "Sci-Fi / Drama", match: 98 },
                { title: "Arrival", year: 2016, genre: "Sci-Fi / Mystery", match: 95 },
                { title: "Ex Machina", year: 2014, genre: "Sci-Fi / Thriller", match: 92 }
            ],
            "Intense": [
                { title: "Alien: Romulus", year: 2024, genre: "Sci-Fi / Horror", match: 96 },
                { title: "Dune: Part Two", year: 2024, genre: "Sci-Fi / Epic", match: 93 },
                { title: "Edge of Tomorrow", year: 2014, genre: "Sci-Fi / Action", match: 89 }
            ],
            "Feel-Good": [
                { title: "The Martian", year: 2015, genre: "Sci-Fi / Comedy", match: 94 },
                { title: "WALL-E", year: 2008, genre: "Sci-Fi / Animation", match: 97 },
                { title: "Galaxy Quest", year: 1999, genre: "Sci-Fi / Comedy", match: 90 }
            ],
            "Relaxed": [
                { title: "Contact", year: 1997, genre: "Sci-Fi / Drama", match: 91 },
                { title: "Moon", year: 2009, genre: "Sci-Fi / Drama", match: 88 },
                { title: "Annihilation", year: 2018, genre: "Sci-Fi / Mystery", match: 85 }
            ]
        },
        "Thriller": {
            "Mind-Bending": [
                { title: "Inception", year: 2010, genre: "Thriller / Sci-Fi", match: 99 },
                { title: "Shutter Island", year: 2010, genre: "Thriller / Mystery", match: 96 },
                { title: "Memento", year: 2000, genre: "Thriller / Neo-Noir", match: 94 }
            ],
            "Intense": [
                { title: "Parasite", year: 2019, genre: "Thriller / Drama", match: 98 },
                { title: "No Country for Old Men", year: 2007, genre: "Thriller / Crime", match: 95 },
                { title: "Prisoners", year: 2013, genre: "Thriller / Drama", match: 92 }
            ],
            "Feel-Good": [
                { title: "Knives Out", year: 2019, genre: "Thriller / Mystery", match: 97 },
                { title: "The Grand Budapest Hotel", year: 2014, genre: "Thriller / Comedy", match: 94 },
                { title: "Clue", year: 1985, genre: "Thriller / Comedy", match: 90 }
            ],
            "Relaxed": [
                { title: "Gone Girl", year: 2014, genre: "Thriller / Drama", match: 93 },
                { title: "The Girl with the Dragon Tattoo", year: 2011, genre: "Thriller / Mystery", match: 89 },
                { title: "Zodiac", year: 2007, genre: "Thriller / Crime", match: 87 }
            ]
        },
        "Drama": {
            "Mind-Bending": [
                { title: "Eternal Sunshine", year: 2004, genre: "Drama / Romance", match: 97 },
                { title: "The Tree of Life", year: 2011, genre: "Drama / Art", match: 91 },
                { title: "Synecdoche, New York", year: 2008, genre: "Drama / Art", match: 88 }
            ],
            "Feel-Good": [
                { title: "The Shawshank Redemption", year: 1994, genre: "Drama", match: 99 },
                { title: "Dead Poets Society", year: 1989, genre: "Drama", match: 96 },
                { title: "Good Will Hunting", year: 1997, genre: "Drama", match: 94 }
            ],
            "Intense": [
                { title: "12 Years a Slave", year: 2013, genre: "Drama / Historical", match: 96 },
                { title: "Requiem for a Dream", year: 2000, genre: "Drama", match: 90 },
                { title: "Whiplash", year: 2014, genre: "Drama / Music", match: 98 }
            ],
            "Relaxed": [
                { title: "Before Sunrise", year: 1995, genre: "Drama / Romance", match: 95 },
                { title: "Lost in Translation", year: 2003, genre: "Drama", match: 92 },
                { title: "About Time", year: 2013, genre: "Drama / Romance", match: 94 }
            ]
        },
        "Action": {
            "Intense": [
                { title: "Mad Max: Fury Road", year: 2015, genre: "Action / Sci-Fi", match: 98 },
                { title: "John Wick", year: 2014, genre: "Action / Thriller", match: 96 },
                { title: "The Dark Knight", year: 2008, genre: "Action / Superhero", match: 99 }
            ],
            "Mind-Bending": [
                { title: "Everything Everywhere All at Once", year: 2022, genre: "Action / Sci-Fi", match: 97 },
                { title: "The Matrix", year: 1999, genre: "Action / Sci-Fi", match: 98 },
                { title: "Spider-Man: Into the Spider-Verse", year: 2018, genre: "Action / Animation", match: 96 }
            ],
            "Feel-Good": [
                { title: "Guardians of the Galaxy", year: 2014, genre: "Action / Comedy", match: 95 },
                { title: "Thor: Ragnarok", year: 2017, genre: "Action / Comedy", match: 93 },
                { title: "The Princess Bride", year: 1987, genre: "Action / Comedy", match: 97 }
            ],
            "Relaxed": [
                { title: "Indiana Jones Raiders", year: 1981, genre: "Action / Adventure", match: 96 },
                { title: "The Mummy", year: 1999, genre: "Action / Adventure", match: 91 },
                { title: "Stardust", year: 2007, genre: "Action / Fantasy", match: 90 }
            ]
        },
        "Mystery": {
            "Mind-Bending": [
                { title: "Mulholland Drive", year: 2001, genre: "Mystery / Surreal", match: 93 },
                { title: "The Prestige", year: 2006, genre: "Mystery / Thriller", match: 97 },
                { title: "Coherence", year: 2013, genre: "Mystery / Sci-Fi", match: 90 }
            ],
            "Intense": [
                { title: "Se7en", year: 1995, genre: "Mystery / Crime", match: 96 },
                { title: "Rear Window", year: 1954, genre: "Mystery / Thriller", match: 98 },
                { title: "Oldboy", year: 2003, genre: "Mystery / Thriller", match: 94 }
            ],
            "Feel-Good": [
                { title: "The Curious Case of Benjamin Button", year: 2008, genre: "Mystery / Drama", match: 93 },
                { title: "Miss Pettigrew Lives for a Day", year: 2008, genre: "Mystery / Comedy", match: 88 },
                { title: "Agatha Christie Poirot", year: 1989, genre: "Mystery / TV", match: 91 }
            ],
            "Relaxed": [
                { title: "Rebecca", year: 1940, genre: "Mystery / Romance", match: 94 },
                { title: "Portrait of a Lady on Fire", year: 2019, genre: "Mystery / Romance", match: 96 },
                { title: "The Secret in Their Eyes", year: 2009, genre: "Mystery / Drama", match: 92 }
            ]
        }
    };

    let selectedGenre = "Sci-Fi";
    let selectedMood = "Mind-Bending";

    document.getElementById("genreChips").addEventListener("click", e => {
        const chip = e.target.closest(".genre-chip");
        if (!chip) return;
        document.querySelectorAll(".genre-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        selectedGenre = chip.dataset.genre;
    });

    document.getElementById("moodChips").addEventListener("click", e => {
        const chip = e.target.closest(".mood-chip");
        if (!chip) return;
        document.querySelectorAll(".mood-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        selectedMood = chip.dataset.mood;
    });

    document.getElementById("getRecommendation").addEventListener("click", () => {
        const btn = document.getElementById("getRecommendation");
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';

        setTimeout(() => {
            const result = document.getElementById("widgetResult");
            const genreData = movieDB[selectedGenre] || movieDB["Sci-Fi"];
            const moodData = genreData[selectedMood] || Object.values(genreData)[0];

            const html = moodData.map((film, i) => {
                const rank = ["01", "02", "03"][i];
                return '<div class="film-recommendation">' +
                    '<div class="film-rec-header">' +
                        '<div class="film-rank">' + rank + '</div>' +
                        '<div class="film-info">' +
                            '<h4>' + film.title + ' (' + film.year + ')</h4>' +
                            '<div class="film-meta">' + film.genre + '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="match-bar-wrap">' +
                        '<div class="match-bar"><div class="match-fill" data-match="' + film.match + '"></div></div>' +
                        '<div class="match-pct">' + film.match + '%</div>' +
                    '</div>' +
                '</div>';
            }).join('');

            result.innerHTML = html;

            // Animate bars after render
            requestAnimationFrame(() => {
                setTimeout(() => {
                    document.querySelectorAll(".match-fill").forEach(fill => {
                        fill.style.width = fill.dataset.match + "%";
                    });
                }, 50);
            });

            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Get AI Recommendation';
        }, 800);
    });

    // ── Contact Form ──────────────────────────────
    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");

    contactForm.addEventListener("submit", e => {
        e.preventDefault();
        const btnText = submitBtn.querySelector(".btn-text");
        const btnLoading = submitBtn.querySelector(".btn-loading");

        const name    = document.getElementById("name").value.trim();
        const email   = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim() || "Pesan dari Portfolio";
        const message = document.getElementById("message").value.trim();

        submitBtn.disabled = true;
        btnText.classList.add("hidden");
        btnLoading.classList.remove("hidden");

        // Buat mailto link dengan data form agar email terkirim ke reyrayvha@gmail.com
        const body = `Nama: ${name}\nEmail: ${email}\n\n${message}`;
        const mailtoURL = `mailto:reyrayvha@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setTimeout(() => {
            window.location.href = mailtoURL;

            submitBtn.disabled = false;
            btnText.classList.remove("hidden");
            btnLoading.classList.add("hidden");
            contactForm.reset();
            showToast("Email client dibuka! Silakan kirim pesanmu. 📬");
        }, 800);
    });

    // ── Toast Notification ────────────────────────
    function showToast(msg) {
        const toast = document.getElementById("toast");
        const toastMsg = document.getElementById("toastMsg");
        toastMsg.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 4000);
    }

    // ── Active Nav Link on Scroll ─────────────────
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));

});
