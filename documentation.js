// Get current page's filename
const currentPage = window.location.pathname.split("/").pop();

// Loop through all nav links
document.querySelectorAll(".nav-menu-link").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// GSAP Animations for Documentation page
document.addEventListener("DOMContentLoaded", () => {
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

  // Documentation filtering system
  const filterBtns = document.querySelectorAll(".filter-btn");
  const contentSections = document.querySelectorAll(".content-section");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      // Hide all content sections
      contentSections.forEach((section) => {
        section.classList.remove("active");
      });

      // Show selected content section
      const targetId = btn.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");

      // Animate entry with GSAP
      gsap.fromTo(
        `#${targetId}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    });
  });

  // Interactive example functionality
  const dorkInput = document.getElementById("dork-input");
  const generateBtn = document.getElementById("generate-btn");
  const resultBox = document.getElementById("result-box");
  const formattedQuery = document.getElementById("formatted-query");
  const queryExplanation = document.getElementById("query-explanation");
  const copyBtn = document.getElementById("copy-btn");

  generateBtn.addEventListener("click", () => {
    const query = dorkInput.value.trim();

    if (query) {
      // Generate and display the formatted query
      formattedQuery.textContent = query;

      // Generate explanation based on operators used
      let explanation = "This search query ";

      if (query.includes("site:")) {
        explanation += "limits results to specific websites or domains. ";
      }

      if (query.includes("filetype:") || query.includes("ext:")) {
        explanation += "looks for specific file types. ";
      }

      if (query.includes("intitle:")) {
        explanation += "finds pages with specific text in their titles. ";
      }

      if (query.includes("inurl:")) {
        explanation += "finds pages with specific text in their URLs. ";
      }

      if (query.includes("intext:")) {
        explanation += "searches for specific text in the body of pages. ";
      }

      queryExplanation.textContent = explanation;

      // Display the result box with animation
      resultBox.style.display = "block";
      gsap.fromTo(
        resultBox,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  });

  // Example buttons functionality
  const exampleBtns = document.querySelectorAll(".example-btn");

  exampleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const query = btn.getAttribute("data-query");
      dorkInput.value = query;
      generateBtn.click();

      // Scroll to the input
      dorkInput.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  // Copy button functionality
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(formattedQuery.textContent).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied!";

      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    });
  });

  // Template customization system
  const templateSelect = document.getElementById("template-select");
  const templateParams = document.getElementById("template-params");
  const applyTemplateBtn = document.getElementById("apply-template");
  const templateResult = document.getElementById("template-result");

  // Template definitions
  const templates = {
    security: {
      name: "Security Vulnerability Scanner",
      base: "site:[TARGET_DOMAIN] (filetype:[FILE_TYPE1] OR filetype:[FILE_TYPE2]) intext:[KEYWORD]",
      params: {
        TARGET_DOMAIN: {
          label: "Target Domain",
          type: "text",
          placeholder: "example.com",
        },
        FILE_TYPE1: {
          label: "File Type 1",
          type: "text",
          placeholder: "pdf",
        },
        FILE_TYPE2: {
          label: "File Type 2",
          type: "text",
          placeholder: "xls",
        },
        KEYWORD: {
          label: "Sensitive Keyword",
          type: "text",
          placeholder: "confidential",
        },
      },
    },
    academic: {
      name: "Academic Research Finder",
      base: 'site:.edu filetype:pdf "[RESEARCH_TOPIC]" after:[YEAR]',
      params: {
        RESEARCH_TOPIC: {
          label: "Research Topic",
          type: "text",
          placeholder: "artificial intelligence ethics",
        },
        YEAR: {
          label: "Published After Year",
          type: "text",
          placeholder: "2022",
        },
      },
    },
    database: {
      name: "Exposed Database Detector",
      base: 'intitle:"index of" ([DB_TYPE]) (dump OR backup)',
      params: {
        DB_TYPE: {
          label: "Database Type",
          type: "text",
          placeholder: "mysql OR mongodb OR postgresql",
        },
      },
    },
    api: {
      name: "API Key Finder",
      base: 'site:github.com "[API_SERVICE]" "api key"',
      params: {
        API_SERVICE: {
          label: "API Service",
          type: "text",
          placeholder: "aws OR stripe OR google maps",
        },
      },
    },
    docs: {
      name: "Technical Documentation Finder",
      base: 'filetype:pdf "[TECHNOLOGY]" ("technical documentation" OR "user guide")',
      params: {
        TECHNOLOGY: {
          label: "Technology",
          type: "text",
          placeholder: "kubernetes",
        },
      },
    },
  };

  // Show parameters based on selected template
  templateSelect.addEventListener("change", () => {
    const selectedTemplate = templateSelect.value;

    if (selectedTemplate) {
      // Clear previous parameters
      templateParams.innerHTML = "";

      // Build parameter inputs
      const template = templates[selectedTemplate];
      const params = template.params;

      for (const key in params) {
        const param = params[key];

        const paramDiv = document.createElement("div");
        paramDiv.style.marginBottom = "15px";

        const label = document.createElement("label");
        label.textContent = param.label;
        label.style.display = "block";
        label.style.marginBottom = "5px";
        label.style.fontWeight = "500";

        const input = document.createElement("input");
        input.type = param.type;
        input.placeholder = param.placeholder;
        input.dataset.param = key;
        input.style.width = "100%";
        input.style.padding = "10px";
        input.style.borderRadius = "6px";
        input.style.border = "1px solid var(--border-color)";
        input.style.background = "rgba(0, 0, 0, 0.4)";
        input.style.color = "var(--text-primary)";

        paramDiv.appendChild(label);
        paramDiv.appendChild(input);
        templateParams.appendChild(paramDiv);
      }

      // Show the parameter section and button
      templateParams.style.display = "block";
      applyTemplateBtn.style.display = "block";

      // Animate appearance
      gsap.fromTo(
        templateParams,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    } else {
      templateParams.style.display = "none";
      applyTemplateBtn.style.display = "none";
    }
  });

  // Generate query from template parameters
  applyTemplateBtn.addEventListener("click", () => {
    const selectedTemplate = templateSelect.value;
    const template = templates[selectedTemplate];

    if (template) {
      let query = template.base;
      const inputs = templateParams.querySelectorAll("input");

      inputs.forEach((input) => {
        const param = input.dataset.param;
        const value = input.value || input.placeholder;

        // Replace parameter in query string
        query = query.replace(`[${param}]`, value);
      });

      // Display result
      templateResult.innerHTML = `
            <h4>${template.name}</h4>
            <div class="code-block">${query}</div>
            <p>Copy this query and paste it into Google to search using your customized parameters.</p>
            <button id="copy-template" class="btn" style="margin-top: 15px;">Copy Query</button>
          `;

      templateResult.style.display = "block";

      // Copy button functionality
      document.getElementById("copy-template").addEventListener("click", () => {
        navigator.clipboard.writeText(query).then(() => {
          document.getElementById("copy-template").textContent = "Copied!";

          setTimeout(() => {
            document.getElementById("copy-template").textContent = "Copy Query";
          }, 2000);
        });
      });

      // Animate appearance
      gsap.fromTo(
        templateResult,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
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

    // Track mouse movement
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    });

    animate();
  }
  init3DBackground();

  function intiAnimations() {
    // Page entrance animations
    gsap.from(".docs-header h1", {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".docs-header p", {
      opacity: 0,
      y: -20,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(".filters", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.5,
      ease: "power2.out",
    });

    gsap.from("#intro", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 1,
      ease: "power2.out",
    });
  }
  intiAnimations();
});
