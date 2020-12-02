const fs = require('fs')
const path = require('path')
const arr1 = ['张晓光-PLDO201941060204M05775']
const arr2 = ['于思曼 科目二']
const arr3 = new Array();
console.log(arr1.length)
console.log(arr2.length)
for (const item of arr2) {
    arr1.forEach(element => {
        var newele = element.slice(22, 25)
        if (item.includes(newele)) {
            const strings = item + element
            arr3.push(strings)
            return arr3
        }
    });
}
fs.writeFile('./json.txt', arr3, function (err) {
    if (err) {
        throw err
    }
})