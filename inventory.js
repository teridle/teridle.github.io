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


// EQUIP LOGIC
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
