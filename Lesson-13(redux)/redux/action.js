

export const addItem = (item) => ({
  type: 'ADD_ITEM',
  payload: item,
});

export const updateQuantity = (itemId, newQuantity) => ({
  type: 'UPDATE_QUANTITY',
  payload: { itemId, newQuantity },
});

export const removeItem = (itemId) => ({
  type: 'REMOVE_ITEM',
  payload: itemId,
});
