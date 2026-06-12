"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MailIcon,
  MessageSquareIcon,
  RefreshCwIcon,
  TrashIcon,
  ReplyIcon,
} from "lucide-react";

interface Message {
  _id: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function TestMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/contact");
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
      fetchMessages();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((msg) => (msg._id === id ? { ...msg, status } : msg)),
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const replyToMessage = (msg: Message) => {
    const subject = encodeURIComponent("Re: Your message");
    const body = encodeURIComponent(
      `Hi,\n\nThank you for reaching out!\n\nYour original message:\n"${msg.message}"\n\nBest regards`,
    );
    window.open(`mailto:${msg.email}?subject=${subject}&body=${body}`);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const statusStyles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    read: "bg-blue-100 text-blue-800",
    replied: "bg-green-100 text-green-800",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Contact Messages
              </h1>
              <p className="text-gray-500 mt-1">
                Total: {messages.length} messages
              </p>
            </div>
            <button
              onClick={fetchMessages}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              <RefreshCwIcon size={18} />
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <MessageSquareIcon
              className="mx-auto text-gray-400 mb-3"
              size={48}
            />
            <p className="text-gray-500">
              No messages yet. Submit the contact form!
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 text-emerald-600 hover:underline"
            >
              Go to Contact Form
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg._id} className="bg-white rounded-lg shadow-sm p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <MailIcon className="text-emerald-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {msg.email}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => replyToMessage(msg)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 text-sm font-medium transition-colors"
                    >
                      <ReplyIcon size={15} />
                      Reply
                    </button>
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="text-gray-400 hover:text-red-600 p-1.5"
                    >
                      <TrashIcon size={18} />
                    </button>
                  </div>
                </div>

                {/* Message Body */}
                <p className="text-gray-700 whitespace-pre-wrap mb-4">
                  {msg.message}
                </p>

                {/* Footer: Status Badge + Dropdown */}
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      statusStyles[msg.status] ?? "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.status}
                  </span>

                  <select
                    value={msg.status}
                    onChange={(e) => updateStatus(msg._id, e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-2 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
