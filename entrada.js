let codigo = document.getElementById('codigo');
let produto = document.getElementById('produto');
let marca = document.getElementById('marca');
let modelo = document.getElementById('modelo');
let valor = document.getElementById('valor');
let quantidade = document.getElementById('quantidade');
let lista = document.getElementById('listaSelect');
let cadastros = [];

function buscarProduto(){
  const codigoPesquisa = document.getElementById('codigo').value;
  if (codigoPesquisa) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produtoEncontrado = produtos.find((produto) => produto.codigoPRDT === codigoPesquisa);
    if (produtoEncontrado) {
      preencherCampos(produtoEncontrado);
    } else {
      document.getElementById('produto').focus();
    }
  } else {
    alert('Por favor, preencha o campo "Código" antes de pesquisar.');
  }
}

 function preencherCampos(produto) {
   document.getElementById('codigo').value = produto.codigoPRDT;
   document.getElementById('produto').value = produto.nomePRDT;
   document.getElementById('marca').value = produto.marcaPRDT;
   document.getElementById('modelo').value = produto.modeloPRDT;
   document.getElementById('valor').focus();
 }
 
 function incluir() {
   // Verificar se todos os campos foram preenchidos
   if (codigo.value === '' || produto.value === '' || marca.value === '' || valor.value === '' || quantidade.value === '') {
     alert('Preencha todos os campos antes de incluir um novo produto.');
     return;
   }
   
   // Verificar se o valor e a quantidade são maiores que 0
   if (valor.value <= 0 || quantidade.value <= 0) {
     alert('O valor e a quantidade devem ser maiores que 0.');
     return;
   }
 
   // Criando objeto que representa o novo produto
   let novoCadastro = {
     codigoPRDT: codigo.value,
     nomePRDT: produto.value,
     marcaPRDT: marca.value,
     modeloPRDT: modelo.value,
     valorPRDT: valor.value,
     quantidadePRDT: quantidade.value,
   };
 
   // Adicionando o objeto ao vetor de cadastros
   cadastros.push(novoCadastro);
 
   // Criando elemento <option> e adicionando ao select
   let itemadicionado = document.createElement('option');
   itemadicionado.text = `Cdg: ${codigo.value} ; Prdt: ${produto.value} ;  Mrc: ${marca.value} Mdl: ${modelo.value} ; Vlr: R$${valor.value} ; Qtd: ${quantidade.value}`;
   lista.appendChild(itemadicionado);
 
   // Resetando campos do formulário
   reinicia();
 }

 const mysql = require('mysql2/promise');

 let pool;
 
 async function connect() {
   if (!pool) {
     pool = await mysql.createPool({
       host: 'localhost', // Endereço do servidor MySQL
       user: 'root', // Usuário do banco de dados
       password: '70701010', // Senha do banco de dados
       database: 'gerenciamento_estoque', // Nome do banco de dados
       waitForConnections: true,
       connectionLimit: 10,
       queueLimit: 0,
     });
   }
   return pool;
 }
 
 async function finalizar() {
   if (cadastros.length === 0) {
     window.alert('Não há produtos para cadastrar!');
     return;
   }
 
   try {
     const connection = await connect();
     const insertQuery = 'INSERT INTO produtos (codigo, produto, marca, modelo, valor, quantidade) VALUES ?';
     const values = cadastros.map(cadastro => [
       cadastro.codigoPRDT,
       cadastro.nomePRDT,
       cadastro.marcaPRDT,
       cadastro.modeloPRDT,
       cadastro.valorPRDT,
       cadastro.quantidadePRDT,
     ]);
     await connection.query(insertQuery, [values]);
     window.alert('Todos os produtos foram cadastrados com sucesso!');
     cadastros.length = 0;
     reinicia();
     excluirTodos();
   } catch (err) {
     console.error(err);
     window.alert('Erro ao cadastrar produtos!');
   }
 }
 

function excluirTodos() {
   if(lista.length == 0){
      window.alert('Não há ítens a serem apagados.');
   }else{
      const select = document.forms.myForm.listaSelect;
      while (select.length > 0) {
        select.remove(0);
      }
      cadastros.splice(0, cadastros.length); // Limpando o vetor "cadastros"
   }
}

function excluirSelecionado(){
   if(lista.length == 0){
      window.alert('Não há ítens a serem apagados.');
   }else{
      const select = document.forms.myForm.listaSelect;
      select.remove(select.selectedIndex);
      cadastros.splice(select.selectedIndex, 1); // Removendo o item selecionado do vetor "cadastros"
   }
}

function reinicia(){
   produto.value = ''
   codigo.value = ''
   marca.value = ''
   modelo.value = ''
   valor.value = ''
   quantidade.value = ''
   codigo.focus()
}

function preencherFormulario() {
  // Array com informações sobre os itens de vestuário
  const itens = [
    { nome: "Camiseta", marca: "Nike", modelo: "Dry Fit", valor: 49.90, quantidade: 10 },
    { nome: "Camisa", marca: "Polo Ralph Lauren", modelo: "Slim Fit", valor: 199.90, quantidade: 5 },
    { nome: "Calça Jeans", marca: "Levi's", modelo: "501", valor: 249.90, quantidade: 7 },
    { nome: "Bermuda", marca: "Osklen", modelo: "Tropical", valor: 159.90, quantidade: 4 },
    { nome: "Jaqueta", marca: "North Face", modelo: "Thermoball", valor: 799.90, quantidade: 2 },
    { nome: "Blazer", marca: "Zara", modelo: "Slim Fit", valor: 399.90, quantidade: 3 },
    // adicionar mais itens aqui...
  ];

  // Seleciona os campos do formulário
  const codigo = document.getElementById("codigo");
  const produto = document.getElementById("produto");
  const marca = document.getElementById("marca");
  const modelo = document.getElementById("modelo");
  const valor = document.getElementById("valor");
  const quantidade = document.getElementById("quantidade");

  // Preenche o formulário com as informações dos itens
  for (let i = 0; i < 50; i++) {
    const item = itens[Math.floor(Math.random() * itens.length)]; // seleciona um item aleatório do array
    codigo.value = i + 1;
    produto.value = item.nome;
    marca.value = item.marca;
    modelo.value = item.modelo;
    valor.value = item.valor.toFixed(2);
    quantidade.value = item.quantidade;
    incluir(); // chama a função incluir para adicionar o item à lista
  }
}
