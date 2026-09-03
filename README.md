# BinaryPB Band Editor

> Browser-based editor for Pixel/Samsung `.binarypb` UE-capability profiles, with bulk band-combination editing tools.

**Live editor:** [binarypb.jchin.au](https://binarypb.jchin.au)

A self-contained, browser-based editor for Pixel/Samsung `uecapconfig` `.binarypb` UE-capability profiles. It is based on [Pixel PB](https://nxij.github.io/pixel-pb/) and adds:

- Stock carrier profile templates (Wildcard, Telstra, Optus, VHA) to load as a starting point, no file needed.
- A boolean/wildcard band search syntax (AND, OR, NOT, XOR, wildcard, open-ended, and contains matching), plus a network-type (4G/5G) filter and an uplink-only search mode.
- Bulk row selection, copying, deletion, "remove all except selected", and bulk field editing across every selected combo at once.
- Transferable text exports for moving selected combo rows between profiles.
- Reuse/import of matching NR feature definitions when importing rows.
- Row coloring by radio type (LTE / NR sub-6 / NR mmWave) and an uplink-feature indicator, with a legend.
- An all-rows display option and first/last-page pagination for large profiles.
- A Magisk module export that can also overlay the edited profile onto `WILDCARD.binarypb` (the fallback profile), so it applies regardless of which profile the phone actually loads.
- An in-app Help panel covering every button and field.

## UE capabilities

**UE** means *User Equipment*: the phone or modem. A UE-capability profile tells the mobile network which bands, carrier-aggregation combinations, bandwidth classes, MIMO, and modulation-feature combinations the device advertises as supported.

Editing a profile can change that advertisement, allowing the network to consider a combination that was previously absent from the carrier profile. It does **not** add modem/RF hardware support, enable a band the network is not broadcasting, or force the network to schedule a combination.

## Run or host it

Deploy the repository as a static site (the live editor is deployed on Vercel), or open `index.html` locally. Keep these files together in the same directory:

- `index.html`
- `protobuf.min.js`
- `jszip.min.js`
- `templates/` (the stock carrier profile files, if you want the "Load stock profile" dropdown to work)

Open `index.html` in a modern desktop browser, then load a `.binarypb` using the file picker, or pick a stock profile from the dropdown. The editor has no server-side component; it runs entirely in the browser.

> **Note:** the "Load stock profile" dropdown fetches files from `templates/`, which requires the page to be served over `http(s)://`. Opening `index.html` directly as a local `file://` page (double-clicking it) will fail to load stock profiles due to browser CORS restrictions on `fetch()` — file loading via the file picker still works fine either way. To test stock profiles locally, serve the directory with something like `python3 -m http.server` and open `http://localhost:<port>`.

## Editing rows

- Use the checkbox beside each combo to select it.
- **Select all filtered** selects every visible-filter result, including rows on other pages.
- **Copy selected** duplicates selected rows within the current profile; the originals stay selected afterward.
- **Remove selected** deletes selected rows.
- **Remove all except selected** keeps only selected rows. This is destructive within the current editor session, so make a backup first.
- **Copy selected as text** and **Import combo text** transfer one or more selected rows between loaded profiles. The transfer includes NR feature definitions, so matching feature settings (such as QAM and MIMO capability) are reused or added to the target profile.
- **Bulk edit:** with more than one combo selected, editing a band, DL/UL feature, or group-level field (bcsNr, bcsIntraENDC, bcsEutra, powerClass, intraEndc) on any one of them replays the same edit on every other selected combo. Band add/remove/move/value changes and feature-dropdown edits apply by position (skipped on a selected combo that doesn't have that many component carriers); group-level fields apply to the group owning each selected combo. With only one combo selected, edits only affect that combo, as before.

## Search

The filter box accepts a small boolean expression language over band terms (e.g. `n78`, `1`, `7C`):

| Syntax | Meaning | Example |
| --- | --- | --- |
| `+` | AND — all terms must match distinct component carriers | `1+3+7C` |
| `\|` | OR — either side matches | `1\|3` |
| `!` | NOT — this band must not be present | `!n78` |
| `^` | XOR — exactly one side matches | `n78^n41` |
| `*` (standalone term) | Wildcard — exactly one other unspecified band | `n78+*` (n78 plus exactly one other CC) |
| `+` (trailing, nothing after) | Open-ended — at least one more unspecified band, no upper bound | `n78+` (n78 plus anything else); `n78+*+` (n78 plus at least two other bands) |
| `*` (trailing, attached to a term) | Contains — the term must match, with any other bands freely allowed | `n78*` (n78 alone or with anything else — shorthand for `n78\|n78+`) |

Notes:

- `n78` matches any n78 bandwidth class (`n78A`, `n78B`, `n78C`, and so on); `n78A` matches n78 class A only.
- `n78+n78` requires two distinct n78 component carriers.
- Matches are **exact** by default — a combo must consist of *exactly* the named bands, with no unmentioned extras — unless you use the wildcard, open-ended, or contains syntax above. These operators combine, e.g. `n78+n1*` requires both n78 and n1, with any other bands allowed.
- Tick **Search UL only** to require every matched band to actually have uplink features declared, not just be present for downlink.
- Tick **4G** / **5G** to restrict results by network type.

## Export

Use the filename field and either:

- `↓ .binarypb` to download the edited profile; or
- `↓ .zip` to create a Magisk module zip. Tick **Also override WILDCARD** to have the same zip also overlay the edited profile onto `WILDCARD.binarypb` (the catch-all fallback profile most Pixels load when no more specific carrier profile matches), so the change applies regardless of which profile the phone actually loads. The generated module is named "BinaryPB Band Editor" and its Magisk install log shows the profile name and combo count live during flashing.

The output filename should match the profile the phone loads (for example, `VHA.binarypb`) when the goal is to replace that profile.

## Rooted-phone workflow

The following examples use Android Platform Tools (`adb`) and a rooted phone with `su` available (for example, through Magisk). Replace `VHA.binarypb` with the profile your phone loads.

1. Confirm the phone is connected and inspect available profiles:

   ```sh
   adb devices
   adb shell su -c 'ls -l /vendor/firmware/uecapconfig'
   ```

2. Pull and back up the active profile. Using `exec-out` with `su` avoids file-permission issues:

   ```sh
   adb exec-out su -c 'cat /vendor/firmware/uecapconfig/VHA.binarypb' > VHA.stock.binarypb
   cp VHA.stock.binarypb VHA.binarypb
   ```

3. Load `VHA.binarypb` in the editor (or pick a stock profile from the dropdown as a starting point), make the change, and download the generated Magisk `.zip`.

4. Copy the zip to the phone and install it in the Magisk app, then reboot:

   ```sh
   adb push your-module.zip /sdcard/Download/
   ```

   In Magisk, choose **Modules → Install from storage**, select the uploaded zip, then reboot.

Do not directly overwrite `/vendor/firmware/uecapconfig/...`: the vendor partition is normally read-only and direct writes are unnecessarily risky. A Magisk module overlays the file and can be disabled or removed to return to stock behavior.

## Important notes

- Back up the original `.binarypb` before changing anything.
- This editor changes UE capability advertisements; it cannot add RF hardware support or make a network schedule an unsupported CA combination.
- Feature references and carrier-specific profile headers can matter. Test one small change at a time and keep a known-good recovery copy.
- The bundled stock profile templates (Wildcard, Telstra, Optus, VHA) were pulled from a Pixel 7 Pro in Australia in August 2026. They may not match your device, carrier, or region, and may be outdated — use them at your own risk, and test thoroughly before relying on a patched phone in an emergency.
- This editor has only been tested on desktop browsers; mobile is not recommended.
- This project is an independent wrapper/modification of Pixel PB. Refer to the upstream project for the underlying editor and format support.

## Contributing

Pull requests are welcome. Please keep changes focused and describe what you tested.

## Special thanks

Special thanks to [nxij](https://github.com/nxij), the original author of Pixel PB, for creating and open-sourcing the editor this project builds on.
