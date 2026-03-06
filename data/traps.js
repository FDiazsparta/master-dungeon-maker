// Trap Database
const TRAPS = [
  { name: 'Pit Trap', damage: '2d6 bludgeoning', dc: 12, trigger: 'Pressure plate', severity: 'setback', description: 'A 10-foot pit concealed by canvas and straw. Falls prone on failure.' },
  { name: 'Arrow Trap', damage: '2d6 piercing', dc: 14, trigger: 'Tripwire', severity: 'setback', description: 'Hidden crossbow bolts fire from the wall when tripwire is disturbed.' },
  { name: 'Poison Dart Trap', damage: '1d4 piercing + 2d6 poison', dc: 13, trigger: 'Pressure plate', severity: 'dangerous', description: 'Small darts fire from tiny holes in the walls, coated in poison.' },
  { name: 'Falling Net', damage: '0 (restrained)', dc: 12, trigger: 'Tripwire', severity: 'setback', description: 'A heavy net drops from above, restraining those underneath.' },
  { name: 'Swinging Blade', damage: '3d6 slashing', dc: 15, trigger: 'Pressure plate', severity: 'dangerous', description: 'A massive blade swings down from a concealed slot in the ceiling.' },
  { name: 'Fire Trap (Glyph)', damage: '4d6 fire', dc: 14, trigger: 'Magical glyph', severity: 'dangerous', description: 'A magical glyph erupts in flame when stepped on or disturbed.' },
  { name: 'Collapsing Ceiling', damage: '4d10 bludgeoning', dc: 15, trigger: 'Pressure plate', severity: 'deadly', description: 'Support pillars give way, raining stone and debris on the area.' },
  { name: 'Spike Pit', damage: '2d6 bludgeoning + 2d6 piercing', dc: 13, trigger: 'Pressure plate', severity: 'dangerous', description: 'A pit trap lined with iron spikes at the bottom.' },
  { name: 'Poison Gas', damage: '3d6 poison (save for half)', dc: 14, trigger: 'Opening a chest/door', severity: 'dangerous', description: 'Green gas pours from vents when a container or door is opened.' },
  { name: 'Rolling Boulder', damage: '5d10 bludgeoning', dc: 16, trigger: 'Tripwire', severity: 'deadly', description: 'A massive stone sphere rolls down the corridor toward the party.' },
  { name: 'Lightning Rune', damage: '4d8 lightning', dc: 15, trigger: 'Magical rune', severity: 'dangerous', description: 'An arcane rune on the floor crackles with electrical energy.' },
  { name: 'Acid Spray', damage: '3d6 acid', dc: 13, trigger: 'Tripwire', severity: 'dangerous', description: 'Pressurized acid sprays from nozzles hidden in the walls.' },
  { name: 'Sleep Gas', damage: '0 (unconscious 1 min)', dc: 13, trigger: 'Opening a door', severity: 'setback', description: 'Sweet-smelling gas fills the area, causing drowsiness.' },
  { name: 'Teleportation Trap', damage: '0 (teleported)', dc: 16, trigger: 'Magical circle', severity: 'dangerous', description: 'A hidden teleportation circle sends the victim to another room.' },
  { name: 'Crushing Walls', damage: '6d10 bludgeoning', dc: 17, trigger: 'Closing a door', severity: 'deadly', description: 'The walls begin slowly closing in, threatening to crush everyone.' },
];

const TRAP_SEVERITY = {
  setback: { color: '#f39c12', label: 'Setback' },
  dangerous: { color: '#e74c3c', label: 'Dangerous' },
  deadly: { color: '#8e44ad', label: 'Deadly' },
};
