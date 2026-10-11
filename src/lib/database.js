import { openDB } from 'idb'

export const DB_NAME = 'stridequest-local'
export const DB_VERSION = 1

let databasePromise

function getDatabase() {
  if (!databasePromise) {
    databasePromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('observations')) db.createObjectStore('observations', { keyPath: 'id' })
        if (!db.objectStoreNames.contains('images')) db.createObjectStore('images', { keyPath: 'observationId' })
        if (!db.objectStoreNames.contains('sessions')) db.createObjectStore('sessions', { keyPath: 'id' })
        if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'key' })
      }
    })
  }
  return databasePromise
}

export async function putObservation(observation, imageBlob = null) {
  const db = await getDatabase()
  const transaction = db.transaction(['observations', 'images'], 'readwrite')
  await transaction.objectStore('observations').put(observation)
  if (imageBlob) await transaction.objectStore('images').put({ observationId: observation.id, blob: imageBlob, createdAt: Date.now() })
  await transaction.done
  return observation
}

export async function listObservations() {
  return (await getDatabase()).getAll('observations')
}

export async function getObservationImage(observationId) {
  const record = await (await getDatabase()).get('images', observationId)
  return record?.blob || null
}

export async function deleteObservationImage(observationId) {
  return (await getDatabase()).delete('images', observationId)
}

export async function clearLocalData() {
  const db = await getDatabase()
  const transaction = db.transaction(['observations', 'images', 'sessions', 'meta'], 'readwrite')
  await Promise.all(['observations', 'images', 'sessions', 'meta'].map((store) => transaction.objectStore(store).clear()))
  await transaction.done
}

export async function saveSession(session) { return (await getDatabase()).put('sessions', session) }
export async function listSessions() { return (await getDatabase()).getAll('sessions') }
export async function saveMeta(key, value) { return (await getDatabase()).put('meta', { key, value }) }
export async function getMeta(key) { return (await getDatabase()).get('meta', key) }

export async function exportBackup() {
  const db = await getDatabase()
  const [observations, sessions] = await Promise.all([db.getAll('observations'), db.getAll('sessions')])
  return { version: 1, exportedAt: new Date().toISOString(), data: { observations, sessions } }
}

export async function importBackup(payload) {
  const db = await getDatabase()
  const transaction = db.transaction(['observations', 'sessions'], 'readwrite')
  payload.data.observations.forEach((observation) => transaction.objectStore('observations').put(observation))
  payload.data.sessions.forEach((session) => transaction.objectStore('sessions').put(session))
  await transaction.done
}

export function createObservationId() { return `observation-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }
