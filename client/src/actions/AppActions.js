const PREFIX = "appActions";

export const SELECT_PIN = `${PREFIX}.SELECT_PIN`;
export const selectPin = (payload) => {
  return {
    type: SELECT_PIN,
    payload
  }
}
