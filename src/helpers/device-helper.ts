/**
 * Whether the device is mobile or not.
 *
 * @returns Whether the device is mobile or not.
 */
export const isMobile = (): boolean => {
  return window.screen.width <= 767;
};
