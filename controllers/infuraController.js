const { ethers } = require('ethers');
require('dotenv').config();


const getInfuraProvider = () => {
    const infuraRpcUrl = process.env.Infura_URL_Polygone //' https://polygon-mainnet.infura.io/v3/f09fc916f9a046a8a62d9e2d00229b55';
    return new ethers.providers.JsonRpcProvider(infuraRpcUrl);
};

const getInfuraPrivateKey = () => {
    return process.env.Infura_Private_Key;
};

module.exports = {
    getInfuraProvider,
    getInfuraPrivateKey,
};
