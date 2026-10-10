import TaskItem from './TaskItem';

function TaskList({ tasks, onUpdate, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">Your list is empty. Add a task above!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
