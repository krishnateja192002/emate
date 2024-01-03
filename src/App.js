import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/footer/Footer';
import Chat from './components/chat/Chat';
import  { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Footer />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
