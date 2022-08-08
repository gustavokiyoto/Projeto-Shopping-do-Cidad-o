function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function calculaCpf(x){
    var y=""  
      for(var i=0;i<x.length;i++){        
          if(i == 3 || i==6){
              y=y+"."+x[i]
          }else if(i==9){
              y=y+"-"+x[i]
          }else{
            y=y+x[i];
          }        
      }
      return y;
  }
function calculaData(y){
    const x = y.split(/-|T/);
    return `${x[2]}/${x[1]}/${x[0]}`;
}

window.onload = function(){    
    readTextFile("/temporaryUserData.json", function(text){
        var inf = JSON.parse(text);
        //console.log(data);
        const values = ["nome", "email", "data_nascimento", "endereco", "cidade", "estado", "complemento", "cpf"]
        for(var i of values){
            if(inf[0][i]!=null){
                if(i=="data_nascimento"){                
                    calculaData(inf[0][i]);
                    document.getElementById(i).innerHTML=calculaData(inf[0][i]);
                }else if(i=="nome"){
                    document.getElementById(i).innerHTML=inf[0][i]+" "+inf[0]["sobrenome"];
                }else if(i=="cpf"){
                    document.getElementById(i).innerHTML=calculaCpf(inf[0][i]);
                }
                else{
                    document.getElementById(i).innerHTML=inf[0][i];
                }
            }else{
                document.getElementById(i).style.visibility = "hidden";
                document.getElementById("l"+i).style.visibility = "hidden";
            }
        }
    });

    readTextFile("/temporaryServiceData.json", function(text){
        var inf = JSON.parse(text);
        var label, content, element,tr,td;
        const values = ["nome","unidade","horario","dia"]
        element = document.getElementById("tabelaServico");          
        for(var i of inf){       
            tr = element.insertRow();                            
            for(var j of values){
                td = tr.insertCell(); 
                if(j=="dia"){
                    content = document.createTextNode(calculaData(i[j]));
                }else if(j=="horario"){
                    content = document.createTextNode(i[j].slice(0,5));
                }
                else{
                    content = document.createTextNode(i[j]);
                }                
                td.appendChild(content);                                                            
            }
            td = tr.insertCell();
            button = document.createElement("button");
            content = document.createTextNode("Desmarcar");
            button.appendChild(content);
            td.appendChild(button);         
        }
        
    });
    
    
    //FileOperations.writeTemporary("", "./temporaryUserData.json")
}