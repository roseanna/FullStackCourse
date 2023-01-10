const Notification = ({ isSuccess, message }) => {
    const successStyle =  {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    console.log('success', isSuccess, message)

    if (message === null) return null
    return (
        <div style={isSuccess ? successStyle : errorStyle}>
            {message}
        </div>
    )
}

export default Notification