import axios from "axios";
import { useGlobalState } from "context/useGlobalState";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Forget = () => {
  let token;
  let apiUrl = "https://api.goenergee.ng/api/v1" || process.env.NEXT_APP_API;

  const { resetCredential, setResetCredential } = useGlobalState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post(`${apiUrl}/user/password}`, {
      ...resetCredential,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Sending password reset email...");
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    token = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
  }, []);
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <Row className="justify-content-center w-50">
        <Col lg={12} md={8} sm={10}>
          <div className="bg-white p-5 shadow rounded">
            <h2 className="text-center mb-4 ">Forgot Password</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" onSubmit={handleSubmit}>
                <Form.Label>Code user</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your code user"
                  required
                  onChange={(e) =>
                    setResetCredential({
                      ...resetCredential,
                      codUser: e.target.value,
                    })
                  }
                />
                <Form.Label>currentPwd</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your code user"
                  required
                  onChange={(e) =>
                    setResetCredential({
                      ...resetCredential,
                      currentPwd: e.target.value,
                    })
                  }
                />
                <Form.Label>newPwd</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your code user"
                  required
                  onChange={(e) =>
                    setResetCredential({
                      ...resetCredential,
                      newPwd: e.target.value,
                    })
                  }
                />
                <Form.Text
                  className="text-muted "
                  style={{ fontSize: "12px", marginTop: "5vw" }}
                >
                  We'll send a password reset link to your email.
                </Form.Text>
              </Form.Group>
              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="mt-3"
                >
                  forget password
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Forget;
