import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  // 編集モードに入ったらインプットにフォーカス
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(todo.text);
  };

  const handleEditSubmit = () => {
    onEdit(todo.id, editValue);
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      // Escape で編集キャンセル
      setEditValue(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={`todo-item${todo.completed ? ' completed' : ''}${isEditing ? ' editing' : ''}`}
    >
      {!isEditing ? (
        <div className="todo-view">
          <input
            className="todo-checkbox"
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            id={`todo-${todo.id}`}
          />
          <label
            htmlFor={`todo-${todo.id}`}
            className="todo-label"
            onDoubleClick={handleDoubleClick}
          >
            {todo.text}
          </label>
          <button
            className="todo-delete"
            onClick={() => onDelete(todo.id)}
            title="削除"
            aria-label="削除"
          >
            ×
          </button>
        </div>
      ) : (
        <input
          ref={inputRef}
          className="todo-edit"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onKeyDown={handleEditKeyDown}
          onBlur={handleEditSubmit}
        />
      )}
    </li>
  );
}
