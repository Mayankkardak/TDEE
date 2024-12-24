let isMetric = true;

// Unit toggle functionality
document.querySelectorAll('.unit-toggle button').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.unit-toggle button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        isMetric = this.dataset.unit === 'metric';
        updateUnits();
        convertValues();
    });
});

function updateUnits() {
    const heightUnit = document.querySelector('label[for="height"] .unit');
    const weightUnit = document.querySelector('label[for="weight"] .unit');

    heightUnit.textContent = isMetric ? 'cm' : 'inches';
    weightUnit.textContent = isMetric ? 'kg' : 'lbs';
}

function convertValues() {
    const height = document.getElementById('height');
    const weight = document.getElementById('weight');

    if (height.value) {
        height.value = isMetric ?
            (parseFloat(height.value) * 2.54).toFixed(1) :
            (parseFloat(height.value) / 2.54).toFixed(1);
    }

    if (weight.value) {
        weight.value = isMetric ?
            (parseFloat(weight.value) * 0.453592).toFixed(1) :
            (parseFloat(weight.value) / 0.453592).toFixed(1);
    }
}

document.getElementById('calculate').addEventListener('click', function () {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    let height = parseFloat(document.getElementById('height').value);
    let weight = parseFloat(document.getElementById('weight').value);
    const activity = parseFloat(document.getElementById('activity').value);

    // Convert to metric if using imperial
    if (!isMetric) {
        height *= 2.54;  // inches to cm
        weight *= 0.453592;  // lbs to kg
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activity;

    // Display results
    document.getElementById('bmr').textContent = Math.round(bmr);
    document.getElementById('tdee').textContent = Math.round(tdee);
    document.getElementById('weight-loss').textContent = Math.round(tdee - 500);
    document.getElementById('maintenance').textContent = Math.round(tdee);
    document.getElementById('weight-gain').textContent = Math.round(tdee + 500);

    document.getElementById('results').style.display = 'block';
});