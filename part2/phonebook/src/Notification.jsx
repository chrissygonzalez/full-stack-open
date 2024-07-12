const Notification = ({ message }) => {
    if (message === null) return null;

    return (<div className={`notification notification--${message.level}`}>{message.text}</div>)
}

export default Notification;