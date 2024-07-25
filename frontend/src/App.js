import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute'
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';
import PageNotFound from './pages/PageNotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/new-ticket' element={<PrivateRoute><NewTicket /></PrivateRoute>} />
          <Route path='/tickets' element={<PrivateRoute><Tickets /></PrivateRoute>} />
          <Route path='/ticket/:ticketId' element={<PrivateRoute><Ticket /></PrivateRoute>} />
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
