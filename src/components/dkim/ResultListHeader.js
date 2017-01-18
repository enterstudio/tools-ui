/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Icon from '../../components/Icon';

// TODO Finish styling error
const Error = (props) => {
  const { error } = props;
  return (
    <div className='panel__body'>
      <Icon name='exclamation-circle' />
      {error.message}
    </div>
  );
};

class ResultListHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharePopoverOpen: false
    };
  }

  // This feels excessive for a popover
  // TODO See if we can move this popover into its own component
  componentDidMount() {
    document.addEventListener('click', (e) => this.handleClickOutside(e));
  }

  componentWillUnmount() {
    document.removeEventListener('click', (e) => this.handleClickOutside(e));
  }

  handleClickOutside(e) {
    const domNode = ReactDOM.findDOMNode(this);
    if ((!domNode || !domNode.contains(e.target))) {
      this.setState({ sharePopoverOpen: false });
    }
  }

  handleShareClick() {
    this.setState({ sharePopoverOpen: true });
    this.refs.urlToCopy.select();
    document.execCommand('copy');
    this.refs.urlToCopy.blur();
  }

  render() {
    const { email, getResults, error } = this.props;
    const { sharePopoverOpen } = this.state;

    return (
      <div className='panel panel--accent'>
        <div className='panel__body'>

          <div className='float--right'>
            <a className='actionLink' onClick={getResults} title='Refresh Messages'>Refresh</a>

            <span className="popover__group" onClick={() => this.handleShareClick()}>
              <a className='actionLink' title='Share'>Share</a>
              <div className={`popover popover--l popover--bottom popover--rightAligned ${sharePopoverOpen && 'is-open'}`}>
                <h6 className='text--left marginBottom--xs'><Icon name='check-circle' /> Copied to Clipboard!</h6>
                <input className='input__text input__text--s'
                  value={window.location.href}
                  ref='urlToCopy' readOnly />
              </div>
            </span>
          </div>

          <p className='text--muted marginBottom--xs'>Generated Test Address</p>
          <h3>{email}</h3>

          {error && <Error error={error} />}
        </div>
      </div>
    );
  }
}

export default ResultListHeader;
