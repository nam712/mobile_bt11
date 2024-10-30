// TodoItem.js
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../redux/todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {/* Ô checkbox */}
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => dispatch(toggleTodo(todo.id))}
      >
        {todo.completed && <Text style={styles.checkmark}>✔</Text>}
      </TouchableOpacity>
      
      {/* Văn bản công việc */}
      <Text style={[styles.text, todo.completed && styles.completed]}>
        {todo.text}
      </Text>

      {/* Nút xóa */}
      <Button title="Delete" onPress={() => dispatch(deleteTodo(todo.id))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10, // Thêm padding để tạo không gian xung quanh
    marginVertical: 5, // Khoảng cách giữa các TodoItem
    backgroundColor: '#f9f9f9', // Màu nền tương tự TodoList
    borderRadius: 5, // Bo góc
    shadowColor: '#000', // Hiệu ứng đổ bóng nhẹ
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2, // Đổ bóng trên Android
  },
  checkbox: { 
    width: 24, 
    height: 24, 
    borderWidth: 1, 
    borderColor: 'gray', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 10 
  },
  checkmark: { color: 'green', fontSize: 18 },
  text: { 
    fontSize: 18, 
    marginLeft: 10, 
    flex: 1, 
    textAlign: 'left' 
  },
  completed: { 
    fontSize: 18, 
    textDecorationLine: 'line-through', 
    color: 'gray', 
    textAlign: 'left'
  },
});

export default TodoItem;
