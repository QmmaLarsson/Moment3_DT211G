"use strict";

import Chart from 'chart.js/auto';
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
        let courseName = topCourses.map(course => {
            return course.name.split(' ');
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
        let barColors = ["red", "purple", "blue", "pink", "yellow", "green"];

        new Chart("barChart", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    label: "Antal sökande",
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: (context) => {
                                return (context[0].label.replaceAll(",", " "));
                            },
                        },
                    },
                },
            },
        });


        //Cirkeldiagram
        let xValues2 = programName;
        let yValues2 = programApplicants;
        let barColors2 = ["red", "purple", "blue", "pink", "yellow"];

        new Chart("pieChart", {
            type: "pie",
            data: {
                labels: xValues2,
                datasets: [
                    {
                        label: "Antal sökande",
                        data: yValues2,
                        backgroundColor: barColors2
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "left",
                    }
                }

            }
        });

    } catch {
        document.getElementById("error").innerHTML = "<p>Något gick fel, prova igen senare.</p>"
    }
}