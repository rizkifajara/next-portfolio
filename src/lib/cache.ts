import NodeCache from 'node-cache';

export const cache = new NodeCache({
  stdTTL: 3600, // 1 hour default TTL
  checkperiod: 120 // Check for expired keys every 2 minutes
});