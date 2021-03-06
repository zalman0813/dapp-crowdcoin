import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '@/components/Layout';
import Campaign from '@/ethereum/campaign';
import web3 from '@/ethereum/web3';
import ContributionForm from '@/components/ContributeForm';
import Link from "next/link";

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();
        

        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 
                    'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to bevcome an approver'
            },
            {
                header: requestCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has'
            }
        ];

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                            
                        </Grid.Column>

                        <Grid.Column width={6}>
                        <ContributionForm address={this.props.address } />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link href={{ pathname: '/campaigns/[address]/requests',
                                  query: { address: this.props.address } }}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                    
                </Grid>
                
                
            </Layout>
        )
    }
}

export default CampaignShow;