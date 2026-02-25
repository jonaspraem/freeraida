# freeraida

### Development

#### Good to remember

- Don't import modules into modules that are lazy loaded

### AoT

The following are some things that will make AOT compile fail.

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use form.controls.controlName, use form.get(‘controlName’)
- Don’t use control.errors?.someError, use control.hasError(‘someError’)
- Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
- Inputs, Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public

### Angular Data Flow Guidelines

- Prefer `Observable` streams in components and bind with `| async` in templates.
- Avoid imperative `.subscribe()` in presentation components for render data.
- Compose dependent fetches with RxJS operators (`switchMap`, `combineLatest`, `map`, `filter`) instead of nested subscriptions.
- Keep manual change detection APIs (`detectChanges`, `markForCheck`, `NgZone.run`) as last-resort integrations, not default UI update flow.
- If a component needs imperative subscriptions for side effects (e.g. reactive form patching), scope them with teardown (`takeUntil`/destroy signal).

### Seed Alpine Test Routes

Use these commands to generate realistic test routes around the Alps from OpenStreetMap/Overpass.

- Dry-run (no writes, prints what would be created):
  - `npm run seed:alps-lines`
- Write to database (creates `official` profile if missing, inserts lines + locations):
  - `npm run seed:alps-lines:write`

Optional flags for the underlying script:

- `--limit=40` maximum lines to create (hard capped at 40)
- `--max-points=220` max coordinate points per route after simplification
- `--min-points=12` minimum points required for a route to be accepted

Direct script example:

- `node ./server/dist/scripts/seed-alps-lines.js --write --limit=40 --max-points=220 --min-points=12`
