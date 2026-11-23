(() => {
  let recorded = false;
  let inFlight = false;
  function isAdmin() {
    try { return localStorage.getItem('mhatati_admin_device') === '1'; } catch { return false; }
  }
  async function record() {
    if (recorded || inFlight || isAdmin() || document.visibilityState !== 'visible' || navigator.webdriver) return;
    inFlight = true;
    try {
      const response = await fetch('/api/visitors', { method: 'POST', credentials: 'same-origin', cache: 'no-store' });
      recorded = response.ok;
    } catch { /* Tracking must never interrupt orders or navigation. */ }
    finally { inFlight = false; }
  }
  setTimeout(record, 10000);
  document.addEventListener('visibilitychange', () => { if (!recorded) setTimeout(record, 10000); });
  window.addEventListener('online', record);
})();
