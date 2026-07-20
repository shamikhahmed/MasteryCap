/* HTTP Lab — simulated on-device server (BE-301). Honest: not production. */

const DB = {
  notes: [
    { id: 1, title: 'Welcome', body: 'HTTP Lab runs on your device.' },
    { id: 2, title: 'Offline', body: 'No real network required.' },
  ],
  nextId: 3,
};

function json(status, body, headers = {}) {
  return {
    status,
    headers: { 'content-type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body, null, 2),
  };
}

/** @param {{method:string,path:string,body?:string}} req */
export function handleLabRequest(req) {
  const method = (req.method || 'GET').toUpperCase();
  let path = (req.path || '/').split('?')[0];
  if (!path.startsWith('/')) path = '/' + path;

  if (method === 'GET' && path === '/notes') {
    return json(200, { notes: DB.notes });
  }
  if (method === 'GET' && path.startsWith('/notes/')) {
    const id = Number(path.split('/')[2]);
    const note = DB.notes.find((n) => n.id === id);
    if (!note) return json(404, { error: 'not_found', id });
    return json(200, note);
  }
  if (method === 'POST' && path === '/notes') {
    let data = {};
    try { data = req.body ? JSON.parse(req.body) : {}; } catch (e) {
      return json(400, { error: 'invalid_json' });
    }
    if (!data.title) return json(400, { error: 'title_required' });
    const note = { id: DB.nextId++, title: String(data.title), body: String(data.body || '') };
    DB.notes.push(note);
    return json(201, note);
  }
  if (method === 'DELETE' && path.startsWith('/notes/')) {
    const id = Number(path.split('/')[2]);
    const i = DB.notes.findIndex((n) => n.id === id);
    if (i < 0) return json(404, { error: 'not_found' });
    DB.notes.splice(i, 1);
    return json(204, '');
  }
  return json(404, { error: 'unknown_route', method, path });
}

export const LAB_HONESTY = {
  en: 'This server is simulated on your device. Real deployment is literacy later — not pretend production.',
  ur: 'Ye server device pe simulated hai. Real deployment baad ki literacy — fake production nahi.',
};

export const LAB_PRESETS = [
  { label: 'GET /notes', method: 'GET', path: '/notes', body: '' },
  { label: 'GET /notes/1', method: 'GET', path: '/notes/1', body: '' },
  { label: 'GET missing', method: 'GET', path: '/notes/999', body: '' },
  { label: 'POST /notes', method: 'POST', path: '/notes', body: '{\n  "title": "New note",\n  "body": "From HTTP Lab"\n}' },
];
