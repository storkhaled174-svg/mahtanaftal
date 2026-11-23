/* Searchable RTL location picker; native required selects retain form validation. */
const wilayaSelect = document.getElementById('wilaya');
const communeSelect = document.getElementById('baladiya');
const locationDialog = document.getElementById('locationDialog');
const locationSearch = document.getElementById('locationSearch');
const locationResults = document.getElementById('locationResults');
let activeLocationField = 'wilaya';
const wilayaLabel = w => `${w.code} - ${w.name}`;
const normalizeLocation = text => String(text).normalize('NFKD').replace(/[\u064B-\u065F\u0670\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/[٠-٩]/g,d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).toLowerCase().trim();
function selectedWilaya() { return ALGERIA_LOCATIONS.find(w => wilayaLabel(w) === wilayaSelect.value); }
function syncLocationButton(id, placeholder) {
    const select = document.getElementById(id);
    document.getElementById(id+'Picker').firstElementChild.textContent = select.value || placeholder;
}
function updateBaladiyat() {
    const w = selectedWilaya();
    communeSelect.replaceChildren(new Option(w ? 'اختر البلدية' : 'اختر الولاية أولاً', ''));
    if (w) for (const c of [...w.communes].sort((a,b)=>a.name.localeCompare(b.name,'ar'))) communeSelect.add(new Option(c.name,c.name));
    communeSelect.disabled = !w;
    document.getElementById('baladiyaPicker').disabled = !w;
    syncLocationButton('wilaya','اختر الولاية');
    syncLocationButton('baladiya',w ? 'اختر البلدية' : 'اختر الولاية أولاً');
}
function validLocationSelection() {
    const w = selectedWilaya();
    return !!w && w.communes.some(c => c.name === communeSelect.value);
}
function renderLocations() {
    const select = document.getElementById(activeLocationField);
    const q = normalizeLocation(locationSearch.value);
    const options = [...select.options].filter(o => o.value && normalizeLocation(o.textContent).includes(q));
    locationResults.replaceChildren();
    document.getElementById('locationCount').textContent = options.length ? `${options.length} نتيجة` : 'لا توجد نتائج مطابقة';
    for (const option of options) {
        const button = document.createElement('button');
        button.type='button'; button.className='location-option';
        button.textContent=option.textContent;
        button.setAttribute('aria-pressed',String(select.value===option.value));
        button.addEventListener('click',()=>{
            select.value=option.value;
            select.dispatchEvent(new Event('change',{bubbles:true}));
            if(activeLocationField==='baladiya') syncLocationButton('baladiya','اختر البلدية');
            locationDialog.close();
        });
        locationResults.append(button);
    }
    locationResults.scrollTop=0;
}
function openLocationPicker(id) {
    if(document.getElementById(id+'Picker').disabled) return;
    activeLocationField=id;
    document.getElementById('locationTitle').textContent=id==='wilaya' ? 'اختر الولاية' : `اختر البلدية — ${selectedWilaya().name}`;
    locationSearch.placeholder=id==='wilaya' ? 'ابحث بالاسم أو رقم الولاية' : 'ابحث عن البلدية';
    locationSearch.value='';renderLocations();
    if(!locationDialog.open) locationDialog.showModal();
    locationSearch.focus();
}
for(const id of ['wilaya','baladiya']) {
    document.getElementById(id+'Picker').addEventListener('click',()=>openLocationPicker(id));
    document.getElementById(id).addEventListener('invalid',e=>{
        e.preventDefault();
        if(!locationDialog.open) openLocationPicker(communeSelect.disabled ? 'wilaya' : id);
    });
}
wilayaSelect.addEventListener('change',updateBaladiyat);
locationSearch.addEventListener('input',renderLocations);
locationSearch.addEventListener('keydown',e=>{
    if(e.key==='ArrowDown'){e.preventDefault();locationResults.querySelector('button')?.focus();}
});
locationResults.addEventListener('keydown',e=>{
    const buttons=[...locationResults.querySelectorAll('button')];const index=buttons.indexOf(document.activeElement);
    if(e.key==='ArrowDown'||e.key==='ArrowUp') {e.preventDefault();buttons[(index+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length]?.focus();}
    if(e.key==='Home'){e.preventDefault();buttons[0]?.focus();}
    if(e.key==='End'){e.preventDefault();buttons.at(-1)?.focus();}
});
document.getElementById('locationClose').addEventListener('click',()=>locationDialog.close());
locationDialog.addEventListener('click',e=>{if(e.target===locationDialog){const r=locationDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)locationDialog.close();}});
locationDialog.addEventListener('close',()=>document.getElementById(activeLocationField+'Picker').focus());
function resetLocationPickers(){wilayaSelect.value='';updateBaladiyat();}
for(const w of ALGERIA_LOCATIONS) wilayaSelect.add(new Option(wilayaLabel(w),wilayaLabel(w)));
resetLocationPickers();
