import 'zone.js';

if (typeof process !== 'undefined' && process.env && process.env.ENV === 'production') {
  // Production
} else {
  // Development and test
  Error['stackTraceLimit'] = Infinity;
  import('zone.js/plugins/zone-error');
}
