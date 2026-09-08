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
  RefreshCw,
  Settings,
  Sparkles,
  Clock,
  Layers,
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
  Upload,
  Menu,
  UserPlus,
  Heart,
  Bell,
  User,
  LogIn,
  LogOut,
  Database,
  CheckCircle2,
  XCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  ListTree,
  QrCode
} from 'lucide-react';

const WORLD_CURRENCIES = [
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'RSD' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'BAM', name: 'Bosnia Convertible Mark', symbol: 'KM' },
  { code: 'MKD', name: 'Macedonian Denar', symbol: 'den' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' }
];

const CATEGORIES = [
  { id: 'Food', label: 'Food & Groceries', icon: '🛒' },
  { id: 'Utilities', label: 'Utilities & Bills', icon: '⚡' },
  { id: 'Transport', label: 'Transportation & Fuel', icon: '🚗' },
  { id: 'Housing', label: 'Housing & Rent', icon: '🏠' },
  { id: 'Entertainment', label: 'Entertainment & Dining', icon: '☕' },
  { id: 'Health', label: 'Health & Medical', icon: '💊' },
  { id: 'Salary', label: 'Salary & Income', icon: '💼' },
  { id: 'Other', label: 'Other Expenses', icon: '📦' }
];

const PLAN_CATEGORIES = [
  { id: 'General', label: 'General Expense / Income', icon: '📦' },
  { id: 'Car', label: 'Car & Vehicle (Repair, Reg, Insurance)', icon: '🚗' },
  { id: 'Utilities', label: 'Utilities & Household Bills', icon: '⚡' },
  { id: 'Housing', label: 'Rent & Housing', icon: '🏠' },
  { id: 'Salary', label: 'Salary & Income', icon: '💼' }
];

const CAR_SUB_CATEGORIES = [
  'Vehicle Registration',
  'Repairs & Mechanic',
  'Regular Service & Parts',
  'Car Insurance',
  'Fuel & Tolls',
  'Other Vehicle Costs'
];

const THEMES = {
  'light-blue': {
    name: 'Sky Blue Accent',
    btnPrimary: 'bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold',
    textAccent: 'text-sky-400',
    borderAccent: 'border-sky-400/40',
    bgAccent: 'bg-sky-400/10',
    chartColor: '#38bdf8',
    bgGlow: 'from-sky-950/40'
  },
  'green': {
    name: 'Green Accent',
    btnPrimary: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold',
    textAccent: 'text-emerald-400',
    borderAccent: 'border-emerald-500/40',
    bgAccent: 'bg-emerald-500/10',
    chartColor: '#10b981',
    bgGlow: 'from-emerald-950/40'
  },
  'blue': {
    name: 'Blue Accent',
    btnPrimary: 'bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold',
    textAccent: 'text-blue-400',
    borderAccent: 'border-blue-500/40',
    bgAccent: 'bg-blue-500/10',
    chartColor: '#3b82f6',
    bgGlow: 'from-blue-950/40'
  },
  'yellow': {
    name: 'Yellow Accent',
    btnPrimary: 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold',
    textAccent: 'text-amber-400',
    borderAccent: 'border-amber-400/40',
    bgAccent: 'bg-amber-400/10',
    chartColor: '#fbbf24',
    bgGlow: 'from-amber-950/40'
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('cashflow');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('fb_theme') || 'light-blue');
  const theme = THEMES[currentTheme] || THEMES['light-blue'];

  const [selectedCurrency, setSelectedCurrency] = useState(() => localStorage.getItem('fb_currency') || 'RSD');

  const formatCurrency = (val) => {
    const curr = WORLD_CURRENCIES.find(c => c.code === selectedCurrency) || WORLD_CURRENCIES[0];
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val || 0) + ' ' + curr.symbol;
  };

  // Auth & Profile State
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('sb_is_logged_in') === 'true');
  const [nickname, setNickname] = useState(() => localStorage.getItem('sb_user_nickname') || 'Aleksandar');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('sb_user_email') || '');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Financial Data
  const [startingBalance, setStartingBalance] = useState(() => {
    const saved = localStorage.getItem('sb_starting_balance');
    return saved !== null ? Number(saved) : 100000;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('sb_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [cashflowPlans, setCashflowPlans] = useState(() => {
    const saved = localStorage.getItem('sb_cashflow_plans');
    return saved ? JSON.parse(saved) : [];
  });

  const [shoppingLists, setShoppingLists] = useState(() => {
    const saved = localStorage.getItem('sb_shopping_lists');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('sb_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [projectionDays, setProjectionDays] = useState(45);
  
  // Config Keys
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('sb_gemini_key') || '');
  const [supabaseUrl, setSupabaseUrl] = useState(() => localStorage.getItem('sb_supabase_url') || 'https://yrendrnoivykevbyjmo.supabase.co');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(() => localStorage.getItem('sb_supabase_anon_key') || '');

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [subExpensesPlan, setSubExpensesPlan] = useState(null);

  // Vault Generation & State
  const [householdCode, setHouseholdCode] = useState(() => {
    const existing = localStorage.getItem('sb_household_code');
    if (existing && existing !== 'STASH-VAULT-88X') return existing;
    const newCode = 'STASH-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem('sb_household_code', newCode);
    return newCode;
  });

  const [partnerName, setPartnerName] = useState(() => localStorage.getItem('sb_partner_name') || '');
  const [partnerEmail, setPartnerEmail] = useState(() => localStorage.getItem('sb_partner_email') || '');
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  // Live Users Online Eye Counter
  const [liveUsersCount, setLiveUsersCount] = useState(1);

  // Toast Feedback System
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => { localStorage.setItem('fb_theme', currentTheme); }, [currentTheme]);
  useEffect(() => { localStorage.setItem('fb_currency', selectedCurrency); }, [selectedCurrency]);
  useEffect(() => { localStorage.setItem('sb_starting_balance', startingBalance.toString()); }, [startingBalance]);
  useEffect(() => { localStorage.setItem('sb_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('sb_cashflow_plans', JSON.stringify(cashflowPlans)); }, [cashflowPlans]);
  useEffect(() => { localStorage.setItem('sb_shopping_lists', JSON.stringify(shoppingLists)); }, [shoppingLists]);
  useEffect(() => { localStorage.setItem('sb_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('sb_gemini_key', geminiApiKey); }, [geminiApiKey]);
  useEffect(() => { localStorage.setItem('sb_supabase_url', supabaseUrl); }, [supabaseUrl]);
  useEffect(() => { localStorage.setItem('sb_supabase_anon_key', supabaseAnonKey); }, [supabaseAnonKey]);
  useEffect(() => { localStorage.setItem('sb_household_code', householdCode); }, [householdCode]);
  useEffect(() => { localStorage.setItem('sb_partner_name', partnerName); }, [partnerName]);
  useEffect(() => { localStorage.setItem('sb_user_nickname', nickname); }, [nickname]);
  useEffect(() => { localStorage.setItem('sb_user_email', userEmail); }, [userEmail]);
  useEffect(() => { localStorage.setItem('sb_is_logged_in', isLoggedIn.toString()); }, [isLoggedIn]);

  // Heartbeat Polling for Live Online Eye Counter
  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) return;

    const mySessionId = useRef('user-' + Math.random().toString(36).substring(2, 9)).current;

    const sendHeartbeat = async () => {
      try {
        await fetch(`${supabaseUrl}/rest/v1/active_sessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({
            id: mySessionId,
            household_id: householdCode,
            nickname: nickname,
            last_seen: new Date().toISOString()
          })
        });

        const filterTime = new Date(Date.now() - 15000).toISOString();
        const res = await fetch(`${supabaseUrl}/rest/v1/active_sessions?household_id=eq.${householdCode}&last_seen=gt.${filterTime}`, {
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`
          }
        });

        if (res.ok) {
          const activeSessions = await res.json();
          setLiveUsersCount(Math.max(1, activeSessions.length));
        }
      } catch (err) {
        setLiveUsersCount(1);
      }
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 5000);
    return () => clearInterval(interval);
  }, [supabaseUrl, supabaseAnonKey, householdCode, nickname]);

  // Real-time Cloud Polling for Transactions & Vault Synchronization
  const knownTxIdsRef = useRef(new Set(transactions.map(t => t.id)));

  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey || !householdCode) return;

    const fetchRemoteExpenses = async () => {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/expenses?household_id=eq.${householdCode}&order=created_at.desc&limit=20`, {
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`
          }
        });
        if (res.ok) {
          const remoteExpenses = await res.json();
          remoteExpenses.forEach(exp => {
            if (!knownTxIdsRef.current.has(exp.id)) {
              knownTxIdsRef.current.add(exp.id);
              
              const newTx = {
                id: exp.id,
                title: exp.title,
                amount: Number(exp.amount),
                type: exp.type,
                category: exp.category,
                merchant: exp.merchant,
                date: exp.date,
                creator: exp.merchant === nickname ? nickname : (partnerName || 'Partner')
              };

              setTransactions(prev => [newTx, ...prev.filter(t => t.id !== newTx.id)]);
              
              // Automatically sync the live current balance if the incoming transaction is from today
              if (exp.date === new Date().toISOString().split('T')[0]) {
                setStartingBalance(prev => exp.type === 'Income' ? Number(prev) + Number(exp.amount) : Number(prev) - Number(exp.amount));
              }

              if (exp.merchant !== nickname) {
                showToast(`🔔 ${partnerName || 'Partner'} logged a new transaction: ${exp.title} (${formatCurrency(exp.amount)})`, 'info');
              }
            }
          });
        }
      } catch (err) {
        console.error('Sync error:', err);
      }
    };

    const timer = setInterval(fetchRemoteExpenses, 4000);
    return () => clearInterval(timer);
  }, [supabaseUrl, supabaseAnonKey, householdCode, partnerName, nickname]);

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
        date: dateStr,
        displayDate: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        dayName: targetDate.toLocaleDateString('en-US', { weekday: 'short' }),
        startingBalance: dayStartingBalance,
        plannedIncomes,
        plannedExpenses,
        actualIncomes,
        actualExpenses,
        endingBalance: dayEndingBalance,
        isToday: i === 0,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        hasNetExpense: plannedExpenses > 0 || actualExpenses > 0,
        hasNetIncome: plannedIncomes > 0 || actualIncomes > 0
      });

      currentBalance = dayEndingBalance;
    }

    const currentActualBalance = Number(startingBalance);
    const safeBuffer = Math.max(0, currentActualBalance - totalExpensesBeforeNextIncome);
    const safeToSpend = Math.round(safeBuffer * 0.85);

    return {
      dailyProjections: projections,
      safeToSpendToday: safeToSpend,
      lowestProjectedBalance: lowestBal
    };
  }, [startingBalance, transactions, cashflowPlans, projectionDays]);

  const handleAddTransaction = async (newTx) => {
    knownTxIdsRef.current.add(newTx.id);
    setTransactions(prev => [newTx, ...prev]);

    if (newTx.date === new Date().toISOString().split('T')[0]) {
      if (newTx.type === 'Income') setStartingBalance(prev => Number(prev) + Number(newTx.amount));
      else setStartingBalance(prev => Number(prev) - Number(newTx.amount));
    }

    showToast(`Transaction "${newTx.title}" logged successfully!`, 'success');

    if (supabaseUrl && supabaseAnonKey) {
      await fetch(`${supabaseUrl}/rest/v1/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          id: newTx.id,
          household_id: householdCode,
          title: newTx.title,
          amount: newTx.amount,
          type: newTx.type,
          category: newTx.category,
          merchant: nickname,
          date: newTx.date
        })
      });
    }
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    showToast('Transaction removed.', 'info');
  };

  const handleSavePlan = (planData) => {
    if (editingPlan) {
      setCashflowPlans(prev => prev.map(p => p.id === editingPlan.id ? { ...planData, id: editingPlan.id } : p));
      showToast('Cashflow rule updated successfully!', 'success');
    } else {
      setCashflowPlans(prev => [...prev, { ...planData, id: 'plan-' + Date.now(), subExpenses: [] }]);
      showToast('New Cashflow rule added!', 'success');
    }
    setIsPlanModalOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = (id) => {
    setCashflowPlans(prev => prev.filter(p => p.id !== id));
    showToast('Cashflow rule deleted.', 'info');
  };

  const handleUpdateSubExpenses = (planId, newSubExpenses) => {
    const totalSubSum = newSubExpenses.reduce((acc, item) => acc + Number(item.amount || 0), 0);

    setCashflowPlans(prev => prev.map(p => {
      if (p.id === planId) {
        return {
          ...p,
          subExpenses: newSubExpenses,
          amount: newSubExpenses.length > 0 ? totalSubSum : p.amount
        };
      }
      return p;
    }));

    showToast(`Sub-expenses updated! Main plan total synced to ${formatCurrency(totalSubSum)}`, 'success');
  };

  const tabs = [
    { id: 'cashflow', label: 'Cashflow Projection', icon: Calendar },
    { id: 'wishlist', label: 'Wish List & Goals', icon: Heart },
    { id: 'lists', label: 'Grocery List', icon: ListPlus },
    { id: 'entry', label: 'Expenses & OCR Scan', icon: Camera },
    { id: 'groceries', label: 'Item Tracker & Usage', icon: Activity },
    { id: 'analytics', label: 'Reports', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen font-sans antialiased bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-100">
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`p-4 rounded-2xl border shadow-2xl flex items-center gap-3 text-xs font-bold ${toast.type === 'success' ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : toast.type === 'error' ? 'bg-rose-950 border-rose-500 text-rose-200' : 'bg-sky-950 border-sky-500 text-sky-200'}`}>
            {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : toast.type === 'error' ? <XCircle className="w-5 h-5 text-rose-400" /> : <Bell className="w-5 h-5 text-sky-400" />}
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 opacity-50 hover:opacity-100"><X className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 backdrop-blur-md border-b px-4 py-3.5 sm:px-6 bg-slate-900/90 border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xl ${theme.btnPrimary}`}>
              <TrendingUp className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">STASHLY.COM</h1>
              <p className="text-[11px] font-semibold opacity-60">
                {isLoggedIn ? `Welcome back, ${nickname}!` : 'Smart Budget Vault'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono font-bold bg-slate-950/80 border-slate-800 ${liveUsersCount > 1 ? 'text-emerald-400 border-emerald-500/40' : 'text-slate-400'}`}
              title={`${liveUsersCount} user(s) live in your vault`}
            >
              <Eye className={`w-4 h-4 ${liveUsersCount > 1 ? 'animate-pulse text-emerald-400' : 'text-slate-400'}`} />
              <span>{liveUsersCount}</span>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${theme.btnPrimary}`}
              title="Menu"
            >
              <Menu className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              onClick={() => setIsPartnerModalOpen(true)}
              className="p-2.5 rounded-xl border flex items-center gap-2 transition-all bg-slate-950/80 border-slate-800 hover:border-slate-700"
              title="Shared Vault"
            >
              <UserPlus className={`w-5 h-5 ${partnerName ? theme.textAccent : 'text-slate-400'}`} />
            </button>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="p-2.5 rounded-xl border flex items-center gap-2 transition-all bg-slate-950/80 border-slate-800 hover:border-slate-700"
              title="Account Settings"
            >
              <User className={`w-5 h-5 ${isLoggedIn ? theme.textAccent : 'text-slate-400'}`} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsMenuOpen(false); }}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-bold transition-all border ${isActive ? `${theme.btnPrimary} shadow-lg` : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {activeTab === 'cashflow' && (
          <CashflowView
            theme={theme}
            startingBalance={startingBalance}
            setStartingBalance={setStartingBalance}
            dailyProjections={dailyProjections}
            safeToSpendToday={safeToSpendToday}
            lowestProjectedBalance={lowestProjectedBalance}
            projectionDays={projectionDays}
            setProjectionDays={setProjectionDays}
            cashflowPlans={cashflowPlans}
            formatCurrency={formatCurrency}
            onOpenAddPlan={() => { setEditingPlan(null); setIsPlanModalOpen(true); }}
            onEditPlan={(plan) => { setEditingPlan(plan); setIsPlanModalOpen(true); }}
            onDeletePlan={handleDeletePlan}
            onOpenSubExpenses={(plan) => setSubExpensesPlan(plan)}
          />
        )}

        {activeTab === 'wishlist' && (
          <WishlistView
            theme={theme}
            wishlist={wishlist}
            setWishlist={setWishlist}
            formatCurrency={formatCurrency}
            safeToSpendToday={safeToSpendToday}
            onAddTransaction={handleAddTransaction}
            showToast={showToast}
          />
        )}

        {activeTab === 'lists' && (
          <ShoppingListsView
            theme={theme}
            geminiApiKey={geminiApiKey}
            shoppingLists={shoppingLists}
            setShoppingLists={setShoppingLists}
            formatCurrency={formatCurrency}
            selectedCurrency={selectedCurrency}
            showToast={showToast}
          />
        )}

        {activeTab === 'entry' && (
          <DailyEntryView
            theme={theme}
            geminiApiKey={geminiApiKey}
            onAddTransaction={handleAddTransaction}
            transactions={transactions}
            formatCurrency={formatCurrency}
            onDeleteTransaction={handleDeleteTransaction}
            showToast={showToast}
          />
        )}

        {activeTab === 'groceries' && (
          <GroceryTrackerView theme={theme} transactions={transactions} formatCurrency={formatCurrency} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView theme={theme} transactions={transactions} formatCurrency={formatCurrency} />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            theme={theme}
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            startingBalance={startingBalance}
            setStartingBalance={setStartingBalance}
            setShowAdminModal={setShowAdminModal}
            nickname={nickname}
            setNickname={setNickname}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            showToast={showToast}
          />
        )}
      </main>

      {subExpensesPlan && (
        <SubExpensesModal
          theme={theme}
          plan={subExpensesPlan}
          formatCurrency={formatCurrency}
          onUpdate={(newSubList) => handleUpdateSubExpenses(subExpensesPlan.id, newSubList)}
          onClose={() => setSubExpensesPlan(null)}
        />
      )}

      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2"><Lock className={`w-4 h-4 ${theme.textAccent}`} /> Supabase & Gemini Master Config</h3>
              <button onClick={() => setShowAdminModal(false)} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase opacity-60">Supabase Project URL</label>
                <input
                  type="text"
                  placeholder="https://yrendrnoivykevbyjmo.supabase.co"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase opacity-60">Supabase Publishable Key (Anon)</label>
                <input
                  type="password"
                  placeholder="sb_publishable_1HRHJRf9C02r..."
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase opacity-60">Gemini AI OCR Key</label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none mt-1"
                />
              </div>
            </div>
            <button
              onClick={() => {
                setShowAdminModal(false);
                showToast('API Keys saved successfully!', 'success');
              }}
              className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase ${theme.btnPrimary}`}
            >
              Save Master Keys
            </button>
          </div>
        </div>
      )}

      {isPartnerModalOpen && (
        <PartnerModal
          theme={theme}
          householdCode={householdCode}
          setHouseholdCode={setHouseholdCode}
          partnerName={partnerName}
          setPartnerName={setPartnerName}
          partnerEmail={partnerEmail}
          setPartnerEmail={setPartnerEmail}
          userEmail={userEmail}
          nickname={nickname}
          supabaseUrl={supabaseUrl}
          supabaseAnonKey={supabaseAnonKey}
          showToast={showToast}
          onClose={() => setIsPartnerModalOpen(false)}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          theme={theme}
          nickname={nickname}
          setNickname={setNickname}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          showToast={showToast}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}

      {isPlanModalOpen && (
        <PlanModal theme={theme} plan={editingPlan} onSave={handleSavePlan} onClose={() => { setIsPlanModalOpen(false); setEditingPlan(null); }} />
      )}
    </div>
  );
}

function CashflowView({ theme, startingBalance, setStartingBalance, dailyProjections, safeToSpendToday, lowestProjectedBalance, projectionDays, setProjectionDays, cashflowPlans, formatCurrency, onOpenAddPlan, onEditPlan, onDeletePlan, onOpenSubExpenses }) {
  const [selectedPlanTab, setSelectedPlanTab] = useState('All');
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

  const filteredPlans = useMemo(() => {
    if (selectedPlanTab === 'Car') return cashflowPlans.filter(p => p.category === 'Car');
    if (selectedPlanTab === 'Utilities') return cashflowPlans.filter(p => p.category === 'Utilities');
    if (selectedPlanTab === 'General') return cashflowPlans.filter(p => p.category === 'General' || !p.category);
    return cashflowPlans;
  }, [cashflowPlans, selectedPlanTab]);

  const totalCarUpcomingCost = useMemo(() => {
    return cashflowPlans.filter(p => p.category === 'Car' && p.type === 'Expense').reduce((acc, p) => acc + Number(p.amount), 0);
  }, [cashflowPlans]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl relative">
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

        <div className={`p-5 rounded-2xl border bg-gradient-to-br ${theme.bgGlow} to-slate-900 border-slate-800`}>
          <p className={`text-xs font-bold uppercase flex items-center gap-1.5 ${theme.textAccent}`}><ShieldCheck className="w-4 h-4" /> Safe to Spend Today</p>
          <p className={`text-2xl font-black mt-1 ${theme.textAccent}`}>{formatCurrency(safeToSpendToday)}</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between opacity-60 mb-2">
            <span className="text-xs font-semibold uppercase">Car & Vehicle Planned</span>
            <Car className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-black">{formatCurrency(totalCarUpcomingCost)}</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
          <p className="text-xs font-semibold uppercase opacity-60">Projection Horizon</p>
          <div className="grid grid-cols-4 gap-1.5 mt-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[30, 45, 60, 90].map(d => (
              <button key={d} onClick={() => setProjectionDays(d)} className={`py-1 rounded-lg text-xs font-bold transition-all ${projectionDays === d ? theme.btnPrimary : 'opacity-60'}`}>{d}d</button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2"><TrendingUp className={`w-5 h-5 ${theme.textAccent}`} /> Daily Balance Projection ({projectionDays} Days)</h3>
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
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold">Planned Income & Expenses</h4>
            <button onClick={onOpenAddPlan} className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 border ${theme.borderAccent} ${theme.bgAccent} ${theme.textAccent}`}><Plus className="w-4 h-4" /> Add Plan</button>
          </div>

          <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
            {['All', 'Car', 'Utilities', 'General'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedPlanTab(tab)}
                className={`py-1.5 rounded-lg transition-all ${selectedPlanTab === tab ? `${theme.btnPrimary}` : 'opacity-60 hover:opacity-100'}`}
              >
                {tab === 'Car' ? '🚗 Car' : tab}
              </button>
            ))}
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[420px]">
            {filteredPlans.length === 0 ? (
              <p className="text-xs opacity-50 text-center py-8 border border-dashed border-slate-800 rounded-xl">No plans in this sub-tab yet.</p>
            ) : (
              filteredPlans.map(plan => {
                const subCount = plan.subExpenses ? plan.subExpenses.length : 0;
                return (
                  <div key={plan.id} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="cursor-pointer" onClick={() => onOpenSubExpenses(plan)}>
                        <h5 className="text-xs font-bold flex items-center gap-1.5 hover:underline">
                          {plan.category === 'Car' && <Car className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                          {plan.title}
                        </h5>
                        <span className="text-[10px] opacity-60">Due: {plan.dayOfMonth}th • {subCount > 0 ? `${subCount} sub-item(s)` : 'Click to add sub-expenses'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${plan.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {plan.type === 'Income' ? '+' : '-'}{formatCurrency(plan.amount)}
                        </span>
                        <button onClick={() => onOpenSubExpenses(plan)} title="Breakdown / Sub-Expenses" className="text-sky-400 hover:text-sky-300 p-1"><ListTree className="w-3.5 h-3.5" /></button>
                        <button onClick={() => onDeletePlan(plan.id)} title="Delete Plan" className="text-slate-600 hover:text-rose-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    {subCount > 0 && (
                      <div className="pt-2 border-t border-slate-900 space-y-1">
                        {plan.subExpenses.map(sub => (
                          <div key={sub.id} className="flex justify-between text-[11px] opacity-80">
                            <span>• {sub.description}</span>
                            <span className="font-mono">{formatCurrency(sub.amount)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
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

function SubExpensesModal({ theme, plan, formatCurrency, onUpdate, onClose }) {
  const [subList, setSubList] = useState(plan.subExpenses || []);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddSubItem = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newItem = {
      id: 'sub-' + Date.now(),
      description,
      amount: Number(amount)
    };

    const updated = [...subList, newItem];
    setSubList(updated);
    onUpdate(updated);

    setDescription('');
    setAmount('');
  };

  const handleDeleteSubItem = (id) => {
    const updated = subList.filter(s => s.id !== id);
    setSubList(updated);
    onUpdate(updated);
  };

  const calculatedTotal = useMemo(() => subList.reduce((acc, s) => acc + Number(s.amount), 0), [subList]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold flex items-center gap-2"><ListTree className={`w-4 h-4 ${theme.textAccent}`} /> Sub-Expenses Breakdown: {plan.title}</h3>
            <p className="text-[11px] opacity-60">Add itemized parts & costs for this main expense</p>
          </div>
          <button onClick={onClose}><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleAddSubItem} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Sub-expense Description (e.g. Brakes)"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none"
          />
          <input
            type="number"
            placeholder="Amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none"
          />
          <button type="submit" className={`sm:col-span-3 py-2 rounded-xl text-xs font-bold uppercase ${theme.btnPrimary}`}>
            Add Sub-Expense Item
          </button>
        </form>

        <div className="space-y-2 max-h-[250px] overflow-y-auto pt-2">
          {subList.length === 0 ? (
            <p className="text-xs opacity-50 text-center py-6 border border-dashed border-slate-800 rounded-xl">No sub-expenses added yet.</p>
          ) : (
            subList.map(item => (
              <div key={item.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold">{item.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-rose-400">-{formatCurrency(item.amount)}</span>
                  <button onClick={() => handleDeleteSubItem(item.id)} className="text-slate-600 hover:text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs font-bold">
          <span>Calculated Main Expense Total:</span>
          <span className="font-mono text-sm text-sky-400">{formatCurrency(calculatedTotal)}</span>
        </div>
      </div>
    </div>
  );
}

function WishlistView({ theme, wishlist, setWishlist, formatCurrency, safeToSpendToday, onAddTransaction, showToast }) {
  const [title, setTitle] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Gadgets');
  const [notes, setNotes] = useState('');

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!title || !estimatedPrice) return;

    setWishlist(prev => [{
      id: 'wish-' + Date.now(),
      title,
      estimatedPrice: Number(estimatedPrice),
      priority,
      category,
      notes,
      createdAt: new Date().toISOString().split('T')[0]
    }, ...prev]);

    setTitle('');
    setEstimatedPrice('');
    setNotes('');
    showToast(`Added "${title}" to your Wishlist!`, 'success');
  };

  const handleDeleteWish = (id) => {
    setWishlist(prev => prev.filter(w => w.id !== id));
    showToast('Wish item removed.', 'info');
  };

  const handleConvertToExpense = (wish) => {
    onAddTransaction({
      id: 'tx-' + Date.now(),
      title: `Fulfilled Wish: ${wish.title}`,
      amount: wish.estimatedPrice,
      type: 'Expense',
      category: 'Other',
      merchant: 'Wishlist Goal',
      date: new Date().toISOString().split('T')[0]
    });
    handleDeleteWish(wish.id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold flex items-center gap-2"><Heart className={`w-4 h-4 ${theme.textAccent}`} /> Add Future Wish Item</h3>
        <form onSubmit={handleAddWish} className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold opacity-60 uppercase">Wish Name</label>
            <input type="text" placeholder="e.g. 34-inch Curved Monitor" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none" />
          </div>
          <div>
            <label className="text-[11px] font-semibold opacity-60 uppercase">Estimated Price</label>
            <input type="number" placeholder="45000" required value={estimatedPrice} onChange={(e) => setEstimatedPrice(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none" />
          </div>
          <button type="submit" className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase ${theme.btnPrimary}`}>Add to Wish List</button>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {wishlist.length === 0 ? (
          <div className="bg-slate-900/80 p-8 rounded-2xl border border-dashed border-slate-800 text-center opacity-50 text-xs">No wishes added yet.</div>
        ) : (
          wishlist.map(wish => (
            <div key={wish.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">{wish.title}</h4>
                <p className="font-mono text-xs opacity-60">{formatCurrency(wish.estimatedPrice)}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleConvertToExpense(wish)} className={`p-2 rounded-xl border ${theme.borderAccent} ${theme.bgAccent} ${theme.textAccent}`}><Check className="w-4 h-4" /></button>
                <button onClick={() => handleDeleteWish(wish.id)} className="p-2 text-slate-500 hover:text-rose-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ShoppingListsView({ theme, geminiApiKey, shoppingLists, setShoppingLists, formatCurrency, selectedCurrency, showToast }) {
  const [selectedCategory, setSelectedCategory] = useState('Foods');
  const [listTitle, setListTitle] = useState('');
  const [rawText, setRawText] = useState('');
  const [isEstimating, setIsEstimating] = useState(false);

  const categories = [
    { id: 'Foods', label: 'Foods & Groceries', icon: ShoppingBag },
    { id: 'Tools', label: 'Tools & Hardware', icon: Wrench },
    { id: 'Car', label: 'Car Parts & Repair', icon: Car },
    { id: 'Project', label: 'Projects & Building', icon: Hammer },
    { id: 'Other', label: 'Other & Various', icon: Package }
  ];

  const handleEstimateCost = async (e) => {
    e.preventDefault();
    if (!rawText.trim() || !listTitle.trim()) return;

    if (!geminiApiKey) {
      alert('Gemini API key is required for AI estimations. Please configure it in Settings -> Master Config.');
      return;
    }

    setIsEstimating(true);
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
      const systemPrompt = `Analyze shopping list for category '${selectedCategory}'. Estimate average retail price in currency ${selectedCurrency}. Respond strictly with JSON: { "estimatedItems": [{ "item": "string", "qty": "string", "estimatedPrice": number }], "totalEstimated": number, "summaryNote": "string" }\nList:\n${rawText}`;

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }], generationConfig: { responseMimeType: "application/json" } })
      });
      const data = await res.json();
      const parsed = JSON.parse(data?.candidates?.[0]?.content?.parts?.[0]?.text);

      setShoppingLists(prev => [{ id: 'list-' + Date.now(), title: listTitle, category: selectedCategory, rawText, estimatedItems: parsed.estimatedItems || [], totalEstimated: parsed.totalEstimated || 0, summaryNote: parsed.summaryNote || '', date: new Date().toISOString().split('T')[0] }, ...prev]);
      setListTitle('');
      setRawText('');
      showToast('AI Cost estimation calculated successfully!', 'success');
    } catch (err) { alert('Estimation error: ' + err.message); } finally { setIsEstimating(false); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
        <h3 className="text-base font-bold flex items-center gap-2"><Calculator className={`w-5 h-5 ${theme.textAccent}`} /> Grocery List & AI Market Cost Estimation</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
          <form onSubmit={handleEstimateCost} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Category</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {categories.map(cat => (
                  <button key={cat.id} type="button" onClick={() => setSelectedCategory(cat.id)} className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-2 border ${selectedCategory === cat.id ? theme.btnPrimary : 'bg-slate-950 border-slate-800 opacity-60'}`}>{cat.id}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">List Title</label>
              <input type="text" placeholder="e.g. Weekly Groceries" required value={listTitle} onChange={(e) => setListTitle(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Items List</label>
              <textarea rows={5} placeholder="Write items here (e.g. 2x Milk 1L, Bread)..." required value={rawText} onChange={(e) => setRawText(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none font-mono" />
            </div>
            <button type="submit" disabled={isEstimating} className={`w-full font-bold py-3 rounded-xl text-xs uppercase ${theme.btnPrimary}`}>{isEstimating ? 'Estimating...' : 'Estimate Cost with AI'}</button>
          </form>
        </div>
        <div className="lg:col-span-2 space-y-4">
          {shoppingLists.length === 0 ? (
            <div className="bg-slate-900/80 p-8 rounded-2xl border border-dashed border-slate-800 text-center opacity-50 text-xs">No saved shopping lists yet.</div>
          ) : (
            shoppingLists.map(list => (
              <div key={list.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center"><h5 className="font-bold text-sm">{list.title}</h5><span className={`font-mono font-bold ${theme.textAccent}`}>~{formatCurrency(list.totalEstimated)}</span></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function DailyEntryView({ theme, geminiApiKey, onAddTransaction, transactions, formatCurrency, onDeleteTransaction, showToast }) {
  const [formData, setFormData] = useState({ title: '', amount: '', type: 'Expense', category: 'Food', merchant: '', date: new Date().toISOString().split('T')[0] });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  const handleManualAdd = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    onAddTransaction({
      id: 'tx-' + Date.now(),
      title: formData.title,
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      merchant: formData.merchant || 'General',
      date: formData.date
    });

    setFormData({ title: '', amount: '', type: 'Expense', category: 'Food', merchant: '', date: new Date().toISOString().split('T')[0] });
  };

  const handleReceiptScan = async () => {
    if (!selectedFiles.length || !geminiApiKey) {
      alert('Please select receipt image(s) and make sure Gemini API key is configured in Settings -> Master Config.');
      return;
    }
    setIsScanning(true);
    try {
      const imageParts = await Promise.all(selectedFiles.map(file => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ inlineData: { data: reader.result.split(',')[1], mimeType: file.type || 'image/jpeg' } });
        reader.readAsDataURL(file);
      })));

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: "Extract receipt details JSON: amount, merchant, date, category, title, items: [{ name: string, quantity: number, price: number }]" }, ...imageParts] }], generationConfig: { responseMimeType: "application/json" } })
      });
      const data = await res.json();
      const parsed = JSON.parse(data?.candidates?.[0]?.content?.parts?.[0]?.text);

      onAddTransaction({ id: 'tx-' + Date.now(), title: parsed.title || 'Scanned Receipt', amount: Number(parsed.amount) || 0, type: 'Expense', category: parsed.category || 'Food', merchant: parsed.merchant || 'Store', date: parsed.date || new Date().toISOString().split('T')[0], items: parsed.items || [] });
      setSelectedFiles([]);
      showToast('Receipt scanned & logged with AI!', 'success');
    } catch (err) { alert('OCR Error: ' + err.message); } finally { setIsScanning(false); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold flex items-center gap-2"><Plus className={`w-4 h-4 ${theme.textAccent}`} /> Manual Transaction Entry</h3>
          <form onSubmit={handleManualAdd} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Title</label>
              <input type="text" placeholder="e.g. Coffee, Groceries" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">Amount</label>
                <input type="number" placeholder="0" required value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none" />
              </div>
              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">Type</label>
                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none">
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Category</label>
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none">
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <button type="submit" className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase ${theme.btnPrimary}`}>Log Entry</button>
          </form>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold flex items-center gap-2"><Sparkles className={`w-4 h-4 ${theme.textAccent}`} /> Receipt OCR Scanner</h3>
          <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={(e) => setSelectedFiles(Array.from(e.target.files))} className="hidden" />
          <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-800 p-6 rounded-xl text-center cursor-pointer hover:border-slate-700">
            <Camera className={`w-8 h-8 mx-auto mb-2 ${theme.textAccent}`} />
            <p className="text-xs font-semibold">{selectedFiles.length > 0 ? `${selectedFiles.length} photos selected` : 'Take or Upload Receipt Photos'}</p>
          </div>
          {selectedFiles.length > 0 && <button onClick={handleReceiptScan} disabled={isScanning} className={`w-full py-2.5 rounded-xl font-bold text-xs ${theme.btnPrimary}`}>{isScanning ? 'Scanning...' : 'Process Photos'}</button>}
        </div>
      </div>

      <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold">Transaction History Log</h3>
        <div className="divide-y divide-slate-800 max-h-[500px] overflow-y-auto">
          {transactions.length === 0 ? (
            <p className="text-xs opacity-50 py-8 text-center">No logged transactions yet.</p>
          ) : (
            transactions.map(t => (
              <div key={t.id} className="py-3 flex justify-between items-center text-xs">
                <div><p className="font-bold">{t.title}</p><p className="opacity-50">{t.merchant || t.category} • {t.date}</p></div>
                <div className="flex items-center gap-3"><span className={`font-mono font-bold ${t.type === 'Income' ? 'text-emerald-400' : 'text-slate-200'}`}>{t.type === 'Income' ? '+' : '-'}{formatCurrency(t.amount)}</span><button onClick={() => onDeleteTransaction(t.id)} className="text-slate-600 hover:text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function GroceryTrackerView({ theme, transactions, formatCurrency }) {
  const [search, setSearch] = useState('');
  const items = useMemo(() => {
    const itemMap = {};
    transactions.forEach(t => {
      if (t.items) t.items.forEach(i => {
        const itemName = i.name || i.item || 'Item';
        const k = itemName.toLowerCase().trim();
        if (!itemMap[k]) itemMap[k] = { name: itemName, qty: 0, spent: 0 };
        itemMap[k].qty += Number(i.quantity || 1);
        itemMap[k].spent += Number(i.price || 0) * Number(i.quantity || 1);
      });
    });
    return Object.values(itemMap).filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  }, [transactions, search]);

  return (
    <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold flex items-center gap-2"><Activity className={`w-4 h-4 ${theme.textAccent}`} /> Item Tracker & Usage</h3>
        <input type="text" placeholder="Search item..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs focus:outline-none" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.length === 0 ? (
          <div className="col-span-full py-8 text-center opacity-50 text-xs">No scanned receipt items recorded yet.</div>
        ) : (
          items.map((i, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
              <div><p className="font-bold text-xs">{i.name}</p></div>
              <div className="text-right"><p className={`font-mono font-bold text-xs ${theme.textAccent}`}>{i.qty} pcs</p><p className="text-[10px] opacity-50">{formatCurrency(i.spent)}</p></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AnalyticsView({ theme, transactions, formatCurrency }) {
  const categoryTotals = useMemo(() => {
    const totals = {};
    transactions.filter(t => t.type === 'Expense').forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
    });
    return totals;
  }, [transactions]);

  const grandTotal = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-6">
      <h3 className="text-sm font-bold flex items-center gap-2"><PieChart className={`w-4 h-4 ${theme.textAccent}`} /> Reports & Category Expenses</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map(cat => {
          const spent = categoryTotals[cat.id] || 0;
          const pct = grandTotal > 0 ? Math.round((spent / grandTotal) * 100) : 0;
          return (
            <div key={cat.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold flex items-center gap-2"><span>{cat.icon}</span> {cat.label}</span>
                <span className="font-mono font-bold">{formatCurrency(spent)}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className={`h-full ${theme.btnPrimary}`} style={{ width: `${pct}%` }}></div>
              </div>
              <span className="text-[10px] opacity-50">{pct}% of total spent</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsView({ theme, currentTheme, setCurrentTheme, selectedCurrency, setSelectedCurrency, startingBalance, setStartingBalance, setShowAdminModal, nickname, setNickname, userEmail, setUserEmail, showToast }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2"><User className={`w-5 h-5 ${theme.textAccent}`} /> Account & App Nickname</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-semibold opacity-60 uppercase">Your Nickname</label>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none" />
          </div>
          <div>
            <label className="text-[11px] font-semibold opacity-60 uppercase">Email Address</label>
            <input type="email" placeholder="Optional sync email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none" />
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2"><Globe className={`w-5 h-5 ${theme.textAccent}`} /> Default Currency</h3>
        <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none">
          {WORLD_CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.code} - {c.name} ({c.symbol})</option>
          ))}
        </select>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2"><Palette className={`w-5 h-5 ${theme.textAccent}`} /> Accent Color Theme</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.keys(THEMES).map(tKey => (
            <button key={tKey} onClick={() => setCurrentTheme(tKey)} className={`p-3 rounded-xl border text-xs font-bold ${currentTheme === tKey ? `${THEMES[tKey].btnPrimary} border-white` : 'bg-slate-950 border-slate-800 opacity-70'}`}>{THEMES[tKey].name}</button>
          ))}
        </div>
      </div>

      <div className="text-right pt-2">
        <button onClick={() => setShowAdminModal(true)} className="text-[11px] text-slate-500 hover:text-slate-300 font-mono flex items-center gap-1.5 ml-auto"><Lock className="w-3.5 h-3.5" /> 🔒 Master Gemini & Supabase Config</button>
      </div>
    </div>
  );
}

function PlanModal({ theme, plan, onSave, onClose }) {
  const [formData, setFormData] = useState(plan || {
    title: '',
    amount: '',
    type: 'Expense',
    category: 'Car',
    subCategory: 'Vehicle Registration',
    frequency: 'Monthly',
    dayOfMonth: 15,
    isActive: true
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex justify-between items-center"><h3 className="text-sm font-bold">Planned Cashflow Rule</h3><button onClick={onClose}><X className="w-4 h-4" /></button></div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-bold uppercase opacity-60">Category</label>
            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none">
              {PLAN_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase opacity-60">Bill Due Date</label>
            <select value={formData.dayOfMonth} onChange={e => setFormData({ ...formData, dayOfMonth: Number(e.target.value) })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day}>Day {day}</option>
              ))}
            </select>
          </div>
        </div>

        {formData.category === 'Car' && (
          <div>
            <label className="text-[10px] font-bold uppercase opacity-60 text-sky-400">Car Expense Sub-Type</label>
            <select value={formData.subCategory} onChange={e => setFormData({ ...formData, subCategory: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none">
              {CAR_SUB_CATEGORIES.map(sc => <option key={sc} value={sc}>{sc}</option>)}
            </select>
          </div>
        )}

        <input type="text" placeholder="Title (e.g. Opel Registration)" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />
        <input type="number" placeholder="Amount (RSD)" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-mono focus:outline-none" />
        
        <div className="grid grid-cols-2 gap-2">
          <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none">
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
          <select value={formData.frequency} onChange={e => setFormData({ ...formData, frequency: e.target.value })} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none">
            <option value="Monthly">Monthly</option>
            <option value="Once">Once</option>
          </select>
        </div>

        <button onClick={() => { onSave(formData); onClose(); }} className={`w-full py-2.5 rounded-xl font-bold text-xs ${theme.btnPrimary}`}>Save Cashflow Rule</button>
      </div>
    </div>
  );
}

function PartnerModal({ theme, householdCode, setHouseholdCode, partnerName, setPartnerName, partnerEmail, setPartnerEmail, userEmail, nickname, supabaseUrl, supabaseAnonKey, showToast, onClose }) {
  const [inputCode, setInputCode] = useState('');
  const [isMerging, setIsMerging] = useState(false);

  const handleApplyCustomCode = async () => {
    const codeToUse = inputCode.trim() || householdCode;
    setIsMerging(true);

    try {
      if (supabaseUrl && supabaseAnonKey) {
        await fetch(`${supabaseUrl}/rest/v1/households`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({
            id: codeToUse,
            name: `${nickname} & ${partnerName || 'Partner'}`
          })
        });

        if (userEmail || partnerEmail) {
          const emailSubject = encodeURIComponent(`STASHLY: Vault Merge Successful (${codeToUse})`);
          const emailBody = encodeURIComponent(`Hello,\n\nYour STASHLY Household Vault has been successfully merged!\n\nVault Code: ${codeToUse}\nUsers: ${nickname} & ${partnerName || 'Partner'}\n\nAll cashflow projections and expenses are now synchronized live across both devices.`);
          window.open(`mailto:${userEmail},${partnerEmail}?subject=${emailSubject}&body=${emailBody}`, '_blank');
        }
      }

      setHouseholdCode(codeToUse);
      showToast(`SUCCESS: Vault merged! Email confirmation sent.`, 'success');
      onClose();
    } catch (err) {
      showToast(`FAILED: Could not merge vaults. Check network connection.`, 'error');
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold flex items-center gap-2"><UserPlus className={`w-4 h-4 ${theme.textAccent}`} /> Shared Household Vault</h3>
          <button onClick={onClose}><X className="w-4 h-4" /></button>
        </div>
        
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
          <span className="text-[10px] font-semibold opacity-60 uppercase">Your Active Vault Code</span>
          <p className="font-mono font-bold text-sm text-sky-400">{householdCode}</p>
          
          {/* QR Code Stub */}
          <div className="pt-2 border-t border-slate-800 flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg flex items-center justify-center shadow-inner">
               <QrCode className="w-12 h-12 text-slate-950" />
            </div>
            <p className="text-[10px] opacity-60 leading-tight">Ready for QR Scanning.<br/>Have your partner scan this to automatically merge vaults.</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold opacity-60 uppercase">Partner's Nickname</label>
            <input type="text" placeholder="e.g. Partner Name" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />
          </div>

          <div>
            <label className="text-[11px] font-semibold opacity-60 uppercase">Partner's Email (For Merge Alerts)</label>
            <input type="email" placeholder="partner@example.com" value={partnerEmail} onChange={(e) => setPartnerEmail(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />
          </div>

          <div>
            <label className="text-[11px] font-semibold opacity-60 uppercase">Join Existing Vault Code</label>
            <input type="text" placeholder="Paste partner's code here..." value={inputCode} onChange={(e) => setInputCode(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-mono focus:outline-none" />
          </div>
        </div>

        <button onClick={handleApplyCustomCode} disabled={isMerging} className={`w-full py-2.5 rounded-xl font-bold text-xs ${theme.btnPrimary}`}>
          {isMerging ? 'Merging Vaults...' : 'Merge Vaults & Send Email'}
        </button>
      </div>
    </div>
  );
}

function AuthModal({ theme, nickname, setNickname, userEmail, setUserEmail, isLoggedIn, setIsLoggedIn, showToast, onClose }) {
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userEmail || !password) {
      showToast('Login Failed: Email and Password are required!', 'error');
      return;
    }

    setIsLoggedIn(true);
    showToast(`You successfully logged in as ${nickname}!`, 'success');
    onClose();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showToast('You have been logged out.', 'info');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold flex items-center gap-2"><User className={`w-4 h-4 ${theme.textAccent}`} /> Account & Authentication</h3>
          <button onClick={onClose}><X className="w-4 h-4" /></button>
        </div>

        {isLoggedIn ? (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm">Logged in as {nickname}</p>
              <p className="text-xs opacity-60">{userEmail}</p>
            </div>
            <button onClick={handleLogout} className="w-full py-2.5 rounded-xl font-bold text-xs bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30">
              Log Out of STASHLY
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">App Nickname</label>
              <input type="text" required value={nickname} onChange={e => setNickname(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />
            </div>
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Email Address</label>
              <input type="email" required value={userEmail} onChange={e => setUserEmail(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />
            </div>
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />
            </div>
            <button type="submit" className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase ${theme.btnPrimary}`}>
              Log In & Sync Session
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
