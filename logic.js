

document.getElementById('imageInput').addEventListener('change', displayImage); // Event for displaying the selected image when loaded.

function displayImage() {
    var input = document.getElementById('imageInput');
    var preview = document.getElementById('img-display'); //Initializing the input and the display section.

    var file = input.files[0];
    var reader = new FileReader(); //??

    reader.onload = function (e) {
        preview.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file); //?
    }
}

function handleImage() { 
    var input = document.getElementById('imageInput');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d'); //?

    var redBits = parseInt(document.getElementById('redBits').value);
    var greenBits = parseInt(document.getElementById('greenBits').value);
    var blueBits = parseInt(document.getElementById('blueBits').value);

    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var img = new Image(); //??
        img.src = e.target.result;

        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;

            for (var i = 0; i < data.length; i += 4) {
                data[i] = Math.floor(data[i] / (256 / Math.pow(2, redBits))) * (256 / Math.pow(2, redBits));
                data[i + 1] = Math.floor(data[i + 1] / (256 / Math.pow(2, greenBits))) * (256 / Math.pow(2, greenBits));
                data[i + 2] = Math.floor(data[i + 2] / (256 / Math.pow(2, blueBits))) * (256 / Math.pow(2, blueBits));
            }

            ctx.putImageData(imageData, 0, 0);
        };
    };

    reader.readAsDataURL(file);
}