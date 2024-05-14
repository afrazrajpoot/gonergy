// import node module libraries
import { Fragment } from "react";
import Link from "next/link";
import { Briefcase, ListTask, People, Bullseye } from "react-bootstrap-icons";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

// import widget/custom components
import { StatRightTopIcon } from "widgets";

// import sub components
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";

// import required data files
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";
import Loading from "./components/Loading";

const Home = () => {
  const apiUrl = "https://api.goenergee.ng/api/v1" || process.env.NEXT_APP_API;
  const wallet = {
    id: 4,
    title: "Wallet Balance",
    value: "76",
    icon: <Bullseye size={18} />,
    //   statInfo: '<span className="text-dark me-2">5%</span> Completed'
  };

  const [status, setShowStatus] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [loading, setShowLoading] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access localStorage only on the client-side
      const ACCESS_TOKEN = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));

      const fetchStatus = async () => {
        setShowLoading(true);
        try {
          const response = await axios.get(`${apiUrl}/vendor/stats`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          });
          setShowStatus(response?.data?.data?.transactions);
          setWalletBalance(response?.data?.data?.wallet_balance);
          setShowLoading(false);
        } catch (error) {
          console.error("Error fetching transactions:", error);
          setShowLoading(false);
        }
      };

      fetchStatus();
    }
  }, []);

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
              opacity="0.5"
            />
            <path
              fill="currentColor"
              d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
            >
              <animateTransform
                attributeName="transform"
                dur="1s"
                from="0 12 12"
                repeatCount="indefinite"
                to="360 12 12"
                type="rotate"
              />
            </path>
          </svg>
        </div>
      ) : (
        <Container fluid className="mt-n22 px-6">
          <Row>
            <Col lg={12} md={12} xs={12}>
              {/* Page header */}
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="mb-2 mb-lg-0">
                    <h3 className="mb-0  text-white">Transactions</h3>
                  </div>
                </div>
              </div>
            </Col>
            {status?.map((item, index) => {
              return (
                <>
                  <Col
                    xl={3}
                    lg={6}
                    md={12}
                    xs={12}
                    className="mt-6"
                    key={index}
                  >
                    <StatRightTopIcon
                      icon={
                        item?.status === "PENDING" ? (
                          <Briefcase />
                        ) : item?.status === "COMPLETED" ? (
                          <People />
                        ) : (
                          <ListTask />
                        )
                      }
                      status={item?.status}
                      count={item?.count}
                    />
                  </Col>
                </>
              );
            })}
            <Col xl={3} lg={6} md={12} xs={12} className="mt-6">
              <StatRightTopIcon
                icon={wallet?.icon}
                status={wallet?.title}
                count={walletBalance}
              />
            </Col>
          </Row>
          <ActiveProjects />
        </Container>
      )}
    </Fragment>
  );
};
export default Home;
