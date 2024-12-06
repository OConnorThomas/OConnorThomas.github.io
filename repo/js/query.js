// Define market sector words
const marketSectorWords = [
  'Unknown', 'Consumer Cyclical', 'Technology', 'Financial Services', 'Energy',
  'Communication Services', 'Basic Materials', 'Consumer Defensive', 'Healthcare',
  'Industrials', 'Utilities', 'Real Estate'
];

// Load the scaler from a JSON file
const loadScaler = async (scalerPath) => {
  const response = await fetch(scalerPath);
  const scalerData = await response.json();
  
  return {
    mean: tf.tensor1d(scalerData.mean),   // Ensure 1D tensor for mean
    scale: tf.tensor1d(scalerData.scale)  // Ensure 1D tensor for scale
  };
};

// Scale the input data
const scaleInput = (data, scaler) => {
  const tensorData = tf.tensor2d([data]); // Convert to 2D tensor with shape [1, n]
  return tensorData.sub(scaler.mean).div(scaler.std);
};

// Fetch financial data from Yahoo Finance API
const getFinancialData = async (symbol) => {
  const apiUrl = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=summaryDetail,financialData,defaultKeyStatistics`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${symbol}`);
    }
    const json = await response.json();
    const summary = json.quoteSummary.result[0];

    const generalInfo = summary.summaryDetail || {};
    const financialData = summary.financialData || {};

    // Extract required fields and ensure they're numbers
    const ROA = Number(financialData.returnOnAssets?.raw || 0.0);
    const ROE = Number(financialData.returnOnEquity?.raw || 0.0);
    const sector = generalInfo.sector || 'Unknown';
    const totalRevenue = Number(generalInfo.totalRevenue?.raw || 0.0);

    const netIncome = Number(financialData.netIncome?.raw || 0.0);
    const costOfGoodsSold = Number(financialData.costOfRevenue?.raw || 0.0);
    const operatingExpenses = Number(financialData.operatingExpenses?.raw || 0.0);
    const netSales = totalRevenue;

    const stockholdersEquity = Number(financialData.totalStockholderEquity?.raw || 0.0);
    const totalAssets = Number(financialData.totalAssets?.raw || 0.0);

    const year = new Date().getFullYear() % 100;
    const sectorIndex = marketSectorWords.indexOf(sector);

    let profitMargin = 0.0;
    let assetTurnover = 0.0;
    let financialLeverage = 0.0;

    if (netSales !== 0.0) profitMargin = netIncome / netSales;
    if (totalAssets !== 0.0) assetTurnover = netSales / totalAssets;
    if (stockholdersEquity !== 0.0) financialLeverage = totalAssets / stockholdersEquity;


    return [
      year, sectorIndex, profitMargin, assetTurnover, financialLeverage, ROA, ROE, RNOA, NOAT, NOPM
    ];
  } catch (error) {
    console.error(`Error fetching financial data for ${symbol}:`, error);
    return null;
  }
};

// Load the model and make predictions
const loadAndPredict = async (symbol, modelPath, scalerPath) => {
  try {
    console.log('Pre');
    const model = await tf.loadLayersModel(modelPath);
    console.log('Mid');
    const scaler = await loadScaler(scalerPath);
    console.log('Post');

    console.log('Loaded Model and Scaler from file');

    const data = await getFinancialData(symbol);
    if (!data) {
      throw new Error(`No data available for ${symbol}`);
    }

    console.log('data collected');

    // Remove the year column and scale input
    const inputData = data.slice(1); // Exclude year
    const scaledInput = scaleInput(inputData, scaler);

    // Ensure input shape matches model's expected input
    const inputShape = model.inputs[0].shape;
    console.log('Model input shape:', inputShape);
    console.log('Scaled input shape:', scaledInput.shape);

    // Make predictions
    const prediction = model.predict(scaledInput);
    const result = await prediction.data();
    
    // Cleanup tensors
    scaledInput.dispose();
    prediction.dispose();

    return result[0];
  } catch (error) {
    console.error('Error in loadAndPredict:', error);
    return null;
  }
};

// Get full financial data
const getFullFinances = async (symbol) => {
  const data = await getFinancialData(symbol);
  if (!data) return null;

  const year = data[0] + 2000;
  const sector = marketSectorWords[data[1]];

  const names = ['Symbol', 'Year', 'Sector', 'Profit Margin', 'Asset Turnover', 'Financial Leverage', 'ROA', 'ROE'];
  const values = [symbol, year, sector, ...data.slice(2)];

  return Object.fromEntries(names.map((name, i) => [name, values[i]]));
};

// Event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', async function(event) {
      // event.preventDefault();
      console.log("Form submitted!");

      const symbol = document.getElementById('search-input').value;
      const modelPath = 'file://repo/models/tfjs_model/model.json';
      const scalerPath = 'file://repo/models/tfjs_model/scaler.json';

      try {
        const prediction = await loadAndPredict(symbol, modelPath, scalerPath);
        console.log(`Prediction for ${symbol}:`, prediction);

        const tempElement = document.getElementById('temp');
        if (tempElement) {
          tempElement.innerText = `Prediction: ${prediction?.toFixed(4) || 'N/A'}`;
        }
      } catch (error) {
        console.error('Error:', error);
        alert(`Error making prediction: ${error.message}`);
      }
    });
  }
});