import { useState, KeyboardEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
  onToggleAll: () => void;
  allCompleted: boolean;
  hasTodos: boolean;
}

export function TodoInput({ onAdd, onToggleAll, allCompleted, hasTodos }: Props) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAdd(value);
      setValue('');
    }
  };

  return (
    <div className="todo-input-container">
      {hasTodos && (
        <button
          className={`toggle-all ${allCompleted ? 'completed' : ''}`}
          onClick={onToggleAll}
          title="全て完了/未完了に切り替え"
          aria-label="全て完了/未完了に切り替え"
        >
          ❯
        </button>
      )}
      <input
        className="todo-input"
        type="text"
        placeholder="新しいタスクを入力..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}
