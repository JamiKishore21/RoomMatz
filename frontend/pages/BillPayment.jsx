import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BillPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hostelName, roomType, price, roomId } = location.state || {};

  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  useEffect(() => {
    // Set the current date when the page loads
    const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setPaymentDate(currentDate);

    // Pre-fill email from logged-in user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email) {
        setEmail(user.email);
      }
      if (user.name) {
        setStudentName(user.name);
      }
    }
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!studentName || !transactionId || !email) {
      alert("Please enter all details including email.");
      return;
    }

    setIsProcessing(true);

    const paymentData = {
      studentName,
      hostelName,
      roomType,
      price,
      paymentMethod,
      transactionId,
      paymentDate,
      email, // Now required
      roomId: roomId || undefined, // Optional - needed for booking
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/save-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.booking) {
          alert("Payment recorded! Your booking is pending admin approval. You will receive confirmation soon.");
        } else {
          alert("Payment recorded! Booking details coming soon.");
        }
        navigate("/"); // Redirect to home page
      } else {
        alert("Failed to save payment: " + data.message);
      }
    } catch (error) {
      console.error("Error saving payment:", error);
      alert("Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        background: 'rgba(31, 41, 55, 0.9)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        padding: '40px',
        animation: 'slideIn 0.3s'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>💳</div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: 'white',
            margin: 0,
            marginBottom: '8px'
          }}>
            Complete Your Booking
          </h2>
          <p style={{ color: '#d1d5db', fontSize: '14px', margin: 0 }}>
            Secure payment to confirm your reservation
          </p>
        </div>

        <form onSubmit={handlePayment}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#e5e7eb',
              marginBottom: '8px'
            }}>
              Student/Guest Name
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your full name"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                transition: 'all 0.3s',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4a3a52';
                e.target.style.boxShadow = '0 0 0 3px rgba(74, 58, 82, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d9cfe5';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#e5e7eb',
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                transition: 'all 0.3s',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4a3a52';
                e.target.style.boxShadow = '0 0 0 3px rgba(74, 58, 82, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d9cfe5';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          {/* Booking Details */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '12px',
              margin: 0
            }}>
              📋 Booking Details
            </h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '8px', marginBottom: '4px' }}>
              <span style={{ color: '#d1d5db' }}>Hostel:</span>
              <span style={{ fontWeight: '600', color: 'white' }}>{hostelName || 'RoomMatz'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span style={{ color: '#d1d5db' }}>Room Type:</span>
              <span style={{ fontWeight: '600', color: 'white', textTransform: 'capitalize' }}>{roomType}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '16px',
              fontWeight: '700',
              paddingTop: '8px',
              borderTop: '1px solid #d9cfe5',
              marginTop: '8px'
            }}>
              <span style={{ color: '#d1d5db' }}>Price:</span>
              <span style={{ color: '#60a5fa' }}>₹{price}</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#e5e7eb',
              marginBottom: '8px'
            }}>
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: 'rgba(255, 255, 255, 0.1)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4a3a52';
                e.target.style.boxShadow = '0 0 0 3px rgba(74, 58, 82, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d9cfe5';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="UPI">💳 UPI</option>
              <option value="Credit Card">💳 Credit Card</option>
              <option value="Debit Card">💳 Debit Card</option>
              <option value="Net Banking">🏦 Net Banking</option>
              <option value="Cash">💵 Cash</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#e5e7eb',
              marginBottom: '8px'
            }}>
              Transaction ID
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter your transaction ID"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                transition: 'all 0.3s',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4a3a52';
                e.target.style.boxShadow = '0 0 0 3px rgba(74, 58, 82, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d9cfe5';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#e5e7eb',
              marginBottom: '8px'
            }}>
              Payment Date
            </label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #d9cfe5',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                cursor: 'pointer',
                transition: 'all 0.3s',
                color: '#4a3a52'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4a3a52';
                e.target.style.boxShadow = '0 0 0 3px rgba(74, 58, 82, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d9cfe5';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #4a3a52 0%, #6b5b72 100%)',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(74, 58, 82, 0.2)',
              opacity: isProcessing ? 0.7 : 1
            }}
            disabled={isProcessing}
            onMouseEnter={(e) => {
              if (!isProcessing) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 25px rgba(74, 58, 82, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(74, 58, 82, 0.2)';
            }}
          >
            {isProcessing ? '⏳ Processing...' : '✓ Submit Payment'}
          </button>
        </form>

        <p style={{
          fontSize: '12px',
          color: '#9ca3af',
          textAlign: 'center',
          marginTop: '16px'
        }}>
          🔒 Your payment information is secure and encrypted
        </p>
      </div>
    </div>
  );
}
