// Array que armazena os produtos em estoque
var produtos = [];

// Função para buscar o produto pelo código informado
function buscarProduto() {
  var codigo = document.getElementById("codigo").value;
  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].codigo == codigo) {
      document.getElementById("produto").value = produtos[i].produto;
      document.getElementById("marca").value = produtos[i].marca;
      document.getElementById("modelo").value = produtos[i].modelo;
      document.getElementById("valor").value = produtos[i].valor;
      document.getElementById("quantidade").value = 1;
      return;
    }
  }
  alert("Produto não encontrado.");
}

// Função para incluir um produto na lista de saída
function retirar() {
  // Verifica se o produto já foi incluído na lista de saída
  var lista = document.getElementById("listaSelect");
  for (var i = 0; i < lista.options.length; i++) {
    if (lista.options[i].value == codigo) {
      alert("Este produto já foi incluído na lista de saída.");
      return;
    }
  }

  // Verifica se a quantidade informada é maior que a quantidade em estoque
  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].codigo == codigo) {
      if (quantidade > produtos[i].quantidade) {
        alert("Quantidade informada é maior que a quantidade em estoque.");
        return;
      }
      break;
    }
  }

  // Adiciona o produto à lista de saída
  var option = document.createElement("option");
  option.value = codigo;
  option.text = produto + " - " + marca + " - " + modelo + " - " + valor + " - " + quantidade + " unidades";
  lista.add(option);
}

// Função para excluir o produto selecionado da lista de saída
function excluirSelecionado() {
  var lista = document.getElementById("listaSelect");
  var index = lista.selectedIndex;
  if (index >= 0) {
    lista.options[index] = null;
  }
}

// Função para excluir todos os produtos da lista de saída
function excluirTodos() {
  var lista = document.getElementById("listaSelect");
  lista.options.length = 0;
}

// Função para finalizar a saída dos produtos
function finalizar() {
  var lista = document.getElementById("listaSelect");
  if (lista.options.length == 0) {
    alert("Lista de saída vazia.");
    return;
  }
  for (var i = 0; i < lista.options.length; i++) {
    var codigo = lista.options[i].value;
    var quantidade = lista.options[i].text.split("-")[4].trim().split(" ")[0];
    for (var j = 0; j < produtos.length; j++) {
      if (produtos[j].codigo == codigo) {
        produtos[j].quantidade -= quantidade;
        break;
      }
    }
  }
  alert("Saída de produtos realizada com sucesso.");
  excluirTodos();
}