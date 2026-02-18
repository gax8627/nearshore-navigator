import { FileText, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

// Stat card component
function StatCard({ 
  title, value, subtitle, icon: Icon, href, color 
}: { 
  title: string; value: string | number; subtitle: string; 
  icon: React.ElementType; href: string; color: string;
}) {
  return (
    <Link href={href} className="group">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-black/20">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
        </div>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-sm text-gray-400 mt-1">{title}</p>
        <p className="text-xs text-gray-600 mt-2">{subtitle}</p>
      </div>
    </Link>
  );
}

export default async function AdminDashboard() {
  // TODO: Fetch real data from DB when connected
  const stats = {
    posts: { total: 4, published: 4 },
    leads: { total: 0, new: 0 },
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Command Center</h1>
        <p className="text-gray-400 mt-1">Welcome to the Iron Fortress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Blog Posts"
          value={stats.posts.total}
          subtitle={`${stats.posts.published} published`}
          icon={FileText}
          href="/admin/posts"
          color="bg-blue-500/20 text-blue-400"
        />
        <StatCard
          title="Total Leads"
          value={stats.leads.total}
          subtitle={`${stats.leads.new} new this week`}
          icon={Users}
          href="/admin/leads"
          color="bg-green-500/20 text-green-400"
        />
        <StatCard
          title="Campaigns"
          value="Active"
          subtitle="Daily Cron at 9am PST"
          icon={TrendingUp}
          href="/admin/settings"
          color="bg-purple-500/20 text-purple-400"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/admin/posts/new"
            className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors border border-gray-700 hover:border-primary-500/50"
          >
            <FileText className="w-5 h-5 text-primary-400" />
            <div>
              <p className="text-sm font-medium text-white">Write New Post</p>
              <p className="text-xs text-gray-500">Create a blog article</p>
            </div>
          </Link>
          <Link
            href="/admin/leads"
            className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors border border-gray-700 hover:border-primary-500/50"
          >
            <Users className="w-5 h-5 text-primary-400" />
            <div>
              <p className="text-sm font-medium text-white">View Leads</p>
              <p className="text-xs text-gray-500">Check form submissions</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Setup Notice */}
      {!process.env.POSTGRES_URL && (
        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-yellow-400 mb-2">⚙️ Setup Required</h3>
          <p className="text-sm text-yellow-300/80">
            Connect a Vercel Postgres database to enable real-time data. 
            Go to Vercel Dashboard → Storage → Create Postgres Database.
          </p>
        </div>
      )}
    </div>
  );
}
