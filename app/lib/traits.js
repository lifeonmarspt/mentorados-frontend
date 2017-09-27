export const toOptions = (traits) => {
  return traits.map(t => ({ value: t.description, label: t.description }));
};

export const toStringArray = (options) => {
  return options.map(o => o.value);
};
