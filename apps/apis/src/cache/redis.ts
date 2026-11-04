import { Redis } from "ioredis";

import { ENV } from "../env/env.js";

export const clientRedis = new Redis(ENV.REDIS_URI);