(() => {
    const card = document.getElementById('wheelPreviewCard');
    const image = document.getElementById('wheel-preview-img');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reset = () => {
        image.style.removeProperty('--wheel-x');
        image.style.removeProperty('--wheel-y');
    };
    card.addEventListener('pointermove', event => {
        if (reduced.matches || event.pointerType !== 'mouse') return;
        const rect = card.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
        image.style.setProperty('--wheel-x', `${-y * 5}deg`);
        image.style.setProperty('--wheel-y', `${x * 8}deg`);
    });
    card.addEventListener('pointerleave', reset);
    card.addEventListener('pointercancel', reset);
    reduced.addEventListener('change', reset);
})();
