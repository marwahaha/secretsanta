matches = []
angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
    todoList.todos = [];
    todoList.addTodo = function() {
      todoList.todos.push({name:todoList.n, text:todoList.todoText, done:false});
      todoList.n = '';
      todoList.todoText = '';
    };
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
    todoList.assignment = function() {
      matches = []
      names = todoList.todos
      if (names.length > 0) {
          first = _.sample(names)
          a = first
          while (names.length > 1) {
            names = _.without(names,a)
            b = _.sample(names)
            matches.push([[a.name,a.text],[b.name,b.text]])
            a = b
          }
          matches.push([[a.name,a.text],[first.name,first.text]])
      };
      sendEmails();
      alert("All done!! Check your email!")
    };
  });
