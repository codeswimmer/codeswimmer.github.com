require.config({
  baseUrl: "."
});

require([
  'lib/preloadjs-0.3.1.min.js',
  'lib/easeljs-0.6.1.min.js',
  'lib/tweenjs-0.4.1.min.js',
  'lib/underscore-min.js',
  'lib/verdoux-predicates-0.1.0.js',
  'src/ui/container',
  'src/ui/shape',
  'src/ui/homescreen',
  'src/ui/foo',
  'src/hinto.js'],
  function() {}
);

HintoJS = {};
HintoJS.hinto = {};
