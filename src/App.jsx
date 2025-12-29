// App.jsx
import React, { useState, useEffect } from 'react';
import { 
  FiUser, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiHome,
  FiMessageSquare,
  FiSend,
  FiMenu,
  FiX,
  FiBell,
  FiCreditCard,
  FiDollarSign,
  FiArrowRight,
  FiArrowLeft,
  FiCheckCircle,
  FiInfo,
  FiSmartphone,
  FiChevronDown,
  FiSearch,
  FiPlus,
  FiCalendar,
  FiClock,
  FiDownload,
  FiFilter,
  FiMoreVertical
} from 'react-icons/fi';
import { BsPhone, BsShieldCheck } from 'react-icons/bs';
import { TbPigMoney } from 'react-icons/tb';

// Configuration - you can edit these variables
const CONFIG = {
  username: "Jameskilbride",
  password: "G@4actu5",
  firstName: "James",
  lastName: "Kilbride",
  checkingAccount: {
    number: "****9025",
    currentBalance: 12543.67,
    availableBalance: 652553.00
  },
  savingsAccount: {
    number: "****4872",
    currentBalance: 45289.31,
    availableBalance: 45289.31
  },
  phoneNumber: "833-260-4320",
  creditCard: {
    number: "****5632",
    balance: 2456.89,
    availableCredit: 12543.11,
    dueDate: "Dec 15, 2025",
    minPayment: 35.00
  }
};

// Recent transactions data
const RECENT_TRANSACTIONS = [
  { id: 1, type: 'debit', description: 'Amazon Purchase', amount: -89.99, date: 'Dec 5, 2025', category: 'Shopping', status: 'Completed' },
  { id: 2, type: 'credit', description: 'Direct Deposit', amount: 3200.00, date: 'Dec 1, 2025', category: 'Income', status: 'Completed' },
  { id: 3, type: 'debit', description: 'Netflix Subscription', amount: -15.99, date: 'Nov 28, 2025', category: 'Entertainment', status: 'Completed' },
  { id: 4, type: 'debit', description: 'Grocery Store', amount: -125.43, date: 'Nov 25, 2025', category: 'Food', status: 'Completed' },
  { id: 5, type: 'credit', description: 'Transfer from Savings', amount: 1000.00, date: 'Nov 20, 2025', category: 'Transfer', status: 'Completed' },
  { id: 6, type: 'debit', description: 'Gas Station', amount: -45.67, date: 'Nov 18, 2025', category: 'Transportation', status: 'Pending' },
];

// Bills data
const UPCOMING_BILLS = [
  { id: 1, name: 'Mortgage', amount: 1850.00, dueDate: 'Jan 15, 2026', status: 'Upcoming' },
  { id: 2, name: 'Car Payment', amount: 420.00, dueDate: 'Jan 20, 2026', status: 'Upcoming' },
  { id: 3, name: 'Credit Card', amount: 245.00, dueDate: 'Jan 10, 2026', status: 'Due Soon' },
];

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [showMenu, setShowMenu] = useState(false);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [transferAmount, setTransferAmount] = useState('652553');
  const [transferAccount, setTransferAccount] = useState('');
  const [transferNote, setTransferNote] = useState('');
  const [showTransferError, setShowTransferError] = useState(false);
  const [showDepositMessage, setShowDepositMessage] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTransferModal, setShowTransferModal] = useState(false);

  // Splash screen effect
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('login');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === CONFIG.username && password === CONFIG.password) {
      setCurrentScreen('dashboard');
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setCurrentScreen('login');
    setUsername('');
    setPassword('');
    setActiveTab('home');
    setShowMenu(false);
    setShowProfileMenu(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
        setMessage('');
      }, 3000);
    }
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    setShowTransferError(true);
    setTimeout(() => {
      setShowTransferError(false);
      setTransferAmount('652553');
      setTransferAccount('');
      setTransferNote('');
    }, 3000);
  };

  const slides = [
    {
      title: "Bask Interest Checking",
      accountNumber: CONFIG.checkingAccount.number,
      type: "checking",
      balance: CONFIG.checkingAccount.currentBalance,
      available: CONFIG.checkingAccount.availableBalance,
      bgColor: "bg-gradient-to-br from-blue-50 to-white",
      borderColor: "border-blue-100",
      icon: <FiCreditCard className="text-3xl text-blue-600" />
    },
    {
      title: "Bask Savings Account",
      accountNumber: CONFIG.savingsAccount.number,
      type: "savings",
      balance: CONFIG.savingsAccount.currentBalance,
      available: CONFIG.savingsAccount.availableBalance,
      bgColor: "bg-gradient-to-br from-green-50 to-white",
      borderColor: "border-green-100",
      icon: <TbPigMoney className="text-3xl text-green-600" />
    },
    {
      title: "Bask Credit Card",
      accountNumber: CONFIG.creditCard.number,
      type: "credit",
      balance: CONFIG.creditCard.balance,
      available: CONFIG.creditCard.availableCredit,
      bgColor: "bg-gradient-to-br from-purple-50 to-white",
      borderColor: "border-purple-100",
      icon: <FiCreditCard className="text-3xl text-purple-600" />
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const filteredTransactions = RECENT_TRANSACTIONS.filter(transaction =>
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (currentScreen === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="bg-white/10 backdrop-blur-sm rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
            <BsShieldCheck className="text-white text-5xl" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Bask Bank</h1>
          <div className="w-24 h-1 bg-white/80 mx-auto mb-6"></div>
          <p className="text-white/90 text-lg font-light animate-pulse">Digital Banking Experience</p>
        </div>
      </div>
    );
  }

  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1e444e] to-[#2c5a65] py-8 px-6 text-center relative">
              <div className="absolute top-4 left-6">
                <BsShieldCheck className="text-white/40 text-xl" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Bask Bank</h1>
              <p className="text-white/80 text-sm mt-2 font-light">Secure Digital Banking</p>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleLogin}>
                {loginError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm animate-shake">
                    <div className="flex items-center">
                      <FiInfo className="text-red-500 mr-2 flex-shrink-0" />
                      <span className="text-red-700">{loginError}</span>
                    </div>
                  </div>
                )}

                {/* Username */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Username
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3.5 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-gray-400 transition-all"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                  {/* <p className="mt-2 text-xs text-gray-500">
                    Demo: <span className="font-medium">{CONFIG.username}</span>
                  </p> */}
                </div>

                {/* Password */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3.5 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-gray-400 transition-all"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? 
                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" /> : 
                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      }
                    </button>
                  </div>
                  {/* <p className="mt-2 text-xs text-gray-500">
                    Demo: <span className="font-medium">{CONFIG.password}</span>
                  </p> */}
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 border-gray-300"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3.5 px-4 rounded-xl hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
                >
                  Sign In
                </button>

                {/* Contact us */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Need assistance? Call{" "}
                    <a href={`tel:${CONFIG.phoneNumber}`} className="font-medium text-orange-600 hover:text-orange-700 transition-colors">
                      {CONFIG.phoneNumber}
                    </a>
                  </p>
                </div>

                {/* Additional links */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                    <button type="button" className="text-orange-600 hover:text-orange-700 transition-colors font-medium">
                      New to Bask Bank?
                    </button>
                    <span className="text-gray-300">•</span>
                    <button type="button" className="text-orange-600 hover:text-orange-700 transition-colors font-medium">
                      Forgot username?
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                    <button type="button" className="text-gray-600 hover:text-gray-800 transition-colors">
                      Unlock account
                    </button>
                    <span className="text-gray-300">•</span>
                    <button type="button" className="text-gray-600 hover:text-gray-800 transition-colors">
                      Privacy notice
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <BsShieldCheck />
              <p className="text-sm">
                Bask Bank is a division of Texas Capital Bank
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Member FDIC • Equal Housing Lender • © {new Date().getFullYear()} Bask Bank
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#1e444e] to-[#2c5a65] text-white px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <BsShieldCheck className="text-xl" />
              <h1 className="text-xl font-bold tracking-tight">Bask Bank</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-medium">
                    {CONFIG.firstName.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{CONFIG.firstName}</span>
                  <FiChevronDown className={`transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{CONFIG.firstName} {CONFIG.lastName}</p>
                      <p className="text-xs text-gray-500 mt-1">Premium Banking Member</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Profile Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Security Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 border-t border-gray-100 mt-1"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-2">
            <p className="text-white/90">
              {getGreeting()}, {CONFIG.firstName} 👋
            </p>
            <p className="text-white/70 text-sm mt-1">Welcome to your digital banking dashboard</p>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 pb-24">
          {/* Account Cards Slider */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">My Accounts</h2>
              <div className="flex space-x-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-white shadow hover:shadow-md transition"
                >
                  <FiArrowLeft className="text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-white shadow hover:shadow-md transition"
                >
                  <FiArrowRight className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Card Slider */}
            <div className="relative">
              <div className={`${slides[currentSlide].bgColor} border ${slides[currentSlide].borderColor} rounded-2xl p-6 shadow-lg transition-all duration-300`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{slides[currentSlide].title}</h3>
                    <p className="text-gray-600 text-sm">{slides[currentSlide].accountNumber}</p>
                  </div>
                  {slides[currentSlide].icon}
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Balance</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {formatCurrency(slides[currentSlide].balance)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">
                        {slides[currentSlide].type === 'credit' ? 'Available Credit' : 'Available Balance'}
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatCurrency(slides[currentSlide].available)}
                      </p>
                    </div>
                    {slides[currentSlide].type === 'credit' && (
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Due Date</p>
                        <p className="font-medium text-gray-800">{CONFIG.creditCard.dueDate}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Slide indicators */}
                <div className="flex justify-center mt-6 space-x-1.5">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentSlide ? 'bg-gray-800 w-4' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              onClick={() => setShowTransferModal(true)}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <FiArrowRight className="text-orange-500 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800">Transfer</h3>
              <p className="text-sm text-gray-600 mt-1">Move money</p>
            </button>

            <button
              onClick={() => setShowDepositMessage(true)}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <BsPhone className="text-blue-500 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800">Deposit</h3>
              <p className="text-sm text-gray-600 mt-1">Mobile check deposit</p>
            </button>

            <button
              onClick={() => { setActiveTab('messages'); setShowMenu(false); }}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <FiMessageSquare className="text-green-500 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800">Messages</h3>
              <p className="text-sm text-gray-600 mt-1">Contact support</p>
            </button>

            <button
              onClick={() => { setShowMenu(true); setActiveTab('menu'); }}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <FiPlus className="text-purple-500 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800">More</h3>
              <p className="text-sm text-gray-600 mt-1">Additional services</p>
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow mb-8 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Recent Transactions</h3>
                <button className="text-sm text-orange-600 font-medium hover:text-orange-700">
                  View All
                </button>
              </div>
              
              {/* Search bar */}
              <div className="relative mt-4">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <FiArrowRight className="text-green-600" />
                        ) : (
                          <FiArrowLeft className="text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{transaction.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{transaction.date}</span>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">{transaction.category}</span>
                          {transaction.status === 'Pending' && (
                            <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-gray-800'}`}>
                      {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Bills */}
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl shadow p-5 mb-8 border border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Upcoming Bills</h3>
              <FiCalendar className="text-blue-500" />
            </div>
            
            <div className="space-y-3">
              {UPCOMING_BILLS.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition">
                  <div>
                    <p className="font-medium text-gray-800">{bill.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <FiClock className="text-gray-400 text-xs" />
                      <span className="text-xs text-gray-600">Due {bill.dueDate}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        bill.status === 'Due Soon' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {bill.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{formatCurrency(bill.amount)}</p>
                    <button className="text-xs text-orange-600 hover:text-orange-700 font-medium mt-1">
                      Pay Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-white rounded-lg border border-gray-300 transition">
              Schedule All Payments
            </button>
          </div>

          {/* Messages Section - Only shown when messages tab is active */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-2xl shadow p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Send Secure Message</h3>
              {messageSent && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                  <div className="flex items-center">
                    <FiCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                    <p className="text-green-700">Message sent successfully! We'll respond within 24 hours.</p>
                  </div>
                </div>
              )}
              <form onSubmit={handleSendMessage}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="What is this regarding?"
                    defaultValue="General Inquiry"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows="4"
                    placeholder="Type your message here..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition font-medium shadow-md hover:shadow-lg"
                >
                  Send Secure Message
                </button>
              </form>
            </div>
          )}

          {/* Menu Overlay */}
          {showMenu && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in">
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl animate-slide-in">
                <div className="p-6 h-full overflow-y-auto">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-gray-800">Menu</h3>
                    <button 
                      onClick={() => setShowMenu(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      <FiX className="text-2xl text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    <button className="w-full text-left p-4 hover:bg-gray-50 rounded-xl transition flex items-center justify-between">
                      <span className="font-medium text-gray-800">Account Statements</span>
                      <FiDownload className="text-gray-400" />
                    </button>
                    <button className="w-full text-left p-4 hover:bg-gray-50 rounded-xl transition flex items-center justify-between">
                      <span className="font-medium text-gray-800">Bill Pay</span>
                      <FiCalendar className="text-gray-400" />
                    </button>
                    <button className="w-full text-left p-4 hover:bg-gray-50 rounded-xl transition flex items-center justify-between">
                      <span className="font-medium text-gray-800">Card Controls</span>
                      <FiCreditCard className="text-gray-400" />
                    </button>
                    <button className="w-full text-left p-4 hover:bg-gray-50 rounded-xl transition flex items-center justify-between">
                      <span className="font-medium text-gray-800">Account Settings</span>
                      <FiUser className="text-gray-400" />
                    </button>
                    <button className="w-full text-left p-4 hover:bg-gray-50 rounded-xl transition flex items-center justify-between">
                      <span className="font-medium text-gray-800">Security & Privacy</span>
                      <BsShieldCheck className="text-gray-400" />
                    </button>
                    <button className="w-full text-left p-4 hover:bg-gray-50 rounded-xl transition flex items-center justify-between">
                      <span className="font-medium text-gray-800">Help & Support</span>
                      <FiInfo className="text-gray-400" />
                    </button>
                    <button className="w-full text-left p-4 hover:bg-gray-50 rounded-xl transition flex items-center justify-between">
                      <span className="font-medium text-gray-800">Rate Our App</span>
                      <div className="text-yellow-500">★★★★★</div>
                    </button>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Bask Bank Mobile v2.4.1</p>
                      <p className="text-xs text-gray-500 mt-1">Member FDIC • © {new Date().getFullYear()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transfer Modal */}
          {showTransferModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scale-up">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Transfer Funds</h3>
                  <button 
                    onClick={() => {
                      setShowTransferModal(false);
                      setShowTransferError(false);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <FiX className="text-xl text-gray-600" />
                  </button>
                </div>

                {showTransferError && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg animate-fade-in">
                    <div className="flex items-center">
                      <FiInfo className="text-yellow-500 mr-2 flex-shrink-0" />
                      <p className="text-yellow-700">
                        Unfortunately, you need to be added as a beneficiary before making transfers.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleTransfer}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                        <input
                          type="number"
                          value={transferAmount}
                          onChange={(e) => setTransferAmount(e.target.value)}
                          className="w-full pl-8 pr-3 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Available: {formatCurrency(CONFIG.checkingAccount.availableBalance)}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Account
                      </label>
                      <select className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option>Bask Interest Checking (****9025) - {formatCurrency(CONFIG.checkingAccount.availableBalance)}</option>
                        <option>Bask Savings Account (****4872) - {formatCurrency(CONFIG.savingsAccount.availableBalance)}</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        To Account
                      </label>
                      <input
                        type="text"
                        value={transferAccount}
                        onChange={(e) => setTransferAccount(e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter account number or select contact"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Note (Optional)
                      </label>
                      <input
                        type="text"
                        value={transferNote}
                        onChange={(e) => setTransferNote(e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Add a note for this transfer"
                      />
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Transfer Amount:</span>
                        <span className="text-lg font-bold text-gray-800">{formatCurrency(parseFloat(transferAmount) || 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Fee:</span>
                        <span className="text-green-600 font-medium">$0.00</span>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition font-medium shadow-md hover:shadow-lg text-lg"
                    >
                      Transfer {formatCurrency(parseFloat(transferAmount) || 0)}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setShowTransferModal(false)}
                      className="w-full py-3 text-gray-700 hover:text-gray-900 transition font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Mobile Deposit Message */}
          {showDepositMessage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-scale-up">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BsPhone className="text-blue-500 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Mobile Check Deposit</h3>
                  <p className="text-gray-600 mb-6">
                    We're currently upgrading our mobile deposit system to provide you with an even better experience. 
                    Please visit a nearby branch or ATM for check deposits during this time.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowDepositMessage(false)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition font-medium"
                    >
                      Got it
                    </button>
                    <button className="w-full py-3 text-gray-700 hover:text-gray-900 transition font-medium">
                      Find Nearby ATM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="flex justify-around items-center py-3">
            <button
              onClick={() => { setActiveTab('home'); setShowMenu(false); }}
              className={`flex flex-col items-center ${activeTab === 'home' ? 'text-orange-500' : 'text-gray-500'} transition`}
            >
              <div className={`p-2 rounded-lg ${activeTab === 'home' ? 'bg-orange-50' : ''}`}>
                <FiHome className="text-xl" />
              </div>
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              onClick={() => setShowDepositMessage(true)}
              className={`flex flex-col items-center text-gray-500 hover:text-orange-500 transition`}
            >
              <div className="p-2 rounded-lg">
                <BsPhone className="text-xl" />
              </div>
              <span className="text-xs mt-1">Deposit</span>
            </button>
            <button
              onClick={() => { setActiveTab('messages'); setShowMenu(false); }}
              className={`flex flex-col items-center ${activeTab === 'messages' ? 'text-orange-500' : 'text-gray-500'} transition`}
            >
              <div className={`p-2 rounded-lg ${activeTab === 'messages' ? 'bg-orange-50' : ''}`}>
                <FiMessageSquare className="text-xl" />
              </div>
              <span className="text-xs mt-1">Messages</span>
            </button>
            <button
              onClick={() => setShowTransferModal(true)}
              className={`flex flex-col items-center text-gray-500 hover:text-orange-500 transition`}
            >
              <div className="p-2 rounded-lg">
                <FiSend className="text-xl" />
              </div>
              <span className="text-xs mt-1">Transfer</span>
            </button>
            <button
              onClick={() => { setShowMenu(true); setActiveTab('menu'); }}
              className={`flex flex-col items-center ${activeTab === 'menu' ? 'text-orange-500' : 'text-gray-500'} transition`}
            >
              <div className={`p-2 rounded-lg ${activeTab === 'menu' ? 'bg-orange-50' : ''}`}>
                <FiMenu className="text-xl" />
              </div>
              <span className="text-xs mt-1">Menu</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;