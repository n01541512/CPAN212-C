import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TicketList from './pages/TicketList';
import NewTicket from './pages/NewTicket';
import TicketDetail from './pages/TicketDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/new" element={<NewTicket />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
