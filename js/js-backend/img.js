// save to the databse 

document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

      // Show loading spinner
      document.getElementById('loading-spinner').style.display = 'block';

    const formData = new FormData();
    const imageFile = document.getElementById('image').files[0];
    formData.append('image', imageFile);

    try {
        const response = await fetch('https://wedcam-eb80ccd082f6.herokuapp.com/api/v1/img/uploadimg', { 
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById('message').textContent = '';
            document.getElementById('message').textContent = result.message;
            document.getElementById('uploadForm').reset();      
            document.getElementById('preview').style.display = 'none'; 

        } else {
            document.getElementById('message').textContent = '';
            document.getElementById('message').textContent = `Error: ${result.error || result.message}`;
        }
    } catch (error) {
        document.getElementById('message').textContent = '';
        document.getElementById('message').textContent = `Error: ${error.message}`;
    }finally {
        // Hide loading spinner
        document.getElementById('loading-spinner').style.display = 'none';
    }
});

document.getElementById("takePhotoButton").addEventListener("click", function() {
    
    document.getElementById("image").click();
});



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

            // Apply CamanJS filter after the image is loaded
            // Caman("#preview", function () {
            //     this.vintage();  
            //     this.render();
                
            // });
        };
        reader.readAsDataURL(file);
    } else {
        // If no file is selected
        // Reset the source of the preview image
        document.getElementById('preview').src = "#";
        // Hide the preview image
        document.getElementById('preview').style.display = 'none'; 
    }
});

















        // document.addEventListener('contextmenu', function (e) {
        //     e.preventDefault();
        // });

//         var maxPictures = 3;
//     var picturesTaken = 0;

//     document.getElementById("fileInput").addEventListener("change", function() {
//         if (this.files && this.files.length > 0) {
//             // Check if the number of pictures selected plus previously taken pictures exceeds the limit
//             if (this.files.length + picturesTaken > maxPictures) {
//                 alert("You can only take a maximum of " + maxPictures + " pictures.");
//                 // Clear the file input to prevent additional selection
//                 this.value = "";
//             } else {
//                 picturesTaken += this.files.length;
//             }
//         }
//     });




// document.getElementById('image').addEventListener('change', function(event) {
//     const file = event.target.files[0];
//     if (file) {
//         const canvas = document.getElementById('canvas');
//         const context = canvas.getContext('2d');
//         const reader = new FileReader();
        
//         reader.onload = function(e) {
//             const img = new Image();
//             img.onload = function() {
//                 canvas.width = img.width;
//                 canvas.height = img.height;
//                 context.filter = 'grayscale(100%)'; // Example filter: grayscale
//                 context.drawImage(img, 0, 0, canvas.width, canvas.height);

//                 // Convert canvas to blob and update the file input
//                 canvas.toBlob(function(blob) {
//                     const newFile = new File([blob], file.name, { type: 'image/jpg' });
//                     const dataTransfer = new DataTransfer();
//                     dataTransfer.items.add(newFile);
//                     document.getElementById('image').files = dataTransfer.files;
//                 }, 'image/jpg');
//             };
//             img.src = e.target.result;
//         };
        
//         reader.readAsDataURL(file);
//     }
// });
