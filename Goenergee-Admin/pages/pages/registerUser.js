// import node module libraries
import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Image,
  Container,
} from "react-bootstrap";
import axios from "axios";

// import widget as custom components
import { FormSelect, DropFiles } from "widgets";

const RegisterUser = () => {
  let ACCESS_TOKEN;
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_phone: "",
    password: "",
  });
  const countryOptions = [
    { value: "India", label: "India" },
    { value: "US", label: "US" },
    { value: "UK", label: "UK" },
    { value: "UAE", label: "UAE" },
  ];
  const submitBasicInfo = async (e) => {
    try {
      const request = await axios.get(`${baseUrl}/user`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return request.data;
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    ACCESS_TOKEN = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
  }, []);
  return (
    <Container fluid className="p-6">
      <Row className="mb-8">
        <Col xl={3} lg={4} md={12} xs={12}>
          <div className="mb-4 mb-lg-0">
            <h4 className="mb-1">Register user</h4>
            <p className="mb-0 fs-5 text-muted">
              Profile configuration settings{" "}
            </p>
          </div>
        </Col>
        <Col xl={9} lg={8} md={12} xs={12}>
          <Card>
            {/* card body */}
            <Card.Body>
              <div className=" mb-6">
                <h4 className="mb-1">Register user</h4>
              </div>

              {/* col */}

              <div>
                {/* border */}

                <Form onSubmit={submitBasicInfo}>
                  {/* row */}
                  <Row className="mb-3">
                    <label
                      htmlFor="fullName"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      First name
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        id="fullName"
                        required
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            first_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        id="lastName"
                        required
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            last_name: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Row>
                  {/* row */}
                  <Row className="mb-3">
                    <label
                      htmlFor="email"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Email
                    </label>
                    <div className="col-md-8 col-12">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        id="email"
                        required
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                      />
                    </div>
                  </Row>
                  {/* row */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="phone">
                      Phone <span className="text-muted">(Optional)</span>
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Enter Phone"
                        id="phone"
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            mobile_phone: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>

                  {/* Location */}

                  {/* Address Line One */}

                  {/* Address Line Two */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                      Password
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Enter Address line 2"
                        id="addressLineTwo"
                        required
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            password: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>

                  {/* Zip code */}
                  <Row className="align-items-center">
                    <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                      <Button variant="primary" type="submit">
                        register
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default RegisterUser;
