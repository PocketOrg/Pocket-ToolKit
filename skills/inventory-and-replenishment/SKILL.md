---
name: inventory-and-replenishment
description: >-
  Holds enough stock to sell and not so much that it ties up cash. Use when setting reorder points, a line keeps selling out, or stock is aging.
---
# Inventory and Replenishment

## Two failures, and they are not symmetrical

A stockout loses a sale and sometimes a customer. Excess stock ties up cash and eventually gets discounted. Which is worse depends entirely on the item: for a staple, stockout is far more expensive; for a seasonal or perishable line, excess is.

Say which failure you are optimising against before choosing a service level. A blanket 95% across the whole catalogue is a decision nobody made.

## Reorder point is lead time times demand, plus the safety buffer

The buffer covers *variability*, not the average — and variability in lead time usually hurts more than variability in demand, because it is outside your control and lumpy.

Measure actual supplier lead times rather than quoted ones. The gap is often large and is where most stockouts originate.

## Forecast at the level the decision is made

Forecasting a category then splitting it by last year's mix produces confident nonsense at the SKU level, which is where the purchase order gets written. Forecast where you order.

Keep the forecast error by SKU. A line you consistently under-forecast needs a bigger buffer, not more meetings.

## Aging stock is a decision being avoided

Stock that has not moved in two cycles will not start. The value is highest today and falls from here, so the choice is between acting now at a known discount or later at a worse one.

Age the inventory visibly and set a rule — mark down, bundle, return or write off at a defined point — so the decision happens on schedule rather than when someone notices.

## Watch out for

- Counted stock diverging from system stock, which invalidates every calculation above it.
- Minimum order quantities silently setting your stock level instead of the demand doing it.
- Promotions run without adjusting the replenishment, causing a stockout mid-campaign.
- One supplier for a critical line, with no qualified alternative.
- Safety stock raised after every stockout and never lowered.

## Finishing

Service levels differ by item type with a stated reason. Reorder points use measured lead times. Forecasts exist at ordering level with tracked error. Aging stock has a defined action point.
