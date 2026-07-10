const API_KEY = '85dda7666164477db072e294bed36865'
const BASE_URL = 'https://api.rawg.io/api/games'

async function carregarDestaques() {
    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&ordering=-metacritic&page_size=12`)
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
        <p>Nota no Metacritic: ${jogo.metacritic || 'N/A'}</p>
        `

        container.appendChild(jogoCard)
    })
    
}

carregarDestaques()