import pino from 'pino';
import { isDEV } from '@constants/env';

export default pino({ level: isDEV ? 'debug' : 'warn' });
