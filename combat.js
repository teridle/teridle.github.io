
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
