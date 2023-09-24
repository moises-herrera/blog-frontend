/**
 * Get environments variables from .env file
 *
 * @returns Environments variables.
 */
export const getEnvironments = () => {
  import.meta.env;

  return {
    ...import.meta.env,
  };
};
