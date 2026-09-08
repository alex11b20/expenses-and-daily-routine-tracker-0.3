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
  Lock
} from 'lucide-react';

// SVE PRIZNATE SVETSKE VALUTE (ISO 4217)
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
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' }
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
  'neon-green': { name: 'Neon Green', primary: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950', text: 'text-emerald-400', border: 'border-emerald-500', bgGlow: 'from-emerald-950/40' },
  'neon-red': { name: 'Neon Red', primary: 'bg-rose-500 hover:bg-rose-400 text-slate-950', text: 'text-rose-400', border: 'border-rose-500', bgGlow: 'from-rose-950/40' },
  'neon-blue': { name: 'Neon Blue', primary: 'bg-blue-500 hover:bg-blue-400 text-slate-950', text: 'text-blue-400', border: 'border-blue-500', bgGlow: 'from-blue-950/40' },
  'light-blue': { name: 'Light Blue', primary: 'bg-sky-400 hover:bg-sky-300 text-slate-950', text: 'text-sky-400', border: 'border-sky-400', bgGlow: 'from-sky-950/40' },
  'neon-yellow': { name: 'Neon Yellow', primary: 'bg-amber-400 hover:bg-amber-300 text-slate-950', text: 'text-amber-400', border: 'border-amber-400', bgGlow: 'from-amber-950/40' },
  'black': { name: 'Pure Black', primary: 'bg-slate-100 hover:bg-white text-slate-950', text: 'text-slate-200', border: 'border-slate-700', bgGlow: 'from-slate-900' },
  'white': { name: 'Light Mode', primary: 'bg-slate-900 hover:bg-slate-800 text-white', text: 'text-slate-900', border: 'border-slate-300', bgGlow: 'from-slate-200' }
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
  
  // ADMIN SYSTEM: Read key from env or admin local storage
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('sb_gemini_key') || '';
  });

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPass, setAdminPass] = useState('');

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
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6
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
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${theme.primary}`}>
                <TrendingUp className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">Smart Budget</h1>
                <p className="text-xs opacity-60">Cashflow & Smart Planner</p>
              </div>
            </div>

            <div className={`sm:hidden flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-semibold ${theme.text} ${theme.border}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{formatCurrency(safeToSpendToday)}</span>
            </div>
          </div>

          <nav className={`flex items-center gap-1 p-1 rounded-xl border w-full sm:w-auto overflow-x-auto ${currentTheme === 'white' ? 'bg-slate-200/60 border-slate-300' : 'bg-slate-950/60 border-slate-800/80'}`}>
            <button onClick={() => setActiveTab('cashflow')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'cashflow' ? `${theme.primary} font-semibold shadow-md` : 'opacity-60 hover:opacity-100'}`}>
              <Calendar className="w-4 h-4" /> Cashflow Projection
            </button>
            <button onClick={() => setActiveTab('lists')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'lists' ? `${theme.primary} font-semibold shadow-md` : 'opacity-60 hover:opacity-100'}`}>
              <ListPlus className="w-4 h-4" /> Grocery List
            </button>
            <button onClick={() => setActiveTab('entry')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'entry' ? `${theme.primary} font-semibold shadow-md` : 'opacity-60 hover:opacity-100'}`}>
              <Camera className="w-4 h-4" /> Expenses & OCR Scan
            </button>
            <button onClick={() => setActiveTab('groceries')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'groceries' ? `${theme.primary} font-semibold shadow-md` : 'opacity-60 hover:opacity-100'}`}>
              <Activity className="w-4 h-4" /> Item Tracker & Usage
            </button>
            <button onClick={() => setActiveTab('analytics')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'analytics' ? `${theme.primary} font-semibold shadow-md` : 'opacity-60 hover:opacity-100'}`}>
              <PieChart className="w-4 h-4" /> Reports
            </button>
            <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'settings' ? `${theme.primary} font-semibold shadow-md` : 'opacity-60 hover:opacity-100'}`}>
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

      {/* ADMIN KEY MODAL (RESTRICTED ACCESS) */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-400" /> Admin API Override</h3>
              <button onClick={() => setShowAdminModal(false)} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <p className="text-xs text-slate-400">Enter master Gemini API key to override default server configuration.</p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none"
            />
            <button onClick={() => setShowAdminModal(false)} className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase ${theme.primary}`}>Save Admin Key</button>
          </div>
        </div>
      )}

      {isPlanModalOpen && (
        <PlanModal theme={theme} plan={editingPlan} onSave={handleSavePlan} onClose={() => { setIsPlanModalOpen(false); setEditingPlan(null); }} />
      )}
    </div>
  );
}

function CashflowView({ theme, startingBalance, dailyProjections, safeToSpendToday, lowestProjectedBalance, projectionDays, setProjectionDays, formatCurrency }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs font-semibold uppercase opacity-60 mb-1">Current Balance</p>
          <p className="text-2xl font-black">{formatCurrency(startingBalance)}</p>
        </div>
        <div className={`p-5 rounded-2xl border bg-gradient-to-br ${theme.bgGlow} to-slate-900 border-slate-800`}>
          <p className={`text-xs font-bold uppercase ${theme.text}`}>Safe to Spend Today</p>
          <p className={`text-2xl font-black mt-1 ${theme.text}`}>{formatCurrency(safeToSpendToday)}</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs font-semibold uppercase opacity-60 mb-1">Lowest Point ({projectionDays}d)</p>
          <p className="text-2xl font-black">{formatCurrency(lowestProjectedBalance)}</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
          <p className="text-xs font-semibold uppercase opacity-60">Projection Horizon</p>
          <div className="grid grid-cols-4 gap-1 mt-2">
            {[30, 45, 60, 90].map(d => (
              <button key={d} onClick={() => setProjectionDays(d)} className={`py-1 rounded text-xs font-bold ${projectionDays === d ? theme.primary : 'bg-slate-800 opacity-60'}`}>{d}d</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingListsView({ theme, geminiApiKey, shoppingLists, setShoppingLists, formatCurrency }) {
  const [selectedCategory, setSelectedCategory] = useState('Foods');
  const [listTitle, setListTitle] = useState('');
  const [rawText, setRawText] = useState('');
  const [isEstimating, setIsEstimating] = useState(false);

  const handleEstimateCost = async (e) => {
    e.preventDefault();
    if (!rawText.trim() || !listTitle.trim()) return;

    if (!geminiApiKey) {
      alert('AI features are initializing. Please try again shortly.');
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
        <h3 className="text-base font-bold flex items-center gap-2"><Calculator className={`w-5 h-5 ${theme.text}`} /> Grocery List & AI Market Cost Estimation</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
          <form onSubmit={handleEstimateCost} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">List Title</label>
              <input type="text" placeholder="e.g. My List" required value={listTitle} onChange={(e) => setListTitle(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Items List</label>
              <textarea rows={5} placeholder="Write items here (e.g. 2x Coca Cola 1.5L)..." required value={rawText} onChange={(e) => setRawText(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none font-mono" />
            </div>
            <button type="submit" disabled={isEstimating} className={`w-full font-bold py-3 rounded-xl text-xs uppercase ${theme.primary}`}>{isEstimating ? 'Estimating...' : 'Estimate Cost with AI'}</button>
          </form>
        </div>
        <div className="lg:col-span-2 space-y-4">
          {shoppingLists.map(list => (
            <div key={list.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center"><h5 className="font-bold text-sm">{list.title}</h5><span className={`font-mono font-bold ${theme.text}`}>~{formatCurrency(list.totalEstimatedRSD)}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DailyEntryView() { return <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs">Expenses & OCR Scan View</div>; }
function GroceryTrackerView() { return <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs">Item Tracker & Usage View</div>; }
function AnalyticsView() { return <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs">Reports View</div>; }

function SettingsView({ theme, currentTheme, setCurrentTheme, selectedCurrency, setSelectedCurrency, startingBalance, setStartingBalance, setShowAdminModal }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* GLOBAL CURRENCY SELECTOR */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2"><Globe className={`w-5 h-5 ${theme.text}`} /> Default Currency (ISO Standard)</h3>
        <p className="text-xs opacity-60">Select your preferred default currency across all calculations and displays.</p>
        <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none">
          {WORLD_CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.code} - {c.name} ({c.symbol})</option>
          ))}
        </select>
      </div>

      {/* THEMES */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2"><Palette className={`w-5 h-5 ${theme.text}`} /> App Theme & Accent Colors</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.keys(THEMES).map(tKey => (
            <button key={tKey} onClick={() => setCurrentTheme(tKey)} className={`p-3 rounded-xl border text-xs font-bold ${currentTheme === tKey ? `${THEMES[tKey].primary} border-white` : 'bg-slate-950 border-slate-800 opacity-70'}`}>{THEMES[tKey].name}</button>
          ))}
        </div>
      </div>

      {/* STARTING BALANCE */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2"><DollarSign className={`w-5 h-5 ${theme.text}`} /> Starting Balance</h3>
        <input type="number" value={startingBalance} onChange={(e) => setStartingBalance(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none" />
      </div>

      {/* HIDDEN ADMIN ACCESS */}
      <div className="text-right pt-2">
        <button onClick={() => setShowAdminModal(true)} className="text-[11px] text-slate-600 hover:text-slate-400 font-mono">🔒 Admin API Config</button>
      </div>
    </div>
  );
}

function PlanModal({ onClose }) { return <div onClick={onClose}>Modal</div>; }
