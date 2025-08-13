//Função para buscar o nome da cidade
async function getCityName() {
    const cidadeInput = document.getElementById('city-input');
    return cidadeInput.value.trim();
}

//Função para buscar os dados do clima
async function getWeatherData(nomeCidade) {
    try{
        const keyApi = 'd494fc4ee0474aa587c235632251108';
        const apiCaminho = `https://api.weatherapi.com/v1/current.json?key=${keyApi}&q=${nomeCidade}&aqi=no&lang=pt`;

        const response = await fetch(apiCaminho);
        if (!response.ok) {
            throw new Error(`Cidade ${nomeCidade}não encontrada! Verifique o nome e tente novamente.`);
        }
        const data = await response.json();
        console.log(data);
        displayWeatherData(data);
    }
    

        
        .then(data => {
            console.log(data);
            displayWeatherData(data);
        })
        .catch(error => {
            console.error(error);
            showError();
        });
}