## Spec

### Bots

- User can add bots by clicking "+ Bot" Defaults to 0 bots
- When "- Bot" is clicked, the newest bot is removed; if the bot is cooking, then move order back to PENDING status & kill bot D:
- Bots have statuses Idle, Cooking
- Bots can only process one order at a time

### Order Queues

- PENDING
  - One sub-queue for VIP orders
  - One sub-queue for Normal orders
- COMPLETE

### Orders

- User can click "New Normal Order", the new order will be place at the back of the queue
- User can click "New VIP Order", the VIP order will be place in front of all the "Normal" orders but at the back of all the VIP Orders
- Orders require 10 seconds to complete

## Development

### Libraries used

- [Pinia](https://pinia.vuejs.org/)
  - Used to seperate data mutation to be in the stores themselves
  - Out of the box devtools support
- [TailwindCss](https://tailwindcss.com/)
  - Quick styling of components

### Setup

1. Run npm run dev
2. Go to htttp://localhost:**PORT_NUMBER**

### Usage

1. Cooking process will automatically be started
2. Add an order
3. Add a bot to start cooking
4. (Stop cooking) will stop bots from picking up orders. Pending bots however will finish up their orders if there's any orders in progress
