
var objBotao = document.getElementById("botao");
const form = document.getElementById("formulario")
const nome = document.getElementById("nome")
const campo = document.getElementsByClassName("campo");
const alerta = document.getElementById("alerta")
const email = document.getElementById("email")
const confirmacaoEmail = document.getElementById("confirmacaoEmail")
const senha = document.getElementById("senha")
const confirmaSenha = document.getElementById("confirmaSenha")
currentDate=new Date();
form.addEventListener("submit", (e)=>{        
    let messages = []
    for(c of campo){
        if(c.value === '' || c.value==null){
            messages.push(`O campo ${c.name} é obrigatório`)
        }
    }    
    
    if(email.value !== confirmacaoEmail.value){
        messages.push("Os campos Email e Confirma Email devem ter o mesmo email")
    }
    if(senha.value.length<8){
        messages.push("A senha deve ter pelo menos 8 dígitos");
    }
    if(senha.value !== confirmaSenha.value){
        messages.push("Os campos Senha e Confirma Senha devem ter a mesma senha")
    }
    
    if(currentDate.getFullYear()-new Date(campo[2].value).getFullYear()<16){
        messages.push("O usuário deve ser maior de 16 anos")
    }
    if(messages.length>0){
        e.preventDefault()
        alerta.innerHTML = messages.join('<br>');
    }
    console.log(currentDate.getFullYear())
    console.log(new Date(campo[2].value).getFullYear())
})
