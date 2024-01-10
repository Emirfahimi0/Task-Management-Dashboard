import { TaskListProvider } from "./context";
import { DashBoard } from "./pages";

function App() {
  return (
    <TaskListProvider>
      <DashBoard />
    </TaskListProvider>
  );
}
export default App;
