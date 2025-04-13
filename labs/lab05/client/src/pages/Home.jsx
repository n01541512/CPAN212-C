import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Ticketing System</h1>
      <Link to="/tickets">View Tickets</Link> | <Link to="/new">Create Ticket</Link>
    </div>
  );
};

export default Home;
