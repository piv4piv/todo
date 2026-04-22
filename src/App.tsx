import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

function App() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  } = useTodos();

  const allCompleted = allTodos.length > 0 && allTodos.every(t => t.completed);

  return (
    <div className="app">
      <header className="app-header">
        <h1>todos</h1>
      </header>
      <main className="app-main">
        <TodoInput
          onAdd={addTodo}
          onToggleAll={() => toggleAll(allTodos)}
          allCompleted={allCompleted}
          hasTodos={allTodos.length > 0}
        />

        {/* フィルター後にTODOがある場合のみリストを表示 */}
        {todos.length > 0 && (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        )}

        {/* フィルターで絞り込んだ結果が空だが、TODOは存在する場合 */}
        {todos.length === 0 && allTodos.length > 0 && (
          <div className="empty-filter">
            <p>このフィルターに該当するTODOはありません</p>
          </div>
        )}

        {/* TODOが1件もない場合 */}
        {allTodos.length === 0 && (
          <div className="empty-state">
            <p>タスクを追加してみましょう！</p>
          </div>
        )}

        {/* フッターはTODOが1件以上ある場合のみ表示 */}
        {allTodos.length > 0 && (
          <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}
      </main>
    </div>
  );
}

export default App;
