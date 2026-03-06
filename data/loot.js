// Loot Tables by CR Tier
const LOOT_TABLES = {
  // CR 0-1
  tier1: {
    coins: { min: 5, max: 50, unit: 'gp' },
    items: [
      { name: 'Potion of Healing', rarity: 'common', weight: 30 },
      { name: 'Dagger +1', rarity: 'uncommon', weight: 5 },
      { name: 'Shortsword', rarity: 'common', weight: 15 },
      { name: 'Leather Armor', rarity: 'common', weight: 15 },
      { name: 'Shield', rarity: 'common', weight: 10 },
      { name: 'Rope (50 ft)', rarity: 'common', weight: 10 },
      { name: 'Torch (x5)', rarity: 'common', weight: 10 },
      { name: 'Scroll of Detect Magic', rarity: 'common', weight: 5 },
    ]
  },
  // CR 2-4
  tier2: {
    coins: { min: 50, max: 300, unit: 'gp' },
    items: [
      { name: 'Potion of Greater Healing', rarity: 'uncommon', weight: 20 },
      { name: 'Longsword +1', rarity: 'uncommon', weight: 8 },
      { name: 'Cloak of Elvenkind', rarity: 'uncommon', weight: 5 },
      { name: 'Boots of Elvenkind', rarity: 'uncommon', weight: 5 },
      { name: 'Ring of Protection', rarity: 'rare', weight: 2 },
      { name: 'Chain Mail', rarity: 'common', weight: 10 },
      { name: 'Crossbow +1', rarity: 'uncommon', weight: 8 },
      { name: 'Bag of Holding', rarity: 'uncommon', weight: 4 },
      { name: 'Wand of Magic Missiles', rarity: 'uncommon', weight: 5 },
      { name: 'Scroll of Fireball', rarity: 'uncommon', weight: 5 },
      { name: 'Gem (50 gp)', rarity: 'common', weight: 15 },
      { name: 'Art Object (100 gp)', rarity: 'uncommon', weight: 8 },
      { name: 'Spell Component Pouch', rarity: 'common', weight: 5 },
    ]
  },
  // CR 5-10
  tier3: {
    coins: { min: 200, max: 2000, unit: 'gp' },
    items: [
      { name: 'Potion of Superior Healing', rarity: 'rare', weight: 15 },
      { name: 'Flame Tongue Sword', rarity: 'rare', weight: 5 },
      { name: 'Staff of the Woodlands', rarity: 'rare', weight: 3 },
      { name: 'Amulet of Health', rarity: 'rare', weight: 5 },
      { name: 'Cloak of Displacement', rarity: 'rare', weight: 5 },
      { name: 'Plate Armor +1', rarity: 'rare', weight: 5 },
      { name: 'Gem (500 gp)', rarity: 'uncommon', weight: 10 },
      { name: 'Art Object (500 gp)', rarity: 'uncommon', weight: 10 },
      { name: 'Scroll of Raise Dead', rarity: 'rare', weight: 5 },
      { name: 'Periapt of Wound Closure', rarity: 'uncommon', weight: 8 },
      { name: 'Gauntlets of Ogre Power', rarity: 'uncommon', weight: 7 },
      { name: 'Boots of Speed', rarity: 'rare', weight: 4 },
      { name: 'Immovable Rod', rarity: 'uncommon', weight: 8 },
      { name: 'Necklace of Fireballs', rarity: 'rare', weight: 5 },
    ]
  },
  // CR 11+
  tier4: {
    coins: { min: 2000, max: 20000, unit: 'gp' },
    items: [
      { name: 'Vorpal Sword', rarity: 'legendary', weight: 2 },
      { name: 'Staff of Power', rarity: 'very rare', weight: 3 },
      { name: 'Robe of the Archmagi', rarity: 'legendary', weight: 2 },
      { name: 'Ring of Regeneration', rarity: 'very rare', weight: 3 },
      { name: 'Holy Avenger', rarity: 'legendary', weight: 2 },
      { name: 'Gem (5000 gp)', rarity: 'rare', weight: 5 },
      { name: 'Art Object (2500 gp)', rarity: 'rare', weight: 5 },
      { name: 'Potion of Supreme Healing', rarity: 'very rare', weight: 8 },
      { name: 'Scroll of Gate', rarity: 'very rare', weight: 3 },
      { name: 'Ioun Stone (Mastery)', rarity: 'legendary', weight: 2 },
      { name: 'Armor of Invulnerability', rarity: 'legendary', weight: 2 },
      { name: 'Carpet of Flying', rarity: 'very rare', weight: 5 },
    ]
  }
};

function getLootTier(cr) {
  if (cr <= 1) return 'tier1';
  if (cr <= 4) return 'tier2';
  if (cr <= 10) return 'tier3';
  return 'tier4';
}
