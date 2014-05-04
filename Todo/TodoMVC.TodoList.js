TodoMVC.module('TodoList', function(TodoList, App, Backbone, Marionette, $, _) {

	TodoList.Router = Marionette.AppRouter.extend({\
		appRoutes: {
			'*filter': 'filterItems'
		},
	});


	TodoList.Controller = function(){
		this.todoList = new App.Todos.TodoList();
	};


	_.extend(TodoList.Controller.prototype, {
		start: function(){
			this.showHeader(this.todoList);
			this.showFooter(this.todoList);
			this.showTodoList(this.todoList);

			app.bindTo(this.todoList, 'reset add remove', this.toggleFooter, this);
			this.todoList.fetch();	
		},

		showHeader: function(todoList) {
			var header = new AppLayout.Header({
				collection: todoList
			});

			App.Header.show(header);
		},

		showTodoList: function(todoList) {
			App.main.show(new TodoList.Views.ListView({
				collection:todoList
			}));
		},

		toggleFooter: function(){
			App.footer.$el.toggle(this.todoList.length);
		},

		filterItems: function(filter) {
			App.vent.trigger('todoList:filter', filter.trim() || '');
		}
	});

	TodoList.addInitializer(function() {
		var controller = new TodoList.controller();
		new TodoList.Router({
			controller:controller
		});
	});
});