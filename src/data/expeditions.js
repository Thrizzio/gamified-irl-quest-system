export const expeditions = [
  {
    id: 'forest-floor', title: 'Forest Floor', category: 'Woodland', difficulty: 'Easy', duration: '25–40 min', minutes: 30,
    description: 'Slow down beneath the canopy and notice the small world underfoot.', illustration: 'forest', color: 'moss', completionXp: 160,
    safety: 'Stay on paths where possible. Do not touch or eat unknown plants or fungi.',
    objectives: [
      { id: 'forest-moss', collectibleIds: ['moss'], label: 'Find a patch of moss', required: true },
      { id: 'forest-pinecone', collectibleIds: ['pinecone'], label: 'Spot a pinecone', required: true },
      { id: 'forest-leaf', collectibleIds: ['oak-leaf', 'maple-leaf', 'autumn-foliage'], label: 'Notice a fallen leaf', required: true },
      { id: 'forest-fungi', collectibleIds: ['mushroom', 'bracket-fungus'], label: 'Observe fungi from a safe distance', required: false }
    ], bonus: ['fallen-branch', 'fern']
  },
  {
    id: 'waterside-explorer', title: 'Waterside Explorer', category: 'Water', difficulty: 'Easy', duration: '30–45 min', minutes: 35,
    description: 'Follow the edge of water and look for the life, texture, and structures it gathers.', illustration: 'water', color: 'blue', completionXp: 190,
    safety: 'Keep back from slippery banks and never enter fast or unfamiliar water.',
    objectives: [
      { id: 'water-body', collectibleIds: ['stream', 'pond'], label: 'Find a body of water', required: true },
      { id: 'water-reeds', collectibleIds: ['reeds'], label: 'Spot reeds or waterside plants', required: true },
      { id: 'water-pebble', collectibleIds: ['smooth-pebble', 'gravel'], label: 'Notice a water-shaped stone', required: true },
      { id: 'water-wildlife', collectibleIds: ['dragonfly', 'pigeon', 'sparrow'], label: 'Look for waterside wildlife', required: false }
    ], bonus: ['bridge']
  },
  {
    id: 'urban-nature', title: 'Urban Nature', category: 'City green', difficulty: 'Easy', duration: '20–35 min', minutes: 25,
    description: 'Find the living edges and thoughtful details hiding in the everyday city.', illustration: 'urban', color: 'orange', completionXp: 175,
    safety: 'Stay aware of traffic, crossings, and other people. Keep your phone down while walking.',
    objectives: [
      { id: 'urban-seat', collectibleIds: ['park-bench'], label: 'Find a place to pause', required: true },
      { id: 'urban-bloom', collectibleIds: ['wildflower', 'sunflower'], label: 'Notice a flower', required: true },
      { id: 'urban-bird', collectibleIds: ['pigeon', 'sparrow'], label: 'Spot a city bird', required: true },
      { id: 'urban-art', collectibleIds: ['public-art', 'fountain'], label: 'Find public art or water', required: false }
    ], bonus: ['trail-marker', 'tree-bark']
  },
  {
    id: 'seasonal-scout', title: 'Seasonal Scout', category: 'All seasons', difficulty: 'Easy', duration: '25–40 min', minutes: 30,
    description: 'Read the season in color, seed, texture, and what has returned to the ground.', illustration: 'season', color: 'amber', completionXp: 180,
    safety: 'Observe plants and fruit without tasting or picking anything unfamiliar.',
    objectives: [
      { id: 'season-color', collectibleIds: ['autumn-foliage', 'maple-leaf'], label: 'Find a seasonal color change', required: true },
      { id: 'season-seed', collectibleIds: ['acorn', 'seed-pod'], label: 'Find a seed or pod', required: true },
      { id: 'season-fruit', collectibleIds: ['fallen-apple'], label: 'Notice fallen fruit', required: true },
      { id: 'season-flower', collectibleIds: ['wildflower', 'sunflower'], label: 'Find something still in bloom', required: false }
    ], bonus: ['pinecone', 'fern']
  },
  {
    id: 'rock-mineral', title: 'Rock & Mineral Hunt', category: 'Geology', difficulty: 'Moderate', duration: '30–50 min', minutes: 40,
    description: 'Look closely at the ground: color, grain, shape, and the forces that made it.', illustration: 'rock', color: 'slate', completionXp: 210,
    safety: 'Do not climb unstable formations or collect rocks from protected places.',
    objectives: [
      { id: 'rock-pebble', collectibleIds: ['smooth-pebble', 'gravel'], label: 'Find a small rounded stone', required: true },
      { id: 'rock-granite', collectibleIds: ['granite-rock'], label: 'Spot a speckled rock', required: true },
      { id: 'rock-form', collectibleIds: ['rock-formation'], label: 'Notice a larger formation', required: true },
      { id: 'rock-path', collectibleIds: ['trail-marker'], label: 'Find how people move through here', required: false }
    ], bonus: ['moss', 'stream']
  },
  {
    id: 'wildlife-watch', title: 'Wildlife Watch', category: 'Living world', difficulty: 'Moderate', duration: '30–60 min', minutes: 45,
    description: 'Practice patient, respectful noticing. The best sighting is one that leaves no trace.', illustration: 'wildlife', color: 'violet', completionXp: 240,
    safety: 'Never approach, feed, call to, or touch wildlife. Keep far from nests and leave if an animal seems stressed.',
    objectives: [
      { id: 'wild-bird', collectibleIds: ['sparrow', 'pigeon'], label: 'Observe a bird', required: true },
      { id: 'wild-pollinator', collectibleIds: ['butterfly', 'bee'], label: 'Notice a pollinator', required: true },
      { id: 'wild-water', collectibleIds: ['dragonfly'], label: 'Look for a waterside insect', required: true },
      { id: 'wild-nest', collectibleIds: ['bird-nest'], label: 'Spot a nest from a safe distance', required: false }
    ], bonus: ['wildflower', 'pond']
  },
  {
    id: 'micro-adventure', title: 'Micro-Adventure', category: 'Quick start', difficulty: 'Beginner', duration: '10–15 min', minutes: 12,
    description: 'Three small observations are enough to change the shape of an ordinary walk.', illustration: 'micro', color: 'yellow', completionXp: 100,
    safety: 'Choose a familiar, safe route and pause before using your phone.',
    objectives: [
      { id: 'micro-green', collectibleIds: ['moss', 'fern', 'tree-bark'], label: 'Find something green', required: true },
      { id: 'micro-stone', collectibleIds: ['smooth-pebble', 'gravel'], label: 'Find something shaped by weather', required: true },
      { id: 'micro-life', collectibleIds: ['wildflower', 'bee', 'sparrow'], label: 'Notice another living thing', required: true }
    ], bonus: ['park-bench', 'fallen-branch']
  }
]

export const expeditionById = Object.fromEntries(expeditions.map((expedition) => [expedition.id, expedition]))
