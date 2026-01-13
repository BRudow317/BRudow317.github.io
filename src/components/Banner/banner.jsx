import styles from './banner.module.css';
function Banner({ 
    children, 
    className = '',
    imageUrl = null,

}) {
    return (<div className={`${styles.BannerWrapper} ${className}`} style={{ 
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none'
        }}>{children}</div>
    );
}
export default Banner;