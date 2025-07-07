
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, CreditCard, Banknote } from 'lucide-react';

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

const Index = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [showBill, setShowBill] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'big-mac',
      name: 'Big Mac',
      price: 180,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center',
      description: 'Two all-beef patties, special sauce, lettuce, cheese'
    },
    {
      id: 'fries',
      name: 'French Fries',
      price: 80,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center',
      description: 'Golden crispy fries with a pinch of salt'
    },
    {
      id: 'mcchicken',
      name: 'McChicken',
      price: 150,
      image: 'https://images.unsplash.com/photo-1606755962773-d324e2013ae0?w=400&h=300&fit=crop&crop=center',
      description: 'Crispy chicken patty with fresh lettuce and mayo'
    },
    {
      id: 'coke',
      name: 'Coca Cola',
      price: 60,
      image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop&crop=center',
      description: 'Ice-cold refreshing Coca Cola'
    },
    {
      id: 'mcflurry',
      name: 'McFlurry',
      price: 120,
      image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&crop=center',
      description: 'Creamy vanilla ice cream with chocolate chunks'
    }
  ];

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, quantity)
    }));
  };

  const getBillItems = (): BillItem[] => {
    return menuItems
      .filter(item => quantities[item.id] > 0)
      .map(item => ({
        item,
        quantity: quantities[item.id]
      }));
  };

  const getTotalAmount = (): number => {
    return getBillItems().reduce((total, billItem) => 
      total + (billItem.item.price * billItem.quantity), 0
    );
  };

  const generateBill = () => {
    const billItems = getBillItems();
    if (billItems.length === 0) {
      alert('Please select at least one item!');
      return;
    }
    setShowBill(true);
  };

  const resetOrder = () => {
    setQuantities({});
    setPaymentMethod('cash');
    setShowBill(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-6 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-3">
              🍔 McDonald's Billing System 🍟
            </h1>
            <p className="text-red-100 text-lg">I'm Lovin' It!</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Menu Items */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Choose Your Favorites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-red-700 font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                    ₹{item.price}
                  </div>
                </div>
                <CardContent className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`quantity-${item.id}`} className="font-semibold text-gray-700">
                      Quantity:
                    </Label>
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="0"
                      max="10"
                      value={quantities[item.id] || 0}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 text-center border-2 border-yellow-300 focus:border-red-500 rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <Card className="mb-8 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-800">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex gap-8">
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-colors">
                <RadioGroupItem value="cash" id="cash" className="border-red-500 text-red-500" />
                <Label htmlFor="cash" className="flex items-center gap-2 font-semibold text-gray-700 cursor-pointer">
                  <Banknote className="w-5 h-5 text-green-600" />
                  Cash
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-colors">
                <RadioGroupItem value="card" id="card" className="border-red-500 text-red-500" />
                <Label htmlFor="card" className="flex items-center gap-2 font-semibold text-gray-700 cursor-pointer">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Card
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Generate Bill Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={generateBill}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            <ShoppingCart className="w-6 h-6 mr-2" />
            Generate Bill
          </Button>
        </div>

        {/* Bill Summary */}
        {showBill && (
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-yellow-50">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
              <CardTitle className="text-3xl font-bold text-center">
                🧾 Your Bill Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                {getBillItems().map((billItem, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div className="flex-1">
                      <span className="font-semibold text-lg text-gray-800">{billItem.item.name}</span>
                      <span className="text-gray-600 ml-2">x {billItem.quantity}</span>
                    </div>
                    <span className="font-bold text-lg text-red-600">
                      ₹{billItem.item.price * billItem.quantity}
                    </span>
                  </div>
                ))}
                
                <Separator className="my-6 bg-gray-300" />
                
                <div className="flex justify-between items-center py-4 bg-yellow-100 rounded-lg px-6">
                  <span className="text-2xl font-bold text-gray-800">Total Amount:</span>
                  <span className="text-3xl font-bold text-red-600">₹{getTotalAmount()}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-6">
                  <span className="text-lg font-semibold text-gray-700">Payment Method:</span>
                  <span className="text-lg font-bold text-red-600 capitalize flex items-center gap-2">
                    {paymentMethod === 'cash' ? <Banknote className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                    {paymentMethod}
                  </span>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  onClick={resetOrder}
                  variant="outline"
                  className="border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
                >
                  New Order
                </Button>
              </div>
              
              <div className="text-center mt-6 p-4 bg-gradient-to-r from-yellow-100 to-red-100 rounded-lg">
                <p className="text-lg font-semibold text-gray-800">Thank you for choosing McDonald's!</p>
                <p className="text-red-600 font-bold">🍔 I'm Lovin' It! 🍔</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
