import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Автоматическое восстановление сессии из LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find(u => u.email === email);
    if (exists) throw new Error('Пользователь с таким email уже существует');

    const newUser = {
      id: Date.now(),
      username,
      email,
      password,
      role: email === 'admin@music.com' ? 'admin' : 'user',
      favorites: [],
      reviews: [],
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const { password: _, ...safeUser } = newUser;
    localStorage.setItem('currentUser', JSON.stringify(safeUser));
    setUser(safeUser);
    return safeUser;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Неверный email или пароль');

    const { password: _, ...safeUser } = found;
    localStorage.setItem('currentUser', JSON.stringify(safeUser));
    setUser(safeUser);
    return safeUser;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    localStorage.setItem('currentUser', JSON.stringify(updated));

    // Обновляем и в общем списке пользователей
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem('users', JSON.stringify(users));
    }
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
