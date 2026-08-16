---
name: web-scraping
description: >-
  Extracts data from websites reliably and responsibly. Use when building a scraper, fixing one that broke, or deciding whether scraping is the right approach.
---
# Web Scraping

## Look for the API first

Many sites have a JSON endpoint behind the page, a documented API, or a bulk download. Any of them is more stable and cheaper than parsing HTML.

Open the network tab before writing a parser. The page is frequently rendering data from a call you could make directly.

## Check what you are permitted to do

Read the terms of service and `robots.txt` before building. They are not merely technical hints — ignoring them creates legal exposure and gets you blocked.

Personal data carries obligations regardless of whether it was publicly visible. Copyright applies to scraped content.

## Be a good client

Identify yourself in the user agent with a way to be contacted. Rate limit well below what the server can handle, and back off on 429 and 5xx.

Scraping at a volume that degrades the site for its users is the behaviour that causes blanket blocks for everyone.

## Select on structure, not styling

Class names change with every redesign. Prefer stable attributes — `data-` hooks, ids, or the document structure — over generated CSS classes.

Anchor to a nearby label where possible: the cell after the one containing "Price" survives a restyle that `.pc-4a2f` does not.

## Expect it to break, and detect it

Sites change without notice. Validate what you extracted — expected field count, plausible types, non-empty results — and fail loudly rather than storing empty strings.

A scraper that silently returns nothing looks identical to a site with no data.

## Watch out for

- Parsing rendered HTML when the content is loaded by script; either drive a browser or call the underlying endpoint.
- Ignoring pagination and assuming the first page is everything.
- Storing raw HTML forever, which is usually both unnecessary and legally awkward.
- Hammering a site from CI on every commit.
- Sessions and cookies that expire, producing a login page parsed as data.

## Finishing

Permission was checked. Requests are rate limited and identifiable. Selectors are structural. Output is validated and failures are loud.

