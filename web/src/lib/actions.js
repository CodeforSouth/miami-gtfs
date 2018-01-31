export function createActions(mutations, prefix) {
  const payload = {
    types: {},
    actions: {}
  };

  mutations.forEach(mutation => {
    const type = `${prefix}/${mutation}`;
    payload.types[mutation] = type;
    payload.actions[mutation] = function(payload) {
      return {
        type,
        payload
      };
    };
  });

  return payload;
}
