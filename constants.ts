import { HabitDef } from './types';

export const HABITS: HabitDef[] = [
  {
    id: 'morning_protocol',
    title: 'MORNING PROTOCOL',
    description: 'Outdoor Walk (Sunlight/Serotonin)',
    icon: 'Sun',
  },
  {
    id: 'physical_armour',
    title: 'PHYSICAL ARMOUR',
    description: 'Daily Exercise (Endorphins)',
    icon: 'Dumbbell',
  },
  {
    id: 'the_grind',
    title: 'THE GRIND',
    description: 'DevOps Learning Session (Building the Career)',
    icon: 'Terminal',
  },
  {
    id: 'the_reward',
    title: 'THE REWARD',
    description: 'Midnight Gaming/Webseries (Guilt-free Dopamine)',
    icon: 'Gamepad2',
  },
];

export const APP_STORAGE_KEY = 'neon_detox_data_v1';