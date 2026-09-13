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
  Gift,
  Target,
  Heart,
  CheckCircle2,
  Menu,
  UserPlus,
  Users,
  Copy,
  HeartHandshake,
  Share2,
  UserCheck,
  Bell,
  BellRing,
  Smile,
  Info,
  User,
  LogOut,
  LogIn,
  KeyRound,
  AtSign,
  UserCircle,
  CalendarDays,
  QrCode // <
} from 'lucide-react';

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// force fresh preview build
const WORLD_CURRENCIES = [
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'RSD' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark', symbol: 'KM' },
  { code: 'MKD', name: 'Macedonian Denar', symbol: 'den' },
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

const FINANCIAL_FUN_FACTS = [
  "💡 Fun Fact: The word 'bankrupt' comes from the Italian 'banca rotta', meaning 'broken bench' — because when a Renaissance banker ran out of money, authorities literally smashed his bench!",
  "💡 Fun Fact: Monopoly prints more money every year than the US Bureau of Engraving and Printing does for real currency!",
  "💡 Fun Fact: Pigs were chosen as piggy banks because 'pygg' was an old English word for a cheap orange clay used to make jars. Potteries started shaping them like actual pigs!",
  "💡 Fun Fact: In 1913, the entire US Income Tax form was just a single page long!",
  "💡 Fun Fact: The credit card was invented in 1949 because Frank McNamara forgot his wallet while dining at a restaurant in New York City!",
  "💡 Fun Fact: Isaac Newton lost today's equivalent of over $4 million in the South Sea Bubble stock crash and remarked: 'I can calculate the motion of heavenly bodies, but not the madness of people.'",
  "💡 Fun Fact: The paper used for US currency isn't paper at all — it's a blend of 75% cotton and 25% linen!",
  "💡 Fun Fact: Apple makes enough money every 8 minutes to buy a brand new Ferrari!"
];

const THEMES = {
  'electric-blue': {
    name: 'Electric Blue',
    btnPrimary: 'bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold',
    textAccent: 'text-blue-400',
    borderAccent: 'border-blue-500/40',
    bgAccent: 'bg-blue-500/10',
    chartColor: '#3b82f6',
    bgGlow: 'from-blue-950/40',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-800/80'
  },
  'emerald-green': {
    name: 'Emerald Green',
    btnPrimary: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold',
    textAccent: 'text-emerald-400',
    borderAccent: 'border-emerald-500/40',
    bgAccent: 'bg-emerald-500/10',
    chartColor: '#10b981',
    bgGlow: 'from-emerald-950/40',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-800/80'
  },
  'ruby-red': {
    name: 'Ruby Red',
    btnPrimary: 'bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold',
    textAccent: 'text-rose-400',
    borderAccent: 'border-rose-500/40',
    bgAccent: 'bg-rose-500/10',
    chartColor: '#f43f5e',
    bgGlow: 'from-rose-950/40',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-800/80'
  },
  'sky-blue': {
    name: 'Sky Blue',
    btnPrimary: 'bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold',
    textAccent: 'text-sky-400',
    borderAccent: 'border-sky-400/40',
    bgAccent: 'bg-sky-400/10',
    chartColor: '#38bdf8',
    bgGlow: 'from-sky-950/40',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-800/80'
  },
  'amber-gold': {
    name: 'Amber Gold',
    btnPrimary: 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold',
    textAccent: 'text-amber-400',
    borderAccent: 'border-amber-400/40',
    bgAccent: 'bg-amber-400/10',
    chartColor: '#fbbf24',
    bgGlow: 'from-amber-950/40',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-800/80'
  },
  'pure-black': {
    name: 'Pure Onyx',
    btnPrimary: 'bg-slate-100 hover:bg-white text-slate-950 font-bold',
    textAccent: 'text-slate-100',
    borderAccent: 'border-slate-700',
    bgAccent: 'bg-slate-800/60',
    chartColor: '#f8fafc',
    bgGlow: 'from-slate-900',
    cardBg: 'bg-black/90',
    cardBorder: 'border-slate-800'
  },
  'light-mode': {
    name: 'Light Clean',
    btnPrimary: 'bg-slate-900 hover:bg-slate-800 text-white font-bold',
    textAccent: 'text-slate-900',
    borderAccent: 'border-slate-300',
    bgAccent: 'bg-slate-200/80',
    chartColor: '#0f172a',
    bgGlow: 'from-slate-200',
    cardBg: 'bg-white/90',
    cardBorder: 'border-slate-200'
  }
};

const BACKGROUND_LIGHTING = {
  'smooth-blue-fade': {
    name: 'Smooth Midnight Blue Fade',
    bgClass: 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950'
  },
  'deep-ocean-fade': {
    name: 'Deep Ocean Blue Fade',
    bgClass: 'bg-gradient-to-b from-blue-950/90 via-slate-950 to-slate-950'
  },
  'emerald-aura-fade': {
    name: 'Emerald Aura Fade',
    bgClass: 'bg-gradient-to-b from-emerald-950/80 via-slate-950 to-slate-950'
  },
  'onyx-dark': {
    name: 'Onyx Dark Solid',
    bgClass: 'bg-slate-950'
  },
  'light-clean': {
    name: 'Light Ambient',
    bgClass: 'bg-gradient-to-b from-slate-100 to-slate-200'
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
};

function localDate() {
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-');
}

function moneyMinor(value, currency) {
  const digits = currency === 'JPY' ? 0 : 2;
  const text = String(value).trim();
  if (!/^-?\d+(\.\d+)?$/.test(text)) throw new Error('Enter a valid money amount.');
  const [whole, fraction = ''] = text.replace('-', '').split('.');
  if (fraction.length > digits && /[1-9]/.test(fraction.slice(digits))) throw new Error('Too many decimal places for this currency.');
  const minor = BigInt(whole) * (10n ** BigInt(digits)) + BigInt((fraction.slice(0,digits).padEnd(digits,'0')) || '0');
  const signed = text.startsWith('-') ? -minor : minor;
  if (signed > 900000000000000n || signed < -900000000000000n) throw new Error('Amount exceeds the supported range.');
  return signed;
}

function accountBalance(account, transactions, today) {
  if (!account) return 0;
  let total = moneyMinor(account.opening_balance, account.currency);
  for (const tx of transactions) {
    if (tx.accountId === account.id && tx.date >= account.opening_date && tx.date <= today) {
      const amount = moneyMinor(tx.amount, account.currency);
      total += tx.type === 'Income' ? amount : -amount;
    }
  }
  if (total > BigInt(Number.MAX_SAFE_INTEGER) || total < BigInt(Number.MIN_SAFE_INTEGER)) throw new Error('Balance exceeds the supported range.');
  return Number(total) / (account.currency === 'JPY' ? 1 : 100);
}

function transactionFromRow(row) {
  return { id: row.id, accountId: row.account_id, title: row.title, amount: Number(row.amount),
    type: row.transaction_type, category: row.category,
    date: row.transaction_date, merchant: row.merchant_name };
}

export default function App() {
  const [activeTab, setActiveTab] = useState('cashflow');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  // User Profile State (Email + Password + Nickname)
  const [userProfile, setUserProfile] = useState({ loggedIn: false, email: '', nickname: '', userId: '' });

  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('fb_theme') || 'electric-blue');
  const theme = THEMES[currentTheme] || THEMES['electric-blue'];

  const [currentBg, setCurrentBg] = useState(() => localStorage.getItem('fb_bg_style') || 'smooth-blue-fade');
  const bgStyle = BACKGROUND_LIGHTING[currentBg] || BACKGROUND_LIGHTING['smooth-blue-fade'];

  const [selectedCurrency, setSelectedCurrency] = useState(() => localStorage.getItem('fb_currency') || 'RSD');

  const formatCurrency = (val) => {
    const curr = WORLD_CURRENCIES.find(c => c.code === selectedCurrency) || WORLD_CURRENCIES[0];
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: selectedCurrency === 'JPY' ? 0 : 2 }).format(val || 0) + ' ' + curr.symbol;
  };

  const [financialAccount, setFinancialAccount] = useState(null);
  const [accountLoading, setAccountLoading] = useState(false);
  const [accountError, setAccountError] = useState('');
  const [accountReload, setAccountReload] = useState(0);

  // Legacy browser records are preserved for an explicit import, never auto-loaded.
  const [transactions, setTransactions] = useState([]);
  const [transactionError, setTransactionError] = useState('');
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionReload, setTransactionReload] = useState(0);
  const sessionIdentity = useRef({ userId: null, generation: 0 });
  const transactionRevision = useRef(0);
  const transactionBusy = useRef(false);

  const [cashflowPlans, setCashflowPlans] = useState(() => {
    const saved = localStorage.getItem('sb_cashflow_plans');
    return saved ? JSON.parse(saved) : [];
  });

  const [shoppingLists, setShoppingLists] = useState([]);
  const [shoppingLoading, setShoppingLoading] = useState(false);
  const [shoppingError, setShoppingError] = useState('');
  const [shoppingReload, setShoppingReload] = useState(0);
  const [shoppingUserId, setShoppingUserId] = useState(null);

  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('sb_wishlist_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [household, setHousehold] = useState(() => {
    const saved = localStorage.getItem('sb_household');
    if (saved) return JSON.parse(saved);
    const randomCode = 'SB-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    return { householdId: randomCode, partnerName: '', partnerEmail: '', isConnected: false };
  });

  const [pushEnabled, setPushEnabled] = useState(() => {
    return localStorage.getItem('sb_push_enabled') === 'true';
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sb_notifications_list');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Welcome to Stashly!', body: 'Notifications activated for bill alerts and cashflow warnings.', date: 'Just now', type: 'info', unread: true }
    ];
  });

  const [currentFunFactBanner, setCurrentFunFactBanner] = useState(null);
  const [projectionDays, setProjectionDays] = useState(45);
  
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('sb_gemini_key') || '';
  });

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => { localStorage.setItem('fb_theme', currentTheme); }, [currentTheme]);
  useEffect(() => { localStorage.setItem('fb_bg_style', currentBg); }, [currentBg]);
  useEffect(() => { localStorage.setItem('fb_currency', selectedCurrency); }, [selectedCurrency]);
  useEffect(() => { localStorage.setItem('sb_cashflow_plans', JSON.stringify(cashflowPlans)); }, [cashflowPlans]);
  useEffect(() => { localStorage.setItem('sb_wishlist_items', JSON.stringify(wishlistItems)); }, [wishlistItems]);
  useEffect(() => { localStorage.setItem('sb_household', JSON.stringify(household)); }, [household]);
  useEffect(() => { localStorage.setItem('sb_gemini_key', geminiApiKey); }, [geminiApiKey]);
  useEffect(() => { localStorage.setItem('sb_push_enabled', pushEnabled ? 'true' : 'false'); }, [pushEnabled]);
  useEffect(() => { localStorage.setItem('sb_notifications_list', JSON.stringify(notifications)); }, [notifications]);

  useEffect(() => {
    let disposed = false;
    let authEventReceived = false;
    const applySession = (session) => {
      if (disposed) return;
      const user = session?.user;
      const userId = user?.id || null;
      if (sessionIdentity.current.userId !== userId) {
        sessionIdentity.current = { userId, generation: sessionIdentity.current.generation + 1 };
        transactionRevision.current += 1;
        setTransactions([]);
        setFinancialAccount(null);
        setAccountError('');
        setTransactionError('');
        setShoppingLists([]);
      }
      setShoppingUserId(userId);
      setUserProfile(user ? {
        loggedIn: true, email: user.email || '',
        nickname: user.user_metadata?.nickname || user.email?.split('@')[0] || '',
        userId
      } : { loggedIn: false, email: '', nickname: '', userId: '' });
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      authEventReceived = true;
      applySession(session);
    });
    supabase.auth.getSession().then(({ data, error }) => {
      if (!authEventReceived) applySession(error ? null : data?.session);
    }).catch(() => { if (!authEventReceived) applySession(null); });
    return () => { disposed = true; subscription.unsubscribe(); };
  }, []);

  // Load grocery lists only after Supabase confirms the active session.
  useEffect(() => {
    let cancelled = false;
    setShoppingLists([]);
    setShoppingLoading(!!shoppingUserId);
    setShoppingError('');
    if (!shoppingUserId) return;

    const identity = sessionIdentity.current;
    const isCurrent = () => !cancelled && sessionIdentity.current === identity;
    const loadShoppingLists = async () => {
      try {
        const lists = await loadSavedGroceries(supabase, shoppingUserId, isCurrent);
        if (lists && isCurrent()) setShoppingLists(lists);
      } catch (error) {
        if (isCurrent()) setShoppingError(error.message || 'Could not load grocery lists.');
      } finally {
        if (isCurrent()) setShoppingLoading(false);
      }
    };

    loadShoppingLists();
    return () => { cancelled = true; };
  }, [shoppingUserId, shoppingReload]);

  useEffect(() => {
    let cancelled = false;
    const identity = sessionIdentity.current;
    const revision = transactionRevision.current;
    const isCurrent = () => !cancelled && sessionIdentity.current === identity && transactionRevision.current === revision;
    setTransactionsLoading(!!shoppingUserId);
    setTransactionError('');
    if (!shoppingUserId) { setTransactions([]); return; }

    const loadTransactions = async () => {
      try {
        const rows = [];
        // Supabase caps each response; page so older transactions remain included.
        for (let offset = 0; ; offset += 500) {
          const { data, error } = await supabase.from('transactions')
            .select('id, account_id, title, amount, transaction_type, category, transaction_date, merchant_name')
            .eq('user_id', shoppingUserId)
            .order('transaction_date', { ascending: false }).order('id', { ascending: false })
            .range(offset, offset + 499);
          if (error) throw error;
          if (!isCurrent()) return;
          rows.push(...(data || []));
          if (!data || data.length < 500) break;
        }
        if (isCurrent()) setTransactions(rows.map(transactionFromRow));
      } catch (error) {
        if (isCurrent()) setTransactionError('Could not load transactions: ' + error.message);
      } finally {
        if (isCurrent()) setTransactionsLoading(false);
      }
    };
    loadTransactions();
    return () => { cancelled = true; };
  }, [shoppingUserId, transactionReload]);

  useEffect(() => {
    let cancelled = false;
    const identity = sessionIdentity.current;
    setAccountLoading(!!shoppingUserId); setAccountError('');
    if (!shoppingUserId) { setFinancialAccount(null); return; }
    supabase.from('financial_accounts').select().eq('owner_user_id', shoppingUserId).maybeSingle()
      .then(({ data, error }) => {
        if (cancelled || sessionIdentity.current !== identity) return;
        if (error) { setAccountError(error.message); return; }
        setFinancialAccount(data);
        if (data) setSelectedCurrency(data.currency);
      }).catch(error => { if (!cancelled && sessionIdentity.current === identity) setAccountError(error.message); })
      .finally(() => { if (!cancelled && sessionIdentity.current === identity) setAccountLoading(false); });
    return () => { cancelled = true; };
  }, [shoppingUserId, accountReload]);

  const balanceResult = useMemo(() => {
    try { return { amount: accountBalance(financialAccount, transactions, localDate()), error: '' }; }
    catch (error) { return { amount: 0, error: error.message }; }
  }, [financialAccount, transactions]);
  const startingBalance = balanceResult.amount;
  const setStartingBalance = () => alert('Balance is calculated from your saved opening balance and transactions.');

  const handleCreateAccount = async (draft) => {
    const identity = sessionIdentity.current;
    if (!identity.userId) throw new Error('Sign in first.');
    moneyMinor(draft.opening_balance, draft.currency);
    if (!draft.name.trim() || !draft.opening_date || draft.opening_date > localDate()) throw new Error('Enter an account name and an opening date no later than today.');
    const { data, error } = await supabase.from('financial_accounts')
      .insert({ ...draft, owner_user_id: identity.userId }).select().single();
    if (error) { if (error.code === '23505') setAccountReload(n => n + 1); throw error; }
    if (sessionIdentity.current !== identity) throw new Error('Your account changed.');
    setFinancialAccount(data); setSelectedCurrency(data.currency);
  };

  const handleAssignLegacy = async () => {
    const identity = sessionIdentity.current;
    if (!financialAccount || transactionBusy.current) return;
    transactionBusy.current = true;
    try {
      const { error } = await supabase.from('transactions').update({ account_id: financialAccount.id })
        .eq('user_id', identity.userId).is('account_id', null);
      if (error) throw error;
      if (sessionIdentity.current === identity) setTransactionReload(n => n + 1);
    } catch (error) { if (sessionIdentity.current === identity) setTransactionError(error.message); }
    finally { transactionBusy.current = false; }
  };

  const pushNotification = (title, body, type = 'info') => {
    const greetingName = userProfile.nickname ? `, ${userProfile.nickname}` : '';
    const personalizedTitle = title.includes(userProfile.nickname) ? title : `${title}${greetingName}`;
    const newNotif = { id: 'notif-' + Date.now(), title: personalizedTitle, body, date: 'Just now', type, unread: true };
    setNotifications(prev => [newNotif, ...prev]);

    if (pushEnabled && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(personalizedTitle, { body, icon: '/favicon.ico' });
      } catch (err) {
        console.error('Push delivery error:', err);
      }
    }
  };

  const showRandomFunFact = () => {
    const randomFact = FINANCIAL_FUN_FACTS[Math.floor(Math.random() * FINANCIAL_FUN_FACTS.length)];
    setCurrentFunFactBanner(randomFact);
    pushNotification('💡 Financial Fun Fact!', randomFact, 'fact');
  };

  useEffect(() => {
    const lastFactTime = localStorage.getItem('sb_last_fact_time');
    const now = Date.now();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;

    if (!lastFactTime || (now - Number(lastFactTime)) >= threeDaysMs) {
      const timer = setTimeout(() => {
        showRandomFunFact();
        localStorage.setItem('sb_last_fact_time', now.toString());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const requestBrowserPushPermission = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        setPushEnabled(true);
        const nameGreeting = userProfile.nickname ? ` ${userProfile.nickname}` : '';
        pushNotification(`Web Push Activated!`, `Hey${nameGreeting}, you will now receive bill alerts, low-balance warnings, and partner updates on your device.`);
      } else {
        alert('Notification permission was blocked or dismissed. Please enable notifications in your browser settings.');
      }
    } else {
      alert('Your current browser does not support native Web Push Notifications.');
    }
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
      const dateStr = [targetDate.getFullYear(), String(targetDate.getMonth()+1).padStart(2,'0'), String(targetDate.getDate()).padStart(2,'0')].join('-');
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

  const writeTransaction = async (operation, draft) => {
    if (transactionBusy.current) return false;
    const identity = sessionIdentity.current;
    if (!identity.userId) { setTransactionError('Sign in to save transactions.'); return false; }
    if (!financialAccount || accountLoading) { setTransactionError('Set up your financial account before saving transactions.'); return false; }
    if (transactionsLoading) { setTransactionError('Wait for your saved transactions to finish loading.'); return false; }
    transactionBusy.current = true;
    transactionRevision.current += 1;
    setTransactionError('');
    try {
      const { data: auth, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!auth?.user || auth.user.id !== identity.userId || sessionIdentity.current !== identity) {
        throw new Error('Your account changed. Please try again.');
      }
      let result;
      if (operation === 'delete') {
        result = await supabase.from('transactions').delete()
          .eq('id', draft.id).eq('user_id', identity.userId).select('id').single();
      } else {
        moneyMinor(draft.amount, financialAccount.currency);
        const amount = Number(draft.amount);
        if (!draft.title?.trim() || !Number.isFinite(amount) || amount <= 0) throw new Error('Enter a title and an amount greater than zero.');
        if (!['Income', 'Expense'].includes(draft.type)) throw new Error('Choose Income or Expense.');
        if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date || '') || !Number.isFinite(Date.parse(draft.date)) || new Date(draft.date).toISOString().slice(0,10) !== draft.date) throw new Error('Enter a valid date.');
        if (draft.date > localDate()) throw new Error('Future expenses belong in planning, not actual transactions.');
        const row = { account_id: financialAccount.id, title: draft.title.trim(), amount, transaction_type: draft.type,
          category: draft.category || 'Other', transaction_date: draft.date,
          merchant_name: draft.merchant?.trim() || 'General Merchant' };
        if (draft.items?.length) throw new Error('Receipt item saving is not ready yet. Enter the confirmed total manually for now.');
        if (operation === 'update') {
          result = await supabase.from('transactions').update(row)
            .eq('id', draft.id).eq('user_id', identity.userId).select().single();
        } else {
          result = await supabase.from('transactions').insert({ ...row, id: draft.id, user_id: identity.userId }).select().single();
          // A lost response may follow a successful insert. Retry the same UUID.
          if (result.error?.code === '23505') {
            result = await supabase.from('transactions').select().eq('id', draft.id).eq('user_id', identity.userId).single();
            if (!result.error && Object.entries(row).some(([key,value]) => key === 'amount' ? Number(result.data[key]) !== value : result.data[key] !== value)) {
              throw new Error('This transaction was already saved with different values. Reload and edit the saved entry.');
            }
          }
        }
      }
      if (result.error) throw result.error;
      if (!result.data) throw new Error('The database did not confirm this change.');
      if (sessionIdentity.current !== identity) return false;
      if (operation === 'delete') setTransactions(prev => prev.filter(t => t.id !== draft.id));
      else {
        const saved = transactionFromRow(result.data);
        setTransactions(prev => [saved, ...prev.filter(t => t.id !== saved.id)]
          .sort((a,b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)));
      }
      return true;
    } catch (error) {
      if (sessionIdentity.current === identity) setTransactionError('Transaction change failed: ' + error.message);
      return false;
    } finally {
      transactionBusy.current = false;
    }
  };

  const handleAddTransaction = (draft) => writeTransaction('create', draft);
  const handleUpdateTransaction = (draft) => writeTransaction('update', draft);
  const handleDeleteTransaction = (id) => writeTransaction('delete', { id });

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

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
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

  const currentTabObj = navItems.find(n => n.id === activeTab) || navItems[0];

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-500 ${currentTheme === 'light-mode' ? 'bg-slate-100 text-slate-900' : `${bgStyle.bgClass} text-slate-100`}`}>
      
      {currentFunFactBanner && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 border-b border-indigo-500/30 px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 max-w-5xl mx-auto">
            <Smile className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-purple-100 leading-tight">{currentFunFactBanner}</span>
          </div>
          <button onClick={() => setCurrentFunFactBanner(null)} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 py-3.5 sm:px-6 ${currentTheme === 'light-mode' ? 'bg-white/90 border-slate-200' : 'bg-slate-900/80 border-slate-800/80'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-105 ${theme.btnPrimary}`}>
              <TrendingUp className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                STASHLY.COM
              </h1>
              <p className="text-[11px] opacity-60 font-semibold tracking-wide">
                {userProfile.loggedIn && userProfile.nickname ? `Welcome back, ${userProfile.nickname}!` : 'Smart Cashflow & Shared Vault'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold ${theme.textAccent} ${theme.borderAccent} ${theme.bgAccent}`}>
              <ShieldCheck className="w-4 h-4" />
              <span>Safe: {formatCurrency(safeToSpendToday)}</span>
            </div>

            {/* User Account / Nickname Badge Button */}
            <button
              onClick={() => setShowAuthModal(true)}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                userProfile.loggedIn
                  ? 'bg-slate-900 border-slate-700 text-slate-100 hover:border-slate-500'
                  : `${theme.btnPrimary}`
              }`}
              title="Account & Nickname Settings"
            >
              <UserCircle className="w-5 h-5" />
              <span className="hidden sm:inline">
                {userProfile.loggedIn ? userProfile.nickname || 'My Account' : 'Sign In / Register'}
              </span>
            </button>

            <button
              onClick={() => { setShowNotificationCenter(!showNotificationCenter); markAllNotificationsRead(); }}
              className="relative p-2.5 rounded-xl border bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-800 transition-all"
              title="Alerts & Push Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowPartnerModal(true)}
              className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                household.isConnected
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-emerald-500/20 shadow-md'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-800'
              }`}
              title="Shared Household Vault"
            >
              {household.isConnected ? (
                <>
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                  <span className="hidden sm:inline">Partner Synced</span>
                </>
              ) : (
                <>
                  <UserPlus className={`w-5 h-5 ${theme.textAccent}`} />
                  <span className="hidden sm:inline">Add Person</span>
                </>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border font-bold text-xs transition-all ${theme.btnPrimary}`}
              >
                <Menu className="w-5 h-5" />
                <span className="hidden sm:inline">{currentTabObj.label}</span>
              </button>

              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs" onClick={() => setIsMenuOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border z-50 p-2 space-y-1 ${currentTheme === 'light-mode' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                    <div className="px-3 py-2 border-b border-slate-800/50 mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">Stashly Navigation</p>
                    </div>
                    {navItems.map(item => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                            isActive ? `${theme.btnPrimary} shadow-md` : 'hover:bg-slate-800/50 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {}
      {showNotificationCenter && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-end p-4 sm:p-6">
          <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl mt-12`}>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <BellRing className={`w-5 h-5 ${theme.textAccent}`} />
                <h3 className="text-sm font-bold">Stashly Push Alert Engine</h3>
              </div>
              <button onClick={() => setShowNotificationCenter(false)} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex justify-between items-center text-xs">
              <span className="opacity-70 font-semibold">Web Push Permission:</span>
              <button
                onClick={requestBrowserPushPermission}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold ${pushEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : theme.btnPrimary}`}
              >
                {pushEnabled ? '✓ Push Enabled' : 'Enable Web Push'}
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {notifications.map(n => (
                <div key={n.id} className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      {n.type === 'bill' && '⏰ Bill Due Alert'}
                      {n.type === 'low' && '⚠️ Low Balance Warning'}
                      {n.type === 'partner' && '🛒 Partner Activity'}
                      {n.type === 'fact' && '💡 Financial Fun Fact'}
                      {n.type === 'info' && '🔔 System Notice'}
                    </span>
                    <span className="text-[10px] opacity-50">{n.date}</span>
                  </div>
                  <p className="opacity-70 text-[11px]">{n.body}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex gap-2">
              <button
                onClick={() => pushNotification('⏰ 3-Day Bill Alert', `Hey ${userProfile.nickname || 'there'}, Electric Bill ($120) is due in 3 days.`, 'bill')}
                className="flex-1 py-2 rounded-xl text-[10px] font-bold bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-amber-400"
              >
                Test Bill Alert
              </button>
              <button
                onClick={() => pushNotification('⚠️ Low Balance Warning', `Heads up ${userProfile.nickname || ''}! Projected balance drops below ${formatCurrency(100)} on June 18th.`, 'low')}
                className="flex-1 py-2 rounded-xl text-[10px] font-bold bg-slate-950 border border-slate-800 hover:border-rose-500/40 text-rose-400"
              >
                Test Low Balance
              </button>
              <button
                onClick={showRandomFunFact}
                className={`flex-1 py-2 rounded-xl text-[10px] font-bold ${theme.btnPrimary}`}
              >
                Pop Fun Fact
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {shoppingUserId && <FinancialAccountSetup key={shoppingUserId} theme={theme} account={financialAccount}
          loading={accountLoading} error={accountError} onRetry={() => setAccountReload(n => n + 1)} onCreate={handleCreateAccount} />}
        {balanceResult.error && <p role="alert" className="text-rose-400">{balanceResult.error}</p>}
        {financialAccount && transactions.some(t => !t.accountId) && <div className="border border-amber-500/40 rounded-xl p-4 text-sm space-y-2">
          <p>{transactions.filter(t => !t.accountId).length} existing transactions have no confirmed account or currency. Review them in Transaction History before assigning them. They are excluded from the current balance.</p>
          <button type="button" onClick={handleAssignLegacy} className="underline">Assign these existing transactions to {financialAccount.name} ({financialAccount.currency})</button>
        </div>}
        {transactionsLoading && <p role="status" className="text-sm opacity-70">Loading saved transactions...</p>}
        {transactionError && <div role="alert" className="text-sm text-rose-400">
          {transactionError} <button type="button" onClick={() => setTransactionReload(n => n + 1)} className="underline">Retry</button>
        </div>}
        {activeTab === 'cashflow' && (
          <CashflowView
            theme={theme}
            startingBalance={startingBalance}
            setStartingBalance={setStartingBalance}
            balanceLocked={true}
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

        {activeTab === 'wishlist' && (
          <WishlistView
            theme={theme}
            wishlistItems={wishlistItems}
            setWishlistItems={setWishlistItems}
            formatCurrency={formatCurrency}
            startingBalance={startingBalance}
            safeToSpendToday={safeToSpendToday}
            onAddPlan={(newPlan) => setCashflowPlans(prev => [...prev, newPlan])}
            onAddTransaction={handleAddTransaction}
          />
        )}

        {activeTab === 'lists' && (
          <ShoppingListsView
            key={shoppingUserId || 'signed-out'}
            theme={theme}
            geminiApiKey={geminiApiKey}
            selectedCurrency={selectedCurrency}
            userId={shoppingUserId}
            loading={shoppingLoading}
            loadError={shoppingError}
            onRetry={() => setShoppingReload(value => value + 1)}
            shoppingLists={shoppingLists}
            setShoppingLists={setShoppingLists}
            formatCurrency={formatCurrency}
            onAddTransaction={handleAddTransaction}
          />
        )}

        {activeTab === 'entry' && (
          <DailyEntryView
            key={shoppingUserId || 'signed-out'}
            onUpdateTransaction={handleUpdateTransaction}
            theme={theme}
            geminiApiKey={geminiApiKey}
            onAddTransaction={handleAddTransaction}
            transactions={transactions}
            formatCurrency={formatCurrency}
            onDeleteTransaction={handleDeleteTransaction}
          />
        )}

        {activeTab === 'groceries' && (
          <GroceryTrackerView theme={theme} transactions={transactions.filter(t => financialAccount && t.accountId === financialAccount.id)} formatCurrency={formatCurrency} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView theme={theme} transactions={transactions.filter(t => financialAccount && t.accountId === financialAccount.id)} formatCurrency={formatCurrency} />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            theme={theme}
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
            currentBg={currentBg}
            setCurrentBg={setCurrentBg}
            selectedCurrency={selectedCurrency}
            currencyLocked={!!financialAccount}
            setSelectedCurrency={setSelectedCurrency}
            startingBalance={startingBalance}
            setStartingBalance={setStartingBalance}
            setShowAdminModal={setShowAdminModal}
            household={household}
            onOpenPartnerModal={() => setShowPartnerModal(true)}
            pushEnabled={pushEnabled}
            onRequestPush={requestBrowserPushPermission}
            onPopFunFact={showRandomFunFact}
            userProfile={userProfile}
            onOpenAuthModal={() => setShowAuthModal(true)}
          />
        )}
      </main>

      {}
      {showAuthModal && (
        <AuthModal
          theme={theme}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onClose={() => setShowAuthModal(false)}
          pushNotification={pushNotification}
        />
      )}

      {showPartnerModal && (
        <PartnerModal
          theme={theme}
          household={household}
          setHousehold={setHousehold}
          userProfile={userProfile}
          onClose={() => setShowPartnerModal(false)}
        />
      )}

      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl w-full max-w-md p-6 space-y-4`}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2"><Lock className={`w-4 h-4 ${theme.textAccent}`} /> Admin API Key Override</h3>
              <button onClick={() => setShowAdminModal(false)} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <p className="text-xs opacity-70">Enter master Gemini API key to override server configuration.</p>
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

function AuthModal({ theme, userProfile, setUserProfile, onClose, pushNotification }) {
  const [isRegisterMode, setIsRegisterMode] = useState(!userProfile.loggedIn);
  const [email, setEmail] = useState(userProfile.email || '');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState(userProfile.nickname || '');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setAuthError('');
    setLoading(true);

    try {
      if (isRegisterMode) {
        const finalNickname = nickname.trim() || email.split('@')[0];
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { nickname: finalNickname } }
        });

        if (error) throw error;

        if (!data.session) {
          setAuthError('Check your email to confirm your account, then sign in.');
          setIsRegisterMode(false);
          setPassword('');
          return;
        }
        // The auth subscription sets identity only after Supabase confirms a session.

        pushNotification(
          `Welcome to Stashly, ${finalNickname}! 🚀`,
          `Your account has been created on Supabase Cloud.`
        );
        onClose();
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        const user = data.user;
        const userNick = user?.user_metadata?.nickname || email.split('@')[0];

        // The auth subscription updates the account and clears previous-session data.

        pushNotification(
          `Welcome back, ${userNick}! 🚀`,
          `Successfully authenticated with Supabase.`
        );
        onClose();
      }
    } catch (err) {
      setAuthError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (loading) return;
    setLoading(true); setAuthError('');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      onClose();
    } catch (error) { setAuthError('Could not sign out: ' + error.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl`}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <UserCircle className={`w-6 h-6 ${theme.textAccent}`} />
            <div>
              <h3 className="text-sm font-bold">Stashly Cloud Account</h3>
              <p className="text-[10px] opacity-60">Supabase Secured Authentication</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
        </div>

        {authError && (
          <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-xs text-rose-400 font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{authError}</span>
          </div>
        )}

        {userProfile.loggedIn ? (
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60">Status:</span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold text-[10px]">
                  ✓ Cloud Authenticated
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60">App Nickname:</span>
                <span className={`font-bold ${theme.textAccent}`}>{userProfile.nickname}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60">Email:</span>
                <span className="font-mono text-[11px] opacity-90">{userProfile.email}</span>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full py-2.5 rounded-xl font-semibold text-xs border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out of Account
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex border-b border-slate-800 mb-2">
              <button
                type="button"
                onClick={() => { setIsRegisterMode(true); setAuthError(''); }}
                className={`flex-1 py-2 text-xs font-bold text-center border-b-2 ${isRegisterMode ? `${theme.borderAccent} ${theme.textAccent}` : 'border-transparent opacity-50'}`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => { setIsRegisterMode(false); setAuthError(''); }}
                className={`flex-1 py-2 text-xs font-bold text-center border-b-2 ${!isRegisterMode ? `${theme.borderAccent} ${theme.textAccent}` : 'border-transparent opacity-50'}`}
              >
                Sign In
              </button>
            </div>

            {isRegisterMode && (
              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">App Nickname</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    placeholder="e.g. Alex, Johnny..."
                    required={isRegisterMode}
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs focus:outline-none"
                  />
                  <User className="w-4 h-4 absolute left-3 top-2.5 opacity-50" />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Email Address</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs focus:outline-none"
                />
                <AtSign className="w-4 h-4 absolute left-3 top-2.5 opacity-50" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs focus:outline-none"
                />
                <KeyRound className="w-4 h-4 absolute left-3 top-2.5 opacity-50" />
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 ${theme.btnPrimary}`}>
              <LogIn className="w-4 h-4" /> {loading ? 'Authenticating...' : (isRegisterMode ? 'Create Cloud Account' : 'Sign In')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function PartnerModal({ theme, household, setHousehold, userProfile, onClose }) {
  const [activeTab, setActiveTab] = useState('code');
  const [partnerInput, setPartnerInput] = useState('');
  const [partnerName, setPartnerName] = useState(household.partnerName || '');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [syncError, setSyncError] = useState('');

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(household.householdId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnectPartner = async (e) => {
    e.preventDefault();
    if (!partnerInput) return;
    setSyncError('');
    setLoading(true);

    try {
      const codeToLink = partnerInput.trim().toUpperCase();

      // Provera ili kreiranje zapisa u Supabase public.households tabeli
      const { data: existingHousehold, error: fetchErr } = await supabase
        .from('households')
        .select('*')
        .eq('household_code', codeToLink)
        .maybeSingle();

      if (fetchErr) throw fetchErr;

      if (!existingHousehold) {
        // Ako kod još ne postoji u bazi, kreiramo novu zajedničku sobu/sef
        const { error: insertErr } = await supabase
          .from('households')
          .insert([{ household_code: codeToLink }]);

        if (insertErr) throw insertErr;
      }

      setHousehold(prev => ({
        ...prev,
        householdId: codeToLink,
        partnerEmail: partnerInput,
        partnerName: partnerName || partnerInput.split('@')[0],
        isConnected: true
      }));

      onClose();
    } catch (err) {
      setSyncError(err.message || 'Failed to link household in Supabase cloud.');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setHousehold(prev => ({ ...prev, partnerEmail: '', partnerName: '', isConnected: false }));
  };

  const handleScanQRCode = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPartnerInput(household.householdId);
      setPartnerName('Scanned Partner');
      alert('QR Code detected! Click "Merge Accounts & Sync" to establish cloud connection.');
    };
    reader.readAsDataURL(file);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(household.householdId)}&color=0f172a&bgcolor=f8fafc`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className={`w-6 h-6 ${theme.textAccent}`} />
            <div>
              <h3 className="text-sm font-bold">Shared Vault & Partner Account</h3>
              <p className="text-[10px] opacity-60">
                {userProfile.nickname ? `${userProfile.nickname}'s Cloud Vault Sync` : 'Merge budgets with your spouse or partner'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
        </div>

        {syncError && (
          <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-xs text-rose-400 font-semibold">
            ⚠️ {syncError}
          </div>
        )}

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'code' ? `${theme.btnPrimary}` : 'opacity-60 hover:opacity-100 text-slate-300'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" /> Code & Manual
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'qr' ? `${theme.btnPrimary}` : 'opacity-60 hover:opacity-100 text-slate-300'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" /> QR Connect
          </button>
        </div>

        {activeTab === 'qr' ? (
          <div className="space-y-4 text-center py-2">
            <div className="bg-slate-100 p-4 rounded-2xl inline-block shadow-inner mx-auto border border-slate-300">
              <img src={qrCodeUrl} alt="Household QR Code" className="w-36 h-36 mx-auto rounded-lg" />
            </div>
            <p className="text-xs opacity-70">Have your partner open Stashly, switch to the QR tab, and scan this code using their camera to instantly interconnect.</p>

            <div className="pt-2">
              <label className="cursor-pointer inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200">
                <Camera className="w-4 h-4 text-emerald-400" /> Open Camera to Scan Partner's QR
                <input type="file" accept="image/*" capture="environment" onChange={handleScanQRCode} className="hidden" />
              </label>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60 font-semibold uppercase text-[10px]">Vault Status</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${household.isConnected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
                  {household.isConnected ? '❤️ Connected Cloud Vault' : '👤 Personal Vault'}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60">Your Household Code:</span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-emerald-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  <span>{household.householdId}</span>
                  <button onClick={handleCopyCode} className="text-slate-400 hover:text-white">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {!household.isConnected ? (
              <form onSubmit={handleConnectPartner} className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold opacity-60 uppercase">Partner's Sync Code</label>
                  <input
                    type="text"
                    placeholder="e.g. SB-98X21"
                    required
                    value={partnerInput}
                    onChange={e => setPartnerInput(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold opacity-60 uppercase">Partner's Nickname</label>
                  <input
                    type="text"
                    placeholder="e.g. Anja"
                    value={partnerName}
                    onChange={e => setPartnerName(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none"
                  />
                </div>

                <button type="submit" disabled={loading} className={`w-full py-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 ${theme.btnPrimary}`}>
                  <UserPlus className="w-4 h-4" /> {loading ? 'Syncing with Supabase...' : 'Merge Accounts & Sync Cloud'}
                </button>
              </form>
            ) : (
              <div className="space-y-3">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-emerald-400">Vault synced with {household.partnerName || household.partnerEmail}</p>
                  <p className="text-[10px] opacity-70">Household room "{household.householdId}" is active on Supabase.</p>
                </div>

                <button onClick={handleDisconnect} className="w-full py-2.5 rounded-xl font-semibold text-xs border border-rose-500/30 text-rose-400 hover:bg-rose-500/10">
                  Unlink Partner Account
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function CashflowView({ theme, balanceLocked, startingBalance, setStartingBalance, dailyProjections, safeToSpendToday, lowestProjectedBalance, projectionDays, setProjectionDays, cashflowPlans, formatCurrency, onOpenAddPlan, onEditPlan, onDeletePlan }) {
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
              <button disabled={balanceLocked} title={balanceLocked ? 'Calculated from saved transactions' : undefined} onClick={() => { setTempBalance(startingBalance); setIsBalanceEditing(true); }} className={`text-xs opacity-60 hover:opacity-100 flex items-center gap-1 ${theme.textAccent}`}><Edit3 className="w-3.5 h-3.5" /> Edit</button>
            </div>
          )}
        </div>

        <div className={`p-5 rounded-2xl border bg-gradient-to-br ${theme.bgGlow} to-slate-900 ${theme.cardBorder}`}>
          <p className={`text-xs font-bold uppercase flex items-center gap-1.5 ${theme.textAccent}`}><ShieldCheck className="w-4 h-4" /> Safe to Spend Today</p>
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
        <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-5 space-y-4 flex flex-col`}>
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
                    <button onClick={() => onEditPlan(plan)} className="text-slate-400 hover:text-white p-1"><Edit3 className="w-3.5 h-3.5" /></button>
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

function WishlistView({ theme, wishlistItems, setWishlistItems, formatCurrency, startingBalance, safeToSpendToday, onAddPlan, onAddTransaction }) {
  const [formData, setFormData] = useState({ title: '', price: '', priority: 'Medium', category: 'Tech & Gadgets', notes: '' });

  const totalWishValuation = useMemo(() => {
    return wishlistItems.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
  }, [wishlistItems]);

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    setWishlistItems(prev => [
      { id: 'wish-' + Date.now(), ...formData, price: Number(formData.price), createdAt: new Date().toISOString() },
      ...prev
    ]);

    setFormData({ title: '', price: '', priority: 'Medium', category: 'Tech & Gadgets', notes: '' });
  };

  const handleDeleteWish = (id) => {
    setWishlistItems(prev => prev.filter(w => w.id !== id));
  };

  const handleConvertToPlan = (wish) => {
    onAddPlan({
      id: 'plan-' + Date.now(),
      title: `Wish: ${wish.title}`,
      amount: wish.price,
      type: 'Expense',
      category: 'Other',
      frequency: 'Once',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true
    });
  };

  const handleBuyNow = async (wish) => {
    const saved = await onAddTransaction({
      id: crypto.randomUUID(),
      title: wish.title,
      amount: wish.price,
      type: 'Expense',
      category: 'Other',
      merchant: 'Wishlist Purchase',
      date: new Date().toISOString().split('T')[0]
    });
    if (saved) handleDeleteWish(wish.id);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl`}>
          <div className="flex items-center justify-between opacity-60 mb-1">
            <span className="text-xs font-semibold uppercase">Total Wish List Cost</span>
            <Gift className={`w-4 h-4 ${theme.textAccent}`} />
          </div>
          <p className="text-2xl font-black">{formatCurrency(totalWishValuation)}</p>
          <p className="text-[10px] opacity-60 mt-1">{wishlistItems.length} future items on wishlist</p>
        </div>

        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl`}>
          <div className="flex items-center justify-between opacity-60 mb-1">
            <span className="text-xs font-semibold uppercase">Affordability Check</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">{formatCurrency(safeToSpendToday)}</p>
          <p className="text-[10px] opacity-60 mt-1">Safe to spend buffer currently available</p>
        </div>

        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl flex flex-col justify-between`}>
          <div className="flex items-center justify-between opacity-60 mb-1">
            <span className="text-xs font-semibold uppercase">Highest Priority Wish</span>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-lg font-bold truncate">
            {wishlistItems.find(w => w.priority === 'High')?.title || (wishlistItems[0]?.title || 'None yet')}
          </p>
          <span className="text-[10px] opacity-60">
            {wishlistItems.length > 0 ? formatCurrency(wishlistItems.find(w => w.priority === 'High')?.price || wishlistItems[0]?.price) : 'Add your first wish below'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl space-y-4 lg:col-span-1`}>
          <h3 className="text-sm font-bold flex items-center gap-2"><Plus className={`w-4 h-4 ${theme.textAccent}`} /> Add Future Wish Item</h3>
          <form onSubmit={handleAddWish} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Item Name</label>
              <input
                type="text"
                placeholder="e.g. 34' OLED Monitor, New PC, Dress..."
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Expected Price</label>
              <input
                type="number"
                placeholder="e.g. 45000"
                required
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">Priority</label>
                <select
                  value={formData.priority}
                  onChange={e => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="High">🔥 High</option>
                  <option value="Medium">⚡ Medium</option>
                  <option value="Low">🌱 Low</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="Tech & Gadgets">Tech & PC</option>
                  <option value="Fashion">Clothing & Apparel</option>
                  <option value="Home & Furniture">Home & Appliances</option>
                  <option value="Animals & Farm">Animals & Pets</option>
                  <option value="Travel & Fun">Travel & Fun</option>
                  <option value="Other">Other Wish</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Notes / Specs</label>
              <textarea
                rows={2}
                placeholder="Optional link, specs, color, model details..."
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none"
              />
            </div>

            <button type="submit" className={`w-full py-3 rounded-xl font-bold text-xs uppercase ${theme.btnPrimary}`}>
              Add to Wish List
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-3">
          {wishlistItems.length === 0 ? (
            <div className={`${theme.cardBg} border border-dashed border-slate-800 rounded-2xl p-12 text-center opacity-50 text-xs space-y-2`}>
              <Gift className="w-8 h-8 mx-auto opacity-40" />
              <p className="font-bold">Your wish list is currently empty.</p>
              <p>Add anything you plan to buy in the future to keep your cashflow clear until you're ready!</p>
            </div>
          ) : (
            wishlistItems.map(wish => {
              const isAffordableNow = safeToSpendToday >= wish.price;
              return (
                <div key={wish.id} className={`${theme.cardBg} border ${theme.cardBorder} p-4 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        wish.priority === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        wish.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                      }`}>
                        {wish.priority} Priority
                      </span>
                      <span className="text-[10px] opacity-50 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">{wish.category}</span>
                      {isAffordableNow && (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Affordable Now
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-slate-100">{wish.title}</h4>
                    {wish.notes && <p className="text-xs opacity-60 italic">{wish.notes}</p>}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                    <div className="text-left sm:text-right">
                      <span className={`text-base font-black font-mono ${theme.textAccent}`}>{formatCurrency(wish.price)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleConvertToPlan(wish)}
                        title="Add to Planned Cashflow"
                        className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <Calendar className="w-3.5 h-3.5 text-blue-400" /> Plan
                      </button>

                      <button
                        onClick={() => handleBuyNow(wish)}
                        title="Log as Bought"
                        className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 ${theme.btnPrimary}`}
                      >
                        <Check className="w-3.5 h-3.5" /> Buy
                      </button>

                      <button
                        onClick={() => handleDeleteWish(wish.id)}
                        className="p-2 text-slate-600 hover:text-rose-400"
                      >
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
    </div>
  );
}

function compareGroceryItems(a, b) {
  const left = a.item.toLowerCase(), right = b.item.toLowerCase();
  return (left < right ? -1 : left > right ? 1 : 0) || a.id.localeCompare(b.id);
}

async function loadSavedGroceries(client, userId, isCurrent) {
  // Keyset pagination also handles an API row cap smaller than our requested page size.
  const readAll = async (table, fields) => {
    const rows = [];
    let after = null;
    while (isCurrent()) {
      let query = client.from(table).select(fields).eq('user_id', userId)
        .order('id', { ascending: true }).limit(250);
      if (after) query = query.gt('id', after);
      const { data, error } = await query;
      if (!isCurrent()) return null;
      if (error) throw error;
      if (!Array.isArray(data)) throw new Error('Grocery loading returned an invalid response.');
      if (!data.length) return rows;
      const next = data[data.length - 1].id;
      if (!next || (after && next <= after)) throw new Error('Grocery loading could not advance. Please retry.');
      rows.push(...data);
      after = next;
    }
    return null;
  };
  const lists = await readAll('shopping_lists', 'id, title, category, estimated_total, currency, created_at');
  if (!lists || !isCurrent()) return null;
  if (!lists.length) return [];
  const items = await readAll('shopping_list_items', 'id, list_id, item_name, quantity, estimated_price, checked');
  if (!items || !isCurrent()) return null;
  const grouped = new Map(lists.map(list => [list.id, []]));
  for (const item of items) {
    // Ignore children whose parent is no longer visible (e.g. a concurrently deleted list).
    grouped.get(item.list_id)?.push({ id: item.id, item: item.item_name, qty: item.quantity,
      estimatedPrice: item.estimated_price == null ? null : Number(item.estimated_price), checked: item.checked });
  }
  return lists.sort((a, b) => b.created_at.localeCompare(a.created_at) || a.id.localeCompare(b.id))
    .map(list => ({ id: list.id, title: list.title, category: list.category,
      totalEstimated: list.estimated_total == null ? null : Number(list.estimated_total),
      currency: list.currency, date: list.created_at?.split('T')[0],
      estimatedItems: grouped.get(list.id).sort(compareGroceryItems) }));
}

async function saveGroceryList(client, userId, requestId, payload) {
  if (!payload.title.trim() || payload.title.trim().length > 200) throw new Error('Enter a title of 1–200 characters.');
  if (!payload.items.length || payload.items.length > 500 || payload.items.some(item => !item.trim() || item.trim().length > 300))
    throw new Error('Use 1–500 items, each with 1–300 characters.');
  const { data: { user }, error: authError } = await client.auth.getUser();
  if (authError) throw authError;
  if (!user || user.id !== userId) throw new Error('Please sign in again before saving a list.');
  const { data, error } = await client.rpc('save_shopping_list_for_user', {
    p_user_id: userId, p_id: requestId, p_title: payload.title.trim(), p_category: payload.category,
    p_currency: payload.currency, p_items: payload.items.map(item => item.trim())
  });
  if (error) throw error;
  if (data?.id !== requestId || !Array.isArray(data.shopping_list_items) || data.shopping_list_items.length !== payload.items.length)
    throw new Error('The complete save was not confirmed. Retry this same list or reload to review it.');
  return data;
}

async function persistGroceryChange(client, userId, change) {
  const { data: { user }, error: authError } = await client.auth.getUser();
  if (authError) throw authError;
  if (!user || user.id !== userId) throw new Error('Your session changed. Reload before changing a list.');
  if (change.kind === 'delete') {
    const { data, error } = await client.from('shopping_lists').delete()
      .eq('id', change.listId).eq('user_id', userId).select('id').single();
    if (error) throw error;
    if (data?.id !== change.listId) throw new Error('List deletion was not confirmed.');
    return data;
  }
  if (change.kind === 'rename') {
    const title = String(change.title || '').trim();
    if (!title || title.length > 200) throw new Error('Enter a list title of 1–200 characters.');
    const { data, error } = await client.from('shopping_lists').update({ title })
      .eq('id', change.listId).eq('user_id', userId).select('id, title').single();
    if (error) throw error;
    if (data?.id !== change.listId || data.title !== title) throw new Error('List title change was not confirmed.');
    return data;
  }
  if (change.kind === 'editItem') {
    const itemName = String(change.item || '').trim();
    const quantityText = String(change.qty).trim();
    const quantity = Number(quantityText);
    if (!itemName || itemName.length > 300) throw new Error('Enter an item name of 1–300 characters.');
    if (!/^\d+(\.\d{1,3})?$/.test(quantityText) || !Number.isFinite(quantity) || quantity <= 0 || quantity > 1000000)
      throw new Error('Quantity must be greater than zero, up to 1,000,000, with at most 3 decimal places.');
    const { data, error } = await client.from('shopping_list_items').update({ item_name: itemName, quantity })
      .eq('id', change.itemId).eq('list_id', change.listId).eq('user_id', userId)
      .select('id, item_name, quantity, checked, estimated_price').single();
    if (error) throw error;
    if (data?.id !== change.itemId || data.item_name !== itemName || Number(data.quantity) !== quantity)
      throw new Error('Item edit was not confirmed.');
    return data;
  }
  if (change.kind !== 'check' || typeof change.checked !== 'boolean') throw new Error('Invalid grocery change.');
  const { data, error } = await client.from('shopping_list_items').update({ checked: change.checked })
    .eq('id', change.itemId).eq('list_id', change.listId).eq('user_id', userId)
    .select('id, checked').single();
  if (error) throw error;
  if (data?.id !== change.itemId || data.checked !== change.checked) throw new Error('Item change was not confirmed.');
  return data;
}

function ShoppingListsView({ theme, selectedCurrency, shoppingLists, setShoppingLists, formatCurrency, userId, loading, loadError, onRetry }) {
  const [selectedCategory, setSelectedCategory] = useState('Foods');
  const [listTitle, setListTitle] = useState('');
  const [rawText, setRawText] = useState('');
  const isEstimating = false;
  const [isSaving, setIsSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [groceryEdit, setGroceryEdit] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const saveInProgress = useRef(false);
  const listRequestId = useRef(null);
  const activeView = useRef(true);
  useEffect(() => {
    activeView.current = true;
    return () => { activeView.current = false; };
  }, []);

  const categories = [
    { id: 'Foods', label: 'Foods & Groceries', icon: ShoppingBag },
    { id: 'Tools', label: 'Tools & Hardware', icon: Wrench },
    { id: 'Car', label: 'Car Parts & Repair', icon: Car },
    { id: 'Project', label: 'Projects & Building', icon: Hammer },
    { id: 'Other', label: 'Other & Various', icon: Package }
  ];

  const handleSaveList = async (e) => {
    e.preventDefault();
    if (saveInProgress.current || loading || loadError) return;
    const title = listTitle.trim();
    const items = rawText.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    if (!title || !items.length) {
      setSaveMessage('Enter a title and at least one item.');
      return;
    }

    saveInProgress.current = true;
    setIsSaving(true);
    setSaveMessage('');
    try {
      if (!listRequestId.current) listRequestId.current = crypto.randomUUID();
      const list = await saveGroceryList(supabase, userId, listRequestId.current, {
        title, category: selectedCategory, currency: selectedCurrency, items
      });
      const savedItems = list.shopping_list_items;

      if (!activeView.current) return;
      setShoppingLists(prev => [{
        id: list.id, title: list.title, category: list.category,
        currency: list.currency, date: list.created_at?.split('T')[0],
        totalEstimated: list.estimated_total == null ? null : Number(list.estimated_total),
        estimatedItems: savedItems.map(item => ({
          id: item.id, item: item.item_name, qty: item.quantity,
          estimatedPrice: item.estimated_price == null ? null : Number(item.estimated_price), checked: item.checked
        })).sort(compareGroceryItems)
      }, ...prev.filter(existing => existing.id !== list.id)]);
      listRequestId.current = null;
      setListTitle('');
      setRawText('');
      setSaveMessage('List saved.');
    } catch (error) {
      if (activeView.current) setSaveMessage('Could not save list: ' + error.message);
    } finally {
      saveInProgress.current = false;
      if (activeView.current) setIsSaving(false);
    }
  };

  const handleChange = async (change) => {
    if (saveInProgress.current || loading || loadError) return;
    saveInProgress.current = true;
    setIsSaving(true);
    setSaveMessage('');
    try {
      const saved = await persistGroceryChange(supabase, userId, change);
      if (!activeView.current) return;
      setShoppingLists(prev => change.kind === 'delete'
        ? prev.filter(list => list.id !== change.listId)
        : prev.map(list => list.id !== change.listId ? list : change.kind === 'rename'
          ? { ...list, title: saved.title }
          : { ...list, estimatedItems: list.estimatedItems.map(item => item.id !== change.itemId ? item
              : change.kind === 'editItem' ? { ...item, item: saved.item_name, qty: Number(saved.quantity),
                  checked: saved.checked, estimatedPrice: saved.estimated_price == null ? null : Number(saved.estimated_price) }
              : { ...item, checked: saved.checked }).sort(compareGroceryItems) }));
      if (change.kind === 'rename' || change.kind === 'editItem') setGroceryEdit(null);
      setPendingDelete(null);
      setSaveMessage(change.kind === 'delete' ? 'List deleted.' : change.kind === 'rename' ? 'List title saved.' : 'Item saved.');
    } catch (error) {
      if (activeView.current) setSaveMessage('Could not save change: ' + error.message);
    } finally {
      saveInProgress.current = false;
      if (activeView.current) setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl`}>
        <h3 className="text-base font-bold flex items-center gap-2"><Calculator className={`w-5 h-5 ${theme.textAccent}`} /> Grocery Lists</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-1 ${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl space-y-4`}>
          {loading && <p role="status" className="text-xs">Loading saved lists...</p>}
          {loadError && <div role="alert" className="text-xs">Could not load lists: {loadError} <button type="button" onClick={onRetry} className="underline">Retry</button></div>}
          <form onSubmit={handleSaveList} className="space-y-3">
            <fieldset disabled={isSaving || loading || !!loadError || !userId} className="space-y-3">
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
              <textarea rows={5} placeholder={"One item per line, including quantity:\n2x Milk 1L\n1kg Apples"} required value={rawText} onChange={(e) => setRawText(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none font-mono" />
            </div>
            <button type="submit" disabled={isSaving || isEstimating} className={`w-full font-bold py-3 rounded-xl text-xs uppercase ${theme.btnPrimary}`}>{isSaving ? 'Saving...' : 'Save List'}</button>
            <p className="text-xs opacity-60">Save manually without AI. Optional cost estimation will be added later.</p>
            </fieldset>
            {saveMessage && <p role="status" className="text-xs">{saveMessage}</p>}
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {!loading && !loadError && shoppingLists.length === 0 ? (
            <div className={`${theme.cardBg} p-8 rounded-2xl border border-dashed border-slate-800 text-center opacity-50 text-xs`}>No saved shopping lists yet.</div>
          ) : (
            shoppingLists.map(list => (
              <div key={list.id} className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-5 space-y-3`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-sm">{list.title}</h5>
                    <button type="button" aria-label={`Edit list title: ${list.title}`} disabled={isSaving}
                      onClick={() => setGroceryEdit({ kind: 'rename', listId: list.id, title: list.title })} className="text-[10px] underline">Edit title</button>
                    <p className="text-[10px] opacity-60">{list.category} • {formatDate(list.date)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono font-bold text-base ${theme.textAccent}`}>{list.totalEstimated == null ? 'Not estimated' : `~${formatCurrency(list.totalEstimated)}`}</span>
                    <span className="text-[10px] opacity-60">Planning only</span>
                    <button aria-label={`Delete list: ${list.title}`} disabled={isSaving || loading || !!loadError} onClick={() => setPendingDelete(list.id)} className="text-slate-600 hover:text-rose-400 p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                {groceryEdit?.listId === list.id && <form onSubmit={event => { event.preventDefault(); handleChange(groceryEdit); }} className="rounded-xl border border-slate-700 p-3 space-y-2">
                  <fieldset disabled={isSaving || loading || !!loadError} className="space-y-2">
                    <label className="block text-xs">{groceryEdit.kind === 'rename' ? 'List title' : 'Item name'}
                      <input aria-label={groceryEdit.kind === 'rename' ? 'Edit list title' : 'Edit item name'} required maxLength={groceryEdit.kind === 'rename' ? 200 : 300}
                        value={groceryEdit.kind === 'rename' ? groceryEdit.title : groceryEdit.item}
                        onChange={event => setGroceryEdit({ ...groceryEdit, [groceryEdit.kind === 'rename' ? 'title' : 'item']: event.target.value })}
                        className="block w-full bg-slate-950 border border-slate-700 rounded-lg p-2 mt-1" />
                    </label>
                    {groceryEdit.kind === 'editItem' && <label className="block text-xs">Quantity
                      <input aria-label="Edit item quantity" type="number" min="0.001" max="1000000" step="0.001" required value={groceryEdit.qty}
                        onChange={event => setGroceryEdit({ ...groceryEdit, qty: event.target.value })} className="block w-full bg-slate-950 border border-slate-700 rounded-lg p-2 mt-1" />
                    </label>}
                    <div className="flex gap-3 text-xs"><button type="submit" className="underline">{isSaving ? 'Saving...' : 'Save changes'}</button>
                      <button type="button" onClick={() => setGroceryEdit(null)} className="underline">Cancel edit</button></div>
                  </fieldset>
                </form>}
                {pendingDelete === list.id && <div className="text-xs space-x-3" role="alert">
                  <span>Permanently delete this list and its items?</span>
                  <button disabled={isSaving} onClick={() => handleChange({ kind: 'delete', listId: list.id })} className="text-rose-400 underline">Delete permanently</button>
                  <button disabled={isSaving} onClick={() => setPendingDelete(null)} className="underline">Cancel</button>
                </div>}
                {list.summaryNote && <p className="text-xs opacity-70 italic bg-slate-950 p-2.5 rounded-xl border border-slate-800">{list.summaryNote}</p>}
                <div className="space-y-1">
                  <p className="text-[10px] opacity-50">Items sorted alphabetically</p>
                  {list.estimatedItems?.map((item, idx) => (
                    <div key={item.id || idx} className="flex justify-between text-xs py-1 border-b border-slate-800/40">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={!!item.checked} disabled={isSaving || loading || !!loadError || !item.id}
                          onChange={event => handleChange({ kind: 'check', listId: list.id, itemId: item.id, checked: event.target.checked })} />
                        <span className={item.checked ? 'line-through opacity-60' : ''}>{Number(item.qty) === 1 ? item.item : `${item.qty} × ${item.item}`}</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <span className="font-mono opacity-80">{item.estimatedPrice == null ? '—' : formatCurrency(item.estimatedPrice)}</span>
                        <button type="button" aria-label={`Edit item: ${item.item}`} disabled={isSaving || !item.id}
                          onClick={() => setGroceryEdit({ kind: 'editItem', listId: list.id, itemId: item.id, item: item.item, qty: String(item.qty) })} className="underline">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function DailyEntryView({ theme, geminiApiKey, onAddTransaction, onUpdateTransaction, transactions, formatCurrency, onDeleteTransaction }) {
  const [formData, setFormData] = useState({ title: '', amount: '', type: 'Expense', category: 'Food', merchant: '', date: localDate() });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  const [editingId, setEditingId] = useState(null);
  const [manualDate, setManualDate] = useState(false);
  const [isSavingTransaction, setIsSavingTransaction] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState('');
  const requestId = useRef(null);
  const submitBusy = useRef(false);
  const resetTransactionForm = () => {
    setEditingId(null); requestId.current = null;
    setFormData({ title: '', amount: '', type: 'Expense', category: 'Food', merchant: '', date: localDate() });
  };
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (submitBusy.current) return;
    submitBusy.current = true; setIsSavingTransaction(true); setTransactionMessage('');
    requestId.current ||= crypto.randomUUID();
    try {
      const saved = await (editingId ? onUpdateTransaction : onAddTransaction)({
        ...formData, id: editingId || requestId.current, amount: Number(formData.amount)
      });
      if (saved) { resetTransactionForm(); setTransactionMessage('Transaction saved.'); }
      else setTransactionMessage('Not saved. Review the error above and retry.');
    } finally { submitBusy.current = false; setIsSavingTransaction(false); }
  };

  const handleReceiptScan = async () => {
    if (!selectedFiles.length) return;
    if (!geminiApiKey) {
      alert('Gemini API key is missing. Please add your key in Settings or Admin Config.');
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
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: "Extract JSON: pfrNumber, amount (number), merchant (string), date (YYYY-MM-DD), category ('Food','Utilities','Transport','Housing','Entertainment','Health','Other'), title (string), items (array of { name, quantity, price })" }, ...imageParts] }], generationConfig: { responseMimeType: "application/json" } })
      });
      const data = await res.json();
      const parsed = JSON.parse(data?.candidates?.[0]?.content?.parts?.[0]?.text);

      onAddTransaction({
        id: crypto.randomUUID(),
        title: parsed.title || 'Scanned Receipt',
        amount: Number(parsed.amount) || 0,
        type: 'Expense',
        category: parsed.category || 'Food',
        merchant: parsed.merchant || 'Store',
        date: parsed.date || localDate(),
        items: parsed.items || []
      });
      setSelectedFiles([]);
    } catch (err) { alert('OCR Error: ' + err.message); } finally { setIsScanning(false); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl space-y-4`}>
          <h3 className="text-sm font-bold flex items-center gap-2"><Sparkles className={`w-4 h-4 ${theme.textAccent}`} /> Multi-Part Receipt OCR Scanner</h3>
          <p className="text-xs opacity-60">Snap or upload receipt photos. AI extracts totals, merchant, and items.</p>
          <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={(e) => setSelectedFiles(Array.from(e.target.files))} className="hidden" />
          <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-800 p-6 rounded-xl text-center cursor-pointer hover:border-slate-700">
            <Camera className={`w-8 h-8 mx-auto mb-2 ${theme.textAccent}`} />
            <p className="text-xs font-semibold">{selectedFiles.length > 0 ? `${selectedFiles.length} photos selected` : 'Take or Upload Receipt Photos'}</p>
          </div>
          {selectedFiles.length > 0 && <button onClick={handleReceiptScan} disabled={isScanning} className={`w-full py-2.5 rounded-xl font-bold text-xs ${theme.btnPrimary}`}>{isScanning ? 'Scanning...' : 'Process Photos'}</button>}
        </div>

        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl space-y-4`}>
          <h3 className="text-sm font-bold flex items-center gap-2"><Plus className={`w-4 h-4 ${theme.textAccent}`} /> Manual Transaction Entry</h3>
          <form onSubmit={handleManualSubmit} className="space-y-3">
            <fieldset disabled={isSavingTransaction} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Transaction Type</label>
              <div className="grid grid-cols-2 gap-2 mt-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button type="button" onClick={() => setFormData({ ...formData, type: 'Expense' })} className={`py-1.5 rounded-lg text-xs font-bold transition-all ${formData.type === 'Expense' ? 'bg-rose-500 text-white' : 'opacity-60'}`}>Expense (-)</button>
                <button type="button" onClick={() => setFormData({ ...formData, type: 'Income' })} className={`py-1.5 rounded-lg text-xs font-bold transition-all ${formData.type === 'Income' ? 'bg-emerald-500 text-slate-950' : 'opacity-60'}`}>Income (+)</button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Amount</label>
              <input type="number" min="0.01" step="0.01" placeholder="e.g. 4500" required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none" />
            </div>

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Title / Description</label>
              <input type="text" placeholder="e.g. Supermarket Purchase" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none">
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="transaction-date" className="text-[11px] font-semibold opacity-60 uppercase">Date</label>
                  <button type="button" onClick={() => setManualDate(value => !value)} className="text-[10px] underline">{manualDate ? 'Use date picker' : 'Type date'}</button>
                </div>
                <input id="transaction-date" type={manualDate ? 'text' : 'date'} placeholder="YYYY-MM-DD" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Merchant / Client</label>
              <input type="text" placeholder="e.g. Target, Shell" value={formData.merchant} onChange={(e) => setFormData({ ...formData, merchant: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none" />
            </div>

            <button type="submit" className={`w-full py-3 rounded-xl font-bold text-xs uppercase ${theme.btnPrimary}`}>{isSavingTransaction ? 'Saving...' : editingId ? 'Save Changes' : 'Add Transaction'}</button>
            {editingId && <button type="button" onClick={resetTransactionForm} className="text-xs underline">Cancel edit</button>}
            </fieldset>
            {transactionMessage && <p role="status" className="text-xs">{transactionMessage}</p>}
          </form>
        </div>
      </div>

      <div className={`lg:col-span-2 ${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl space-y-4`}>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold">Transaction History Log</h3>
          <span className="text-xs opacity-60">Total entries: {transactions.length}</span>
        </div>
        <div className="divide-y divide-slate-800 max-h-[620px] overflow-y-auto pr-1 space-y-2">
          {transactions.length === 0 ? (
            <p className="text-xs opacity-50 text-center py-12 border border-dashed border-slate-800 rounded-xl">No transactions recorded yet.</p>
          ) : (
            transactions.map(t => {
              const cat = CATEGORIES.find(c => c.id === t.category) || CATEGORIES[7];
              return (
                <div key={t.id} className="pt-3 pb-2 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-xl p-2 rounded-xl bg-slate-950 border border-slate-800">{cat.icon}</span>
                    <div>
                      <p className="font-bold">{t.title}</p>
                      <p className="opacity-50">{t.merchant} • {formatDate(t.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono font-bold ${t.type === 'Income' ? 'text-emerald-400' : 'text-slate-200'}`}>{t.type === 'Income' ? '+' : '-'}{formatCurrency(t.amount)}</span>
                    <button type="button" aria-label={'Edit ' + t.title} disabled={isSavingTransaction} onClick={() => { setEditingId(t.id); setFormData({ ...t, amount: String(t.amount), merchant: t.merchant || '' }); setTransactionMessage(''); }} className="text-slate-400 hover:text-white p-1"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button type="button" aria-label={'Delete ' + t.title} disabled={isSavingTransaction} onClick={async () => {
                      if (submitBusy.current) return;
                      submitBusy.current = true; setIsSavingTransaction(true);
                      try { if (await onDeleteTransaction(t.id)) { if (editingId === t.id) resetTransactionForm(); setTransactionMessage('Transaction deleted.'); } }
                      finally { submitBusy.current = false; setIsSavingTransaction(false); }
                    }} className="text-slate-600 hover:text-rose-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
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

function GroceryTrackerView({ theme, transactions, formatCurrency }) {
  const [search, setSearch] = useState('');
  const items = useMemo(() => {
    const itemMap = {};
    transactions.forEach(t => {
      if (t.items && Array.isArray(t.items)) {
        t.items.forEach(i => {
          const name = i.name || i.item || (typeof i === 'string' ? i : 'Item');
          const qty = Number(i.quantity || i.qty || 1);
          const price = Number(i.price || i.estimatedPrice || 0);

          const k = name.toLowerCase().trim();
          if (!itemMap[k]) itemMap[k] = { name: name, qty: 0, spent: 0 };
          itemMap[k].qty += qty;
          itemMap[k].spent += price * qty;
        });
      }
    });
    return Object.values(itemMap).filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  }, [transactions, search]);

  return (
    <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl space-y-4`}>
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h3 className="text-sm font-bold flex items-center gap-2"><Activity className={`w-4 h-4 ${theme.textAccent}`} /> Item Tracker & Usage</h3>
        <div className="relative">
          <input type="text" placeholder="Search item..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 pl-8 text-xs focus:outline-none" />
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 opacity-50" />
        </div>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl text-xs opacity-50">No scanned items tracked yet. Process receipt images or log items to view statistics.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((i, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
              <div><p className="font-bold text-xs">{i.name}</p></div>
              <div className="text-right"><p className={`font-mono font-bold text-xs ${theme.textAccent}`}>{i.qty} pcs</p><p className="text-[10px] opacity-50">{formatCurrency(i.spent)}</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AnalyticsView({ theme, transactions, formatCurrency }) {
  const categoryTotals = useMemo(() => {
    const totals = {};
    CATEGORIES.forEach(c => { totals[c.id] = 0; });
    transactions.forEach(t => {
      if (t.type === 'Expense') totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
    });
    return totals;
  }, [transactions]);

  const totalExpense = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  return (
    <div className={`${theme.cardBg} border ${theme.cardBorder} p-6 rounded-2xl space-y-6`}>
      <div>
        <h3 className="text-base font-bold flex items-center gap-2">
          <PieChart className={`w-5 h-5 ${theme.textAccent}`} /> Reports & Category Expenses
        </h3>
        <p className="text-xs opacity-60 mt-0.5">Distribution of actual recorded expenses across categories.</p>
      </div>

      {totalExpense === 0 ? (
        <div className="text-center py-12 text-xs opacity-50 border border-dashed border-slate-800 rounded-xl">
          No recorded expenses to display in reports.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORIES.map(cat => {
            const amount = categoryTotals[cat.id] || 0;
            const percentage = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;

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
                    className={`h-full rounded-full transition-all duration-500 ${theme.btnPrimary.split(' ')[0]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="text-[10px] opacity-50 text-right font-semibold">
                  {percentage}% of total expenses
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SettingsView({ theme, currencyLocked, currentTheme, setCurrentTheme, currentBg, setCurrentBg, selectedCurrency, setSelectedCurrency, startingBalance, setStartingBalance, setShowAdminModal, household, onOpenPartnerModal, pushEnabled, onRequestPush, onPopFunFact, userProfile, onOpenAuthModal }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* User Account Profile Settings */}
      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UserCircle className={`w-5 h-5 ${theme.textAccent}`} />
            <h3 className="text-base font-bold">Account & App Nickname</h3>
          </div>
          <button onClick={onOpenAuthModal} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.btnPrimary}`}>
            {userProfile.loggedIn ? 'Manage Account' : 'Sign In / Register'}
          </button>
        </div>
        <p className="text-xs opacity-60">
          {userProfile.loggedIn
            ? `Logged in as ${userProfile.email}. Your app nickname is "${userProfile.nickname || 'Guest'}".`
            : 'Sign in or register with email & password to customize your app nickname for notifications and partner sync.'}
        </p>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold flex items-center gap-2"><Bell className={`w-5 h-5 ${theme.textAccent}`} /> Web Push Alerts & Fun Facts</h3>
          <button onClick={onRequestPush} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${pushEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : theme.btnPrimary}`}>
            {pushEnabled ? '✓ Push Active' : 'Enable Web Push'}
          </button>
        </div>
        <p className="text-xs opacity-60">
          Receive 3-day bill warnings, low-balance cashflow alerts, partner receipt notifications (using your nickname), and random financial fun facts every 3 days.
        </p>
        <button onClick={onPopFunFact} className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
          <Smile className="w-4 h-4" /> Trigger Random Fun Fact Right Now
        </button>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold flex items-center gap-2"><HeartHandshake className={`w-5 h-5 ${theme.textAccent}`} /> Shared Vault & Partner Account</h3>
          <button onClick={onOpenPartnerModal} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.btnPrimary}`}>
            {household.isConnected ? 'Manage Vault' : 'Add Person'}
          </button>
        </div>
        <p className="text-xs opacity-60">
          {household.isConnected ? `Connected with partner (${household.partnerName || household.partnerEmail}). Data is synchronized across both devices.` : 'Currently using a standalone personal vault. Connect a partner to share live cashflow, wishlists, and grocery lists.'}
        </p>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <h3 className="text-base font-bold flex items-center gap-2"><Globe className={`w-5 h-5 ${theme.textAccent}`} /> Default Currency (ISO Standard)</h3>
        <select disabled={currencyLocked} value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none">
          {WORLD_CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.code} - {c.name} ({c.symbol})</option>
          ))}
        </select>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <h3 className="text-base font-bold flex items-center gap-2"><Palette className={`w-5 h-5 ${theme.textAccent}`} /> Accent Highlight Color</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.keys(THEMES).map(tKey => (
            <button key={tKey} onClick={() => setCurrentTheme(tKey)} className={`p-3 rounded-xl border text-xs font-bold transition-all ${currentTheme === tKey ? `${THEMES[tKey].btnPrimary} border-white shadow-lg` : 'bg-slate-950 border-slate-800 opacity-70 hover:opacity-100'}`}>{THEMES[tKey].name}</button>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <h3 className="text-base font-bold flex items-center gap-2"><Sparkles className={`w-5 h-5 ${theme.textAccent}`} /> Background Gradient & Lighting</h3>
        <p className="text-xs opacity-60">Choose your preferred background atmosphere with smooth top-to-bottom fading effects.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.keys(BACKGROUND_LIGHTING).map(bgKey => (
            <button
              key={bgKey}
              onClick={() => setCurrentBg(bgKey)}
              className={`p-3.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                currentBg === bgKey
                  ? `${theme.borderAccent} ${theme.bgAccent} ${theme.textAccent} border-2`
                  : 'bg-slate-950 border-slate-800 opacity-70 hover:opacity-100'
              }`}
            >
              <span>{BACKGROUND_LIGHTING[bgKey].name}</span>
              {currentBg === bgKey && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <h3 className="text-base font-bold flex items-center gap-2"><DollarSign className={`w-5 h-5 ${theme.textAccent}`} /> Starting Balance</h3>
        <input type="number" readOnly value={startingBalance} onChange={(e) => setStartingBalance(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none" />
      </div>

      <div className="text-right pt-2">
        <button onClick={() => setShowAdminModal(true)} className="text-[11px] text-slate-600 hover:text-slate-400 font-mono">🔒 Admin API Config</button>
      </div>
    </div>
  );
}

function PlanModal({ theme, plan, onSave, onClose }) {
  const [formData, setFormData] = useState(plan || { title: '', amount: '', type: 'Expense', category: 'Utilities', frequency: 'Monthly', dayOfMonth: 15, isActive: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    onSave({ ...formData, amount: Number(formData.amount), dayOfMonth: Number(formData.dayOfMonth) });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl w-full max-w-md p-6 space-y-4`}>
        <div className="flex justify-between items-center"><h3 className="text-sm font-bold">{plan ? 'Edit Cashflow Rule' : 'New Cashflow Rule'}</h3><button onClick={onClose}><X className="w-4 h-4" /></button></div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold opacity-60 uppercase">Type</label>
            <div className="grid grid-cols-2 gap-2 mt-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button type="button" onClick={() => setFormData({ ...formData, type: 'Expense' })} className={`py-1.5 rounded-lg text-xs font-bold transition-all ${formData.type === 'Expense' ? 'bg-rose-500 text-white' : 'opacity-60'}`}>Expense (-)</button>
              <button type="button" onClick={() => setFormData({ ...formData, type: 'Income' })} className={`py-1.5 rounded-lg text-xs font-bold transition-all ${formData.type === 'Income' ? 'bg-emerald-500 text-slate-950' : 'opacity-60'}`}>Income (+)</button>
            </div>
          </div>

          <input type="text" placeholder="Title (e.g. Monthly Rent, Salary)" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />
          <input type="number" placeholder="Amount" required value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />

          <div className="grid grid-cols-2 gap-2">
            <select value={formData.frequency} onChange={e => setFormData({ ...formData, frequency: e.target.value })} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none">
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Once">Once</option>
            </select>
            {formData.frequency === 'Monthly' && (
              <input type="number" min="1" max="31" placeholder="Day of month (1-31)" value={formData.dayOfMonth} onChange={e => setFormData({ ...formData, dayOfMonth: e.target.value })} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />
            )}
          </div>

          <button type="submit" className={`w-full py-2.5 rounded-xl font-bold text-xs ${theme.btnPrimary}`}>Save Rule</button>
        </form>
      </div>
    </div>
  );
}


function FinancialAccountSetup({ theme, account, loading, error, onRetry, onCreate }) {
  const [draft, setDraft] = useState({ name: 'Personal account', currency: 'RSD', opening_balance: '', opening_date: localDate() });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const busy = useRef(false);
  if (loading) return <p role="status">Loading your financial account...</p>;
  if (error) return <p role="alert">Could not load account: {error} <button type="button" onClick={onRetry} className="underline">Retry</button></p>;
  if (account) return <p className="text-xs opacity-60">{account.name} · {account.currency} · Opening balance {account.opening_balance} before {account.opening_date}. Current balance includes saved transactions from that date.</p>;
  return <form className="border border-slate-700 rounded-2xl p-5 space-y-3" onSubmit={async e => {
    e.preventDefault(); if (busy.current) return; busy.current = true; setSaving(true); setMessage('');
    try { await onCreate(draft); } catch (e) { setMessage(e.message); } finally { busy.current = false; setSaving(false); }
  }}>
    <h3 className="font-bold">Set up your saved balance</h3>
    <p className="text-sm opacity-70">Enter the balance immediately before your opening date. Only confirmed transactions from that date change this balance. Old browser data is not imported automatically.</p>
    <fieldset disabled={saving} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <label className="text-xs">Account name<input required value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} className="block w-full bg-slate-950 border border-slate-700 p-2 rounded-lg" /></label>
      <label className="text-xs">Currency<select value={draft.currency} onChange={e => setDraft({ ...draft, currency: e.target.value })} className="block w-full bg-slate-950 border border-slate-700 p-2 rounded-lg">{WORLD_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}</select></label>
      <label className="text-xs">Opening balance<input required type="number" step={draft.currency === 'JPY' ? '1' : '0.01'} value={draft.opening_balance} onChange={e => setDraft({ ...draft, opening_balance: e.target.value })} className="block w-full bg-slate-950 border border-slate-700 p-2 rounded-lg" /></label>
      <label className="text-xs">Opening date<input required type="date" max={localDate()} value={draft.opening_date} onChange={e => setDraft({ ...draft, opening_date: e.target.value })} className="block w-full bg-slate-950 border border-slate-700 p-2 rounded-lg" /></label>
      <button type="submit" className={'p-2 rounded-lg font-bold ' + theme.btnPrimary}>{saving ? 'Saving...' : 'Save opening balance'}</button>
    </fieldset>
    {message && <p role="alert">{message}</p>}
  </form>;
}
