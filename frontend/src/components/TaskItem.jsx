import { useState } from 'react';

function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const startEditing = () => {
    setDraft(task.title);
    setEditing(true);
  };

  const saveEdit = async () => {
    const trimmed = draft.trim();
    setEditing(false);
    if (trimmed && trimmed !== task.title) {
      await onUpdate(task._id, { title: trimmed });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.target.blur();
    if (e.key === 'Escape') {
      setDraft(task.title);
      setEditing(false);
    }
  };

  return (
    <li className={`task-item${task.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onUpdate(task._id, { completed: !task.completed })}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      />

      {editing ? (
        <input
          className="edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          aria-label="Edit task title"
          autoFocus
        />
      ) : (
        <div className="task-text">
          <span className="task-title" onDoubleClick={startEditing}>
            {task.title}
          </span>
          <span className="task-date">Added {new Date(task.createdAt).toLocaleString()}</span>
        </div>
      )}

      <div className="actions">
        {!editing && (
          <button className="edit-btn" onClick={startEditing}>
            Edit
          </button>
        )}
        <button className="delete-btn" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
