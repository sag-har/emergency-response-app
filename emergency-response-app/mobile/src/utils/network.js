import NetInfo from "@react-native-community/netinfo";

export const isConnected = async () => {
  const state =
    await NetInfo.fetch();

  return state.isConnected;
};