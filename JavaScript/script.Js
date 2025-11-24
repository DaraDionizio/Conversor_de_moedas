
let form = document.getElementById("conversorForm");
let quantidade = document.getElementById("quantidade");
let entradaMoeda = document.getElementById("entradaMoeda");
let saidaMoeda = document.getElementById("saidaMoeda");
let qt_convertido = document.getElementById("qt_convertido");
let loading = document.querySelector(".loading");
let resultado = document.querySelector(".resultado");
let erro = document.querySelector(".erro");

const API_URL = "https://api.exchangerate-api.com/v4/latest/"

async function conversaoMoney(){
    loading.style.display = "block";
    erro.style.display = "none";

    try{
        const response = await fetch(API_URL + entradaMoeda.value) //await : espera, fetch: para acessar o servidor
        const dados = await response.json() // p/ receber em JSON

        const filtro = dados.rates[saidaMoeda.value] //buscando somente o dado pedido pelo usuario 
        const conversao = (quantidade.value * filtro).toFixed(2) //Valor$ da primeira moeda * cotação da moeda escolhida pelo usuario

        qt_convertido.value = conversao
        resultado.style.display = "block";
        resultado.innerHTML= `
            <div style ="font-size: 1.7rem; font-weight: 600; display: block;">${quantidade.value} ${entradaMoeda.value} = ${conversao} ${saidaMoeda.value}
            </div>
            <div style ="font-size: 0.9rem">
                Taxa: 1 ${entradaMoeda.value} = ${filtro} ${saidaMoeda.value}
            </div>
            `

    } catch(error){
        alert("Falha no servidor");
        erro.style.display= "block"
        erro.innerHTML = `Falha ao converter moeda! Tente novamente`
    }
    loading.style.display= "none"
}

form.addEventListener("submit", function(cliqueBtn){
    cliqueBtn.preventDefault() // para não limpar o formulario
    conversaoMoney()
})

// GRAFICO SECTION PRINCIPAL

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const usd_brl = [4.90,4.95,5.10,5.05,5.12,5.18,5.22,5.15,5.25,5.30,5.28,5.35];

new Chart(document.getElementById("graficoDolar"), {
  type: "line",
  data: {
    labels: months,
    datasets: [{
      data: usd_brl,
      borderWidth: 3,
      borderColor: "white",
      pointRadius: 2,
      fill: true
    }]
  },
  options: {
    plugins: { legend: { display: false }},
    scales: {
        y: { beginAtZero: false, grid: { display: false }, ticks: { display: false }},
        x: {grid: { display: false, beginAtZero: false}}
    }
  }
});




