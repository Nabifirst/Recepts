import { ChangeEvent, useEffect, useState } from 'react';
import "../Header/Header.css";
import img2 from "../Header/Transparent_X.png";
import PngTree from './pngtree-up-arrow-image_1287479-removebg-preview.png';
import SuppertImage from "./support-icon-can-be-used-600nw-1887496465-removebg-preview.png"
import { jwtDecode } from 'jwt-decode';
import HeaderPlace from '../HeaderPlace';

type Message = {
  type: 'user' | 'telegram';
  text: string;
};

type UserInfo = {
  firstName: string;
  phoneNumber: string;
};

const Header = () => {
  const [loading, _] = useState<boolean>(false);
  const token = localStorage.getItem('authToken'); // Retrieve the JWT token
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [lastUpdateId, setLastUpdateId] = useState<number | null>(null);
  const [isRecording] = useState<boolean>(false);
  const [audioBlob] = useState<Blob | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  console.log(userInfo);

  const generateUserId = (): string => Math.random().toString(36).substr(2, 9);
  const getUserId = (): string => {
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      storedUserId = generateUserId();
      localStorage.setItem('userId', storedUserId);
    }
    return storedUserId;
  };

  const [userId, setUserId] = useState<string>(getUserId());

  console.log(setUserId);

  const TELEGRAM_BOT_TOKEN = '7493416696:AAHAibwLoqsasVCHPp_4hrQxIm2RTZso2eM';
  const CHAT_ID = '-1002218698379';

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const sendMessage = (): void => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = { type: 'user', text: inputValue };
    const storedMessages: Record<string, Message[]> = JSON.parse(localStorage.getItem('messages') || '{}');

    const updatedMessages = {
      ...storedMessages,
      [userId]: [...(storedMessages[userId] || []), newMessage],
    };

    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    setMessages(updatedMessages[userId]);

    sendToTelegram(inputValue);

    setInputValue('');
  };



  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const sendToTelegram = (message: string): void => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const payload = {
      chat_id: CHAT_ID,
      text: `${userId}: ${message}`,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        if (!data.ok) {
          console.error('Error sending message to Telegram:', data.description);
        }
      })
      .catch(error => {
        console.error('Error sending message to Telegram:', error);
      });
  };


  const fetchTelegramMessages = (): void => {
    if (!userId) return;

    let url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;
    if (lastUpdateId !== null) {
      url += `?offset=${lastUpdateId + 1}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.ok && data.result.length > 0) {
          const newMessages = data.result
            .map((update: any) => {
              const text = update.message?.text;

              if (text) {
                const [messageUserId, ...messageParts] = text.split(':');
                const messageText = messageParts.join(':').trim();

                if (messageUserId.trim() === userId) {
                  return {
                    type: 'telegram',
                    text: messageText,
                  };
                }
              }
              return null;
            })
            .filter(Boolean) as Message[];

          if (newMessages.length > 0) {
            const storedMessages: Record<string, Message[]> = JSON.parse(localStorage.getItem('messages') || '{}');
            const updatedMessages = {
              ...storedMessages,
              [userId]: [...(storedMessages[userId] || []), ...newMessages],
            };

            localStorage.setItem('messages', JSON.stringify(updatedMessages));
            setMessages(updatedMessages[userId]);
          }

          const maxUpdateId = data.result.reduce(
            (maxId: number, update: any) => Math.max(maxId, update.update_id),
            lastUpdateId || 0
          );
          setLastUpdateId(maxUpdateId);
        }
      })
      .catch(error => {
        console.error('Error fetching messages from Telegram:', error);
      });
  };

  const deleteTelegramWebhook = (): void => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/deleteWebhook`;

    fetch(url, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          console.log('Webhook deleted successfully');
          fetchTelegramMessages();
        } else {
          console.error('Error deleting webhook:', data.description);
        }
      })
      .catch(error => {
        console.error('Error deleting webhook:', error);
      });
  };

  useEffect(() => {
    const storedMessages: Record<string, Message[]> = JSON.parse(localStorage.getItem('messages') || '{}');
    const userMessages = storedMessages[userId] || [];
    setMessages(userMessages);
  }, [userId]);

  useEffect(() => {
    deleteTelegramWebhook();
    const interval = setInterval(fetchTelegramMessages, 5000);
    return () => clearInterval(interval);
  }, [lastUpdateId]);

  useEffect(() => {
    if (token) {
      console.log('Token found:', token);

      try {
        const decodedToken: any = jwtDecode(token);
        const firstName = decodedToken.FullName || 'N/A';
        const phoneNumber = decodedToken.UserName || 'N/A';

        setUserInfo({ firstName, phoneNumber });
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    } else {
      console.error('No token found in localStorage');
    }
  }, []);



  return (
    loading ? (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    ) : (
      <div className=' w-[100%]'>

        <HeaderPlace />

        <div>
          <div className='fixed z-30 sm:hidden md:flex sm:bottom-20 md:bottom-10 sm:right-0 md:right-10'>
            <img
              id="supportImage1"
              className='w-[80px] h-[80px] cursor-pointer transition-transform duration-300 transform hover:scale-110 rounded-full shadow-lg hover:shadow-xl hover:bg-opacity-90 '
              src={SuppertImage}
              alt="Support"
              onClick={toggleModal}
            />
          </div>



          <div
            id="modal"
            className={`fixed z-30 sm:bottom-[0px] sm:w-[100%] md:w-[350px] md:bottom-[140px] h-[100%] sm:max-h-[100%]  md:max-h-[450px] sm:right-[0px] md:right-[90px] w-[320px] p-4 bg-gradient-to-b from-white to-gray-100 shadow-2xl rounded-3xl transition-all duration-500 transform ${isModalVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
              }`}
          >

            <img onClick={() => setIsModalVisible(false)} className=' cursor-pointer w-[20px] relative top-[20px] sm:block md:hidden' src={img2} alt="" />
            <div className='overflow-y-auto sm:h-[450px] md:h-[340px] pb-[10px] pr-[10px] flex flex-col gap-2'>
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p className={`p-3 rounded-2xl max-w-[80%] text-sm shadow-md transition-opacity duration-200 ease-in-out ${message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'
                    : message.type === 'telegram'
                      ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                      : 'bg-gray-100 text-black'
                    }`}>
                    {message.text}
                  </p>
                </div>
              ))}
            </div>

            <div className='fixed bottom-[20px] left-0 right-0 flex justify-center items-center gap-[10px] px-4'>
              <input
                type="text"
                placeholder='How can I help you?'
                className='p-[10px] pl-[15px] text-black sm:w-[85%] md:w-[230px] border-[2px] border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                disabled={isRecording} // Disable text input while recording
              />
              <div
                className={`h-[40px] w-[40px] flex justify-center items-center rounded-full ${inputValue.length === 0 && !audioBlob ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-400'} cursor-pointer shadow-lg hover:bg-gray-200 transition-all duration-300`}
              >
                <img className='h-[20px]' src={PngTree} alt="Send" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;