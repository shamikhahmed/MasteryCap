/* Admission — Welcome → Honesty → Details → Photo → ID issue → Campus */

import { icon } from '../icons.js';
import { store, KEYS } from '../store.js';
import { recommendPath, AGE_OPTS, LANG_OPTS, BUILD_OPTS, GOAL_OPTS, TIME_OPTS } from '../institute/placement.js';
import { enrollCourse } from '../institute/progress.js';
import { seedFoundationsSoftStart } from '../gates.js';
import { issueStudentId, monogramFromName, getStudentPhoto } from '../institute/student-id.js';
import { renderStudentIdCard } from './student-id-view.js';

const BRANCH_FROM_GOAL = {
  markets: 'markets',
  money: 'money',
  apps: 'software',
  explore: 'software',
};

/**
 * @param {object} App
 * @param {() => HTMLElement} root
 */
export function renderAdmission(App, root) {
  document.getElementById('tabbar')?.classList.add('hidden');
  let step = 0;
  const data = {
    name: '',
    ageBand: '',
    language: 'en',
    buildExp: '',
    goal: '',
    timeBand: '',
    photoDataUrl: null,
  };
  const steps = ['welcome', 'honesty', 'name', 'age', 'lang', 'build', 'goal', 'time', 'photo', 'id'];
  let issued = null;

  function draw() {
    const c = root();
    const key = steps[step];
    const en = App.lang === 'en';
    let main = '';

    if (key === 'welcome') {
      main = `<div class="onb-main admit-main">
        <div class="onb-eyebrow">MasteryCap Institute</div>
        <h1 class="onb-title">${en ? 'Application for admission' : 'Admission ke liye darkhast'}</h1>
        <p class="onb-sub">${en
          ? 'A personal learning campus on this device. Software craft, markets literacy, and money systems — offline. No accounts. No income promises.'
          : 'Is device pe personal campus. Software, markets, money — offline. No accounts. Income promise nahi.'}</p>
      </div>`;
    } else if (key === 'honesty') {
      main = `<div class="onb-main admit-main">
        <div class="onb-eyebrow">${en ? 'Honesty' : 'Imandari'}</div>
        <h1 class="onb-title">${en ? 'What this is not' : 'Ye kya nahi hai'}</h1>
        <ul class="inst-ul onb-ul">
          <li>${en ? 'Not an accredited university or professional license.' : 'Accredited university ya license nahi.'}</li>
          <li>${en ? 'Not financial advice or a path to income.' : 'Financial advice ya income path nahi.'}</li>
          <li>${en ? 'Your Student ID is a study credential on this device only.' : 'Student ID sirf is device pe study credential hai.'}</li>
        </ul>
      </div>`;
    } else if (key === 'name') {
      main = `<div class="onb-main admit-main">
        <div class="onb-eyebrow">${en ? 'Identity' : 'Shanakht'}</div>
        <h1 class="onb-title">${en ? 'Full name on your Student ID' : 'Student ID pe naam'}</h1>
        <div class="onb-field"><input class="onb-input" id="onbName" data-testid="admission-name" placeholder="${en ? 'Name' : 'Naam'}" autocomplete="name" value="${esc(data.name)}" /></div>
      </div>`;
    } else if (key === 'age') {
      main = optScreen(en ? 'Age range shapes how we explain — never what you can learn.' : 'Age explanation change karti — seekhne ki had nahi.',
        en ? 'Age range' : 'Age range', AGE_OPTS, 'ageBand', data.ageBand);
    } else if (key === 'lang') {
      main = optScreen(en ? 'Language for lessons' : 'Lessons ki language',
        en ? 'Preferred language' : 'Language', LANG_OPTS, 'language', data.language);
    } else if (key === 'build') {
      main = optScreen(en ? 'Honest placement — no ego trap.' : 'Imandar placement.',
        en ? 'Have you built software before?' : 'Pehle software banaya?', BUILD_OPTS, 'buildExp', data.buildExp);
    } else if (key === 'goal') {
      main = optScreen(en ? 'Your primary branch follows this.' : 'Primary branch yahan se.',
        en ? 'What do you want to master first?' : 'Pehle kya master?', GOAL_OPTS, 'goal', data.goal);
    } else if (key === 'time') {
      main = optScreen(en ? 'Sets review caps and week estimates.' : 'Review cap aur weeks.',
        en ? 'Time you can invest' : 'Kitna time', TIME_OPTS, 'timeBand', data.timeBand);
    } else if (key === 'photo') {
      const mono = monogramFromName(data.name || 'Learner');
      main = `<div class="onb-main admit-main">
        <div class="onb-eyebrow">${en ? 'Photo' : 'Photo'}</div>
        <h1 class="onb-title">${en ? 'Add a photo (optional)' : 'Photo (optional)'}</h1>
        <p class="onb-sub">${en
          ? 'Capture or upload. Stored only on this device. Skip to use initials.'
          : 'Capture ya upload. Sirf is device pe. Skip = initials.'}</p>
        <div class="photo-admit-row">
          <div class="photo-admit-preview" id="photoPreview">${data.photoDataUrl
            ? `<img src="${data.photoDataUrl}" alt="" />`
            : `<span class="photo-mono">${esc(mono)}</span>`}</div>
          <div class="photo-admit-actions">
            <label class="btn secondary" style="display:block;text-align:center;cursor:pointer">
              ${en ? 'Upload' : 'Upload'}
              <input type="file" accept="image/*" id="photoFile" hidden />
            </label>
            <label class="btn ghost mt10" style="display:block;text-align:center;cursor:pointer">
              ${en ? 'Camera' : 'Camera'}
              <input type="file" accept="image/*" capture="user" id="photoCam" hidden />
            </label>
            ${data.photoDataUrl ? `<button class="btn ghost mt10" id="photoClear" style="width:100%">${en ? 'Use initials instead' : 'Initials use karo'}</button>` : ''}
          </div>
        </div>
      </div>`;
    } else if (key === 'id') {
      if (!issued) {
        const branch = BRANCH_FROM_GOAL[data.goal] || 'software';
        issued = issueStudentId({
          name: data.name,
          ageBand: data.ageBand,
          branch,
          photoDataUrl: data.photoDataUrl,
        });
      }
      main = `<div class="onb-main admit-main">
        <div class="onb-eyebrow">${en ? 'Admitted' : 'Admit'}</div>
        <h1 class="onb-title">${en ? 'Your Student ID' : 'Aapka Student ID'}</h1>
        <p class="onb-sub">${en
          ? 'Study credential — not government identification. Tap Records anytime to view again.'
          : 'Study credential — government ID nahi. Records se dobara dekho.'}</p>
        <div data-testid="student-card">${renderStudentIdCard(issued, { lang: App.lang, photoUrl: data.photoDataUrl || getStudentPhoto() })}</div>
      </div>`;
    }

    function optScreen(sub, title, opts, field, val) {
      return `<div class="onb-main admit-main">
        <div class="onb-eyebrow">${en ? 'Admission' : 'Admission'}</div>
        <h1 class="onb-title">${title}</h1>
        <p class="onb-sub">${sub}</p>
        <div class="opt-list">${opts.map(([v, lab]) => `
          <button class="opt-card ${val === v ? 'on' : ''}" data-field="${field}" data-val="${v}">
            <span class="oc-body"><span class="oc-t">${lab[en ? 'en' : 'ur']}</span></span>
            <span class="oc-check">${icon('checkThin', { size: 13, sw: 2.4 })}</span>
          </button>`).join('')}</div>
      </div>`;
    }

    const last = key === 'id';
    const btnLabel = key === 'welcome' ? (en ? 'Begin application' : 'Darkhast shuru')
      : key === 'honesty' ? (en ? 'I understand' : 'Samajh gaya')
        : key === 'photo' ? (en ? (data.photoDataUrl ? 'Continue' : 'Skip photo') : (data.photoDataUrl ? 'Aage' : 'Photo skip'))
          : last ? (en ? 'Enter campus' : 'Campus mein')
            : (en ? 'Continue' : 'Aage');

    c.innerHTML = `<div class="onb admit-flow" data-testid="admission-form">
      <div class="onb-top">
        ${step > 0 ? `<button class="icon-btn" id="onbBack" style="width:34px;height:34px">${icon('back', { size: 17 })}</button>` : '<span style="width:34px"></span>'}
        <div class="onb-progress"><i style="width:${((step + 1) / steps.length) * 100}%"></i></div>
        <button class="pill" id="onbSkip" style="font-size:11px">${en ? 'Skip' : 'Skip'}</button>
      </div>
      ${main}
      <div class="onb-foot"><button class="btn accent" id="onbNext" data-testid="admission-next">${btnLabel}</button></div>
    </div>`;

    wire(key, en);
  }

  function wire(key, en) {
    const c = root();
    const nameInput = document.getElementById('onbName');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => { data.name = e.target.value; });
      setTimeout(() => nameInput.focus(), 60);
    }
    c.querySelectorAll('[data-field]').forEach((b) => b.addEventListener('click', () => {
      data[b.dataset.field] = b.dataset.val;
      if (b.dataset.field === 'language' && b.dataset.val !== 'both') App.lang = b.dataset.val;
      App.haptic();
      draw();
    }));
    const bindPhoto = (input) => {
      input?.addEventListener('change', () => {
        const file = input.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          resizeImage(reader.result, 320).then((url) => {
            data.photoDataUrl = url;
            issued = null;
            App.haptic();
            draw();
          });
        };
        reader.readAsDataURL(file);
      });
    };
    bindPhoto(document.getElementById('photoFile'));
    bindPhoto(document.getElementById('photoCam'));
    document.getElementById('photoClear')?.addEventListener('click', () => {
      data.photoDataUrl = null;
      issued = null;
      draw();
    });
    document.getElementById('onbBack')?.addEventListener('click', () => {
      App.haptic();
      if (key === 'id') issued = null;
      step--;
      draw();
    });
    document.getElementById('onbSkip')?.addEventListener('click', () => {
      data.name = data.name || 'Learner';
      data.ageBand = data.ageBand || '18-24';
      data.language = data.language || 'en';
      data.buildExp = data.buildExp || 'never';
      data.goal = data.goal || 'markets';
      data.timeBand = data.timeBand || '2-5';
      finish();
    });
    document.getElementById('onbNext')?.addEventListener('click', () => {
      App.haptic();
      if (key === 'name' && !(data.name || '').trim()) {
        App.toast?.(en ? 'Name required for Student ID' : 'Student ID ke liye naam chahiye');
        return;
      }
      if (key === 'age' && !data.ageBand) return;
      if (key === 'build' && !data.buildExp) return;
      if (key === 'goal' && !data.goal) return;
      if (key === 'time' && !data.timeBand) return;
      if (key === 'id') return finish();
      step++;
      draw();
    });
  }

  function finish() {
    const plan = recommendPath(data);
    const lang = data.language === 'ur' ? 'ur' : 'en';
    App.lang = lang;
    const settings = store.get(KEYS.settings, {});
    settings.lang = lang;
    store.set(KEYS.settings, settings);

    const branch = BRANCH_FROM_GOAL[data.goal] || plan.school || 'software';
    if (!issued) {
      issued = issueStudentId({
        name: data.name,
        ageBand: data.ageBand,
        branch,
        photoDataUrl: data.photoDataUrl,
      });
    }

    App.profile = {
      name: (data.name || '').trim() || 'Learner',
      ageBand: data.ageBand || '18-24',
      language: data.language || 'en',
      buildExp: data.buildExp || 'never',
      goal: data.goal || 'markets',
      timeBand: data.timeBand || '2-5',
      starterCourse: plan.course,
      starterSchool: plan.school,
      register: plan.register,
      campus: true,
      admissionComplete: true,
      primaryBranch: branch,
      experience: data.goal === 'markets'
        ? (data.buildExp === 'shipped' ? 'exp' : data.buildExp === 'dabbled' ? 'some' : 'new')
        : 'new',
      markets: ['foundations'],
      studentIdNumber: issued.idNumber,
    };
    store.set(KEYS.profile, App.profile);
    store.set(KEYS.onboarded, true);
    if (plan.course && plan.course !== 'MKT-LEGACY') enrollCourse(plan.course, plan.school);
    if (plan.school === 'markets') enrollCourse('MKT-LEGACY', 'markets');
    seedFoundationsSoftStart(App.profile.experience);
    App.tab = 'today';
    App.render();
    App.renderNav();
    setTimeout(() => { App._maybeFirstBackup?.(); }, 300);
  }

  draw();
}

function esc(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function resizeImage(dataUrl, max = 320) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      try {
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      } catch (e) {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
