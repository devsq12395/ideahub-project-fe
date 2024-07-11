const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
                <span className="text-lg font-medium text-gray-700">Loading...</span>
            </div>
        </div>
    );
}

export default Loading;
