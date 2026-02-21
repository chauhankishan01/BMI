// DOM Elements
const calculateBtn = document.getElementById('calculate-btn');
const themeBtn = document.getElementById('theme-btn');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Theme Logic
const toggleTheme = () => {
    const isLight = document.body.classList.toggle('light-mode');
    sunIcon.classList.toggle('hidden');
    moonIcon.classList.toggle('hidden');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
};

themeBtn.addEventListener('click', toggleTheme);

// Load Preferred Theme
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
}

// BMI Calculation Logic
calculateBtn.addEventListener('click', () => {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const resultContainer = document.getElementById('result-container');
    const bmiValueSpan = document.getElementById('bmi-value');
    const bmiStatus = document.getElementById('bmi-status');
    const bmiAdvice = document.getElementById('bmi-advice');

    if (!height || !weight || height <= 0 || weight <= 0) {
        alert("Please enter valid positive values for height and weight.");
        return;
    }

    // Standard BMI Formula: kg / m^2
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    // Dynamic UI Update
    resultContainer.classList.remove('hidden');
    bmiValueSpan.textContent = bmi;

    let status = "";
    let color = "";
    let advice = "";

    if (bmi < 18.5) {
        status = "Underweight";
        color = "#fbbf24"; // Warning Yellow
        advice = "You may need to increase your calorie intake. Focus on nutrient-dense foods.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = "Healthy Weight";
        color = "#4ade80"; // Success Green
        advice = "Fantastic! You are in the ideal range. Keep maintaining your active lifestyle.";
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = "Overweight";
        color = "#fbbf24"; // Warning Yellow
        advice = "Small changes in diet and daily movement can help you return to a healthy range.";
    } else {
        status = "Obese";
        color = "#f87171"; // Danger Red
        advice = "Consider speaking with a healthcare professional to create a sustainable wellness plan.";
    }

    bmiStatus.textContent = status;
    bmiStatus.style.color = color;
    bmiValueSpan.style.color = color;

    // Smooth scroll to result on mobile
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});