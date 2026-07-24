export const generateRequestId = () => {
  return `REQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};