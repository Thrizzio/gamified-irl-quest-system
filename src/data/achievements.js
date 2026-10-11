export const achievements = [
  { id: 'first-footsteps', name: 'First Footsteps', description: 'Complete your first expedition.', icon: 'footprints', check: (s) => s.completedExpeditions >= 1 },
  { id: 'curious-observer', name: 'Curious Observer', description: 'Discover five unique objects.', icon: 'eye', check: (s) => s.uniqueDiscoveries >= 5 },
  { id: 'forest-floor', name: 'Forest Floor', description: 'Discover five woodland objects.', icon: 'trees', check: (s) => s.categoryCounts['Leaves & foliage'] + s.categoryCounts['Trees & branches'] + s.categoryCounts['Mushrooms & fungi'] >= 5 },
  { id: 'waterside-wanderer', name: 'Waterside Wanderer', description: 'Discover three waterside objects.', icon: 'waves', check: (s) => s.categoryCounts['Water & waterside'] >= 3 },
  { id: 'urban-naturalist', name: 'Urban Naturalist', description: 'Discover five structures or city objects.', icon: 'landmark', check: (s) => s.categoryCounts['Outdoor structures'] >= 5 },
  { id: 'field-collector', name: 'Field Collector', description: 'Discover fifteen unique objects.', icon: 'archive', check: (s) => s.uniqueDiscoveries >= 15 },
  { id: 'explorer', name: 'Explorer', description: 'Complete five expeditions.', icon: 'compass', check: (s) => s.completedExpeditions >= 5 },
  { id: 'keen-eye', name: 'Keen Eye', description: 'Make five successful AI verifications.', icon: 'scan-eye', check: (s) => s.aiVerifications >= 5 }
]
