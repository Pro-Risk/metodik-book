        const correctAnswers = ["b", "b", "b", "b", "c", "a", "c", "b", "b", "c"];

    document.getElementById("test-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let correctCount = 0;
    let totalQuestions = correctAnswers.length;
    const studentName = document.getElementById("student-name").value;

    for (let i = 1; i <= totalQuestions; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        const questionInputs = document.querySelectorAll(`input[name="q${i}"]`);
        
        // Очищаем предыдущую подсветку
        questionInputs.forEach(input => {
            input.parentElement.classList.remove("correct-answer", "incorrect-answer");
        });

        questionInputs.forEach(input => {
            if (input.value === correctAnswers[i - 1]) {
                input.parentElement.classList.add("correct-answer");
            }
        });

        if (selectedAnswer) {
            if (selectedAnswer.value === correctAnswers[i - 1]) {
                correctCount++;
            } else {
                selectedAnswer.parentElement.classList.add("incorrect-answer");
            }
        }
    }

    const incorrectCount = totalQuestions - correctCount;
    document.getElementById("result-text").textContent = `ФИО: ${studentName}. Верные ответы: ${correctCount}. Неверные ответы: ${incorrectCount}.`;
    document.getElementById("result-modal").style.display = "flex";
    const resultsText = `ФИО: ${studentName}\nВерные ответы: ${correctCount}\nНеверные ответы: ${incorrectCount}`;
    downloadResults({ correctCount, incorrectCount }, studentName);
});

    function closeModal() {
    document.getElementById("result-modal").style.display = "none";
    }

    // Привязываем функцию к кнопке "Закрыть"
    document.querySelector(".close-btn").addEventListener("click", closeModal);

    
    

        function downloadResults(results, studentName) {
            const docDefinition = {
                content: [
                    { text: `ФИО: ${studentName}`, style: 'header' },
                    { text: `Верные ответы: ${results.correctCount}`, margin: [0, 10, 0, 5] },
                    { text: `Неверные ответы: ${results.incorrectCount}`, margin: [0, 5, 0, 5] }
                ],
                defaultStyle: {
                    font: 'Roboto'
                }
            };

            // Создаём и загружаем PDF
            pdfMake.createPdf(docDefinition).download(`${studentName}_results.pdf`);
        }


