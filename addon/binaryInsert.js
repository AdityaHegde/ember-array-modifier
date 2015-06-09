function cmp(a, b) {
  return a - b;
}
function binarySearch(a, e, l, h, c) {
  var i = Math.floor((h + l) / 2), o = a.objectAt(i);
  if (l > h) {
    return l;
  }
  if (c(e, o) >= 0) {
    return binarySearch(a, e, i + 1, h, c);
  }
  else {
    return binarySearch(a, e, l, i - 1, c);
  }
}
export default function binaryInsert(a, e, c) {
  c = c || cmp;
  var len = a.get("length");
  if (len > 0) {
    var i = binarySearch(a, e, 0, len - 1, c);
    a.insertAt(i, e);
  }
  else {
    a.pushObject(e);
  }
}
