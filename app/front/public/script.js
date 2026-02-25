// Adicione este trecho ao seu script.js
document.getElementById('fileInput').addEventListener('change', function() {
    const fileName = this.files.length > 0 ? this.files[0].name : 'Nenhum arquivo selecionado';
    document.getElementById('file-name-display').textContent = fileName;
});

document.getElementById('file-upload-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const requiredFileName = "application.war";

    if (!file) {
        showPopup('Por favor, selecione um arquivo.');
        return;
    }

    if (file.name !== requiredFileName) {
        showPopup(`Erro: O nome do arquivo deve ser "${requiredFileName}".`);
        return;
    }

    const formData = new FormData();
    formData.append('uploadedFile', file);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            showPopup(data.message, 'success');
        } else {
            showPopup(`Erro: ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Erro ao fazer upload:', error);
        showPopup('Erro ao conectar com o servidor. Tente novamente.', 'error');
    }
});

function showPopup(message, type = 'info') {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');

    popupMessage.textContent = message;

    if (type === 'success') {
        popup.style.backgroundColor = 'rgba(20, 101, 54, 0.9)';
    } else if (type === 'error') {
        popup.style.backgroundColor = 'rgba(231, 76, 60, 0.9)';
    } else {
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }

    popup.style.display = 'block';
}
