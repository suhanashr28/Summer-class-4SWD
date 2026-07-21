// Home Page
function loginPage() {
    window.location.href = "login.html";
}

function signupPage() {
    window.location.href = "signup.html";
}

// Login & Signup
function dashboardPage() {
    window.location.href = "dashboard.html";
}

// Dashboard
function productsPage() {
    window.location.href = "product.html";
}

function suppliersPage() {
    window.location.href = "supplier-list.html";
}

function reportsPage() {
    window.location.href = "reports.html";
}

// Products
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
    if (confirm("Are you sure you want to delete this product?")) {
        window.location.href = "product.html";
    }
}

// Suppliers
function addSupplierPage() {
    window.location.href = "add-supplier.html";
}

function editSupplierPage() {
    window.location.href = "edit-supplier.html";
}

// Reports
function printReport() {
    window.print();
}

function exportPDF() {
    alert("PDF Export Feature Coming Soon");
}

// Logout
function logoutPage() {
    window.location.href = "login.html";
}

function settingsPage() {
    window.location.href = "setting.html";
}

function saveSettings() {
    alert("Setting Saved Successfully!");
}

function scrollToFeatures() {
    document.getElementById("features").scrollIntoView({
        behavior: "smooth"
    });
}