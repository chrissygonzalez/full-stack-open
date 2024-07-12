const Footer = ({ parts }) => {
    const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);
    return (<h4>total of {total} exercises</h4>)
}

export default Footer;