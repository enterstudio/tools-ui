import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Icon from 'components/Icon';
import './Popover.scss';

/**
 * Produces a popover that copies url to clipboard on click
 */
class CopyPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    // Cannot use an arrow function in this case or it will not unmount
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(e) {
    const domNode = ReactDOM.findDOMNode(this);
    if ((!domNode || !domNode.contains(e.target))) {
      this.setState({ open: false });
    }
  }

  handleShareClick() {
    this.setState({ open: true });
    this.refs.urlToCopy.select();
    document.execCommand('copy');
    this.refs.urlToCopy.blur();
  }

  render() {
    const { children } = this.props;
    const { open } = this.state;

    return (
      <span className="popover__group" onClick={() => this.handleShareClick()}>
        {children}
        <div className={`popover copyPopover popover--l popover--bottom popover--rightAligned ${open && 'is-open'}`}>
          <h6 className='text--left copyPopover__label'><Icon name='check-circle' /> Copied to Clipboard!</h6>
          <input className='input__text input__text--s copyPopover__input'
            value={window.location.href}
            ref='urlToCopy' readOnly />
        </div>
      </span>
    );
  }
}

export { CopyPopover };
