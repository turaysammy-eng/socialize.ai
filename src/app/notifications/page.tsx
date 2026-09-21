import { createClient } from "@/lib/supabase/server";
import { Bell, CheckCircle2 } from "lucide-react";

export default async function NotificationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: notificationsData } = user
    ? await supabase
        .from("notifications")
        .select("*")
        .eq("recipient_id", user.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  const notifications = (notificationsData || []) as Array<{
    id: string;
    type: string;
    read_at: string | null;
    created_at: string;
  }>;

  return (
    <main className="flex-1 p-6 md:p-10 space-y-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
        <Bell className="h-8 w-8 text-yellow-400" />
        <div>
          <h1 className="text-3xl font-extrabold text-white">Notifications</h1>
          <p className="text-gray-400 text-sm">Stay updated on project invites, discussion replies, and mentions.</p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-gray-800 rounded-2xl text-gray-400 space-y-3">
            <CheckCircle2 className="h-10 w-10 text-gray-600 mx-auto" />
            <p className="text-base font-medium text-gray-300">All caught up!</p>
            <p className="text-sm">You have no unread notifications at this time.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-between">
              <span className="text-sm text-gray-200">{item.type}</span>
              <span className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</span>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
