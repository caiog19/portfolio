// Captura as imagens da div projects
var projectImages = document.querySelectorAll("#projects img");

// Variável para armazenar o índice da imagem atual
var currentIndex = 0;

// Adiciona a classe 'active' à primeira imagem
projectImages[currentIndex].classList.add("active");

// Função para alternar as imagens
function changeProject() {
    // Remove a classe 'active' da imagem atual
    projectImages[currentIndex].classList.remove("active");
    // Atualiza o índice da imagem atual
    currentIndex = (currentIndex + 1) % projectImages.length;
    // Adiciona a classe 'active' à próxima imagem
    projectImages[currentIndex].classList.add("active");
}

// Chama a função changeProject a cada 3 segundos
setInterval(changeProject, 3000);