import yfinance as yf # financial data
import numpy as np # calculations
import matplotlib.pyplot as plt # plot simulations
from tqdm import tqdm # progress bars
from matplotlib.animation import FuncAnimation # animation visuals

# Set simulation parameters
num_simulations = 10000 # number of simulations to perform
num_days = 100          # 252 trading days per year
plot_num = 10           # simulations per graph
threshold_price = 1.1   # target growth (original_price == 1)

# Load historical stock price data
ticker = "AAPL"         # Replace with the desired stock symbol
start_date = "1990-01-01"
end_date = "2024-01-01"
data = yf.download(ticker, start=start_date, end=end_date)

# Compute daily returns
data['Daily_Return'] = data['Adj Close'].pct_change().dropna()

# Estimate drift and volatility
drift = data['Daily_Return'].mean()
volatility = data['Daily_Return'].std()

# Run Monte Carlo simulation
simulations = np.zeros((num_simulations, num_days))
bar = tqdm(total=(num_simulations * (num_days - 1)), desc="Simulating :")
for i in range(num_simulations):
    # Initialize with the last known stock price
    price_path = [data['Adj Close'].iloc[-1]]

    for day in range(1, num_days):
        # Geometric Brownian Motion formula
        daily_returns = np.random.normal(drift, volatility, 1)
        price_today = price_path[-1] * np.exp(daily_returns)
        price_path.append(price_today[0])
        bar.update(1)

    simulations[i, :] = price_path
bar.close()

# Set the threshold
threshold_price *= data['Adj Close'].iloc[-1]
original_price = data['Adj Close'].iloc[-1]

# Calculate the proportion of simulations exceeding the threshold
exceed_threshold = np.sum(simulations[:, -1] > threshold_price) / num_simulations
original_threshold = np.sum(simulations[:, -1] > original_price) / num_simulations
average_growth = np.mean((simulations[:, -1] - original_price) / original_price)
average_annual_growth = average_growth * (252 / num_days)

# Show the probability of exceeding the threshold
print(f"Probability of stock price exceeding the threshold: {exceed_threshold:.2%}")
print(f"Probability of stock price exceeding original value: {original_threshold:.2%}")
print(f"Average growth of simulated stock: {average_growth:.2%}")
print(f"Average annual growth of simulated stock: {average_annual_growth:.2%}")

print("Generate a:\n(1) png graph\n(2) gif graph\n(3) both\n(4) quit\n:", end="")

def create_image():
    plt.figure(figsize=(12, 6))
    for i in range(10):
      plt.plot(simulations[i, :], label=f'Simulation {i+1}')
    plt.axhline(y=threshold_price, color='r', linestyle='--', label='Threshold Price')
    plt.axhline(y=original_price, color='blue', linestyle='--', label='Original Price')
    plt.legend()
    plt.title('Monte Carlo Simulation of Stock Price: ' + ticker)
    plt.xlabel('Days')
    plt.ylabel('Stock Price')
    plt.savefig('stock_simulation.png')

def create_gif():
    def update(frame):
      plt.cla()
      for i in range(plot_num):
          plt.plot(simulations[i, :frame], label=f'Simulation {i+1}')
      plt.axhline(y=threshold_price, color='red', linestyle='--', label='Threshold Price')
      plt.axhline(y=original_price, color='blue', linestyle='--', label='Original Price')
      plt.legend(loc = 'upper left')
      plt.title('Monte Carlo Simulation of Stock Price: ' + ticker)
      plt.xlabel('Days')
      plt.ylabel('Stock Price')

    # Create the animation
    fig, ax = plt.subplots(figsize=(12, 6))
    animation = FuncAnimation(fig, update, frames=num_days, repeat=False)

    # Save the animation and track progress
    with tqdm(total=num_days, desc="Creating GIF") as gif_bar:
      animation.save('stock_simulation.gif', writer='pillow', progress_callback=lambda i, n: gif_bar.update(1))

# Select appropriate action
inp = int(input())
if inp == 1:
  create_image()
elif inp == 2:
  create_gif()
elif inp == 3:
  create_image()
  create_gif()
else:
  exit()
