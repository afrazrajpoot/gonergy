// import node module libraries
import { useEffect, useState } from "react";

import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import axios from "axios";

// import widget as custom components
import { FormSelect, DropFiles } from "widgets";

const GeneralSetting = () => {
  let ACCESS_TOKEN;
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });
  const countryOptions = [
    { value: "India", label: "India" },
    { value: "US", label: "US" },
    { value: "UK", label: "UK" },
    { value: "UAE", label: "UAE" },
  ];
  const submitBasicInfo = async (e) => {
    try {
      const request = await axios.get(`${baseUrl}/user`, {
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
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">General Setting</h4>
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
              <h4 className="mb-1">General Settings</h4>
            </div>
            <Row className="align-items-center mb-8">
              <Col md={3} className="mb-3 mb-md-0">
                <h5 className="mb-0">Avatar</h5>
              </Col>
              <Col md={9}>
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <Image
                      src="/images/avatar/avatar-5.jpg"
                      className="rounded-circle avatar avatar-lg"
                      alt=""
                    />
                  </div>
                  <div>
                    <Button
                      variant="outline-white"
                      className="me-2"
                      type="submit"
                    >
                      Change{" "}
                    </Button>
                    <Button variant="outline-white" type="submit">
                      Remove{" "}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            {/* col */}
            <Row className="mb-8">
              <Col md={3} className="mb-3 mb-md-0">
                {/* heading */}
                <h5 className="mb-0">Cover photo</h5>
              </Col>
              <Col md={9}>
                {/* dropzone input */}
                <div>
                  <Form
                    action="#"
                    className="dropzone mb-3 py-10 border-dashed"
                  >
                    <DropFiles />
                  </Form>
                  <Button variant="outline-white" type="submit">
                    Change{" "}
                  </Button>
                </div>
              </Col>
            </Row>
            <div>
              {/* border */}
              <div className="mb-6">
                <h4 className="mb-1">Basic information</h4>
              </div>
              <Form onSubmit={submitBasicInfo}>
                {/* row */}
                <Row className="mb-3">
                  <label
                    htmlFor="fullName"
                    className="col-sm-4 col-form-label
                    form-label"
                  >
                    Full name
                  </label>
                  <div className="col-sm-4 mb-3 mb-lg-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      id="fullName"
                      required
                      onChange={(e) =>
                        setUserData({ ...userData, firstName: e.target.value })
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
                        setUserData({ ...userData, lastName: e.target.value })
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
                        setUserData({ ...userData, phone: e.target.value })
                      }
                    />
                  </Col>
                </Row>

                {/* Location */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="country">
                    Location
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      as={FormSelect}
                      placeholder="Select Country"
                      id="country"
                      options={countryOptions}
                      onChange={(e) =>
                        setUserData({ ...userData, country: e.value })
                      }
                    />
                  </Col>
                </Row>

                {/* Address Line One */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="addressLine">
                    Address line 1
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Address line 1"
                      id="addressLine"
                      required
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          addressLineOne: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>

                {/* Address Line Two */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                    Address line 2
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
                          addressLineTwo: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>

                {/* Zip code */}
                <Row className="align-items-center">
                  <Form.Label className="col-sm-4" htmlFor="zipcode">
                    Zip code
                    <i className="fe fe-info fs-4 me-2 text-muted icon-xs"></i>
                  </Form.Label>

                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Zip code"
                      id="zipcode"
                      required
                      onChange={(e) =>
                        setUserData({ ...userData, zipCode: e.target.value })
                      }
                    />
                  </Col>

                  <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralSetting;
