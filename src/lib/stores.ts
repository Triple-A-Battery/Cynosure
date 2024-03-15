import { persisted } from 'svelte-persisted-store';

import type { User } from '../app.d.ts';

export const user = persisted('user', <User | null>null);
