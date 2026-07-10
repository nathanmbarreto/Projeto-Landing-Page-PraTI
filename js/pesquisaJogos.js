const API_KEY = '85dda7666164477db072e294bed36865';
const BASE_URL = 'https://api.rawg.io/api/games';

async function carregarJogos() {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&ordering=-metacritic&page_size=12`);
    const data = await response.json();
    mostrarJogos(data.results, 'jogos-container');
  } catch (error) {
    console.error('Erro ao carregar jogos: ', error);
  }
}

function redirecionarBusca() {
  const termo = document.getElementById('busca').value;
  if (!termo) {
    alert("Digite o nome do jogo desejado!");
    return;
  }
  window.location.href = `resultados.html?search=${encodeURIComponent(termo)}`;
}

async function buscarJogos(termo) {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&search=${termo}&page_size=6`);
    const data = await response.json()
    mostrarJogos(data.results, 'jogos-busca')
  } catch (error) {
    console.error('Erro ao buscar jogos: ', error)
  }
}

function mostrarJogos(jogos, containerId) {
  const container = document.getElementById(containerId)
  if (!container) return

  container.innerHTML = ''

  if (!jogos || jogos.length === 0) {
    container.innerHTML = '<p>Nenhum jogo encontrado.</p>'
    return;
  }

  jogos.forEach(jogo => {
    const imagem = jogo.background_image ? jogo.background_image : 'https://via.placeholder.com/400x200'
    const jogoCard = document.createElement('div')
    jogoCard.classList.add('card')
    jogoCard.innerHTML = `
      <img src="${imagem}" alt="${jogo.name}">
      <h3>${jogo.name}</h3>
      <p>Nota no Metacritic: ${jogo.metacritic || 'N/A'}</p>
    `
    container.appendChild(jogoCard);
  });
}

window.onload = () => {
  const params = new URLSearchParams(window.location.search)
  const termo = params.get('search')

  if (termo) {
    buscarJogos(termo);
  } else {
    carregarJogos()
  }
};
