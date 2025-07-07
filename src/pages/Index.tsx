
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ShoppingCart, CreditCard, Banknote, Star, Sparkles } from 'lucide-react';
import BillReceipt from '@/components/BillReceipt';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  isPopular?: boolean;
}

interface BillItem {
  item: MenuItem;
  quantity: number;
}

const Index = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [showBill, setShowBill] = useState(false);
  const { toast } = useToast();

  const menuItems: MenuItem[] = [
    {
      id: 'big-mac',
      name: 'Big Mac',
      price: 180,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center',
      description: 'Two all-beef patties, special sauce, lettuce, cheese',
      isPopular: true
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
      description: 'Crispy chicken patty with fresh lettuce and mayo',
      isPopular: true
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
      name: 'McFlurry Oreo',
      price: 120,
      image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&crop=center',
      description: 'Creamy vanilla ice cream with Oreo chunks'
    },
    {
      id: 'nuggets',
      name: 'Chicken McNuggets',
      price: 200,
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&crop=center',
      description: '10 pieces of crispy golden chicken nuggets',
      isPopular: true
    },
    {
      id: 'quarter-pounder',
      name: 'Quarter Pounder',
      price: 220,
      image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop&crop=center',
      description: 'Fresh beef quarter pounder with cheese'
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
      toast({
        title: "Oops! 🍔",
        description: "Please select at least one item to continue!",
        variant: "destructive",
      });
      return;
    }
    setShowBill(true);
    toast({
      title: "Order Placed! 🎉",
      description: `Your order of ₹${getTotalAmount()} has been confirmed!`,
    });
  };

  const resetOrder = () => {
    setQuantities({});
    setPaymentMethod('cash');
    setShowBill(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-100">
      {/* Animated Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243L8.2 0H5.373zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657l1.414 1.414L13.857 0H11.03z\"/%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-6xl animate-bounce">🍔</div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                McDonald's
              </h1>
              <div className="text-6xl animate-bounce delay-300">🍟</div>
            </div>
            <div className="bg-yellow-400 text-red-800 inline-block px-6 py-2 rounded-full font-bold text-xl shadow-lg transform hover:scale-105 transition-transform animate-pulse">
              ✨ I'm Lovin' It! ✨
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Menu Items */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              🌟 Our Delicious Menu 🌟
            </h2>
            <p className="text-xl text-gray-600">Choose your favorites and make your day special!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-xl bg-white relative group">
                {item.isPopular && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-red-800 font-bold px-3 py-1 rounded-full text-sm shadow-lg z-10 flex items-center gap-1 animate-pulse">
                    <Star className="w-4 h-4 fill-current" />
                    Popular
                  </div>
                )}
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-4 py-2 rounded-full text-lg shadow-lg transform group-hover:scale-110 transition-transform">
                    ₹{item.price}
                  </div>
                </div>
                
                <CardContent className="p-6 bg-gradient-to-br from-white to-yellow-50">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    {item.name}
                    {item.isPopular && <Sparkles className="w-5 h-5 text-yellow-500" />}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                  
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg">
                    <Label htmlFor={`quantity-${item.id}`} className="font-bold text-gray-700 text-lg">
                      Quantity:
                    </Label>
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="0"
                      max="10"
                      value={quantities[item.id] || 0}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-24 text-center text-lg font-bold border-2 border-yellow-300 focus:border-red-500 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <Card className="mb-12 shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 text-red-800">
            <CardTitle className="text-3xl font-black flex items-center gap-3 justify-center">
              <CreditCard className="w-8 h-8" />
              Choose Payment Method
              <Banknote className="w-8 h-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 bg-gradient-to-br from-white to-yellow-50">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex gap-8 justify-center">
              <div className="flex items-center space-x-4 p-6 rounded-2xl border-4 border-gray-200 hover:border-red-400 hover:bg-red-50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105">
                <RadioGroupItem value="cash" id="cash" className="border-red-500 text-red-500 w-6 h-6" />
                <Label htmlFor="cash" className="flex items-center gap-3 font-bold text-xl text-gray-700 cursor-pointer">
                  <Banknote className="w-7 h-7 text-green-600" />
                  Cash Payment
                </Label>
              </div>
              <div className="flex items-center space-x-4 p-6 rounded-2xl border-4 border-gray-200 hover:border-red-400 hover:bg-red-50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105">
                <RadioGroupItem value="card" id="card" className="border-red-500 text-red-500 w-6 h-6" />
                <Label htmlFor="card" className="flex items-center gap-3 font-bold text-xl text-gray-700 cursor-pointer">
                  <CreditCard className="w-7 h-7 text-blue-600" />
                  Card Payment
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Generate Bill Button */}
        <div className="text-center">
          <Button 
            onClick={generateBill}
            className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-black py-6 px-12 text-2xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-4 border-yellow-400"
            size="lg"
          >
            <ShoppingCart className="w-8 h-8 mr-3 animate-bounce" />
            🍔 Generate My Bill 🍟
            <div className="ml-3 text-3xl animate-pulse">✨</div>
          </Button>
        </div>
      </div>

      {/* Bill Receipt Modal */}
      {showBill && (
        <BillReceipt
          billItems={getBillItems()}
          totalAmount={getTotalAmount()}
          paymentMethod={paymentMethod}
          onNewOrder={resetOrder}
        />
      )}
    </div>
  );
};

export default Index;
