import os from 'os';

/**
 * Returns the current user's name.
 * In a real app, this might come from a config or auth system.
 * For this CLI, we'll use the OS username.
 */
export function getCurrentUser() {
  return os.userInfo().username || 'Anonymous';
}
