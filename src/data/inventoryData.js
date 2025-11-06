export const DEFAULT_MODAL_VALUE = 261000;

export const INVENTORY_CATEGORIES = {
  ELEMENTAL_CRAFT: 'Elemental Craft Stickers',
  SMALL_ARMS: 'Small Arms Charms',
  MISSING_LINKS: 'Missing Links Charms'
};

export const DEFAULT_ITEMS = {
  [INVENTORY_CATEGORIES.ELEMENTAL_CRAFT]: [
    { name: 'Sticker | Ruby Wave (Lenticular)', price: 283093.83 },
    { name: 'Sticker | Ruby Stream (Lenticular)', price: 191028.62 },
    { name: 'Sticker | Winding Scorch (Foil)', price: 118846.15 },
    { name: 'Sticker | Bolt Charge (Foil)', price: 93459.23 },
    { name: 'Sticker | Bolt Strike (Foil)', price: 58461.54 },
    { name: 'Sticker | Rainbow Route (Holo)', price: 40192.31 },
    { name: 'Sticker | Bolt Energy (Foil)', price: 37946.18 },
    { name: 'Sticker | High Heat', price: 21720.62 },
    { name: 'Sticker | Bolt Charge', price: 10515.32 },
    { name: 'Sticker | Boom Trail (Glitter)', price: 7621.86 },
    { name: 'Sticker | Hydro Wave', price: 6342.43 },
    { name: 'Sticker | Winding Scorch', price: 6272.53 },
    { name: 'Sticker | Scorch Loop', price: 5473.14 },
    { name: 'Sticker | Bolt Strike', price: 5183.23 },
    { name: 'Sticker | Boom Detonation (Glitter)', price: 4649.58 },
    { name: 'Sticker | Scorch Loop (Reverse)', price: 4235.92 },
    { name: 'Sticker | Boom Blast (Glitter)', price: 4196.37 },
    { name: 'Sticker | Boom Epicenter (Glitter)', price: 3580.32 },
    { name: 'Sticker | Hydro Stream', price: 3360.70 },
    { name: 'Sticker | Bolt Flow', price: 3162.19 },
    { name: 'Sticker | Boom Trail', price: 2246.36 },
    { name: 'Sticker | Bolt Energy', price: 2199.86 },
    { name: 'Sticker | Hydro Geyser', price: 2135.40 },
    { name: 'Sticker | Boom Blast', price: 965.69 },
    { name: 'Sticker | Boom Detonation', price: 961.54 },
    { name: 'Sticker | Boom Epicenter', price: 866.87 }
  ],
  [INVENTORY_CATEGORIES.SMALL_ARMS]: [
    { name: 'Charm | Baby Karat T', price: 985927.70 },
    { name: 'Charm | Semi-Precious', price: 771919.91 },
    { name: 'Charm | Baby Karat CT', price: 651258.54 },
    { name: 'Charm | Titeenium AWP', price: 184865.73 },
    { name: 'Charm | Lil\' Squirt', price: 142144.99 },
    { name: 'Charm | Die-cast AK', price: 134001.73 },
    { name: 'Charm | Glamour Shot', price: 33073.40 },
    { name: 'Charm | Hot Hands', price: 24783.71 },
    { name: 'Charm | POP Art', price: 24644.52 },
    { name: 'Charm | Disco MAC', price: 22306.39 },
    { name: 'Charm | Baby\'s AK', price: 9284.19 },
    { name: 'Charm | Whittle Knife', price: 5603.23 },
    { name: 'Charm | Pocket AWP', price: 5556.29 },
    { name: 'Charm | Stitch-Loaded', price: 2784.99 },
    { name: 'Charm | Lil\' Cap Gun', price: 2692.30 },
    { name: 'Charm | Lil\' Uzi', price: 2546.41 }
  ],
  [INVENTORY_CATEGORIES.MISSING_LINKS]: [
    { name: 'Charm | Hot Howl', price: 1218380.22 },
    { name: 'Charm | Hot Wurst', price: 938707.16 },
    { name: 'Charm | Diamond Dog', price: 426420.61 },
    { name: 'Charm | Lil\' Monster', price: 271961.00 },
    { name: 'Charm | Diner Dog', price: 185313.83 },
    { name: 'Charm | Lil\' Teacup', price: 59412.88 },
    { name: 'Charm | Chicken Lil\'', price: 52761.80 },
    { name: 'Charm | That\'s Bananas', price: 34723.88 },
    { name: 'Charm | Lil\' Whiskers', price: 29793.44 },
    { name: 'Charm | Lil\' Sandy', price: 22957.45 },
    { name: 'Charm | Lil\' Squatch', price: 17461.16 },
    { name: 'Charm | Lil\' SAS', price: 11538.46 },
    { name: 'Charm | Hot Sauce', price: 7507.93 },
    { name: 'Charm | Pinch O\' Salt', price: 7182.68 },
    { name: 'Charm | Big Kev', price: 6857.37 },
    { name: 'Charm | Lil\' Crass', price: 6735.94 },
    { name: 'Charm | Lil\' Kebab', price: 5340.87 }
  ]
};

export const formatPrice = (price) => {
  return `Rp ${price.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
