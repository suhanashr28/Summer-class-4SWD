
function homePage() {
  window.location.href = "home.html";
}

function loginPage() {
  window.location.href = "login.html";
}

function signupPage() {
  window.location.href = "signup.html";
}

function dashboardPage() {
  window.location.href = "dashboard.html";
}

function productsPage() {
  window.location.href = "product.html";
}

function suppliersPage() {
  window.location.href = "supplier-list.html";
}

function reportsPage() {
  window.location.href = "reports.html";
}

function settingsPage() {
  window.location.href = "setting.html";
}

function accessDeniedPage() {
  window.location.href = "access.html";
}

function logoutPage() {
  window.location.href = "login.html";
}

// ---- Product actions ----
function addProductPage() {
  window.location.href = "add-product.html";
}

function viewProductPage() {
  window.location.href = "view-product.html";
}

function editProductPage() {
  window.location.href = "edit-product.html";
}

function deleteProductPage() {
  const confirmed = window.confirm("Are you sure you want to delete this product?");
  if (confirmed) {
    window.location.href = "product.html";
  }
}

// ---- Supplier actions ----
function addSupplierPage() {
  window.location.href = "add-supplier.html";
}

function viewSupplierPage() {
  window.location.href = "view-supplier.html";
}

function editSupplierPage() {
  window.location.href = "edit-supplier.html";
}

function deleteSupplierPage() {
  const confirmed = window.confirm("Are you sure you want to delete this supplier?");
  if (confirmed) {
    window.location.href = "supplier-list.html";
  }
}

// ---- Reports actions ----
function printReport() {
  window.print();
}

function exportPDF() {
  window.alert("Exporting report as PDF...");
}

// ---- Settings actions ----
function saveSettings() {
  window.alert("Settings saved successfully.");
}

// ---- Home page helper ----
function scrollToFeatures() {
  const el = document.querySelector(".features");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
