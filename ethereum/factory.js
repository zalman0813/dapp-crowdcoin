import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xB3509D5367c824C6B53E5Abc7a40Da57498E5af9'
);

export default instance;