# Rooted Workflow

> Use this at your own risk. Always keep a recovery path.

## Prerequisites

- Rooted Android phone (`su` available, e.g. Magisk)
- Android Platform Tools (`adb`)
- Correct target profile name (example: `VHA.binarypb`)

## 1) Inspect available profiles

```sh
adb devices
adb shell su -c 'ls -l /vendor/firmware/uecapconfig'
```

## 2) Pull stock profile and back it up

Using `exec-out` + `su` avoids permission issues:

```sh
adb exec-out su -c 'cat /vendor/firmware/uecapconfig/VHA.binarypb' > VHA.stock.binarypb
cp VHA.stock.binarypb VHA.binarypb
```

## 3) Edit profile

- Load `VHA.binarypb` into BinaryPB Band Editor
- Make minimal change
- Export Magisk `.zip`

## 4) Install module

```sh
adb push your-module.zip /sdcard/Download/
```

In Magisk app:

- **Modules → Install from storage**
- Select uploaded zip
- Reboot

## 5) Validate and iterate

- Confirm expected network behavior
- If unstable, disable/remove module and reboot
- Apply changes incrementally rather than large edits

## Important

Avoid direct writes to `/vendor/firmware/uecapconfig`.  
Use Magisk overlay modules so changes are reversible.
