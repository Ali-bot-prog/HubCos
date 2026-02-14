"use client";

import { useState, useEffect } from "react";
import { Search, Mail, Phone, Calendar, CheckCircle, Clock, Trash2 } from "lucide-react";
import { Message } from "@/lib/messages";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
        const res = await fetch('/api/messages', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, action: 'markRead' })
        });
        if (res.ok) {
            setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
        }
    } catch (err) {
        alert("İşlem başarısız.");
    }
  };

  const handleDelete = async (id: string) => {
      if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
      try {
          const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
          if (res.ok) {
              setMessages(messages.filter(m => m.id !== id));
          }
      } catch (err) {
          alert("Silinemedi.");
      }
  };

  const filteredMessages = messages.filter(msg => {
      if (filter === "read" && !msg.read) return false;
      if (filter === "unread" && msg.read) return false;
      if (search && !msg.name.toLowerCase().includes(search.toLowerCase()) && !msg.subject.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
  });

  return (
    <div>
        <div className="flex justify-between items-center mb-8">
            <div>
            <h1 className="text-3xl font-bold mb-2">Gelen Mesajlar</h1>
            <p className="text-gray-400">Web sitesinden gelen iletişim formları.</p>
            </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-gray-800 p-4 rounded-xl mb-6 flex gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Mesajlarda ara..." 
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#C5A059]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <select 
                className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-[#C5A059]"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="all">Tümü</option>
                <option value="unread">Okunmamış</option>
                <option value="read">Okunmuş</option>
            </select>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
            {loading ? <p className="text-gray-400 text-center py-8">Yükleniyor...</p> : 
             filteredMessages.length === 0 ? <p className="text-gray-400 text-center py-8">Mesaj bulunamadı.</p> :
             filteredMessages.map((msg) => (
                <div key={msg.id} className={`bg-gray-800 rounded-xl p-6 border ${msg.read ? 'border-gray-700' : 'border-[#C5A059]'} hover:bg-gray-750 transition-colors`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.read ? 'bg-gray-700 text-gray-400' : 'bg-[#C5A059] text-white'}`}>
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className={`font-bold text-lg ${msg.read ? 'text-gray-300' : 'text-white'}`}>{msg.name}</h3>
                                <p className="text-sm text-gray-400">{msg.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {msg.read ? "Okundu" : "Yeni"} - {msg.date}
                        </div>
                    </div>
                    
                    <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
                        <h4 className="font-bold text-gray-300 mb-2">{msg.subject}</h4>
                        <p className="text-gray-400 leading-relaxed">{msg.message}</p>
                    </div>

                    <div className="flex justify-between items-center">
                         <div className="flex items-center gap-2 text-sm text-gray-500">
                             <Phone className="w-4 h-4" />
                             {msg.phone || "-"}
                         </div>
                         <div className="flex gap-2">
                             <button 
                                 onClick={() => handleDelete(msg.id)}
                                 className="px-4 py-2 rounded-lg text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors flex items-center gap-2"
                             >
                                 <Trash2 className="w-4 h-4" />
                                 Sil
                             </button>
                             <button 
                                 onClick={() => !msg.read && handleMarkRead(msg.id)}
                                 disabled={msg.read}
                                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                     msg.read 
                                     ? 'text-gray-500 bg-gray-700 cursor-default' 
                                     : 'text-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059]/20'
                                 }`}
                             >
                                 {msg.read ? (
                                     <>
                                        <CheckCircle className="w-4 h-4" />
                                        Okundu
                                     </>
                                 ) : (
                                     <>
                                        <Clock className="w-4 h-4" />
                                        Okudum
                                    </>
                                 )}
                             </button>
                         </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
