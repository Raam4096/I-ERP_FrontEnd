/** Small delay so mock screens exercise loading states instead of flashing. */
export const mockLatency = async (ms = 280): Promise<void> => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};
