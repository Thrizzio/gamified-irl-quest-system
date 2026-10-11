/** @typedef {Object} Collectible */

const item = (id, name, category, description, rarity, baseXp, tags, modelLabels, illustration, scientificName = null, safetyNote = null) => ({
  id, name, scientificName, category, description, rarity, baseXp, tags, modelLabels, illustration, safetyNote
})

export const CATEGORIES = [
  'Leaves & foliage', 'Trees & branches', 'Flowers & plants', 'Mushrooms & fungi',
  'Rocks & geology', 'Water & waterside', 'Birds & insects', 'Seeds & fallen fruit', 'Outdoor structures'
]

export const RARITIES = ['common', 'uncommon', 'rare']

/** @type {Collectible[]} */
export const collectibles = [
  item('oak-leaf', 'Oak leaf', 'Leaves & foliage', 'A lobed leaf with a sturdy stem and a story in every vein.', 'common', 20, ['leaf', 'forest'], ['oak leaf', 'leaf'], 'leaf-oak', 'Quercus spp.'),
  item('maple-leaf', 'Maple leaf', 'Leaves & foliage', 'Look for the unmistakable hand-shaped silhouette on the path.', 'common', 20, ['leaf', 'autumn'], ['maple leaf', 'leaf'], 'leaf-maple', 'Acer spp.'),
  item('autumn-foliage', 'Autumn foliage', 'Leaves & foliage', 'A patch of trees changing their colors with the season.', 'uncommon', 35, ['leaf', 'seasonal'], ['autumn', 'foliage', 'leaves'], 'foliage'),
  item('fern', 'Fern', 'Leaves & foliage', 'A frond unfurling from a shady, damp corner.', 'common', 25, ['fern', 'shade'], ['fern', 'plant'], 'fern', null, 'Observe without trampling delicate fronds.'),
  item('moss', 'Moss', 'Leaves & foliage', 'A soft green carpet that makes a miniature landscape of stone and bark.', 'common', 25, ['moss', 'green'], ['moss', 'green'], 'moss'),
  item('pine-needles', 'Pine needles', 'Leaves & foliage', 'A fan of long, fine needles beneath a conifer.', 'common', 20, ['pine', 'needle'], ['pine', 'needles', 'tree'], 'pine'),
  item('oak-tree', 'Oak tree', 'Trees & branches', 'A broad-crowned tree with ridged bark and generous shade.', 'uncommon', 35, ['tree', 'forest'], ['oak tree', 'tree'], 'tree-oak', 'Quercus spp.'),
  item('fallen-branch', 'Fallen branch', 'Trees & branches', 'A branch returned to the forest floor; notice its texture and shape.', 'common', 15, ['branch', 'wood'], ['branch', 'wood'], 'branch', null, 'Leave habitat materials where you find them.'),
  item('tree-bark', 'Textured tree bark', 'Trees & branches', 'A close-up study of ridges, patterns, and weather written into bark.', 'common', 20, ['tree', 'texture'], ['bark', 'tree'], 'bark'),
  item('wildflower', 'Wildflower', 'Flowers & plants', 'A small, uncultivated bloom doing its quiet work for pollinators.', 'common', 25, ['flower', 'pollinator'], ['wildflower', 'flower'], 'wildflower', null, 'Look, do not pick.'),
  item('sunflower', 'Sunflower', 'Flowers & plants', 'A bright, unmistakable flower turning its face toward the sky.', 'uncommon', 30, ['flower', 'garden'], ['sunflower', 'flower'], 'sunflower', 'Helianthus annuus'),
  item('reeds', 'Reeds', 'Flowers & plants', 'Tall, slender plants marking the edge between land and water.', 'common', 20, ['plant', 'water'], ['reeds', 'grass', 'plant'], 'reeds', null, 'Stay on paths around soft or unstable banks.'),
  item('mushroom', 'Mushroom', 'Mushrooms & fungi', 'A fruiting body spotted from a respectful distance on the forest floor.', 'uncommon', 40, ['fungi', 'forest'], ['mushroom', 'fungus'], 'mushroom', null, 'Never touch or eat an unknown fungus.'),
  item('bracket-fungus', 'Bracket fungus', 'Mushrooms & fungi', 'A shelf-like fungus growing from a fallen trunk or living tree.', 'rare', 55, ['fungi', 'wood'], ['bracket fungus', 'fungus', 'mushroom'], 'bracket-fungus', null, 'Observe only; never handle.'),
  item('acorn', 'Acorn', 'Seeds & fallen fruit', 'An oak seed tucked into a cap, often hidden among dry leaves.', 'common', 20, ['seed', 'oak'], ['acorn', 'seed'], 'acorn', null, 'Leave seeds for wildlife.'),
  item('pinecone', 'Pinecone', 'Seeds & fallen fruit', 'A woody cone with overlapping scales beneath a pine.', 'common', 20, ['seed', 'pine'], ['pinecone', 'cone'], 'pinecone', null, 'Leave natural materials in place.'),
  item('seed-pod', 'Seed pod', 'Seeds & fallen fruit', 'A plant’s little capsule, husk, or pod preparing its next generation.', 'uncommon', 30, ['seed', 'plant'], ['seed pod', 'pod'], 'seed-pod'),
  item('fallen-apple', 'Fallen apple', 'Seeds & fallen fruit', 'A fruit returned to the soil beneath a tree or in an orchard.', 'common', 20, ['fruit', 'seasonal'], ['apple', 'fruit'], 'apple', null, 'Do not eat fruit found outdoors.'),
  item('smooth-pebble', 'Smooth pebble', 'Rocks & geology', 'A stone rounded by water, weather, or a thousand passing footsteps.', 'common', 15, ['rock', 'water'], ['pebble', 'rock', 'stone'], 'pebble', null, 'Look without collecting.'),
  item('granite-rock', 'Granite rock', 'Rocks & geology', 'A speckled, hard rock with interlocking crystals.', 'uncommon', 30, ['rock', 'geology'], ['granite', 'rock'], 'granite'),
  item('rock-formation', 'Rock formation', 'Rocks & geology', 'A larger outcrop shaped by time, pressure, and weather.', 'rare', 55, ['rock', 'geology'], ['rock formation', 'rocks'], 'formation', null, 'Keep a safe distance from edges and loose stone.'),
  item('stream', 'Stream', 'Water & waterside', 'Moving water making a path through the landscape.', 'common', 25, ['water', 'moving'], ['stream', 'river', 'water'], 'stream', null, 'Do not enter fast or unfamiliar water.'),
  item('pond', 'Pond', 'Water & waterside', 'Still water reflecting sky, plants, and the life around its edge.', 'common', 25, ['water', 'still'], ['pond', 'lake', 'water'], 'pond', null, 'Keep back from slippery banks.'),
  item('bridge', 'Wooden bridge', 'Outdoor structures', 'A crossing that helps people move lightly over a wet place or ravine.', 'uncommon', 25, ['structure', 'crossing'], ['bridge', 'wooden bridge'], 'bridge'),
  item('butterfly', 'Butterfly', 'Birds & insects', 'A fleeting winged visitor; pause and let it choose the distance.', 'uncommon', 40, ['insect', 'pollinator'], ['butterfly', 'insect'], 'butterfly', null, 'Do not chase or touch wildlife.'),
  item('bee', 'Bee', 'Birds & insects', 'A pollinator at work among flowers.', 'common', 30, ['insect', 'pollinator'], ['bee', 'insect'], 'bee', null, 'Observe calmly and give insects space.'),
  item('sparrow', 'Sparrow', 'Birds & insects', 'A small, sociable songbird often found near hedges and human places.', 'common', 35, ['bird', 'urban'], ['sparrow', 'bird'], 'sparrow', 'Passer domesticus', 'Keep your distance and never feed wildlife.'),
  item('pigeon', 'Pigeon', 'Birds & insects', 'A familiar city bird with surprising iridescent detail.', 'common', 25, ['bird', 'urban'], ['pigeon', 'bird'], 'pigeon', null, 'Observe without approaching or feeding.'),
  item('dragonfly', 'Dragonfly', 'Birds & insects', 'A bright, agile hunter usually found near water.', 'rare', 50, ['insect', 'water'], ['dragonfly', 'insect'], 'dragonfly', null, 'Watch from the bank; do not disturb.'),
  item('bird-nest', 'Bird nest at a distance', 'Birds & insects', 'A nest seen from far enough away to leave its occupants undisturbed.', 'rare', 55, ['bird', 'nest'], ['bird nest', 'nest'], 'nest', null, 'Never approach, touch, or photograph an active nest closely.'),
  item('park-bench', 'Park bench', 'Outdoor structures', 'A place to pause, notice, and let the world move around you.', 'common', 15, ['structure', 'urban'], ['bench', 'park bench'], 'bench'),
  item('trail-marker', 'Trail marker', 'Outdoor structures', 'A sign, blaze, or post that helps people find their way.', 'common', 20, ['structure', 'trail'], ['trail marker', 'sign', 'trail'], 'marker'),
  item('fountain', 'Fountain', 'Outdoor structures', 'An urban water feature bringing a little movement into a hardscape.', 'uncommon', 30, ['structure', 'water', 'urban'], ['fountain', 'water'], 'fountain'),
  item('public-art', 'Public art', 'Outdoor structures', 'A sculpture, mural, or installation encountered in a public place.', 'uncommon', 35, ['structure', 'art'], ['sculpture', 'mural', 'art'], 'art'),
  item('gravel', 'Gravel path', 'Rocks & geology', 'Many small stones making a textured route through an outdoor place.', 'common', 15, ['rock', 'path'], ['gravel', 'path'], 'gravel')
]

export const collectibleById = Object.fromEntries(collectibles.map((collectible) => [collectible.id, collectible]))

export const categoryMeta = {
  'Leaves & foliage': { icon: 'leaf', short: 'Foliage' }, 'Trees & branches': { icon: 'tree', short: 'Trees' },
  'Flowers & plants': { icon: 'flower', short: 'Plants' }, 'Mushrooms & fungi': { icon: 'mushroom', short: 'Fungi' },
  'Rocks & geology': { icon: 'mountain', short: 'Geology' }, 'Water & waterside': { icon: 'waves', short: 'Water' },
  'Birds & insects': { icon: 'bird', short: 'Wildlife' }, 'Seeds & fallen fruit': { icon: 'sprout', short: 'Seeds' },
  'Outdoor structures': { icon: 'landmark', short: 'Structures' }
}
