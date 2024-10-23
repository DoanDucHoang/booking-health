import { createChatBotMessage } from 'react-chatbot-kit';
import Avatar from './components/Avatar';
import StartBtn from './components/StartBtn';
import StartSlow from './components/StartSlow';
import data from './data';
import DipslayImage from './components/DipslayImage';


const config = {
    botName: "Hoang Bot",
    initialMessages: [createChatBotMessage(`Chào mừng tới Doan Duc Hoang!`, {
        widget: "startBtn"
    })],
    customComponents: {
        botAvatar: (props) => <Avatar {...props} />,
    },
    state: {
        checker: null,
        data,
        userData: {
            name: "Đoàn Đức Hoàng",
            age: 0,
            category: "",
            product: {
                name: "",
                link: "",
                imageUrl: ""
            }
        }
    },
    widgets: [
        {
            widgetName: "startBtn",
            widgetFunc: (props) => <StartBtn {...props} />,
        },
        {
            widgetName: "startSlow",
            widgetFunc: (props) => <StartSlow {...props} />,
        },
        {
            widgetName: "finalImage",
            widgetFunc: (props) => <DipslayImage {...props} />,
        },
    ]
};

export default config;