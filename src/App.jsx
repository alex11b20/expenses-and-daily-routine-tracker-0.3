import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Camera,
  PieChart,
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  AlertTriangle,
  Settings,
  Sparkles,
  Check,
  X,
  ShoppingBag,
  Search,
  ListPlus,
  Wrench,
  Car,
  Hammer,
  Package,
  Calculator,
  Palette,
  Activity,
  Globe,
  Lock,
  Gift,
  Target,
  Heart,
  CheckCircle2,
  Menu,
  UserPlus,
  Copy,
  HeartHandshake,
  UserCheck,
  Bell,
  BellRing,
  Smile,
  LogOut,
  LogIn,
  KeyRound,
  AtSign,
  UserCircle,
  CalendarDays
} from 'lucide-react';

const WORLD_CURRENCIES = [
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'RSD' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'GBP', name: 'British Pound', symbol: '£' }
];

const CATEGORIES = [
  { id: 'Food', label: 'Food & Groceries', icon: '🛒', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { id: 'Utilities', label: 'Utilities & Bills', icon: '⚡', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { id: 'Transport', label: 'Transportation & Fuel', icon: '🚗', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { id: 'Housing', label: 'Housing & Rent', icon: '🏠', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { id: 'Entertainment', label: 'Entertainment & Dining', icon: '☕', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
  { id: 'Health', label: 'Health & Medical', icon: '💊', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { id: 'Salary', label: 'Salary & Income', icon: '💼', color: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
  { id: 'Other', label: 'Other Expenses', icon: '📦', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' }
];

const FINANCIAL_FUN_FACTS = [
  "💡 Fun Fact: The word 'bankrupt' comes from the Italian 'banca rotta', meaning 'broken bench'!",
  "💡 Fun Fact: Monopoly prints more money every year than the US Bureau of Engraving and Printing does for real currency!",
  "💡 Fun Fact: In 1913, the entire US Income Tax form was just a single page long!",
];

const THEMES = {
  'electric-blue': { name: 'Electric Blue', btnPrimary: 'bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold', textAccent: 'text-blue-400', borderAccent: 'border-blue-500/40', bgAccent: 'bg-blue-500/10', chartColor: '#3b82f6', bgGlow: 'from-blue-950/40', cardBg: 'bg-slate-900/80', cardBorder: 'border-slate-800/80' },
  'emerald-green': { name: 'Emerald Green', btnPrimary: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold', textAccent: 'text-emerald-400', borderAccent: 'border-emerald-500/40', bgAccent: 'bg-emerald-500/10', chartColor: '#10b981', bgGlow: 'from-emerald-950/40', cardBg: 'bg-slate-900/80', cardBorder: 'border-slate-800/80' },
  'pure-black': { name: 'Pure Onyx', btnPrimary: 'bg-slate-100 hover:bg-white text-slate-950 font-bold', textAccent: 'text-slate-100', borderAccent: 'border-slate-700', bgAccent: 'bg-slate-800/60', chartColor: '#f8fafc', bgGlow: 'from-slate-900', cardBg: 'bg-black/90', cardBorder: 'border-slate-800' }
};

const BACKGROUND_LIGHTING = {
  'smooth-blue-fade': { name: 'Smooth Midnight Blue Fade', bgClass: 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950' },
  'onyx-dark': { name: 'Onyx Dark Solid', bgClass: 'bg-slate-950' }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function App() {
  const [activeTab, setActiveTab] = useState('cashflow');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  // Core User Database & Auth
  const [usersDb, setUsersDb] = useState(() => {
    const saved = localStorage.getItem('sb_users_db');
    return saved ? JSON.parse(saved) : [];
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('sb_user_profile');
    return saved ? JSON.parse(saved) : { loggedIn: false, email: '', nickname: '', userId: '' };
  });

  const [showAuthModal, setShowAuthModal] = useState(!userProfile.loggedIn);

  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('fb_theme') || 'electric-blue');
  const theme = THEMES[currentTheme] || THEMES['electric-blue'];

  const [currentBg, setCurrentBg] = useState(() => localStorage.getItem('fb_bg_style') || 'smooth-blue-fade');
  const bgStyle = BACKGROUND_LIGHTING[currentBg] || BACKGROUND_LIGHTING['smooth-blue-fade'];

  const [selectedCurrency, setSelectedCurrency] = useState(() => localStorage.getItem('fb_currency') || 'RSD');

  const formatCurrency = (val) => {
    const curr = WORLD_CURRENCIES.find(c => c.code === selectedCurrency) || WORLD_CURRENCIES[0];
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val || 0) + ' ' + curr.symbol;
  };

  const [startingBalance, setStartingBalance] = useState(() => Number(localStorage.getItem('sb_starting_balance')) || 0);
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('sb_transactions') || '[]'));
  const [cashflowPlans, setCashflowPlans] = useState(() => JSON.parse(localStorage.getItem('sb_cashflow_plans') || '[]'));
  const [shoppingLists, setShoppingLists] = useState(() => JSON.parse(localStorage.getItem('sb_shopping_lists') || '[]'));
  const [wishlistItems, setWishlistItems] = useState(() => JSON.parse(localStorage.getItem('sb_wishlist_items') || '[]'));
  
  const [household, setHousehold] = useState(() => {
    const saved = localStorage.getItem('sb_household');
    if (saved) return JSON.parse(saved);
    return { householdId: 'SB-' + Math.random().toString(36).substring(2, 7).toUpperCase(), partnerName: '', partnerEmail: '', isConnected: false };
  });

  const [pushEnabled, setPushEnabled] = useState(() => localStorage.getItem('sb_push_enabled') === 'true');
  const [notifications, setNotifications] = useState(() => JSON.parse(localStorage.getItem('sb_notifications_list') || '[]'));
  const [currentFunFactBanner, setCurrentFunFactBanner] = useState(null);
  const [projectionDays, setProjectionDays] = useState(45);
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('sb_gemini_key') || '');
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  // Sync to Local Storage
  useEffect(() => { localStorage.setItem('sb_users_db', JSON.stringify(usersDb)); }, [usersDb]);
  useEffect(() => { localStorage.setItem('sb_user_profile', JSON.stringify(userProfile)); }, [userProfile]);
  useEffect(() => { localStorage.setItem('fb_theme', currentTheme); }, [currentTheme]);
  useEffect(() => { localStorage.setItem('fb_bg_style', currentBg); }, [currentBg]);
  useEffect(() => { localStorage.setItem('fb_currency', selectedCurrency); }, [selectedCurrency]);
  useEffect(() => { localStorage.setItem('sb_starting_balance', startingBalance.toString()); }, [startingBalance]);
  useEffect(() => { localStorage.setItem('sb_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('sb_cashflow_plans', JSON.stringify(cashflowPlans)); }, [cashflowPlans]);
  useEffect(() => { localStorage.setItem('sb_shopping_lists', JSON.stringify(shoppingLists)); }, [shoppingLists]);
  useEffect(() => { localStorage.setItem('sb_wishlist_items', JSON.stringify(wishlistItems)); }, [wishlistItems]);
  useEffect(() => { localStorage.setItem('sb_household', JSON.stringify(household)); }, [household]);
  useEffect(() => { localStorage.setItem('sb_gemini_key', geminiApiKey); }, [geminiApiKey]);
  useEffect(() => { localStorage.setItem('sb_push_enabled', pushEnabled ? 'true' : 'false'); }, [pushEnabled]);
  useEffect(() => { localStorage.setItem('sb_notifications_list', JSON.stringify(notifications)); }, [notifications]);

  const pushNotification = (title, body, type = 'info') => {
    const greetingName = userProfile.nickname ? `, ${userProfile.nickname}` : '';
    const personalizedTitle = title.includes(userProfile.nickname) ? title : `${title}${greetingName}`;
    const newNotif = { id: 'notif-' + Date.now(), title: personalizedTitle, body, date: 'Just now', type, unread: true };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const showRandomFunFact = () => {
    const randomFact = FINANCIAL_FUN_FACTS[Math.floor(Math.random() * FINANCIAL_FUN_FACTS.length)];
    setCurrentFunFactBanner(randomFact);
    pushNotification('💡 Financial Fun Fact!', randomFact, 'fact');
  };

  const { dailyProjections, safeToSpendToday, lowestProjectedBalance } = useMemo(() => {
    const projections = [];
    let currentBalance = Number(startingBalance);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let lowestBal = currentBalance;
    let totalExpensesBeforeNextIncome = 0;
    let foundNextIncome = false;

    for (let i = 0; i < projectionDays; i++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + i);
      const dateStr = targetDate.toISOString().split('T')[0];
      const dayOfMonth = targetDate.getDate();
      const dayOfWeek = targetDate.getDay();

      let plannedIncomes = 0;
      let plannedExpenses = 0;

      cashflowPlans.filter(p => p.isActive).forEach(plan => {
        let applies = false;
        if (plan.frequency === 'Monthly' && Number(plan.dayOfMonth) === dayOfMonth) applies = true;
        else if (plan.frequency === 'Weekly' && Number(plan.dayOfWeek) === dayOfWeek) applies = true;
        else if (plan.frequency === 'Once' && plan.dueDate === dateStr) applies = true;

        if (applies) {
          if (plan.type === 'Income') plannedIncomes += Number(plan.amount);
          else plannedExpenses += Number(plan.amount);
        }
      });

      let actualIncomes = 0;
      let actualExpenses = 0;
      transactions.forEach(t => {
        if (t.date === dateStr) {
          if (t.type === 'Income') actualIncomes += Number(t.amount);
          else actualExpenses += Number(t.amount);
        }
      });

      const dayStartingBalance = currentBalance;
      const netChange = (plannedIncomes + actualIncomes) - (plannedExpenses + actualExpenses);
      const dayEndingBalance = dayStartingBalance + netChange;

      if (dayEndingBalance < lowestBal) lowestBal = dayEndingBalance;
      if (!foundNextIncome) {
        if (plannedIncomes > 0 && i > 0) foundNextIncome = true;
        else totalExpensesBeforeNextIncome += plannedExpenses;
      }

      projections.push({
        date: dateStr, displayDate: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        dayName: targetDate.toLocaleDateString('en-US', { weekday: 'short' }),
        startingBalance: dayStartingBalance, plannedIncomes, plannedExpenses,
        actualIncomes, actualExpenses, endingBalance: dayEndingBalance,
        isToday: i === 0, isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        hasNetExpense: plannedExpenses > 0 || actualExpenses > 0, hasNetIncome: plannedIncomes > 0 || actualIncomes > 0
      });

      currentBalance = dayEndingBalance;
    }

    const safeBuffer = Math.max(0, Number(startingBalance) - totalExpensesBeforeNextIncome);
    return { dailyProjections: projections, safeToSpendToday: Math.round(safeBuffer * 0.85), lowestProjectedBalance: lowestBal };
  }, [startingBalance, transactions, cashflowPlans, projectionDays]);

  const handleAddTransaction = (newTx) => {
    setTransactions(prev => [newTx, ...prev]);
    if (newTx.date === new Date().toISOString().split('T')[0]) {
      setStartingBalance(prev => newTx.type === 'Income' ? Number(prev) + Number(newTx.amount) : Number(prev) - Number(newTx.amount));
    }
  };

  const handleSavePlan = (planData) => {
    if (editingPlan) {
      setCashflowPlans(prev => prev.map(p => p.id === editingPlan.id ? { ...planData, id: editingPlan.id } : p));
    } else {
      setCashflowPlans(prev => [...prev, { ...planData, id: 'plan-' + Date.now() }]);
    }
    setIsPlanModalOpen(false);
    setEditingPlan(null);
  };

  const navItems = [
    { id: 'cashflow', label: 'Cashflow Projection', icon: Calendar },
    { id: 'wishlist', label: 'Wish List', icon: Gift },
    { id: 'lists', label: 'Grocery List', icon: ListPlus },
    { id: 'entry', label: 'Expenses & OCR Scan', icon: Camera },
    { id: 'groceries', label: 'Item Tracker & Usage', icon: Activity },
    { id: 'analytics', label: 'Reports', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-500 ${bgStyle.bgClass} text-slate-100`}>
      {/* Required Authenticated Modal Blocks the UI for Guests */}
      {(!userProfile.loggedIn || showAuthModal) && (
        <AuthModal 
          theme={theme} 
          userProfile={userProfile} 
          setUserProfile={setUserProfile}
          usersDb={usersDb}
          setUsersDb={setUsersDb}
          onClose={() => setShowAuthModal(false)} 
          pushNotification={pushNotification} 
        />
      )}

      {currentFunFactBanner && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 border-b border-indigo-500/30 px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 max-w-5xl mx-auto"><Smile className="w-4 h-4 text-amber-400 shrink-0" /><span className="text-purple-100 leading-tight">{currentFunFactBanner}</span></div>
          <button onClick={() => setCurrentFunFactBanner(null)} className="text-slate-400 hover:text-white p-1"><X className="w-4 h-4" /></button>
        </div>
      )}

      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 py-3.5 sm:px-6 bg-slate-900/80 border-slate-800/80`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-105 ${theme.btnPrimary}`}>
              <TrendingUp className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">STASHLY.COM</h1>
              <p className="text-[11px] opacity-60 font-semibold tracking-wide">{userProfile.loggedIn && userProfile.nickname ? `Welcome back, ${userProfile.nickname}!` : 'Smart Cashflow & Shared Vault'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold ${theme.textAccent} ${theme.borderAccent} ${theme.bgAccent}`}>
              <ShieldCheck className="w-4 h-4" /><span>Safe: {formatCurrency(safeToSpendToday)}</span>
            </div>
            <button onClick={() => setShowAuthModal(true)} className={`p-2 sm:px-3 sm:py-2 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${userProfile.loggedIn ? 'bg-slate-900 border-slate-700 text-slate-100 hover:border-slate-500' : theme.btnPrimary}`}>
              <UserCircle className="w-5 h-5" /><span className="hidden sm:inline">{userProfile.loggedIn ? userProfile.nickname || 'My Account' : 'Sign In / Register'}</span>
            </button>
            <button onClick={() => { setShowNotificationCenter(!showNotificationCenter); setNotifications(prev => prev.map(n => ({ ...n, unread: false }))); }} className="relative p-2.5 rounded-xl border bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-800">
              <Bell className="w-5 h-5" />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-pulse">{notifications.filter(n => n.unread).length}</span>
              )}
            </button>
            <div className="relative">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border font-bold text-xs transition-all ${theme.btnPrimary}`}>
                <Menu className="w-5 h-5" /><span className="hidden sm:inline">{(navItems.find(n => n.id === activeTab) || navItems[0]).label}</span>
              </button>
              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs" onClick={() => setIsMenuOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border z-50 p-2 space-y-1 bg-slate-900 border-slate-800`}>
                    {navItems.map(item => (
                      <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === item.id ? `${theme.btnPrimary} shadow-md` : 'hover:bg-slate-800/50 opacity-70 hover:opacity-100'}`}>
                        <item.icon className="w-4 h-4" /><span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {activeTab === 'cashflow' && <CashflowView theme={theme} startingBalance={startingBalance} setStartingBalance={setStartingBalance} dailyProjections={dailyProjections} safeToSpendToday={safeToSpendToday} lowestProjectedBalance={lowestProjectedBalance} projectionDays={projectionDays} setProjectionDays={setProjectionDays} cashflowPlans={cashflowPlans} formatCurrency={formatCurrency} onOpenAddPlan={() => { setEditingPlan(null); setIsPlanModalOpen(true); }} onEditPlan={(plan) => { setEditingPlan(plan); setIsPlanModalOpen(true); }} onDeletePlan={(id) => setCashflowPlans(prev => prev.filter(p => p.id !== id))} />}
        {activeTab === 'wishlist' && <WishlistView theme={theme} wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} formatCurrency={formatCurrency} startingBalance={startingBalance} safeToSpendToday={safeToSpendToday} onAddPlan={(newPlan) => setCashflowPlans(prev => [...prev, newPlan])} onAddTransaction={handleAddTransaction} />}
        {activeTab === 'lists' && <ShoppingListsView theme={theme} geminiApiKey={geminiApiKey} selectedCurrency={selectedCurrency} shoppingLists={shoppingLists} setShoppingLists={setShoppingLists} formatCurrency={formatCurrency} onAddTransaction={handleAddTransaction} />}
        {activeTab === 'entry' && <DailyEntryView theme={theme} geminiApiKey={geminiApiKey} onAddTransaction={handleAddTransaction} transactions={transactions} formatCurrency={formatCurrency} onDeleteTransaction={(id) => setTransactions(prev => prev.filter(t => t.id !== id))} />}
        {activeTab === 'groceries' && <GroceryTrackerView theme={theme} transactions={transactions} formatCurrency={formatCurrency} />}
        {activeTab === 'analytics' && <AnalyticsView theme={theme} transactions={transactions} formatCurrency={formatCurrency} />}
        {activeTab === 'settings' && <SettingsView theme={theme} currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} currentBg={currentBg} setCurrentBg={setCurrentBg} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} startingBalance={startingBalance} setStartingBalance={setStartingBalance} setShowAdminModal={setShowAdminModal} household={household} onOpenPartnerModal={() => setShowPartnerModal(true)} pushEnabled={pushEnabled} onRequestPush={() => {}} onPopFunFact={showRandomFunFact} userProfile={userProfile} onOpenAuthModal={() => setShowAuthModal(true)} />}
      </main>

      {isPlanModalOpen && <PlanModal theme={theme} plan={editingPlan} onSave={handleSavePlan} onClose={() => { setIsPlanModalOpen(false); setEditingPlan(null); }} />}
    </div>
  );
}

// ---------------------------------------------------------
// AUTHENTICATION MODAL (Fix for the bugs & logic requests)
// ---------------------------------------------------------
function AuthModal({ theme, userProfile, setUserProfile, usersDb, setUsersDb, onClose, pushNotification }) {
  const [isRegisterMode, setIsRegisterMode] = useState(!userProfile.loggedIn);
  const [email, setEmail] = useState(userProfile.email || '');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [nickname, setNickname] = useState(userProfile.nickname || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    if (isRegisterMode) {
      if (!dob) { alert('Please provide your date of birth.'); return; }
      if (usersDb.find(u => u.email === email)) {
        alert('Email is already registered! Please sign in.');
        return;
      }
      
      const finalNickname = nickname.trim() || email.split('@')[0];
      const newUser = { email, password, dob, nickname: finalNickname, userId: 'usr-' + Date.now().toString(36) };
      
      setUsersDb([...usersDb, newUser]);
      setUserProfile({ loggedIn: true, email: newUser.email, nickname: newUser.nickname, userId: newUser.userId });
      pushNotification(`Welcome to Stashly, ${finalNickname}! 🚀`, `Your account has been successfully created.`);
      onClose();
    } else {
      const user = usersDb.find(u => u.email === email);
      if (!user) {
        alert('No account found with this email. Please create an account.');
        return;
      }
      if (user.password !== password) {
        alert('Incorrect password. Please try again.');
        return;
      }

      setUserProfile({ loggedIn: true, email: user.email, nickname: user.nickname, userId: user.userId });
      pushNotification(`Welcome back, ${user.nickname}! 🚀`, `Login was successful.`);
      onClose();
    }
  };

  const handleSignOut = () => {
    setUserProfile({ loggedIn: false, email: '', nickname: '', userId: '' });
  };

  // Prevent closing the modal if the user is not authenticated
  const handleClose = () => {
    if (!userProfile.loggedIn) return;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl w-full max-w-md p-6 shadow-2xl`}>
        
        {/* Enforced Onboarding Text Layout */}
        {!userProfile.loggedIn ? (
          <div className="text-center space-y-1 mb-6">
            <h2 className="text-2xl font-black text-slate-100">Hey, hello, welcome.</h2>
            <h3 className="text-base font-bold text-slate-300">Welcome to stashly.com.</h3>
            <p className="text-xs opacity-60 mt-2 text-slate-400">Please fill out these forms. Please fill out email, date of birth, and password.</p>
          </div>
        ) : (
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <UserCircle className={`w-6 h-6 ${theme.textAccent}`} />
              <div>
                <h3 className="text-sm font-bold">Stashly Account</h3>
              </div>
            </div>
            <button onClick={handleClose} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
        )}

        {userProfile.loggedIn ? (
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60">Status:</span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold text-[10px]">✓ Logged In</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60">Nickname:</span>
                <span className={`font-bold ${theme.textAccent}`}>{userProfile.nickname}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60">Email:</span>
                <span className="font-mono text-[11px] opacity-90">{userProfile.email}</span>
              </div>
            </div>
            <button onClick={handleSignOut} className="w-full py-2.5 rounded-xl font-semibold text-xs border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" /> Sign Out of Account
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex border-b border-slate-800 mb-2">
              <button type="button" onClick={() => setIsRegisterMode(true)} className={`flex-1 py-2 text-xs font-bold text-center border-b-2 ${isRegisterMode ? `${theme.borderAccent} ${theme.textAccent}` : 'border-transparent opacity-50'}`}>Register</button>
              <button type="button" onClick={() => setIsRegisterMode(false)} className={`flex-1 py-2 text-xs font-bold text-center border-b-2 ${!isRegisterMode ? `${theme.borderAccent} ${theme.textAccent}` : 'border-transparent opacity-50'}`}>Sign In</button>
            </div>

            {isRegisterMode && (
              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">Date of Birth</label>
                <div className="relative mt-1">
                  <input type="date" required={isRegisterMode} value={dob} onChange={e => setDob(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs focus:outline-none" />
                  <CalendarDays className="w-4 h-4 absolute left-3 top-3 opacity-50" />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Email Address</label>
              <div className="relative mt-1">
                <input type="email" placeholder="yourname@gmail.com" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs focus:outline-none" />
                <AtSign className="w-4 h-4 absolute left-3 top-3 opacity-50" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Password</label>
              <div className="relative mt-1">
                <input type="password" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs focus:outline-none" />
                <KeyRound className="w-4 h-4 absolute left-3 top-3 opacity-50" />
              </div>
            </div>

            {isRegisterMode && (
              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">App Nickname (Optional)</label>
                <div className="relative mt-1">
                  <input type="text" placeholder="e.g. Alex" value={nickname} onChange={e => setNickname(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs focus:outline-none" />
                  <UserCircle className="w-4 h-4 absolute left-3 top-3 opacity-50" />
                </div>
              </div>
            )}

            <button type="submit" className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 ${theme.btnPrimary}`}>
              <LogIn className="w-4 h-4" /> {isRegisterMode ? 'Complete Registration' : 'Secure Sign In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// REFACTORED CASHFLOW VIEW (Clean List, No Tabs)
// ---------------------------------------------------------
function CashflowView({ theme, startingBalance, setStartingBalance, dailyProjections, safeToSpendToday, lowestProjectedBalance, projectionDays, setProjectionDays, cashflowPlans, formatCurrency, onOpenAddPlan, onEditPlan, onDeletePlan }) {
  const [isBalanceEditing, setIsBalanceEditing] = useState(false);
  const [tempBalance, setTempBalance] = useState(startingBalance);

  const maxBal = Math.max(...dailyProjections.map(d => d.endingBalance), 100);
  const minBal = Math.min(...dailyProjections.map(d => d.endingBalance), 0);
  const range = (maxBal - minBal) || 1;

  const chartPoints = dailyProjections.map((d, index) => {
    const x = (index / (dailyProjections.length - 1)) * 100;
    const y = 100 - (((d.endingBalance - minBal) / range) * 80 + 10);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl relative`}>
          <div className="flex items-center justify-between opacity-60 mb-2">
            <span className="text-xs font-semibold uppercase">Current Balance</span>
            <DollarSign className={`w-4 h-4 ${theme.textAccent}`} />
          </div>
          {isBalanceEditing ? (
            <div className="flex items-center gap-2 mt-1">
              <input type="number" value={tempBalance} onChange={(e) => setTempBalance(e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-lg font-bold w-full focus:outline-none" />
              <button onClick={() => { setStartingBalance(Number(tempBalance)); setIsBalanceEditing(false); }} className={`p-1.5 rounded-lg ${theme.btnPrimary}`}><Check className="w-4 h-4" /></button>
            </div>
          ) : (
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black">{formatCurrency(startingBalance)}</span>
              <button onClick={() => { setTempBalance(startingBalance); setIsBalanceEditing(true); }} className={`text-xs opacity-60 hover:opacity-100 flex items-center gap-1 ${theme.textAccent}`}><Edit3 className="w-3.5 h-3.5" /> Edit</button>
            </div>
          )}
        </div>

        <div className={`p-5 rounded-2xl border bg-gradient-to-br ${theme.bgGlow} to-slate-900 ${theme.cardBorder}`}>
          <p className={`text-xs font-bold uppercase flex items-center gap-1.5 ${theme.textAccent}`}><ShieldCheck className="w-4 h-4" /> Safe to Spend</p>
          <p className={`text-2xl font-black mt-1 ${theme.textAccent}`}>{formatCurrency(safeToSpendToday)}</p>
        </div>

        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl`}>
          <div className="flex items-center justify-between opacity-60 mb-2">
            <span className="text-xs font-semibold uppercase">Lowest Point</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black">{formatCurrency(lowestProjectedBalance)}</p>
        </div>

        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl flex flex-col justify-between`}>
          <p className="text-xs font-semibold uppercase opacity-60">Projection Horizon</p>
          <div className="grid grid-cols-4 gap-1.5 mt-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[30, 45, 60, 90].map(d => (
              <button key={d} onClick={() => setProjectionDays(d)} className={`py-1 rounded-lg text-xs font-bold transition-all ${projectionDays === d ? theme.btnPrimary : 'opacity-60'}`}>{d}d</button>
            ))}
          </div>
        </div>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <h3 className="text-base font-bold flex items-center gap-2"><TrendingUp className={`w-5 h-5 ${theme.textAccent}`} /> Daily Balance Projection</h3>
        <div className="h-56 w-full relative pt-4 pb-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="20" x2="100" y2="20" stroke="#334155" strokeDasharray="2,2" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeDasharray="2,2" strokeWidth="0.5" />
            <line x1="0" y1="80" x2="100" y2="80" stroke="#334155" strokeDasharray="2,2" strokeWidth="0.5" />
            <polyline fill="none" stroke={theme.chartColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={chartPoints} />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Planned Income & Expenses - Cleared of tabs and static categories */}
        <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-5 space-y-4 flex flex-col`}>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold">Planned Income & Expenses</h4>
            <button onClick={onOpenAddPlan} className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 border ${theme.borderAccent} ${theme.bgAccent} ${theme.textAccent}`}>
              <Plus className="w-4 h-4" /> Add Plan
            </button>
          </div>
          <div className="space-y-2.5 overflow-y-auto max-h-[450px]">
            {cashflowPlans.length === 0 ? (
              <p className="text-xs opacity-50 text-center py-8 border border-dashed border-slate-800 rounded-xl">No plans added yet.</p>
            ) : (
              cashflowPlans.map(plan => (
                <div key={plan.id} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold">{plan.title}</h5>
                    <span className="text-[10px] opacity-60 uppercase">{plan.category} • {plan.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${plan.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'}`}>{plan.type === 'Income' ? '+' : '-'}{formatCurrency(plan.amount)}</span>
                    <button onClick={() => onEditPlan(plan)} className="text-slate-500 hover:text-white p-1"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => onDeletePlan(plan.id)} className="text-slate-600 hover:text-rose-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={`lg:col-span-2 ${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-5 space-y-4`}>
          <h4 className="text-sm font-bold">Daily Balance Forecast Table</h4>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 opacity-60 uppercase text-[10px]">
                  <th className="p-3">Date</th>
                  <th className="p-3">Starting</th>
                  <th className="p-3 text-emerald-400">Planned Inc.</th>
                  <th className="p-3 text-rose-400">Planned Exp.</th>
                  <th className="p-3 text-right">Ending</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {dailyProjections.map(d => (
                  <tr key={d.date} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold font-sans">{d.displayDate} ({d.dayName})</td>
                    <td className="p-3 opacity-60">{formatCurrency(d.startingBalance)}</td>
                    <td className="p-3 text-emerald-400">{d.plannedIncomes > 0 ? `+${formatCurrency(d.plannedIncomes)}` : '-'}</td>
                    <td className="p-3 text-rose-400">{d.plannedExpenses > 0 ? `-${formatCurrency(d.plannedExpenses)}` : '-'}</td>
                    <td className="p-3 text-right font-bold">{formatCurrency(d.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Other necessary helper components for the UI to run
// ---------------------------------------------------------
function PlanModal({ theme, plan, onSave, onClose }) {
  const [formData, setFormData] = useState(plan || { title: '', amount: '', type: 'Expense', category: 'Utilities', frequency: 'Monthly', dayOfMonth: 15, isActive: true });
  const handleSubmit = (e) => { e.preventDefault(); if (!formData.title || !formData.amount) return; onSave({ ...formData, amount: Number(formData.amount), dayOfMonth: Number(formData.dayOfMonth) }); };
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl`}>
        <div className="flex justify-between items-center"><h3 className="text-sm font-bold">{plan ? 'Edit Cashflow Rule' : 'New Cashflow Rule'}</h3><button onClick={onClose}><X className="w-4 h-4" /></button></div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold opacity-60 uppercase">Type</label>
            <div className="grid grid-cols-2 gap-2 mt-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button type="button" onClick={() => setFormData({ ...formData, type: 'Expense' })} className={`py-1.5 rounded-lg text-xs font-bold transition-all ${formData.type === 'Expense' ? 'bg-rose-500 text-white' : 'opacity-60'}`}>Expense (-)</button>
              <button type="button" onClick={() => setFormData({ ...formData, type: 'Income' })} className={`py-1.5 rounded-lg text-xs font-bold transition-all ${formData.type === 'Income' ? 'bg-emerald-500 text-slate-950' : 'opacity-60'}`}>Income (+)</button>
            </div>
          </div>
          <div>
            <label className="text-[11px] font-semibold opacity-60 uppercase">Title</label>
            <input type="text" placeholder="Title (e.g. Monthly Rent, Salary)" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />
          </div>
          <div>
            <label className="text-[11px] font-semibold opacity-60 uppercase">Amount</label>
            <input type="number" placeholder="Amount" required value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Frequency</label>
              <select value={formData.frequency} onChange={e => setFormData({ ...formData, frequency: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none">
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Once">Once</option>
              </select>
            </div>
            {formData.frequency === 'Monthly' && (
              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">Day of Month</label>
                <input type="number" min="1" max="31" placeholder="Day (1-31)" value={formData.dayOfMonth} onChange={e => setFormData({ ...formData, dayOfMonth: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />
              </div>
            )}
          </div>
          <button type="submit" className={`w-full py-3 mt-2 rounded-xl font-bold text-xs ${theme.btnPrimary}`}>Save Plan</button>
        </form>
      </div>
    </div>
  );
}

// Ensure the stub components return null or generic views if they are removed for space context.
// In your complete file, include ShoppingListsView, DailyEntryView, GroceryTrackerView, AnalyticsView, SettingsView, and WishlistView from your OG code here.
function WishlistView() { return null; }
function ShoppingListsView() { return null; }
function DailyEntryView() { return null; }
function GroceryTrackerView() { return null; }
function AnalyticsView() { return null; }
function SettingsView() { return null; }
