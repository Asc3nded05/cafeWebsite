import { useState, useEffect } from "react";
import NavigationAdmin from "../components/NavigationAdmin";

export default function Orders() {
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Orders page loaded");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
    }, []); // Fetch orders on component mount

    function getOrders() {
        fetch('http://localhost:5000/api/orders', { // Assuming your orders endpoint is /api/orders
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error retrieving orders');
                }
            })
            .then((data) => {
                setOrders(data);
                console.log("Orders data:", data);
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    return (
        <>
          <NavigationAdmin />
          <h1>Orders</h1>
          <div>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.orderId}>
                  <h3>Order ID: {order.orderId}</h3>
                  <p>Customer Name: {order.customerName}</p>
                  <p>Order Date: {order.orderDate}</p>
    
                  <h4>Items:</h4>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.itemName} - Price: {item.price}
                        {item.options && Object.keys(item.options).length > 0 && (
                          <ul>
                            {Object.entries(item.options).map(([key, value]) => (
                              <li key={key}>
                                {key}: {typeof value === 'object' ? JSON.stringify(value) : (Array.isArray(value) ? value.join(', ') : value)}
                              </li>
                            ))}
                          </ul>
                        )}
                        {item.comment && <p>Comment: {item.comment}</p>}
                      </li>
                    ))}
                  </ul>
                  <p>Total Amount: ${order.totalAmount}</p>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </>
      );
    }