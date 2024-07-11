import { useContext } from 'react';
import MyContext from "../MyContext";

const Header = () => {
    const { user } = useContext(MyContext);

    return (
        <header className="bg-gray-800 text-white fixed top-0 w-full m-0 p-0 shadow-md z-10">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img src={user.avatar.url} alt="Avatar" className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="text-sm font-semibold">{user.username}</p>
                        <p className="text-xs text-gray-400">{user.reputation} Rep Points</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="focus:outline-none">
                        <img src="/icons/notification.png" alt="Notifications" className="w-6 h-6" />
                    </button>
                    <button className="focus:outline-none">
                        <img src="/icons/nav.png" alt="Navigation" className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
