
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

    } catch(erro){
        alert("Falha no servidor");
    }
}

form.addEventListener("submit", function(cliqueBtn){
    cliqueBtn.preventDefault() // para não limpar o formulario
    conversaoMoney()
})