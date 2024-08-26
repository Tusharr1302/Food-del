# **Food Delivery Website**
## **Overview**
Welcome to the Food Delivery Website! This project is a comprehensive, full-stack web application designed to provide a seamless food ordering experience. The website allows users to browse, order, and track food items, with features like real-time order tracking, secure payments, and cart management.

## **Features**
+ **Full CRUD Operations**: Users can browse available food items, add them to the cart, and place orders. Admins can manage the food inventory, update items, and handle user requests.

+ **Admin Panel**: A dedicated admin panel for managing food items, viewing order details, and monitoring user activities.

+ **User Authentication**: Secure user authentication to protect sensitive data and ensure a personalized user experience.

+ **Real-Time Order Tracking**: Users can track the status of their orders from placement to delivery, with live updates.

+ **Stripe Integration**: Secure payment processing with Stripe, ensuring that users can make payments safely and easily.

+ **Cart Management**: Users can manage their orders in the cart before proceeding to checkout.

### **Tech Stack**
**Frontend**:
HTML, CSS, React.js

**Backend**:
Node.js with Express.js, MongoDB

**Payment Integration**:
Stripe

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tushar1302/food-delivery-website.git
  
2. **Navigate to the Project Directory**

    Open your terminal and navigate to the project directory:

    ```bash
   cd food-delivery-website
3. **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
4. **Install backend dependencies:**
    ```bash
    cd backend
    npm install
5. **Set up environment variables: Create a .env file in the backend directory and add the following:**
    ```bash
    MONGODB_URI=your_mongodb_connection_string
    STRIPE_SECRET_KEY=your_stripe_secret_key
6. **Run the application:**
   * Start the backend server:
     ```bash
     
     cd backend
     npm run server
   * Start the frontend server:
     ```bash
     
     cd frontend
     npm run dev
7. **Access the website**: Open your browser and navigate to **http://localhost:3000** to use the application.


## **Usage**
 + **Users:**

   + Browse food items.
   + Add items to the cart.
   + Place orders and track them in real-time.
   + Make secure payments via Stripe.
+ **Admins:**

   + Manage food items, orders, and user details through the admin panel.

## **Contributing**
Contributions are welcome! If you have any suggestions or improvements, feel free to fork the repository and create a pull request.     

## **Contact**
For any questions or feedback, feel free to contact me at [tusharsrivastava1302@gmail.com].
