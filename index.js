let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 1, 02, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 14, 30),
    dataCheckIn: new Date(2024, 0, 18, 18, 45)
  },
  {
    nome: "João Santos",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 3, 10, 10, 15),
    dataCheckIn: new Date(2024, 3, 14, 16, 30)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 05, 12, 00),
    dataCheckIn: null
  },
  {
    nome: "Pedro Souza",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 1, 28, 20, 45),
    dataCheckIn: new Date(2024, 2, 03, 10, 10)
  },
  {
    nome: "Carla Lima",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 17, 30),
    dataCheckIn: new Date(2024, 3, 05, 19, 40)
  },
  {
    nome: "Rafaela Santos",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 1, 12, 22, 10),
    dataCheckIn: new Date(2024, 1, 15, 12, 30)
  },
  {
    nome: "Lucas Costa",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 0, 25, 13, 20),
    dataCheckIn: null
  },
  {
    nome: "Fernanda Pereira",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 2, 17, 09, 40),
    dataCheckIn: null
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)


  // condicional
  if(participante.dataCheckIn == null) {
      dataCheckIn = ` 
        <button
            data-email="${participante.email}"
            onclick="fazerCheckIn(event)"
          >
            Confirmar check-in
        </button>
      `
  }
  
  return `
  <tr>
    <td>
  <strong>
    ${participante.nome}
      </strong>
      <br>
      <small>
    ${participante.email}
    </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
`
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes) {
  output = output + criarNovoParticipante(participante)
}

// substituir informação do HTML
document
.querySelector('tbody')
.innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmação = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmação) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  ) 

  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // ataulizar a lista de participantes
  atualizarLista(participantes)
}