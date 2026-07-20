/* HTTP Lab — simulated on-device server (BE-301). Honest: not production. */

const DB = {
  notes: [
    { id: 1, title: 'Welcome', body: 'HTTP Lab runs on your device.' },
    { id: 2, title: 'Offline', body: 'No real network required.' },
  ],
  nextId: 3,
  users: [{ id: 1, name: 'Ada', role: 'learner' }],
};

function json(status, body, extraHeaders = {}) {
  const headers = {
    'content-type': 'application/json',
    'x-lab': 'masterycap-simulated',
    'cache-control': 'no-store',
    ...extraHeaders,
  };
  return {
    status,
    ok: status >= 200 && status < 300,
    headers,
    body: body === '' || body == null
      ? ''
      : (typeof body === 'string' ? body : JSON.stringify(body, null, 2)),
  };
}

function parseBody(raw) {
  if (!raw || !String(raw).trim()) return {};
  return JSON.parse(raw);
}

/** @param {{method:string,path:string,body?:string,headers?:Record<string,string>}} req */
export function handleLabRequest(req) {
  const method = (req.method || 'GET').toUpperCase();
  const rawPath = req.path || '/';
  const qIdx = rawPath.indexOf('?');
  let path = qIdx >= 0 ? rawPath.slice(0, qIdx) : rawPath;
  const query = {};
  if (qIdx >= 0) {
    new URLSearchParams(rawPath.slice(qIdx + 1)).forEach((v, k) => { query[k] = v; });
  }
  if (!path.startsWith('/')) path = '/' + path;
  const reqHeaders = req.headers || {};

  if (method === 'GET' && path === '/health') {
    return json(200, { status: 'ok', simulated: true, time: new Date().toISOString() });
  }

  if (method === 'GET' && path === '/notes') {
    let notes = [...DB.notes];
    if (query.q) {
      const q = query.q.toLowerCase();
      notes = notes.filter((n) => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q));
    }
    return json(200, { notes, count: notes.length }, { 'x-total-count': String(notes.length) });
  }

  if (method === 'GET' && path.startsWith('/notes/')) {
    const id = Number(path.split('/')[2]);
    const note = DB.notes.find((n) => n.id === id);
    if (!note) return json(404, { error: 'not_found', id });
    return json(200, note, { etag: `"note-${note.id}"` });
  }

  if (method === 'POST' && path === '/notes') {
    let data;
    try { data = parseBody(req.body); } catch (e) {
      return json(400, { error: 'invalid_json', message: e.message });
    }
    if (!data.title) return json(400, { error: 'title_required' });
    const note = { id: DB.nextId++, title: String(data.title), body: String(data.body || '') };
    DB.notes.push(note);
    return json(201, note, { location: `/notes/${note.id}` });
  }

  if (method === 'PUT' && path.startsWith('/notes/')) {
    const id = Number(path.split('/')[2]);
    const i = DB.notes.findIndex((n) => n.id === id);
    if (i < 0) return json(404, { error: 'not_found' });
    let data;
    try { data = parseBody(req.body); } catch (e) {
      return json(400, { error: 'invalid_json' });
    }
    DB.notes[i] = {
      ...DB.notes[i],
      title: data.title != null ? String(data.title) : DB.notes[i].title,
      body: data.body != null ? String(data.body) : DB.notes[i].body,
    };
    return json(200, DB.notes[i]);
  }

  if (method === 'DELETE' && path.startsWith('/notes/')) {
    const id = Number(path.split('/')[2]);
    const i = DB.notes.findIndex((n) => n.id === id);
    if (i < 0) return json(404, { error: 'not_found' });
    DB.notes.splice(i, 1);
    return json(204, '');
  }

  if (method === 'GET' && path === '/users/me') {
    const auth = reqHeaders.authorization || reqHeaders.Authorization || '';
    if (auth !== 'Bearer lab-token') {
      return json(401, { error: 'unauthorized', hint: 'Use Authorization: Bearer lab-token' });
    }
    return json(200, DB.users[0]);
  }

  if (method === 'POST' && path === '/echo') {
    let data = {};
    try { data = parseBody(req.body); } catch (e) {
      return json(400, { error: 'invalid_json' });
    }
    return json(200, { echo: data, headersSeen: reqHeaders });
  }

  return json(404, { error: 'unknown_route', method, path });
}

/** Exercise auto-grade — returns {id,pass,detail}[] */
export function gradeLabExercises(history = []) {
  const hits = history.map((h) => ({
    method: (h.method || '').toUpperCase(),
    path: (h.path || '').split('?')[0],
    status: h.status,
  }));
  const has = (pred) => hits.some(pred);
  return [
    {
      id: 'get',
      name: { en: 'GET list (/notes → 200)', ur: 'GET list (/notes → 200)' },
      pass: has((h) => h.method === 'GET' && h.path === '/notes' && h.status === 200),
      detail: { en: 'Send GET /notes', ur: 'GET /notes bhejo' },
    },
    {
      id: 'post',
      name: { en: 'POST create (/notes → 201)', ur: 'POST create (/notes → 201)' },
      pass: has((h) => h.method === 'POST' && h.path === '/notes' && h.status === 201),
      detail: { en: 'POST JSON with title', ur: 'title ke sath POST JSON' },
    },
    {
      id: 'err',
      name: { en: 'Observe 404', ur: '404 dekho' },
      pass: has((h) => h.status === 404),
      detail: { en: 'GET a missing note id', ur: 'Missing note id GET' },
    },
    {
      id: 'auth',
      name: { en: '401 then authorized /users/me', ur: '401 phir /users/me' },
      pass: has((h) => h.path === '/users/me' && h.status === 401)
        && has((h) => h.path === '/users/me' && h.status === 200),
      detail: { en: 'Hit /users/me without token, then with Bearer lab-token', ur: 'Bina token /users/me, phir Bearer lab-token' },
    },
    {
      id: 'put',
      name: { en: 'PUT update note', ur: 'PUT update note' },
      pass: has((h) => h.method === 'PUT' && h.path.startsWith('/notes/') && h.status === 200),
      detail: { en: 'PUT /notes/1 with new title', ur: 'PUT /notes/1 naya title' },
    },
  ];
}

export const LAB_HONESTY = {
  en: 'This server is simulated on your device. Real deployment is literacy later — not pretend production.',
  ur: 'Ye server device pe simulated hai. Real deployment baad ki literacy — fake production nahi.',
};

export const LAB_PRESETS = [
  { label: 'GET /notes', method: 'GET', path: '/notes', body: '', headers: '' },
  { label: 'GET /notes?q=off', method: 'GET', path: '/notes?q=off', body: '', headers: '' },
  { label: 'GET missing', method: 'GET', path: '/notes/999', body: '', headers: '' },
  { label: 'POST /notes', method: 'POST', path: '/notes', body: '{\n  "title": "New note",\n  "body": "From HTTP Lab"\n}', headers: '' },
  { label: 'PUT /notes/1', method: 'PUT', path: '/notes/1', body: '{\n  "title": "Updated",\n  "body": "Edited in lab"\n}', headers: '' },
  { label: 'GET /users/me (401)', method: 'GET', path: '/users/me', body: '', headers: '' },
  { label: 'GET /users/me (auth)', method: 'GET', path: '/users/me', body: '', headers: 'Authorization: Bearer lab-token' },
  { label: 'GET /health', method: 'GET', path: '/health', body: '', headers: '' },
  { label: 'POST /echo', method: 'POST', path: '/echo', body: '{\n  "ping": true\n}', headers: 'X-Client: mastery\n' },
];
