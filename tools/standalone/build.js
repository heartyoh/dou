var builder = require('loadbuilder'),
    uglify  = require('uglify-js'),
    version = require('../../package.json').version,
    path    = require('path'),
    fs      = require('fs');

var rootPath           = path.join(__dirname, '..', '..'),
    shimPath           = path.join(__dirname, 'amd-shim.js'),
    bannerPath         = path.join(__dirname, 'banner.txt'),
    buildDir           = path.join(__dirname, '..', '..'),
    douPath         = path.join(buildDir, 'dou.js'),
    douPathMin      = path.join(buildDir, 'dou-min.js'),
    modulePlaceholder  = '{{ module }}',
    versionPlaceholder = '{{ version }}';

var douSource = builder({
  docRoot: rootPath,
  path: '.'
}).include('build/js/dou').toSource();

var amdShim = fs.readFileSync(shimPath, 'utf8');
var banner = fs.readFileSync(bannerPath, 'utf8').split(versionPlaceholder).join(version);
var bundle = amdShim.split(modulePlaceholder).join(douSource);
var bundleMin = uglify.minify(bundle, {fromString: true}).code;

// prepend the version / licence banner to the files
bundle = [banner, bundle].join('');
bundleMin = [banner, bundleMin].join('');

fs.writeFileSync(douPath, bundle, 'utf8');
fs.writeFileSync(douPathMin, bundleMin, 'utf8');