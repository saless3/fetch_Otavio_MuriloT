// Pegar os elementos do formulário

let envia = () => {

    let formulario = document.querySelector("#frm")
    // iremos atribuir atributos

    formulario.action = "proc.php";
    formulario.method = "get";
    formulario.submit();

}