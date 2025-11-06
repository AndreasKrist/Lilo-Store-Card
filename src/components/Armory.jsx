import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DEFAULT_MODAL_VALUE, INVENTORY_CATEGORIES, DEFAULT_ITEMS, formatPrice } from '../data/inventoryData';
import { ChevronDown, Plus, Minus, LogOut } from 'lucide-react';
import './Armory.css';

function Armory() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalValue, setModalValue] = useState(DEFAULT_MODAL_VALUE);
  const [items, setItems] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    [INVENTORY_CATEGORIES.ELEMENTAL_CRAFT]: true,
    [INVENTORY_CATEGORIES.SMALL_ARMS]: false,
    [INVENTORY_CATEGORIES.MISSING_LINKS]: false
  });

  // Check for existing session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        loadUserData(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load user data from Supabase
  const loadUserData = async (userId) => {
    try {
      // Load modal value
      const { data: inventoryData } = await supabase
        .from('user_inventory')
        .select('modal_value')
        .eq('user_id', userId)
        .single();

      if (inventoryData) {
        setModalValue(parseFloat(inventoryData.modal_value));
      } else {
        // Create initial inventory record
        await supabase
          .from('user_inventory')
          .insert([{ user_id: userId, modal_value: DEFAULT_MODAL_VALUE }]);
      }

      // Load items
      const { data: itemsData } = await supabase
        .from('inventory_items')
        .select('*')
        .eq('user_id', userId);

      const itemsMap = {};
      itemsData?.forEach(item => {
        if (!itemsMap[item.category]) {
          itemsMap[item.category] = {};
        }
        itemsMap[item.category][item.item_name] = {
          customPrice: item.custom_price ? parseFloat(item.custom_price) : null,
          count: item.count || 0
        };
      });
      setItems(itemsMap);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // Sign in with Google
  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/armory`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error.message);
      alert('Error signing in. Please make sure Google OAuth is configured in Supabase.');
    }
  };

  // Sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setItems({});
    setModalValue(DEFAULT_MODAL_VALUE);
  };

  // Update modal value
  const updateModalValue = async (newValue) => {
    setModalValue(newValue);
    if (user) {
      await supabase
        .from('user_inventory')
        .update({ modal_value: newValue })
        .eq('user_id', user.id);
    }
  };

  // Update item in database
  const updateItemInDB = async (category, itemName, defaultPrice, customPrice, count) => {
    if (!user) return;

    const itemData = {
      user_id: user.id,
      category,
      item_name: itemName,
      default_price: defaultPrice,
      custom_price: customPrice,
      count: count || 0
    };

    await supabase
      .from('inventory_items')
      .upsert(itemData, { onConflict: 'user_id,item_name' });
  };

  // Update item count
  const updateItemCount = (category, itemName, defaultPrice, delta) => {
    const currentItem = items[category]?.[itemName] || { count: 0, customPrice: null };
    const newCount = Math.max(0, currentItem.count + delta);

    const newItems = {
      ...items,
      [category]: {
        ...items[category],
        [itemName]: {
          ...currentItem,
          count: newCount
        }
      }
    };
    setItems(newItems);
    updateItemInDB(category, itemName, defaultPrice, currentItem.customPrice, newCount);
  };

  // Set item count directly
  const setItemCount = (category, itemName, defaultPrice, value) => {
    const count = parseInt(value) || 0;
    const currentItem = items[category]?.[itemName] || { count: 0, customPrice: null };

    const newItems = {
      ...items,
      [category]: {
        ...items[category],
        [itemName]: {
          ...currentItem,
          count: Math.max(0, count)
        }
      }
    };
    setItems(newItems);
    updateItemInDB(category, itemName, defaultPrice, currentItem.customPrice, Math.max(0, count));
  };

  // Update custom price
  const updateCustomPrice = (category, itemName, defaultPrice, value) => {
    const price = parseFloat(value) || null;
    const currentItem = items[category]?.[itemName] || { count: 0, customPrice: null };

    const newItems = {
      ...items,
      [category]: {
        ...items[category],
        [itemName]: {
          ...currentItem,
          customPrice: price
        }
      }
    };
    setItems(newItems);
    updateItemInDB(category, itemName, defaultPrice, price, currentItem.count);
  };

  // Get item price (custom or default)
  const getItemPrice = (category, itemName, defaultPrice) => {
    const item = items[category]?.[itemName];
    return item?.customPrice !== null && item?.customPrice !== undefined
      ? item.customPrice
      : defaultPrice;
  };

  // Get item count
  const getItemCount = (category, itemName) => {
    return items[category]?.[itemName]?.count || 0;
  };

  // Calculate total items value
  const calculateTotalItems = () => {
    let total = 0;
    Object.keys(INVENTORY_CATEGORIES).forEach(key => {
      const category = INVENTORY_CATEGORIES[key];
      DEFAULT_ITEMS[category]?.forEach(item => {
        const count = getItemCount(category, item.name);
        const price = getItemPrice(category, item.name, item.price);
        total += count * price;
      });
    });
    return total;
  };

  // Calculate profit
  const calculateProfit = () => {
    return calculateTotalItems() - modalValue;
  };

  // Toggle section
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading) {
    return (
      <div className="armory-container">
        <div className="armory-loading">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="armory-container">
        <div className="armory-login">
          <h2>Welcome to Armory</h2>
          <p>Track your CS2 inventory and calculate profits</p>
          <button onClick={handleGoogleSignIn} className="google-signin-btn">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const totalItems = calculateTotalItems();
  const profit = calculateProfit();

  return (
    <div className="armory-container">
      <div className="armory-header">
        <h1>Armory</h1>
        <button onClick={handleSignOut} className="signout-btn">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      {/* Summary Section */}
      <div className="armory-summary">
        <div className="summary-card">
          <label>Modal</label>
          <div className="summary-value">
            <button onClick={() => updateModalValue(modalValue - DEFAULT_MODAL_VALUE)} className="adjust-btn">
              <Minus size={16} />
            </button>
            <span>{formatPrice(modalValue)}</span>
            <button onClick={() => updateModalValue(modalValue + DEFAULT_MODAL_VALUE)} className="adjust-btn">
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="summary-card">
          <label>Items</label>
          <div className="summary-value">
            <span>{formatPrice(totalItems)}</span>
          </div>
        </div>

        <div className={`summary-card ${profit >= 0 ? 'profit-positive' : 'profit-negative'}`}>
          <label>Sum/Profit</label>
          <div className="summary-value">
            <span>{formatPrice(profit)}</span>
          </div>
        </div>
      </div>

      {/* Inventory Sections */}
      <div className="armory-inventory">
        {Object.keys(INVENTORY_CATEGORIES).map(key => {
          const category = INVENTORY_CATEGORIES[key];
          const isExpanded = expandedSections[category];

          return (
            <div key={category} className="inventory-section">
              <button
                className="section-header"
                onClick={() => toggleSection(category)}
              >
                <h3>{category}</h3>
                <ChevronDown className={`chevron ${isExpanded ? 'rotated' : ''}`} />
              </button>

              {isExpanded && (
                <div className="items-list">
                  {DEFAULT_ITEMS[category]?.map(item => {
                    const count = getItemCount(category, item.name);
                    const price = getItemPrice(category, item.name, item.price);
                    const total = count * price;

                    return (
                      <div key={item.name} className="item-row">
                        <div className="item-name">{item.name}</div>

                        <div className="item-price">
                          <input
                            type="number"
                            step="0.01"
                            value={items[category]?.[item.name]?.customPrice ?? item.price}
                            onChange={(e) => updateCustomPrice(category, item.name, item.price, e.target.value)}
                            placeholder={formatPrice(item.price)}
                          />
                        </div>

                        <div className="item-count">
                          <button
                            onClick={() => updateItemCount(category, item.name, item.price, -1)}
                            className="count-btn"
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={count}
                            onChange={(e) => setItemCount(category, item.name, item.price, e.target.value)}
                          />
                          <button
                            onClick={() => updateItemCount(category, item.name, item.price, 1)}
                            className="count-btn"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="item-total">
                          {formatPrice(total)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Armory;
