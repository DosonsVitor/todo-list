var Tasks = [];

document.querySelector("form").addEventListener("submit", event => {
	
	NewTask();

    form.InputTask.value = "";
    form.InputTime.value = null;

	event.preventDefault();
});

function NewTask()
{
    var Task = {
        descricao: form.InputTask.value,
        hora: form.InputTime.value,
        id: gerarId(),
        status: "open" };

    Tasks.unshift(Task);

    UpdateTasks();
}

function UpdateTasks()
{
    var TaskList = document.getElementById("all");
    
    gerarLinhas(TaskList, Tasks);

    ['open', 'closed', 'canceled'].forEach(locale => atualizarLocale(locale));
}

function check(id)
{
    if(Tasks.filter(Task => Task.id == id)[0].status == "open")
    {
        document.getElementById("checkId_"+id).src = "./img/check.png";
        Tasks.filter(Task => Task.id == id)[0].status = "closed";
    }
    else if (Tasks.filter(Task => Task.id == id)[0].status == "closed")
    {
        document.getElementById("checkId_"+id).src = "./img/uncheck.png";
        Tasks.filter(Task => Task.id == id)[0].status = "open";
    }

    UpdateTasks();
}

function cancel(id)
{
    if(Tasks.filter(Task => Task.id == id)[0].status == "canceled")
    {
        Tasks.filter(Task => Task.id == id)[0].status = "closed";
        document.getElementById("cancelId_"+id).src = "./img/cross.png";
        check(id);
    }
    else
    {
        Tasks.filter(Task => Task.id == id)[0].status = "canceled";
        document.getElementById("checkId_"+id).src = "./img/cross_blue.png";
        document.getElementById("cancelId_"+id).src = "./img/up.png";
    }
    UpdateTasks();
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
    UpdateTasks();
}

function atualizarLocale(locale)
{
    var TaskList = document.getElementById(locale);
    gerarLinhas(TaskList, Tasks.filter(Task => Task.status == locale));
}

function gerarLinhas(TaskList, array)
{
    var checkImg, cancelImg;
    TaskList.innerHTML = "";
    array.forEach((Task) => {
        if(Task.status == "open")
        {
            checkImg = "./img/uncheck.png";
            cancelImg = "./img/cross.png";
        }
        else if(Task.status == "closed")
        {
            checkImg = "./img/check.png";
            cancelImg = "./img/cross.png";
        }
        else
        {
            checkImg = "./img/cross_blue.png";
            cancelImg = "./img/up.png"
        }
        TaskList.innerHTML += `
            <li>
            <button onclick="check('${Task.id}')">
                <img id="checkId_${Task.id}" src=${checkImg} alt="icon"/>
            </button>
            <p id="descricao" class="${Task.status}">${Task.descricao}</p>
            <img src="./img/time.png" alt="icon"/>
            <p id="hora">${Task.hora}</p>
            <button onclick="cancel('${Task.id}')"><img id="cancelId_${Task.id}" src=${cancelImg} alt="icon"/></button>
            </li>
        `;
    });
}