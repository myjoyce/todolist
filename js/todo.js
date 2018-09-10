function addList(e) {
  var newTodo = {
    todo: '',
    status: false
  }
  document.getElementById('newTodo').value = document
    .getElementById('newTodo')
    .value.trim()

  if (document.getElementById('newTodo').value === '') {
    alert('内容不得为空！')
    return
  }

  newTodo.todo = document.getElementById('newTodo').value
  // newTodo.status = document.getElementsByClassName('toggle')[]
  todolist.push(newTodo)

  saveData(todolist)
  document.getElementById('newTodo').value = ''
  load() //将用户输入的数据添加至dom节点
  document.getElementById('newTodo').focus()
}

function load() {
  document.getElementById('All').classList.add('selected')
  document.getElementById('Active').classList.remove('selected')
  document.getElementById('Completed').classList.remove('selected')
  var todo = document.getElementById('todolist')
  var unfinished = document.getElementById('unfinished')
  var todoString = ''
  var unFinished = 0
  document.getElementById('newTodo').focus()

  todolist = loadData()

  if (todolist != null) {
    for (var i = 0; i < todolist.length; i++) {
      if (!todolist[i].status) {
        //   let aaa = `,"status", checked=${todolist[i].status})\' >
        // `
        todoString +=
          "<li class='todo' id='todo-" +
          i +
          "'>" +
          "<div class='view' id='view'>" +
          "<input type='checkbox' class='toggle'" +
          "onchange='update(" +
          i +
          ', "status", true)\'>' +
          "<label id='p-" +
          i +
          "' ondblclick='edit(" +
          i +
          ")'>" +
          todolist[i].todo +
          '</label>' +
          "<button class='destroy' onclick='remove(" +
          i +
          ")'></button>" +
          '</div>' +
          '</li>'

        if (!todolist[i].status) {
          unFinished++
        }
      } else {
        todoString +=
          "<li class='todo' id='todo-" +
          i +
          "'>" +
          "<div class='view completed' id='view'>" +
          "<input type='checkbox' class='toggle'" +
          "onchange='update(" +
          i +
          ', "status", false)\' checked>' +
          "<label id='p-" +
          i +
          "' ondblclick='edit(" +
          i +
          ")'>" +
          todolist[i].todo +
          '</label>' +
          "<button class='destroy' onclick='remove(" +
          i +
          ")'></button>" +
          '</div>' +
          '</li>'
      }
    }
    console.log(unFinished + 'unfinished')
    todo.innerHTML = todoString
    unfinished.innerHTML = unFinished
  } else {
    todo.innerHTML = ''
    unfinished.innerHTML = 0
  }
}

function active() {
  document.getElementById('All').classList.remove('selected')
  document.getElementById('Active').classList.add('selected')
  document.getElementById('Completed').classList.remove('selected')
  var todo = document.getElementById('todolist')
  var unfinished = document.getElementById('unfinished')
  var todoString = ''
  var statusString = ''
  var unFinished = 0
  document.getElementById('newTodo').focus()

  todolist = loadData()

  if (todolist != null) {
    for (var i = 0; i < todolist.length; i++) {
      if (!todolist[i].status) {
        //   let aaa = `,"status", checked=${todolist[i].status})\' >
        // `
        todoString +=
          "<li class='todo' id='todo-" +
          i +
          "'>" +
          "<div class='view' id='view'>" +
          "<input type='checkbox' class='toggle'" +
          "onchange='update(" +
          i +
          ', "status", true)\'>' +
          "<label id='p-" +
          i +
          "' ondblclick='edit(" +
          i +
          ")'>" +
          todolist[i].todo +
          '</label>' +
          "<button class='destroy' onclick='remove(" +
          i +
          ")'></button>" +
          '</div>' +
          '</li>'

        if (!todolist[i].status) {
          unFinished++
        }
      }
    }
    console.log(unFinished + 'unfinished')
    todo.innerHTML = todoString
    unfinished.innerHTML = unFinished
  } else {
    todo.innerHTML = ''
    unfinished.innerHTML = 0
  }
}
function completed() {
  document.getElementById('All').classList.remove('selected')
  document.getElementById('Active').classList.remove('selected')
  document.getElementById('Completed').classList.add('selected')

  var todo = document.getElementById('todolist')
  var unfinished = document.getElementById('unfinished')
  var todoString = ''
  var statusString = ''
  var unFinished = 0
  document.getElementById('newTodo').focus()

  todolist = loadData()

  if (todolist != null) {
    for (var i = 0; i < todolist.length; i++) {
      if (todolist[i].status) {
        //   let aaa = `,"status", checked=${todolist[i].status})\' >
        // `
        todoString +=
          "<li class='todo' id='todo-" +
          i +
          "'>" +
          "<div class='view completed' id='view'>" +
          "<input type='checkbox' class='toggle'" +
          "onchange='update(" +
          i +
          ', "status", false)\' checked>' +
          "<label id='p-" +
          i +
          "' ondblclick='edit(" +
          i +
          ")'>" +
          todolist[i].todo +
          '</label>' +
          "<button class='destroy' onclick='remove(" +
          i +
          ")'></button>" +
          '</div>' +
          '</li>'
        // document.getElementById('view').classList.add('completed')
      }
    }
    console.log(unFinished + 'unfinished')
    todo.innerHTML = todoString
  } else {
    todo.innerHTML = ''
    unfinished.innerHTML = 0
  }
}

function edit(i) {
  var p = document.getElementById('todo-' + i),
    pContent = todolist[i].todo,
    inputId
  document.getElementById('todo-' + i).classList.add('editing')
  //通过upadate函数对todolist数组相应项进行更新，将用户输入的内容写入到todolist数组相应项的todo属性中
  function confirm() {
    if (inputId.value.length === 0) {
      p.innerHTML = pContent
      alert('内容不能为空')
    } else {
      update(i, 'todo', inputId.value) //修改事项内容后，更新数组里对应项"todo"属性的值，以便更新dom节点
    }
  }

  //结合keypress事件，按下enter键，调用confirm函数
  function enter(e) {
    if (e.keyCode == 13) {
      confirm()
    }
  }

  p.innerHTML =
    "<input type='text' class='edit' id='input-" +
    i +
    "' value='" +
    pContent +
    "'>"
  inputId = document.getElementById('input-' + i)
  inputId.focus()
  inputId.setSelectionRange(0, inputId.value.length)
  inputId.onblur = confirm //表单控件失去焦点，调用confirm函数，即对页面内容进行更新
  inputId.onkeypress = enter //对按键事件进行监控
}

function update(i, field, value) {
  todolist[i][field] = value

  if (value) {
    document.getElementsByClassName('view')[i].classList.add('completed')
  }
  saveData(todolist)
  load()
}
function remove(i) {
  todolist.splice(i, 1)

  saveData(todolist) //相同名称的缓存会覆盖，更新缓存

  load()
}
function saveData(data) {
  localStorage.setItem('mytodolist', JSON.stringify(data)) //JS对象转换成JSON对象存进本地缓存
}

function loadData() {
  var hisTory = localStorage.getItem('mytodolist')
  if (hisTory != null) {
    return JSON.parse(hisTory) //JSON对象转换为JS对象
  } else {
    return []
  }
}

function clear() {
  todolist = loadData()
  if (todolist != null) {
    for (var i = 0; i < todolist.length; i++) {
      if (todolist[i].status) {
        localStorage.clear(todolist[i])
      }
    }
  }
  load()
}

window.addEventListener('load', load)
document.getElementById('All').onclick = load
document.getElementById('clear').onclick = clear
document.getElementById('Active').onclick = active
document.getElementById('Completed').onclick = completed
document.getElementById('newTodo').onkeypress = function(event) {
  if (event.keyCode === 13) {
    addList()
  }
}
