var osmium = require('osmium');
var argv = require('minimist')(process.argv.slice(2));
var ff = require('feature-filter');
var fs = require('fs');
var team = require('mapbox-data-team').getUsernames();

var file = new osmium.File(argv.file);
var reader = new osmium.Reader(file);
var stream = new osmium.Stream(new osmium.Reader(file, {relation: true, node: true, ways: true}));

var tr_mapboxCount = 0;
var tr_otherCount = 0;
var bl_mapboxCount = 0;
var bl_otherCount = 0;
var ref_mapboxCount = 0;
var ref_otherCount = 0;
var nref_mapboxCount = 0;
var nref_otherCount = 0;  
var des_mapboxCount = 0;
var des_otherCount = 0;
var tl_mapboxCount = 0;
var tl_otherCount = 0;



stream.on('data', function (data) {
    var f;
    var tags = data.tags();
    if (tags.hasOwnProperty('type') && tags.type === 'restriction') {
        if (!(team.indexOf(data.user) < 0 )) {
           tr_mapboxCount = tr_mapboxCount + 1;
       } else {
        tr_otherCount = tr_otherCount + 1;
       }
   }
   if (tags.hasOwnProperty('turn:lanes')) {
        if (!(team.indexOf(data.user) < 0 )) {
           tl_mapboxCount = tl_mapboxCount + 1;
       } else {
        tl_otherCount = tl_otherCount + 1;
       }
   }
});

stream.on('end', function() {
    process.stderr.write('TR by Mapbox: ' + String(tr_mapboxCount) + '\n');
    process.stderr.write('TR by Others: ' + String(tr_otherCount) + '\n');
    process.stderr.write('TL by Mapbox: ' + String(tl_mapboxCount) + '\n');
    process.stderr.write('TL by Others: ' + String(tl_otherCount) + '\n');
});
