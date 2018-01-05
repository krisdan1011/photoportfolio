import React from "react";
import axios from "axios";
import Category from "./Category.jsx";
import Posts from "./Posts.jsx";
import PropTypes from "prop-types";

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      showAllCategories: true,
      singleCategoryToShow: {id: 0, name: ""},
      errorMsg: ""
    };
  }

  _getCategories() {
    axios.get("http://" + this.props.site + "/wp-json/wp/v2/categories?exclude=1")
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
      }, error => {
        const errorMsg = "Did not work: " + (error.response ? error.response : error);
        this.setState({ errorMsg });
      });
  }

  _showSpecificCategory(categoryId, categoryName) {
    this.setState({showAllCategories: !this.state.showAllCategories}); 
    this.setState({singleCategoryToShow: {id: categoryId, name: categoryName}}); 
  }

  componentWillMount() {
    this._getCategories();
  }
  
  render() {
    let categoryList = [];
    if(this.state.showAllCategories) {
      categoryList = this.state.categories.map(category =>
      { return ( <Category key={category.id.toString()} id={category.id} name={category.name} site={this.props.site} clickCategory={this._showSpecificCategory.bind(this)} showAllPosts={false} /> ); }
      );
    }
    else {
      categoryList = <Posts category={this.state.singleCategoryToShow.id} site={this.props.site} />;
    }
    return (
      <div className="category-list">
        {categoryList} 
        <div>{this.state.errorMsg}</div>
      </div>
    );
  }
}

Categories.propTypes = {
  site: PropTypes.string
};

export default Categories;
