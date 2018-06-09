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
