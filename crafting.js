var craftList = {};
var stations = ['hand'];

function hasMaterials(name) {
  var item = itemList[name];

  var available = true;
  Object.keys(item.materials).forEach(function(material, idx) {
    var cost = item.materials[material];
    var amount = material in inventory ? inventory[material].amount : 0;
    var mats = material in materials ? materials[material] : 0;

    if (mats < cost && amount < cost) {
      available = false;
    }
  })
  return available;
}

function checkAvailableCrafts() {
  Object.keys(itemList).forEach(function(key, index){
    var item = itemList[key];

    if (stations.indexOf(key) != -1) {
      return
    }

    if (!(key in craftList) && 'materials' in item && stations.indexOf(item.station) != -1) {
      if (hasMaterials(key)) {
        updateCrafting(key);
      }
    } else if (key in craftList) {
      if (! hasMaterials(key)) {
        removeAvailable(key);
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

  var isStation = 'type' in craftList[name] && craftList[name].type === 'station';
  if (isStation) {
    stations.push(name);

    var stationHolder = document.getElementById("stations");
    var displayImg = document.createElement("img");
    displayImg.src = craftList[name].img;
    displayImg.title = name;
    stationHolder.append(displayImg)
  } else {
    addItem(name, 'amount' in craftList[name] ? craftList[name].amount : 1);
  }

  if (!(hasMaterials(name)) || isStation) {
    removeAvailable(name);
  }

  checkAvailableCrafts();
}

function removeAvailable(name) {
  var available = document.getElementById("available");
  available.removeChild(document.getElementById("available-" + name));
  delete craftList[name];
}

function updateCrafting(name) {
  var item = itemList[name];
  craftList[name] = Object.create(item);

  var available = document.getElementById("available");
  var displayImg = document.createElement("img");
  displayImg.src = item.img;
  displayImg.id = 'available-' + name;
  displayImg.onclick = function() {
    createItem(name);
  }

  available.append(displayImg);
}
