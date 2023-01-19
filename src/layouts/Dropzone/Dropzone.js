import React, { useEffect } from 'react';
import './dropzone.css';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const audioThumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  // marginBottom: 8,
  marginRight: 8,
  width: 310,
  height: 65,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};    

function Dropzone(props) {
  const {
    acceptType, caption, title, files, setFiles, imgSrc, setImg
  } = props;
  const { getRootProps, getInputProps } = useDropzone({
    // accept: acceptType,
    maxFiles: 1,
    accept: ".jpeg,.jpg,.png,.svg",
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      // setImg('');
    }
  });

  const thumbs = files.map(file => (
    <div style={acceptType === 'audio/*' ? audioThumb : thumb} key={file.name}>
      <div style={thumbInner}>
        {acceptType === 'audio/*' ? (
          <audio controls>
            <source src={file.preview} type="audio/mp3" />
            <track default kind="captions" srcLang="en" src={file.preview} />
          </audio>
        ) : (
          <div style={{textAlign:'center'}}>
          <img
            src={file.preview}
            style={img}
            alt="img"
          />
          </div>
        )
        }

      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container" style={{maxWidth:'47%' , marginLeft:"20px"}}>
      <aside>
        <h5>{title}</h5>
        
        {imgSrc ?<div ><img src={imgSrc} style={{ width: '100px' , height:"100px" , textAlign:'center' }} alt="img" /></div>  : thumbs}
      </aside>
      <div {...getRootProps({ className: '' })} >
        <Button variant="outlined" >
        <input {...getInputProps()} />
        <span style={{color:"#3b4d6c"}}>{caption}</span>
        </Button>
      </div>
    </section>
  );
}

// Dropzone.propTypes = {
//   acceptType: PropTypes.any.isRequired,
//   caption: PropTypes.any.isRequired,
//   title: PropTypes.any.isRequired,
//   files: PropTypes.any.isRequired,
//   setFiles: PropTypes.any.isRequired,
//   imgSrc: PropTypes.string.isRequired,
//   setImg: PropTypes.func.isRequired
// };

export default Dropzone;
