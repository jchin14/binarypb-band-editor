# BinaryPB Band Editor

> Browser-based editor for Pixel/Samsung `.binarypb` UE-capability profiles, with bulk band-combination editing tools.

**Live editor:** [binarypb.jchin.au](https://binarypb.jchin.au)

A self-contained, browser-based editor for Pixel/Samsung `uecapconfig` `.binarypb` UE-capability profiles. It is based on [Pixel PB](https://nxij.github.io/pixel-pb/) and adds:

- Bulk row selection, copying, deletion, and “remove all except selected”.
- Transferable text exports for moving selected combo rows between profiles.
- Reuse/import of matching NR feature definitions when importing rows.
- Exact-combo search, including searches for repeated bands such as `n78+n78`.
- An all-rows display option for large profiles.

## UE capabilities

**UE** means *User Equipment*: the phone or modem. A UE-capability profile tells the mobile network which bands, carrier-aggregation combinations, bandwidth classes, MIMO, and modulation-feature combinations the device advertises as supported.

Editing a profile can change that advertisement, allowing the network to consider a combination that was previously absent from the carrier profile. It does **not** add modem/RF hardware support, enable a band the network is not broadcasting, or force the network to schedule a combination.

## Run or host it

Deploy the repository as a static site, or open `index.html` locally. Keep these files together in the same directory:

- `index.html`
- `protobuf.min.js`
- `jszip.min.js`

Open `index.html` in a modern desktop browser, then load a `.binarypb` using the file picker. The editor has no server-side component; it runs entirely in the browser.

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

3. Load `VHA.binarypb` in the editor, make the change, and download the generated Magisk `.zip`.

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
- This project is an independent wrapper/modification of Pixel PB. Refer to the upstream project for the underlying editor and format support.

## Contributing

Pull requests are welcome. Please keep changes focused, describe what you tested, and avoid committing private carrier profiles or device identifiers.

## Special thanks

Special thanks to [nxij](https://github.com/nxij), the original author of Pixel PB, for creating and open-sourcing the editor this project builds on.
