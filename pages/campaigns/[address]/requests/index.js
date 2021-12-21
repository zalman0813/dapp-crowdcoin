import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import Link from "next/link";
import Layout from '@/components/Layout';
import Campaign from '@/ethereum/campaign';
import RequestRow from '@/components/RequestRow';

class ReuqestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequests().call();
        const approversCount = await campaign.methods.approversCount().call();
        const currentAddress = await campaign.methods.getMeTest().call();
        console.log(currentAddress);
        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );

        const approveStatusList = await Promise.all(
            Array(parseInt(requestCount))
            .fill()
            .map((element, index) => {
                return campaign.methods.isApproved(index).call();
            })
        );

        return { address , requests, requestCount, approversCount, approveStatusList };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow 
                    key={index}
                    id={index}
                    request={request}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                    approveStatus={this.props.approveStatusList[index]}
                />
            );
        })
    };

    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <h3>Requests</h3>
                <Link href={{ pathname: '/campaigns/[address]/requests/new',
                              query: { address: this.props.address } }}>
                    <a>
                        <Button primary floated="right" style={{ margin: 10 }}>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipiet</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>
                <div>Found {this.props.requestCount} requests.</div>
            </Layout>
            
        );
    }
}

export default ReuqestIndex;