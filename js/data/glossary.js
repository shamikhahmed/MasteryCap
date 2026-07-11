/* glossary.js — bilingual terms tagged by track (P7) */
export const GLOSSARY = [
  { term: 'OHLC', en: 'Open, High, Low, Close — four prices that make one candle.', ur: 'Open, High, Low, Close — ek candle ke chaar prices.', tracks: ['crypto'] },
  { term: 'Wick', en: 'The thin line beyond the body showing rejected high or low.', ur: 'Body ke bahar patli line — reject high/low.', tracks: ['crypto'] },
  { term: 'Engulfing', en: "Candle whose body fully covers the prior candle's body.", ur: 'Candle jiski body pehli candle ki body ko fully cover kare.', tracks: ['crypto'] },
  { term: 'Pin bar', en: 'Long rejection wick with a small body at a key level.', ur: 'Key level pe lambi rejection wick, choti body.', tracks: ['crypto'] },
  { term: 'Higher high', en: 'A swing high above the previous swing high (uptrend).', ur: 'Pehle swing high se upar naya swing high (uptrend).', tracks: ['crypto'] },
  { term: 'Higher low', en: 'A swing low above the previous swing low (uptrend).', ur: 'Pehle swing low se upar naya swing low (uptrend).', tracks: ['crypto'] },
  { term: 'Lower high', en: 'A swing high below the previous swing high (downtrend).', ur: 'Pehle se neeche swing high (downtrend).', tracks: ['crypto'] },
  { term: 'Lower low', en: 'A swing low below the previous swing low (downtrend).', ur: 'Pehle se neeche swing low (downtrend).', tracks: ['crypto'] },
  { term: 'Support', en: 'Zone where buying pressure previously turned price up.', ur: 'Zone jahan pehle buying ne price upar mori.', tracks: ['crypto'] },
  { term: 'Resistance', en: 'Zone where selling pressure previously turned price down.', ur: 'Zone jahan pehle selling ne price neeche mori.', tracks: ['crypto'] },
  { term: 'Role reversal', en: 'Broken resistance becoming support (or vice versa) on retest.', ur: 'Broken resistance retest pe support ban jaye (ya ulta).', tracks: ['crypto'] },
  { term: 'EMA', en: 'Exponential moving average — weights recent prices more.', ur: 'Exponential moving average — recent prices ko zyada weight.', tracks: ['crypto'] },
  { term: 'SMA', en: 'Simple moving average — equal weight across the window.', ur: 'Simple moving average — window pe barabar weight.', tracks: ['crypto'] },
  { term: 'RSI', en: 'Relative Strength Index — momentum oscillator 0–100.', ur: 'Relative Strength Index — momentum 0–100.', tracks: ['crypto'] },
  { term: 'Divergence', en: 'Price and indicator make opposite swing extremes.', ur: 'Price aur indicator opposite extremes banayein.', tracks: ['crypto'] },
  { term: 'ATR', en: 'Average True Range — measure of recent volatility.', ur: 'Average True Range — recent volatility ka measure.', tracks: ['crypto'] },
  { term: 'Stop hunt', en: 'Move that sweeps obvious stops then reverses.', ur: 'Move jo obvious stops sweep karke reverse kare.', tracks: ['crypto'] },
  { term: 'Liquidity', en: 'Resting orders (often stops) clustered at a level.', ur: 'Level pe jama resting orders (aksar stops).', tracks: ['crypto'] },
  { term: 'Funding rate', en: 'Periodic payment between longs and shorts on perps.', ur: 'Perps pe longs/shorts ke beech periodic payment.', tracks: ['crypto'] },
  { term: 'Open interest', en: 'Total outstanding derivative contracts.', ur: 'Open derivative contracts ki kul tadaad (band nahi hui).', tracks: ['crypto', 'futures'] },
  { term: 'Perpetual', en: 'Futures-like contract with no expiry (crypto perps).', ur: 'Bina expiry ke futures-jaisa contract (crypto perps).', tracks: ['crypto'] },
  { term: 'Liquidation', en: 'Forced close when margin falls below maintenance.', ur: 'Jab margin maintenance se neeche — forced close.', tracks: ['crypto'] },
  { term: 'Leverage', en: 'Position size relative to account equity.', ur: 'Account equity ke muqable position size.', tracks: ['crypto'] },
  { term: 'Position size', en: 'Notional size of the trade in account currency.', ur: 'Trade ka notional size account currency mein.', tracks: ['crypto'] },
  { term: 'Risk percent', en: 'Max account % you allow to lose on one trade.', ur: 'Ek trade pe account ka max % loss.', tracks: ['crypto'] },
  { term: 'Slippage', en: 'Difference between expected and filled price.', ur: 'Expected aur filled price ka farq.', tracks: ['crypto'] },
  { term: 'Spread', en: 'Difference between bid and ask.', ur: 'Bid aur ask ka farq.', tracks: ['crypto'] },
  { term: 'Volume', en: 'Amount traded in a period — participation proxy.', ur: 'Period mein traded amount — participation proxy.', tracks: ['crypto'] },
  { term: 'Range', en: 'Sideways market between a ceiling and floor.', ur: 'Ceiling/floor ke beech sideways market.', tracks: ['crypto'] },
  { term: 'Breakout', en: 'Price leaving a range or level with conviction.', ur: 'Range/level se conviction ke sath nikalna.', tracks: ['crypto'] },
  { term: 'Call option', en: 'Right to buy the underlying at the strike before expiry.', ur: 'Expiry se pehle strike pe buy karne ka right.', tracks: ['stocks'] },
  { term: 'Put option', en: 'Right to sell the underlying at the strike before expiry.', ur: 'Expiry se pehle strike pe sell karne ka right.', tracks: ['stocks'] },
  { term: 'Strike', en: 'Price at which an option can be exercised.', ur: 'Price jahan option exercise ho sakta hai.', tracks: ['stocks'] },
  { term: 'Premium', en: 'Price paid for an option contract.', ur: 'Option contract ki price.', tracks: ['stocks'] },
  { term: 'Intrinsic value', en: 'In-the-money amount of an option.', ur: 'Option ka in-the-money hissa.', tracks: ['stocks'] },
  { term: 'Extrinsic value', en: 'Premium beyond intrinsic — time and IV.', ur: 'Intrinsic ke upar premium — time aur IV.', tracks: ['stocks'] },
  { term: 'Implied volatility', en: "Market's forecast of volatility priced into options.", ur: 'Options mein priced volatility forecast.', tracks: ['stocks'] },
  { term: 'IV crush', en: 'Sharp drop in IV after an event (e.g. earnings).', ur: 'Event ke baad IV ka tez girna.', tracks: ['stocks'] },
  { term: 'Delta', en: 'Option price sensitivity to underlying move.', ur: 'Underlying move pe option price sensitivity.', tracks: ['stocks'] },
  { term: 'Theta', en: 'Option value decay per day (time decay).', ur: 'Rozana option value decay (time decay).', tracks: ['stocks'] },
  { term: 'Vega', en: 'Option sensitivity to implied volatility.', ur: 'IV pe option sensitivity.', tracks: ['stocks'] },
  { term: 'Gamma', en: 'Rate of change of delta.', ur: 'Delta ki change rate.', tracks: ['stocks'] },
  { term: 'Breakeven', en: 'Price where option P/L is zero at expiry.', ur: 'Expiry pe jahan option P/L zero.', tracks: ['stocks'] },
  { term: 'Covered call', en: 'Long stock + short call — capped upside, premium income.', ur: 'Long stock + short call — capped upside.', tracks: ['stocks'] },
  { term: 'Vertical spread', en: 'Same-type options at two strikes, defined risk.', ur: 'Do strikes pe same-type options, defined risk.', tracks: ['stocks'] },
  { term: 'Earnings', en: 'Company quarterly results — often an IV event.', ur: 'Company quarterly results — aksar IV event.', tracks: ['stocks'] },
  { term: 'Bid', en: 'Highest price a buyer will pay now.', ur: 'Buyer abhi jo max dega.', tracks: ['stocks'] },
  { term: 'Ask', en: 'Lowest price a seller will accept now.', ur: 'Seller abhi jo min lega.', tracks: ['stocks'] },
  { term: 'Market order', en: 'Order that fills at the next available price.', ur: 'Agli available price pe fill.', tracks: ['stocks'] },
  { term: 'Limit order', en: 'Order that fills only at your price or better.', ur: 'Sirf aapki price ya better pe fill.', tracks: ['stocks'] },
  { term: 'Balance sheet', en: 'Snapshot of assets, liabilities, equity.', ur: 'Assets, liabilities, equity ka snapshot.', tracks: ['invest'] },
  { term: 'Income statement', en: 'Revenue and expenses over a period.', ur: 'Period ka revenue aur expenses.', tracks: ['invest'] },
  { term: 'Cash flow', en: 'Cash in and out — operating, investing, financing.', ur: 'Cash in/out — operating, investing, financing.', tracks: ['invest'] },
  { term: 'P/E ratio', en: 'Price divided by earnings per share.', ur: 'Price ÷ earnings per share.', tracks: ['invest'] },
  { term: 'EPS', en: 'Earnings per share — profit divided by shares outstanding.', ur: 'Earnings per share — munafa ÷ outstanding shares.', tracks: ['invest'] },
  { term: 'Dividend', en: 'Cash paid to shareholders from profits.', ur: 'Profits se shareholders ko cash.', tracks: ['invest'] },
  { term: 'ETF', en: 'Fund that tracks an index or basket, trades like a stock.', ur: 'Index/basket track karta fund, stock ki tarah trade.', tracks: ['invest'] },
  { term: 'Expense ratio', en: 'Annual fund fee as % of assets.', ur: 'Fund ki saalana fee assets ka %.', tracks: ['invest'] },
  { term: 'IPO', en: 'Initial public offering — company lists shares.', ur: 'Initial public offering — shares list.', tracks: ['invest'] },
  { term: 'Lockup', en: 'Period when insiders cannot sell IPO shares.', ur: 'Period jab insiders IPO shares nahi bech sakte.', tracks: ['invest'] },
  { term: 'PSX', en: 'Pakistan Stock Exchange — primary equity market of Pakistan.', ur: 'Pakistan Stock Exchange — Pakistan ka asasi equity market.', tracks: ['invest', 'foundations'] },
  { term: 'CDC', en: 'Central Depository Company — Pakistan securities custody.', ur: 'Central Depository Company — Pakistan custody.', tracks: ['invest'] },
  { term: 'Index fund', en: 'Fund designed to match a market index.', ur: 'Market index match karne wala fund.', tracks: ['invest'] },
  { term: 'Compounding', en: 'Returns earning returns over time.', ur: 'Returns pe returns waqt ke sath.', tracks: ['invest'] },
  { term: 'Valuation', en: 'Estimate of what a company is worth.', ur: 'Company ki worth ka estimate.', tracks: ['invest'] },
  { term: 'Moat', en: 'Durable competitive advantage.', ur: 'Lamba competitive advantage.', tracks: ['invest'] },
  { term: 'Futures', en: 'Standardized contract to buy/sell later at a set price.', ur: 'Baad mein set price pe buy/sell ka standardized contract.', tracks: ['futures'] },
  { term: 'Tick', en: 'Minimum price increment of a futures contract.', ur: 'Futures ki minimum price increment.', tracks: ['futures'] },
  { term: 'Tick value', en: 'Dollar value of one tick move.', ur: 'Ek tick move ki dollar value.', tracks: ['futures'] },
  { term: 'Initial margin', en: 'Collateral required to open a futures position.', ur: 'Futures open karne ke liye collateral.', tracks: ['futures'] },
  { term: 'Maintenance margin', en: 'Minimum equity to keep a futures position open.', ur: 'Position open rakhne ka minimum equity.', tracks: ['futures'] },
  { term: 'Contango', en: 'Futures price above spot.', ur: 'Futures price spot se upar.', tracks: ['futures'] },
  { term: 'Backwardation', en: 'Futures price below spot.', ur: 'Futures price spot se neeche.', tracks: ['futures'] },
  { term: 'Rollover', en: 'Closing near contract and opening the next.', ur: 'Near contract band, agli open.', tracks: ['futures'] },
  { term: 'Expiry', en: 'Date a futures or options contract ends.', ur: 'Futures/options khatam hone ki date.', tracks: ['futures'] },
  { term: 'Notional', en: 'Full face value of a contract position.', ur: 'Contract position ki full face value.', tracks: ['futures'] },
  { term: 'Mark to market', en: 'Daily settlement of futures P/L.', ur: 'Futures P/L ka daily settlement.', tracks: ['futures'] },
  { term: 'Pip', en: 'Smallest usual FX price increment (often 0.0001).', ur: 'FX ki chhoti price increment (aksar 0.0001).', tracks: ['forex'] },
  { term: 'Lot', en: 'Standard FX trade size (often 100,000 units).', ur: 'Standard FX size (aksar 100,000 units).', tracks: ['forex'] },
  { term: 'Base currency', en: 'First currency in a pair (EUR in EURUSD).', ur: 'Pair ki pehli currency (EURUSD mein EUR).', tracks: ['forex'] },
  { term: 'Quote currency', en: 'Second currency in a pair (USD in EURUSD).', ur: 'Pair ki doosri currency (EURUSD mein USD).', tracks: ['forex'] },
  { term: 'Carry trade', en: 'Borrow low-yield currency to buy high-yield.', ur: 'Low-yield borrow, high-yield buy.', tracks: ['forex'] },
  { term: 'Session', en: 'Trading hours for a region (Asia/London/NY).', ur: 'Region ke trading hours.', tracks: ['forex'] },
  { term: 'Correlation', en: 'How similarly two pairs move.', ur: 'Do pairs kitna similar move karein.', tracks: ['forex'] },
  { term: 'Swap', en: 'Overnight interest on FX positions.', ur: 'FX positions pe overnight interest.', tracks: ['forex'] },
  { term: 'Major pair', en: 'FX pair with USD and another top currency.', ur: 'USD + doosri top currency wala pair.', tracks: ['forex'] },
  { term: 'Cross pair', en: 'FX pair that does not include USD.', ur: 'Bina USD wala FX pair.', tracks: ['forex'] },
  { term: 'Spot', en: 'Buying/selling for near-immediate settlement.', ur: 'Jaldi settlement ke liye buy/sell.', tracks: ['spot'] },
  { term: 'Margin trading', en: 'Borrowing to increase spot exposure.', ur: 'Spot exposure badhane ke liye borrow.', tracks: ['spot'] },
  { term: 'Custody', en: 'Who holds your assets (exchange vs self).', ur: 'Assets kis ke paas (exchange vs self).', tracks: ['spot'] },
  { term: 'Settlement', en: 'When ownership of the asset actually transfers.', ur: 'Jab ownership transfer hoti hai.', tracks: ['spot'] },
  { term: 'Trading bot', en: 'Automated rules that place/manage orders.', ur: 'Automated rules jo orders place/manage karein.', tracks: ['bots'] },
  { term: 'Grid bot', en: 'Places buys/sells on a price grid in a range.', ur: 'Range mein price grid pe buys/sells.', tracks: ['bots'] },
  { term: 'DCA', en: 'Dollar-cost averaging — fixed buys on a schedule.', ur: 'Schedule pe fixed buys.', tracks: ['bots'] },
  { term: 'Backtest', en: 'Running a strategy on historical data.', ur: 'Historical data pe strategy chalana.', tracks: ['bots'] },
  { term: 'Overfitting', en: 'Curve-fitting history so live results disappoint.', ur: 'History pe itna fit ke live fail.', tracks: ['bots'] },
  { term: 'Copy trading', en: "Mirroring another trader's orders automatically.", ur: 'Doosre trader ke orders auto mirror.', tracks: ['bots'] },
  { term: 'Signal group', en: 'Paid tips channel — often misaligned incentives.', ur: 'Paid tips channel — aksar galat incentives.', tracks: ['bots'] },
  { term: 'Martingale', en: 'Doubling size after losses — ruin risk.', ur: 'Loss ke baad size double — ruin risk.', tracks: ['bots'] },
  { term: 'Parameter', en: 'Tunable setting of a strategy or bot.', ur: 'Strategy/bot ka tunable setting.', tracks: ['bots'] },
  { term: 'Walk-forward', en: 'Testing on sequential out-of-sample windows.', ur: 'Sequential out-of-sample windows pe test.', tracks: ['bots'] },
  { term: 'Binary option', en: 'All-or-nothing payout if a condition is met at expiry.', ur: 'Expiry pe condition met — all-or-nothing.', tracks: ['binary'] },
  { term: 'Payout', en: 'Percent profit paid on a winning binary.', ur: 'Winning binary pe % profit.', tracks: ['binary'] },
  { term: 'House edge', en: 'Structural advantage favoring the platform.', ur: 'Platform ka structural faida.', tracks: ['binary'] },
  { term: 'Breakeven win-rate', en: 'Win % needed so expected value is zero.', ur: 'Zero EV ke liye zaroori win %.', tracks: ['binary'] },
  { term: 'Expiry window', en: 'Short time until binary settles.', ur: 'Binary settle hone tak chhota time.', tracks: ['binary'] },
  { term: 'Expectancy', en: 'Average P/L per trade over a sample.', ur: 'Sample pe average P/L per trade.', tracks: ['crypto'] },
  { term: 'R-multiple', en: 'Reward measured in units of initial risk.', ur: 'Initial risk ki units mein reward.', tracks: ['crypto'] },
  { term: 'Drawdown', en: 'Peak-to-trough decline in equity.', ur: 'Equity ka peak se trough girna.', tracks: ['crypto'] },
  { term: 'Win rate', en: 'Fraction of trades that are profitable.', ur: 'Profitable trades ka fraction.', tracks: ['crypto'] },
  { term: 'Risk:reward', en: 'Ratio of potential loss to potential gain.', ur: 'Potential loss vs gain ka ratio.', tracks: ['crypto'] },
  { term: 'Journal', en: 'Log of trades with context and emotion.', ur: 'Trades ka log — context aur emotion.', tracks: ['crypto'] },
  { term: 'Checklist', en: 'Pre-trade rules you verify every time.', ur: 'Har trade se pehle rules verify.', tracks: ['crypto'] },
  { term: 'FOMO', en: 'Fear of missing out — chasing entries.', ur: 'Fear of missing out — chase entries.', tracks: ['crypto'] },
  { term: 'Revenge trade', en: "Trade taken to 'make back' a recent loss.", ur: "Recent loss 'wapis' lene wali trade.", tracks: ['crypto'] },
  { term: 'Edge', en: 'Repeatable positive expectancy after costs.', ur: 'Costs ke baad repeatable positive expectancy.', tracks: ['crypto'] },
  { term: 'Variance', en: 'Natural randomness around expectancy.', ur: 'Expectancy ke around natural randomness.', tracks: ['crypto'] },
  { term: 'Sample size', en: 'Number of trades needed before trusting stats.', ur: 'Stats trust karne se pehle trades ki tadaad.', tracks: ['crypto'] },
  { term: 'Maintenance call', en: 'Broker demand for more margin after a drop.', ur: 'Drop ke baad broker ka zyada margin mangna.', tracks: ['futures'] },
  { term: 'Basis', en: 'Futures price minus spot price.', ur: 'Futures minus spot.', tracks: ['futures'] },
  { term: 'Scalping', en: 'Very short holding period for small moves.', ur: 'Chhote moves ke liye bohat short hold.', tracks: ['forex'] },
  { term: 'Swing trade', en: 'Holding days to weeks for a structural move.', ur: 'Structural move ke liye din–hafte hold.', tracks: ['stocks'] },

  // --- School-complete core dictionary (v36) ---
  { term: 'Stop loss', en: 'Order or rule that exits a trade to cap loss at a planned price.', ur: 'Planned price pe trade band karke loss cap karne wala order/rule.', tracks: ['foundations', 'crypto', 'forex', 'futures'] },
  { term: 'Take profit', en: 'Exit level that locks in gains when price reaches a target.', ur: 'Target pe gains lock karne wala exit level.', tracks: ['foundations', 'crypto', 'forex'] },
  { term: 'Long', en: 'Position that profits if price rises (you bought / are long the asset).', ur: 'Position jo price upar jane pe faida de (asset long).', tracks: ['foundations', 'crypto', 'stocks'] },
  { term: 'Short', en: 'Position that profits if price falls (you sold first / are short).', ur: 'Position jo price girne pe faida de (pehle sell / short).', tracks: ['foundations', 'crypto', 'stocks'] },
  { term: 'Broker', en: 'Intermediary that routes your orders to a market or venue.', ur: 'Woh wasta jo aapke orders market/venue tak bhejta hai.', tracks: ['foundations', 'invest'] },
  { term: 'KYC', en: 'Know Your Customer — identity checks before a regulated account opens.', ur: 'Know Your Customer — regulated account se pehle identity check.', tracks: ['foundations', 'invest'] },
  { term: 'Regulated', en: 'Under a financial regulator with rules, audits, and redress paths.', ur: 'Financial regulator ke neeche — rules, audit, shikayat path.', tracks: ['foundations'] },
  { term: 'Paper trading', en: 'Simulated trades with fake money to practice process.', ur: 'Fake paisa pe simulated trades — process practice.', tracks: ['foundations'] },
  { term: 'Live trading', en: 'Trading with real capital at risk.', ur: 'Asli capital pe trading — asli risk.', tracks: ['foundations'] },
  { term: 'Scam', en: 'Fraud pitched as easy profit — guarantees, fake brokers, deposit traps.', ur: 'Aasan munafa dikhane wala dhoka — guarantee, fake broker, deposit jaal.', tracks: ['foundations', 'bots', 'binary'] },
  { term: 'Stop order', en: 'Order that becomes live when price hits a trigger (often used for stops).', ur: 'Trigger price pe live hone wala order (aksar stops ke liye).', tracks: ['foundations', 'stocks'] },
  { term: 'Trailing stop', en: 'Stop that moves with favorable price to protect open profit.', ur: 'Faida hone pe sath chalne wala stop — open profit protect.', tracks: ['foundations', 'crypto'] },
  { term: 'Risk management', en: 'Rules for size, stops, and max loss so one trade cannot ruin you.', ur: 'Size, stops, max loss ke rules — ek trade ruin na kare.', tracks: ['foundations', 'crypto'] },
  { term: 'Capital', en: 'Money allocated to trading or investing.', ur: 'Trading/investing ke liye rakha hua paisa.', tracks: ['foundations', 'invest'] },
  { term: 'Derivative', en: 'Contract whose value depends on an underlying asset.', ur: 'Contract jiski qeemat underlying asset pe depend karti hai.', tracks: ['spot', 'futures', 'options', 'crypto'] },
  { term: 'Underlying', en: 'The asset a derivative references (stock, index, coin, FX).', ur: 'Woh asset jisko derivative reference karta hai.', tracks: ['options', 'futures', 'greeks'] },
  { term: 'Hedge', en: 'A position meant to reduce risk of another exposure.', ur: 'Doosri exposure ka risk kam karne wali position.', tracks: ['futures', 'options', 'spot'] },
  { term: 'Speculation', en: 'Taking risk for profit without hedging an existing exposure.', ur: 'Maujooda exposure hedge kiye baghair profit ke liye risk.', tracks: ['foundations', 'futures'] },
  { term: 'Volatility', en: 'How much price tends to move — higher vol = wider swings.', ur: 'Price kitni harkat karti hai — zyada vol = bari swings.', tracks: ['crypto', 'options', 'greeks', 'macro'] },
  { term: 'Bull', en: 'Optimistic side of the market; expecting prices up.', ur: 'Market ka optimistic side — prices upar umeed.', tracks: ['foundations', 'stocks', 'crypto'] },
  { term: 'Bear', en: 'Pessimistic side of the market; expecting prices down.', ur: 'Market ka pessimistic side — prices neeche umeed.', tracks: ['foundations', 'stocks', 'crypto'] },
  { term: 'Bullish', en: 'Bias or setup that favors rising prices.', ur: 'Bias/setup jo rising prices favor kare.', tracks: ['foundations', 'crypto'] },
  { term: 'Bearish', en: 'Bias or setup that favors falling prices.', ur: 'Bias/setup jo falling prices favor kare.', tracks: ['foundations', 'crypto'] },
  { term: 'Trend', en: 'Persistent direction of highs/lows (up, down, or none).', ur: 'Highs/lows ki persistent direction (up, down, ya nahi).', tracks: ['crypto', 'foundations'] },
  { term: 'Gap', en: 'Jump between prior close and next open with little trading between.', ur: 'Pehle close aur agli open ke beech jump — beech mein kam trade.', tracks: ['stocks', 'futures'] },
  { term: 'Candlestick', en: 'Chart bar showing open/high/low/close for a period.', ur: 'Period ka open/high/low/close dikhane wala chart bar.', tracks: ['crypto', 'foundations'] },
  { term: 'Order book', en: 'Live list of resting bids and asks at each price.', ur: 'Har price pe resting bids/asks ki live list.', tracks: ['crypto', 'stocks'] },
  { term: 'Market depth', en: 'How much size sits on the book near the best bid/ask.', ur: 'Best bid/ask ke qareeb book pe kitna size.', tracks: ['crypto', 'stocks'] },
  { term: 'Maker', en: 'Order that adds liquidity to the book (usually a resting limit).', ur: 'Book mein liquidity add karne wala order (aksar resting limit).', tracks: ['crypto'] },
  { term: 'Taker', en: 'Order that removes liquidity by hitting the book.', ur: 'Book hit karke liquidity hataane wala order.', tracks: ['crypto'] },
  { term: 'ROE', en: 'Return on equity — profit relative to shareholder equity.', ur: 'Return on equity — shareholder equity ke muqable munafa.', tracks: ['invest'] },
  { term: 'P/B', en: 'Price-to-book — price divided by net assets per share.', ur: 'Price-to-book — price ÷ net assets per share.', tracks: ['invest'] },
  { term: 'Debt/equity', en: 'Leverage of the balance sheet — debt relative to equity.', ur: 'Balance sheet leverage — equity ke muqable debt.', tracks: ['invest'] },
  { term: 'Mutual fund', en: 'Pooled fund managed for investors (often daily NAV, not exchange-traded).', ur: 'Investors ke liye pooled fund (aksar daily NAV, exchange-traded nahi).', tracks: ['invest'] },
  { term: 'AMC', en: 'Asset Management Company — runs mutual funds under regulation.', ur: 'Asset Management Company — regulated mutual funds chalati hai.', tracks: ['invest'] },
  { term: 'Diversification', en: 'Spreading capital so one bet cannot sink the plan.', ur: 'Capital failana taake ek bet plan na dubaye.', tracks: ['invest', 'spot'] },
  { term: 'Asset allocation', en: 'Mix of cash, bonds, equities, etc. by plan — not by mood.', ur: 'Plan ke mutabiq cash/bonds/equities mix — mood se nahi.', tracks: ['invest', 'macro'] },
  { term: 'Rebalancing', en: 'Restoring target weights after markets move them.', ur: 'Market move ke baad target weights wapas.', tracks: ['invest'] },
  { term: 'Yield', en: 'Income return (dividend/interest) relative to price or face.', ur: 'Income return (dividend/interest) price/face ke hisaab se.', tracks: ['invest', 'macro'] },
  { term: 'Equity', en: 'Ownership claim on a company (shares) or account residual.', ur: 'Company ownership (shares) ya account ka baqi hissa.', tracks: ['invest', 'foundations'] },
  { term: 'Prospectus', en: 'Legal document describing an offering and its risks.', ur: 'Offering aur risks batane wala qanooni document.', tracks: ['invest'] },
  { term: 'SECP', en: 'Securities and Exchange Commission of Pakistan — markets regulator.', ur: 'Pakistan ka securities/markets regulator (SECP).', tracks: ['invest', 'foundations', 'tax'] },
  { term: 'TREC', en: 'Trading Right Entitlement Certificate — licensed PSX broker status.', ur: 'Trading Right Entitlement Certificate — licensed PSX broker.', tracks: ['invest', 'foundations'] },
  { term: 'Inflation', en: 'General rise in prices that erodes cash purchasing power.', ur: 'Prices ka aam barhao jo cash ki quwwat-e-kharid khata hai.', tracks: ['macro', 'invest'] },
  { term: 'Interest rate', en: 'Cost of borrowing / reward for lending — set by markets and policy.', ur: 'Qarz ki qeemat / lend ka reward — markets + policy.', tracks: ['macro', 'forex'] },
  { term: 'Real return', en: 'Return after subtracting inflation.', ur: 'Inflation nikaal kar return.', tracks: ['macro', 'invest'] },
  { term: 'Risk-free rate', en: 'Yield on trusted government paper used as a valuation baseline.', ur: 'Trusted sarkari paper ka yield — valuation baseline.', tracks: ['macro', 'invest'] },
  { term: 'Risk-on', en: 'Regime where investors bid speculative assets harder.', ur: 'Regime jahan speculative assets zyada bid hote hain.', tracks: ['macro'] },
  { term: 'Risk-off', en: 'Regime where investors prefer cash and quality, cut risk.', ur: 'Regime jahan cash/quality pasand, risk cut.', tracks: ['macro'] },
  { term: 'Regime', en: 'Macro backdrop phase (growth, inflation, liquidity) lasting weeks–months.', ur: 'Macro backdrop phase — hafton–mahine (growth, inflation, liquidity).', tracks: ['macro'] },
  { term: 'Liquidity (macro)', en: 'How easy money and credit flow through the system.', ur: 'System mein paisa/credit kitni aasani se behta hai.', tracks: ['macro'] },
  { term: 'Capital gains', en: 'Profit from selling an asset above its cost basis.', ur: 'Asset ko cost se upar bechne ka munafa.', tracks: ['tax', 'invest'] },
  { term: 'Cost basis', en: 'What you paid (plus allowed costs) used to measure gain/loss.', ur: 'Jo ada kiya (plus allowed costs) — gain/loss napne ke liye.', tracks: ['tax', 'invest'] },
  { term: 'Filer', en: 'Taxpayer who files returns as required in Pakistan framing.', ur: 'Pakistan framing mein returns file karne wala taxpayer.', tracks: ['tax'] },
  { term: 'Non-filer', en: 'Status for those who have not filed — often different withholding.', ur: 'Jo file nahi kiye — aksar alag withholding.', tracks: ['tax'] },
  { term: 'NCCPL', en: 'National Clearing Company of Pakistan Limited — clearing/settlement.', ur: 'National Clearing Company of Pakistan — clearing/settlement.', tracks: ['tax', 'invest'] },
  { term: 'Withholding tax', en: 'Tax deducted at source before you receive proceeds.', ur: 'Proceeds se pehle source pe katne wala tax.', tracks: ['tax'] },
  { term: 'Tax certificate', en: 'Broker/year statement used for filing — keep offline copies.', ur: 'Filing ke liye broker/saal statement — offline copies rakho.', tracks: ['tax'] },
  { term: 'FBR', en: 'Federal Board of Revenue — Pakistan tax authority.', ur: 'Pakistan ki federal tax authority (FBR).', tracks: ['tax'] },
  { term: 'ITM', en: 'In the money — option has intrinsic value.', ur: 'In the money — option mein intrinsic value.', tracks: ['options', 'greeks', 'stocks'] },
  { term: 'OTM', en: 'Out of the money — option has no intrinsic value now.', ur: 'Out of the money — abhi intrinsic value nahi.', tracks: ['options', 'greeks', 'stocks'] },
  { term: 'ATM', en: 'At the money — strike near the underlying price.', ur: 'At the money — strike underlying ke qareeb.', tracks: ['options', 'greeks'] },
  { term: 'Exercise', en: 'Using an option right to buy/sell the underlying at strike.', ur: 'Option right use karke strike pe underlying buy/sell.', tracks: ['options'] },
  { term: 'Assignment', en: 'Obligation of an option seller when the buyer exercises.', ur: 'Buyer exercise kare to seller ki obligation.', tracks: ['options'] },
  { term: 'Naked option', en: 'Short option without a defined hedge — undefined risk on shorts of calls.', ur: 'Bina defined hedge short option — short calls pe undefined risk.', tracks: ['options', 'greeks'] },
  { term: 'Defined risk', en: 'Max loss known at entry (e.g. debit spread, long option).', ur: 'Entry pe max loss maloom (jaise debit spread, long option).', tracks: ['options', 'greeks'] },
  { term: 'Greeks', en: 'Sensitivities of option price (delta, gamma, theta, vega, etc.).', ur: 'Option price ki sensitivities (delta, gamma, theta, vega…).', tracks: ['greeks', 'options'] },
  { term: 'Isolated margin', en: 'Margin locked per position — loss capped to that pocket.', ur: 'Har position ka alag margin — loss us pocket tak.', tracks: ['crypto'] },
  { term: 'Cross margin', en: 'Shared margin across positions — one loss can hit the whole account.', ur: 'Positions pe shared margin — ek loss poora account chhoo sakta.', tracks: ['crypto'] },
  { term: 'Funding', en: 'See funding rate — periodic perp payment between longs and shorts.', ur: 'Funding rate dekho — perps pe longs/shorts ke beech periodic payment.', tracks: ['crypto'] },
  { term: 'Alpha', en: 'Return above a benchmark after risk adjustment (hard to prove).', ur: 'Benchmark se upar return (risk ke baad) — sabit karna mushkil.', tracks: ['invest', 'bots'] },
  { term: 'Beta', en: 'Sensitivity of an asset to market moves.', ur: 'Asset ki market moves se sensitivity.', tracks: ['invest', 'macro'] },
  { term: 'Emergency fund', en: 'Cash buffer for living costs before risk assets.', ur: 'Risk assets se pehle guzara ke liye cash buffer.', tracks: ['invest', 'foundations'] },
  { term: 'Blue chip', en: 'Large, established company shares — still can fall hard.', ur: 'Badi established company ke shares — phir bhi zor se gir sakte.', tracks: ['invest', 'stocks'] },
  { term: 'Circuit breaker', en: 'Exchange halt when price moves too far too fast.', ur: 'Price bohat tez/zyada move pe exchange halt.', tracks: ['stocks', 'invest'] },
  { term: 'Bond', en: 'Debt instrument — you lend, they pay interest and principal.', ur: 'Debt instrument — aap lend, woh interest + principal.', tracks: ['invest', 'macro'] },
  { term: 'Coupon', en: 'Scheduled interest payment on a bond.', ur: 'Bond pe scheduled interest payment.', tracks: ['invest', 'macro'] },
  { term: 'NAV', en: 'Net asset value — fund assets minus liabilities per unit.', ur: 'Net asset value — fund assets − liabilities per unit.', tracks: ['invest'] },
  { term: 'Process', en: 'Rules you follow before/during/after a trade — graded over P/L.', ur: 'Trade se pehle/dauran/baad ke rules — P/L se upar grade.', tracks: ['foundations', 'crypto'] },
  { term: 'Discipline', en: 'Obeying your plan when emotion wants an exception.', ur: 'Jab emotion exception maange tab bhi plan manna.', tracks: ['foundations'] },
  { term: 'Revenge trading', en: 'See Revenge trade — trading to erase a loss emotionally.', ur: 'Revenge trade dekho — loss mitaane ke liye emotional trading.', tracks: ['foundations', 'crypto'] },
  { term: 'HH', en: 'Higher high — shorthand for an uptrend swing high.', ur: 'Higher high — uptrend swing high ka short form.', tracks: ['crypto'] },
  { term: 'HL', en: 'Higher low — shorthand for an uptrend swing low.', ur: 'Higher low — uptrend swing low ka short form.', tracks: ['crypto'] },
  { term: 'LH', en: 'Lower high — downtrend swing high.', ur: 'Lower high — downtrend ka swing high.', tracks: ['crypto'] },
  { term: 'LL', en: 'Lower low — downtrend swing low.', ur: 'Lower low — downtrend ka swing low.', tracks: ['crypto'] },
  { term: 'Options', en: 'Contracts giving the right (not obligation) to buy/sell at a strike.', ur: 'Contracts jo strike pe buy/sell ka right dete (obligation nahi).', tracks: ['options', 'stocks'] },
  { term: 'Perps', en: 'Perpetual futures — crypto contracts with funding, no expiry.', ur: 'Perpetual futures — funding wale crypto contracts, bina expiry.', tracks: ['crypto', 'spot'] },
  { term: 'Margin call', en: 'Demand for more collateral when equity falls near maintenance.', ur: 'Equity maintenance ke qareeb — zyada collateral ki demand.', tracks: ['futures', 'crypto'] },
  { term: 'Notional exposure', en: 'Full market value controlled — often much larger than margin posted.', ur: 'Full market value control — aksar margin se bohat bari.', tracks: ['futures', 'crypto'] },
  { term: 'Settlement date', en: 'When cash/securities finally exchange hands after a trade.', ur: 'Trade ke baad cash/securities kab transfer.', tracks: ['spot', 'invest'] },
  { term: 'T+1 / T+2', en: 'Settlement cycle — trade date plus one or two business days.', ur: 'Settlement cycle — trade date + 1/2 business days.', tracks: ['invest', 'stocks'] },
  { term: 'Legal advice', en: 'Personalized counsel from a qualified practitioner — this app is not that.', ur: 'Qualified practitioner ki personal salah — ye app woh nahi.', tracks: ['tax'] },
  { term: 'Investment advice', en: 'Personalized recommendation to buy/sell — MasteryCap teaches frameworks only.', ur: 'Buy/sell ki personal recommendation — MasteryCap sirf frameworks.', tracks: ['foundations', 'invest'] },
];

export function searchGlossary(q) {
  const s = String(q || '').trim().toLowerCase();
  if (!s) return GLOSSARY.slice();
  return GLOSSARY.filter((g) =>
    g.term.toLowerCase().includes(s) ||
    g.en.toLowerCase().includes(s) ||
    g.ur.toLowerCase().includes(s)
  );
}

export function findTerm(term) {
  const t = String(term || '').toLowerCase();
  return GLOSSARY.find((g) => g.term.toLowerCase() === t) || null;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Auto-link known glossary terms in HTML text nodes (P7b). Longest match first, non-overlapping. */
export function linkGlossaryTerms(html) {
  if (!html) return html;
  const ranked = GLOSSARY.slice().sort((a, b) => b.term.length - a.term.length);
  const parts = String(html).split(/(<[^>]+>)/);
  return parts.map((part) => {
    if (!part || part.startsWith('<')) return part;
    const hits = [];
    ranked.forEach((g) => {
      const re = new RegExp(`\\b${escapeRe(g.term)}\\b`, 'gi');
      let m;
      while ((m = re.exec(part)) !== null) {
        const start = m.index;
        const end = start + m[0].length;
        if (hits.some((h) => start < h.end && end > h.start)) continue;
        hits.push({ start, end, text: m[0], term: g.term });
      }
    });
    hits.sort((a, b) => a.start - b.start);
    if (!hits.length) return part;
    let out = '';
    let cursor = 0;
    hits.forEach((h) => {
      out += part.slice(cursor, h.start);
      out += `<button type="button" class="gloss-term" data-term="${h.term}">${h.text}</button>`;
      cursor = h.end;
    });
    out += part.slice(cursor);
    return out;
  }).join('');
}
