import { TaskListProvider } from "./context";
import { TaskListComponent } from "./Public/TaskListComponent";

function App() {
  return (
    <TaskListProvider>
      <TaskListComponent />
    </TaskListProvider>
  );
}
export default App;
