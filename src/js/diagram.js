"use strict";

const url = ("https://studenter.miun.se/~mallar/dt211g/");
window.onload = init();

async function init() {
    try {
        let coursesAndPrograms = [];
        //Fetch-anrop
        const response = await fetch(url);
        coursesAndPrograms = await response.json();

        //Filtrera ut alla kurser och program
        const onlyCourses = coursesAndPrograms.filter(course => course.type === "Kurs");
        const onlyPrograms = coursesAndPrograms.filter(program => program.type === "Program");

        //Sortera alla kurser och program efter antal sökande
        onlyCourses.sort((a, b) => (b.applicantsTotal - a.applicantsTotal));
        onlyPrograms.sort((a, b) => (b.applicantsTotal - a.applicantsTotal));

        //Spara de sex mest sökta kurserna och de fem mest sökta programmen
        const topCourses = onlyCourses.slice(0, 6);
        const topPrograms = onlyPrograms.slice(0, 5);

        //Spara de namnen på de sex mest sökta kurserna och de fem mest sökta programmen i en array
        const courseName = topCourses.map(course => {
            return course.name;
        });
        const programName = topPrograms.map(program => {
            return program.name;
        });

        //Spara antalet sökande till kurserna och programmen i en array
        const courseApplicants = topCourses.map(course => {
            return course.applicantsTotal;
        });
        const programApplicants = topPrograms.map(program => {
            return program.applicantsTotal;
        });

        //Stapeldiagram
        let xValues = courseName;
        let yValues = courseApplicants;
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
                legend: { display: false },
                title: {
                    display: true,
                    text: "De mest sökta kurserna på Mittuniversitetet"
                }
            }
        });

        //Cirkeldiagram
        let xValues2 = programName;
        let yValues2 = programApplicants;
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
                legend: { display: false },
                title: {
                    display: true,
                    text: "De mest sökta programmen på Mittuniversitetet"
                }
            }
        });

    } catch {
        document.getElementById("error").innerHTML = "<p>Något gick fel, prova igen senare.</p>"
    }
}