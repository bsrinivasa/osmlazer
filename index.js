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
     if (tags.hasOwnProperty('building')) {
        if (!(team.indexOf(data.user) < 0 )) {
           bl_mapboxCount = bl_mapboxCount + 1;
       } else {
        bl_otherCount = bl_otherCount + 1;
       }
   }
     if (tags.hasOwnProperty('noref') && tags.noref === 'yes') {
        if (!(team.indexOf(data.user) < 0 )) {
           nref_mapboxCount = nref_mapboxCount + 1;
       } else {
        nref_otherCount = nref_otherCount + 1;
       }
   }
     if (tags.hasOwnProperty('ref')) {
        if (!(team.indexOf(data.user) < 0 )) {
           ref_mapboxCount = ref_mapboxCount + 1;
       } else {
        ref_otherCount = ref_otherCount + 1;
       }
   }
     if (tags.hasOwnProperty('destination')) {
        if (!(team.indexOf(data.user) < 0 )) {
           des_mapboxCount = des_mapboxCount + 1;
       } else {
        des_otherCount = des_otherCount + 1;
       }
   }
});

stream.on('end', function() {
    process.stderr.write('TR by Mapbox: ' + String(tr_mapboxCount) + '\n');
    process.stderr.write('TR by Others: ' + String(tr_otherCount) + '\n');
    process.stderr.write('TL by Mapbox: ' + String(tl_mapboxCount) + '\n');
    process.stderr.write('TL by Others: ' + String(tl_otherCount) + '\n');
    process.stderr.write('Buildings by Mapbox: ' + String(bl_mapboxCount) + '\n');
    process.stderr.write('Buildings by Others: ' + String(bl_otherCount) + '\n');
    process.stderr.write('NoRef by Mapbox: ' + String(nref_mapboxCount) + '\n');
    process.stderr.write('NoRef by Others: ' + String(nref_otherCount) + '\n');
    process.stderr.write('Ref by Mapbox: ' + String(ref_mapboxCount) + '\n');
    process.stderr.write('Ref by Others: ' + String(ref_otherCount) + '\n');
    process.stderr.write('Destination by Mapbox: ' + String(des_mapboxCount) + '\n');
    process.stderr.write('Destination by Others: ' + String(des_otherCount) + '\n');
});
