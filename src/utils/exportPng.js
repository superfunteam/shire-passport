import html2canvas from 'html2canvas';

/**
 * Export the passport as a PNG
 * Uses html2canvas to capture a hidden export template
 */
export async function exportPassportPng(options = {}) {
  const {
    name = 'A Humble Hobbit',
    templateSelector = '#passport-export-template',
  } = options;

  const template = document.querySelector(templateSelector);
  if (!template) {
    throw new Error('Export template not found');
  }

  // Make template visible for capture (positioned off-screen)
  const originalDisplay = template.style.display;
  const originalPosition = template.style.position;
  const originalLeft = template.style.left;

  template.style.display = 'block';
  template.style.position = 'absolute';
  template.style.left = '-9999px';

  try {
    const canvas = await html2canvas(template, {
      scale: 2, // Higher resolution
      useCORS: true,
      backgroundColor: '#f9f6f0',
      logging: false,
    });

    // Convert to blob and download
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create image blob'));
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const safeName = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        link.download = `shire-passport-${safeName}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        resolve();
      }, 'image/png');
    });

  } finally {
    // Restore original styles
    template.style.display = originalDisplay;
    template.style.position = originalPosition;
    template.style.left = originalLeft;
  }
}

/**
 * Format date for display on certificate
 */
export function formatCertificateDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
