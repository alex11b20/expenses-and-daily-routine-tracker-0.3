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
  Calculator
} from 'lucide-react';

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

const INITIAL_TRANSACTIONS = [];
const INITIAL_CASHFLOW_PLANS = [];

const formatCurrency = (val) => {
  return new Intl.NumberFormat('sr-RS', { maximumFractionDigits: 0 }).format(val || 0) + ' RSD';
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function App() {
  const [activeTab, setActiveTab] = useState('cashflow');

  const [startingBalance, setStartingBalance] = useState(() => {
    const saved = localStorage.getItem('sb_starting_balance');
    return saved !== null ? Number(saved) : 0;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('sb_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [cashflowPlans, setCashflowPlans] = useState(() => {
    const saved = localStorage.getItem('sb_cashflow_plans');
    return saved ? JSON.parse(saved) : INITIAL_CASHFLOW_PLANS;
  });

  const [shoppingLists, setShoppingLists] = useState(() => {
    const saved = localStorage.getItem('sb_shopping_lists');
    return saved ? JSON.parse(saved) : [];
  });

  const [projectionDays, setProjectionDays] = useState(45);
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('sb_gemini_key') || '');
  const [supabaseUrl, setSupabaseUrl] = useState(() => localStorage.getItem('sb_supabase_url') || '');
  const [supabaseKey, setSupabaseKey] = useState(() => localStorage.getItem('sb_supabase_key') || '');

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => { localStorage.setItem('sb_starting_balance', startingBalance.toString()); }, [startingBalance]);
  useEffect(() => { localStorage.setItem('sb_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('sb_cashflow_plans', JSON.stringify(cashflowPlans)); }, [cashflowPlans]);
  useEffect(() => { localStorage.setItem('sb_shopping_lists', JSON.stringify(shoppingLists)); }, [shoppingLists]);
  useEffect(() => { localStorage.setItem('sb_gemini_key', geminiApiKey); }, [geminiApiKey]);
  useEffect(() => {
    localStorage.setItem('sb_supabase_url', supabaseUrl);
    localStorage.setItem('sb_supabase_key', supabaseKey);
  }, [supabaseUrl, supabaseKey]);

  const { dailyProjections, safeToSpendToday, lowestProjectedBalance, upcomingMajorBills } = useMemo(() => {
    const projections = [];
    let currentBalance = Number(startingBalance);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let lowestBal = currentBalance;
    let totalExpensesBeforeNextIncome = 0;
    let foundNextIncome = false;
    const majorBills = [];

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
        if (plan.frequency === 'Monthly' && Number(plan.dayOfMonth) === dayOfMonth) {
          applies = true;
        } else if (plan.frequency === 'Weekly' && Number(plan.dayOfWeek) === dayOfWeek) {
          applies = true;
        } else if (plan.frequency === 'Once' && plan.dueDate === dateStr) {
          applies = true;
        }

        if (applies) {
          if (plan.type === 'Income') {
            plannedIncomes += Number(plan.amount);
          } else {
            plannedExpenses += Number(plan.amount);
            if (i <= 14) {
              majorBills.push({ ...plan, date: dateStr });
            }
          }
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

      if (dayEndingBalance < lowestBal) {
        lowestBal = dayEndingBalance;
      }

      if (!foundNextIncome) {
        if (plannedIncomes > 0 && i > 0) {
          foundNextIncome = true;
        } else {
          totalExpensesBeforeNextIncome += plannedExpenses;
        }
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
      lowestProjectedBalance: lowestBal,
      upcomingMajorBills: majorBills.slice(0, 5)
    };
  }, [startingBalance, transactions, cashflowPlans, projectionDays]);

  const handleAddTransaction = (newTx) => {
    setTransactions(prev => [newTx, ...prev]);
    if (newTx.date === new Date().toISOString().split('T')[0]) {
      if (newTx.type === 'Income') {
        setStartingBalance(prev => Number(prev) + Number(newTx.amount));
      } else {
        setStartingBalance(prev => Number(prev) - Number(newTx.amount));
      }
    }
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
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

  const handleDeletePlan = (id) => {
    setCashflowPlans(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <TrendingUp className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-none">
                  FlowBudget
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">Cashflow & Smart AI Planner</p>
              </div>
            </div>

            <div className="sm:hidden flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">{formatCurrency(safeToSpendToday)}</span>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('cashflow')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'cashflow'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Cashflow Projection
            </button>
            <button
              onClick={() => setActiveTab('lists')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'lists'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ListPlus className="w-4 h-4" />
              Lists & AI Estimates
            </button>
            <button
              onClick={() => setActiveTab('entry')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'entry'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Camera className="w-4 h-4" />
              Expenses & OCR Scan
            </button>
            <button
              onClick={() => setActiveTab('groceries')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'groceries'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Grocery Items
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <PieChart className="w-4 h-4" />
              Reports
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {activeTab === 'cashflow' && (
          <CashflowView
            startingBalance={startingBalance}
            setStartingBalance={setStartingBalance}
            dailyProjections={dailyProjections}
            safeToSpendToday={safeToSpendToday}
            lowestProjectedBalance={lowestProjectedBalance}
            upcomingMajorBills={upcomingMajorBills}
            projectionDays={projectionDays}
            setProjectionDays={setProjectionDays}
            cashflowPlans={cashflowPlans}
            onOpenAddPlan={() => { setEditingPlan(null); setIsPlanModalOpen(true); }}
            onEditPlan={(plan) => { setEditingPlan(plan); setIsPlanModalOpen(true); }}
            onDeletePlan={handleDeletePlan}
          />
        )}

        {activeTab === 'lists' && (
          <ShoppingListsView
            geminiApiKey={geminiApiKey}
            shoppingLists={shoppingLists}
            setShoppingLists={setShoppingLists}
            onAddTransaction={handleAddTransaction}
          />
        )}

        {activeTab === 'entry' && (
          <DailyEntryView
            geminiApiKey={geminiApiKey}
            onAddTransaction={handleAddTransaction}
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        )}

        {activeTab === 'groceries' && (
          <GroceryTrackerView transactions={transactions} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            transactions={transactions}
            cashflowPlans={cashflowPlans}
            startingBalance={startingBalance}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            startingBalance={startingBalance}
            setStartingBalance={setStartingBalance}
            geminiApiKey={geminiApiKey}
            setGeminiApiKey={setGeminiApiKey}
            supabaseUrl={supabaseUrl}
            setSupabaseUrl={setSupabaseUrl}
            supabaseKey={supabaseKey}
            setSupabaseKey={setSupabaseKey}
          />
        )}
      </main>

      {isPlanModalOpen && (
        <PlanModal
          plan={editingPlan}
          onSave={handleSavePlan}
          onClose={() => { setIsPlanModalOpen(false); setEditingPlan(null); }}
        />
      )}
    </div>
  );
}

function CashflowView({
  startingBalance,
  setStartingBalance,
  dailyProjections,
  safeToSpendToday,
  lowestProjectedBalance,
  projectionDays,
  setProjectionDays,
  cashflowPlans,
  onOpenAddPlan,
  onEditPlan,
  onDeletePlan
}) {
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
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Current Balance</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          {isBalanceEditing ? (
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                value={tempBalance}
                onChange={(e) => setTempBalance(e.target.value)}
                className="bg-slate-950 border border-emerald-500 rounded-lg px-2.5 py-1 text-lg font-bold text-white w-full focus:outline-none"
              />
              <button
                onClick={() => { setStartingBalance(Number(tempBalance)); setIsBalanceEditing(false); }}
                className="bg-emerald-500 text-slate-950 p-1.5 rounded-lg hover:bg-emerald-400"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl font-black text-white tracking-tight">{formatCurrency(startingBalance)}</div>
              <button
                onClick={() => { setTempBalance(startingBalance); setIsBalanceEditing(true); }}
                className="text-xs text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
          )}
          <p className="text-xs text-slate-500 mt-2">Available total across accounts</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 p-5 rounded-2xl relative overflow-hidden shadow-lg shadow-emerald-500/5">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Safe to Spend
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">Today</span>
          </div>
          <div className="text-2xl font-black text-emerald-400 tracking-tight mt-1">
            {formatCurrency(safeToSpendToday)}
          </div>
          <p className="text-xs text-slate-400 mt-2">After reserving upcoming fixed expenses</p>
        </div>

        <div className={`p-5 rounded-2xl border relative overflow-hidden ${
          lowestProjectedBalance < 0 
            ? 'bg-rose-950/30 border-rose-500/40 text-rose-200' 
            : 'bg-slate-900/80 border-slate-800 text-slate-200'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Lowest Point</span>
            <AlertTriangle className={`w-4 h-4 ${lowestProjectedBalance < 0 ? 'text-rose-400' : 'text-amber-400'}`} />
          </div>
          <div className={`text-2xl font-black tracking-tight mt-1 ${lowestProjectedBalance < 0 ? 'text-rose-400' : 'text-white'}`}>
            {formatCurrency(lowestProjectedBalance)}
          </div>
          <p className="text-xs text-slate-500 mt-2">Lowest projected balance in {projectionDays} days</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Projection Period</span>
            <Clock className="w-4 h-4 text-teal-400" />
          </div>
          <div className="grid grid-cols-4 gap-1.5 mt-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[30, 45, 60, 90].map(days => (
              <button
                key={days}
                onClick={() => setProjectionDays(days)}
                className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  projectionDays === days
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {days} d
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-500 mt-2 text-center">Shows forecast for next {projectionDays} days</span>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Daily Balance Projection ({projectionDays} Days)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Line chart forecasts cashflow using planned incomes, fixed bills, and logged items</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
              <span className="text-slate-300">Balance Trend</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-rose-500 inline-block"></span>
              <span className="text-slate-400">Zero Threshold</span>
            </div>
          </div>
        </div>

        <div className="h-56 w-full relative pt-4 pb-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="20" x2="100" y2="20" stroke="#334155" strokeDasharray="2,2" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeDasharray="2,2" strokeWidth="0.5" />
            <line x1="0" y1="80" x2="100" y2="80" stroke="#334155" strokeDasharray="2,2" strokeWidth="0.5" />

            {minBal < 0 && (
              <line
                x1="0"
                y1={100 - (((0 - minBal) / range) * 80 + 10)}
                x2="100"
                y2={100 - (((0 - minBal) / range) * 80 + 10)}
                stroke="#f43f5e"
                strokeWidth="1"
              />
            )}

            <defs>
              <linearGradient id="cashflowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <polygon points={`0,100 ${chartPoints} 100,100`} fill="url(#cashflowGrad)" />
            <polyline fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={chartPoints} />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col h-full">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white">Planned Income & Expenses</h4>
              <p className="text-xs text-slate-400">Recurring rules and obligations</p>
            </div>
            <button
              onClick={onOpenAddPlan}
              className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 p-2 rounded-xl transition-all flex items-center gap-1 text-xs font-semibold"
            >
              <Plus className="w-4 h-4" /> Add Plan
            </button>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-1">
            {cashflowPlans.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl p-4">
                <p className="text-xs text-slate-500">No planned items added yet.</p>
                <p className="text-[11px] text-slate-600 mt-1">Add salary or bills to project future cashflow.</p>
              </div>
            ) : (
              cashflowPlans.map(plan => {
                const category = CATEGORIES.find(c => c.id === plan.category) || CATEGORIES[7];
                return (
                  <div
                    key={plan.id}
                    className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl flex items-center justify-between group hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg p-2 rounded-lg bg-slate-900 border border-slate-800">
                        {category.icon}
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-slate-200">{plan.title}</h5>
                        <span className="text-[10px] text-slate-400">
                          {plan.frequency === 'Monthly' && `Day ${plan.dayOfMonth} of month`}
                          {plan.frequency === 'Weekly' && 'Weekly'}
                          {plan.frequency === 'Once' && `One-time: ${formatDate(plan.dueDate)}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className={`text-xs font-bold ${plan.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {plan.type === 'Income' ? '+' : '-'}{formatCurrency(plan.amount)}
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase">{plan.type}</span>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                        <button onClick={() => onEditPlan(plan)} className="text-slate-400 hover:text-white p-1">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => onDeletePlan(plan.id)} className="text-rose-400 hover:text-rose-300 p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-white">Daily Balance Table</h4>
              <p className="text-xs text-slate-400">Day-by-day projected cashflow detail</p>
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterType === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                All Days
              </button>
              <button
                onClick={() => setFilterType('bills')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterType === 'bills' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                Changes Only
              </button>
              <button
                onClick={() => setFilterType('low')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterType === 'low' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400'
                }`}
              >
                Low Balance
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                  <th className="p-3">Date</th>
                  <th className="p-3">Starting</th>
                  <th className="p-3 text-emerald-400">Planned Inc.</th>
                  <th className="p-3 text-rose-400">Planned Exp.</th>
                  <th className="p-3 text-right">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {filteredProjections.map((d) => (
                  <tr
                    key={d.date}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      d.isToday ? 'bg-emerald-500/10 border-l-2 border-emerald-500' : ''
                    }`}
                  >
                    <td className="p-3 font-semibold text-slate-200">
                      <div className="flex items-center gap-2">
                        <span>{d.displayDate}</span>
                        <span className="text-[10px] text-slate-500 font-normal">({d.dayName})</span>
                        {d.isToday && (
                          <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">
                            Today
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-slate-400">{formatCurrency(d.startingBalance)}</td>
                    <td className="p-3 text-emerald-400 font-medium">
                      {d.plannedIncomes > 0 ? `+${formatCurrency(d.plannedIncomes)}` : '-'}
                    </td>
                    <td className="p-3 text-rose-400 font-medium">
                      {d.plannedExpenses > 0 ? `-${formatCurrency(d.plannedExpenses)}` : '-'}
                    </td>
                    <td className="p-3 text-right font-bold">
                      <span className={d.endingBalance < 0 ? 'text-rose-400' : 'text-slate-100'}>
                        {formatCurrency(d.endingBalance)}
                      </span>
                    </td>
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

// NEW COMPONENT: SHOPPING LISTS & AI COST ESTIMATION
function ShoppingListsView({ geminiApiKey, shoppingLists, setShoppingLists, onAddTransaction }) {
  const [selectedCategory, setSelectedCategory] = useState('Foods');
  const [listTitle, setListTitle] = useState('');
  const [rawText, setRawText] = useState('');
  const [isEstimating, setIsEstimating] = useState(false);

  const categories = [
    { id: 'Foods', label: 'Foods & Groceries', icon: ShoppingBag, color: 'text-emerald-400' },
    { id: 'Tools', label: 'Tools & Hardware', icon: Wrench, color: 'text-amber-400' },
    { id: 'Car', label: 'Car Parts & Repair', icon: Car, color: 'text-blue-400' },
    { id: 'Project', label: 'Projects & Building', icon: Hammer, color: 'text-purple-400' },
    { id: 'Other', label: 'Other & Various', icon: Package, color: 'text-slate-400' }
  ];

  const handleEstimateCost = async (e) => {
    e.preventDefault();
    if (!rawText.trim() || !listTitle.trim()) return;

    if (!geminiApiKey) {
      alert('Please enter your Gemini API key in Settings first!');
      return;
    }

    setIsEstimating(true);

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;

      const systemPrompt = `You are an AI purchasing & market price estimation assistant for Serbia/Balkans.
        Analyze the following user shopping list under category '${selectedCategory}'.
        For each line item, estimate the current average retail price in Serbian Dinars (RSD).
        
        Respond strictly with JSON matching this structure:
        {
          "estimatedItems": [
            { "item": "string", "qty": "string", "estimatedPriceRSD": number }
          ],
          "totalEstimatedRSD": number,
          "summaryNote": "Short 1-sentence budget tip or summary in Serbian/English"
        }
        
        Shopping List Input:
        ${rawText}`;

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const data = await res.json();
      const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (responseText) {
        const parsed = JSON.parse(responseText);

        const newList = {
          id: 'list-' + Date.now(),
          title: listTitle,
          category: selectedCategory,
          rawText,
          estimatedItems: parsed.estimatedItems || [],
          totalEstimatedRSD: parsed.totalEstimatedRSD || 0,
          summaryNote: parsed.summaryNote || '',
          date: new Date().toISOString().split('T')[0]
        };

        setShoppingLists(prev => [newList, ...prev]);
        setListTitle('');
        setRawText('');
      } else {
        alert('Could not generate estimate. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error communicating with Gemini AI: ' + err.message);
    } finally {
      setIsEstimating(false);
    }
  };

  const handleDeleteList = (id) => {
    setShoppingLists(prev => prev.filter(l => l.id !== id));
  };

  const handleAddListToExpenses = (list) => {
    onAddTransaction({
      id: 'tx-' + Date.now(),
      title: `[List] ${list.title}`,
      amount: list.totalEstimatedRSD,
      type: 'Expense',
      category: list.category === 'Foods' ? 'Food' : list.category === 'Car' ? 'Transport' : 'Other',
      merchant: 'Planned Purchase',
      date: new Date().toISOString().split('T')[0]
    });
    alert(`List "${list.title}" added to cashflow as planned expense of ${formatCurrency(list.totalEstimatedRSD)}!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-400" />
          Shopping Lists & AI Cost Estimation
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Write a list for groceries, car parts, tools, or building projects. AI estimates market prices automatically.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form */}
        <div className="lg:col-span-1 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" /> Create New List
          </h4>

          <form onSubmit={handleEstimateCost} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase">Category</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${cat.color}`} />
                      <span>{cat.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase">List Title</label>
              <input
                type="text"
                placeholder="e.g. Maxi Weekly Shop, Astra H Service, YTONG Wall"
                required
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase">Items List (One per line)</label>
              <textarea
                rows={5}
                placeholder="Write items here, e.g.:&#10;2x Coca-Cola 1.5L&#10;1kg Chicken Breast&#10;10x YTONG blocks 12cm"
                required
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-white focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isEstimating}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {isEstimating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isEstimating ? 'Estimating Prices...' : 'Estimate Cost with AI'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Saved Lists & Estimates */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center justify-between">
            <span>Saved Lists & Estimates ({shoppingLists.length})</span>
          </h4>

          {shoppingLists.length === 0 ? (
            <div className="bg-slate-900/80 p-12 rounded-2xl border border-dashed border-slate-800 text-center text-slate-500 text-xs">
              No shopping lists created yet. Write a list on the left and click "Estimate Cost with AI" to calculate market costs!
            </div>
          ) : (
            shoppingLists.map(list => (
              <div key={list.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                      {list.category}
                    </span>
                    <h5 className="font-bold text-white text-sm">{list.title}</h5>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-emerald-400 text-base font-mono">
                      ~{formatCurrency(list.totalEstimatedRSD)}
                    </span>
                    <button onClick={() => handleDeleteList(list.id)} className="text-slate-600 hover:text-rose-400 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {list.summaryNote && (
                  <p className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 italic">
                    💡 {list.summaryNote}
                  </p>
                )}

                {/* Items Breakdown Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-950 text-slate-500 border-b border-slate-800 uppercase text-[10px]">
                        <th className="p-2.5">Item</th>
                        <th className="p-2.5">Qty</th>
                        <th className="p-2.5 text-right">Est. Price (RSD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 font-mono">
                      {list.estimatedItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30">
                          <td className="p-2.5 text-slate-200 font-sans">{item.item}</td>
                          <td className="p-2.5 text-slate-400">{item.qty || '1'}</td>
                          <td className="p-2.5 text-right text-emerald-400 font-bold">{formatCurrency(item.estimatedPriceRSD)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => handleAddListToExpenses(list)}
                    className="bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add to Cashflow
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function DailyEntryView({ geminiApiKey, onAddTransaction, transactions, onDeleteTransaction }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'Expense',
    category: 'Food',
    merchant: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [isScanning, setIsScanning] = useState(false);
  const [ocrError, setOcrError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    onAddTransaction({
      id: 'tx-' + Date.now(),
      title: formData.title,
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      merchant: formData.merchant || 'General Merchant',
      date: formData.date,
      items: formData.items || []
    });

    setFormData({
      title: '',
      amount: '',
      type: 'Expense',
      category: 'Food',
      merchant: '',
      date: new Date().toISOString().split('T')[0],
      items: []
    });
    setSelectedFiles([]);
  };

  const handleReceiptScan = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    if (!geminiApiKey) {
      setOcrError('Please enter a valid Gemini API Key in Settings to enable receipt AI reading.');
      return;
    }

    setIsScanning(true);
    setOcrError('');

    try {
      const imageParts = await Promise.all(
        selectedFiles.map(file => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve({
              inlineData: {
                data: reader.result.split(',')[1],
                mimeType: file.type || 'image/jpeg'
              }
            });
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        })
      );

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;

      const systemPrompt = `Analyze these receipt images (Note: They might be multiple parts of the SAME receipt).
        Extract and return JSON with keys:
        - pfrNumber (string or null, extract the unique Serbian fiscal PFR number if present)
        - amount (number in numeric format)
        - merchant (string, store name e.g., Maxi, Lidl, Tempo)
        - date (string in YYYY-MM-DD format)
        - category (choose exactly one: 'Food', 'Utilities', 'Transport', 'Housing', 'Entertainment', 'Health', 'Other')
        - title (short concise description in English)
        - items (array of items with keys: "name", "quantity", "price", "unit")`;

      const payload = {
        contents: [{
          role: 'user',
          parts: [
            { text: systemPrompt },
            ...imageParts
          ]
        }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      };

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (responseText) {
        const parsed = JSON.parse(responseText);

        if (parsed.pfrNumber && transactions.some(t => t.pfrNumber === parsed.pfrNumber)) {
          setOcrError(`Duplicate receipt detected! Receipt with PFR #${parsed.pfrNumber} is already logged.`);
          setIsScanning(false);
          return;
        }

        setFormData({
          title: parsed.title || 'Receipt Purchase',
          amount: parsed.amount || '',
          type: 'Expense',
          category: parsed.category || 'Food',
          merchant: parsed.merchant || '',
          date: parsed.date || new Date().toISOString().split('T')[0],
          pfrNumber: parsed.pfrNumber || null,
          items: parsed.items || []
        });
      } else {
        setOcrError('Could not extract data from the receipt image. Please try again.');
      }
    } catch (err) {
      console.error('Gemini OCR Error:', err);
      setOcrError('Error calling Gemini AI. Please verify your API Key in Settings.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Multi-Part Receipt AI Reader</h3>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">Anti-Duplicate</span>
          </div>

          <p className="text-xs text-slate-400">
            Snap 1 to 3 images of long receipts. AI stitches them together, extracts items, and guards against duplicate PFR entries.
          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 bg-slate-950/60 rounded-xl p-6 text-center cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-12 h-12 rounded-full bg-slate-900 group-hover:bg-emerald-500/20 flex items-center justify-center mx-auto transition-colors">
              <Camera className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-xs font-semibold text-slate-300">
              {selectedFiles.length > 0 ? `${selectedFiles.length} Photo(s) Selected` : 'Snap or Upload Receipts'}
            </div>
            <p className="text-[10px] text-slate-500">Supports multi-part photos for long receipts</p>
          </div>

          {selectedFiles.length > 0 && (
            <button
              type="button"
              onClick={handleReceiptScan}
              disabled={isScanning}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Layers className="w-4 h-4" />}
              <span>{isScanning ? 'Analyzing Receipts...' : 'Process Selected Photos'}</span>
            </button>
          )}

          {ocrError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{ocrError}</span>
            </div>
          )}
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            Manual Entry
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase">Transaction Type</label>
              <div className="grid grid-cols-2 gap-2 mt-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'Expense' })}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    formData.type === 'Expense' ? 'bg-rose-500 text-white' : 'text-slate-400'
                  }`}
                >
                  Expense (-)
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'Income' })}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    formData.type === 'Income' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  Income (+)
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase">Amount</label>
              <input
                type="number"
                placeholder="e.g. 45"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase">Title / Description</label>
              <input
                type="text"
                placeholder="e.g. Weekly Groceries"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase">Merchant / Client</label>
              <input
                type="text"
                placeholder="e.g. Maxi, Lidl, Shell"
                value={formData.merchant}
                onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-xs uppercase tracking-wider mt-2"
            >
              Add Transaction
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Transaction Log</h3>
            <p className="text-xs text-slate-400">History of scanned and entered records</p>
          </div>
          <span className="text-xs bg-slate-950 px-3 py-1 rounded-full border border-slate-800 text-slate-400 font-semibold">
            Total Records: {transactions.length}
          </span>
        </div>

        <div className="space-y-2.5 overflow-y-auto max-h-[600px] pr-1">
          {transactions.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
              No transactions recorded yet. Add an entry or scan a receipt above.
            </div>
          ) : (
            transactions.map(t => {
              const cat = CATEGORIES.find(c => c.id === t.category) || CATEGORIES[7];
              return (
                <div
                  key={t.id}
                  className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-xl flex items-center justify-between hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      {cat.icon}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{t.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span>{t.merchant}</span>
                        <span>•</span>
                        <span>{formatDate(t.date)}</span>
                        {t.pfrNumber && <span className="font-mono bg-slate-800 px-1 rounded">PFR: {t.pfrNumber}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`text-sm font-extrabold ${t.type === 'Income' ? 'text-emerald-400' : 'text-slate-100'}`}>
                        {t.type === 'Income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${cat.color}`}>
                        {cat.label}
                      </span>
                    </div>

                    <button
                      onClick={() => onDeleteTransaction(t.id)}
                      className="text-slate-600 hover:text-rose-400 p-1.5 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function GroceryTrackerView({ transactions }) {
  const [searchTerm, setSearchTerm] = useState('');

  const groceryItems = useMemo(() => {
    const itemMap = {};
    transactions.forEach(tx => {
      if (tx.items && Array.isArray(tx.items)) {
        tx.items.forEach(item => {
          const key = item.name?.toLowerCase().trim() || 'item';
          if (!itemMap[key]) {
            itemMap[key] = { name: item.name, totalQty: 0, totalSpent: 0, count: 0, unit: item.unit || 'pcs' };
          }
          itemMap[key].totalQty += Number(item.quantity || 1);
          itemMap[key].totalSpent += Number(item.price || 0) * Number(item.quantity || 1);
          itemMap[key].count += 1;
        });
      }
    });
    return Object.values(itemMap).filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [transactions, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              Smart Grocery & Item Analytics
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Track exact item quantities (soda, bread, meat) across receipts</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search item (e.g. Coca-Cola)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groceryItems.length === 0 ? (
          <div className="col-span-full bg-slate-900/80 p-12 rounded-2xl border border-dashed border-slate-800 text-center text-slate-500 text-xs">
            No item-level data extracted yet. Scan detailed grocery receipts in OCR view to automatically track items!
          </div>
        ) : (
          groceryItems.map((item, idx) => (
            <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-200 text-xs capitalize">{item.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Logged in {item.count} receipt(s)</p>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-emerald-400 font-mono text-sm">{item.totalQty} {item.unit}</p>
                <p className="text-[10px] text-slate-400 font-mono">{formatCurrency(item.totalSpent)} total</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AnalyticsView({ transactions }) {
  const categoryTotals = useMemo(() => {
    const totals = {};
    CATEGORIES.forEach(c => { totals[c.id] = 0; });

    transactions.forEach(t => {
      if (t.type === 'Expense') {
        totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
      }
    });
    return totals;
  }, [transactions]);

  const totalExpenseSum = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-emerald-400" />
            Expense Breakdown by Category
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Distribution of actual recorded expenses</p>
        </div>

        {totalExpenseSum === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
            No expenses recorded yet. Scan receipts or add transactions to view analytics.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATEGORIES.map(cat => {
              const amount = categoryTotals[cat.id] || 0;
              const percentage = totalExpenseSum > 0 ? Math.round((amount / totalExpenseSum) * 100) : 0;

              return (
                <div key={cat.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200 flex items-center gap-2">
                      <span>{cat.icon}</span> {cat.label}
                    </span>
                    <span className="font-extrabold text-white">{formatCurrency(amount)}</span>
                  </div>

                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="text-[10px] text-slate-500 text-right font-semibold">
                    {percentage}% of total expenses
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsView({
  startingBalance,
  setStartingBalance,
  geminiApiKey,
  setGeminiApiKey,
  supabaseUrl,
  setSupabaseUrl,
  supabaseKey,
  setSupabaseKey
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          Starting Balance
        </h3>
        <p className="text-xs text-slate-400">
          Set your current available starting balance across all accounts.
        </p>

        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase font-mono">Starting Balance (RSD)</label>
          <input
            type="number"
            value={startingBalance}
            onChange={(e) => setStartingBalance(Number(e.target.value))}
            placeholder="0"
            className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none font-mono"
          />
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          Gemini API Key (Receipt Reader & List Cost Estimator)
        </h3>
        <p className="text-xs text-slate-400">
          Enter your Gemini API key from Google AI Studio to enable automatic receipt reading and AI shopping list cost estimation.
        </p>

        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase">Gemini API Key</label>
          <input
            type="password"
            value={geminiApiKey}
            onChange={(e) => setGeminiApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none font-mono"
          />
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          Supabase Sync (Optional Cloud Storage)
        </h3>
        <p className="text-xs text-slate-400">
          Connect your Supabase PostgreSQL project to sync data in real time across multiple mobile devices.
        </p>

        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase">Supabase URL</label>
            <input
              type="text"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              placeholder="https://xyz.supabase.co"
              className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase">Supabase Anon Key</label>
            <input
              type="password"
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
              placeholder="eyJhbGciOi..."
              className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanModal({ plan, onSave, onClose }) {
  const [formData, setFormData] = useState(plan || {
    title: '',
    amount: '',
    type: 'Expense',
    category: 'Utilities',
    frequency: 'Monthly',
    dayOfMonth: 15,
    dayOfWeek: 1,
    isActive: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    onSave({
      ...formData,
      amount: Number(formData.amount),
      dayOfMonth: Number(formData.dayOfMonth)
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">
            {plan ? 'Edit Planned Item' : 'New Planned Income / Expense'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase">Type</label>
            <div className="grid grid-cols-2 gap-2 mt-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'Expense' })}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                  formData.type === 'Expense' ? 'bg-rose-500 text-white' : 'text-slate-400'
                }`}
              >
                Fixed Expense (-)
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'Income' })}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                  formData.type === 'Income' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Fixed Income (+)
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase">Plan Title</label>
            <input
              type="text"
              placeholder="e.g. Salary, Rent, Electricity Bill"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase">Amount (RSD)</label>
            <input
              type="number"
              placeholder="e.g. 12000"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase">Frequency</label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              >
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>

            {formData.frequency === 'Monthly' && (
              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase">Day of Month</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={formData.dayOfMonth}
                  onChange={(e) => setFormData({ ...formData, dayOfMonth: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-wider mt-2"
          >
            Save Plan
          </button>
        </form>
      </div>
    </div>
  );
}
