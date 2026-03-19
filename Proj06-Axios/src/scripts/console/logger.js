export function logRequest(method, url, body = null) {
    const time = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    const el = document.getElementById('console-output');
    if (!el) return;

    const methodColors = {
        GET:    'color: #61afef',
        POST:   'color: #98c379',
        PUT:    'color: #e5c07b',
        PATCH:  'color: #e5c07b',
        DELETE: 'color: #e06c75',
    };

    let html = `<div class="log-entry">`;
    html += `<span class="log-time">[${time}]</span> `;
    html += `<span class="log-method" style="${methodColors[method] ?? ''}">${method}</span> `;
    html += `<span class="log-url">${url}</span>`;
    if (body) {
        html += `\n<span class="log-indent">↳ body: <span class="log-body">${JSON.stringify(body)}</span></span>`;
    }
    html += `</div>`;

    el.innerHTML += html;
    el.scrollTop = el.scrollHeight;
}

export function logResponse(status, data) {
    const el = document.getElementById('console-output');
    if (!el) return;

    const isOk = status >= 200 && status < 300;
    const color = isOk ? 'color: #98c379' : 'color: #e06c75';
    const icon  = isOk ? '✓' : '✗';

    let html = `<div class="log-entry">`;
    html += `<span class="log-status" style="${color}">${icon} ${status}</span> `;
    html += `<span class="log-body">${JSON.stringify(data)}</span>`;
    html += `</div><div class="log-divider"></div>`;

    el.innerHTML += html;
    el.scrollTop = el.scrollHeight;
}

export function logError(error) {
    const el = document.getElementById('console-output');
    if (!el) return;

    let msg;

    if (error.response) {
        const status = error.response.status;
        const data   = error.response.data;

        const apiMsg = data?.message ?? data?.error ?? data?.msg ?? JSON.stringify(data);

        msg = `${status} — ${apiMsg}`;
    } else {
        msg = error.message;
    }

    const html = `
        <div class="log-entry">
            <span class="log-status" style="color:#e06c75">✗ ERROR</span>
            <span class="log-body" style="color:#e06c75">${msg}</span>
        </div>
        <div class="log-divider"></div>
    `;

    el.innerHTML += html;
    el.scrollTop = el.scrollHeight;
}

export function clearConsole() {
    const el = document.getElementById('console-output');
    if (el) el.innerHTML = '';
}