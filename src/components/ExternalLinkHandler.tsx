'use client';

import { useEffect } from 'react';

/**
 * External Link Handler
 * 
 * Automatically adds target="_blank" and rel="noopener noreferrer" 
 * to external links in WordPress ACF content (prose sections).
 * 
 * This is needed because RankMath's "Open external links in new tab" 
 * feature only works for post_content, not ACF fields.
 * 
 * Works with:
 * - About section text
 * - Contact section text
 * - Portfolio descriptions
 * - Experience descriptions
 * - Education descriptions
 * - Skills descriptions
 * - Any other .prose content with external links
 */

export function ExternalLinkHandler() {
  useEffect(() => {
    // Function to process external links
    const processExternalLinks = () => {
      // Get all links within prose sections
      const proseLinks = document.querySelectorAll('.prose a, .body-text a');
      
      proseLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip if no href or already has target
        if (!href || link.hasAttribute('target')) return;
        
        // Check if it's an external link
        // External if:
        // 1. Starts with http:// or https://
        // 2. Does NOT contain wp.aykutaskeri.de
        const isExternal = href.startsWith('http') && 
                          !href.includes('wp.aykutaskeri.de') &&
                          !href.includes('aykutaskeri.de');
        
        if (isExternal) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
          
          // Optional: Add external-link class for additional styling
          link.classList.add('external-link');
        }
      });
    };
    
    // Run immediately
    processExternalLinks();
    
    // Also run when DOM changes (for dynamic content)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          processExternalLinks();
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // This component doesn't render anything
  return null;
}