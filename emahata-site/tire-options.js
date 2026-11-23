(() => {
    const form = document.getElementById('naftalForm');
    const fields = ['tireWidth', 'tireAspect', 'tireRim'].map(id => document.getElementById(id));
    function updateSize() {
        const [width, aspect, rim] = fields.map(field => field.value);
        const complete = fields.every(field => field.value !== '');
        const size = complete ? `${width}/${aspect} R${rim}` : '';
        document.getElementById('sizeSelect').value = size;
        document.getElementById('tireSizeSummary').textContent = size || 'يرجى الاختيار';
        document.getElementById('wheel-size-display').textContent = complete ? `R${rim} ${width}/${aspect}` : 'يرجى الاختيار';
    }
    fields.forEach(field => field.addEventListener('change', updateSize));
    form.addEventListener('reset', () => setTimeout(updateSize, 0));
    updateSize();
})();
