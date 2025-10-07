// utils.js - Helper functions

export function createPageUrl(pageName) {
  // Convert page name to URL path
  // Examples: "Marketing" -> "/marketing", "Paywall" -> "/paywall"
  return `/${pageName.toLowerCase()}`;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
