// seleciona todas as células de cabeçalho da tabela
const headerCells = document.querySelectorAll("table th");

// cria um objeto para armazenar os valores de filtro de cada coluna
const filterValues = {};
headerCells.forEach((headerCell) => {
filterValues[headerCell.cellIndex] = "";
});

// itera sobre cada célula de cabeçalho e adiciona um input de filtro
headerCells.forEach((headerCell) => {
const filterInput = document.createElement("input");
filterInput.type = "text";
filterInput.placeholder = "Filtrar por " + headerCell.textContent;
headerCell.appendChild(filterInput);

// adiciona um evento de escuta para o input de filtro
filterInput.addEventListener("input", () => {
const columnIndex = headerCell.cellIndex;
filterValues[columnIndex] = filterInput.value.toLowerCase();
const tableRows = document.querySelectorAll("table tbody tr");

// itera sobre cada linha da tabela e filtra as células correspondentes
tableRows.forEach((tableRow) => {
    const tableCells = tableRow.querySelectorAll("td");
    let showRow = true;
    Object.keys(filterValues).forEach((columnIndex) => {
      const filterValue = filterValues[columnIndex];
      const cellValue = tableCells[columnIndex].textContent.toLowerCase();
      if (!cellValue.includes(filterValue)) {
        showRow = false;
      }
    });
    if (showRow) {
      tableRow.style.display = "";
    } else {
      tableRow.style.display = "none";
    }
  });

});
});

// Recupera os dados armazenados no localStorage
const dadosAntigosString = localStorage.getItem('produtos');

if (dadosAntigosString) {
// Se existirem, converte a string JSON em um array
const dadosAntigos = JSON.parse(dadosAntigosString);

// Cria a tabela com os dados dos produtos
const tbody = document.getElementById('tbody');

dadosAntigos.forEach(produto => {
const tr = document.createElement('tr');

const tdCodigo = document.createElement('td');
tdCodigo.innerText = produto.codigoPRDT;
tr.appendChild(tdCodigo);

const tdProduto = document.createElement('td');
tdProduto.innerText = produto.nomePRDT;
tr.appendChild(tdProduto);

const tdMarca = document.createElement('td');
tdMarca.innerText = produto.marcaPRDT;
tr.appendChild(tdMarca);

const tdModelo = document.createElement('td');
tdModelo.innerText = produto.modeloPRDT;
tr.appendChild(tdModelo);

const tdValor = document.createElement('td');
tdValor.innerText = `R$ ${produto.valorPRDT}`;
tr.appendChild(tdValor);

const tdQuantidade = document.createElement('td');
tdQuantidade.innerText = produto.quantidadePRDT;
tr.appendChild(tdQuantidade);

tbody.appendChild(tr);

});
} else {
// Se não existirem, exibe uma mensagem informando que não há produtos no estoque
const tbody = document.getElementById('tbody');
const tr = document.createElement('tr');
const td = document.createElement('td');
td.colSpan = headerCells.length;
td.innerText = "Não há produtos no estoque.";
tr.appendChild(td);
tbody.appendChild(tr);
}

function limparLocalStorage() {
  localStorage.clear();
}