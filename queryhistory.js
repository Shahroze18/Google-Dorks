// Get current page's filename
const currentPage = window.location.pathname.split("/").pop();

// Loop through all nav links
document.querySelectorAll(".nav-menu-link").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navbarMenu = document.querySelector(".navbar-menu");

  mobileMenuToggle.addEventListener("click", function () {
    navbarMenu.classList.toggle("active");
    this.innerHTML = navbarMenu.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Modal functionality - fixed here
  const queryModal = document.getElementById("query-modal");
  const operatorModal = document.getElementById("operator-modal");
  const addQueryBtn = document.getElementById("add-query-btn");
  const addOperatorBtn = document.getElementById("add-operator-btn");
  const closeQueryModal = document.getElementById("close-query-modal");
  const closeOperatorModal = document.getElementById("close-operator-modal");
  const cancelQuery = document.getElementById("cancel-query");
  const cancelOperator = document.getElementById("cancel-operator");
  const addFirstQuery = document.getElementById("add-first-query");
  const addFirstOperator = document.getElementById("add-first-operator");

  addQueryBtn.addEventListener("click", () => {
    document.getElementById("query-modal-title").textContent = "Add New Query";
    document.getElementById("query-form").reset();
    // Clear any previous edit ID
    document.getElementById("query-form").dataset.editId = "";
    queryModal.style.display = "flex";
    // Target only this modal's content to avoid affecting the other modal
    const modalContent = queryModal.querySelector(".modal-content");
    modalContent.style.opacity = "1";
    modalContent.style.scale = "1";
    gsap.from(modalContent, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  });

  addOperatorBtn.addEventListener("click", () => {
    document.getElementById("operator-modal-title").textContent =
      "Add Favorite Operator";
    document.getElementById("operator-form").reset();
    // Clear any previous edit ID
    document.getElementById("operator-form").dataset.editId = "";
    operatorModal.style.display = "flex";
    // Target only this modal's content to avoid affecting the other modal
    const modalContent = operatorModal.querySelector(".modal-content");
    modalContent.style.opacity = "1";
    modalContent.style.scale = "1";
    gsap.from(modalContent, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  });

  addFirstQuery.addEventListener("click", () => {
    // Clear any previous edit ID
    document.getElementById("query-form").dataset.editId = "";
    queryModal.style.display = "flex";
    const modalContent = queryModal.querySelector(".modal-content");
    modalContent.style.opacity = "1";
    modalContent.style.scale = "1";
    gsap.from(modalContent, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  });

  addFirstOperator.addEventListener("click", () => {
    // Clear any previous edit ID
    document.getElementById("operator-form").dataset.editId = "";
    operatorModal.style.display = "flex";
    const modalContent = operatorModal.querySelector(".modal-content");
    modalContent.style.opacity = "1";
    modalContent.style.scale = "1";
    gsap.from(modalContent, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  });

  closeQueryModal.addEventListener("click", () => {
    const modalContent = queryModal.querySelector(".modal-content");
    gsap.to(modalContent, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        queryModal.style.display = "none";
      },
    });
  });

  closeOperatorModal.addEventListener("click", () => {
    const modalContent = operatorModal.querySelector(".modal-content");
    gsap.to(modalContent, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        operatorModal.style.display = "none";
      },
    });
  });

  cancelQuery.addEventListener("click", () => {
    const modalContent = queryModal.querySelector(".modal-content");
    gsap.to(modalContent, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        queryModal.style.display = "none";
      },
    });
  });

  cancelOperator.addEventListener("click", () => {
    const modalContent = operatorModal.querySelector(".modal-content");
    gsap.to(modalContent, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        operatorModal.style.display = "none";
      },
    });
  });

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === queryModal) {
      const modalContent = queryModal.querySelector(".modal-content");
      gsap.to(modalContent, {
        scale: 0.9,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          queryModal.style.display = "none";
        },
      });
    }
    if (e.target === operatorModal) {
      const modalContent = operatorModal.querySelector(".modal-content");
      gsap.to(modalContent, {
        scale: 0.9,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          operatorModal.style.display = "none";
        },
      });
    }
  });

  // Form submissions
  const queryForm = document.getElementById("query-form");
  const operatorForm = document.getElementById("operator-form");

  // Mock data storage (in a real app, this would use localStorage or a database)
  let savedQueries = [
    {
      id: 1,
      name: "PDF Documents",
      query: "filetype:pdf site:example.com",
      notes: "Find PDF files on example.com",
      date: "2025-04-15",
    },
    {
      id: 2,
      name: "Admin Pages",
      query: "intitle:admin inurl:admin",
      notes: "Find admin pages",
      date: "2025-04-18",
    },
    {
      id: 3,
      name: "Public Directories",
      query: "intitle:index.of",
      notes: "Find open directories",
      date: "2025-04-19",
    },
  ];

  let favoriteOperators = [
    {
      id: 1,
      name: "site:",
      description: "Limits results to specific domains",
      example: "site:example.com",
    },
    {
      id: 2,
      name: "filetype:",
      description: "Finds specific file types",
      example: "filetype:pdf",
    },
    {
      id: 3,
      name: "intitle:",
      description: "Searches page titles",
      example: "intitle:security",
    },
    {
      id: 4,
      name: "inurl:",
      description: "Searches for text in URLs",
      example: "inurl:admin",
    },
    {
      id: 5,
      name: "intext:",
      description: "Searches for text in page content",
      example: "intext:password",
    },
    {
      id: 6,
      name: "-",
      description: "Excludes specific terms",
      example: "-login",
    },
  ];

  // Generate IDs for new items
  function generateId(items) {
    return items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
  }

  // Handle query form submission
  queryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const queryName = document.getElementById("query-name").value;
    const queryText = document.getElementById("query-text").value;
    const queryNotes = document.getElementById("query-notes").value;
    const isEdit = queryForm.dataset.editId;

    if (isEdit) {
      const id = parseInt(isEdit);
      const index = savedQueries.findIndex((q) => q.id === id);
      if (index !== -1) {
        savedQueries[index] = {
          id,
          name: queryName,
          query: queryText,
          notes: queryNotes,
          date: savedQueries[index].date,
        };
      }
    } else {
      const newQuery = {
        id: generateId(savedQueries),
        name: queryName,
        query: queryText,
        notes: queryNotes,
        date: new Date().toISOString().split("T")[0],
      };
      savedQueries.push(newQuery);
    }

    renderQueriesList();

    const modalContent = queryModal.querySelector(".modal-content");
    gsap.to(modalContent, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        queryModal.style.display = "none";
        queryForm.dataset.editId = ""; // Clear the edit ID
      },
    });

    // Show success animation
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = isEdit
      ? "Query updated successfully!"
      : "Query saved successfully!";
    document.body.appendChild(toast);

    gsap.to(toast, {
      opacity: 1,
      y: -20,
      duration: 0.5,
      onComplete: () => {
        setTimeout(() => {
          gsap.to(toast, {
            opacity: 0,
            y: -50,
            duration: 0.5,
            onComplete: () => toast.remove(),
          });
        }, 2000);
      },
    });
  });

  // Handle operator form submission
  operatorForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const operatorName = document.getElementById("operator-name").value;
    const operatorDesc = document.getElementById("operator-desc").value;
    const operatorExample = document.getElementById("operator-example").value;
    const isEdit = operatorForm.dataset.editId;

    if (isEdit) {
      const id = parseInt(isEdit);
      const index = favoriteOperators.findIndex((o) => o.id === id);
      if (index !== -1) {
        favoriteOperators[index] = {
          id,
          name: operatorName,
          description: operatorDesc,
          example: operatorExample,
        };
      }
    } else {
      const newOperator = {
        id: generateId(favoriteOperators),
        name: operatorName,
        description: operatorDesc,
        example: operatorExample,
      };
      favoriteOperators.push(newOperator);
    }

    renderOperatorsGrid();

    const modalContent = operatorModal.querySelector(".modal-content");
    gsap.to(modalContent, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        operatorModal.style.display = "none";
        operatorForm.dataset.editId = ""; // Clear the edit ID
      },
    });
  });

  // Function to attach event listeners to query buttons
  function attachQueryButtonListeners() {
    // Add event listeners to buttons
    document.querySelectorAll(".btn-copy").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        const query = savedQueries.find((q) => q.id === id);
        if (query) {
          navigator.clipboard.writeText(query.query).then(() => {
            // Show copied notification
            const button = e.currentTarget;
            const originalIcon = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.color = "#10b981";

            setTimeout(() => {
              button.innerHTML = originalIcon;
              button.style.color = "";
            }, 1500);
          });
        }
      });
    });

    document.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        const query = savedQueries.find((q) => q.id === id);
        if (query) {
          document.getElementById("query-modal-title").textContent =
            "Edit Query";
          document.getElementById("query-name").value = query.name;
          document.getElementById("query-text").value = query.query;
          document.getElementById("query-notes").value = query.notes || "";
          queryForm.dataset.editId = id.toString(); // Ensure it's a string

          queryModal.style.display = "flex";
          const modalContent = queryModal.querySelector(".modal-content");
          modalContent.style.opacity = "1";
          modalContent.style.scale = "1";
          gsap.from(modalContent, {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            ease: "back.out(1.7)",
          });
        }
      });
    });

    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        const queryItem = e.currentTarget.closest(".query-item");

        gsap.to(queryItem, {
          opacity: 0,
          x: 20,
          duration: 0.3,
          onComplete: () => {
            savedQueries = savedQueries.filter((q) => q.id !== id);
            renderQueriesList();
          },
        });
      });
    });
  }

  // Function to attach event listeners to operator cards
  function attachOperatorCardListeners() {
    document.querySelectorAll(".operator-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (!e.target.closest(".btn-icon")) {
          const id = parseInt(card.dataset.id);
          const operator = favoriteOperators.find((o) => o.id === id);
          if (operator) {
            // Copy the operator to clipboard
            navigator.clipboard.writeText(operator.name);

            // Show copied animation
            const originalBg = card.style.backgroundColor;
            gsap.to(card, {
              backgroundColor: "rgba(79, 70, 229, 0.2)",
              duration: 0.3,
              yoyo: true,
              repeat: 1,
              onComplete: () => {
                card.style.backgroundColor = originalBg;
              },
            });
          }
        }
      });

      // Add hover effect to show actions
      card.addEventListener("mouseenter", () => {
        const actions = card.querySelector(".operator-actions");
        gsap.to(actions, { display: "flex", opacity: 1, duration: 0.2 });
      });

      card.addEventListener("mouseleave", () => {
        const actions = card.querySelector(".operator-actions");
        gsap.to(actions, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            actions.style.display = "none";
          },
        });
      });

      const editBtn = card.querySelector(".btn-edit-op");
      if (editBtn) {
        editBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = parseInt(card.dataset.id);
          const operator = favoriteOperators.find((o) => o.id === id);
          if (operator) {
            document.getElementById("operator-modal-title").textContent =
              "Edit Operator";
            document.getElementById("operator-name").value = operator.name;
            document.getElementById("operator-desc").value =
              operator.description;
            document.getElementById("operator-example").value =
              operator.example || "";
            operatorForm.dataset.editId = id.toString(); // Ensure it's a string

            operatorModal.style.display = "flex";
            const modalContent = operatorModal.querySelector(".modal-content");
            modalContent.style.opacity = "1";
            modalContent.style.scale = "1";
            gsap.from(modalContent, {
              scale: 0.9,
              opacity: 0,
              duration: 0.3,
              ease: "back.out(1.7)",
            });
          }
        });
      }

      const deleteBtn = card.querySelector(".btn-delete-op");
      if (deleteBtn) {
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = parseInt(card.dataset.id);

          gsap.to(card, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => {
              favoriteOperators = favoriteOperators.filter((o) => o.id !== id);
              renderOperatorsGrid();
            },
          });
        });
      }
    });
  }

  // Render queries list
  function renderQueriesList() {
    const queriesList = document.getElementById("queries-list");
    const emptyQueries = document.getElementById("empty-queries");

    if (savedQueries.length === 0) {
      queriesList.innerHTML = "";
      emptyQueries.style.display = "block";
      return;
    }

    emptyQueries.style.display = "none";
    queriesList.innerHTML = "";

    savedQueries.forEach((query, index) => {
      const li = document.createElement("li");
      li.className = "query-item";
      li.innerHTML = `
      <div>
        <div class="query-text">${query.name}</div>
        <div class="query-date">Saved on ${query.date}</div>
      </div>
      <div class="query-actions">
        <button class="btn-icon btn-copy" data-id="${query.id}" title="Copy to clipboard">
          <i class="fas fa-copy"></i>
        </button>
        <button class="btn-icon btn-edit" data-id="${query.id}" title="Edit query">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-icon btn-delete" data-id="${query.id}" title="Delete query">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
      queriesList.appendChild(li);

      // Animation for newly added items
      if (index === savedQueries.length - 1 && !query.animated) {
        gsap.from(li, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: 0.1,
          ease: "power2.out",
        });
        query.animated = true;
      }
    });

    // Attach event listeners to buttons
    attachQueryButtonListeners();
  }

  // Render operators grid
  function renderOperatorsGrid() {
    const operatorsGrid = document.getElementById("operators-grid");
    const emptyOperators = document.getElementById("empty-operators");

    if (favoriteOperators.length === 0) {
      operatorsGrid.innerHTML = "";
      emptyOperators.style.display = "block";
      return;
    }

    emptyOperators.style.display = "none";
    operatorsGrid.innerHTML = "";

    favoriteOperators.forEach((operator, index) => {
      const div = document.createElement("div");
      div.className = "operator-card";
      div.dataset.id = operator.id;
      div.innerHTML = `
      <div class="operator-name">${operator.name}</div>
      <div class="operator-desc">${operator.description}</div>
      <div class="operator-actions" style="display:none">
        <button class="btn-icon btn-edit-op" title="Edit operator">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-icon btn-delete-op" title="Remove operator">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
      operatorsGrid.appendChild(div);

      // Animation for newly added items
      if (index === favoriteOperators.length - 1 && !operator.animated) {
        gsap.from(div, {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          delay: 0.1,
          ease: "back.out(1.7)",
        });
        operator.animated = true;
      }
    });

    // Attach event listeners
    attachOperatorCardListeners();
  }

  // Search functionality
  const querySearch = document.getElementById("query-search");
  const operatorSearch = document.getElementById("operator-search");

  querySearch.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredQueries = savedQueries.filter(
      (q) =>
        q.name.toLowerCase().includes(searchTerm) ||
        q.query.toLowerCase().includes(searchTerm)
    );

    const queriesList = document.getElementById("queries-list");
    const emptyQueries = document.getElementById("empty-queries");

    if (filteredQueries.length === 0) {
      queriesList.innerHTML = `
      <div class="empty-search">
        <i class="fas fa-search"></i>
        <p>No queries matching "${searchTerm}"</p>
      </div>
    `;
      emptyQueries.style.display = "none";
    } else {
      queriesList.innerHTML = "";

      filteredQueries.forEach((query) => {
        const li = document.createElement("li");
        li.className = "query-item";
        li.innerHTML = `
        <div>
          <div class="query-text">${query.name}</div>
          <div class="query-date">Saved on ${query.date}</div>
        </div>
        <div class="query-actions">
          <button class="btn-icon btn-copy" data-id="${query.id}" title="Copy to clipboard">
            <i class="fas fa-copy"></i>
          </button>
          <button class="btn-icon btn-edit" data-id="${query.id}" title="Edit query">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon btn-delete" data-id="${query.id}" title="Delete query">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
        queriesList.appendChild(li);
      });

      // Re-attach event listeners after search filtering
      attachQueryButtonListeners();
    }
  });

  operatorSearch.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredOperators = favoriteOperators.filter(
      (o) =>
        o.name.toLowerCase().includes(searchTerm) ||
        o.description.toLowerCase().includes(searchTerm)
    );

    const operatorsGrid = document.getElementById("operators-grid");
    const emptyOperators = document.getElementById("empty-operators");

    if (filteredOperators.length === 0) {
      operatorsGrid.innerHTML = `
      <div class="empty-search">
        <i class="fas fa-search"></i>
        <p>No operators matching "${searchTerm}"</p>
      </div>
    `;
      emptyOperators.style.display = "none";
    } else {
      operatorsGrid.innerHTML = "";

      filteredOperators.forEach((operator) => {
        const div = document.createElement("div");
        div.className = "operator-card";
        div.dataset.id = operator.id;
        div.innerHTML = `
        <div class="operator-name">${operator.name}</div>
        <div class="operator-desc">${operator.description}</div>
        <div class="operator-actions" style="display:none">
          <button class="btn-icon btn-edit-op" title="Edit operator">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon btn-delete-op" title="Remove operator">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;
        operatorsGrid.appendChild(div);
      });

      // Re-attach event listeners after search filtering
      attachOperatorCardListeners();
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

  // Initialize the 3D background
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

  // Initialize GSAP animations
  function initAnimations() {
    // Animate title
    gsap.to(".fade-in", { opacity: 1, duration: 1, ease: "power2.out" });

    // Animate columns
    gsap.to(".slide-up", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });

    // Add CSS for the toast notifications
    const style = document.createElement("style");
    style.textContent = `
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: var(--accent-color);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 2000;
      opacity: 0;
      transform: translateY(20px);
    }
    
    .empty-search {
      text-align: center;
      padding: 30px 0;
      color: var(--footer-link);
    }
    
    .empty-search i {
      font-size: 2rem;
      margin-bottom: 10px;
      opacity: 0.5;
    }
  `;
    document.head.appendChild(style);
  }

  // Initialize everything
  renderQueriesList();
  renderOperatorsGrid();
  init3DBackground();
  initAnimations();
});
