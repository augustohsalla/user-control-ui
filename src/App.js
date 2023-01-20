import { Route, Routes } from "react-router-dom";
import UserForm from "./Page/UserForm";
import UsersPage from "./Page/UsersPage";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="create-user" element={<UserForm />} />
        </Routes>
    </div>
  );
}

export default App;
