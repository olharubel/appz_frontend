import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header.tsx';
import { Col, Container, Row } from 'react-bootstrap';

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        localStorage.removeItem('userId');
        try {
            const response = await fetch('http://ec2-18-192-63-28.eu-central-1.compute.amazonaws.com/User/authenticate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });


            if (response.status !== 200) {
                const error = await response.text();
                alert(`Error: ${error}`);
            }

            const data = await response.json();
            console.log(data);
            console.log(data.isAuthenticated);
            console.log(data.userRole === "patient");
            if (data.isAuthenticated && data.userRole === "patient") {
                localStorage.setItem('userId', data.userId);
                navigate('/', { state: { userId: data.userId } })
            } else {
                alert('Not authenticated');
            }
        } catch (error) {
            alert('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div>
          <Header />
          <Container>
            <Row>
              <Col  style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh"
      }}>
                <div className='w-50'>
                  <h3>Увійти як пацієнт</h3>
                  <div className="mb-3">
                    <label htmlFor="username">Електронна пошта</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password">Пароль</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-grid">
                    <button className="btn btn-primary" onClick={handleLogin}>Увійти</button>
                  </div>
                  <p className="forgot-password text-right">
                    Забули <a href="#">пароль?</a>
                  </p>
                </div>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      );
}

export default Login;