let randomize_button = document.getElementById("randomize-button");
let sort_button = document.getElementById("sort-button");
let bars_container = document.getElementById("bars-container");
let algorithm_select = document.getElementById("algorithm-select");
let minRange = 1;
let maxRange = 100;
let barsCount = 160;
let heightFactor = 6.5;
let unsorted_array = new Array(barsCount);
let algorithm = "bubble-sort";

algorithm_select.addEventListener("change", function () {
    algorithm = algorithm_select.value;
    console.log(algorithm);
});

function createRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
    let array = new Array(barsCount);
    for (let i = 0; i < barsCount; i++) {
        array[i] = createRandomNumber(minRange, maxRange);
    }
    return array;
}

document.addEventListener("DOMContentLoaded", function () { // when HTML document is completely loaded
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array) {
    for (let i = 0; i < barsCount; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * heightFactor + "px";
        bars_container.appendChild(bar);
    }
}

randomize_button.addEventListener("click", function () {
    unsorted_array = createRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout (resolve, ms));
}

async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "rgb(34, 177, 193)";
                    }
                }
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                bars[j].style.height = array[j] * heightFactor + "px";
                bars[j].style.backgroundColor = "lightpink";
                bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
                bars[j + 1].style.backgroundColor = "lightpink";
                await sleep(15);
        }
      }
      await sleep(15);
    }
    for (let t = 0; t < array.length; t++) {
        bars[t].style.backgroundColor = "rgb(34, 177, 193)";
    }
    return array;
}

async function selectionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
            for (let k = 0; k < bars.length; k++) {
                if (k !== j && k !== j + 1) {
                    bars[k].style.backgroundColor = "rgb(34, 177, 193)";
                }
            }
        }
        if (min != i) {
            let temp = array[i];
            array[i] = array[min];
            array[min] = temp;
            bars[i].style.height = array[i] * heightFactor + "px";
            bars[i].style.backgroundColor = "lightpink";
            bars[min].style.height = array[min] * heightFactor + "px";
            bars[min].style.backgroundColor = "lightpink";
            await sleep(15);
        }
        await sleep(15);
    }
    for (let t = 0; t < array.length; t++) {
        bars[t].style.backgroundColor = "rgb(34, 177, 193)";
    }
    return array;
}

async function insertionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
        let current = array[i];
        let j;
        for (j = i - 1; j > -1 && array[j] > current; j--) {
            array[j + 1] = array[j];
            for (let k = 0; k < bars.length; k++) {
                bars[k].style.backgroundColor = "rgb(34, 177, 193)";
                bars[k].style.height = array[k] * heightFactor + "px";
            }
        }
        array[j + 1] = current;
        bars[j + 1].style.backgroundColor = "lightpink";
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[current].style.backgroundColor = "lightpink";
        bars[current].style.height = array[current] * heightFactor + "px";
        await sleep(15);
    }
    for (let t = 0; t < array.length; t++) {
        bars[t].style.backgroundColor = "rgb(34, 177, 193)";
    }
    return array;
}

async function swap1(array, i, j, bars) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    bars[i].style.height = array[i] * heightFactor + "px";
    bars[j].style.height = array[j] * heightFactor + "px";
    bars[i].style.backgroundColor = "lightpink";
    bars[j].style.backgroundColor = "lightpink";
    await sleep(15);
    for (let k = 0; k < bars.length; k++) {
        if (k != i && k != j) {
            bars[k].style.backgroundColor = "rgb(34, 177, 193)";
        }
    }
    return array;
}

async function heapSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
        await heapify(array, array.length, i);
    }
    for (let i = array.length - 1; i >= 0; i--) {
        await swap1(array, 0, i, bars);
        await heapify(array, i, 0);
    }
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "lightpink";
        await sleep(15);
    }
    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = "rgb(34, 177, 193)";
    }
    return array;
}

async function heapify(array, n, i) {
    let bars = document.getElementsByClassName("bar");
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }
    if (largest != i) {
        await swap1(array, i, largest, bars);
        await heapify(array, n, largest);
    }
}

async function swap2(items, leftIndex, rightIndex, bars) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
    bars[leftIndex].style.backgroundColor = "lightpink";
    bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
    bars[rightIndex].style.backgroundColor = "lightpink";
    await sleep(15);
}

async function partition(items, left, right) {
    let bars = document.getElementsByClassName("bar");
    let pivotIndex = Math.floor((right + left) / 2);
    var pivot = items[pivotIndex];
    bars[pivotIndex].style.backgroundColor = "lightpink";
    for (let i = 0; i < bars.length; i++) {
        if (i != pivotIndex) {
            bars[i].style.backgroundColor = "rgb(34, 177, 193)";
        }
    }
    (i = left), 
    (j = right); 
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            await swap2(items, i, j, bars); 
            i++;
            j--;
        }
    }
    return i;
}
  
async function quickSort(items, left, right) {
    var index;
    let bars = document.getElementsByClassName("bar");
    if (items.length > 1) {
        index = await partition(items, left, right); 
    }
    if (left < index - 1) {
        await quickSort(items, left, index - 1);
    }
    if (index < right) {
        await quickSort(items, index, right);
    }
    for (let i = 0; i < right + 1; i++) {
        bars[i].style.backgroundColor = "rgb(34, 177, 193)";
    }
}
 
sort_button.addEventListener("click", function () {
    switch (algorithm) {
        case "bubble-sort":
            bubbleSort(unsorted_array);
            break;
        case "selection-sort":
            selectionSort(unsorted_array);
            break;
        case "insertion-sort": 
            insertionSort(unsorted_array);
            break;
        case "heap-sort":
            heapSort(unsorted_array);
            break;
        case "quick-sort":
            quickSort(unsorted_array, 0, unsorted_array.length - 1);
            break;
    }
});