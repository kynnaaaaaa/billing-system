
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ShoppingCart, CreditCard, Banknote, Star, Sparkles, Smartphone } from 'lucide-react';
import BillReceipt from '@/components/BillReceipt';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  isPopular?: boolean;
  category: 'food' | 'beverages';
}

interface BillItem {
  item: MenuItem;
  quantity: number;
}

const Index = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [showBill, setShowBill] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const menuItems: MenuItem[] = [
    // Food Items
    {
      id: 'burger',
      name: 'Big Mac Burger',
      price: 180,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center',
      description: 'Two all-beef patties, special sauce, lettuce, cheese',
      isPopular: true,
      category: 'food'
    },
    {
      id: 'fries',
      name: 'French Fries',
      price: 80,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center',
      description: 'Golden crispy fries with a pinch of salt',
      category: 'food'
    },
    {
      id: 'pizza-puff',
      name: 'Pizza Puff',
      price: 120,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
      description: 'Crispy puff pastry filled with pizza sauce and cheese',
      isPopular: true,
      category: 'food'
    },
    {
      id: 'mcveggie-wrap',
      name: 'McVeggie Wrap',
      price: 140,
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop&crop=center',
      description: 'Fresh vegetables wrapped in soft tortilla with special sauce',
      category: 'food'
    },
    {
      id: 'cheese-nuggets',
      name: 'Cheese Nuggets',
      price: 160,
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&crop=center',
      description: 'Crispy golden nuggets filled with melted cheese',
      isPopular: true,
      category: 'food'
    },
    // Beverages
    {
      id: 'cold-drink',
      name: 'Cold Drink',
      price: 60,
      image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop&crop=center',
      description: 'Ice-cold refreshing beverage',
      category: 'beverages'
    },
    {
      id: 'iced-tea',
      name: 'Iced Tea',
      price: 70,
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&crop=center',
      description: 'Refreshing iced tea with lemon',
      category: 'beverages'
    },
    {
      id: 'coffee',
      name: 'Premium Coffee',
      price: 90,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&crop=center',
      description: 'Rich and aromatic coffee',
      category: 'beverages'
    },
    {
      id: 'mcflurry',
      name: 'McFlurry Oreo',
      price: 150,
      image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&crop=center',
      description: 'Creamy vanilla ice cream with Oreo chunks',
      isPopular: true,
      category: 'beverages'
    }
  ];

  const handleQuantityChange = (itemId: string, quantity: number) => {
    const clampedQuantity = Math.max(0, Math.min(10, quantity));
    setQuantities(prev => ({
      ...prev,
      [itemId]: clampedQuantity
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

  const generateBill = async () => {
    const billItems = getBillItems();
    if (billItems.length === 0) {
      toast({
        title: "Oops! 🍔",
        description: "Please select at least one item to continue!",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsGenerating(false);
    setShowBill(true);
    
    toast({
      title: "Order Placed! 🎉",
      description: `Your order of ₹${getTotalAmount()} has been confirmed!`,
    });

    // Auto-scroll to top when bill is generated
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetOrder = () => {
    setQuantities({});
    setPaymentMethod('cash');
    setShowBill(false);
  };

  const foodItems = menuItems.filter(item => item.category === 'food');
  const beverageItems = menuItems.filter(item => item.category === 'beverages');
  const totalAmount = getTotalAmount();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-100 animate-fade-in">
        {/* Floating Burger Icon */}
        <div className="fixed top-4 right-4 z-40 text-6xl animate-bounce">
          🍔
        </div>

        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-6 shadow-2xl">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="text-4xl animate-pulse">🍔</div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                  McDonald's Bill Buddy
                </h1>
                <div className="text-4xl animate-pulse delay-300">🍟</div>
              </div>
              <div className="bg-yellow-400 text-red-800 inline-block px-4 py-1 rounded-full font-bold text-lg shadow-lg animate-pulse">
                ✨ I'm Lovin' It! ✨
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Live Cart Total */}
          {totalAmount > 0 && (
            <div className="fixed bottom-20 right-4 z-40 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-2xl shadow-2xl animate-scale-in">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <div className="font-bold">
                  Cart Total: ₹{totalAmount}
                </div>
              </div>
            </div>
          )}

          {/* Food Items Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-gray-800 mb-2 flex items-center justify-center gap-2">
                🍔 Food Items 🍟
              </h2>
              <p className="text-lg text-gray-600">Delicious food to satisfy your hunger</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodItems.map((item) => (
                <Card key={item.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-xl bg-white/90 backdrop-blur-sm relative">
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
                      className="w-20 h-20 object-cover mx-auto mt-4 rounded-full shadow-lg group-hover:animate-bounce transition-all duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                      ₹{item.price}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-center flex items-center justify-center gap-2">
                      {item.name}
                      {item.isPopular && <Sparkles className="w-4 h-4 text-yellow-500" />}
                    </h3>
                    <p className="text-gray-600 mb-4 text-center text-sm">{item.description}</p>
                    
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-lg">
                      <Label htmlFor={`quantity-${item.id}`} className="font-bold text-gray-700">
                        Qty:
                      </Label>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="0"
                        max="10"
                        value={quantities[item.id] || 0}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                        className="w-20 text-center font-bold border-2 border-yellow-300 focus:border-red-500 rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Beverages Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-gray-800 mb-2 flex items-center justify-center gap-2">
                🥤 Beverages 🧊
              </h2>
              <p className="text-lg text-gray-600">Refreshing drinks to quench your thirst</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beverageItems.map((item) => (
                <Card key={item.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-xl bg-white/90 backdrop-blur-sm relative">
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
                      className="w-20 h-20 object-cover mx-auto mt-4 rounded-full shadow-lg group-hover:animate-bounce transition-all duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                      ₹{item.price}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-center flex items-center justify-center gap-2">
                      {item.name}
                      {item.isPopular && <Sparkles className="w-4 h-4 text-yellow-500" />}
                    </h3>
                    <p className="text-gray-600 mb-4 text-center text-sm">{item.description}</p>
                    
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-lg">
                      <Label htmlFor={`quantity-${item.id}`} className="font-bold text-gray-700">
                        Qty:
                      </Label>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="0"
                        max="10"
                        value={quantities[item.id] || 0}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                        className="w-20 text-center font-bold border-2 border-yellow-300 focus:border-red-500 rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <Card className="mb-8 shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 text-red-800">
              <CardTitle className="text-2xl font-black flex items-center gap-3 justify-center">
                <CreditCard className="w-6 h-6" />
                Choose Payment Method
                <Smartphone className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-br from-white to-yellow-50">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex gap-6 justify-center flex-wrap">
                <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105">
                  <RadioGroupItem value="cash" id="cash" className="border-red-500 text-red-500" />
                  <Label htmlFor="cash" className="flex items-center gap-2 font-bold text-lg text-gray-700 cursor-pointer">
                    <Banknote className="w-6 h-6 text-green-600" />
                    Cash
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105">
                  <RadioGroupItem value="card" id="card" className="border-red-500 text-red-500" />
                  <Label htmlFor="card" className="flex items-center gap-2 font-bold text-lg text-gray-700 cursor-pointer">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    Card
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105">
                  <RadioGroupItem value="upi" id="upi" className="border-red-500 text-red-500" />
                  <Label htmlFor="upi" className="flex items-center gap-2 font-bold text-lg text-gray-700 cursor-pointer">
                    <Smartphone className="w-6 h-6 text-purple-600" />
                    UPI
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Generate Bill Button */}
          <div className="text-center">
            <Button 
              onClick={generateBill}
              disabled={isGenerating}
              className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-black py-6 px-12 text-2xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-4 border-yellow-400 disabled:opacity-50"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                  Generating...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-8 h-8 mr-3 animate-bounce" />
                  🧾 Generate Bill 🍟
                  <div className="ml-3 text-3xl animate-pulse">✨</div>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Sticky Footer */}
        <footer className="bg-gradient-to-r from-red-600 to-red-700 text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg font-semibold mb-2">Thank you for visiting McDonald's Bill Buddy! 🍔</p>
            <p className="text-sm opacity-90">© 2024 McDonald's Bill Buddy. All rights reserved. I'm Lovin' It!</p>
            <div className="flex justify-center gap-4 mt-4">
              <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">📱</span>
              <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">📧</span>
              <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">🌐</span>
            </div>
          </div>
        </footer>
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
    </>
  );
};

export default Index;
