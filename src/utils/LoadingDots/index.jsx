import './LoadingDots.scss'

const LoadingDots = ({ displayStatus }) => {
    return (
        <div style={{display: displayStatus ? 'flex' : 'none'}} class="loading"> 
            <div class="dot1"></div>
            <div class="dot2"></div>
            <div class="dot3"></div>
      </div>
    )
}

export default LoadingDots