const uploadButton = document.getElementById('uploadButton') as HTMLButtonElement;
const fileInput = document.getElementById('fileInput') as HTMLInputElement;

uploadButton.addEventListener('click', () => {
    fileInput.click();
});