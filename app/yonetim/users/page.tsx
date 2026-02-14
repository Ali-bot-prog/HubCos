"use client";

import { useState, useEffect } from "react";
import { Trash2, UserPlus, Shield, User } from "lucide-react";

interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    role: "admin"
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('/api/admins')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.username || !formData.password || !formData.name) return;

    try {
        const res = await fetch('/api/admins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            setFormData({ username: "", password: "", name: "", role: "admin" });
            fetchUsers();
            alert("Yönetici başarıyla eklendi.");
        } else {
            const err = await res.json();
            alert("Hata: " + err.error);
        }
    } catch (error) {
        alert("Bir hata oluştu.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu yöneticiyi silmek istediğinize emin misiniz?")) return;

    try {
        const res = await fetch(`/api/admins?id=${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            fetchUsers();
        } else {
            alert("Silme işlemi başarısız.");
        }
    } catch (error) {
        alert("Bir hata oluştu.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Yöneticiler</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User List */}
        <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Shield className="w-5 h-5 text-[#C5A059]" />
                        Mevcut Yöneticiler
                    </h2>
                </div>
                
                {loading ? (
                    <div className="p-6 text-gray-400">Yükleniyor...</div>
                ) : users.length === 0 ? (
                    <div className="p-6 text-gray-400">
                        Henüz eklenmiş yönetici yok. (Varsayılan 'admin' hesabı kullanılıyor olabilir)
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-900/50 text-gray-400 text-sm uppercase">
                            <tr>
                                <th className="p-4">Ad Soyad</th>
                                <th className="p-4">Kullanıcı Adı</th>
                                <th className="p-4">Rol</th>
                                <th className="p-4 text-right">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-700/50 transition-colors">
                                    <td className="p-4 font-medium text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
                                            <User className="w-4 h-4" />
                                        </div>
                                        {user.name}
                                    </td>
                                    <td className="p-4 text-gray-300">{user.username}</td>
                                    <td className="p-4">
                                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold uppercase">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Sil"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>

        {/* Add User Form */}
        <div>
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-[#C5A059]" />
                    Yeni Yönetici Ekle
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Ad Soyad</label>
                        <input 
                            type="text" 
                            required
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                            placeholder="Örn: Ahmet Yılmaz"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Kullanıcı Adı</label>
                        <input 
                            type="text" 
                            required
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                            placeholder="Örn: ahmet"
                            autoComplete="off"
                            value={formData.username}
                            onChange={e => setFormData({...formData, username: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Şifre</label>
                        <input 
                            type="password" 
                            required
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                            placeholder="******"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Rol</label>
                        <select 
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                            value={formData.role}
                            onChange={e => setFormData({...formData, role: e.target.value})}
                        >
                            <option value="admin">Admin (Tam Yetki)</option>
                            <option value="editor">Editör (Kısıtlı)</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-[#C5A059] hover:bg-[#b08e4f] text-white font-bold py-3 rounded-xl transition-all mt-4 shadow-lg shadow-[#C5A059]/20"
                    >
                        Yönetici Ekle
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}
