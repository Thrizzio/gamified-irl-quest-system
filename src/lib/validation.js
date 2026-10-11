export function validateCatalogueReferences(expeditions, collectibles) {
  const ids = new Set(collectibles.map((collectible) => collectible.id))
  const invalid = []
  expeditions.forEach((expedition) => {
    expedition.objectives.forEach((objective) => objective.collectibleIds.forEach((id) => { if (!ids.has(id)) invalid.push({ expeditionId: expedition.id, objectiveId: objective.id, collectibleId: id }) }))
    expedition.bonus.forEach((id) => { if (!ids.has(id)) invalid.push({ expeditionId: expedition.id, bonus: true, collectibleId: id }) })
  })
  return invalid
}

export function isValidBackup(payload) {
  return Boolean(payload && payload.version === 1 && payload.data && Array.isArray(payload.data.observations) && Array.isArray(payload.data.sessions))
}
