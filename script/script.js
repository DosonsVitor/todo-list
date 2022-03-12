var tarefas = [];

atualizarTarefas();

document.querySelector("form").addEventListener("submit", event => {
	
	novaTarefa();

    form.inputTarefa.value = "";
    form.inputHora.value = null;

	event.preventDefault();
});

function novaTarefa()
{
    const listaTarefas = document.getElementById("lista_tarefas");

    var tarefa = {
        descricao: form.inputTarefa.value,
        hora: form.inputHora.value,
        id: gerarId(),
        status: "open" };

    tarefas.unshift(tarefa);

    atualizarTarefas();
}

function atualizarTarefas()
{
    var listaTarefas = document.getElementById("all");
    
    gerarLinhas(listaTarefas, tarefas);

    ['open', 'closed', 'canceled'].forEach(locale => atualizarLocale(locale));
}

function check(id)
{
    if(tarefas.filter(tarefa => tarefa.id == id)[0].status == "open")
    {
        document.getElementById("checkId_"+id).src = "./img/check.png";
        tarefas.filter(tarefa => tarefa.id == id)[0].status = "closed";
    }
    else if (tarefas.filter(tarefa => tarefa.id == id)[0].status == "closed")
    {
        document.getElementById("checkId_"+id).src = "./img/uncheck.png";
        tarefas.filter(tarefa => tarefa.id == id)[0].status = "open";
    }

    atualizarTarefas();
}

function cancel(id)
{
    if(tarefas.filter(tarefa => tarefa.id == id)[0].status == "canceled")
    {
        tarefas.filter(tarefa => tarefa.id == id)[0].status = "closed";
        document.getElementById("cancelId_"+id).src = "./img/cross.png";
        check(id);
    }
    else
    {
        tarefas.filter(tarefa => tarefa.id == id)[0].status = "canceled";
        document.getElementById("checkId_"+id).src = "./img/cross_blue.png";
        document.getElementById("cancelId_"+id).src = "./img/up.png";
    }
    atualizarTarefas();
}

function gerarId()
{
    var id = Math.floor(Date.now() * Math.random()).toString(36);
    return id;
}

function change(locale)
{
    document.getElementById("all").style.display = 'none';
    document.getElementById("open").style.display = 'none';
    document.getElementById("closed").style.display = 'none';
    document.getElementById("canceled").style.display = 'none';
    
    document.getElementById(locale).style.display = 'block';

    atualizarLocale(locale);
    atualizarTarefas();
}

function atualizarLocale(locale)
{
    var listaTarefas = document.getElementById(locale);
    gerarLinhas(listaTarefas, tarefas.filter(tarefa => tarefa.status == locale));
}

function gerarLinhas(listaTarefas, array)
{
    var checkImg, cancelImg;
    listaTarefas.innerHTML = "";
    array.forEach((tarefa) => {
        if(tarefa.status == "open")
        {
            checkImg = "./img/uncheck.png";
            cancelImg = "./img/cross.png";
        }
        else if(tarefa.status == "closed")
        {
            checkImg = "./img/check.png";
            cancelImg = "./img/cross.png";
        }
        else
        {
            checkImg = "./img/cross_blue.png";
            cancelImg = "./img/up.png"
        }
        listaTarefas.innerHTML += `
            <li>
            <button onclick="check('${tarefa.id}')">
                <img id="checkId_${tarefa.id}" src=${checkImg} alt="icon"/>
            </button>
            <p id="descricao" class="${tarefa.status}">${tarefa.descricao}</p>
            <img src="./img/time.png" alt="icon"/>
            <p id="hora">${tarefa.hora}</p>
            <button onclick="cancel('${tarefa.id}')"><img id="cancelId_${tarefa.id}" src=${cancelImg} alt="icon"/></button>
            </li>
        `;
    });
}