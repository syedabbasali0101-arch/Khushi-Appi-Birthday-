const pages = document.querySelectorAll('.page');
const $ = id => document.getElementById(id);

// ===== EASY EDIT SETTINGS =====
const secretCode = 'billu';
const introText = 'Every memory with you is a beautiful chapter of my life, Billu Jii. 💜';
const letterText = `Happy Birthday, Billu Jii! 🎂💜\n\nToday is your day, and I wanted to make something a little different for you.\n\nMay this new year of your life bring you countless reasons to smile, beautiful memories to keep, and all the happiness you deserve.\n\nMay Allah protect you, keep you healthy and happy, and make every step ahead beautiful.\n\nOnce again — Happy Birthday, Khushi. 💜\n\nAnd now… your little BTS surprise. 😌✨`;

const cards = [
 {short:'RM', name:'KIM NAMJOON', file:'rm.jpg', wish:'Happy Birthday, Billu Jii! Keep dreaming, keep growing, and keep being beautifully yourself. May this year bring you new reasons to smile. 💜'},
 {short:'JIN', name:'KIM SEOKJIN', file:'jin.jpg', wish:'Happy Birthday, Billu Jii! Wishing you a day full of laughter, warm memories and little moments that make your heart happy. 🎂💜'},
 {short:'SUGA', name:'MIN YOONGI', file:'suga.jpg', wish:'May this new year bring you peace, beautiful memories and the freedom to enjoy every moment at your own pace. Happy Birthday! 💜'},
 {short:'J-HOPE', name:'JUNG HOSEOK', file:'jhope.jpg', wish:'Keep your sunshine bright, Billu Jii! May your birthday be filled with hope, happiness, laughter and plenty of reasons to dance. ✨💜'},
 {short:'JIMIN', name:'PARK JIMIN', file:'jimin.jpg', wish:'Happy Birthday! May every day ahead be softer, brighter and filled with people and moments that make you feel truly loved. 💜'},
 {short:'V', name:'KIM TAEHYUNG', file:'v.jpg', wish:'Wishing you a beautiful birthday and a year full of quiet joys, unforgettable memories and special little moments worth keeping. 💜'},
 {short:'JUNG KOOK', name:'JEON JUNGKOOK', file:'jungkook.jpg', wish:'Happy Birthday, Billu Jii! Keep smiling, keep shining and enjoy every beautiful moment that comes your way. Have the happiest year ahead! 💜✨'}
];

function showPage(id){ pages.forEach(p => p.classList.remove('active')); $(id).classList.add('active'); window.scrollTo(0,0); }
$('continueBtn').onclick = () => showPage('password');
$('passInput').addEventListener('keydown', e => { if(e.key === 'Enter') $('unlockBtn').click(); });
$('unlockBtn').onclick = () => {
  if($('passInput').value.trim().toLowerCase() === secretCode){ $('error').textContent=''; showPage('intro'); typingEffect(); }
  else $('error').textContent='Wrong Secret Code 💜';
};
function typingEffect(){ const box=$('typing'); box.textContent=''; let i=0; const t=setInterval(()=>{ box.textContent+=introText[i++]; if(i>=introText.length) clearInterval(t); },45); }

$('startMemory').onclick = () => { showPage('gallery'); playMusic(); startSlider(); };
function playMusic(){ const m=$('music'); m.volume=.45; m.play().catch(()=>{}); }

const slides = document.querySelectorAll('#memorySlider img');
let currentSlide=0, sliderStarted=false;
function startSlider(){ if(sliderStarted)return; sliderStarted=true; slides.forEach(s=>s.style.display='none'); createDots(); showSlide(); setInterval(()=>{currentSlide=(currentSlide+1)%slides.length;showSlide();},2800); }
function createDots(){ slides.forEach((_,i)=>{const d=document.createElement('span');d.className='dot';d.onclick=()=>{currentSlide=i;showSlide()};$('dots').appendChild(d);}); }
function showSlide(){ slides.forEach((s,i)=>s.style.display=i===currentSlide?'block':'none'); document.querySelectorAll('#dots .dot').forEach((d,i)=>d.classList.toggle('active',i===currentSlide)); }

$('nextBtn').onclick=()=>{showPage('letter');typeLetter();};
function typeLetter(){const box=$('letterText');box.textContent='';let i=0;const t=setInterval(()=>{box.textContent+=letterText[i++];if(i>=letterText.length)clearInterval(t)},16);}
$('btsBtn').onclick=()=>{showPage('bts');initCards();};

let cardIndex=0, seen=new Set(), cardsReady=false;
function initCards(){if(cardsReady)return;cardsReady=true;cards.forEach((_,i)=>{const d=document.createElement('button');d.className='card-dot';d.setAttribute('aria-label',`Card ${i+1}`);d.onclick=()=>goCard(i);$('cardDots').appendChild(d);});renderCard();}
function renderCard(){const c=cards[cardIndex];$('cardNo').textContent=`0${cardIndex+1} / 07`;$('memberLabel').textContent=c.short;$('memberFullName').textContent=c.name;$('wishText').textContent=c.wish;$('cardProgress').textContent=`${cardIndex+1} of 7`;$('memberPhoto').src=`BTS/${c.file}`;$('memberPhoto').alt=c.name;$('memberPhoto').style.display='block';$('photoFallback').style.display='none';$('memberPhoto').onerror=()=>{$('memberPhoto').style.display='none';$('photoFallback').style.display='flex';$('photoFallback').textContent=c.short;};seen.add(cardIndex);document.querySelectorAll('.card-dot').forEach((d,i)=>d.classList.toggle('active',i===cardIndex));if(seen.size===7){$('finalBtn').disabled=false;$('finalBtn').textContent='View All 7 Wishes 💜';burstHearts(12);}}
function goCard(i){cardIndex=(i+7)%7;renderCard();}
$('nextCard').onclick=()=>goCard(cardIndex+1);$('prevCard').onclick=()=>goCard(cardIndex-1);
let startX=0;
$('wishCard').addEventListener('touchstart',e=>startX=e.changedTouches[0].clientX,{passive:true});
$('wishCard').addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45)goCard(cardIndex+(dx<0?1:-1));},{passive:true});
$('finalBtn').onclick=()=>{showPage('final');burstHearts(28);};

let secretTaps=0,secretTimer;
$('secretHeart').onclick=()=>{secretTaps++;clearTimeout(secretTimer);$('secretHeart').textContent=secretTaps>=7?'💌':'💜';if(secretTaps>=7){$('secretMessage').style.display='flex';secretTaps=0;$('secretHeart').textContent='💜';return;}secretTimer=setTimeout(()=>{secretTaps=0;$('secretHeart').textContent='💜';},1800);};
function closeSecret(){$('secretMessage').style.display='none';}
function burstHearts(count){const container=$('hearts');for(let i=0;i<count;i++){const h=document.createElement('span');h.className='floating-heart';h.textContent=Math.random()>.5?'💜':'✨';h.style.left=`${Math.random()*100}%`;h.style.animationDuration=`${3+Math.random()*3}s`;h.style.fontSize=`${14+Math.random()*20}px`;container.appendChild(h);setTimeout(()=>h.remove(),6500);}}
setInterval(()=>burstHearts(1),1800);
