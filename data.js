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
    'minPower': 35
  },
  'Iron Pickaxe': {
    'img': 'sprites/picks/Iron_Pickaxe.png',
    'type': 'pickaxe',
    'materials': {
      'Iron Bar': 12,
      'Wood': 3
    },
    'power': 70,
    'station': 'Iron Anvil'
  },
  'Stone Block': {
    'img': 'sprites/materials/stone.png',
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





weaponList = {
  "copper_shortsword": {
    "atk": 5,
    "img": "sprites/weapons/copper_shortsword.png"
  }
}
