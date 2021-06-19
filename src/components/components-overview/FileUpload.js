import React from 'react';
import { Col, Row } from 'shards-react';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';

import { uploadPostFile, savePost, MainUrl } from '@/functions';
import store from '@/functions/store';

let CompressOpt = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 512,
  useWebWorker: true,
  fileType: 'image/jpeg',
};

class CustomFileUpload extends React.PureComponent {
  constructor(props) {
    super(props);
    let f = store.getState().store.files || [];

    this.state = {
      selectedFiles: this.filterFiles(f),
      next: true,
    };
  }
  filterFiles = (arr = []) =>
    arr.filter((i) => {
      if (i.type.split('/').shift() === this.props.kind) return i;
      else return null;
    });

  handleUpload = (file) => {
    var { t } = this.props;

    let { selectedFiles } = this.state;
    let url = URL.createObjectURL(file);

    let files = store.getState().store.files || [];
    let id = files.length;
    selectedFiles.push({
      url,
      type: file.type,
      loader: 0,
      id,
    });

    this.setState({ selectedFiles, next: false });

    uploadPostFile(file, this.onUploadProgress, id)
      .then((res = {}) => {
        if (res.success) {
          files[id] = {
            url: MainUrl + '/' + res.media.url,
            type: res.media.type,
          };

          savePost({ files });
        }
      })
      .catch((err) => {
        toast.error(t('Upload canceled!'));
        console.log(err);
      });
  };

  processFile = (event) => {
    const { kind } = this.props;
    let file = event.target.files[0];

    if (file) {
      if (kind === 'image')
        imageCompression(file, CompressOpt)
          .then((compressedFile) => {
            console.log('compressedFile', compressedFile);
            console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
            console.log(
              `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
            );

            this.handleUpload(compressedFile);
          })
          .catch((error) => {
            console.log(error.message);
          });
      else return this.handleUpload(file);
    }
  };

  onUploadProgress = (percent, id, cancel) => {
    let progress = Math.round(percent);
    var { selectedFiles } = this.state;
    let next = false;

    let idx = selectedFiles.findIndex((i) => i.id === id);
    if (selectedFiles && selectedFiles[idx]) {
      let temp = [...selectedFiles];
      if (progress > 99) {
        delete temp[idx]['loader'];
        delete temp[idx]['cancel'];
        next = true;
      } else {
        temp[idx]['loader'] = progress;
        temp[idx]['cancel'] = cancel;
      }
      console.log(`upload progress => ${progress}%`);
      this.setState({
        selectedFiles: temp,
        next,
      });
    }
  };

  deleteThis(_id) {
    let { selectedFiles } = this.state;
    console.log('deleteThis => ', _id);
    let files = selectedFiles.filter((f) => {
      if (f.id === _id) {
        if (f.cancel) f.cancel();
      } else return f;
    });
    savePost({ files });
    this.setState({ selectedFiles: files });
  }

  getField(file = {}) {
    let kind = file.type.split('/').shift();

    switch (kind) {
      case 'image':
        return <img alt="uploaded compressed" src={file.url} />;
      case 'video':
        return (
          <video width="167" height="170" controls>
            <source src={file.url} type={file.type} />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        );

      case 'audio':
        return (
          <audio width="167" height="170" controls>
            <source src={file.url} type={file.type} />
            Your browser does not support the audio element.
          </audio>
        );

      default:
        return null;
    }
  }

  getFormat(kind) {
    switch (kind) {
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      case 'audio':
        return 'audio/*';

      default:
        return null;
    }
  }

  render() {
    const { selectedFiles = [] } = this.state;
    const { icon, label, kind } = this.props;

    return (
      <Row className="image-upload mb-3">
        {selectedFiles.map((i, idx) => (
          <Col key={idx} lg="12" md="12" className="img100">
            {this.getField(i)}
            <div className="delete" onClick={() => this.deleteThis(i.id)}>
              <i className="material-icons">delete</i>
              <span>حذف</span>
              {i.loader && <span className="loaderl">{i.loader}%</span>}
            </div>
          </Col>
        ))}
        <Col lg="12" md="12">
          <div className="open-file">
            <input
              className="custom-file-input custom"
              multiple={true}
              accept={this.getFormat(kind)}
              type="file"
              name="file"
              onChange={this.processFile}
            />
            <label className="custom-image-label" htmlFor="customFile2">
              <div className="iconShow">{icon}</div>
              {label}
            </label>
          </div>
        </Col>
      </Row>
    );
  }
}

export default withTranslation()(CustomFileUpload);
