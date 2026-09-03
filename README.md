# BinaryPB Band Editor

> Browser-based editor for Pixel/Samsung `.binarypb` UE-capability profiles, with bulk band-combination editing tools.

**Live editor:** [binarypb.jchin.au](https://binarypb.jchin.au)

**Wiki:** [Home](https://github.com/jchin14/binarypb-band-editor/wiki) · [Usage](https://github.com/jchin14/binarypb-band-editor/wiki/Usage) · [Search Syntax](https://github.com/jchin14/binarypb-band-editor/wiki/Search-Syntax) · [Rooted Workflow](https://github.com/jchin14/binarypb-band-editor/wiki/Rooted-Workflow) · [FAQ](https://github.com/jchin14/binarypb-band-editor/wiki/FAQ)

A self-contained, browser-based editor for Pixel/Samsung `uecapconfig` `.binarypb` UE-capability profiles. It is based on [Pixel PB](https://nxij.github.io/pixel-pb/) and adds stock carrier profile templates, bulk row/field editing, a boolean/wildcard search syntax, combo-text transfer between profiles, and a Magisk module export with an optional `WILDCARD.binarypb` overlay. See the [wiki](https://github.com/jchin14/binarypb-band-editor/wiki) for the full feature rundown, usage guide, and search syntax reference — or use the in-app **Help** button, which covers every button and field.

## Disclaimer

This tool has been tested on Pixel phones and should work on any phone using a Samsung (Shannon) modem, but this is **not guaranteed**. Test that everything works correctly before relying on a patched phone in an emergency. The author is not liable for any issues to your phone.

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

For how to use the editor day-to-day — selecting/editing/bulk-editing rows, the search syntax, exporting, and the rooted-phone install workflow — see the [wiki](https://github.com/jchin14/binarypb-band-editor/wiki).

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
