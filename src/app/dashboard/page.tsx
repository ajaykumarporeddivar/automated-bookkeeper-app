'use client'
import { STATISTICS } from '@/lib/data';
import {
  StatCard,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Avatar,
  Table,
  Button,
} from '@/components/ui';
import { BarChart, Sparkline } from '@/components/charts';
import { AppHeader } from '@/components/layout';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  const [selectedRow, setSelectedRow] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <AppHeader
        title="Dashboard"
        subtitle={`Good morning, ${STATISTICS.DEMO_USER.name}`}
        actions={
          <Button size="sm">
            + New Customer
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            value={
              <div className="flex items-center">
                <Badge variant="info" className="mr-2">
                  $10,000
                </Badge>
                <span>Total Revenue</span>
              </div>
            }
            description="Total revenue earned by the company"
            footer={
              <div className="flex items-center justify-between">
                <Sparkline data={STATISTICS.SPARKLINE_DATA} />
                <div className="flex items-center text-zinc-400">
                  <LucideIcon name="chart-line" size={12} />
                  <span className="ml-1">Last month</span>
                </div>
              </div>
            }
            className="w-40"
          />
          <StatCard
            value={
              <div className="flex items-center">
                <Badge variant="warning" className="mr-2">
                  200
                </Badge>
                <span>Active Users</span>
              </div>
            }
            description="Number of active users of the product"
            footer={
              <div className="flex items-center justify-between">
                <Sparkline data={STATISTICS.SPARKLINE_DATA} />
                <div className="flex items-center text-zinc-400">
                  <LucideIcon name="chart-line" size={12} />
                  <span className="ml-1">Last month</span>
                </div>
              </div>
            }
            className="w-40"
          />
          <StatCard
            value={
              <div className="flex items-center">
                <Badge variant="error" className="mr-2">
                  -5%
                </Badge>
                <span>Customer Churn Rate</span>
              </div>
            }
            description="Percentage of customers that stopped using the product"
            footer={
              <div className="flex items-center justify-between">
                <Sparkline data={STATISTICS.SPARKLINE_DATA} />
                <div className="flex items-center text-zinc-400">
                  <LucideIcon name="chart-line" size={12} />
                  <span className="ml-1">Last month</span>
                </div>
              </div>
            }
            className="w-40"
          />
          <StatCard
            value={
              <div className="flex items-center">
                <Badge variant="success" className="mr-2">
                  500
                </Badge>
                <span>New Customers</span>
              </div>
            }
            description="Number of new customers acquired by the company"
            footer={
              <div className="flex items-center justify-between">
                <Sparkline data={STATISTICS.SPARKLINE_DATA} />
                <div className="flex items-center text-zinc-400">
                  <LucideIcon name="chart-line" size={12} />
                  <span className="ml-1">Last month</span>
                </div>
              </div>
            }
            className="w-40"
          />
        </div>
        <div className="flex-1 p-6">
          <section className="mb-6">
            <BarChart
              data={STATISTICS.CHART_DATA.weekly}
              labels={STATISTICS.CHART_DATA.labels}
              title="Domain Overview"
              subtitle="Last 12 weeks"
              className="max-w-2xl"
            />
          </section>
          <section>
            <h2 className="text-lg text-zinc-900">Recent Activity</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              {STATISTICS.RECENT_ACTIVITY.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center gap-3 py-2 border-b border-zinc-50 last:border-0">
                    <Avatar src={item.image} size="small" />
                    <span className="text-zinc-600">{item.name}</span>
                    <span className="text-zinc-400">{item.action}</span>
                    <span className="text-zinc-400 text-sm">{formatDate(item.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <main className="flex-1 p-6">
          <section>
            <h2 className="text-lg text-zinc-900">All Customers</h2>
            <Card>
              <CardHeader className="bg-zinc-50">
                <CardTitle>Customers</CardTitle>
                <div className="flex items-center justify-between">
                  <Button variant="primary">Export</Button>
                  <div className="flex items-center">
                    <input
                      type="search"
                      placeholder="Search for customers"
                      className="w-full px-4 py-2 text-zinc-600 placeholder:text-zinc-400 focus:ring-0 focus:ring-zinc-200 focus:border-zinc-200"
                    />
                    <LucideIcon name="search" size={16} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Phone</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STATISTICS.MOCK_CUSTOMERS.map((customer) => (
                      <tr key={customer.id}>
                        <td className="px-4 py-2">{customer.name}</td>
                        <td className="px-4 py-2">{customer.email}</td>
                        <td className="px-4 py-2">{customer.phone}</td>
 <td className="px-4 py-2">
                          <Badge variant="success">Active</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
      <footer className="fixed bottom-4 right-4">
        <Button variant="primary" size="xs">
          New Customer
        </Button>
        <div className="text-zinc-400 text-sm mt-2">
          Showing 1-10 of 20 customers
        </div>
      </footer>
    </>
  );
}