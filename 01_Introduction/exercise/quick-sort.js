var quickSort = function (arr) {
    var partition = function (leftIndex, rightIndex) {
        var pivot = arr[leftIndex];

        var tempLeft = leftIndex;
        var tempRight = rightIndex;

        while (true) {
            // Move Left
            while (arr[tempLeft] < pivot) { 
                tempLeft += 1; 
            }
            
            // Move Right
            while (arr[tempRight] > pivot) { 
                tempRight -= 1; 
            }

            // Return if all is well
            if (tempLeft >= tempRight) { 
                return tempRight; 
            }

            // swap if not
            [arr[tempLeft], arr[tempRight]] = [arr[tempRight], arr[tempLeft]];
        }
    }

    var sort = function (leftIndex, rightIndex) {
        if (leftIndex >= rightIndex) { 
            return; 
        }
        
        var pivotIndex = partition(leftIndex, rightIndex);
        sort(leftIndex, pivotIndex); // sort left
        sort(pivotIndex + 1, rightIndex); // sort right
    }

    sort(0, arr.length - 1);
    return arr;
}

var res = quickSort([4, 6, 1, 5, 2, 3, 8, 7, 9])
console.log(res);