import { useState, useMemo } from 'react';

// --- Types ---
interface RoleData {
  baseSalary: number;
  bonusPercent: number;
  retirementPercent: number;
  dailyHours: number;
  holidays: number;
  ptoDays: number;
}

interface CalculatedMetrics {
  totalComp: number;
  totalHours: number;
  hourlyRate: number;
}

// --- Constants ---
const WEEKDAYS_IN_YEAR = 260;

// --- UI Components ---
function InputGroup({
  label,
  value,
  onChange,
  symbol,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  symbol?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
      <label style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '4px', color: 'var(--text-1)' }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-2)' }}>
        {symbol === '$' && <span style={{ marginRight: '4px' }}>$</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{ padding: '6px', width: '100%', borderRadius: 'var(--radius-sm)', border: 'var(--border-1)', backgroundColor: 'var(--bg-1)', color: 'var(--text-1)' }}
        />
        {symbol === '%' && <span style={{ marginLeft: '4px' }}>%</span>}
      </div>
    </div>
  );
}

function Bar({ label, value, max, formatFn, color }: any) {
  const widthPct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.9rem' }}>
        <span>{label}</span>
        <strong>{formatFn(value)}</strong>
      </div>
      <div style={{ width: '100%', backgroundColor: 'var(--border-tint)', height: '24px', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
        <div
          style={{
            width: `${widthPct}%`,
            backgroundColor: color,
            height: '100%',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}

export default function CompensationCalculator() {
  // --- State Initialization ---
  const [currentRole, setCurrentRole] = useState<RoleData>({
    baseSalary: 109500,
    bonusPercent: 2,
    retirementPercent: 6,
    dailyHours: 7.5,
    holidays: 14,
    ptoDays: 30,
  });

  const [newRole, setNewRole] = useState<RoleData>({
    baseSalary: 108500,
    bonusPercent: 3,
    retirementPercent: 4,
    dailyHours: 9,
    holidays: 6,
    ptoDays: 10,
  });

  // Counter Offer State (Driven by sliders)
  const [counterPto, setCounterPto] = useState<number>(30); // Default 6 weeks ask
  const [counterBase, setCounterBase] = useState<number>(134388); // Default break-even starting point

  // --- Calculation Logic ---
  const calculateMetrics = (data: RoleData): CalculatedMetrics => {
    const bonusValue = data.baseSalary * (data.bonusPercent / 100);
    const retirementValue = data.baseSalary * (data.retirementPercent / 100);
    const totalComp = data.baseSalary + bonusValue + retirementValue;

    const daysWorked = WEEKDAYS_IN_YEAR - data.holidays - data.ptoDays;
    const totalHours = daysWorked * data.dailyHours;

    const hourlyRate = totalHours > 0 ? totalComp / totalHours : 0;

    return { totalComp, totalHours, hourlyRate };
  };

  const currentMetrics = calculateMetrics(currentRole);
  const newMetrics = calculateMetrics(newRole);

  // Calculate Counter Offer Metrics
  const counterRoleData: RoleData = {
    ...newRole, // Inherit hours, holidays, and benefit % from the new role
    baseSalary: counterBase,
    ptoDays: counterPto,
  };
  const counterMetrics = calculateMetrics(counterRoleData);

  // --- Gap Math (The Break-Even Point) ---
  const breakEvenCalculations = useMemo(() => {
    const targetHourly = currentMetrics.hourlyRate;
    const counterHours = (WEEKDAYS_IN_YEAR - newRole.holidays - counterPto) * newRole.dailyHours;
    const targetTotalComp = counterHours * targetHourly;
    const benefitMultiplier = 1 + (newRole.bonusPercent / 100) + (newRole.retirementPercent / 100);
    const exactBreakEvenBase = targetTotalComp / benefitMultiplier;
    
    return {
      targetTotalComp,
      exactBreakEvenBase,
      baseGap: exactBreakEvenBase - newRole.baseSalary
    };
  }, [currentMetrics.hourlyRate, newRole, counterPto]);

  // --- Handlers ---
  const handleCurrentChange = (field: keyof RoleData, value: number) => {
    setCurrentRole((prev) => ({ ...prev, [field]: value || 0 }));
  };

  const handleNewChange = (field: keyof RoleData, value: number) => {
    setNewRole((prev) => ({ ...prev, [field]: value || 0 }));
  };

  const snapToBreakEven = () => {
    setCounterBase(Math.round(breakEvenCalculations.exactBreakEvenBase));
  };

  // --- Chart Helpers ---
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const formatNumber = (val: number) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val);

  // Find max values for chart scaling
  const maxComp = Math.max(currentMetrics.totalComp, newMetrics.totalComp, counterMetrics.totalComp);
  const maxHours = Math.max(currentMetrics.totalHours, newMetrics.totalHours, counterMetrics.totalHours);
  const maxRate = Math.max(currentMetrics.hourlyRate, newMetrics.hourlyRate, counterMetrics.hourlyRate);

  return (
    <div style={{ fontFamily: 'var(--text-font)', color: 'var(--text-1)', maxWidth: '950px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-1)' }}>Compensation & Time Calculator</h2>

      {/* Forms Section */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
        
        {/* Current Role Form */}
        <div style={{ flex: '1 1 300px', padding: '20px', border: 'var(--border-1)', borderRadius: 'var(--radius)', backgroundColor: 'var(--bg-2)', boxShadow: 'var(--shadow-1)' }}>
          <h3 style={{ marginTop: 0, color: 'var(--text-1)' }}>Current Role</h3>
          <InputGroup label="Base Salary" value={currentRole.baseSalary} symbol="$" onChange={(val) => handleCurrentChange('baseSalary', val)} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}><InputGroup label="Bonus" value={currentRole.bonusPercent} symbol="%" onChange={(val) => handleCurrentChange('bonusPercent', val)} /></div>
            <div style={{ flex: 1 }}><InputGroup label="401k Match" value={currentRole.retirementPercent} symbol="%" onChange={(val) => handleCurrentChange('retirementPercent', val)} /></div>
          </div>
          <hr style={{ margin: '20px 0', border: 'none', borderTop: 'var(--border-1)' }} />
          <InputGroup label="Daily Hours" value={currentRole.dailyHours} onChange={(val) => handleCurrentChange('dailyHours', val)} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}><InputGroup label="Holidays" value={currentRole.holidays} onChange={(val) => handleCurrentChange('holidays', val)} /></div>
            <div style={{ flex: 1 }}><InputGroup label="PTO (Days)" value={currentRole.ptoDays} onChange={(val) => handleCurrentChange('ptoDays', val)} /></div>
          </div>
        </div>

        {/* New Role Form */}
        <div style={{ flex: '1 1 300px', padding: '20px', border: 'var(--border-1)', borderRadius: 'var(--radius)', backgroundColor: 'var(--bg-2)', boxShadow: 'var(--shadow-1)' }}>
          <h3 style={{ marginTop: 0, color: 'var(--my-orange)' }}>New Role Offer</h3>
          <InputGroup label="Base Salary" value={newRole.baseSalary} symbol="$" onChange={(val) => handleNewChange('baseSalary', val)} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}><InputGroup label="Bonus" value={newRole.bonusPercent} symbol="%" onChange={(val) => handleNewChange('bonusPercent', val)} /></div>
            <div style={{ flex: 1 }}><InputGroup label="401k Match" value={newRole.retirementPercent} symbol="%" onChange={(val) => handleNewChange('retirementPercent', val)} /></div>
          </div>
          <hr style={{ margin: '20px 0', border: 'none', borderTop: 'var(--border-1)' }} />
          <InputGroup label="Daily Hours" value={newRole.dailyHours} onChange={(val) => handleNewChange('dailyHours', val)} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}><InputGroup label="Holidays" value={newRole.holidays} onChange={(val) => handleNewChange('holidays', val)} /></div>
            <div style={{ flex: 1 }}><InputGroup label="PTO (Days)" value={newRole.ptoDays} onChange={(val) => handleNewChange('ptoDays', val)} /></div>
          </div>
        </div>
      </div>

      {/* Gap Closer / Counter Offer Section */}
      <div style={{ padding: '25px', border: 'var(--border-1)', borderRadius: 'var(--radius)', backgroundColor: 'var(--bg-1)', boxShadow: 'var(--shadow-1)', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, color: 'var(--text-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Gap Closer / Counter Offer
          <span style={{ fontSize: '0.9rem', fontWeight: 'normal', backgroundColor: 'var(--bg-2)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: 'var(--border-1)' }}>
            Target Hourly Rate: <strong>{formatCurrency(currentMetrics.hourlyRate)}/hr</strong>
          </span>
        </h3>
        
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginTop: '20px' }}>
          {/* Sliders */}
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '10px' }}>
                <span>Negotiated PTO Ask:</span>
                <span style={{ color: 'var(--my-green)' }}>{counterPto} Days ({counterPto / 5} weeks)</span>
              </label>
              <input 
                type="range" min="0" max="60" step="1" 
                value={counterPto} 
                onChange={(e) => setCounterPto(parseInt(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '10px' }}>
                <span>Negotiated Base Salary Ask:</span>
                <span style={{ color: 'var(--my-green)' }}>{formatCurrency(counterBase)}</span>
              </label>
              <input 
                type="range" min="100000" max="160000" step="500" 
                value={counterBase} 
                onChange={(e) => setCounterBase(parseInt(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Gap Math Readout */}
          <div style={{ flex: '1 1 300px', backgroundColor: 'var(--bg-2)', padding: '15px', borderRadius: 'var(--radius-sm)', border: 'var(--border-1)' }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-1)' }}>The Math to Break Even</h4>
            <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>If you take <strong>{counterPto} days</strong> of PTO, you will work <strong>{formatNumber((WEEKDAYS_IN_YEAR - newRole.holidays - counterPto) * newRole.dailyHours)} hours</strong>.</p>
            <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>To match your current value, I need <strong>{formatCurrency(breakEvenCalculations.targetTotalComp)}</strong> in total comp.</p>
            <hr style={{ margin: '15px 0', border: 'none', borderTop: 'var(--border-1)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-2)' }}>Required Base Salary:</div>
                <strong style={{ fontSize: '1.2rem', color: 'var(--text-1)' }}>{formatCurrency(breakEvenCalculations.exactBreakEvenBase)}</strong>
              </div>
              <button 
                onClick={snapToBreakEven}
                style={{ backgroundColor: 'var(--item-2)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Snap to Break-Even
              </button>
            </div>
            <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--cherry)', fontWeight: 'bold' }}>
              Base Salary Gap: +{formatCurrency(breakEvenCalculations.baseGap)}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Breakdown Section */}
      <div style={{ padding: '20px', border: 'var(--border-1)', borderRadius: 'var(--radius)', backgroundColor: 'var(--bg-2)', boxShadow: 'var(--shadow-1)' }}>
        <h3 style={{ marginTop: 0, color: 'var(--text-1)', borderBottom: 'var(--border-section)', paddingBottom: '10px' }}>Visual Metrics Breakdown</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginTop: '20px' }}>
          
          {/* Total Compensation Chart */}
          <div>
            <h4 style={{ color: 'var(--text-2)' }}>Total Compensation</h4>
            <Bar label="Current Role" value={currentMetrics.totalComp} max={maxComp} formatFn={formatCurrency} color="var(--item-2)" />
            <Bar label="New Role" value={newMetrics.totalComp} max={maxComp} formatFn={formatCurrency} color="var(--my-orange)" />
            <Bar label="Your Counter" value={counterMetrics.totalComp} max={maxComp} formatFn={formatCurrency} color="var(--my-green)" />
          </div>

          {/* Total Hours Chart */}
          <div>
            <h4 style={{ color: 'var(--text-2)' }}>Total Hours Worked / Year</h4>
            <Bar label="Current Role" value={currentMetrics.totalHours} max={maxHours} formatFn={(v: number) => `${formatNumber(v)} hrs`} color="var(--item-2)" />
            <Bar label="New Role" value={newMetrics.totalHours} max={maxHours} formatFn={(v: number) => `${formatNumber(v)} hrs`} color="var(--my-orange)" />
            <Bar label="Your Counter" value={counterMetrics.totalHours} max={maxHours} formatFn={(v: number) => `${formatNumber(v)} hrs`} color="var(--my-green)" />
          </div>

          {/* Effective Hourly Rate Chart */}
          <div>
            <h4 style={{ color: 'var(--text-2)' }}>Effective Hourly Rate</h4>
            <Bar label="Current Role" value={currentMetrics.hourlyRate} max={maxRate} formatFn={(v: number) => `${formatCurrency(v)} / hr`} color="var(--item-2)" />
            <Bar label="New Role" value={newMetrics.hourlyRate} max={maxRate} formatFn={(v: number) => `${formatCurrency(v)} / hr`} color="var(--cherry)" />
            <Bar label="Your Counter" value={counterMetrics.hourlyRate} max={maxRate} formatFn={(v: number) => `${formatCurrency(v)} / hr`} color="var(--my-green)" />
          </div>

        </div>
      </div>
    </div>
  );
}