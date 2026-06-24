import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid, ResponsiveContainer } from 'recharts';

const COLORS = {
  housing: '#E07068',
  food: '#78C8A0',
  utilities: '#70A8C8',
  transport: '#90C060',
  entertainment: '#C8A840',
  salary: '#A890D0',
  other: '#A89070',
};

function getColor(category) {
  return COLORS[category] ?? COLORS.other;
}

const tooltipStyle = {
  background: '#242018',
  border: '1px solid #33302A',
  color: '#E8DCC8',
  fontSize: '13px',
  fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
};

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
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 12, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2C2822" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#635A48', fontSize: 11, fontFamily: 'system-ui' }}
            axisLine={{ stroke: '#33302A' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: '#635A48', fontSize: 11, fontFamily: 'system-ui' }}
            axisLine={false}
            tickLine={false}
            width={58}
          />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}`, 'Spent']}
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#BCA98E', marginBottom: '2px' }}
            cursor={{ fill: 'rgba(212, 168, 83, 0.06)' }}
          />
          <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={56}>
            {data.map(entry => (
              <Cell key={entry.name} fill={getColor(entry.name)} opacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
