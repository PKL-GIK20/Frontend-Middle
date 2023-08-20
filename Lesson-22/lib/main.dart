import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class Todo {
  final String title;
  late bool isCompleted;

  Todo({
    required this.title,
    this.isCompleted = false,
  });

  void toggleCompletion() {
    isCompleted = !isCompleted;
  }
}

class TodoProvider with ChangeNotifier {
  List<Todo> _todos = [];

  List<Todo> get todos => _todos;

  void addTodo(String title) {
    _todos.add(Todo(title: title));
    notifyListeners();
  }

  void toggleTodoStatus(int index) {
    final updatedTodo = Todo(
      title: _todos[index].title,
      isCompleted: !_todos[index].isCompleted,
    );
    _todos[index] = updatedTodo;
    notifyListeners();
  }

  void deleteTodo(int index) {
    _todos.removeAt(index);
    notifyListeners();
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => TodoProvider(),
      child: MaterialApp(
        title: 'Coffee-Themed Todo List',
        theme: ThemeData(
          primarySwatch: Colors.brown,
          hintColor: Colors.amber,
        ),
        home: StartScreen(),
      ),
    );
  }
}

class StartScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/perpus.jpg'),
            fit: BoxFit.cover,
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Selamat datang di',
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  shadows: [
                    Shadow(
                      color: Colors.black,
                      blurRadius: 2,
                      offset: Offset(1, 1),
                    ),
                  ],
                ),
              ),
              Text(
                'Aplikasi To-DO List',
                style: TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  shadows: [
                    Shadow(
                      color: Colors.black,
                      blurRadius: 2,
                      offset: Offset(1, 1),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (context) => TodoListScreen()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  primary: Colors.amber, // Warna tombol
                  textStyle:
                      TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                child: Text('Mulai'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class TodoListScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final todoProvider = Provider.of<TodoProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Todo List'),
      ),
      body: ListView.builder(
        itemCount: todoProvider.todos.length,
        itemBuilder: (context, index) {
          final todo = todoProvider.todos[index];
          return Card(
            elevation: 4,
            margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: ListTile(
              title: Text(
                todo.title,
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  decoration: todo.isCompleted
                      ? TextDecoration.lineThrough
                      : TextDecoration.none,
                ),
              ),
              leading: Checkbox(
                value: todo.isCompleted,
                onChanged: (_) {
                  todoProvider.toggleTodoStatus(index);
                },
              ),
              trailing: IconButton(
                icon: Icon(Icons.delete),
                onPressed: () {
                  todoProvider.deleteTodo(index);
                },
              ),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final newTodoTitle = await showDialog(
            context: context,
            builder: (context) => AddTodoDialog(),
          );
          if (newTodoTitle != null) {
            todoProvider.addTodo(newTodoTitle);
          }
        },
        child: Icon(Icons.add),
      ),
    );
  }
}

class AddTodoDialog extends StatefulWidget {
  @override
  _AddTodoDialogState createState() => _AddTodoDialogState();
}

class _AddTodoDialogState extends State<AddTodoDialog> {
  late TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text('Add New Todo'),
      content: TextField(
        controller: _controller,
        decoration: InputDecoration(
          hintText: 'Enter todo title...',
        ),
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.pop(context, null);
          },
          child: Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: () {
            if (_controller.text.trim().isNotEmpty) {
              Navigator.pop(context, _controller.text);
            }
          },
          child: Text('Add'),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
