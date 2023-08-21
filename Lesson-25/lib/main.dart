import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:intl/intl.dart';
import 'package:timezone/timezone.dart' as tz;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  if (kIsWeb) {
    sqfliteFfiInit();
  }

  FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
      FlutterLocalNotificationsPlugin();
  var initializationSettingsAndroid =
      AndroidInitializationSettings('@mipmap/ic_launcher');
  var initializationSettings =
      InitializationSettings(android: initializationSettingsAndroid);
  await flutterLocalNotificationsPlugin.initialize(initializationSettings);

  runApp(MyApp());
}

Future<void> showNotification(
    FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin,
    int id,
    String title,
    String body) async {
  const AndroidNotificationDetails androidPlatformChannelSpecifics =
      AndroidNotificationDetails(
    'your_channel_id',
    'Your Channel Name',
    importance: Importance.max,
    priority: Priority.high,
  );
  const NotificationDetails platformChannelSpecifics =
      NotificationDetails(android: androidPlatformChannelSpecifics);
  await flutterLocalNotificationsPlugin.show(
    id,
    title,
    body,
    platformChannelSpecifics,
    payload: 'item id $id',
  );
}

class Todo {
  final int id;
  final String title;
  final bool isCompleted;
  final DateTime deadline;

  Todo({
    required this.id,
    required this.title,
    required this.isCompleted,
    required this.deadline,
  });

  factory Todo.fromMap(Map<String, dynamic> map) {
    return Todo(
      id: map['id'],
      title: map['title'],
      isCompleted: map['isCompleted'] == 1,
      deadline: DateTime.parse(map['deadline']),
    );
  }
}

class DatabaseHelper {
  static Future<Database> initDB() async {
    final databasesPath = await getDatabasesPath();
    final path = join(databasesPath, 'todo.db');

    return await openDatabase(
      path,
      version: 2,
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE todos (
            id INTEGER PRIMARY KEY,
            title TEXT,
            isCompleted INTEGER,
            deadline TEXT,
          )
        ''');
      },
      onUpgrade: (db, oldVersion, newVersion) async {
        if (oldVersion < 2) {
          await db.execute('ALTER TABLE todos ADD COLUMN deadline TEXT');
        }
      },
    );
  }

  static Future<void> insertTodo(Map<String, dynamic> todo) async {
    final db = await initDB();
    await db.insert('todos', todo);
  }

  static Future<List<Map<String, dynamic>>> getTodos() async {
    final db = await initDB();
    return db.query('todos');
  }
}

class TodoProvider with ChangeNotifier {
  Future<void> addTodo(String title, DateTime deadline) async {
    final todo = {
      'title': title,
      'isCompleted': 0,
      'deadline': deadline.toIso8601String(),
    };
    await DatabaseHelper.insertTodo(todo);

    final reminderDate = deadline.subtract(Duration(days: 1));
    if (reminderDate.isAfter(DateTime.now())) {
      final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
          FlutterLocalNotificationsPlugin();

      final notificationTime = tz.TZDateTime.from(reminderDate, tz.local);
      final androidPlatformChannelSpecifics = AndroidNotificationDetails(
        'your_channel_id',
        'Your Channel Name',
        importance: Importance.max,
        priority: Priority.high,
      );

      final platformChannelSpecifics = NotificationDetails(
        android: androidPlatformChannelSpecifics,
      );

      await flutterLocalNotificationsPlugin.zonedSchedule(
        DateTime.now().millisecondsSinceEpoch,
        'Reminder',
        'Your deadline for "$title" is tomorrow!',
        notificationTime,
        platformChannelSpecifics,
        androidAllowWhileIdle: true,
        payload: 'item id ${DateTime.now().millisecondsSinceEpoch}',
        uiLocalNotificationDateInterpretation:
            UILocalNotificationDateInterpretation.absoluteTime,
        matchDateTimeComponents: DateTimeComponents.time,
      );
    }

    notifyListeners();
  }

  Future<void> deleteTodo(int id) async {
    final db = await DatabaseHelper.initDB();
    await db.delete('todos', where: 'id = ?', whereArgs: [id]);
    notifyListeners();
  }

  Future<void> toggleTodoStatus(int id) async {
    final db = await DatabaseHelper.initDB();
    final todo = await db.query('todos', where: 'id = ?', whereArgs: [id]);
    if (todo.isNotEmpty) {
      final isCompleted = todo.first['isCompleted'] == 0 ? 1 : 0;
      await db.update('todos', {'isCompleted': isCompleted},
          where: 'id = ?', whereArgs: [id]);
      notifyListeners();
    }
  }

  Future<List<Todo>> getTodos() async {
    final todoMaps = await DatabaseHelper.getTodos();
    return todoMaps.map((map) => Todo.fromMap(map)).toList();
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => TodoProvider(),
      child: MaterialApp(
        title: 'Colorful To-Do List',
        theme: ThemeData(
          primarySwatch: Colors.purple,
          hintColor: Colors.teal,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: HomeScreen(),
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('To-Do List'),
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.purple, Colors.blue],
          ),
        ),
        child: TodoListScreen(),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final newTodo = await showDialog(
            context: context,
            builder: (context) => AddTodoDialog(),
          );
          if (newTodo != null) {
            Provider.of<TodoProvider>(context, listen: false).addTodo(
              newTodo['title'],
              newTodo['deadline'],
            );
          }
        },
        child: Icon(Icons.add),
      ),
    );
  }
}

class TodoListScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final todoProvider = Provider.of<TodoProvider>(context);

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                'Task',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
            ),
            Expanded(
              child: FutureBuilder<List<Todo>>(
                future: todoProvider.getTodos(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    return Center(child: Text('Error: ${snapshot.error}'));
                  } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    return Center(child: Text('No todos available.'));
                  } else {
                    return ListView.builder(
                      itemCount: snapshot.data!.length,
                      itemBuilder: (context, index) {
                        final todo = snapshot.data![index];
                        final isTodayDeadline =
                            todo.deadline.year == DateTime.now().year &&
                                todo.deadline.month == DateTime.now().month &&
                                todo.deadline.day == DateTime.now().day;

                        return ListTile(
                          title: Text(
                            todo.title,
                            style: TextStyle(
                              fontSize: 18,
                              color:
                                  todo.isCompleted ? Colors.grey : Colors.black,
                              decoration: todo.isCompleted
                                  ? TextDecoration.lineThrough
                                  : TextDecoration.none,
                            ),
                          ),
                          subtitle: Text(
                            'Deadline: ${DateFormat('EEE, MMM d, yyyy').format(todo.deadline)}',
                            style: TextStyle(
                              color:
                                  isTodayDeadline ? Colors.red : Colors.black54,
                            ),
                          ),
                          trailing: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Checkbox(
                                value: todo.isCompleted,
                                onChanged: (newValue) {
                                  todoProvider.toggleTodoStatus(todo.id);
                                },
                              ),
                              IconButton(
                                icon: Icon(Icons.delete),
                                onPressed: () {
                                  todoProvider.deleteTodo(todo.id);
                                },
                              ),
                            ],
                          ),
                        );
                      },
                    );
                  }
                },
              ),
            ),
          ],
        ),
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
  late DateTime _deadline;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
    _deadline = DateTime.now();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text('Add New Todo'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: _controller,
            decoration: InputDecoration(
              hintText: 'Enter todo title...',
            ),
          ),
          SizedBox(height: 16),
          TextButton(
            onPressed: () async {
              final selectedDate = await showDatePicker(
                context: context,
                initialDate: _deadline,
                firstDate: DateTime.now(),
                lastDate: DateTime.now().add(Duration(days: 365)),
              );
              if (selectedDate != null) {
                setState(() {
                  _deadline = selectedDate;
                });
              }
            },
            child: Text('Select Deadline'),
          ),
        ],
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
              Navigator.pop(
                context,
                {
                  'title': _controller.text,
                  'deadline': _deadline,
                },
              );
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
