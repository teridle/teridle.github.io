
var biome = null;
var biomeDepth = 'Surface';
var biomeMaterials = null;
var biomeMaterialsHp = {};
var map = ['Ocean', 'Jungle', 'Corruption', 'Desert', 'Forest', 'Snow', 'Crimson', 'Dungeon'];
var mapIndex = 4;
var depthMap = ["Surface", "Underground", "Caverns", "Hell"];

function moveUp() {
  biomeDepth = depthMap[Math.max(depthMap.indexOf(biomeDepth) - 1, 0)];
  switchBiome(biome.name);
}

function moveDown() {
  biomeDepth = depthMap[Math.min(depthMap.indexOf(biomeDepth) + 1, depthMap.length)];
  switchBiome(biome.name);
}

function moveLeft() {
  mapIndex = Math.max(mapIndex - 1, 0);
  switchBiome(map[mapIndex]);
}

function moveRight() {
  mapIndex = Math.min(mapIndex + 1, map.length);
  switchBiome(map[mapIndex]);
}

function switchBiome(name) {
  setBiome(name);
  monsterSpawn.timer = monsterSpawn.max;
  $('#monsterSpawn').css('width', "100%");
}

function setBiome(name) {
  biome = Object.create(biomes[name][biomeDepth]);
  biome.name = name;
  biomeMaterials = Object.assign({}, biome.materials);

  loadMonster();
  updateBiome();
}

function updateBiome() {
  updateInner("biome", biome.name);
  updateInner("biomeDepth", biomeDepth);
}
