// import node module libraries
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Table, Nav, Tab, Container } from 'react-bootstrap';

const Tables = () => {
	const [transactions, setTransactions] = useState(null)
	const [activeKey, setActiveKey] = useState('design');

	// Filter transactions based on the selected tab
  
    const apiUrl = 'https://api.goenergee.ng/api/v1' || process.env.NEXT_APP_API;

    useEffect(() => {
		console.log('apiUrl: ' + apiUrl);
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
                    console.log(response.data?.data);
                } catch (error) {
                    console.error('Error fetching transactions:', error);
                }
            }

            fetchTransactions();
        }
    }, []);

	const filteredTransactions = activeKey === 'design' ? transactions?.filter(transaction => transaction.type === 'PREPAID') : transactions.filter(transaction => transaction.type === '');
	console.log(filteredTransactions, 'transactions');
	return (
		<Container fluid className="p-6">
		<Row>
		  <Col xl={12} lg={12} md={12} sm={12}>
			<div id="responsive-tables" className="mb-4">
			  <h2>Meter</h2>
			</div>
			<Tab.Container activeKey={activeKey} onSelect={key => setActiveKey(key)}>
			  <Card>
				<Card.Header className="border-bottom-0 p-0">
				  <Nav className="nav-lb-tab">
					<Nav.Item>
					  <Nav.Link eventKey="design" className="mb-sm-3 mb-md-0">
						Pre Paid
					  </Nav.Link>
					</Nav.Item>
					<Nav.Item>
					  <Nav.Link onClick={() => setActiveKey('react')} eventKey="react" className="mb-sm-3 mb-md-0">
						Post Paid
					  </Nav.Link>
					</Nav.Item>
				  </Nav>
				</Card.Header>
				<Card.Body className="p-0">
				  <Tab.Content>
					<Tab.Pane eventKey={activeKey && activeKey === 'design' ? 'design' : 'react'} className="pb-4 p-4">
					  <Table responsive className="text-nowrap">
						<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Customer Name</th>
							<th scope="col">Date</th>
							<th scope="col">Meter Type</th>
							<th scope="col">Meter Number</th>
							<th scope="col">Amount</th>
							<th scope="col">Total Amount</th>
							<th scope="col">Commission</th>
							<th scope="col">Token</th>
							<th scope="col">Unit</th>
							<th scope="col">Payment Method</th>
							<th scope="col">Address</th>
							<th scope="col">Main Token Unit</th>
							<th scope="col">Main Token Amount</th>  {/* Render transaction data */}
							  {/* ... */}
							<th scope="col">Main Token Tax</th>
							<th scope="col">BSST Token</th>
							<th scope="col">BSST Token Description</th>
							<th scope="col">BSST Token Units</th>
							<th scope="col">BSST Token Amount</th>
							<th scope="col">Tariff Index</th>
							<th scope="col">Manage</th>
						</tr>
					</thead>
						<tbody>
						  {/* Map over filtered transactions and display */}
						  {filteredTransactions?.map((transaction, index) => (
							<tr key={index}>
							  <th scope="row">{index + 1}</th>
							  <td>{transaction?.customerName}</td>
							  <td>{transaction?.date}</td>
							  <td>{transaction?.type === 'PREPAID' ? 'Prepaid' : 'Postpaid'}</td>
							  <td>{transaction?.meterSerial}</td>
							  <td>{transaction?.unitsPayment}</td>
							  <td>{transaction?.totalPayment}</td>
							  <td>{transaction?.commission}</td>
							  <td>{transaction?.token}</td>
							  <td>{transaction?.units}</td>
							  <td>{transaction?.paymentMethod ? transaction?.paymentMethod : 'card'}</td>
							  <td>{transaction?.tariffDescription}</td>
							  <td>{transaction?.mainTokenUnit}</td>
							  <td>{transaction?.mainTokenAmount}</td>
							  <td>{transaction?.mainTokenTax}</td>
							  <td>{transaction?.bsstToken}</td>
							  <td>{transaction?.bsstTokenDescription}</td>
							  <td>{transaction?.bsstTokenUnits}</td>
							  <td>{transaction?.bsstTokenAmount}</td>
							  <td>{transaction?.tariffIndex}</td>
							</tr>
						  ))}
						</tbody>
					  </Table>
					</Tab.Pane>
				  </Tab.Content>
				</Card.Body>
			  </Card>
			</Tab.Container>
		  </Col>
		</Row>
	  </Container>
	);
};

export default Tables;
{/* <th scope="row">1</th>
<td>Paul Silas</td>
<td>18th April, 2024, 09:07PM</td>
<td>EKEDC (Prepaid)</td>
<td>45700663706</td>
<td>N2,000</td>
<td>N2,100</td>
<td>N100</td>
<td>28035755742154313189</td>
<td>152.5 kWh</td>
<td>Bank Transfer</td>
<td>18 SIMEON street</td>
<td>152.5 kWh</td>
<td>N 9302.33</td>
<td>N 697.67</td>
<td>Not Given</td>
<td>Not Given</td>
<td>Not Given</td>
<td>Not Given</td>
<td>02</td>
<td>Reprint Button</td> */}


