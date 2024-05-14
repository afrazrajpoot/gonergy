// import node module libraries
import Link from 'next/link';
import { ProgressBar, Col, Row, Card, Table, Image } from 'react-bootstrap';

// import required data files
import ActiveProjectsData from "data/dashboard/ActiveProjectsData";
import { useEffect, useState } from 'react';
import axios from 'axios';

const ActiveProjects = () => {
    const [transactions, setTransactions] = useState(null)
    const apiUrl = 'https://api.goenergee.ng/api/v1' || process.env.NEXT_APP_API;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Access localStorage only on the client-side
            const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

            const fetchTransactions = async () => {
                try {
                    const response = await axios.post(
                        `${apiUrl}/venodr/transactions`,
                        {
                            passWord: 'thisiisnewgeneratedpasswrodfortest#12344',
                            dateFrom: 1711789265482,
                            dateTo: 1711989265999
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${ACCESS_TOKEN}`
                            }
                        }
                    );
                    setTransactions(response?.data?.data);
                    // console.log(response.data);
                } catch (error) {
                    console.error('Error fetching transactions:', error);
                }
            }

            fetchTransactions();
        }
    }, []);

    return (
        <Row className="mt-6">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">Transactions</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>S/N</th>
                                <th>Biller</th>
                                <th>Customer Name</th>
                                <th>Service Description</th>
                                <th>Meter Type</th>
                                <th>Meter Number</th>
                                <th>Amount</th>
                                <th>Total Amount</th>
                                <th>Commission</th>
                                <th>Transaction ID</th>
                                <th>Payment ID</th>
                                <th>Payment Channel</th>
                                <th>Wallet Balance</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className={`icon-shape icon-md border p-4 rounded-1 ${item?.brandLogoBg}`}>
                                                        <Image src={item?.brandLogo} alt="" />
                                                    </div>
                                                </div>
                                                <div className="ms-3 lh-1">
                                                    <h5 className=" mb-1">
                                                        <Link href="#" className="text-inherit">{item?.projectName}</Link></h5>
                                                </div>
                                            </div>
                                        </td>
                                  <td className="align-middle">{item?.account}</td>
                                        {/* <td className="align-middle"><span className={`badge bg-${item?.priorityBadgeBg}`}>{item?.priority}</span></td> */}
                                        <td className="align-middle">{item?.customerName}</td>
                                        <td className="align-middle">
                                            <div className="avatar-group">
                                                {item?.members?.map((avatar, avatarIndex) => {
                                                    return (
                                                        <span className="avatar avatar-sm" key={avatarIndex}>
                                                            <Image alt="avatar" src={avatar?.image} className="rounded-circle" />
                                                        </span>
                                                    )
                                                })}
                                                <span className="avatar avatar-sm avatar-primary">
                                                    <span className="avatar-initials rounded-circle fs-6">+5</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="align-middle">{item?.type ? item?.type : 'N/A'}</td>
                                        <td className="align-middle">{item?.meterSerial}</td>
                                        <td className="align-middle">{item?.unitsPayment}</td>
                                        <td className="align-middle">{item?.totalPayment}</td>
                                        <td className="align-middle">{item?.commission}</td>
                                        <td className="align-middle">{item?.id}</td>
                                        <td className="align-middle">{item?.paymentDate}</td>
                                        <td className="align-middle">{item?.tariffDescription}</td>
                                        <td className="align-middle">{item?.accountBalance}</td>
                                        <td className="align-middle">{item?.status ? item?.status : 'N/A'}</td>
                                        <td className="align-middle"><span className={`badge bg-${item?.priorityBadgeBg}`}>{item?.priority}</span></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                  
                </Card>
            </Col>
        </Row>
    )
}

export default ActiveProjects