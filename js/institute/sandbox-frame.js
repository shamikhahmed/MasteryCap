let worker;
let secret;
let runId;
let timer;

addEventListener('message', (event) => {
  const data = event.data || {};
  if (event.source !== parent || data.type !== 'INIT' || worker) return;
  runId = data.runId;
  const url = URL.createObjectURL(new Blob([data.workerSource], { type: 'text/javascript' }));
  worker = new Worker(url);
  timer = setTimeout(() => {
    worker.terminate();
    URL.revokeObjectURL(url);
    parent.postMessage({ type: 'SANDBOX_TIMEOUT', runId }, '*');
  }, data.timeout);
  worker.onmessage = (workerEvent) => {
    const message = workerEvent.data || {};
    if (message.type === 'READY') {
      URL.revokeObjectURL(url);
      secret = message.secret;
      worker.postMessage({ type: 'RUN', src: data.src, tests: data.tests });
      return;
    }
    if (message.type !== 'RESULT' || message.secret !== secret) return;
    clearTimeout(timer);
    worker.terminate();
    parent.postMessage({ type: 'SANDBOX_RESULT', runId, result: message.result }, '*');
  };
});
