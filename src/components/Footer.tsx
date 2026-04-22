import { FilterType } from '../types';

interface Props {
  activeCount: number;
  completedCount: number;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

const FILTER_LABELS: Record<FilterType, string> = {
  all: 'すべて',
  active: '未完了',
  completed: '完了済み',
};

export function Footer({
  activeCount,
  completedCount,
  filter,
  onFilterChange,
  onClearCompleted,
}: Props) {
  return (
    <footer className="todo-footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> 件残り
      </span>
      <ul className="todo-filters">
        {(Object.keys(FILTER_LABELS) as FilterType[]).map(f => (
          <li key={f}>
            <button
              className={`filter-btn${filter === f ? ' selected' : ''}`}
              onClick={() => onFilterChange(f)}
            >
              {FILTER_LABELS[f]}
            </button>
          </li>
        ))}
      </ul>
      {completedCount > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          完了を削除 ({completedCount})
        </button>
      )}
    </footer>
  );
}
