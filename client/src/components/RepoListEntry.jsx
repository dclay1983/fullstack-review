import React from 'react';

class RepoListEntry extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='repo'>
        <img className = 'avatar' src = {this.props.repo.userAvatar} />
        <a className = 'title' href = {this.props.repo.url}>{this.props.repo.name}</a>
        <a className = 'user' href = {this.props.repo.userUrl}>By: {this.props.repo.userName}</a>
        <p>Updated on {new Date(this.props.repo.updated).toDateString()}</p>
      </div>
    );
  }
}

export default RepoListEntry;