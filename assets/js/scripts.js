const cidade = document.querySelector('#cidade')
const logradouro = document.querySelector('#endereco')
const estado = document.querySelector('#estado')
const bairro = document.querySelector('#bairro')
const cep = document.querySelector('#cep')

async function buscaEndereco(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`

  try {
    let consultaCEP = await fetch(url)
    let consultaCEPConvertida = await consultaCEP.json()
    if (consultaCEPConvertida.erro) {
      throw Error('CEP não existente!')
    }

    cidade.value = consultaCEPConvertida.localidade
    logradouro.value = consultaCEPConvertida.logradouro
    estado.value = consultaCEPConvertida.uf
    bairro.value = consultaCEPConvertida.bairro

    return consultaCEPConvertida
  } catch (erro) {
    swal('CEP inválido. Tente novamente!')
    console.log(erro)
  }
}

cep.addEventListener('focusout', () => buscaEndereco(cep.value))
