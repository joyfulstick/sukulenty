export default function(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)
}
