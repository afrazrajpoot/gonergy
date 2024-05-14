import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import Link from "next/link";

const Login = () => {
  let ACCESS_TOKEN;
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const submitBasicInfo = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.get(`${baseUrl}/user`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      // handle successful response
      console.log(request.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    ACCESS_TOKEN = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
  }, []);

  return (
    <Container
      fluid
      className="p-6"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        marginTop: "-7vw",
      }}
    >
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Col lg={6} md={8} sm={10}>
          <Card className="shadow p-4">
            <div className="text-center mb-4">
              <h4 className="mb-1">Login</h4>
              <p className="text-muted">Please enter your credentials</p>
            </div>
            {error && (
              <Alert
                variant="danger"
                onClose={() => setError(null)}
                dismissible
              >
                {error}
              </Alert>
            )}
            <Form onSubmit={submitBasicInfo}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Button variant="primary" type="submit">
                  Login
                </Button>
                <Link href="/pages/forget" className="text-decoration-none">
                  Forgot password?
                </Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
