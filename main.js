/*
A global timer object used for updating the game.
*/
GlobalTimer = function() {
    this.timer = setInterval((function() {this.update();}).bind(this), 1000);
    this.lastUpdate = Date.now();

    /*
    Gets time passed since last update, and updates now
    to last update.
    */
    this.getUpdateTime = function() {
        var passed = Date.now() - this.lastUpdate;
        this.lastUpdate = Date.now();
        return passed;
    }

    /*
    Function is called by the timer to do all updates in the game.
    */
    this.update = function() {
            //time since last update.
        var time = this.getUpdateTime();
        gameLoop();
    }
}

function start() {
  GlobalTimer();

  addItem("Copper Shortsword", 1);
  addItem("Copper Pickaxe", 1);

  equipItem('weapon', "Copper Shortsword");
  equipPickaxe("Copper Pickaxe");

  setBiome("Forest");

  updateMaterials();
  updateCombat();
  updateBiome();
}

function gameLoop() {
  collectMaterials();
  engageCombat();
}

function updateInner(name, inner) {
  document.getElementById(name).innerHTML = inner;
}

// MATERIALS
var materials = {}

function collectMaterials() {
  Object.keys(biomeMaterials).forEach(function(key, index) {
    biomeMaterials[key]--;
    if (biomeMaterials[key] <= 0) {
      if (!(key in materials)) {
        materials[key] = 0;
        var mats = document.getElementById("materials");
        var holder = document.createElement("div");
        var img = document.createElement("img");
        img.src = itemList[key].img;
        holder.append(img);

        var count = document.createElement("span");
        count.id = "material-" + key;
        holder.append(count);
        mats.append(holder);
      }
      materials[key] += Math.round(1 * (pickaxe.power / 35));
      biomeMaterials[key] = biome.materials[key];
    }
  });

  updateMaterials();
  checkAvailableCrafts();
}

function updateMaterials() {
  Object.keys(materials).forEach(function(key, index) {
    updateInner("material-" + key, materials[key]);
  });
}


// COMBAT
var monster = {
  hp: 0,
  atk: 0,
  def: 0
}

var player = {
  hp: 100,
  hpMax: 100,
  atk: 0,
  def: 0
}

var respawn = {
  timer: -1,
  max: 10
}

var monsterSpawn = {
  timer: -1,
  max: 10
}

function loadMonster(name) {
  if (name === null || name === undefined) {
    name = biome.monsters[Math.floor(Math.random() * biome.monsters.length)];
  }

  monster = Object.create(monsterList[name]);
  monster.name = name;
  document.getElementById("monsterImg").src = monster.img;

  updateCombat();
}

function engageCombat() {
  if (respawn.timer > 0) {
    respawn.timer--;

    var bar = document.getElementById("respawn");
    $('#respawn').css('width', Math.max((respawn.timer / respawn.max) * 100, 0) + "%");
  } else if (respawn.timer == 0) {
    respawn.timer = -1;
    player.hp = player.hpMax;
    // loadMonster(monster.name);
    updateCombat();
  }

  if (monsterSpawn.timer > 0) {
    monsterSpawn.timer--;

    $('#monsterSpawn').css('width', Math.max((monsterSpawn.timer / monsterSpawn.max) * 100, 0) + "%");
  } else if (monsterSpawn.timer == 0) {
    monsterSpawn.timer = -1;
    loadMonster();
  }

  if (monsterSpawn.timer >= 0 || respawn.timer >= 0) {
    return
  }

  player.hp -= Math.max(monster.atk - player.def, 0);
  monster.hp -= Math.max(player.atk - monster.def, 0);

  if (monster.hp <= 0) {
    $('#monsterSpawn').css('width', "100%");

    Object.keys(monster.drops).forEach(function(key, index) {
      var item = monster.drops[key];
      var roll = Math.floor(Math.random() * 100) + 1;

      if (roll <= item.rate) {
        var amount = Math.floor(Math.random() * item.max) + item.min;
        addItem(key, amount);
        monsterSpawn.timer = monsterSpawn.max;
      }
    })
  }

  if (player.hp <= 0) {
    respawn.timer = respawn.max;
    $('#respawn').css('width', "100%");
  }

  updateCombat();
}

function updateCombat() {
  updateInner("hp", player.hp);
  updateInner("atk", player.atk);
  updateInner("def", player.def);

  updateInner("monsterHp", monster.hp);
  updateInner("monsterAtk", monster.atk);
  updateInner("monsterDef", monster.def);
}


// EQUIP
var equip = {
  "body": null,
  "helmet":null,
  "legs": null,
  "weapon": null
}

function equipItem(slot, name) {
  if (equip[slot] !== null && equip[slot] !== undefined) {
    if ('def' in equip[slot]) {
      player.def -= equip[slot].def;
    }

    if ('atk' in equip[slot]) {
      player.atk -= equip[slot].atk;
    }
  }

  equip[slot] = itemList[name];

  if ('def' in equip[slot]) {
    player.def += equip[slot].def;
  }

  if ('atk' in equip[slot]) {
    player.atk += equip[slot].atk;
  }

  if (slot == 'body') { document.getElementById("bodySlot").src = equip.body.img; }
  if (slot == 'helmet') { document.getElementById("helmetSlot").src = equip.helmet.img; }
  if (slot == 'legs') { document.getElementById("legsSlot").src = equip.legs.img; }
  if (slot == 'weapon') { document.getElementById("weaponSlot").src = equip.weapon.img; }

  updateCombat();
}

function equipPickaxe(name) {
  document.getElementById("pickaxe").src = itemList[name].img;
  pickaxe.power = itemList[name].power;
}

// INVENTORY
var inventory = {};

function addItem(name, amount) {
  if (!(name in inventory)) {
    inventory[name] = Object.create(itemList[name]);
    inventory[name].amount = 0;
    inventory[name].displayId = null;
  }

  inventory[name].amount += amount;
  updateInventory(name);
}

function updateInventory(name) {
  var item = inventory[name];
  var inventoryDisplay = document.getElementById("inventory");
  if (item.displayId === null) {
    var container = document.createElement("span");
    container.class = "inventoryIcon";
    container.id = 'container-' + name;

    var displayImg = document.createElement("img");
    var countImg = document.createElement("span");

    item.displayId = "inventory-" + name;
    item.class= ""
    displayImg.id = item.displayId;
    displayImg.src = item.img;
    countImg.id = item.displayId + "-count";

    if ('slot' in item) {
      displayImg.onclick = function() {
        equipItem(item.slot, name);
      }
    }

    if ('type' in item && item.type === 'pickaxe') {
      displayImg.onclick = function() {
        equipPickaxe(name);
      }
    }

    container.append(displayImg);
    container.append(countImg);

    inventoryDisplay.append(container);
  }

  document.getElementById(item.displayId + "-count").innerHTML = item.amount;

  if (item.amount <= 0) {
    inventoryDisplay.removeChild(document.getElementById('container-' + name));
    delete inventory[name];
  }
}


// BIOME
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


// CRAFTING
var craftList = {};
var stations = ['hand'];

function checkAvailableCrafts() {
  Object.keys(itemList).forEach(function(key, index){
    var item = itemList[key];

    if (stations.indexOf(key) != -1) {
      return
    }

    if (!(key in craftList) && 'materials' in item && stations.indexOf(item.station) != -1) {
      var available = true;
      Object.keys(item.materials).forEach(function(material, idx) {
        var cost = item.materials[material];
        var amount = material in inventory ? inventory[material].amount : 0;
        var mats = material in materials ? materials[material] : 0;

        if (mats < cost && amount < cost) {
          available = false;
        }
      })

      if (available) {
        updateCrafting(key);
      }
    }
  });
}

function createItem(name) {
  Object.keys(craftList[name].materials).forEach(function(key, index) {
    if (key in materials) {
      materials[key] -= craftList[name].materials[key];
      updateMaterials();
    } else if (key in inventory) {
      inventory[key].amount -= craftList[name].materials[key];
      updateInventory(key);
    }
  })

  if ('type' in craftList[name] && craftList[name].type === 'station') {
    stations.push(name);

    var stationHolder = document.getElementById("stations");
    var displayImg = document.createElement("img");
    displayImg.src = craftList[name].img;
    displayImg.title = name;
    stationHolder.append(displayImg)
  } else {
    addItem(name, 1);
  }

  craftList = {};
  updateInner("available", '')
  checkAvailableCrafts();
}

function updateCrafting(name) {
  var item = itemList[name];
  craftList[name] = Object.create(item);

  var available = document.getElementById("available");
  var displayImg = document.createElement("img");
  displayImg.src = item.img;
  displayImg.onclick = function() {
    createItem(name);
  }

  available.append(displayImg);
}
