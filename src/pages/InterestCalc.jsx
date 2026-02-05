import { useState } from 'react';

export const InterestCalc = () => {
  // State for form inputs
  const [inputs, setInputs] = useState({
    principal: 10000,
    rate: 5.0,
    payment: 200
  });

  // State for the calculated results
  const [results, setResults] = useState({
    rows: [],
    summary: { totalPaid: 0, totalInterest: 0, totalMonths: 0 }
  });

  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  // Replicating the Python logic in JavaScript
  const handleCalculate = () => {
    let currentPrincipal = inputs.principal;
    const monthlyRate = inputs.rate / 100 / 12;
    const monthlyPayment = inputs.payment;
    
    let totalInterest = 0;
    let totalPaid = 0;
    let month = 1;
    const newRows = [];
    
    // Safety check: Is payment enough to cover interest?
    const firstMonthInterest = currentPrincipal * monthlyRate;
    if (monthlyPayment <= firstMonthInterest) {
      setError("Payment is too low! It doesn't cover the monthly interest, so the loan will never be paid off.");
      setResults({ rows: [], summary: { totalPaid: 0, totalInterest: 0, totalMonths: 0 } });
      return;
    }
    setError('');

    
    while (currentPrincipal > 0.01) {
        if (month > 600) break;

        const interestPayment = Math.round(currentPrincipal * monthlyRate * 100) / 100;
        let principalPayment = 0;
        let actualPayment = 0;

        // Logic for the final month
        if (currentPrincipal + interestPayment <= monthlyPayment) {
            actualPayment = currentPrincipal + interestPayment;
            principalPayment = currentPrincipal;
            currentPrincipal = 0;
        } else {
            actualPayment = monthlyPayment;
            principalPayment = monthlyPayment - interestPayment;
            currentPrincipal -= principalPayment;
        }

        totalInterest += interestPayment;
        totalPaid += actualPayment;

        newRows.push({
            month,
            actualPayment,
            principalPayment,
            interestPayment,
            remainingPrincipal: currentPrincipal
        });

        month++;
    }

    setResults({
        rows: newRows,
        summary: {
            totalPaid,
            totalInterest,
            totalMonths: month - 1
        }
    });
  };

  // CSS Styles Object
  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: 'var(--bg-1)',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    header: {
      textAlign: 'center',
      color: 'var(--text-1)',
      marginBottom: '20px',
    },
    formGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '15px',
      marginBottom: '20px',
      padding: '20px',
      backgroundColor: 'var(--bg-2)',
      borderRadius: '6px',
      border: '1px solid var(--border-1)',
    },
    inputWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '5px',
      fontSize: '0.9rem',
      color: 'var(--text-1)',
    },
    input: {
      padding: '10px',
      border: '1px solid var(--border-1)',
      borderRadius: '4px',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'var(--item-1)',
      color: 'var(--text-1)',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'background 0.3s',
    },
    error: {
      backgroundColor: 'var(--bg-error)',
      color: 'var(--red)',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    summaryBox: {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'var(--bg-3)',
        color: 'var(--text-1)',
        padding: '15px',
        borderRadius: '6px',
        marginBottom: '20px',
        marginTop: '20px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'var(--bg-2)',
      fontSize: '0.9rem',
    },
    th: {
      backgroundColor: 'var(--bg-2)',
      color: 'var(--text-1)',
      padding: '12px',
      textAlign: 'right',
      borderBottom: '2px solid var(--border-1)',
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid var(--border-1)',
      textAlign: 'right',
      color: 'var(--text-1)',
    },
    rowEven: {
        backgroundColor: 'var(--bg-1)'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Loan Amortization Calculator</h2>

      {/* Input Section */}
      <div style={styles.formGroup}>
        <div style={styles.inputWrapper}>
          <label style={styles.label}>Principal ($)</label>
          <input
            type="number"
            name="principal"
            value={inputs.principal}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputWrapper}>
          <label style={styles.label}>Interest Rate (%)</label>
          <input
            type="number"
            name="rate"
            value={inputs.rate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputWrapper}>
          <label style={styles.label}>Monthly Payment ($)</label>
          <input
            type="number"
            name="payment"
            value={inputs.payment}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <button 
        style={styles.button} 
        onClick={handleCalculate}
        onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
      >
        Calculate Schedule
      </button>

      {/* Summary Section */}
      {results.rows.length > 0 && (
        <>
          <div style={styles.summaryBox}>
              <div><strong>Total Paid:</strong> ${results.summary.totalPaid.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <div><strong>Total Interest:</strong> ${results.summary.totalInterest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <div><strong>Months to Pay Off:</strong> {results.summary.totalMonths}</div>
          </div>

          {/* Table Output */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{...styles.th, textAlign: 'center'}}>Month</th>
                <th style={styles.th}>Payment</th>
                <th style={styles.th}>Principal</th>
                <th style={styles.th}>Interest</th>
                <th style={styles.th}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {results.rows.map((row, index) => (
                <tr key={row.month} style={index % 2 === 0 ? styles.rowEven : {}}>
                  <td style={{...styles.td, textAlign: 'center'}}>#{row.month}</td>
                  <td style={styles.td}>${row.actualPayment.toFixed(2)}</td>
                  <td style={{...styles.td, color: '#27ae60', fontWeight: 'bold'}}>${row.principalPayment.toFixed(2)}</td>
                  <td style={{...styles.td, color: '#c0392b'}}>${row.interestPayment.toFixed(2)}</td>
                  <td style={styles.td}>${row.remainingPrincipal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};