const BASE = 'http://localhost:3001'

export async function getMedicamentos() {
  const res = await fetch(`${BASE}/medicamentos`)
  return res.json()
}

export async function postMedicamento(data) {
  const res = await fetch(`${BASE}/medicamentos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return { ok: res.ok, status: res.status, data: await res.json() }
}

export async function deleteMedicamento(id) {
  const res = await fetch(`${BASE}/medicamentos/${id}`, { method: 'DELETE' })
  return res.json()
}

export async function getDoses() {
  const res = await fetch(`${BASE}/doses`)
  return res.json()
}

export async function getDosesPendentes() {
  const res = await fetch(`${BASE}/doses/pendentes`)
  return res.json()
}

export async function postDose(data) {
  const res = await fetch(`${BASE}/doses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return { ok: res.ok, status: res.status, data: await res.json() }
}

// ── Idosos ──────────────────────────────────────────────────────────────────

export async function getIdosos() {
  const res = await fetch(`${BASE}/idosos`)
  return res.json()
}

export async function postIdoso(data) {
  const res = await fetch(`${BASE}/idosos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return { ok: res.ok, status: res.status, data: await res.json() }
}
