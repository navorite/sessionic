import pino from 'pino';
import { isDEV } from '@constants/shared';

export const log = pino({ level: isDEV ? 'debug' : 'warn' });
