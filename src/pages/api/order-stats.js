import dbConnect from '@/src/lib/dbConnect';
import Order from '@/src/models/Order';

function getWeekOfMonth(date) {
  const d = new Date(date);
  const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
  return Math.ceil((d.getDate() + firstDay.getDay()) / 7);
}

export default async function handler(req, res) {
  await dbConnect();
  const { type } = req.query; // 'week', 'month', 'year'
  try {
    const orders = await Order.find({});
    if (!orders.length) return res.status(200).json({ week: [], month: [], year: [] });

    // Week-wise (current month)
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const weekStats = [1, 2, 3, 4].map(week => ({ label: `Week ${week}`, orders: 0, revenue: 0 }));
    orders.forEach(order => {
      const d = new Date(order.date);
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        const week = getWeekOfMonth(d) - 1;
        if (weekStats[week]) {
          weekStats[week].orders += 1;
          weekStats[week].revenue += Number(order.amount) || 0;
        }
      }
    });

    // Month-wise (current year)
    const monthStats = Array.from({ length: 12 }, (_, i) => ({ label: new Date(0, i).toLocaleString('default', { month: 'short' }), orders: 0, revenue: 0 }));
    orders.forEach(order => {
      const d = new Date(order.date);
      if (d.getFullYear() === currentYear) {
        const m = d.getMonth();
        monthStats[m].orders += 1;
        monthStats[m].revenue += Number(order.amount) || 0;
      }
    });

    // Year-wise (last 4 years)
    const years = [currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
    const yearStats = years.map(y => ({ label: y.toString(), orders: 0, revenue: 0 }));
    orders.forEach(order => {
      const d = new Date(order.date);
      const idx = years.indexOf(d.getFullYear());
      if (idx !== -1) {
        yearStats[idx].orders += 1;
        yearStats[idx].revenue += Number(order.amount) || 0;
      }
    });

    return res.status(200).json({ week: weekStats, month: monthStats, year: yearStats });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
} 