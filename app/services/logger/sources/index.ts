import { Console } from './console';
import { Fake } from './fake';

export const source = process.env.NODE_ENV === 'development' ? new Console() : new Fake();
