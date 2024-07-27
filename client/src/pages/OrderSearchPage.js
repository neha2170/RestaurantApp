import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderSearchPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);
  // Fetch token
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken);
    setIsTokenSet(true);
  }, []);

  useEffect(() => {
    if (isTokenSet && token) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get('http://localhost:5000/v1/order/all-orders?status=PENDING&is_cash=false', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setOrders(response.data.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [isTokenSet, token]);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order._id} style={styles.card}>
            <h2 style={styles.cardTitle}>Order ID: {order._id}</h2>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Is Cash:</strong> {order.is_cash ? 'Yes' : 'No'}</p>
            <div style={styles.itemsContainer}>
              <h3 style={styles.itemsTitle}>Items:</h3>
              {order.items.map(item => (
                <div key={item._id} style={styles.itemCard}>
                  <p><strong>Item:</strong> {item.menu_item.name}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Status:</strong> {item.status}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div style={styles.noOrders}>No orders found</div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#333',
    padding: '20px',
    width: '100%'
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%', // Adjust width as needed
    maxWidth: '600px',
     boxSizing: 'border-box'
  },
  cardTitle: {
    margin: '0 0 10px 0',
    fontSize: '24px',
  },
  itemsContainer: {
    marginTop: '20px',
  },
  itemsTitle: {
    margin: '0 0 10px 0',
    fontSize: '18px',
  },
  itemCard: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
  },
  noOrders: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
    padding: '20px',
  },
};

export default OrderSearchPage;
