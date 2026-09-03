# Usage

## Load a profile

- Click **Choose file** and select a `.binarypb`.
- Or use **Load stock profile** to start from bundled templates (Wildcard/Telstra/Optus/VHA).

## Edit combos

In the combo table you can:

- Select rows with checkboxes
- **Select all filtered** to select every currently filtered match
- **Copy selected** to duplicate rows
- **Remove selected** to delete selected rows
- **Remove all except selected** to keep only selected rows
- Edit per-row fields (bands, order, features, group-level fields)

## Transfer combos between profiles

- **Copy selected as text** in source profile
- Open target profile
- **Import combo text** and paste exported text
- Import will reuse/add matching feature definitions where possible

## Output options

- **↓ .binarypb**: downloads edited profile directly
- **↓ .zip**: downloads a Magisk module zip overlay
- **Also override WILDCARD**: include overlay for `WILDCARD.binarypb` fallback

## Save behavior

The app runs fully in-browser (no server-side editing).  
Use exported files as your persistent output and keep backups of known-good profiles.

## Best practices

- Make one small change at a time
- Test after each change
- Keep stock backup and rollback path
- Be careful with destructive bulk actions
