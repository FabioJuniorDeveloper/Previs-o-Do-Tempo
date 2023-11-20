






let form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        limparInformacoes()
        mostrarAviso('Conteúdo Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=01cd92f6fc687e6f3b5f96bf1c980f11&units=metric&lang=pt_br`;

        let request = await fetch(url);
        let json = await request.json();

        if (json.cod === 200) {

            mostrarInformacoes(json)
        } else {
            limparInformacoes()
            mostrarAviso('Não encontramos a localização')
        }


    } else {
        limparInformacoes()
        mostrarAviso('Digite nome de sua cidade')
    }


});

function mostrarAviso(msg) {
    document.querySelector('.aviso').innerHTML = msg;
    document.querySelector('.aviso').classList.add('ativo');
}
function limparInformacoes() {
    document.querySelector('.resultado').style.display = 'none';
    mostrarAviso('')

}

function mostrarInformacoes(json) {
    document.querySelector('.aviso').classList.remove('ativo');

    let divResulted = document.querySelector('.resultado');


    divResulted.querySelector('.titulo').innerHTML = `${json.name}, ${json.sys.country}`;

    divResulted.querySelector('.tempInfo').innerHTML = `${json.main.temp} <sup>ºC</sup>`;
    divResulted.querySelector('span#tempMin').innerHTML = `${json.main.temp_min} <sup>ºC</sup>`;
    divResulted.querySelector('span#tempMax').innerHTML = `${json.main.temp_max} <sup>ºC</sup>`;
    divResulted.querySelector('img').setAttribute('src', `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);
    divResulted.querySelector('.weatherDescription').innerHTML = `${json.weather[0].description}`;

    divResulted.querySelector('div#windSpeed').innerHTML = `${json.wind.speed} <span>km/h</span>`;
    divResulted.querySelector('div#windDirection').style.transform = `rotate(${json.wind.deg - 90}deg)`;

    divResulted.querySelector('div#pressure').innerHTML = `${json.main.pressure} <sup>hPa</sup>`;
    divResulted.querySelector('div#feelsLike').innerHTML = `${json.main.feels_like} <sup>ºC</sup>`;

    divResulted.style.display = 'block';
    divResulted.style.opacity = 1;
}

let data = new Date()
let hora = data.getHours();
let isDia = hora >= 6 && hora < 18;
const resultadoElement = document.querySelector('.resultado');

resultadoElement.classList.toggle('diaResultado', isDia); // caso for true, toggle ira retirar a outra classe e ira colocar o diaResultado
resultadoElement.classList.toggle('noiteResultado', !isDia);

document.querySelectorAll('div').forEach((item) => {
    item.style.color = '#FFF'
});

document.querySelector('.ventoArea').style.border = '1px solid #FFF';
document.querySelector('.ventoPonto').style.background = '#FFF';


