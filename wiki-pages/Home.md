# BinaryPB Band Editor

Browser-based editor for Pixel/Samsung `.binarypb` UE-capability profiles, with bulk band-combination editing tools.

- **Live editor:** https://binarypb.jchin.au  
- **Source repo:** https://github.com/jchin14/binarypb-band-editor

## What this project does

BinaryPB Band Editor lets you:

- Load a `.binarypb` profile in your browser
- Edit carrier-aggregation combo rows and feature mappings
- Bulk-select, copy, delete, and keep-only selected rows
- Transfer combo rows between profiles via portable text
- Export as raw `.binarypb` or Magisk module `.zip`

## What this project does *not* do

- It does **not** add new RF/modem hardware support
- It does **not** force network scheduling behavior
- It does **not** enable bands your carrier is not broadcasting

It only changes the UE capability profile advertisement.

## Quick start

1. Open the live editor
2. Load a `.binarypb` file
3. Edit combos/features
4. Export:
   - `↓ .binarypb` for raw output
   - `↓ .zip` for Magisk overlay install

## Pages

- [[Usage]]
- [[Search Syntax]]
- [[Rooted Workflow]]
- [[FAQ]]

## Credits

This project is based on Pixel PB by [nxij](https://github.com/nxij).  
Upstream: https://nxij.github.io/pixel-pb/
