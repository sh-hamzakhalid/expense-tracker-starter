import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = {
  housing: '#FF6B6B',
  food: '#4ECDC4',
  utilities: '#45B7D1',
  transport: '#96CEB4',
  entertainment: '#FFEAA7',
  salary: '#C3A6FF',
  other: '#A8E6CF',
};

function getColor(category) {
  return COLORS[category] ?? COLORS.other;
}

export default function SpendingChart({ transactions }) {
  const data = Object.entries(
    transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] ?? 0) + t.amount;
        return acc;
      }, {})
  ).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
          <XAxis dataKey="name" tick={{ fontSize: 13 }} />
          <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12 }} width={60} />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map(entry => (
              <Cell key={entry.name} fill={getColor(entry.name)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
