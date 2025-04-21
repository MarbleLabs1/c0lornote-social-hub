
import { NotificationsList } from "@/components/notifications/NotificationsList";

export default function Notifications() {
  return (
    <div className="container max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <NotificationsList />
    </div>
  );
}
