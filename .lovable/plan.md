# Android assets and responsive layout update

## What will change
- Rebuild the official launcher icon with a transparent 22% safe zone, then regenerate every Android density and adaptive-icon resource at native sizes.
- Rebuild the Android splash artwork on a solid white canvas with the centered mark occupying about 18%, and configure Android 12+ launch styling to prevent stretching.
- Add a repeatable native-assets generation command and synchronize Capacitor's Android project.
- Apply top and bottom safe-area spacing globally so status bars and gesture navigation never cover controls.
- Keep the current mobile visual identity, while introducing centered desktop containers and wider responsive grids instead of stretching phone layouts.
- Improve touch targets, scrolling behavior, selectable form/content text, and viewport stability across mobile browsers and the APK.
- Verify the main screens at mobile and desktop sizes, check current diagnostics, and confirm the Android project builds cleanly.

## Technical details
- Preserve the existing package ID and current internal navigation/data behavior.
- Use the official `daleel-logo-new.png` as the single source for generated native resources.
- Update Android resource XML/themes for the platform splash API and keep generated raster files optimized.
- No database or feature-content changes are included.

## Delivery note
- All repository files will be updated. Lovable manages repository history, so I cannot create a Git commit directly; the changes will be ready for your connected repository.
