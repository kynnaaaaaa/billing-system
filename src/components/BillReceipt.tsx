
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, MapPin, Phone, Smartphone, CreditCard, Banknote } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface BillItem {
  item: MenuItem;
  quantity: number;
}

interface BillReceiptProps {
  billItems: BillItem[];
  totalAmount: number;
  paymentMethod: string;
  onNewOrder: () => void;
}

const BillReceipt: React.FC<BillReceiptProps> = ({ 
  billItems, 
  totalAmount, 
  paymentMethod, 
  onNewOrder 
}) => {
  const orderNumber = Math.floor(Math.random() * 10000) + 1000;
  const currentTime = new Date().toLocaleString();
  const tax = Math.round(totalAmount * 0.05);
  const grandTotal = totalAmount + tax;

  const getPaymentIcon = () => {
    switch (paymentMethod) {
      case 'card':
        return <CreditCard className="w-4 h-4 text-blue-600" />;
      case 'upi':
        return <Smartphone className="w-4 h-4 text-purple-600" />;
      default:
        return <Banknote className="w-4 h-4 text-green-600" />;
    }
  };

  const getPaymentLabel = () => {
    switch (paymentMethod) {
      case 'card':
        return 'Card Payment';
      case 'upi':
        return 'UPI Payment';
      default:
        return 'Cash Payment';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto bg-white shadow-2xl animate-scale-in">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="text-6xl mb-2 animate-bounce">🍔</div>
            <CardTitle className="text-2xl font-bold">McDonald's Bill Buddy</CardTitle>
            <p className="text-red-100">I'm Lovin' It!</p>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          {/* Confetti Animation */}
          <div className="text-center mb-4">
            <div className="text-4xl animate-bounce">🎉</div>
            <div className="text-lg font-bold text-green-600 animate-pulse">Order Confirmed!</div>
            <div className="text-sm text-gray-600">Get ready for deliciousness!</div>
          </div>

          {/* Order Info */}
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-bold text-lg text-gray-800">Order Details</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Order #{orderNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{currentTime}</span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-800 text-lg border-b border-gray-200 pb-2 flex items-center gap-2">
              <span>Your Order</span>
              <span className="text-2xl">🛒</span>
            </h3>
            {billItems.map((billItem, index) => (
              <div key={index} className="flex justify-between items-start py-2 hover:bg-gray-50 rounded px-2 transition-colors">
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{billItem.item.name}</div>
                  <div className="text-sm text-gray-500">
                    ₹{billItem.item.price} × {billItem.quantity}
                  </div>
                </div>
                <div className="font-bold text-red-600 ml-4">
                  ₹{billItem.item.price * billItem.quantity}
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          {/* Total Breakdown */}
          <div className="bg-gradient-to-r from-yellow-100 to-red-100 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-gray-800">Subtotal:</span>
              <span className="text-lg font-bold text-gray-800">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Tax (5%):</span>
              <span className="text-sm text-gray-600">₹{tax}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-red-600">Grand Total:</span>
              <span className="text-2xl font-bold text-red-600">₹{grandTotal}</span>
            </div>
          </div>
          
          {/* Payment Method */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Payment Method:</span>
              <div className="flex items-center gap-2">
                {getPaymentIcon()}
                <span className="font-bold text-red-600">{getPaymentLabel()}</span>
              </div>
            </div>
          </div>
          
          {/* Thank You Message */}
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-4xl mb-2 animate-pulse">🍟</div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-red-600" />
              <span className="text-lg font-bold text-red-700">Thank you for choosing McDonald's!</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Your order will be ready shortly</p>
            <div className="text-2xl font-bold text-red-600 animate-bounce">🍔 I'm Lovin' It! 🍟</div>
          </div>
          
          {/* Action Button */}
          <Button 
            onClick={onNewOrder}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-red-800 font-bold py-3 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            🍔 Place New Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillReceipt;
