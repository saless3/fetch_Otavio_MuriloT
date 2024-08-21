window.onload = function () {
  let bt = document.querySelector("button");
  let dados = document.querySelector("#json");
  let endereco = document.getElementById("endereco");
  let complemento = document.getElementById("complemento");
  let cidade = document.getElementById("cidade");
  let bairro = document.getElementById("bairro");
  let estado = document.getElementById("estado");
  let numero = document.getElementById("numero");

  bt.addEventListener("click", () => {
    let cep = document.querySelector("#cep").value;
    let servidor = `https://viacep.com.br/ws/${cep}/json`;

    // Limpar detalhes JSON anteriores
    dados.innerHTML = "";

    fetch(servidor)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("CEP não encontrado");
        }
      })
      .then((x) => {
        // Preencher campos de formulário
        endereco.value = x["logradouro"] || "";
        complemento.value = x["complemento"] || "";
        cidade.value = x["localidade"] || "";
        bairro.value = x["bairro"] || "";
        estado.value = x["uf"] || "";
        numero.value = x["numero"] || "";

        // div com os detalhes da resposta JSON
        let div = document.createElement("div");
        div.classList.add("mt-3", "p-3", "bg-light", "border");

        for (var key in x) {
          let p = document.createElement("p");
          let texto = document.createTextNode(`${key.toUpperCase()} : ${x[key]}`);
          p.appendChild(texto);
          div.appendChild(p);
        }

        dados.appendChild(div);
      })
      .catch((error) => {
        console.error(error);
        let errorDiv = document.createElement("div");
        errorDiv.classList.add("alert", "alert-danger", "mt-3");
        errorDiv.textContent = "Erro ao buscar o CEP. Tente novamente.";
        dados.appendChild(errorDiv);
      });
  });
};
