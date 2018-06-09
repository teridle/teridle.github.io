itemList = {
  'Gel': {
    "img": "sprites/materials/gel.png"
  },
  'Copper Pickaxe': {
    'img': 'sprites/picks/copper.png',
    'type': 'pickaxe',
    'materials': {
      'Copper Bar': 12,
      'Wood': 3
    },
    'power': 35,
    'station': 'Iron Anvil'
  },
  'Copper Shortsword': {
    "img": 'sprites/weapons/copper_shortsword.png',
    'craftable': true,
    'slot': 'weapon',
    'atk': 5,
    'materials': {
      'Copper Bar': 7,
    },
    'station': 'Iron Anvil'
  },
  'Furnace': {
    "img": 'sprites/stations/furnace.png',
    'type': 'station',
    'materials': {
      'Stone Block': 20,
      'Wood': 4,
      'Torch': 3
    },
    'station': 'Work Bench'
  },
  'Iron Anvil': {
    "img": 'sprites/stations/Iron_Anvil.png',
    'type': 'station',
    'materials': {
      'Iron Bar': 5
    },
    'station': 'Work Bench'
  },
  'Iron Bar': {
    'img': 'sprites/materials/Iron_Bar.png',
    'type': 'material',
    'materials': {
      'Iron Ore': 3
    },
    'station': 'Furnace'
  },
  'Iron Ore': {
    'img': 'sprites/materials/iron_ore.png',
    'hp': 100,
    'minPower': 35
  },
  'Iron Pickaxe': {
    'img': 'sprites/picks/Iron_Pickaxe.png',
    'type': 'pickaxe',
    'materials': {
      'Iron Bar': 12,
      'Wood': 3
    },
    'power': 40,
    'station': 'Iron Anvil'
  },
  'Stone Block': {
    'img': 'sprites/materials/stone.png',
    'hp': 100,
    'minPower': 35
  },
  'Torch': {
    'img': 'sprites/light/torch.png',
    'type': 'light',
    'materials': {
      'Gel': 1,
      'Wood': 1
    },
    'amount': 3,
    'station': 'hand'
  },
  'Wood': {
    'img': 'sprites/materials/wood.png',
    'hp': 50,
    'minPower': 35
  },
  'Wood Helmet': {
    "img": 'sprites/helmets/wood.png',
    'craftable': true,
    'slot': 'helmet',
    'def': 1,
    'materials': {
      'Wood': 20,
    },
    'station': 'Work Bench'
  },
  'Wood Breastplate': {
    "img": 'sprites/body/wood.png',
    'craftable': true,
    'slot': 'body',
    'def': 1,
    'materials': {
      'Wood': 30,
    },
    'station': 'Work Bench'
  },
  'Wood Greaves': {
    "img": 'sprites/legs/wood.png',
    'craftable': true,
    'slot': 'legs',
    'def': 0,
    'materials': {
      'Wood': 25,
    },
    'station': 'Work Bench'
  },
  'Work Bench': {
    "img": 'sprites/stations/work_bench.png',
    'type': 'station',
    'materials': {
      'Wood': 10,
    },
    'station': 'hand'
  }
}

monsterList = {
  "blue_slime": {
    "hp": 20,
    "atk": 7,
    "def": 2,
    "img": "sprites/monsters/blue_slime.png",
    "drops": {
      "Gel": {
        "min": 1,
        "max": 2,
        "rate": 100
      }
    }
  },
  "green_slime": {
    "hp": 14,
    "atk": 6,
    "def": 0,
    "img": "sprites/monsters/green_slime.png",
    "drops": {
      "Gel": {
        "min": 1,
        "max": 2,
        "rate": 100
      }
    }
  },
  "Ice Slime": {
    "hp": 30,
    "atk": 8,
    "def": 4,
    "img": "sprites/monsters/Ice_Slime.gif",
    "drops": {
      "Gel": {
        "min": 1,
        "max": 2,
        "rate": 100
      }
    }
  },
  "Red Slime": {
    "hp": 35,
    "atk": 12,
    "def": 4,
    "img": "sprites/monsters/Red_Slime.png",
    "drops": {
      "Gel": {
        "min": 1,
        "max": 2,
        "rate": 100
      }
    }
  }
}

biomes = {
  'Forest' : {
    'Surface': {
      'monsters': ['blue_slime', 'green_slime'],
      'materials': {
        'Wood': 1,
        'Stone Block': 3,
        'Iron Ore': 5
      }
    },
    'Underground': {
      'monsters': ['Red Slime'],
      'materials': {
        'Wood': 1,
        'Stone Block': 3,
        'Iron Ore': 5
      }
    }
  },
  'Snow' : {
    'Surface': {
      'monsters': ['Ice Slime'],
      'materials': {
        'Wood': 1,
        'Stone Block': 3,
        'Iron Ore': 5
      }
    }
  }
}

weaponList = {
  "copper_shortsword": {
    "atk": 5,
    "img": "sprites/weapons/copper_shortsword.png"
  }
}
