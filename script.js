/* =====================================================
   DHEERAJ SINGH PORTFOLIO
   COMPLETE JAVASCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const html = document.documentElement;

const themeToggle =
    document.getElementById("themeToggle");

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");

const typedRole =
    document.getElementById("typedRole");

const currentYear =
    document.getElementById("currentYear");


/* =====================================================
   YEAR
===================================================== */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   DARK / LIGHT THEME
===================================================== */

function setTheme(theme) {

    if (theme === "light") {

        html.setAttribute(
            "data-theme",
            "light"
        );

        themeToggle.textContent =
            "☀️";

    } else {

        html.removeAttribute(
            "data-theme"
        );

        themeToggle.textContent =
            "🌙";
    }
}


/* Get saved theme */

let savedTheme = null;

try {

    savedTheme =
        localStorage.getItem(
            "dheeraj-portfolio-theme"
        );

} catch (error) {

    savedTheme = null;
}


/* Start with dark theme */

setTheme(
    savedTheme === "light"
        ? "light"
        : "dark"
);


/* Theme button */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            const isLight =
                html.getAttribute(
                    "data-theme"
                ) === "light";


            const nextTheme =
                isLight
                    ? "dark"
                    : "light";


            setTheme(nextTheme);


            try {

                localStorage.setItem(
                    "dheeraj-portfolio-theme",
                    nextTheme
                );

            } catch (error) {

                /* Local storage unavailable.
                   Theme still changes normally. */

            }

        }
    );
}


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                navLinks.classList.toggle(
                    "open"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            menuToggle.textContent =
                isOpen
                    ? "✕"
                    : "☰";

        }
    );
}


/* Close menu when link clicked */

const navigationItems =
    document.querySelectorAll(
        ".nav-links a"
    );


navigationItems.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.classList.remove(
                    "open"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuToggle.textContent =
                    "☰";

            }
        );

    }
);


/* =====================================================
   TYPING EFFECT
===================================================== */

const roles = [

    "Python Programmer",

    "Aspiring Software Developer",

    "BCA Student",

    "Problem Solver"

];


let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeRole() {

    if (!typedRole) {
        return;
    }


    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        characterIndex++;


        typedRole.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;


            setTimeout(
                typeRole,
                1400
            );


            return;
        }


        setTimeout(
            typeRole,
            70
        );


    } else {

        characterIndex--;


        typedRole.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        if (characterIndex === 0) {

            deleting = false;


            roleIndex =
                (roleIndex + 1)
                % roles.length;


            setTimeout(
                typeRole,
                300
            );


            return;
        }


        setTimeout(
            typeRole,
            40
        );
    }
}


/* Check reduced motion */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (reducedMotion) {

    if (typedRole) {

        typedRole.textContent =
            roles[0];

    }

} else {

    typeRole();

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );


} else {

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "visible"
            );

        }
    );
}


/* =====================================================
   SKILL BAR ANIMATION
===================================================== */

const skillsSection =
    document.getElementById(
        "skills"
    );


const skillItems =
    document.querySelectorAll(
        ".skill-item"
    );


let skillsAnimated = false;


function animateSkills() {

    if (skillsAnimated) {
        return;
    }


    skillsAnimated = true;


    skillItems.forEach(
        function (skill, index) {

            const level =
                skill.getAttribute(
                    "data-level"
                );


            const fill =
                skill.querySelector(
                    ".skill-fill"
                );


            if (!fill || !level) {
                return;
            }


            setTimeout(
                function () {

                    fill.style.width =
                        level + "%";

                },
                index * 120
            );

        }
    );
}


if (
    skillsSection &&
    "IntersectionObserver" in window
) {

    const skillsObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            animateSkills();


                            skillsObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.25
            }
        );


    skillsObserver.observe(
        skillsSection
    );


} else {

    animateSkills();

}


/* =====================================================
   PROJECT FILTER
===================================================== */

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );


const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {


                /* Remove active */

                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                /* Activate selected */

                button.classList.add(
                    "active"
                );


                const filter =
                    button.getAttribute(
                        "data-filter"
                    );


                projectCards.forEach(
                    function (card) {

                        const category =
                            card.getAttribute(
                                "data-category"
                            );


                        if (
                            filter === "all" ||
                            category === filter
                        ) {

                            card.classList.remove(
                                "hidden"
                            );

                        } else {

                            card.classList.add(
                                "hidden"
                            );

                        }

                    }
                );

            }
        );

    }
);


/* =====================================================
   DISABLED LINKS
===================================================== */

const disabledLinks =
    document.querySelectorAll(
        ".disabled-link"
    );


disabledLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

            }
        );

    }
);


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


if (
    "IntersectionObserver" in window
) {

    const navigationObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {


                            navItems.forEach(
                                function (link) {

                                    link.classList.remove(
                                        "active"
                                    );

                                }
                            );


                            const activeLink =
                                document.querySelector(
                                    `.nav-links a[href="#${entry.target.id}"]`
                                );


                            if (activeLink) {

                                activeLink.classList.add(
                                    "active"
                                );

                            }

                        }

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        function (section) {

            navigationObserver.observe(
                section
            );

        }
    );
}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            navLinks.classList.remove(
                "open"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            menuToggle.textContent =
                "☰";

        }

    }
);