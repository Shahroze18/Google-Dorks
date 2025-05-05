// Get current page's filename
const currentPage = window.location.pathname.split("/").pop();

// Loop through all nav links
document.querySelectorAll(".nav-menu-link").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
// GSAP Animations
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
  checkEmptyUserTable();

  // Hero Section Animation
  gsap.to(".hero-title", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.to(".hero-description", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power2.out",
  });

  // Cards Animation
  gsap.utils.toArray(".card").forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.1 * i,
      ease: "power2.out",
    });
  });

  // Navbar Animation
  gsap.from(".navbar", {
    y: -50,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  });

  // Dashboard Header Animation
  gsap.from(".dashboard-header", {
    opacity: 0,
    y: 20,
    duration: 0.7,
    ease: "power2.out",
  });

  // Tabs Animation
  gsap.from(".tabs", {
    opacity: 0,
    y: 20,
    duration: 0.7,
    delay: 0.2,
    ease: "power2.out",
  });
});

const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and contents
    tabs.forEach((t) => t.classList.remove("active"));
    tabContents.forEach((content) => (content.style.display = "none"));

    // Add active class to current tab
    tab.classList.add("active");

    // Show corresponding content
    const tabId = tab.getAttribute("data-tab");
    document.getElementById(`${tabId}-tab`).style.display = "block";
  });
});

const generateReportBtn = document.querySelector(".dashboard-header .btn");
generateReportBtn.addEventListener("click", generateReport);

// Add New User functionality
const addUserBtn = document.querySelector(".user-management .card-header .btn");
addUserBtn.addEventListener("click", showAddUserModal);

// Export Logs functionality
const exportLogsBtn = document.querySelector(
  ".security-alerts .card-header .btn"
);
exportLogsBtn.addEventListener("click", exportSecurityLogs);

// Edit User functionality
const editUserBtns = document.querySelectorAll(
  ".user-management .data-table .btn"
);
editUserBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const row = this.closest("tr");
    const userId = row.querySelector("td:first-child").textContent;
    const userName = row.querySelector("td:nth-child(2)").textContent;
    const userEmail = row.querySelector("td:nth-child(3)").textContent;
    const userRole = row.querySelector("td:nth-child(4)").textContent;
    const userStatus = row.querySelector("td:nth-child(5) .status").textContent;

    showEditUserModal(userId, userName, userEmail, userRole, userStatus);
  });
});

// Create modals container if it doesn't exist
if (!document.getElementById("modals-container")) {
  const modalsContainer = document.createElement("div");
  modalsContainer.id = "modals-container";
  document.body.appendChild(modalsContainer);
}

// Generate Report Function
function generateReport() {
  // Show loading overlay
  showLoadingOverlay("Generating report...");

  // Simulate API call/report generation
  setTimeout(() => {
    hideLoadingOverlay();

    // Get current user count from the table
    const userTable = document.querySelector(
      ".user-management .data-table tbody"
    );
    const userRows = userTable.querySelectorAll("tr:not(.no-data-message)");
    const totalUsers = userRows.length;

    // Count user statuses
    let activeUsers = 0;
    let bannedUsers = 0;
    let pendingUsers = 0;

    userRows.forEach((row) => {
      const status = row.querySelector("td:nth-child(5) .status").textContent;
      if (status === "Active") activeUsers++;
      else if (status === "Banned") bannedUsers++;
      else if (status === "Pending") pendingUsers++;
    });

    // Create report data with actual current user counts
    const reportData = {
      title: "Admin Dashboard Report",
      date: new Date().toLocaleString(),
      sections: [
        {
          name: "User Statistics",
          data: {
            totalUsers: totalUsers,
            activeUsers: activeUsers,
            bannedUsers: bannedUsers,
            pendingUsers: pendingUsers,
          },
        },
        {
          name: "Security Alerts Summary",
          data: {
            totalAlerts: 5,
            highPriority: 2,
            mediumPriority: 2,
            lowPriority: 1,
            openAlerts: 1,
            underReview: 2,
            resolved: 1,
            falsePositives: 1,
          },
        },
      ],
    };

    // Show report in modal
    showReportModal(reportData);
  }, 1500);
}

// Show Report Modal
function showReportModal(reportData) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${reportData.title}</h2>
        <span class="close-modal">&times;</span>
      </div>
      <div class="modal-body">
        <div class="report-info">
          <p><strong>Generated on:</strong> ${reportData.date}</p>
        </div>
        
        ${reportData.sections
          .map(
            (section) => `
          <div class="report-section">
            <h3>${section.name}</h3>
            <div class="report-data">
              ${Object.entries(section.data)
                .map(
                  ([key, value]) => `
                <div class="report-item">
                  <span class="report-key">${formatLabel(key)}:</span>
                  <span class="report-value">${value}</span>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
          )
          .join("")}
        
        <div class="report-actions">
          <button class="btn" onclick="downloadReport()">Download as PDF</button>
          <button class="btn" onclick="emailReport()">Email Report</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("modals-container").appendChild(modal);

  // Close modal when clicking the X
  modal.querySelector(".close-modal").addEventListener("click", () => {
    modal.remove();
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });
}

// Function to check if user table is empty and display message if needed
function checkEmptyUserTable() {
  const table = document.querySelector(".user-management .data-table tbody");
  const rows = table.querySelectorAll("tr:not(.no-data-message)");

  // Remove existing no-data message if it exists
  const existingMessage = table.querySelector(".no-data-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // If no rows, show a message
  if (rows.length === 0) {
    const messageRow = document.createElement("tr");
    messageRow.className = "no-data-message";
    messageRow.innerHTML = `<td colspan="7" style="text-align: center; padding: 20px;">No users available. Click "Add User" to create a new user.</td>`;
    table.appendChild(messageRow);
  }
}

// Add New User functionality
function showAddUserModal() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Add New User</h2>
        <span class="close-modal">&times;</span>
      </div>
      <div class="modal-body">
        <form id="add-user-form">
          <div class="form-group">
            <label for="user-name">Full Name</label>
            <input type="text" id="user-name" name="user-name" required>
          </div>
          
          <div class="form-group">
            <label for="user-email">Email Address</label>
            <input type="email" id="user-email" name="user-email" required>
          </div>
          
          <div class="form-group">
            <label for="user-role">Role</label>
            <select id="user-role" name="user-role" required>
              <option value="">Select a role</option>
              <option value="Administrator">Administrator</option>
              <option value="Moderator">Moderator</option>
              <option value="User">User</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="user-status">Status</label>
            <select id="user-status" name="user-status" required>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Banned">Banned</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="user-password">Initial Password</label>
            <input type="password" id="user-password" name="user-password" required>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn cancel-btn" onclick="this.closest('.modal').remove()">Cancel</button>
            <button type="submit" class="btn submit-btn">Create User</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById("modals-container").appendChild(modal);

  // Close modal when clicking the X
  modal.querySelector(".close-modal").addEventListener("click", () => {
    modal.remove();
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  // Form submission
  const form = modal.querySelector("#add-user-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const userData = {
      name: formData.get("user-name"),
      email: formData.get("user-email"),
      role: formData.get("user-role"),
      status: formData.get("user-status"),
      password: formData.get("user-password"),
    };

    // Show loading overlay
    showLoadingOverlay("Creating user...");

    // Simulate API call
    setTimeout(() => {
      hideLoadingOverlay();
      modal.remove();

      // Add new user to table
      addUserToTable(userData);

      // Show success message
      showNotification("User created successfully!", "success");
    }, 1000);
  });
}

// Function to add a new user to the table
function addUserToTable(userData) {
  const table = document.querySelector(".user-management .data-table tbody");
  const newRow = document.createElement("tr");

  // Generate a random ID
  const userId = `#${Math.floor(1000 + Math.random() * 9000)}`;

  newRow.innerHTML = `
    <td>${userId}</td>
    <td>${userData.name}</td>
    <td>${userData.email}</td>
    <td>${userData.role}</td>
    <td><span class="status status-${userData.status.toLowerCase()}">${
    userData.status
  }</span></td>
    <td>Just now</td>
    <td><button class="btn">Edit</button></td>
  `;

  // Add event listener to the new Edit button
  newRow.querySelector(".btn").addEventListener("click", function () {
    showEditUserModal(
      userId,
      userData.name,
      userData.email,
      userData.role,
      userData.status
    );
  });

  // Add row to table
  table.insertBefore(newRow, table.firstChild);

  // Check if we need to remove the no-data message
  checkEmptyUserTable();
}

// Edit User functionality
function showEditUserModal(userId, userName, userEmail, userRole, userStatus) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Edit User</h2>
        <span class="close-modal">&times;</span>
      </div>
      <div class="modal-body">
        <form id="edit-user-form">
          <input type="hidden" id="user-id" name="user-id" value="${userId}">
          
          <div class="form-group">
            <label for="user-name">Full Name</label>
            <input type="text" id="user-name" name="user-name" value="${userName}" required>
          </div>
          
          <div class="form-group">
            <label for="user-email">Email Address</label>
            <input type="email" id="user-email" name="user-email" value="${userEmail}" required>
          </div>
          
          <div class="form-group">
            <label for="user-role">Role</label>
            <select id="user-role" name="user-role" required>
              <option value="Administrator" ${
                userRole === "Administrator" ? "selected" : ""
              }>Administrator</option>
              <option value="Moderator" ${
                userRole === "Moderator" ? "selected" : ""
              }>Moderator</option>
              <option value="User" ${
                userRole === "User" ? "selected" : ""
              }>User</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="user-status">Status</label>
            <select id="user-status" name="user-status" required>
              <option value="Active" ${
                userStatus === "Active" ? "selected" : ""
              }>Active</option>
              <option value="Pending" ${
                userStatus === "Pending" ? "selected" : ""
              }>Pending</option>
              <option value="Banned" ${
                userStatus === "Banned" ? "selected" : ""
              }>Banned</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="reset-password">Reset Password</label>
            <input type="password" id="reset-password" name="reset-password" placeholder="Leave blank to keep unchanged">
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn delete-btn" onclick="confirmDeleteUser('${userId}')">Delete User</button>
            <div>
              <button type="button" class="btn cancel-btn" onclick="this.closest('.modal').remove()">Cancel</button>
              <button type="submit" class="btn submit-btn">Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById("modals-container").appendChild(modal);

  // Close modal when clicking the X
  modal.querySelector(".close-modal").addEventListener("click", () => {
    modal.remove();
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  // Form submission
  const form = modal.querySelector("#edit-user-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const userData = {
      id: formData.get("user-id"),
      name: formData.get("user-name"),
      email: formData.get("user-email"),
      role: formData.get("user-role"),
      status: formData.get("user-status"),
      password: formData.get("reset-password"),
    };

    // Show loading overlay
    showLoadingOverlay("Updating user...");

    // Simulate API call
    setTimeout(() => {
      hideLoadingOverlay();
      modal.remove();

      // Update user in table
      updateUserInTable(userData);

      // Show success message
      showNotification("User updated successfully!", "success");
    }, 1000);
  });
}

// Function to update a user in the table
function updateUserInTable(userData) {
  const table = document.querySelector(".user-management .data-table tbody");
  const rows = table.querySelectorAll("tr");

  rows.forEach((row) => {
    const userId = row.querySelector("td:first-child").textContent;

    if (userId === userData.id) {
      row.querySelector("td:nth-child(2)").textContent = userData.name;
      row.querySelector("td:nth-child(3)").textContent = userData.email;
      row.querySelector("td:nth-child(4)").textContent = userData.role;

      const statusSpan = row.querySelector("td:nth-child(5) .status");
      statusSpan.className = `status status-${userData.status.toLowerCase()}`;
      statusSpan.textContent = userData.status;
    }
  });
}

// Function to confirm user deletion
function confirmDeleteUser(userId) {
  const confirmModal = document.createElement("div");
  confirmModal.className = "modal";
  confirmModal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Confirm Delete</h2>
        <span class="close-modal">&times;</span>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete user ${userId}? This action cannot be undone.</p>
        
        <div class="form-actions">
          <button type="button" class="btn cancel-btn" onclick="this.closest('.modal').remove()">Cancel</button>
          <button type="button" class="btn delete-btn" onclick="deleteUser('${userId}')">Delete User</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("modals-container").appendChild(confirmModal);

  // Close modal when clicking the X
  confirmModal.querySelector(".close-modal").addEventListener("click", () => {
    confirmModal.remove();
  });

  // Close modal when clicking outside
  confirmModal.addEventListener("click", (event) => {
    if (event.target === confirmModal) {
      confirmModal.remove();
    }
  });
}

// Function to delete a user
function deleteUser(userId) {
  // Show loading overlay
  showLoadingOverlay("Deleting user...");

  // Close any open modals
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => modal.remove());

  // Simulate API call
  setTimeout(() => {
    hideLoadingOverlay();

    // Remove user from table
    const table = document.querySelector(".user-management .data-table tbody");
    const rows = table.querySelectorAll("tr");

    rows.forEach((row) => {
      const id = row.querySelector("td:first-child").textContent;

      if (id === userId) {
        row.remove();
      }
    });

    // Check if table is now empty and show message if needed
    checkEmptyUserTable();

    // Show success message
    showNotification("User deleted successfully!", "success");
  }, 1000);
}

// Export Logs functionality
function exportSecurityLogs() {
  // Show loading overlay
  showLoadingOverlay("Preparing security logs...");

  // Simulate API call
  setTimeout(() => {
    hideLoadingOverlay();

    // Show export options modal
    showExportOptionsModal();
  }, 1500);
}

// Show Export Options Modal
function showExportOptionsModal() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Export Security Logs</h2>
        <span class="close-modal">&times;</span>
      </div>
      <div class="modal-body">
        <form id="export-options-form">
          <div class="form-group">
            <label for="export-format">Export Format</label>
            <select id="export-format" name="export-format" required>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              <option value="pdf">PDF</option>
              <option value="xlsx">Excel (XLSX)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="date-range">Date Range</label>
            <select id="date-range" name="date-range" required>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days" selected>Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="custom">Custom Range...</option>
            </select>
          </div>
          
          <div id="custom-date-range" style="display: none;">
            <div class="form-group">
              <label for="start-date">Start Date</label>
              <input type="date" id="start-date" name="start-date">
            </div>
            
            <div class="form-group">
              <label for="end-date">End Date</label>
              <input type="date" id="end-date" name="end-date">
            </div>
          </div>
          
          <div class="form-group">
            <label for="include-fields">Include Fields</label>
            <div class="checkbox-group">
              <label><input type="checkbox" name="include-fields" value="alertId" checked> Alert ID</label>
              <label><input type="checkbox" name="include-fields" value="user" checked> User</label>
              <label><input type="checkbox" name="include-fields" value="query" checked> Search Query</label>
              <label><input type="checkbox" name="include-fields" value="reason" checked> Flag Reason</label>
              <label><input type="checkbox" name="include-fields" value="timestamp" checked> Timestamp</label>
              <label><input type="checkbox" name="include-fields" value="priority" checked> Priority</label>
              <label><input type="checkbox" name="include-fields" value="status" checked> Status</label>
              <label><input type="checkbox" name="include-fields" value="ipAddress"> IP Address</label>
              <label><input type="checkbox" name="include-fields" value="location"> Geographic Location</label>
              <label><input type="checkbox" name="include-fields" value="device"> Device Info</label>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn cancel-btn" onclick="this.closest('.modal').remove()">Cancel</button>
            <button type="submit" class="btn submit-btn">Export Now</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById("modals-container").appendChild(modal);

  // Close modal when clicking the X
  modal.querySelector(".close-modal").addEventListener("click", () => {
    modal.remove();
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  // Show/hide custom date range
  const dateRangeSelect = modal.querySelector("#date-range");
  const customDateRange = modal.querySelector("#custom-date-range");

  dateRangeSelect.addEventListener("change", () => {
    if (dateRangeSelect.value === "custom") {
      customDateRange.style.display = "block";
    } else {
      customDateRange.style.display = "none";
    }
  });

  // Form submission
  const form = modal.querySelector("#export-options-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const exportFormat = formData.get("export-format");
    const dateRange = formData.get("date-range");
    const includeFields = formData.getAll("include-fields");

    // Show loading overlay
    showLoadingOverlay(`Generating ${exportFormat.toUpperCase()} export...`);

    // Simulate export process
    setTimeout(() => {
      hideLoadingOverlay();
      modal.remove();

      // Simulate download
      simulateFileDownload(`security_logs_${dateRange}.${exportFormat}`);

      // Show success message
      showNotification(
        `Security logs exported successfully as ${exportFormat.toUpperCase()}!`,
        "success"
      );
    }, 2000);
  });
}

// Function to simulate file download
function simulateFileDownload(filename) {
  const link = document.createElement("a");
  link.href = "javascript:void(0)";
  link.download = filename;
  link.click();
}

// Function to show a loading overlay
function showLoadingOverlay(message = "Loading...") {
  // Create overlay if it doesn't exist
  let overlay = document.getElementById("loading-overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "loading-overlay";
    overlay.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-message">${message}</div>
    `;
    document.body.appendChild(overlay);
  } else {
    overlay.querySelector(".loading-message").textContent = message;
    overlay.style.display = "flex";
  }
}

// Function to hide the loading overlay
function hideLoadingOverlay() {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

// Function to show a notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-message">${message}</div>
      <button class="notification-close">&times;</button>
    </div>
  `;

  document.body.appendChild(notification);

  // Close button functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      notification.remove();
    });

  // Auto close after 5 seconds
  setTimeout(() => {
    notification.classList.add("notification-hiding");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Helper function to format camelCase or snake_case to Title Case with spaces
function formatLabel(str) {
  return (
    str
      // Insert space before uppercase letters
      .replace(/([A-Z])/g, " $1")
      // Replace underscores with spaces
      .replace(/_/g, " ")
      // Capitalize first letter of each word
      .replace(/\b\w/g, (c) => c.toUpperCase())
      // Trim leading spaces
      .trim()
  );
}

// Report download function (just a simulation)
function downloadReport() {
  showLoadingOverlay("Preparing PDF...");

  setTimeout(() => {
    hideLoadingOverlay();
    simulateFileDownload("admin_report.pdf");
    showNotification("Report downloaded successfully!", "success");
  }, 1500);
}

// Email report function
function emailReport() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Email Report</h2>
        <span class="close-modal">&times;</span>
      </div>
      <div class="modal-body">
        <form id="email-report-form">
          <div class="form-group">
            <label for="email-recipients">Recipients</label>
            <input type="text" id="email-recipients" name="email-recipients" 
                   placeholder="Enter email addresses separated by commas" required>
          </div>
          
          <div class="form-group">
            <label for="email-subject">Subject</label>
            <input type="text" id="email-subject" name="email-subject" 
                   value="Admin Dashboard Report - ${new Date().toLocaleDateString()}" required>
          </div>
          
          <div class="form-group">
            <label for="email-message">Message (Optional)</label>
            <textarea id="email-message" name="email-message" rows="4"></textarea>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn cancel-btn" onclick="this.closest('.modal').remove()">Cancel</button>
            <button type="submit" class="btn submit-btn">Send Email</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById("modals-container").appendChild(modal);

  // Close modal when clicking the X
  modal.querySelector(".close-modal").addEventListener("click", () => {
    modal.remove();
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  // Form submission
  const form = modal.querySelector("#email-report-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const recipients = formData.get("email-recipients");

    // Show loading overlay
    showLoadingOverlay("Sending email...");

    // Simulate API call
    setTimeout(() => {
      hideLoadingOverlay();
      modal.remove();

      // Show success message
      showNotification(
        `Report emailed successfully to ${
          recipients.split(",").length
        } recipient(s)!`,
        "success"
      );
    }, 1500);
  });
}
