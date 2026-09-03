# FAQ

## Does this tool unlock unsupported hardware bands?

No. It cannot add RF/modem hardware capability.  
It only edits advertised UE capability profile data.

## Why use Magisk zip instead of writing directly to `/vendor`?

`/vendor` is typically read-only and direct edits are risky.  
Magisk overlays are safer, reversible, and easier to roll back.

## Which file should I edit/export?

Usually the active carrier profile loaded by your device (example: `VHA.binarypb`).  
When replacing a profile, output filename should match what the phone expects.

## What does “Also override WILDCARD” do?

It also overlays your edited profile as `WILDCARD.binarypb` (fallback profile), so edits still apply if the phone falls back to wildcard matching.

## Can I move combo rows between profiles?

Yes. Use:

1. **Copy selected as text** in source profile
2. **Import combo text** in destination profile

Matching feature definitions are reused/imported as needed.

## Why is mobile browser usage discouraged?

The editor is designed/tested primarily for desktop workflows and large tables; mobile UX is limited.

## How should I make safe changes?

- Back up stock profile first
- Change one thing at a time
- Test each iteration
- Keep a known-good rollback module
