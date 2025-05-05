// Background 3D Animation
document.addEventListener("DOMContentLoaded", () => {
  // Get current page's filename
  const currentPage = window.location.pathname.split("/").pop();

  // Loop through all nav links
  document.querySelectorAll(".nav-menu-link").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navbarMenu = document.querySelector(".navbar-menu");
  const mobileMenuIcon = mobileMenuToggle.querySelector("i");

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

  // 3D Background Initialization
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

  // Initialize 3D background
  init3DBackground();

  // Google Dork Generator Functionality
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const suggestedQueries = document.getElementById("suggested-queries");
  const exportBtn = document.getElementById("export-btn");
  const addFilterBtn = document.getElementById("add-filter-btn");
  const filterModal = document.getElementById("filter-modal");
  const modalClose = document.getElementById("modal-close");
  const cancelFilter = document.getElementById("cancel-filter");
  const filterForm = document.getElementById("filter-form");

  // Sample dork templates
  const dorkTemplates = [
    {
      template: "intitle:INDEX OF",
      description: "Shows directory listings",
    },
    {
      template: "filetype:pdf",
      description: "Find PDF documents",
    },
    {
      template: "inurl:admin",
      description: "Pages with 'admin' in the URL",
    },
    {
      template: "site:TARGET ext:log",
      description: "Log files on a specific domain",
    },
    {
      template: 'intitle:"login page"',
      description: "Find login pages",
    },
    {
      template: 'intext:"username password" filetype:txt',
      description: "Text files containing credentials",
    },
    {
      template: "ext:conf OR ext:cnf OR ext:ini",
      description: "Configuration files",
    },
    {
      template: 'intitle:"Index of" intext:config.php',
      description: "Exposed PHP configuration files",
    },
    {
      template: "filetype:sql intext:password",
      description: "SQL files containing passwords",
    },
    {
      template: "inurl:wp-content",
      description: "WordPress content directories",
    },
    {
      template: 'intitle:"Directory Listing For" intext:Tomcat',
      description: "Tomcat server directories",
    },
    {
      template: "inurl:dashboard.php",
      description: "Dashboard pages",
    },
  ];

  // Store generated queries
  let generatedQueries = [];

  // Generate query based on input and filters
  function generateQueries(keyword) {
    const siteExtension = document.getElementById("site-extension").value;
    const useFiletype = document.getElementById("filetype").checked;
    const useIntitle = document.getElementById("intitle").checked;
    const useInurl = document.getElementById("inurl").checked;
    const useCache = document.getElementById("cache").checked;
    const onlySecure = document.getElementById("secure-toggle").checked;
    const showFolders = document.getElementById("folders-toggle").checked;

    // Clear previous queries
    generatedQueries = [];

    // Generate custom queries based on user input and selected filters
    if (keyword && keyword.trim() !== "") {
      // Basic keyword query
      let baseQuery = keyword.trim();

      // Add site extension if selected
      if (siteExtension) {
        baseQuery += ` site:*${siteExtension}`;
      }

      // Only secure sites
      if (onlySecure) {
        baseQuery = `${baseQuery} inurl:https`;
      }

      // Show public folders
      if (showFolders) {
        generatedQueries.push({
          query: `intitle:"Index of" "${keyword}"`,
          description: "Directory listings containing your keyword",
        });
      }

      // Add operator-based queries
      if (useFiletype) {
        // Generate different file type queries
        const fileTypes = ["pdf", "doc", "xls", "ppt", "txt"];
        fileTypes.forEach((type) => {
          generatedQueries.push({
            query: `${baseQuery} filetype:${type}`,
            description: `Find ${type.toUpperCase()} files related to your keyword`,
          });
        });
      }

      if (useIntitle) {
        generatedQueries.push({
          query: `intitle:${keyword} ${
            siteExtension ? "site:*" + siteExtension : ""
          }`,
          description: "Pages with your keyword in the title",
        });
      }

      if (useInurl) {
        generatedQueries.push({
          query: `inurl:${keyword} ${
            siteExtension ? "site:*" + siteExtension : ""
          }`,
          description: "Pages with your keyword in the URL",
        });
      }

      if (useCache) {
        generatedQueries.push({
          query: `cache:${keyword}.com`,
          description: "Google's cached version of this domain",
        });
      }

      // Add some advanced queries
      generatedQueries.push({
        query: `${baseQuery} intext:password OR intext:username OR intext:login`,
        description: "Pages potentially containing login information",
      });

      generatedQueries.push({
        query: `${baseQuery} inurl:config OR inurl:setup OR inurl:install`,
        description: "Configuration or setup pages",
      });

      // Add the base query if we don't have any queries yet
      if (generatedQueries.length === 0) {
        generatedQueries.push({
          query: baseQuery,
          description: "Basic search with your keyword",
        });
      }
    } else {
      // If no keyword provided, show sample dorks
      dorkTemplates.forEach((template) => {
        generatedQueries.push({
          query: template.template,
          description: template.description,
        });
      });
    }

    // Display generated queries
    displayQueries();
  }

  // Display queries in cards
  function displayQueries() {
    suggestedQueries.innerHTML = "";

    generatedQueries.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "query-card";
      card.innerHTML = `
            <div class="query-text">${item.query}</div>
            <div class="query-description">${item.description}</div>
            <button class="query-copy" aria-label="Copy query" data-index="${index}">
              <i class="fas fa-copy"></i>
            </button>
          `;

      suggestedQueries.appendChild(card);
    });

    // Add event listeners to copy buttons
    const copyButtons = document.querySelectorAll(".query-copy");
    copyButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = button.getAttribute("data-index");
        const query = generatedQueries[index].query;
        copyToClipboard(query);

        // Show copied feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = "var(--accent-color)";

        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.style.color = "";
        }, 1500);
      });
    });

    // Add click event to cards to open Google search
    const queryCards = document.querySelectorAll(".query-card");
    queryCards.forEach((card, index) => {
      card.addEventListener("click", () => {
        const query = generatedQueries[index].query;
        // Save query to history
        saveQueryToHistory(query);
        // Open Google search in new tab
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(query)}`,
          "_blank"
        );
      });
    });

    // Animate query cards with GSAP
    gsap.fromTo(
      ".query-card",
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }

  // Copy text to clipboard
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Text copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  }

  // Save query to local storage for history
  function saveQueryToHistory(query) {
    let queryHistory = JSON.parse(localStorage.getItem("queryHistory")) || [];
    queryHistory.unshift({
      query: query,
      timestamp: new Date().toISOString(),
      executed: true,
    });

    // Keep only most recent 50 queries
    if (queryHistory.length > 50) {
      queryHistory = queryHistory.slice(0, 50);
    }

    localStorage.setItem("queryHistory", JSON.stringify(queryHistory));
  }

  // Export queries to text file
  function exportQueries() {
    if (generatedQueries.length === 0) {
      alert("No queries to export");
      return;
    }

    let content = "# Google Dork Queries\n";
    content += "# Generated on " + new Date().toLocaleString() + "\n\n";

    generatedQueries.forEach((item, index) => {
      content += index + 1 + ". " + item.query + "\n";
      content += "   # " + item.description + "\n\n";
    });

    // Create downloadable file
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "google_dork_queries.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Add filter functionality
  function addCustomFilter(filterType, filterValue) {
    // Get current search text
    let currentSearch = searchInput.value.trim();

    // Add the new filter
    if (currentSearch) {
      currentSearch += " ";
    }

    currentSearch += filterType + filterValue;
    searchInput.value = currentSearch;

    // Focus back on the input
    searchInput.focus();
  }

  // Show example queries on page load
  generateQueries("");

  // Event Listeners
  searchBtn.addEventListener("click", () => {
    generateQueries(searchInput.value);
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      generateQueries(searchInput.value);
    }
  });

  exportBtn.addEventListener("click", exportQueries);

  // Modal Functionality
  addFilterBtn.addEventListener("click", () => {
    filterModal.style.display = "flex";
    gsap.from(".modal-content", {
      y: -50,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  modalClose.addEventListener("click", () => {
    gsap.to(".modal-content", {
      y: -50,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        filterModal.style.display = "none";
      },
    });
  });

  cancelFilter.addEventListener("click", () => {
    gsap.to(".modal-content", {
      y: -50,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        filterModal.style.display = "none";
      },
    });
  });

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const filterType = document.getElementById("filter-type").value;
    const filterValue = document.getElementById("filter-value").value;

    if (filterValue.trim() !== "") {
      addCustomFilter(filterType, filterValue);

      // Close modal
      gsap.to(".modal-content", {
        y: -50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          filterModal.style.display = "none";
          document.getElementById("filter-value").value = "";
        },
      });
    }
  });

  // Click outside modal to close
  window.addEventListener("click", (e) => {
    if (e.target === filterModal) {
      gsap.to(".modal-content", {
        y: -50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          filterModal.style.display = "none";
        },
      });
    }
  });

  // GSAP animations for page elements
  gsap.from(".section-title", {
    opacity: 0,
    y: -30,
    duration: 1,
    ease: "power3.out",
  });
  gsap.from(".section-description", {
    opacity: 0,
    y: -20,
    duration: 1,
    delay: 0.2,
    ease: "power3.out",
  });
  gsap.from(".input-container", {
    opacity: 0,
    y: -10,
    duration: 1,
    delay: 0.4,
    ease: "power3.out",
  });
  gsap.from(".filter-controls", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.6,
    ease: "power3.out",
  });
  gsap.from(".export-container", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.8,
    ease: "power3.out",
  });
  gsap.from(".add-filter-btn", {
    opacity: 0,
    scale: 0.5,
    duration: 1,
    delay: 1,
    ease: "elastic.out(1, 0.5)",
  });

  // Animated tooltips
  const tooltips = document.querySelectorAll(".tooltip-text");
  tooltips.forEach((tooltip) => {
    gsap.set(tooltip, { opacity: 0, y: 10 });
  });

  document.querySelectorAll(".tooltip").forEach((tooltip) => {
    tooltip.addEventListener("mouseenter", function () {
      gsap.to(this.querySelector(".tooltip-text"), {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    tooltip.addEventListener("mouseleave", function () {
      gsap.to(this.querySelector(".tooltip-text"), {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
      });
    });
  });
});
