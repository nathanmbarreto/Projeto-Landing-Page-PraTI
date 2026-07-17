const API_KEY = '85dda7666164477db072e294bed36865'
const BASE_URL = 'https://api.rawg.io/api/games'

async function carregarDestaques() {
    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&dates=2026-01-01,2026-12-31&ordering=-rating`)
        const data = await response.json()

        mostrarJogos(data.results)
    } catch (error) {
        console.error('Erro ao buscar os jogos: ', error)
    }

}

function mostrarJogos(jogos) {
    const container = document.getElementById('jogos-container')
    container.innerHTML = ''

    jogos.forEach(jogo => {
        const imagem = jogo.background_image ? jogo.background_image : 'https://via.placeholder.com/400x200'

        const jogoCard = document.createElement('div')
        jogoCard.classList.add('card')

        jogoCard.innerHTML = `
        <img src="${imagem}" alt="${jogo.name}">
        <h3>${jogo.name}</h3>
        <p>Nota: ${jogo.rating || 'N/A'}</p>
        <p>Lançamento: ${jogo.released}</p>
        `

        container.appendChild(jogoCard)
    })
}

carregarDestaques()