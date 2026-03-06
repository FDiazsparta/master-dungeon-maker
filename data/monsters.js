// D&D SRD-compatible Monster Database
const MONSTERS = [
  // CR 0 - 1/4
  { name: 'Giant Rat', cr: 0.125, xp: 25, type: 'beast', size: 'Small', countDice: '2d4' },
  { name: 'Kobold', cr: 0.125, xp: 25, type: 'humanoid', size: 'Small', countDice: '2d6' },
  { name: 'Skeleton', cr: 0.25, xp: 50, type: 'undead', size: 'Medium', countDice: '2d4' },
  { name: 'Zombie', cr: 0.25, xp: 50, type: 'undead', size: 'Medium', countDice: '1d6' },
  { name: 'Goblin', cr: 0.25, xp: 50, type: 'humanoid', size: 'Small', countDice: '2d4' },
  { name: 'Giant Spider', cr: 0.25, xp: 50, type: 'beast', size: 'Small', countDice: '1d4' },
  { name: 'Bat Swarm', cr: 0.25, xp: 50, type: 'beast', size: 'Medium', countDice: '1d2' },

  // CR 1/2 - 1
  { name: 'Orc', cr: 0.5, xp: 100, type: 'humanoid', size: 'Medium', countDice: '1d4+1' },
  { name: 'Hobgoblin', cr: 0.5, xp: 100, type: 'humanoid', size: 'Medium', countDice: '1d6' },
  { name: 'Shadow', cr: 0.5, xp: 100, type: 'undead', size: 'Medium', countDice: '1d3' },
  { name: 'Gnoll', cr: 0.5, xp: 100, type: 'humanoid', size: 'Medium', countDice: '1d4+1' },
  { name: 'Ghoul', cr: 1, xp: 200, type: 'undead', size: 'Medium', countDice: '1d4' },
  { name: 'Bugbear', cr: 1, xp: 200, type: 'humanoid', size: 'Medium', countDice: '1d3' },
  { name: 'Giant Spider (Large)', cr: 1, xp: 200, type: 'beast', size: 'Large', countDice: '1d2' },
  { name: 'Specter', cr: 1, xp: 200, type: 'undead', size: 'Medium', countDice: '1d2' },

  // CR 2 - 3
  { name: 'Ogre', cr: 2, xp: 450, type: 'giant', size: 'Large', countDice: '1d2' },
  { name: 'Ghast', cr: 2, xp: 450, type: 'undead', size: 'Medium', countDice: '1d3' },
  { name: 'Mimic', cr: 2, xp: 450, type: 'monstrosity', size: 'Medium', countDice: '1' },
  { name: 'Gargoyle', cr: 2, xp: 450, type: 'elemental', size: 'Medium', countDice: '1d2' },
  { name: 'Gelatinous Cube', cr: 2, xp: 450, type: 'ooze', size: 'Large', countDice: '1' },
  { name: 'Werewolf', cr: 3, xp: 700, type: 'humanoid', size: 'Medium', countDice: '1' },
  { name: 'Owlbear', cr: 3, xp: 700, type: 'monstrosity', size: 'Large', countDice: '1' },
  { name: 'Mummy', cr: 3, xp: 700, type: 'undead', size: 'Medium', countDice: '1' },
  { name: 'Minotaur', cr: 3, xp: 700, type: 'monstrosity', size: 'Large', countDice: '1' },

  // CR 4 - 6
  { name: 'Ettin', cr: 4, xp: 1100, type: 'giant', size: 'Large', countDice: '1' },
  { name: 'Ghost', cr: 4, xp: 1100, type: 'undead', size: 'Medium', countDice: '1' },
  { name: 'Flameskull', cr: 4, xp: 1100, type: 'undead', size: 'Tiny', countDice: '1d2' },
  { name: 'Troll', cr: 5, xp: 1800, type: 'giant', size: 'Large', countDice: '1' },
  { name: 'Wraith', cr: 5, xp: 1800, type: 'undead', size: 'Medium', countDice: '1' },
  { name: 'Salamander', cr: 5, xp: 1800, type: 'elemental', size: 'Large', countDice: '1' },
  { name: 'Medusa', cr: 6, xp: 2300, type: 'monstrosity', size: 'Medium', countDice: '1' },
  { name: 'Drider', cr: 6, xp: 2300, type: 'monstrosity', size: 'Large', countDice: '1' },

  // CR 7+
  { name: 'Stone Giant', cr: 7, xp: 2900, type: 'giant', size: 'Huge', countDice: '1' },
  { name: 'Mind Flayer', cr: 7, xp: 2900, type: 'aberration', size: 'Medium', countDice: '1' },
  { name: 'Frost Giant', cr: 8, xp: 3900, type: 'giant', size: 'Huge', countDice: '1' },
  { name: 'Young Black Dragon', cr: 7, xp: 2900, type: 'dragon', size: 'Large', countDice: '1' },
  { name: 'Young Green Dragon', cr: 8, xp: 3900, type: 'dragon', size: 'Large', countDice: '1' },
  { name: 'Beholder', cr: 13, xp: 10000, type: 'aberration', size: 'Large', countDice: '1' },
  { name: 'Lich', cr: 21, xp: 33000, type: 'undead', size: 'Medium', countDice: '1' },
  { name: 'Ancient Red Dragon', cr: 24, xp: 62000, type: 'dragon', size: 'Gargantuan', countDice: '1' },
];

// Theme-based monster filters
const THEME_MONSTERS = {
  dungeon: ['humanoid', 'undead', 'monstrosity', 'beast', 'ooze'],
  cave: ['beast', 'monstrosity', 'giant', 'ooze'],
  temple: ['undead', 'elemental', 'aberration'],
  tower: ['humanoid', 'elemental', 'aberration', 'dragon'],
};
