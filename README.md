# Blockplan — ATM10: To the Sky

A local 2D planner for arranging a modular Minecraft Skyblock base. Layout coordinates and dimensions are integer Minecraft blocks; zoom changes only the canvas view. Projects save automatically in this browser and can be exported as versioned JSON.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`; `npm run preview` serves that build locally.

## Use

- Drag the empty canvas to pan; use the mouse wheel or zoom controls to zoom.
- Select a draw tool, then drag on the grid to create a platform, module, or pathway. One grid unit is one block.
- Select objects to edit exact X/Z coordinates, dimensions, labels, colors, category, notes, and lock state in the right panel. Shift-click for multi-selection; use Group/Ungroup in the top bar.
- Modules drawn inside platforms are associated with their parent and move with it. Platforms with overlapping footprints and modules that extend beyond their parent or overlap are marked for review.
- Grid visibility, chunk lines, and snap interval can be changed above the canvas. JSON import/export and PNG export are in the top bar.
- Ctrl/Cmd+Z and Ctrl/Cmd+Y undo and redo; Ctrl/Cmd+D duplicates; Delete removes selection; Escape cancels the current tool/selection.

The included example layout is editable. Local persistence uses browser `localStorage`; export JSON periodically to keep a portable backup or move a project to another browser.

## Project format and scope

Exported files use a version 1 JSON format. Imported coordinates and dimensions are validated as positive-sized integer-block rectangles. This is a planning canvas only: it does not connect to Minecraft, generate schematics, calculate recipes/materials, or store data on a server. Projects are saved in the current browser profile, not synced between devices.

## Checks

```sh
npm test
npm run build
```
