export const setOverflowY = (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : "unset";
};

export const isFullfilled = (form) => {
  return Object.keys(form).some((key) => form[key] !== "");
};
