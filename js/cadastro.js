const form = document.getElementById('cadastro')

form.addEventListener('submit', e =>{
    e.preventDefault()
    alert("Cadastro feito com sucesso!")
    window.location.href = "../html/jogos.html"
})