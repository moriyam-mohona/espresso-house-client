const test = require('node:test');
const assert = require('node:assert/strict');

const {
  MENU,
  createLoyaltyAccount,
  calculateOrderTotal,
  placeOrder,
} = require('../src/coffeePlatform');

test('calculates coffee order total', () => {
  const total = calculateOrderTotal([
    { name: 'latte', quantity: 2 },
    { name: 'espresso', quantity: 1 },
  ]);

  assert.equal(total, MENU.latte * 2 + MENU.espresso);
});

test('rejects unknown menu item', () => {
  assert.throws(
    () => calculateOrderTotal([{ name: 'americano', quantity: 1 }]),
    /Unknown menu item/
  );
});

test('places order and updates loyalty points', () => {
  const account = createLoyaltyAccount('Maya');
  account.points = 120;

  const receipt = placeOrder(
    {
      items: [{ name: 'cappuccino', quantity: 2 }],
      pointsToRedeem: 70,
    },
    account
  );

  assert.equal(receipt.subtotalCents, 900);
  assert.equal(receipt.discountCents, 70);
  assert.equal(receipt.totalCents, 830);
  assert.equal(receipt.pointsSpent, 70);
  assert.equal(receipt.pointsEarned, 8);
  assert.equal(receipt.account.points, 58);
  assert.equal(receipt.account.tier, 'Bronze');
});

test('caps redemption to subtotal and updates tier', () => {
  const account = createLoyaltyAccount('Rin');
  account.points = 650;

  const receipt = placeOrder(
    {
      items: [{ name: 'espresso', quantity: 1 }],
      pointsToRedeem: 999,
    },
    account
  );

  assert.equal(receipt.subtotalCents, 300);
  assert.equal(receipt.discountCents, 300);
  assert.equal(receipt.totalCents, 0);
  assert.equal(receipt.pointsSpent, 300);
  assert.equal(receipt.pointsEarned, 0);
  assert.equal(receipt.account.points, 350);
  assert.equal(receipt.account.tier, 'Silver');
});
