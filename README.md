# Pixel BinaryPB Bulk Editor

An offline, browser-based editor for Pixel/Samsung `uecapconfig` `.binarypb` UE-capability profiles. It is a self-contained copy of [Pixel PB](https://nxij.github.io/pixel-pb/) with bulk row-selection tools.

## Run it offline

Keep these files together in one folder:

- `index.html`
- `protobuf.min.js`
- `jszip.min.js`

Open `index.html` in a modern desktop browser, then load a `.binarypb` using the file picker. No web server or internet connection is required.

## Editing rows

- Use the checkbox beside each combo to select it.
- **Select all filtered** selects every visible-filter result, including rows on other pages.
- **Copy selected** duplicates selected rows within the current profile.
- **Remove selected** deletes selected rows.
- **Remove all except selected** keeps only selected rows. This is destructive within the current editor session, so make a backup first.
- **Copy selected as text** and **Import combo text** transfer one or more selected rows between loaded profiles. The transfer includes NR feature definitions, so matching feature settings (such as QAM and MIMO capability) are reused or added to the target profile.

## Search

Search terms are joined with `+`.

- `n78` matches any n78 bandwidth class (`n78A`, `n78B`, `n78C`, and so on).
- `n78A` matches n78 class A only.
- `n78+n78` requires two distinct n78 component carriers.
- Tick **Exact combo only** to exclude rows that contain any additional component carriers. For example, `n78A+n78A` with this ticked matches exactly two n78A entries.

## Export

Use the filename field and either:

- `↓ .binarypb` to download the edited profile; or
- `↓ .zip` to create a Magisk module zip.

The output filename should match the profile the phone loads (for example, `VHA.binarypb`) when the goal is to replace that profile.

## Important notes

- Back up the original `.binarypb` before changing anything.
- This editor changes UE capability advertisements; it cannot add RF hardware support or make a network schedule an unsupported CA combination.
- Feature references and carrier-specific profile headers can matter. Test one small change at a time and keep a known-good recovery copy.
- This project is an independent offline wrapper/modification of Pixel PB. Refer to the upstream project for the underlying editor and format support.
