import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h4 className = 'list'> Most Recently Updated Repos </h4>
          {this.props.repos.map( (repo) => {
            return <RepoListEntry key={repo.id} repo = {repo} />
          })}
      </div>
    );
  }
}

export default RepoList;