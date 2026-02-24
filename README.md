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
