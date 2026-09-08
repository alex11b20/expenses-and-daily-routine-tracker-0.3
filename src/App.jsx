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
  Upload
} from 'lucide-react';

const WORLD_CURRENCIES = [
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'RSD' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark', symbol: 'KM' },
  { code: 'MKD', name: 'Macedonian Denar', symbol: 'den' },
  { code: 'HRK', name: 'Croatian Kuna (Legacy)', symbol: 'kn' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'lv' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei' }
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

const THEMES = {
  'neon-green': {
    name: 'Neon Green',
    btnPrimary: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold',
    textAccent: 'text-emerald-400',
    borderAccent: 'border-emerald-500/40',
    bgAccent: 'bg-emerald-500/10',
    chartColor: '#10b981',
    bgGlow: 'from-emerald-950/40'
  },
  'neon-red': {
    name: 'Neon Red',
    btnPrimary: 'bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold',
    textAccent: 'text-rose-400',
    borderAccent: 'border-rose-500/40',
    bgAccent: 'bg-rose-500/10',
    chartColor: '#f43f5e',
    bgGlow: 'from-rose-950/40'
  },
  'neon-blue': {
    name: 'Neon Blue',
    btnPrimary: 'bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold',
    textAccent: 'text-blue-400',
    borderAccent: 'border-blue-500/40',
    bgAccent: 'bg-blue-500/10',
    chartColor: '#3b82f6',
    bgGlow: 'from-blue-950/40'
  },
  'light-blue': {
    name: 'Light Blue',
    btnPrimary: 'bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold',
    textAccent: 'text-sky-400',
    borderAccent: 'border-sky-400/40',
    bgAccent: 'bg-sky-400/10',
    chartColor: '#38bdf8',
    bgGlow: 'from-sky-950/40'
  },
  'neon-yellow': {
    name: 'Neon Yellow',
    btnPrimary: 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold',
    textAccent: 'text-amber-400',
    borderAccent: 'border-amber-400/40',
    bgAccent: 'bg-amber-400/10',
    chartColor: '#fbbf24',
    bgGlow: 'from-amber-950/40'
  },
  'black': {
    name: 'Pure Black',
    btnPrimary: 'bg-slate-100 hover:bg-white text-slate-950 font-bold',
    textAccent: 'text-slate-100',
    borderAccent: 'border-slate-700',
    bgAccent: 'bg-slate-800/60',
    chartColor: '#f8fafc',
    bgGlow: 'from-slate-900'
  },
  'white': {
    name: 'Light Mode',
    btnPrimary: 'bg-slate-900 hover:bg-slate-800 text-white font-bold',
    textAccent: 'text-slate-900',
    borderAccent: 'border-slate-300',
    bgAccent: 'bg-slate-200/80',
    chartColor: '#0f172a',
    bgGlow: 'from-slate-200'
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function App() {
  const [activeTab, setActiveTab] = useState('cashflow');

  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('fb_theme') || 'neon-green');
  const theme = THEMES[currentTheme] || THEMES['neon-green'];

  const [selectedCurrency, setSelectedCurrency] = useState(() => localStorage.getItem('fb_currency') || 'RSD');

  const formatCurrency = (val) => {
    const curr = WORLD_CURRENCIES.find(c => c.code === selectedCurrency) || WORLD_CURRENCIES[0];
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val || 0) + ' ' + curr.symbol;
  };

  const [startingBalance, setStartingBalance] = useState(() => {
    const saved = localStorage.getItem('sb_starting_balance');
    return saved !== null ? Number(saved) : 0;
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

  const [projectionDays, setProjectionDays] = useState(45);
  
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('sb_gemini_key') || '';
  });

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => { localStorage.setItem('fb_theme', currentTheme); }, [currentTheme]);
  useEffect(() => { localStorage.setItem('fb_currency', selectedCurrency); }, [selectedCurrency]);
  useEffect(() => { localStorage.setItem('sb_starting_balance', startingBalance.toString()); }, [startingBalance]);
  useEffect(() => { localStorage.setItem('sb_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('sb_cashflow_plans', JSON.stringify(cashflowPlans)); }, [cashflowPlans]);
  useEffect(() => { localStorage.setItem('sb_shopping_lists', JSON.stringify(shoppingLists)); }, [shoppingLists]);
  useEffect(() => { localStorage.setItem('sb_gemini_key', geminiApiKey); }, [geminiApiKey]);

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

  const handleAddTransaction = (newTx) => {
    setTransactions(prev => [newTx, ...prev]);
    if (newTx.date === new Date().toISOString().split('T')[0]) {
      if (newTx.type === 'Income') setStartingBalance(prev => Number(prev) + Number(newTx.amount));
      else setStartingBalance(prev => Number(prev) - Number(newTx.amount));
    }
  };

  const handleDeleteTransaction = (id) => setTransactions(prev => prev.filter(t => t.id !== id));

  const handleSavePlan = (planData) => {
    if (editingPlan) {
      setCashflowPlans(prev => prev.map(p => p.id === editingPlan.id ? { ...planData, id: editingPlan.id } : p));
    } else {
      setCashflowPlans(prev => [...prev, { ...planData, id: 'plan-' + Date.now() }]);
    }
    setIsPlanModalOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = (id) => setCashflowPlans(prev => prev.filter(p => p.id !== id));

  return (
    <div className={`min-h-screen font-sans antialiased ${currentTheme === 'white' ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 py-3 sm:px-6 ${currentTheme === 'white' ? 'bg-white/90 border-slate-200' : 'bg-slate-900/90 border-slate-800/80'}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${theme.btnPrimary}`}>
                <TrendingUp className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">Smart Budget</h1>
                <p className="text-xs opacity-60">Cashflow & Smart AI Planner</p>
              </div>
            </div>

            <div className={`sm:hidden flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-semibold ${theme.textAccent} ${theme.borderAccent}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{formatCurrency(safeToSpendToday)}</span>
            </div>
          </div>

          <nav className={`flex items-center gap-1 p-1 rounded-xl border w-full sm:w-auto overflow-x-auto ${currentTheme === 'white' ? 'bg-slate-200/60 border-slate-300' : 'bg-slate-950/60 border-slate-800/80'}`}>
            <button onClick={() => setActiveTab('cashflow')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'cashflow' ? `${theme.btnPrimary} shadow-md` : 'opacity-60 hover:opacity-100'}`}>
              <Calendar className="w-4 h-4" /> Cashflow Projection
            </button>
            <button onClick={() => setActiveTab('lists')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'lists' ? `${theme.btnPrimary} shadow-md` : 'opacity-60 hover:opacity-100'}`}>
              <ListPlus className="w-4 h-4" /> Grocery List
            </button>
            <button onClick={() => setActiveTab('entry')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'entry' ? `${theme.btnPrimary} shadow-md` : 'opacity-60 hover:opacity-100'}`}>
              <Camera className="w-4 h-4" /> Expenses & OCR Scan
            </button>
            <button onClick={() => setActiveTab('groceries')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'groceries' ? `${theme.btnPrimary} shadow-md` : 'opacity-60 hover:opacity-100'}`}>
              <Activity className="w-4 h-4" /> Item Tracker & Usage
            </button>
            <button onClick={() => setActiveTab('analytics')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'analytics' ? `${theme.btnPrimary} shadow-md` : 'opacity-60 hover:opacity-100'}`}>
              <PieChart className="w-4 h-4" /> Reports
            </button>
            <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'settings' ? `${theme.btnPrimary} shadow-md` : 'opacity-60 hover:opacity-100'}`}>
              <Settings className="w-4 h-4" /> Settings
            </button>
          </nav>
        </div>
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
          />
        )}

        {activeTab === 'lists' && (
          <ShoppingListsView
            theme={theme}
            geminiApiKey={geminiApiKey}
            shoppingLists={shoppingLists}
            setShoppingLists={setShoppingLists}
            formatCurrency={formatCurrency}
            onAddTransaction={handleAddTransaction}
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
          />
        )}
      </main>

      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2"><Lock className={`w-4 h-4 ${theme.textAccent}`} /> Admin API Key Override</h3>
              <button onClick={() => setShowAdminModal(false)} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <p className="text-xs text-slate-400">Enter master Gemini API key to override server configuration.</p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none"
            />
            <button onClick={() => setShowAdminModal(false)} className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase ${theme.btnPrimary}`}>Save Admin Key</button>
          </div>
        </div>
      )}

      {isPlanModalOpen && (
        <PlanModal theme={theme} plan={editingPlan} onSave={handleSavePlan} onClose={() => { setIsPlanModalOpen(false); setEditingPlan(null); }} />
      )}
    </div>
  );
}

function CashflowView({ theme, startingBalance, setStartingBalance, dailyProjections, safeToSpendToday, lowestProjectedBalance, projectionDays, setProjectionDays, cashflowPlans, formatCurrency, onOpenAddPlan, onEditPlan, onDeletePlan }) {
  const [filterType, setFilterType] = useState('all');
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

  const filteredProjections = dailyProjections.filter(d => {
    if (filterType === 'bills') return d.hasNetExpense || d.hasNetIncome;
    if (filterType === 'low') return d.endingBalance < 100;
    return true;
  });

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
            <span className="text-xs font-semibold uppercase">Lowest Point</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black">{formatCurrency(lowestProjectedBalance)}</p>
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

      {/* Chart Component */}
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
          <div className="space-y-2.5 overflow-y-auto max-h-[380px]">
            {cashflowPlans.length === 0 ? (
              <p className="text-xs opacity-50 text-center py-8 border border-dashed border-slate-800 rounded-xl">No plans added yet.</p>
            ) : (
              cashflowPlans.map(plan => (
                <div key={plan.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold">{plan.title}</h5>
                    <span className="text-[10px] opacity-60">{plan.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${plan.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'}`}>{plan.type === 'Income' ? '+' : '-'}{formatCurrency(plan.amount)}</span>
                    <button onClick={() => onDeletePlan(plan.id)} className="text-slate-600 hover:text-rose-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))
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
                {filteredProjections.map(d => (
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

function ShoppingListsView({ theme, geminiApiKey, shoppingLists, setShoppingLists, formatCurrency, onAddTransaction }) {
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
      alert('Gemini API key is required for AI estimations. Please configure it in Settings.');
      return;
    }

    setIsEstimating(true);
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
      const systemPrompt = `Analyze shopping list for '${selectedCategory}'. Estimate average retail price in RSD. Respond strictly with JSON: { "estimatedItems": [{ "item": "string", "qty": "string", "estimatedPriceRSD": number }], "totalEstimatedRSD": number, "summaryNote": "string" }\nList:\n${rawText}`;

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }], generationConfig: { responseMimeType: "application/json" } })
      });
      const data = await res.json();
      const parsed = JSON.parse(data?.candidates?.[0]?.content?.parts?.[0]?.text);

      setShoppingLists(prev => [{ id: 'list-' + Date.now(), title: listTitle, category: selectedCategory, rawText, estimatedItems: parsed.estimatedItems || [], totalEstimatedRSD: parsed.totalEstimatedRSD || 0, summaryNote: parsed.summaryNote || '', date: new Date().toISOString().split('T')[0] }, ...prev]);
      setListTitle('');
      setRawText('');
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
              <input type="text" placeholder="e.g. My List" required value={listTitle} onChange={(e) => setListTitle(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Items List</label>
              <textarea rows={5} placeholder="Write items here (e.g. 2x Coca Cola 1.5L)..." required value={rawText} onChange={(e) => setRawText(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none font-mono" />
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
                <div className="flex justify-between items-center"><h5 className="font-bold text-sm">{list.title}</h5><span className={`font-mono font-bold ${theme.textAccent}`}>~{formatCurrency(list.totalEstimatedRSD)}</span></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function DailyEntryView({ theme, geminiApiKey, onAddTransaction, transactions, formatCurrency, onDeleteTransaction }) {
  const [formData, setFormData] = useState({ title: '', amount: '', type: 'Expense', category: 'Food', merchant: '', date: new Date().toISOString().split('T')[0] });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  const handleReceiptScan = async () => {
    if (!selectedFiles.length || !geminiApiKey) return;
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
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: "Extract JSON: pfrNumber, amount, merchant, date, category, title, items" }, ...imageParts] }], generationConfig: { responseMimeType: "application/json" } })
      });
      const data = await res.json();
      const parsed = JSON.parse(data?.candidates?.[0]?.content?.parts?.[0]?.text);

      onAddTransaction({ id: 'tx-' + Date.now(), title: parsed.title || 'Scanned Receipt', amount: Number(parsed.amount) || 0, type: 'Expense', category: parsed.category || 'Food', merchant: parsed.merchant || 'Store', date: parsed.date || new Date().toISOString().split('T')[0], items: parsed.items || [] });
      setSelectedFiles([]);
    } catch (err) { alert('OCR Error: ' + err.message); } finally { setIsScanning(false); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
        <h3 className="text-sm font-bold flex items-center gap-2"><Sparkles className={`w-4 h-4 ${theme.textAccent}`} /> Multi-Part Receipt OCR Scanner</h3>
        <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={(e) => setSelectedFiles(Array.from(e.target.files))} className="hidden" />
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-800 p-6 rounded-xl text-center cursor-pointer hover:border-slate-700">
          <Camera className={`w-8 h-8 mx-auto mb-2 ${theme.textAccent}`} />
          <p className="text-xs font-semibold">{selectedFiles.length > 0 ? `${selectedFiles.length} photos selected` : 'Take or Upload Receipt Photos'}</p>
        </div>
        {selectedFiles.length > 0 && <button onClick={handleReceiptScan} disabled={isScanning} className={`w-full py-2.5 rounded-xl font-bold text-xs ${theme.btnPrimary}`}>{isScanning ? 'Scanning...' : 'Process Photos'}</button>}
      </div>

      <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold">Transaction History Log</h3>
        <div className="divide-y divide-slate-800 max-h-[500px] overflow-y-auto">
          {transactions.map(t => (
            <div key={t.id} className="py-3 flex justify-between items-center text-xs">
              <div><p className="font-bold">{t.title}</p><p className="opacity-50">{t.merchant} • {t.date}</p></div>
              <div className="flex items-center gap-3"><span className={`font-mono font-bold ${t.type === 'Income' ? 'text-emerald-400' : 'text-slate-200'}`}>{formatCurrency(t.amount)}</span><button onClick={() => onDeleteTransaction(t.id)} className="text-slate-600 hover:text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button></div>
            </div>
          ))}
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
        const k = i.name?.toLowerCase().trim() || 'item';
        if (!itemMap[k]) itemMap[k] = { name: i.name, qty: 0, spent: 0 };
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
        {items.map((i, idx) => (
          <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
            <div><p className="font-bold text-xs">{i.name}</p></div>
            <div className="text-right"><p className={`font-mono font-bold text-xs ${theme.textAccent}`}>{i.qty} pcs</p><p className="text-[10px] opacity-50">{formatCurrency(i.spent)}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsView({ theme, transactions, formatCurrency }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
      <h3 className="text-sm font-bold flex items-center gap-2"><PieChart className={`w-4 h-4 ${theme.textAccent}`} /> Reports & Category Expenses</h3>
      <p className="text-xs opacity-60">Analytics module aggregated across all logged entries.</p>
    </div>
  );
}

function SettingsView({ theme, currentTheme, setCurrentTheme, selectedCurrency, setSelectedCurrency, startingBalance, setStartingBalance, setShowAdminModal }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2"><Globe className={`w-5 h-5 ${theme.textAccent}`} /> Default Currency (ISO Standard)</h3>
        <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none">
          {WORLD_CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.code} - {c.name} ({c.symbol})</option>
          ))}
        </select>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2"><Palette className={`w-5 h-5 ${theme.textAccent}`} /> App Theme & Accent Colors</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.keys(THEMES).map(tKey => (
            <button key={tKey} onClick={() => setCurrentTheme(tKey)} className={`p-3 rounded-xl border text-xs font-bold ${currentTheme === tKey ? `${THEMES[tKey].btnPrimary} border-white` : 'bg-slate-950 border-slate-800 opacity-70'}`}>{THEMES[tKey].name}</button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2"><DollarSign className={`w-5 h-5 ${theme.textAccent}`} /> Starting Balance</h3>
        <input type="number" value={startingBalance} onChange={(e) => setStartingBalance(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none" />
      </div>

      <div className="text-right pt-2">
        <button onClick={() => setShowAdminModal(true)} className="text-[11px] text-slate-600 hover:text-slate-400 font-mono">🔒 Admin API Config</button>
      </div>
    </div>
  );
}

function PlanModal({ theme, plan, onSave, onClose }) {
  const [formData, setFormData] = useState(plan || { title: '', amount: '', type: 'Expense', frequency: 'Monthly', dayOfMonth: 15, isActive: true });
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex justify-between items-center"><h3 className="text-sm font-bold">Planned Cashflow Rule</h3><button onClick={onClose}><X className="w-4 h-4" /></button></div>
        <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs" />
        <input type="number" placeholder="Amount" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs" />
        <button onClick={() => { onSave(formData); onClose(); }} className={`w-full py-2.5 rounded-xl font-bold text-xs ${theme.btnPrimary}`}>Save Rule</button>
      </div>
    </div>
  );
}
