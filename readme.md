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
