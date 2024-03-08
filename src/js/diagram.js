//Stapeldiagram
let xValues = ["Kurs1", "Kurs2", "Kurs3", "Kurs4", "Kurs5", "Kurs6"];
let yValues = [10, 10, 10, 10, 10, 10];
let barColors = ["red", "green", "blue", "orange", "brown"];

new Chart("barChart", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        legend: {display: false},
        title: {
            display: true,
            text: "De mest sökta kurserna på Mittuniversitetet"
        }
    }
});

//Cirkeldiagram
let xValues2 = ["Program1", "Program2", "Program3", "Program4", "Program5"];
let yValues2 = [10, 10, 10, 10, 10];
let barColors2 = ["red", "green", "blue", "orange", "brown"];

new Chart("pieChart", {
    type: "pie",
    data: {
        labels: xValues2,
        datasets: [{
            backgroundColor: barColors2,
            data: yValues2
        }]
    },
    options: {
        legend: {display: false},
        title: {
            display: true,
            text: "De mest sökta programmen på Mittuniversitetet"
        }
    }
});