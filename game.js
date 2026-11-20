const titleScreen = document.querySelector('#titleScreen');
const storyScreen = document.querySelector('#storyScreen');
const startButton = document.querySelector('#startButton');
const continueButton = document.querySelector('#continueButton');
const dialogueText = document.querySelector('#dialogueText');
const homeButton = document.querySelector('#homeButton');
const titleArt = document.querySelector('.title-art');
const catsScreen = document.querySelector('#catsScreen');
const catsHomeButton = document.querySelector('#catsHomeButton');
const backToStoryButton = document.querySelector('#backToStory');
const homeScreen = document.querySelector('#homeScreen');
const homeTitleButton = document.querySelector('#homeTitleButton');
const nextDayButton = document.querySelector('#nextDayButton');
const buyFeedButton = document.querySelector('#buyFeedButton');
const skipFeedButton = document.querySelector('#skipFeedButton');
const collectEventButton = document.querySelector('#collectEventButton');
const openEventAlbumButton = document.querySelector('#openEventAlbum');
const closeEventAlbumButton = document.querySelector('#closeEventAlbum');
const eventAlbum = document.querySelector('#eventAlbum');
const albumList = document.querySelector('#albumList');

let started = false;
let nextLine = 1;
let finished = false;
const openingLines = [
  '오늘도 무사히 퇴근. 현관문을 열자, 네 쌍의 눈이 나를 바라본다.',
  '“다녀왔어.” 대답 대신 작은 발소리들이 집 안을 가로지른다.',
  '바쁜 평일엔 짧은 인사만. 그래도 주말은 온전히 너희 차례야.'
];
const weekdayNames = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
const dailyFoodGrams = 360;
const salaryAmount = 3000000;
const feedBagGrams = 1000;
const feedBagPrice = 100000;
const illnessFee = 50000;
const initialGameState = { day: 0, money: 2450000, foodGrams: 3000, leaveDays: 12, lastEventId: '', lastEaten: 0, lastShortage: 0, lastNotices: [], salaryMonths: [], leaveYears: [2026], collectedEvents: [] };
const events = [
  { id: 'tofu-kneading', cat: '두부 · 장모 화이트', mood: '다정한 아침', title: '침대 위의 작은 마사지', story: '이른 아침, 두부가 침대로 올라와 앞발로 이불을 꾹꾹 눌러준다. 잠이 덜 깬 집사 곁에서 한참을 골골거렸다.', outcome: '두부와 포근한 아침을 보냈다. 애정이 조금 깊어졌다.', money: 0, food: 0 },
  { id: 'tofu-greeting', cat: '두부 · 장모 화이트', mood: '반가운 퇴근', title: '현관까지 마중 나온 두부', story: '문을 열자 두부가 꼬리를 세우고 종종걸음으로 다가온다. 오늘 하루의 피로가 조금 풀리는 기분이다.', outcome: '두부가 먼저 다가와 반겨주었다.', money: 0, food: 0 },
  { id: 'cheese-snack', cat: '치즈 · 치즈 태비', mood: '간식 소동', title: '뒤집힌 밥그릇', story: '치즈가 갑자기 배가 고팠는지 밥그릇을 계속 엎어 놓았다. 빈 그릇을 보니 마음이 쓰여 편의점에 간식을 사러 다녀왔다.', outcome: '편의점 간식 구매', money: -3000, food: 0 },
  { id: 'cheese-lap', cat: '치즈 · 치즈 태비', mood: '느긋한 저녁', title: '무릎을 차지한 치즈', story: '소파에 앉자 치즈가 기다렸다는 듯 무릎 위에 올라와 동그랗게 몸을 말았다. 한동안 꼼짝하기 어려웠지만 싫지 않았다.', outcome: '치즈와 조용한 휴식을 보냈다.', money: 0, food: 0 },
  { id: 'kai-mouse', cat: '카이 · 블랙 태비', mood: '뜻밖의 선물', title: '카이의 작은 공로', story: '카이가 옆집 상냥한 아가씨를 놀라게 한 쥐를 잡았다. 고마워한 이웃이 보답으로 고양이 사료를 선물해 주었다.', outcome: '이웃의 선물 · 사료 1kg 획득', money: 0, food: 1000 },
  { id: 'kai-toy', cat: '카이 · 블랙 태비', mood: '조용한 호기심', title: '장난감을 문 앞에', story: '카이가 좋아하는 장난감을 물고 와 집사 발치에 내려놓았다. 놀아 달라는 표현인지, 오늘은 유난히 곁을 맴돈다.', outcome: '카이와 장난감으로 잠깐 놀아주었다.', money: 0, food: 0 },
  { id: 'kkam-skin', cat: '깜댕이 · 블랙 캣', mood: '건강 관리', title: '깜댕이의 피부를 살펴보다', story: '깜댕이가 또 어딘가를 뒤지고 온 모양이다. 피부를 살펴보니 트러블이 보여 병원에 다녀와 관리에 필요한 비용을 냈다.', outcome: '피부병 진료 및 관리 지출', money: -50000, food: 0 },
  { id: 'kkam-trust', cat: '깜댕이 · 블랙 캣', mood: '조금 가까워진 날', title: '도망가지 않은 깜댕이', story: '퇴근해 다가가도 깜댕이는 오늘 도망가지 않았다. 조금 떨어진 자리에서 눈을 천천히 깜빡여 주었다.', outcome: '깜댕이와 한 뼘 가까워졌다.', money: 0, food: 0 }
];
const generatedEventArt = {
  'tofu-kneading': '/ai-images/event-tofu-kneading.webp',
  'tofu-greeting': '/ai-images/event-tofu-greeting.webp',
  'cheese-snack': '/ai-images/event-cheese-bowl.webp',
  'cheese-lap': '/ai-images/event-cheese-lap.webp',
  'kai-mouse': '/ai-images/event-kai-mouse.webp',
  'kai-toy': '/ai-images/event-kai-toy.webp',
  'kkam-skin': '/ai-images/event-kkam-care.webp',
  'kkam-trust': '/ai-images/event-kkam-trust.webp'
};

function catIllustration({ x, y, fur, eye = '#465044', scale = 1, stripes = '', tail = 'M-43 45q-50 5-38-34 8-21 26-7', pose = 'sit' }) {
  const body = pose === 'curl'
    ? '<ellipse cx="0" cy="48" rx="91" ry="53"/><path d="M-45 60q-20-36 6-62 28-25 58 3 19 19 11 44" fill="none" stroke="currentColor" stroke-width="13"/>'
    : '<path d="M-62 78q-9-62 20-83 21-15 50-4 38 13 42 87l-17 22h-79z"/><path d="M-37 78v15m52-15v15" fill="none" stroke="#f5e9d3" stroke-opacity=".55" stroke-width="7" stroke-linecap="round"/>';
  return `<g transform="translate(${x} ${y}) scale(${scale})" fill="currentColor" style="color:${fur}"><ellipse cy="126" rx="80" ry="13" fill="#26312e" opacity=".22"/><path d="${tail}" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round"/>${body}${stripes}<path d="M-49 5-53-45l40 25m54 25 4-50-40 25" fill="currentColor" stroke="#544a3c" stroke-opacity=".15" stroke-width="3" stroke-linejoin="round"/><path d="m-42-11-2-18 27 18m40 0 27-18-2 18" fill="#d79b8e"/><ellipse cx="-25" cy="24" rx="5" ry="8" fill="${eye}"/><ellipse cx="25" cy="24" rx="5" ry="8" fill="${eye}"/><path d="m-4 42 4 4 4-4m-4 4q-9 12-19 5m19-5q9 12 19 5" fill="none" stroke="#bd837a" stroke-width="3" stroke-linecap="round"/><path d="m-22 45-39-7m39 15-43 5m87-13 39-7m-39 15 43 5" stroke="#eee5d3" stroke-opacity=".85" stroke-width="2"/></g>`;
}

function vectorEventArt(id) {
  const base = '<defs><linearGradient id="wall" x2="0" y2="1"><stop stop-color="#a9b2a2"/><stop offset="1" stop-color="#657a72"/></linearGradient><linearGradient id="floor" x2="0" y2="1"><stop stop-color="#bd9872"/><stop offset="1" stop-color="#795f4b"/></linearGradient></defs>';
  const stage = (wall, floor, decor, cats) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice">${base}<path fill="${wall}" d="M0 0h900v420H0z"/><path d="M0 420h900v180H0z" fill="${floor}"/>${decor}${cats}<path d="M0 418h900" stroke="#ead8b9" stroke-width="7"/><ellipse cx="450" cy="538" rx="300" ry="35" fill="#25302c" opacity=".17"/></svg>`;
  const art = {
    'cheese-snack': stage('#aab8aa', 'url(#floor)', '<path d="M82 70h250v230H82z" fill="#d4b78d"/><path d="M100 89h214v190H100z" fill="#e3c99f"/><path d="M205 89v190m-105-94h214" stroke="#9c8469" stroke-width="9"/><path d="M560 280h196v14H560z" fill="#765943"/><path d="M577 294v110m160-110v110" stroke="#765943" stroke-width="9"/><path d="M198 454h112l-17 65h-78z" fill="#a85f4d" transform="rotate(82 255 487)"/><ellipse cx="253" cy="482" rx="57" ry="17" fill="#e6d6b8"/><circle cx="225" cy="481" r="5" fill="#b89050"/><circle cx="253" cy="477" r="5" fill="#b89050"/><circle cx="278" cy="483" r="5" fill="#b89050"/>', catIllustration({ x: 500, y: 385, fur: '#df9f59', eye: '#514435', stripes: '<path d="M-46-4q20 23 6 44m78-44q-20 23-6 44M-47 77l19 15m75-15L28 92" fill="none" stroke="#a66c39" stroke-width="8" stroke-linecap="round"/>' })),
    'cheese-lap': stage('#66786e', 'url(#floor)', '<rect x="90" y="340" width="720" height="170" rx="48" fill="#a66f53"/><rect x="128" y="308" width="644" height="168" rx="54" fill="#c28b68"/><path d="M243 406q38-57 104-44l116 53q33 15 19 46H277q-69-9-34-55z" fill="#d7c6aa"/><path d="M480 475q120-76 237-4" fill="none" stroke="#eee2cf" stroke-width="18" stroke-linecap="round"/>', catIllustration({ x: 520, y: 360, fur: '#df9f59', eye: '#514435', scale: 1.2, pose: 'curl', tail: 'M-62 47q-67 18-51-26 11-27 39-12' , stripes: '<path d="M-50 36q28 20 49 2m-26 36q33 16 60-4m25-38q-21 21-42 2" fill="none" stroke="#a66c39" stroke-width="8" stroke-linecap="round"/>' })),
    'kai-mouse': stage('#9daca4', 'url(#floor)', '<path d="M655 46h185v374H655z" fill="#90785f"/><path d="M678 67h140v353H678z" fill="#d2b18b"/><circle cx="790" cy="242" r="8" fill="#81684f"/><path d="M685 402h132" stroke="#9f7b59" stroke-width="13"/><path d="M130 135h140v230H130z" fill="#b7c2ae"/><path d="M160 168q37-53 79 0v124h-79z" fill="#80958a"/><path d="M95 458h180l-20 83H115z" fill="#d4c8af"/><path d="M102 454h166" stroke="#f0e5d2" stroke-width="14"/><ellipse cx="359" cy="491" rx="19" ry="10" fill="#7d7470"/><circle cx="343" cy="487" r="8" fill="#7d7470"/><circle cx="369" cy="487" r="8" fill="#7d7470"/><path d="M373 491q27 4 24 22" fill="none" stroke="#7d7470" stroke-width="5"/><path d="M350 480l-6-12m22 12 7-12" stroke="#7d7470" stroke-width="4"/>', catIllustration({ x: 525, y: 372, fur: '#4c5553', eye: '#d4c179', scale: 1.12, stripes: '<path d="M-47-4q20 20 6 43m80-43q-20 20-6 43M-43 78l17 13m69-13L26 91" fill="none" stroke="#303938" stroke-width="8" stroke-linecap="round"/>' })),
    'kai-toy': stage('#a9b5a8', 'url(#floor)', '<rect x="79" y="68" width="230" height="210" fill="#516b70" stroke="#d5c6a9" stroke-width="14"/><path d="M194 68v210m-115-105h230" stroke="#d5c6a9" stroke-width="10"/><path d="M572 166q38-65 71 0l-35 48z" fill="#d6a254"/><path d="M608 212v80m-42-40h84" stroke="#d6a254" stroke-width="7"/><path d="M315 476q55-25 109 0-54 33-109 0z" fill="#b46f58"/><path d="M355 464v-22m-21 40-19 12m59-12 19 12" stroke="#d9c3a3" stroke-width="5"/>', catIllustration({ x: 510, y: 366, fur: '#4c5553', eye: '#d4c179', scale: 1.05, stripes: '<path d="M-47-4q20 20 6 43m80-43q-20 20-6 43M-43 78l17 13m69-13L26 91" fill="none" stroke="#303938" stroke-width="8" stroke-linecap="round"/>' })),
    'kkam-skin': stage('#d0d3c5', '#9c8c76', '<rect x="0" y="0" width="900" height="420" fill="#c8d0c4"/><rect x="70" y="66" width="224" height="176" rx="8" fill="#e7e5d6"/><path d="M102 110h160m-160 30h117m-117 30h136" stroke="#adb7aa" stroke-width="10" stroke-linecap="round"/><rect x="600" y="82" width="202" height="153" rx="6" fill="#a8b7ac"/><path d="M646 130h110m-110 28h75" stroke="#edf0e6" stroke-width="9" stroke-linecap="round"/><rect x="95" y="425" width="710" height="80" rx="20" fill="#e5ddca"/><path d="M128 490v53m644-53v53" stroke="#817362" stroke-width="12"/><path d="M285 300h116v42H285z" fill="#f3ead7"/><path d="M302 307v29m25-29v29m25-29v29m25-29v29" stroke="#baa990" stroke-width="4"/>', catIllustration({ x: 510, y: 362, fur: '#272b31', eye: '#d8bf72', scale: 1.1, stripes: '<path d="M-44-3q19 20 6 41m76-41q-19 20-6 41" fill="none" stroke="#41464c" stroke-width="8" stroke-linecap="round"/>' })),
    'kkam-trust': stage('#72877b', 'url(#floor)', '<rect x="0" y="0" width="900" height="420" fill="#667c72"/><rect x="82" y="65" width="260" height="225" fill="#435c60" stroke="#bda989" stroke-width="13"/><path d="M212 65v225m-130-112h260" stroke="#bda989" stroke-width="9"/><circle cx="281" cy="117" r="24" fill="#f3d29a" opacity=".8"/><path d="M108 420h286v21H108z" fill="#987b60"/><path d="M116 441v74m271-74v74" stroke="#6c5544" stroke-width="12"/><path d="M602 360q63-66 127 0v74H602z" fill="#ba8667"/><circle cx="664" cy="321" r="38" fill="#d1a987"/><path d="M633 318q30-22 61 0" fill="none" stroke="#51473d" stroke-width="5"/><path d="M655 324q10 7 20 0" fill="none" stroke="#51473d" stroke-width="4"/><ellipse cx="493" cy="523" rx="215" ry="33" fill="#d8cbb2" opacity=".35"/>', catIllustration({ x: 335, y: 386, fur: '#272b31', eye: '#d8bf72', scale: .92, stripes: '<path d="M-44-3q19 20 6 41m76-41q-19 20-6 41" fill="none" stroke="#41464c" stroke-width="8" stroke-linecap="round"/>' }))
  };
  return art[id] || art['tofu-greeting'];
}

function eventArtwork(event) {
  return generatedEventArt[event.id] || generatedEventArt['tofu-greeting'];
}
const catPortraits = [
  { selector: '.tofu-art', src: '/ai-images/cat-tofu.webp' },
  { selector: '.cheese-art', src: '/ai-images/cat-cheese.webp' },
  { selector: '.kai-art', src: '/ai-images/cat-kai.webp' },
  { selector: '.kkam-art', src: '/ai-images/cat-kkamdaeng.webp' }
];

catPortraits.forEach(({ selector, src }) => {
  const frame = document.querySelector(selector);
  frame.querySelector('svg').remove();
  const image = document.createElement('img');
  image.className = 'cat-portrait-image';
  image.src = src;
  image.alt = '';
  image.decoding = 'async';
  frame.prepend(image);
});

function loadGameState() {
  try {
    const saved = JSON.parse(localStorage.getItem('cat-house-save'));
    if (saved && Number.isInteger(saved.day) && Number.isFinite(saved.money) && Number.isFinite(saved.foodGrams)) {
      return {
        ...initialGameState,
        ...saved,
        collectedEvents: Array.isArray(saved.collectedEvents) ? saved.collectedEvents : [],
        salaryMonths: Array.isArray(saved.salaryMonths) ? saved.salaryMonths : [],
        leaveYears: Array.isArray(saved.leaveYears) ? saved.leaveYears : [2026],
        lastNotices: Array.isArray(saved.lastNotices) ? saved.lastNotices : []
      };
    }
  } catch {}
  return { ...initialGameState };
}

let gameState = loadGameState();
let activeEventId = '';

function adaptTitleArt() {
  titleArt.setAttribute('viewBox', window.matchMedia('(max-width: 700px)').matches ? '370 0 660 680' : '0 0 1400 620');
}

adaptTitleArt();
window.addEventListener('resize', adaptTitleArt);

function startGame() {
  if (started) return;
  started = true;
  titleScreen.classList.add('is-leaving');
  storyScreen.classList.add('is-active');
  storyScreen.setAttribute('aria-hidden', 'false');
  document.querySelector('#storyDate').textContent = formatDate(dateForDay(Math.max(1, gameState.day || 1)));
  window.setTimeout(() => titleScreen.setAttribute('aria-hidden', 'true'), 700);
}

function showCats() {
  storyScreen.classList.remove('is-active');
  storyScreen.setAttribute('aria-hidden', 'true');
  catsScreen.classList.add('is-active');
  catsScreen.setAttribute('aria-hidden', 'false');
}

function showHome() {
  catsScreen.classList.remove('is-active');
  catsScreen.setAttribute('aria-hidden', 'true');
  homeScreen.classList.add('is-active');
  homeScreen.setAttribute('aria-hidden', 'false');
  nextDayButton.focus({ preventScroll: true });
}

function renderHomeEvent(event, eaten, shortage) {
  const eventArt = document.querySelector('.event-art');
  const eventSceneImage = document.querySelector('#eventSceneImage');
  activeEventId = event.id;
  document.querySelector('#dayLabel').textContent = formatDate(dateForDay(gameState.day));
  document.querySelector('#dayCount').textContent = `DAY ${String(gameState.day).padStart(2, '0')}`;
  document.querySelector('#moneyValue').textContent = `${gameState.money.toLocaleString('ko-KR')}`;
  document.querySelector('#storyMoneyValue').textContent = gameState.money.toLocaleString('ko-KR');
  document.querySelector('#foodValue').textContent = `${(gameState.foodGrams / 1000).toFixed(2)}kg`;
  document.querySelector('#leaveValue').textContent = `${gameState.leaveDays}일`;
  document.querySelector('#eventTitle').textContent = event.title;
  document.querySelector('#eventCat').textContent = event.cat;
  document.querySelector('#eventMood').textContent = event.mood;
  document.querySelector('#eventStory').textContent = event.story;
  const moneyChange = event.money ? ` · ${event.money < 0 ? '−' : '+'}₩${Math.abs(event.money).toLocaleString('ko-KR')}` : '';
  const foodChangeText = event.food ? ` · 사료 +${event.food}g` : '';
  document.querySelector('#eventOutcome').textContent = `${event.outcome}${moneyChange}${foodChangeText}${gameState.lastNotices.length ? ` · ${gameState.lastNotices.join(' · ')}` : ''}`;
  document.querySelector('#foodChange').textContent = `−${eaten}g`;
  updateEventCollection();
  eventArt.dataset.cat = event.id.split('-')[0];
  eventSceneImage.src = eventArtwork(event);
  const warning = document.querySelector('#foodWarning');
  warning.hidden = !shortage;
  warning.textContent = shortage ? `사료가 ${shortage}g 부족해요. 사료통이 비어 있습니다.` : '';
  document.querySelector('#feedDecision').hidden = true;
  document.querySelector('#eventNotices').hidden = !gameState.lastNotices.length;
  document.querySelector('#eventNotices').textContent = gameState.lastNotices.join(' · ');
}

function dateForDay(day) {
  const date = new Date(2026, 0, 1);
  date.setDate(date.getDate() + Math.max(0, day - 1));
  return date;
}

function formatDate(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 · ${weekdayNames[date.getDay() === 0 ? 6 : date.getDay() - 1]}`;
}

function applyCalendarIncome(date) {
  const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  if (date.getDate() === 20 && !gameState.salaryMonths.includes(monthKey)) {
    gameState.money += salaryAmount;
    gameState.salaryMonths.push(monthKey);
    gameState.lastNotices.push(`월급 +₩${salaryAmount.toLocaleString('ko-KR')}`);
  }
  const year = date.getFullYear();
  if (date.getMonth() === 0 && date.getDate() === 1 && !gameState.leaveYears.includes(year)) {
    gameState.leaveDays += 12 + Math.max(0, year - 2026);
    gameState.leaveYears.push(year);
    gameState.lastNotices.push(`새해 연차 +${12 + Math.max(0, year - 2026)}일`);
  }
}

function updateEventCollection() {
  document.querySelector('#collectionCount').textContent = `${gameState.collectedEvents.length} / ${events.length}`;
  const collected = gameState.collectedEvents.some((entry) => entry.id === activeEventId);
  collectEventButton.disabled = collected;
  collectEventButton.innerHTML = collected ? '기록에 수집했어요 <span>✓</span>' : '이벤트 수집하기 <span>＋</span>';
}

function renderEventAlbum() {
  albumList.replaceChildren();
  if (gameState.collectedEvents.length === 0) {
    const emptyNote = document.createElement('p');
    emptyNote.className = 'album-empty';
    emptyNote.textContent = '아직 모은 이벤트가 없어요. 오늘의 장면부터 수집해 보세요.';
    albumList.append(emptyNote);
    return;
  }
  gameState.collectedEvents.slice().reverse().forEach(({ id, day }) => {
    const event = events.find((item) => item.id === id);
    if (!event) return;
    const entry = document.createElement('article');
    entry.className = 'album-entry';
    const image = document.createElement('img');
    image.className = 'album-entry-image';
    image.src = eventArtwork(event);
    image.alt = '';
    const label = document.createElement('span');
    label.textContent = `DAY ${String(day).padStart(2, '0')} · ${event.cat}`;
    const title = document.createElement('h3');
    title.textContent = event.title;
    const story = document.createElement('p');
    story.textContent = event.story;
    const copy = document.createElement('div');
    copy.className = 'album-entry-copy';
    copy.append(label, title, story);
    entry.append(image, copy);
    albumList.append(entry);
  });
}

function startNextDay(decision) {
  gameState.lastNotices = [];
  const nextDate = dateForDay(gameState.day + 1);
  applyCalendarIncome(nextDate);
  if (gameState.foodGrams < dailyFoodGrams && !decision) {
    const needed = dailyFoodGrams - gameState.foodGrams;
    document.querySelector('#moneyValue').textContent = gameState.money.toLocaleString('ko-KR');
    document.querySelector('#leaveValue').textContent = `${gameState.leaveDays}일`;
    const upcomingNotice = gameState.lastNotices.length ? `${gameState.lastNotices.join(' · ')}. ` : '';
    document.querySelector('#feedDecisionText').textContent = `내일 ${formatDate(nextDate)}. ${upcomingNotice}사료가 ${gameState.foodGrams}g 남았고 ${needed}g이 더 필요합니다. 사료 1kg을 사거나, 사지 않고 진행할 수 있어요. 사지 않으면 고양이들이 아파 병원비 50,000원이 들어요.`;
    document.querySelector('#buyFeedButton').disabled = gameState.money < feedBagPrice;
    document.querySelector('#buyFeedButton').textContent = gameState.money < feedBagPrice ? '잔액 부족 · 사료 1kg 100,000원' : '사료 1kg 구매 · 100,000원';
    document.querySelector('#feedDecision').hidden = false;
    return;
  }
  if (decision === 'buy') {
    if (gameState.money < feedBagPrice) return;
    gameState.money -= feedBagPrice;
    gameState.foodGrams += feedBagGrams;
    gameState.lastNotices.push('사료 1kg 구매 −₩100,000');
  }
  gameState.day += 1;
  const availableFood = gameState.foodGrams;
  const eaten = Math.min(availableFood, dailyFoodGrams);
  const shortage = dailyFoodGrams - eaten;
  gameState.foodGrams = Math.max(0, availableFood - dailyFoodGrams);
  if (decision === 'skip' && shortage > 0) {
    gameState.money -= illnessFee;
    gameState.lastNotices.push(`사료 부족으로 고양이들이 아파 병원비 −₩${illnessFee.toLocaleString('ko-KR')}`);
  }
  const choices = events.filter((event) => event.id !== gameState.lastEventId);
  const event = choices[Math.floor(Math.random() * choices.length)];
  gameState.money += event.money;
  gameState.foodGrams += event.food;
  gameState.lastEventId = event.id;
  gameState.lastEaten = eaten;
  gameState.lastShortage = decision === 'skip' ? shortage : 0;
  localStorage.setItem('cat-house-save', JSON.stringify(gameState));
  renderHomeEvent(event, eaten, shortage);
  if (homeScreen.classList.contains('is-active')) nextDayButton.focus({ preventScroll: true });
}

function beginCatLife() {
  if (gameState.day === 0) startNextDay();
  else {
    const previousEvent = events.find((event) => event.id === gameState.lastEventId) || events[0];
    renderHomeEvent(previousEvent, gameState.lastEaten, gameState.lastShortage);
  }
  showHome();
}

function returnToTitle(event) {
  event.preventDefault();
  started = false;
  nextLine = 1;
  finished = false;
  dialogueText.textContent = openingLines[0];
  continueButton.innerHTML = '이야기 계속하기 <span>→</span>';
  titleScreen.classList.remove('is-leaving');
  titleScreen.setAttribute('aria-hidden', 'false');
  storyScreen.classList.remove('is-active');
  storyScreen.setAttribute('aria-hidden', 'true');
  catsScreen.classList.remove('is-active');
  catsScreen.setAttribute('aria-hidden', 'true');
  homeScreen.classList.remove('is-active');
  homeScreen.setAttribute('aria-hidden', 'true');
}

function advanceStory() {
  if (finished) {
    showCats();
    return;
  }
  if (nextLine >= openingLines.length) {
    dialogueText.textContent = '네 마리와의 생활이 시작된다. 오늘 밤, 누구와 먼저 인사할까?';
    continueButton.innerHTML = '우리 고양이들 만나기 <span>→</span>';
    finished = true;
    return;
  }
  dialogueText.textContent = openingLines[nextLine];
  nextLine += 1;
  if (nextLine === openingLines.length) continueButton.innerHTML = '마지막 장면 보기 <span>→</span>';
}

startButton.addEventListener('click', startGame);
window.addEventListener('keydown', (event) => {
  if (!started) {
    if (event.key === 'Tab' || event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt' || event.metaKey) return;
    startGame();
    return;
  }
  if (event.key === 'Enter' && event.target.closest('button, a, input')) return;
  if (event.key === 'Enter' && storyScreen.classList.contains('is-active')) advanceStory();
  if (event.key === 'Enter' && homeScreen.classList.contains('is-active')) startNextDay();
});
continueButton.addEventListener('click', advanceStory);
homeButton.addEventListener('click', returnToTitle);
catsHomeButton.addEventListener('click', returnToTitle);
backToStoryButton.addEventListener('click', beginCatLife);
nextDayButton.addEventListener('click', () => startNextDay());
buyFeedButton.addEventListener('click', () => startNextDay('buy'));
skipFeedButton.addEventListener('click', () => startNextDay('skip'));
homeTitleButton.addEventListener('click', returnToTitle);
collectEventButton.addEventListener('click', () => {
  if (gameState.collectedEvents.some((entry) => entry.id === activeEventId)) return;
  gameState.collectedEvents.push({ id: activeEventId, day: gameState.day });
  localStorage.setItem('cat-house-save', JSON.stringify(gameState));
  updateEventCollection();
});
openEventAlbumButton.addEventListener('click', () => {
  renderEventAlbum();
  eventAlbum.showModal();
});
closeEventAlbumButton.addEventListener('click', () => eventAlbum.close());
