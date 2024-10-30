import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/todoSlice';
import TodoItem from '../components/TodoItem';

const TodoList = () => {
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('All'); // Trạng thái bộ lọc
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleAddTodo = () => {
    if (text) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  // Lọc công việc theo bộ lọc đã chọn
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Completed') return todo.completed;
    if (filter === 'Incomplete') return !todo.completed;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a new todo"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
      
      {/* Bộ lọc */}
      <View style={styles.filterContainer}>
        {['All', 'Completed', 'Incomplete'].map((status) => (
          <TouchableOpacity 
            key={status} 
            onPress={() => setFilter(status)} 
            style={[styles.filterButton, filter === status && styles.activeFilter]}
          >
            <Text>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Danh sách công việc */}
      <FlatList
        data={filteredTodos}
        renderItem={({ item }) => <TodoItem todo={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', },
  input: { borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8,  },
  filterContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10, },
  filterButton: { padding: 10, marginHorizontal: 5, borderRadius: 5, },
  activeFilter: { backgroundColor: '#ddd' ,},
});

export default TodoList;
