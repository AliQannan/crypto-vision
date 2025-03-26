import React from 'react';
import { BarChart, LineChart, PieChart, TrendingUp } from 'lucide-react'; // Removed Candlestick


function AnalysisPage() {
  const analysisTools = [
    {
      title: 'Technical Indicators',
      description: 'Advanced charting with RSI, MACD, Bollinger Bands, and more',
      icon: <BarChart className="w-8 h-8" />,
      features: ['RSI', 'MACD', 'Bollinger Bands', 'Moving Averages']
    },
    {
      title: 'Price Trends',
      description: 'Historical price analysis and trend identification',
      icon: <LineChart className="w-8 h-8" />,
      features: ['1D/7D/30D trends', 'Support/Resistance', 'Volume Analysis']
    },
    {
      title: 'Market Sentiment',
      description: 'Real-time market sentiment analysis',
      icon: <PieChart className="w-8 h-8" />,
      features: ['Social Media Analysis', 'News Sentiment', 'Whale Tracking']
    },
    {
      title: 'Candlestick Patterns',
      description: 'Identify and analyze candlestick patterns',
      icon: <TrendingUp className="w-8 h-8" />, // Replaced Candlestick with TrendingUp
      features: ['Bullish/Bearish Patterns', 'Reversal Patterns', 'Continuation Patterns']
    }
  ];

  // Rest of the code remains the same...

  const popularAnalyses = [
    {
      coin: 'BTC',
      name: 'Bitcoin',
      analysis: 'Bullish trend continuation',
      confidence: '82%',
      timeframe: 'Next 7 days'
    },
    {
      coin: 'ETH',
      name: 'Ethereum',
      analysis: 'Potential breakout',
      confidence: '75%',
      timeframe: 'Next 5 days'
    },
    {
      coin: 'ADA',
      name: 'Cardano',
      analysis: 'Consolidation phase',
      confidence: '68%',
      timeframe: 'Next 3 days'
    }
  ];
   

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {}
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <TrendingUp className="w-10 h-10 text-purple-400" />
            Advanced Market Analysis
          </h1>
          <p className="text-xl text-gray-300">
            Comprehensive tools and insights for cryptocurrency market analysis
          </p>
        </div>

        {/* Analysis Tools Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {analysisTools.map((tool, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-400 transition-colors">
              <div className="text-purple-400 mb-4">{tool.icon}</div>
              <h2 className="text-xl font-semibold text-white mb-2">{tool.title}</h2>
              <p className="text-gray-400 mb-4">{tool.description}</p>
              <ul className="space-y-2">
                {tool.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Popular Analyses Section */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Popular Analyses</h2>
          <div className="space-y-4">
            {popularAnalyses.map((analysis, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-400/20 rounded-lg flex items-center justify-center">
                      <span className="text-purple-400 font-medium">{analysis.coin}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{analysis.name}</h3>
                      <p className="text-sm text-gray-400">{analysis.analysis}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-semibold ${
                      analysis.confidence >= '75%' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {analysis.confidence}
                    </div>
                    <div className="text-sm text-gray-400">{analysis.timeframe}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Analysis Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Volume Analysis</h3>
            <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
              <BarChart className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Market Sentiment</h3>
            <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
              <PieChart className="w-12 h-12 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;