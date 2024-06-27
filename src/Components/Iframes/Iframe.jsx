

const IframeGrabacion = ({grabacionID, subtitulo, index, width, height}) => {
    return (
        <iframe 
            src={`https://drive.google.com/file/d/${ grabacionID }/preview`} 
            width={width} 
            height={height} 
            allow="autoplay"
            className={`iframe-${subtitulo}-${index}`}>
        </iframe>
    )
}

export default IframeGrabacion
