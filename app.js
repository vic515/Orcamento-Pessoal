class Despesa {
    constructor(ano,mes,dia,tipo,descricao,valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (const i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            } else {
                return true
            }
        }
    }
}

class Bd {
    constructor() {
        let id = localStorage.getItem('id')
        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    recuperarTodosOsRegistros() {
        let despesas = Array()
        console.log('Estamos chegando até aqui')
        let id = localStorage.getItem('id')

        for(let i = 1 ; i <= id ; i++) {
            let despesa = localStorage.getItem(i)
            despesa = JSON.parse(despesa)
            if(despesa === null) {
                continue
            }
            despesas.push(despesa)
        }

        return despesas
    }

    gravar(d) {
        
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }
}







let bd = new Bd()

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value)

    // if((mes.value && dia.value && tipo.value && descricao.value &&
    //     valor.value) === ''){
    //         alert('Não deixe nenhum campo vazio!')

    // } else {
    //     bd.gravar(despesa)
    // }
    if(despesa.validarDados()) {
        bd.gravar(despesa)
        document.getElementById('modal-principal').innerHTML = 'Despesa adicionada com sucesso'
        document.getElementById('modalHeader').innerHTML = 'Registro adicionado com sucesso'
        document.getElementById('button-footer').className = 'btn btn-success'
        document.getElementById('button-footer').innerHTML = 'Voltar'
        $('#modalComplete').modal('show')
        
    } else {
        document.getElementById('modal-principal').innerHTML = 'Há campos obrigatórios a serem preenchidos. Por favor tente novamente.'
        document.getElementById('modalHeader').innerHTML = 'Erro no registro'
        document.getElementById('button-footer').className = 'btn btn-danger'
        document.getElementById('button-footer').innerHTML = 'Voltar e corrigir'
        $('#modalComplete').modal('show')
    }
    
}

function carregaListaDespesas() {
    let despesas = Array()
    despesas = bd.recuperarTodosOsRegistros()
    let listaDespesas = document.getElementById('tabelaDados')
    despesas.forEach(function(d) {
        console.log(d)
        let linha = listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    });
}


