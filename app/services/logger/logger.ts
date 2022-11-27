import { Level, factory } from 'dirty-kitchen/lib/logger';

import { source } from './sources';

const FALLBACK_LOGG_LEVEL: Level = 'warn';
const LOGG_LEVEL = typeof process !== 'undefined'
  ? (process.env.LOGG_LEVEL as Level)
  : undefined;
export const getLogger = factory(LOGG_LEVEL ?? FALLBACK_LOGG_LEVEL, source);
