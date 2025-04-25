import { useState } from 'react';
import { Search, Edit, Trash2, Plus } from 'lucide-react';
import AddCategory from './AddCategory';
 import ManageUsers from './ManageUsers';
 import ManageRecipes from './ManageRecipes';
 import ManageCategory from './ManageCategory';

export default function AdminPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Bakery', icon: '🥐' },
    { id: 2, name: 'Bakery', icon: '🥐' },
    { id: 3, name: 'Bakery', icon: '🥐' },
    { id: 4, name: 'Bakery', icon: '🥐' },
  ]);

  const [activePage, setActivePage] = useState('Manage Category');

  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  // Function to render the appropriate component based on activePage
  const renderActivePage = () => {
    switch(activePage) {
      case 'Manage Recipies':
        return <ManageRecipes />;
      case 'Manage Users':
        return <ManageUsers />;
      case 'Manage Category':
        return <ManageCategory />;
      default:
        return <ManageCategory />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-48 bg-gray-900 text-white flex flex-col">
        <div className="p-4 bg-black">
          <h1 className="font-bold">Admin Dashboard</h1>
        </div>
        
        {['Manage Category'].map((item) => (
          <button 
            key={item}
            className={`p-4 text-left hover:bg-gray-700 ${activePage === item ? 'bg-gray-800' : ''}`}
            onClick={() => setActivePage(item)}
          >
            {item}
          </button>
        ))}
        
        <div className="mt-auto p-4 border-t border-gray-700">
          <p>User: Admin</p>
        </div>
        
        <button className="bg-red-700 p-4 text-center hover:bg-red-800"   onClick={() => window.location.href = '/home'}
>
          LogOut
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {renderActivePage()}
      </div>
    </div>
  );
}