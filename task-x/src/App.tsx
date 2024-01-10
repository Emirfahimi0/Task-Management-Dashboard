import { TaskListProvider } from "./context";
import { TaskListComponent } from "./pages/TaskList/TaskListComponent";

function App() {
  return (
    <TaskListProvider>
      <TaskListComponent />
    </TaskListProvider>
  );
}
export default App;
