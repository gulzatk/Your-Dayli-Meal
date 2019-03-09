import React from 'react';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import NewRecipeForm from './components/NewRecipeForm';
import { pseudoRandomBytes } from 'crypto';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };

    this.handleLikesChange = this.handleLikesChange.bind(this);
    this.handleDisLikesChange = this.handleDisLikesChange.bind(this);
  }


  handleLikesChange(id) {
    for (let recipe of this.state.masterRecipeList) {
      if (recipe.id === id) {
        recipe.likes++;
        let newState = Object.assign({}, this.state.masterRecipeList, recipe);
        this.setState({ newState });
      }
    }
  }

  handleDisLikesChange(id) {
    for (let recipe of this.state.masterRecipeList) {
      if (recipe.id === id) {
        recipe.dislikes++;
        let newState = Object.assign({}, this.state.masterRecipeList, recipe);
        this.setState({ newState });
      }
    }
  }


  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <RecipeList recipeList={this.props.masterRecipeList}
              changeLikes={this.handleLikesChange}
              changeDisLikes={this.handleDisLikesChange}/>}
          />
          <Route path='/new' render = {() => <NewRecipeForm     />} />
        </Switch>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    masterRecipeList: state
  };
};

App.propTypes = {
  masterRecipeList: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(App));