'use client';
const LoginForm: React.FC = () => {
    const slackOAuthURL = `https://slack.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_SLACK_CLIENT_ID}&scope=${process.env.NEXT_PUBLIC_SLACK_SCOPE}&redirect_uri=${process.env.NEXT_PUBLIC_SLACK_REDIRECT_URI}`
    const handleButtonClick = () => {
        window.location.href = slackOAuthURL;
    };
    return (
        <div className="flex h-screen">
            <img className="w-2/3 h-full pointer-events-none hidden sm:block" src="/zli.png" alt="" />
            <div className="sm:w-1/3 h-full">
                <div className="flex justify-center items-center h-screen bg-gradient-to-br from-yellow-400 to-white dark:to-black">
                    <div className="flex justify-center items-center h-screen">
                        <div className="bg-white rounded-3xl shadow-md p-8 mx-8 text-center w-2/3 h-3/5 flex flex-col items-center justify-center">
                            <img className="w-full  pointer-events-none mx-auto mb-4" src="/zli.png" alt="zli" />
                            <button
                                type="submit"
                                className="w-2/3 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
                                onClick={handleButtonClick}
                            >
                                Slackログイン
                            </button>
                            <button
                                type="submit"
                                className="w-2/3 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                onClick={handleButtonClick}
                            >
                                アカウント登録
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
