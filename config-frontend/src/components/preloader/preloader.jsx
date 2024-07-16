import './preloader.scss'

const Spinner = (props) => {
    return (
        <div className='loading'>
            <div>
                {props.text? <span> {props.text}, please wait...</span> : ''}
                <div className='loader'></div>
            </div>
        </div>
    )
}

const SmallLoader = () => {
    return (
        <div className="small-loading">
            <div></div>
        </div>
    )
}

const Error = (props) => {
    return (
        <div className='error'>
        <pre>
            <div className='no-network'>
                <img src="images/no-signal.png" alt="" loading='lazy'/>
            </div>

            <h1>Ooops!</h1>
            <span>No internet connection found</span>
            <span>Check your connection</span>
            <button onClick={() => props.refetch()}>
                <pre>Try again</pre>
            </button>
        </pre>
    </div>
    )
}



export { Spinner, Error, SmallLoader };