# Search Syntax

The filter supports logical expressions over band terms.

## Operators

- `+` = AND  
  Example: `1+3`
- `|` = OR  
  Example: `1|3`
- `!` = NOT  
  Example: `!n78`
- `^` = XOR (exactly one side true)  
  Example: `n78^n41`

You can combine expressions, e.g.:
`1+3+7C | !n78`

## Band terms

- `n78` matches any class of band n78 (`n78A`, `n78B`, etc.)
- `n78A` matches class-specific term only
- Repeated terms are supported:
  - `n78+n78` requires two distinct n78 component carriers

## Wildcards and open-ended matching

- Trailing `*` on a term = contains-term mode  
  Example: `n78*` (n78 alone or with other carriers)
- Standalone `*` term = one unspecified carrier slot  
  Example: `n78+*` (n78 + exactly one other)
- Trailing `+` with nothing after it = “and at least one more”  
  Example: `n78+`

## UL-only matching

Enable **Search UL only** to require each band term to match a component carrier that has uplink features declared (not DL-only presence).

## Notes

- Exact/restrictive behavior depends on the expression used
- If results look off, simplify to a smaller query and build up incrementally
