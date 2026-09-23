document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz');
    const submitButton = document.getElementById('submit');
    const resultContainer = document.getElementById('result');
    const restartButton = document.getElementById('restart');
    
    const questions = [
        {
            question: "In quale anno avvenne l'incidente del passo Djatlov?",
            options: ["1957", "1959", "1961", "1963"],
            answer: 1,
            explanation: "L'incidente avvenne nella notte tra il 1° e il 2 febbraio 1959."
        },
        {
            question: "Come si chiamava la montagna dove avvenne l'incidente?",
            options: ["Monte Elbrus", "Kholat Syakhl", "Monte Belukha", "Monte Narodnaya"],
            answer: 1,
            explanation: "Kholat Syakhl in lingua Mansi significa 'Montagna dei Morti'."
        },
        {
            question: "Cosa trovarono di anomalo nella tenda?",
            options: [
                "Era stata tagliata dall'interno",
                "Conteneva strani simboli",
                "Era completamente bruciata",
                "Era piena di soldi"
            ],
            answer: 0,
            explanation: "La tenda era stata tagliata dall'interno, come se gli escursionisti fossero fuggiti in fretta."
        },
        {
            question: "Quale di queste teorie NON è stata proposta?",
            options: [
                "Attacco di Yeti",
                "Esperimento militare segreto",
                "Valanga infrasonica",
                "Eruzione vulcanica"
            ],
            answer: 3,
            explanation: "Nella zona non ci sono vulcani attivi, rendendo impossibile questa teoria."
        },
        {
            question: "Cosa mostravano le ultime fotografie trovate?",
            options: [
                "Paesaggi innevati",
                "Strani oggetti luminosi nel cielo",
                "I membri della squadra che costruivano un rifugio",
                "Animali sconosciuti"
            ],
            answer: 2,
            explanation: "Le ultime foto mostravano i membri che costruivano un rifugio nella neve."
        }
    ];
    
    let selectedOptions = [];
    
    function buildQuiz() {
        quizContainer.innerHTML = '';
        selectedOptions = [];
        
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.style.marginBottom = '25px';
            questionDiv.style.padding = '20px';
            questionDiv.style.backgroundColor = 'rgba(44, 44, 44, 0.7)';
            questionDiv.style.borderRadius = '10px';
            questionDiv.style.borderLeft = '4px solid #C9A227';
            questionDiv.style.color = '#F5E1C0';
            
            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.style.fontSize = '22px';
            questionText.style.marginBottom = '15px';
            questionText.textContent = `${index + 1}. ${q.question}`;
            questionDiv.appendChild(questionText);
            
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'options';
            optionsDiv.style.display = 'grid';
            optionsDiv.style.gap = '10px';
            
            q.options.forEach((option, i) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                optionDiv.style.padding = '12px 20px';
                optionDiv.style.backgroundColor = 'rgba(68, 68, 68, 0.7)';
                optionDiv.style.borderRadius = '8px';
                optionDiv.style.cursor = 'pointer';
                optionDiv.style.transition = 'all 0.3s ease';
                optionDiv.style.fontSize = '18px';
                optionDiv.style.border = '1px solid transparent';
                optionDiv.textContent = option;
                optionDiv.dataset.index = i;
                
                optionDiv.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = 'rgba(201, 162, 39, 0.3)';
                    this.style.borderColor = '#C9A227';
                });
                
                optionDiv.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('selected')) {
                        this.style.backgroundColor = 'rgba(68, 68, 68, 0.7)';
                        this.style.borderColor = 'transparent';
                    }
                });
                
                optionDiv.addEventListener('click', function() {
                    selectOption(this, index);
                });
                
                optionsDiv.appendChild(optionDiv);
            });
            
            questionDiv.appendChild(optionsDiv);
            quizContainer.appendChild(questionDiv);
        });
    }
    
    function selectOption(optionElement, questionIndex) {
        const questionDiv = optionElement.parentElement.parentElement;
        const options = questionDiv.querySelectorAll('.option');
        
        options.forEach(opt => {
            opt.classList.remove('selected');
            opt.style.backgroundColor = 'rgba(68, 68, 68, 0.7)';
            opt.style.borderColor = 'transparent';
        });
        
        optionElement.classList.add('selected');
        optionElement.style.backgroundColor = 'rgba(201, 162, 39, 0.5)';
        optionElement.style.borderLeft = '3px solid #F5E1C0';
        selectedOptions[questionIndex] = parseInt(optionElement.dataset.index);
    }
    
    function showResults() {
        let correctAnswers = 0;
        let resultsHTML = '';
        
        questions.forEach((q, index) => {
            const questionDiv = quizContainer.children[index];
            const options = questionDiv.querySelectorAll('.option');
            const explanation = document.createElement('div');
            explanation.style.marginTop = '10px';
            explanation.style.fontSize = '16px';
            explanation.style.fontStyle = 'italic';
            explanation.style.color = '#C9A227';
            
            if (selectedOptions[index] === q.answer) {
                correctAnswers++;
                options[q.answer].style.backgroundColor = 'rgba(0, 100, 0, 0.7)';
                options[q.answer].style.borderColor = '#00FF00';
                explanation.textContent = `✅ Corretto! ${q.explanation}`;
            } else {
                if (selectedOptions[index] !== undefined) {
                    options[selectedOptions[index]].style.backgroundColor = 'rgba(100, 0, 0, 0.7)';
                    options[selectedOptions[index]].style.borderColor = '#FF0000';
                }
                options[q.answer].style.backgroundColor = 'rgba(0, 100, 0, 0.7)';
                options[q.answer].style.borderColor = '#00FF00';
                explanation.textContent = `❌ La risposta corretta era: "${q.options[q.answer]}". ${q.explanation}`;
            }
            
            questionDiv.appendChild(explanation);
        });
        
        const score = Math.round((correctAnswers / questions.length) * 100);
        resultsHTML = `Hai totalizzato ${correctAnswers} su ${questions.length} (${score}%)`;
        
        if (score === 100) {
            resultsHTML += "<br>👏 Perfetto! Sei un vero esperto del caso Djatlov!";
        } else if (score >= 70) {
            resultsHTML += "<br>👍 Buon risultato! Conosci bene la storia.";
        } else if (score >= 40) {
            resultsHTML += "<br>🤔 Non male, ma puoi fare meglio!";
        } else {
            resultsHTML += "<br>😕 Forse dovresti rileggere la sezione 'Storia'...";
        }
        
        resultContainer.innerHTML = resultsHTML;
        submitButton.style.display = 'none';
        restartButton.style.display = 'block';
    }
    
    function restartQuiz() {
        resultContainer.innerHTML = '';
        submitButton.style.display = 'block';
        restartButton.style.display = 'none';
        buildQuiz();
    }
    
    submitButton.addEventListener('click', showResults);
    restartButton.addEventListener('click', restartQuiz);
    
    buildQuiz();
});