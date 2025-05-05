// Get current page's filename
const currentPage = window.location.pathname.split("/").pop();

// Loop through all nav links
document.querySelectorAll(".nav-menu-link").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// Initialize GSAP animations
document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navbarMenu = document.querySelector(".navbar-menu");
  const mobileMenuIcon = mobileMenuToggle.querySelector("i");

  // Mobile menu toggle logic
  mobileMenuToggle.addEventListener("click", function () {
    navbarMenu.classList.toggle("active");

    // Toggle icon class
    mobileMenuIcon.classList.toggle("fa-bars");
    mobileMenuIcon.classList.toggle("fa-times");
  });

  // Scroll to top button
  const scrollTopBtn = document.querySelector(".scroll-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 3D Background
  function init3DBackground() {
    const canvas = document.getElementById("bg-canvas");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x4f46e5, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;

    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.8,
    });

    // Create the particle system
    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create floating spheres
    const spheres = [];
    for (let i = 0; i < 7; i++) {
      const geometry = new THREE.SphereGeometry(
        Math.random() * 1.5 + 0.5,
        32,
        32
      );
      const material = new THREE.MeshPhongMaterial({
        color: 0x4f46e5,
        transparent: true,
        opacity: 0.6,
        wireframe: Math.random() > 0.5,
      });
      const sphere = new THREE.Mesh(geometry, material);

      sphere.position.x = (Math.random() - 0.5) * 40;
      sphere.position.y = (Math.random() - 0.5) * 40;
      sphere.position.z = (Math.random() - 0.5) * 40;

      sphere.velocity = {
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05,
      };

      spheres.push(sphere);
      scene.add(sphere);
    }

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Track mouse movement
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Rotate particle system
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;

      // Move and rotate spheres
      spheres.forEach((sphere) => {
        sphere.position.x += sphere.velocity.x;
        sphere.position.y += sphere.velocity.y;
        sphere.position.z += sphere.velocity.z;

        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;

        // Bounce off invisible boundaries
        if (Math.abs(sphere.position.x) > 40) sphere.velocity.x *= -1;
        if (Math.abs(sphere.position.y) > 40) sphere.velocity.y *= -1;
        if (Math.abs(sphere.position.z) > 40) sphere.velocity.z *= -1;
      });

      // Move camera slightly based on mouse position
      camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.1 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();
  }

  // GSAP Animations
  function initAnimations() {
    // Hero section animations
    gsap.from(".hero-title", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".hero-subtitle", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(".hero-buttons", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from(".code-snippet", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.7,
      ease: "power3.out",
    });

    gsap.from(".search-container", {
      y: 60, // Start 60px below final position
      opacity: 0, // Start fully transparent
      duration: 1, // Animation takes 1 second
      ease: "power3.out", // Easing function for smooth animation
      scrollTrigger: {
        trigger: ".search-demo", // Element that triggers the animation
        start: "top 80%", // Animation starts when top of trigger element hits 80% down the viewport
      },
    });

    const statsElements = [
      { id: "stat-queries", target: 15783 },
      { id: "stat-users", target: 9427 },
      { id: "stat-vulns", target: 31549 },
      { id: "stat-sites", target: 5632 },
    ];

    statsElements.forEach((item) => {
      const element = document.getElementById(item.id);
      let currentValue = 0;

      gsap.to(
        {},
        {
          duration: 2,
          onUpdate: function () {
            const progress = this.progress();
            currentValue = Math.floor(item.target * progress);
            element.textContent = currentValue.toLocaleString();
          },
          scrollTrigger: {
            trigger: ".stats",
            start: "top 80%",
          },
        }
      );
    });

    gsap.to(".hero", {
      backgroundPositionY: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // CTA section animations
    gsap.from(".cta-title, .cta-subtitle, .cta .btn", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cta",
        start: "top 80%",
      },
    });
  }

  // Typing effect for the hero title
  function initTypingEffect() {
    const typingTitle = document.getElementById("typing-title");
    const originalText = typingTitle.textContent;
    typingTitle.textContent = "";
    typingTitle.classList.add("typing-effect");

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < originalText.length) {
        typingTitle.textContent += originalText.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          typingTitle.classList.remove("typing-effect");
        }, 1000);
      }
    }, 50);

    // Typing effect for code example
    const typingCode = document.getElementById("typing-code");
    const codeText = typingCode.textContent;
    typingCode.textContent = "";

    setTimeout(() => {
      let j = 0;
      const codeTypeInterval = setInterval(() => {
        if (j < codeText.length) {
          typingCode.textContent += codeText.charAt(j);
          j++;
        } else {
          clearInterval(codeTypeInterval);
        }
      }, 30);
    }, 1000);
  }

  // Example click handlers
  function initExampleClicks() {
    const exampleItems = document.querySelectorAll(".example-item");
    const searchInput = document.getElementById("search-demo-input");

    exampleItems.forEach((item) => {
      item.addEventListener("click", () => {
        const query = item.getAttribute("data-query");
        searchInput.value = query;

        // Add visual feedback
        gsap.to(item, {
          backgroundColor: "var(--accent-color)",
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        });
      });
    });
  }

  // Search form submit handler

  function initSearchForm() {
    const searchForm = document.querySelector(".search-form");

    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("search-demo-input").value;

      if (query.trim() !== "") {
        // Generate a proper Google search URL with the dork query
        const googleSearchUrl =
          "https://www.google.com/search?q=" + encodeURIComponent(query);

        // Open the URL in a new tab
        window.open(googleSearchUrl, "_blank");

        // Optional: Add a small visual feedback that the search is being performed
        const searchButton = searchForm.querySelector(".btn");
        const originalText = searchButton.textContent;

        // Change button text temporarily
        searchButton.textContent = "Opening...";

        // Reset button after a short delay
        setTimeout(() => {
          searchButton.textContent = originalText;
        }, 1000);
      }
    });
  }

  // Initialize everything
  init3DBackground();
  initAnimations();
  initTypingEffect();
  initExampleClicks();
  initSearchForm();
});
