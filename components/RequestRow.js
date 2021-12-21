import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '@/ethereum/web3';
import Campaign from '@/ethereum/campaign';
import Router from "next/router";

class RequestRow extends Component {
    state = {
        approveLoading: false,
        finalizeLoading: false
    };

    onApprove = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();

        this.setState({ approveLoading: true });

        try {
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            });
            Router.reload();
        } catch (error) {}
        
        this.setState({ approveLoading: false });
    };

    onFinalize = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        this.setState({ loading: true });

        try {
            await campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            });
            Router.reload();
        } catch (error) {}
        
        this.setState({ loading: false });
    };
    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount, approveStatus } = this.props;
        const readyToFinalize = request.approvalCount > approversCount / 2;
        // const approved = approveStatus
        console.log(approveStatus);
        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value ,'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    {request.complete ? null : (
                        approveStatus ? (
                        <Button color="red" basic >
                        Approved
                        </Button>) : ( 
                        <Button color="green" basic onClick={this.onApprove} loading={this.state.approveLoading}>
                        Approve
                        </Button>)
                    )}
                </Cell>
                <Cell>
                    {request.complete ? null: (
                        <Button color="teal" basic onClick={this.onFinalize} loading={this.state.finalizeLoading}>
                            Finalize
                        </Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;