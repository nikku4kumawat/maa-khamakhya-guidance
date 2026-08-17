document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       WHATSAPP ICONS
    ========================================== */

    document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {

        if (!link.querySelector(".fa-whatsapp")) {

            const icon = document.createElement("i");

            icon.className = "fa-brands fa-whatsapp wa-icon";

            link.prepend(icon);
        }

    });


    /* =========================================
       MOBILE MENU
    ========================================== */

    const menuButton = document.querySelector(".menu");
    const navigation = document.querySelector("nav");

    menuButton?.addEventListener("click", () => {

        navigation?.classList.toggle("open");

    });


    /* Close menu after clicking navigation link */

    navigation?.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("open");

        });

    });


    /* =========================================
       REVEAL ANIMATION
    ========================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach((element) => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =========================================
       GALLERY LIGHTBOX
    ========================================== */

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const lightboxClose = lightbox?.querySelector("button");


    document.querySelectorAll(".gallery-item").forEach((item) => {

        item.addEventListener("click", () => {

            const image = item.querySelector("img");

            if (
                lightbox &&
                lightboxImage &&
                image
            ) {

                lightboxImage.src = image.src;

                lightboxImage.alt = image.alt || "Gallery preview";

                lightbox.classList.add("active");

                document.body.style.overflow = "hidden";

            }

        });

    });


    /* Close lightbox */

    const closeLightbox = () => {

        lightbox?.classList.remove("active");

        document.body.style.overflow = "";

    };


    lightbox?.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    lightboxClose?.addEventListener("click", () => {

        closeLightbox();

    });


    /* =========================================
       ESC KEY FOR LIGHTBOX
    ========================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeLightbox();

        }

    });


    /* =========================================
       CONSULTATION FORM
    ========================================== */

    const consultationForm = document.querySelector(".form");

    consultationForm?.addEventListener("submit", (event) => {

        event.preventDefault();


        const data = new FormData(consultationForm);


        const name = data.get("name") || "";
        const email = data.get("email") || "";
        const consultation = data.get("type") || "";
        const message = data.get("message") || "";


        const whatsappMessage =
`Hello Deepak Joshi Tantra Research Center,

Name: ${name}
Email: ${email}
Consultation: ${consultation}
Message: ${message}`;


        const whatsappURL =
            "https://wa.me/916376242797?text=" +
            encodeURIComponent(whatsappMessage);


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });


    /* =========================================
       SMOOTH HEADER OFFSET
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }


            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                document.querySelector("header")?.offsetHeight || 0;

            const announcementHeight =
                document.querySelector(".announcement")?.offsetHeight || 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                announcementHeight -
                10;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

});