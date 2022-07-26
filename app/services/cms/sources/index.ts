import { GitHub } from './github';
import { Local } from './local';

export const source = process.env.NODE_ENV === 'development' ? new Local() : new GitHub();
