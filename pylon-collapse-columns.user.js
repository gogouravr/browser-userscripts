// ==UserScript==
// @name         Always Collapse 'New' and 'On You' Columns in Pylon
// @namespace    https://yourdomain.com
// @version      1.0
// @description  Auto-collapses 'New' and 'On You' columns in Pylon boards
// @author       gourav
// @match        https://app.usepylon.com/issues/views/all-issues*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
  
    const TARGET_COLUMNS = ["New", "On you"];
  
    const collapseColumns = () => {
      document.querySelectorAll('.issue-column').forEach(col => {
        const header = col.querySelector('.issue-column__header');
        if (!header) return;
  
        const label = header.textContent.trim();
        const isTarget = TARGET_COLUMNS.some(t => label.includes(t));
  
        // Collapse only if it's open and matches our targets
        if (isTarget && col.classList.contains('issue-column--open')) {
          header.click();
          console.log(`Collapsed column: ${label}`);
        }
      });
    };
  
    // Run once after page loads
    collapseColumns();
  
    // Watch for dynamic changes
    const observer = new MutationObserver(() => collapseColumns());
    observer.observe(document.body, { childList: true, subtree: true });
  })();
  