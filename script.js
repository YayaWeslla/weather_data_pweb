//Variáveis
const apiKey = 'd494fc4ee0474aa587c235632251108';
const botaoPesquisa = document.getElementById('search-btn');
const inputCidade = document.getElementById('city-input');
const cardClima = document.getElementById('weather-result');
const erro = document.getElementById('error-message');

async function getClima(cidade) {
    try{
        const nomeCidade = cidade.toLowerCase().trim();
        const ulr = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${nomeCidade}&aqi=no&lang=pt`);
        if (!ulr.ok){
            throw new Error(`A cidade ${cidade} não foi encontrada! Verifique o nome da cidade e tente novamente.`);
        }
        const dados = await ulr.json();
        dadosClima(dados);
        erro.classList.add('hidden');
    } catch (e){
        erro.textContent = e.message;
        erro.classList.remove('hidden');
        cardClima.classList.add('hidden');
    }
}

function dadosClima(dadosCidade){
    cardDadosClima = `
    <h2 id="city-name">${dadosCidade.location.name}, ${dadosCidade.location.country}</h2>
    <p id "local-time" class="local-time>Horário local: ${dadosCidade.location.localtime}</p>

    <div class="weather-main">
        <img id="weather-icon" src="${dadosCidade.current.condition.icon}" alt="Ícone do clima">
        <p id="temperature">${dadosCidade.current.temp_c}°C</p>
    </div>
    <p id="condition">${dadosCidade.current.condition.text}</p>

    <div class ="weather-details">
        <div = class="detail-item">
            <span>Sensação</span>
            <strong id="feels-like">${dadosCidade.current.feelslike_c}°</strong>
        </div>
        <div class="detail-item">
            <span>Umidade</span>
            <strong id="humidity">${dadosCidade.current.humidity}%</strong>
        </div>
        <div class="detail-item">
            <span>Vento</span>
            <strong id="wind-speed">${dadosCidade.current.wind_kph} km/h</strong>
        </div>
        <div class="detail-item">
            <span>Pressão</span>
            <strong id="pressure">${dadosCidade.current.pressure_mb} mb</strong>
        </div>
        <div class="detail-item">
            <span>Visibilidade</span>
            <strong id="visibility">${dadosCidade.current.vis_km} km</strong>
        </div>
        <div class="detail-item">
            <span>Índice UV</span>
            <strong id="uv-index">${dadosCidade.current.uv}</strong>
        </div>
    </div>
    `
    cardClima.innerHTML = cardDadosClima;
    cardClima.classList.remove('hidden');
}


botaoPesquisa.addEventListener('click', function(){
    const nomeCidade = inputCidade.value.trim();

    if(nomeCidade){
        getClima(nomeCidade);
    }
})