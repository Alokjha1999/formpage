document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('jewellery-form');
    const outfitInput = document.getElementById('outfit');
    const outfitPreview = document.getElementById('outfit-preview');

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Validate form data
        if (!validateForm(data)) {
            alert('Please fill out all required fields.');
            return;
        }

        // Handle file upload
        const outfitFile = formData.get('outfit');
        if (outfitFile && outfitFile.size > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                data.outfitImageUrl = event.target.result;
                displaySummary(data);
            };
            reader.readAsDataURL(outfitFile);
        } else {
            displaySummary(data);
        }
    });

    // Handle file input change to show preview
    outfitInput.addEventListener('change', () => {
        const file = outfitInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                outfitPreview.innerHTML = `<img src="${event.target.result}" alt="Outfit Image">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Validate form data
    function validateForm(data) {
        const requiredFields = ['occasion', 'purchase', 'gender', 'age-group', 'jewellery-type', 'budget'];
        for (let field of requiredFields) {
            if (!data[field]) {
                return false;
            }
        }
        return true;
    }

    // Display summary of form data
    function displaySummary(data) {
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'summary';
        summaryDiv.innerHTML = `
            <h3>Summary of Your Selections</h3>
            <p><strong>Occasion:</strong> ${data.occasion}</p>
            <p><strong>Purchase Type:</strong> ${data.purchase}</p>
            <p><strong>Gender:</strong> ${data.gender}</p>
            <p><strong>Age Group:</strong> ${data['age-group']}</p>
            <p><strong>Religion:</strong> ${data.religion || 'Not specified'}</p>
            <p><strong>Jewellery Type:</strong> ${data['jewellery-type']}</p>
            <p><strong>Budget:</strong> ${data.budget}</p>
            ${data.outfitImageUrl ? `<p><strong>Outfit Image:</strong><br><img src="${data.outfitImageUrl}" alt="Outfit Image" style="max-width: 100%;"></p>` : ''}
        `;
        
       
        const previousSummary = document.querySelector('.summary');
        if (previousSummary) {
            previousSummary.remove();
        }

        const formSection = document.querySelector('.form-section');
        formSection.appendChild(summaryDiv);
    }
    document.getElementById('outfit').addEventListener('change', function(event) {
        const preview = document.getElementById('outfit-preview');
        preview.innerHTML = ''; // Clear previous preview
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                preview.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    });
});
