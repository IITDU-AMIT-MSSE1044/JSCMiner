var map= new Map();
map.set("misu1",4);
map.set("misu1",5);
map.set("misu2",3);
map.set("misu3",1);
map.set("misu4",2);
console.log("---"+map.size);
var sortable = [];
//console.log(map.get("misu1"));




map.forEach(function (value, key, mapObj) {
    sortable.push([key,value]);
});



sortable.sort(function(a, b) {
    return a[1] - b[1];
});
console.log(sortable);

var sortedMap=new Map();

sortable.forEach(function(element)
{
    sortedMap.set(element[0],element[1]);
});

console.log(sortedMap);
console.log(sortedMap.get("misu3"));

