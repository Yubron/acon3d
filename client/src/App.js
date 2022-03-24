import { Route, Routes } from "react-router-dom";
import GuestPage from "./pages/Guest.page";
import styled from "styled-components"
import WriterPage from "./pages/Writer.page";
import EditorPage from "./pages/Editor.page";
import Header from "./pages/Header.page";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<GuestPage />} />
        <Route path="/writer" element={<WriterPage/>} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: 100px;
`

