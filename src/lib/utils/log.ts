import pino from 'pino';
import { isDEV } from '@constants/env';

export const log = pino({ level: isDEV ? 'debug' : 'warn' });
