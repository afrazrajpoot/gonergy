import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
  Image,
} from "react-bootstrap";

const Receipt = () => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API || "https://api.goenergee.ng/api/v1"; // Ensure proper use of NEXT_PUBLIC prefix

  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/payment/5535 7189 9976 0688 2994`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setReceipt(response?.data?.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  if (!receipt) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  console.log(receipt, "if");
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={4}>
          <Card className="shadow border-0">
            <Card.Header as="h3" className="text-center text-success fw-bold">
              Payment Successful!
            </Card.Header>
            <Card.Body className="p-4">
              <Card.Title className="text-muted mb-3">
                Transaction Details
              </Card.Title>
              <Row className="mb-3">
                <Col xs={6} className="text-muted">
                  ID vendor:
                </Col>
                <Col xs={6} className="fw-bold">
                  {receipt.idVendor}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6} className="text-muted">
                  Customer Name:
                </Col>
                <Col xs={6}>
                  <Badge bg="success" pill className="fw-bold">
                    {receipt.customerName}
                  </Badge>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6} className="text-muted">
                  Debit payment:
                </Col>
                <Col xs={6} className="fw-bold">
                  {receipt.debtPayment}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6} className="text-muted">
                  Payment date:
                </Col>
                <Col xs={6}>
                  <Badge bg="success" pill className="fw-bold">
                    {new Date(receipt.paymentDate).toLocaleDateString()}
                  </Badge>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6} className="text-muted">
                  Account:
                </Col>
                <Col xs={6} className="fw-bold">
                  {receipt.account}
                </Col>
              </Row>
              <Card.Footer className="text-center mt-4 text-muted">
                <Image
                  src="/assets/thank-you.svg"
                  alt="Thank you"
                  width="50"
                  className="mb-2"
                />
                <div>Thank you for your payment!</div>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Receipt;
