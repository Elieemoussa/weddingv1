// photo taken
document.getElementById("takePhotoButton").addEventListener("click", function() {   
    document.getElementById("image").click();
});



document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Show loading spinner
    document.getElementById('loading-spinner').style.display = 'inline-block';

    const formData = new FormData();
    const imageFile = document.getElementById('image').files[0];
    // Wedding ID for elie and tia 
    const wedId = 3981; 
    formData.append('image', imageFile);
    formData.append('wedId', wedId);

    try {
        const response = await fetch('https://wedcam-eb80ccd082f6.herokuapp.com/api/v1/img/uploadimg', { 
            method: 'POST',
            body: formData,
            mode: 'cors',
            // credentials: 'include' // Include credentials to allow cookies
        });

        // result of the cookies 
        // const result = await response.json();
        // console.log('Response received with status:', response.status);
        // console.log('Response cookies:', document.cookie);
        
        if (response.ok) {
            document.getElementById('message').textContent = '';        
            var icon = new Image();
            icon.src = 'https://img.icons8.com/?size=100&id=83205&format=png&color=40C057'; 
            icon.alt = 'Done'; 
            icon.height = 40; 
            icon.width = 40; 
            document.getElementById('message').appendChild(icon);
            document.getElementById('uploadForm').reset();      
            document.getElementById('preview').style.display = 'none'; 
            document.getElementById('button').style.display = 'none'; 

            // Update and store the upload count locally
            let uploadCount = parseInt(sessionStorage.getItem('uploadCount')) || 0;
            uploadCount++;
            sessionStorage.setItem('uploadCount', uploadCount);
                                   
                       
            // Update the counter after successful upload
            // photoCounter = result.uploadCount;
            // document.getElementById('photoCount').textContent = `${photoCounter} of ${result.maxUploads} photos`;
            document.getElementById('photoCount').textContent = `${uploadCount} of 20 photos`;

            if (uploadCount >= 20) {
                document.getElementById('takePhotoButton').disabled = true;
                const cooldownDuration = 60 ; // 60 minutes
                const cooldownEnd = Date.now() + cooldownDuration * 60 * 1000;
                sessionStorage.setItem('cooldownEnd', cooldownEnd.toString());

                updateCountdown(cooldownEnd);
                document.getElementById('message').textContent = 'Can\'t get enough snaps? Return in 1 hours for more photo magic!';
            }
            
        } else {
            document.getElementById('preview').style.display = 'none'; 
            document.getElementById('message').textContent = `Error: ${result.error || result.message}`;
            throw new Error(`HTTP error! Status: ${response.status}`);
            
        }
    } catch (error) {
        document.getElementById('preview').style.display = 'none'; 
        document.getElementById('message').textContent = `Error: ${error.message}`;
    } finally {
        // Hide loading spinner
        document.getElementById('loading-spinner').style.display = 'none';
    }
});


// Retrieve and display the photo count and cooldown on page load
document.addEventListener('DOMContentLoaded', () => {
    const uploadCount = parseInt(sessionStorage.getItem('uploadCount')) || 0;
    const cooldownEnd = parseInt(sessionStorage.getItem('cooldownEnd')) || 0;
    const currentTime = Date.now();

    document.getElementById('photoCount').textContent = `${uploadCount} of 20 photos`;

    if (uploadCount >= 20 && currentTime < cooldownEnd) {
        document.getElementById('takePhotoButton').disabled = true;
        const remainingTime = Math.ceil((cooldownEnd - currentTime) / (60 * 1000));
        document.getElementById('message').textContent = 'Can\'t get enough snaps? Return in 1 hour for more photo magic!';
        updateCountdown(cooldownEnd);
    } else if (uploadCount >= 20) {
        resetCounterAndButton();
    }
});

function updateCountdown(cooldownEnd) {
    const countdownElement = document.getElementById('countdown');
    const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = cooldownEnd - currentTime;

        if (remainingTime <= 0) {
            clearInterval(intervalId);
            resetCounterAndButton();
        } else {
            const seconds = Math.floor((remainingTime / (60 * 1000)));
            countdownElement.textContent = `Cooldown: ${seconds}m remaining`;
        }
    }, 1000);
}

function resetCounterAndButton() {
    document.getElementById('takePhotoButton').disabled = false;
    document.getElementById('message').textContent = '';
    sessionStorage.setItem('uploadCount', '0');
    sessionStorage.removeItem('cooldownEnd');
    document.getElementById('photoCount').textContent = `0 of 20 photos`;
    document.getElementById('countdown').textContent = '';
}




// show under the input 
document.getElementById('image').addEventListener('change', function() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            // Set the source of the preview image to the loaded file
            document.getElementById('preview').src = event.target.result;
            // Display the preview image
            document.getElementById('preview').style.display = 'block';  
            document.getElementById('button').style.display = 'inline-block';   

        };
        reader.readAsDataURL(file);
    } else {
        // If no file is selected

        document.getElementById('preview').src = "#";
        // Hide the preview image
        document.getElementById('preview').style.display = 'none'; 
        document.getElementById('button').style.display = 'none'; 
    }
});


