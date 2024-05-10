const { ethers } = require('ethers');
const fs = require('fs');
const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_KEY");

const Bot = require('grammy').Bot;

const bot = new Bot('YOUR_KEY')

const chats = JSON.parse(fs.readFileSync('chats.json', 'utf8'));

const whitelistContractAddress = "0xF55684BC536487394B423e70567413faB8e45E26";
const dst1inchContractAddress = "0xAccfAc2339e16DC80c50d2fa81b5c2B049B4f947";
const mainContractABI = [{"inputs":[{"internalType":"contract IVotable","name":"token_","type":"address"},{"internalType":"uint256","name":"resolverPercentageThreshold_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyRegistered","type":"error"},{"inputs":[],"name":"BalanceLessThanThreshold","type":"error"},{"inputs":[],"name":"ETHTransferFailed","type":"error"},{"inputs":[],"name":"IndexOutOfBounds","type":"error"},{"inputs":[],"name":"InsufficientBalance","type":"error"},{"inputs":[],"name":"NotWhitelisted","type":"error"},{"inputs":[],"name":"OutputArrayTooSmall","type":"error"},{"inputs":[],"name":"PopFromEmptyArray","type":"error"},{"inputs":[],"name":"SafeTransferFailed","type":"error"},{"inputs":[],"name":"SamePromotee","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"promoter","type":"address"},{"indexed":false,"internalType":"uint256","name":"chainId","type":"uint256"},{"indexed":false,"internalType":"address","name":"promotee","type":"address"}],"name":"Promotion","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addr","type":"address"}],"name":"Registered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"resolverPercentageThreshold","type":"uint256"}],"name":"ResolverPercentageThresholdSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addr","type":"address"}],"name":"Unregistered","type":"event"},{"inputs":[],"name":"BASIS_POINTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"clean","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"chainId","type":"uint256"}],"name":"getPromotees","outputs":[{"internalType":"address[]","name":"promotees","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWhitelist","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"address","name":"promotee","type":"address"}],"name":"promote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"promotions","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token_","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"resolverPercentageThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"resolverPercentageThreshold_","type":"uint256"}],"name":"setResolverPercentageThreshold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IVotable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]; // Add ABI for main contract
// farmingContractABI contains both functions for farmingPod and multiFarmingPod
const singleFarmingContractABI = [{"inputs":[{"internalType":"contract IERC20Pods","name":"farmableToken_","type":"address"},{"internalType":"contract IERC20","name":"rewardsToken_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessDenied","type":"error"},{"inputs":[],"name":"AmountTooLarge","type":"error"},{"inputs":[],"name":"DurationTooLarge","type":"error"},{"inputs":[],"name":"SafeTransferFailed","type":"error"},{"inputs":[],"name":"SafeTransferFromFailed","type":"error"},{"inputs":[],"name":"SameDistributor","type":"error"},{"inputs":[],"name":"ZeroDistributorAddress","type":"error"},{"inputs":[],"name":"ZeroDuration","type":"error"},{"inputs":[],"name":"ZeroFarmableTokenAddress","type":"error"},{"inputs":[],"name":"ZeroRewardsTokenAddress","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldDistributor","type":"address"},{"indexed":false,"internalType":"address","name":"newDistributor","type":"address"}],"name":"DistributorChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"reward","type":"address"}],"name":"FarmCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"RewardAdded","type":"event"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmInfo","outputs":[{"components":[{"internalType":"uint40","name":"finished","type":"uint40"},{"internalType":"uint32","name":"duration","type":"uint32"},{"internalType":"uint184","name":"reward","type":"uint184"}],"internalType":"struct FarmAccounting.Info","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"farmed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token_","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"distributor_","type":"address"}],"name":"setDistributor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"period","type":"uint256"}],"name":"startFarming","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20Pods","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"updateBalances","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const multiFarmingContractABI = [{"inputs":[{"internalType":"contract IERC20Pods","name":"farmableToken_","type":"address"},{"internalType":"uint256","name":"rewardsTokensLimit_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessDenied","type":"error"},{"inputs":[],"name":"AmountTooLarge","type":"error"},{"inputs":[],"name":"DurationTooLarge","type":"error"},{"inputs":[],"name":"OutputArrayTooSmall","type":"error"},{"inputs":[],"name":"RewardsTokenAlreadyAdded","type":"error"},{"inputs":[],"name":"RewardsTokenNotFound","type":"error"},{"inputs":[],"name":"RewardsTokensLimitReached","type":"error"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"RewardsTokensLimitTooHigh","type":"error"},{"inputs":[],"name":"SafeTransferFailed","type":"error"},{"inputs":[],"name":"SafeTransferFromFailed","type":"error"},{"inputs":[],"name":"SameDistributor","type":"error"},{"inputs":[],"name":"ZeroDuration","type":"error"},{"inputs":[],"name":"ZeroFarmableTokenAddress","type":"error"},{"inputs":[],"name":"ZeroRewardsTokenAddress","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldDistributor","type":"address"},{"indexed":false,"internalType":"address","name":"newDistributor","type":"address"}],"name":"DistributorChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"reward","type":"address"}],"name":"FarmCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"RewardAdded","type":"event"},{"inputs":[{"internalType":"address","name":"rewardsToken","type":"address"}],"name":"addRewardsToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"rewardsToken","type":"address"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"rewardsToken","type":"address"}],"name":"farmInfo","outputs":[{"components":[{"internalType":"uint40","name":"finished","type":"uint40"},{"internalType":"uint32","name":"duration","type":"uint32"},{"internalType":"uint184","name":"reward","type":"uint184"}],"internalType":"struct FarmAccounting.Info","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"rewardsToken","type":"address"},{"internalType":"address","name":"account","type":"address"}],"name":"farmed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardsTokens","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsTokensLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"distributor_","type":"address"}],"name":"setDistributor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"rewardsToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"period","type":"uint256"}],"name":"startFarming","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20Pods","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"updateBalances","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const dst1inchContractABI =[{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"contract St1inch","name":"st1inch","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessDenied","type":"error"},{"inputs":[],"name":"AlreadyRegistered","type":"error"},{"inputs":[],"name":"ApproveDisabled","type":"error"},{"inputs":[],"name":"DefaultFarmTokenMismatch","type":"error"},{"inputs":[],"name":"NotRegisteredDelegatee","type":"error"},{"inputs":[],"name":"OriginInTheFuture","type":"error"},{"inputs":[],"name":"TransferDisabled","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"defaultFarm","type":"address"}],"name":"DefaultFarmSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"address","name":"delegatee","type":"address"}],"name":"Delegated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"delegatee","type":"address"}],"name":"RegisterDelegatee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"defaultFarms","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"delegated","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"expBase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"maxSharePods","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"origin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"name":"register","outputs":[{"internalType":"contract IDelegatedShare","name":"shareToken","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"registration","outputs":[{"internalType":"contract IDelegatedShare","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"farm","type":"address"}],"name":"setDefaultFarm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sharePodGasLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20Pods","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"updateBalances","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"votingPowerOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const mainContract = new ethers.Contract(whitelistContractAddress, mainContractABI, provider);
const dst1inchContract = new ethers.Contract(dst1inchContractAddress, dst1inchContractABI, provider);

const whitelistToName = {
    '0xA260f8b7c8F37C2f1bC11b04c19902829De6ac8A': 'Arctic Bastion',
    '0xd7f6F541D4210550ca56f7b4C4A549EFD4CAFb49': 'The T Resolver',
    '0xE023f53f735c196e4a028233C2ee425957812a41': 'Seawise',
    '0xf63392356A985ead50B767A3E97a253fF870E91a': '1inch Labs Resolver',
    '0xDcdf16a03360d4971CA4C1fD9967a47125F3C995': 'Rizzolver',
    '0x05D18b713DaB812C34edB48c76cD9C836D56752b': 'Propeller Swap',
    '0x1113DB6080ea2B9f92B2e9937ea712b3d730b3F1': 'Clipper'
}

fs.writeFileSync('whitelistToNames.json', JSON.stringify(whitelistToName, null, 2));

function updateWhitelistNames(){
    // read from the ./whitelistToNames.json file to update the whitelistToName object without having to restart the bot
    const file = JSON.parse(fs.readFileSync('whitelistToNames.json', 'utf8'));
    for (const [key, value] of Object.entries(file)) {
        whitelistToName[key] = value;
    }
}

const multiFarmingPodFilter = {
    topics: [
        '0x6a6f77044107a33658235d41bedbbaf2fe9ccdceb313143c947a5e76e1ec8474', // RewardAdded(address token, uint duration, uint256 amount)
        '0x000000000000000000000000111111111117dc0aa78b770fa6a738034120c302' // rewardsToken
    ]
}

const farmingPodFilter = {
    topics: [
        '0x6c07ee05dcf262f13abf9d87b846ee789d2f90fe991d495acd7d7fc109ee1f55' // RewardAdded(uint duration, uint256 amount)
    ]
}

const whitelistFilter = {
    topics: [
        // this is an OR filter for topic[0]
        [ 
            '0x2d3734a8e47ac8316e500ac231c90a6e1848ca2285f40d07eaa52005e4b3a0e9', // Registered(address addr)
            '0x75cd6de711483e11488a1cd9b66172abccb9e5c19572f92015a7880f0c8c0edc', // Unregistered(address addr)
        ]   
    ]
}

const TWAD = {
    /*
    '0xA260f8b7c8F37C2f1bC11b04c19902829De6ac8A': {
        1630000000: 5.1,
        1630000001: 5.2,
        1630000002: 5.1,
        1630000003: 5.1,
        1630000004: 5.13,
    }
    */
} // time weighted average delegation

let farmData = {};
let notificationsSentForFarmEnding = {}; // for each given farm, we'll keep track if we've sent a notification already
let notificationsSentForFarmEndingSoon = {}; // for each given farm, we'll keep track if we've sent a notification already
let notificationsSentForBelowThreshold = {}; // for each given farm, we'll keep track if we've sent a notification already

function loadFarmData() {
    try {
        farmData = JSON.parse(fs.readFileSync('farmingPodsData.json', 'utf8'));
    } catch (error) {
        // console.error("Error loading farm data:", error);
        // file doesn't exist, so we'll just create an empty object
        farmData = {};
    }
}

function saveFarmData() {
    fs.writeFileSync('farmingPodsData.json', JSON.stringify(farmData, null, 2));
}

async function updateWhitelist() {
    const whitelist = await mainContract.getWhitelist();
    // check if someone has dropped off the whitelist
    const whitelistAddresses = whitelist.map((address) => address.toLowerCase());
    const currentWhitelistAddresses = Object.keys(farmData);
    const removedAddresses = currentWhitelistAddresses.filter((address) => !whitelistAddresses.includes(address));
    removedAddresses.forEach((address) => {
        delete farmData[address];
        sendMessageToAllChats(`Address ${whitelistToName[address]} has been removed from the whitelist`);
    });
    saveFarmData();
    return whitelistAddresses;
}

// watch for the whitelist filter, if it occurs update the whitelist
provider.on(whitelistFilter, async (log) => {
    await updateWhitelist();
    await handleFarmingAddresses();
});


async function checkFarmingPodType(address) {
    try {
        const farmingPod = new ethers.Contract(address, farmingContractABI, provider);
        await farmingPod.rewardsToken();
        return "farmingPod";
    } catch (error) {
        return "multiFarmingPod";
    }
}

async function handleFarmingAddresses(whitelist) {
    for (const address of whitelist) {
        if (!farmData[address]) {
            const farmingAddress = await dst1inchContract.defaultFarms(address);
            const type = await checkFarmingPodType(farmingAddress);
            farmData[address] = { type, farmingAddress };
        }
    }
    saveFarmData();
}

async function updateAllFarmInfo() {
    const farms = Object.entries(farmData);
    for (const [address, data] of farms) {
        if(data.type === "multiFarmingPod") {
            const farmingContract = new ethers.Contract(data.farmingAddress, multiFarmingContractABI, provider);
            farmingContract.farmInfo("0x111111111117dc0aa78b770fa6a738034120c302").then(([date]) => {
                // console.log(`FARM INFO: ${whitelistToName[address]} ${data.farmingAddress} ${date}`);
            }).catch(console.error);
        } else {
            const farmingContract = new ethers.Contract(data.farmingAddress, singleFarmingContractABI, provider);
            farmingContract.farmInfo().then(([date]) => {
                // console.log(`FARM INFO: ${whitelistToName[address]} ${data.farmingAddress} ${date}`);
            }).catch(console.error);
        }
    }

}

// Utility function to get the current UNIX timestamp
const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

// Function to clean up old data points
function pruneOldData(address) {
    const now = getCurrentTimestamp();
    const weekAgo = now - 604800; // 604800 seconds in a week
    const dataPoints = Object.entries(TWAD[address]).filter(([timestamp, _]) => parseInt(timestamp) >= weekAgo);
    TWAD[address] = Object.fromEntries(dataPoints);
}

// Function to monitor and alert for falling delegation
async function watchAndAlertForFallingDelegation() {
    const thresholdValue = 5; // 5% minimum delegation threshold
    const decreaseThreshold = 10; // 10% decrease threshold
    try {
        const totalSupply = parseInt(await dst1inchContract.totalSupply());
        for(const [address, _] of Object.entries(farmData)) {
            if (!TWAD[address]) TWAD[address] = {};

            const balance = parseInt(await dst1inchContract.balanceOf(address));
            const now = getCurrentTimestamp();
            const percentageOwnership = (balance / totalSupply) * 100;
            TWAD[address][now] = percentageOwnership;
            
            const currentTWAD = computeTWAD(address);
            const belowThreshold = percentageOwnership < thresholdValue
            const droppedMoreThanDecreaseThreshold = ((currentTWAD - percentageOwnership) / currentTWAD) * 100 > decreaseThreshold

            if (belowThreshold || droppedMoreThanDecreaseThreshold && (notificationsSentForBelowThreshold.hasOwnProperty(address) === false && !notificationsSentForBelowThreshold[address])) {
                notificationsSentForBelowThreshold[address] = true;
                const message = belowThreshold ?
                    `Warning: Delegation below threshold for address ${whitelistToName[address]}` :
                    `Warning: Significant drop in delegation for address ${whitelistToName[address]}`;
                sendMessageToAllChats(message);
            }

            if(notificationsSentForBelowThreshold.hasOwnProperty(address) === true && notificationsSentForBelowThreshold[address] && !belowThreshold && !droppedMoreThanDecreaseThreshold) {
                notificationsSentForBelowThreshold[address] = false;
                sendMessageToAllChats(`Delegation for address ${whitelistToName[address]} has recovered`);
            }

        }
    } catch (error) {
        console.error('Error in watchAndAlertForFallingDelegation:', error);
    }
}



// Function to compute the Time Weighted Average Delegation
function computeTWAD(address) {
    pruneOldData(address); // Ensure old data is cleaned up before computation
    const now = getCurrentTimestamp();
    const dataPoints = Object.entries(TWAD[address]);
    const totalWeight = dataPoints.reduce((acc, [timestamp, _]) => acc + (now - timestamp), 0);
    const weightedAverage = dataPoints.reduce((acc, [timestamp, value]) => {
        const weight = (now - timestamp) / totalWeight;
        return acc + (value * weight);
    }, 0);
    return weightedAverage;
}

async function checkFarmsExpiration() {
    const currentTime = Math.floor(Date.now() / 1000);

    const processFarm = async (address, data, parameters) => {
        try {
            const farmingContract = new ethers.Contract(data.farmingAddress, data.type === "multiFarmingPod" ? multiFarmingContractABI : singleFarmingContractABI, provider);
            const [date] = await farmingContract.farmInfo(...parameters);
            const dateBigInt = BigInt(date);

            if (dateBigInt < BigInt(currentTime)) {
                if (notificationsSentForFarmEnding[address] !== true) {
                    notificationsSentForFarmEnding[address] = true;
                    sendMessageToAllChats(`FARM ENDED: ${whitelistToName[address]} ${new Date(Number((dateBigInt * 1000n).toString())).toUTCString()}}`);
                }
            } else {
                if (notificationsSentForFarmEnding[address] === true) {
                    notificationsSentForFarmEnding[address] = false;
                    notificationsSentForFarmEndingSoon[address] = false;
                    sendMessageToAllChats(`FARM FUNDED: ${whitelistToName[address]}`);
                }
            }
            // check if farm is ending soon (less than 12 hours), do not warn if it's already ended
            if (dateBigInt < BigInt(currentTime + 43200) && dateBigInt > BigInt(currentTime)) {
                if (notificationsSentForFarmEndingSoon[address] !== true) {
                    notificationsSentForFarmEndingSoon[address] = true;
                    sendMessageToAllChats(`FARM ENDING IN LESS THAN 12 HOURS: ${whitelistToName[address]} ${data.farmingAddress}`);
                }
            }
        } catch (error) {
            console.error(`Error processing farm ${address}:`, error);
        }
    };

    for (const [address, data] of Object.entries(farmData)) {
        const parameters = data.type === "multiFarmingPod" ? ["0x111111111117dc0aa78b770fa6a738034120c302"] : [];
        await processFarm(address, data, parameters);
    }
}


/************************************
 *              Bot setup 
 ************************************/

// https://github.com/grammyjs
bot.catch((err) => {
    console.error('An error occurred:', err);   
})

function sendMessageToResolverAlerts(message) {
    //bot.api.sendMessage('-4272262619', message);
    sendMessageToAllChats(message);
}

function sendMessageToAllChats(message) {
    // read chats.json file to get the chat ids
    const chats = JSON.parse(fs.readFileSync('chats.json', 'utf8'));
    // message all the chats we've allow listed
    for (const chat of chats) {
        chat != undefined ? 
            bot.api.sendMessage(chat, message)
        :
            null
    }
}
/************************************
 *              Start Program 
 ************************************/

async function main() {
    loadFarmData();
    const whitelist = await updateWhitelist();
    await handleFarmingAddresses(whitelist);
    await updateAllFarmInfo();
    watchAndAlertForFallingDelegation(); // run once at startup
    checkFarmsExpiration();
    setInterval(checkFarmsExpiration, 3600000); // Check every hour
    setInterval(watchAndAlertForFallingDelegation, 3600000);  // Check every hour
    setInterval(updateWhitelistNames, 3600000); // Check every hour
    setInterval(updateWhitelist, 3600000); // Check every hour
}

main().catch(console.error);
