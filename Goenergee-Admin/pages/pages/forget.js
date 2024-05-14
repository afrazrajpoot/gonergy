import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ResetPassword from "../../widgets/ResetPassword";

const Forget = () => {
  const [codeUser, setCodeUser] = useState("");
  const [otp, setOtp] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCodeUser(e.target.value);
    console.log("Sending password reset email...");
    // Logic to verify code user and toggle otp state
    setOtp(true);
  };

  return (
    <>
      {otp ? (
        <ResetPassword />
      ) : (
        <Container
          fluid
          className="d-flex justify-content-center align-items-center bg-light"
          style={{ minHeight: "100vh" }}
        >
          <Row className="justify-content-center w-50">
            <Col lg={12} md={8} sm={10}>
              <div className="bg-white p-5 shadow rounded">
                <h2 className="text-center mb-4">Forgot Password</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Code user</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your code user"
                      value={codeUser}
                      onChange={(e) => setCodeUser(e.target.value)}
                      required
                    />
                    <Form.Text
                      className="text-muted"
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
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Forget;
