const MENU = Object.freeze({
  espresso: 300,
  cappuccino: 450,
  latte: 500,
  mocha: 550,
});

function createLoyaltyAccount(customerName) {
  if (!customerName || typeof customerName !== 'string') {
    throw new Error('A customer name is required.');
  }

  return {
    customerName,
    points: 0,
    tier: 'Bronze',
  };
}

function calculateOrderTotal(items, menu = MENU) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('At least one order item is required.');
  }

  return items.reduce((total, item) => {
    const unitPrice = menu[item.name];
    if (!unitPrice) {
      throw new Error(`Unknown menu item: ${item.name}`);
    }

    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw new Error(`Invalid quantity for item: ${item.name}`);
    }

    return total + unitPrice * item.quantity;
  }, 0);
}

function getTier(points) {
  if (points >= 500) return 'Gold';
  if (points >= 200) return 'Silver';
  return 'Bronze';
}

function placeOrder({ items, pointsToRedeem = 0 }, account, menu = MENU) {
  if (!account || typeof account.points !== 'number') {
    throw new Error('A valid loyalty account is required.');
  }

  const subtotalCents = calculateOrderTotal(items, menu);
  const redeemablePoints = Math.max(0, Math.min(pointsToRedeem, account.points));
  const requestedDiscountCents = redeemablePoints;
  const discountCents = Math.min(requestedDiscountCents, subtotalCents);
  const pointsSpent = discountCents;
  const totalCents = subtotalCents - discountCents;
  const pointsEarned = Math.floor(totalCents / 100);

  account.points = account.points - pointsSpent + pointsEarned;
  account.tier = getTier(account.points);

  return {
    subtotalCents,
    discountCents,
    totalCents,
    pointsSpent,
    pointsEarned,
    account: { ...account },
  };
}

module.exports = {
  MENU,
  createLoyaltyAccount,
  calculateOrderTotal,
  placeOrder,
};
