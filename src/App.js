import React, { useState, useEffect } from 'react';
import './App.css';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import TransactionForm from './components/TransactionForm';
import { getProfile, getTransactions, setAuthToken } from './services/api';
import { Tab, Nav } from 'react-bootstrap';

const handleLogout = () => {
  // Hapus token otorisasi
  setAuthToken('');
  // Hapus token dari localStorage
  localStorage.removeItem('token');
  // Lakukan log out lainnya yang perlu dilakukan

  // Memperbarui halaman
  window.location.reload();
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    // Setel token otorisasi jika ada
    isSetToken();
  });

  useEffect(() => {
    // Periksa apakah token ada di dalam localStorage atau sessionStorage
    // const token = localStorage.getItem('token');
    // atau const token = sessionStorage.getItem('token');

    fetchProfileData();
    fetchTransactionData();

    tabBootstrap();
  }, []);

  const isSetToken = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    return token;
  }

  const fetchProfileData = async () => {
    try {
      const profile = await getProfile();
      setProfileData(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchTransactionData = async () => {
    try {
      const transactions = await getTransactions();
      setTransactionData(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const tabBootstrap = async () => {
    const triggerTabList = document.querySelectorAll('#myTab button');
    triggerTabList.forEach((triggerEl) => {
      const tabTrigger = new Tab(triggerEl);

      const handleClick = (event) => {
        event.preventDefault();
        tabTrigger.show();
      };

      triggerEl.addEventListener('click', handleClick);

      return () => {
        triggerEl.removeEventListener('click', handleClick);
      };
    });
  };

  return (
    <div className="App container-fluid my-4">
      <h1>Transaction Portal</h1>
      {isLoggedIn ? (
        <div>
          <div className="login-section">
            {/* <Profile /> */}
            {/* Gunakan nilai profileData di sini */}
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title mb-4">Profile Data</h2>
                {profileData ? (
                  <div>
                    <p>Username: {profileData.username}</p>
                    <p>Name: {profileData.name}</p>
                    <p>Email: {profileData.email}</p>
                    <p>Gender: {profileData.gender}</p>
                  </div>
                ) : (
                  <div>Loading profile...</div>
                )}
              </div>
            </div>
          </div>
          <div className="transaction-section">
            {/* <TransactionList /> */}
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title mb-4">Transaction Form</h2>
                <TransactionForm fetchTransactionData={fetchTransactionData} />
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title mb-4">Transaction List</h2>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total Amount</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionData.map((transaction) => (
                        <tr key={transaction.id}>
                          <td>{transaction.id}</td>
                          <td>{transaction.transaction_date}</td>
                          <td>{transaction.items}</td>
                          <td>{transaction.total_amount}</td>
                          <td>{transaction.payment_status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="logout-section">
            {/* Tombol logout */}
            <button type="button" onClick={handleLogout} className="btn btn-secondary">Logout</button>
          </div>
        </div>
      ) : (
        <div>
          <Tab.Container id="myTab" defaultActiveKey="login">
            <Nav variant="pills" className="custom-nav-pills">
              <Nav.Item>
                <Nav.Link eventKey="login">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="signup">SignUp</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                {/* login */}
                <div className="login-section">
                  <div className="card my-4">
                    <div className="card-body">
                      <h2 className="card-title mb-4">Login Form</h2>
                      <LoginForm fetchProfileData={fetchProfileData} fetchTransactionData={fetchTransactionData} />
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                {/* signup */}
                <div className="signup-section">
                  <div className="card my-4">
                    <div className="card-body">
                      <h2 className="card-title mb-4">SignUp Form</h2>
                      <SignupForm />
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      )}
    </div>
  );
}

export default App;
